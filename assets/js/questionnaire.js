/* ============================================
   CLEARFUNERALCOSTS - QUESTIONNAIRE FUNCTIONALITY
   Функциональность для анкеты
   ============================================ */

/**
 * Questionnaire Module - Handles multi-step form functionality
 */
class QuestionnaireModule {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 8;
        this.formData = {};
        this.isSubmitting = false;
        
        // Comprehensive data structure
        this.questionnaireData = {
            serviceType: '',           // traditional-cremation, direct-cremation, simple-service, traditional-burial, natural-burial, unsure
            location: {
                postcode: '',
                town: '',
                county: '',
                region: ''               // Will be determined from postcode
            },
            budget: {
                min: 0,
                max: 0,
                flexible: false,
                priority: ''             // cost, quality, balance
            },
            timeline: '',              // urgent, 1-2-weeks, 2-4-weeks, flexible
            priorities: [],            // Array: ['cost', 'dignity', 'convenience', 'tradition', 'eco-friendly']
            specialRequirements: [],   // Array: ['religious-christian', 'religious-muslim', 'religious-hindu', 'religious-jewish', 'non-religious', 'eco-friendly', 'military']
            ceremonyPreferences: {
                wantsCeremony: null,     // true, false, null (not specified)
                ceremonySize: '',        // intimate, small, medium, large
                ceremonyLocation: ''     // crematorium, church, venue, home, none
            },
            contactInfo: {
                name: '',
                email: '',
                phone: ''
            },
            timestamp: null,
            completed: false
        };
        
        this.init();
    }

    /**
     * Initialize questionnaire functionality
     */
    init() {
        this.setupProgressIndicator();
        this.setupFormSteps();
        this.setupNavigation();
        
        // Clear old data from localStorage BEFORE setting up data persistence
        this.clearOldData();
        
        this.setupDataPersistence();
        this.setupLegalDisclaimer();
        this.setupOptionSelection();
        
        // Setup new functionality
        this.enableBackNavigation();
        this.setupSaveForLater();
        
        // Update navigation buttons immediately
        this.updateNavigationButtons();
        
        // Also update after a small delay to ensure everything is ready
        setTimeout(() => {
            this.updateNavigationButtons();
        }, 100);
    }

    /**
     * Clear old data from localStorage
     */
    clearOldData() {
        // Clear all questionnaire-related data from localStorage
        const keysToRemove = [
            'questionnaire_data',
            'questionnaire_progress',
            'questionnaireData', // This is the key used by the current system
            'contact_001', 'contact_002', 'contact_003', 'contact_004', 'contact_005',
            'budget_range', 'care_003', 'emergency_contact', 'location_001', 'location_002',
            'location_003', 'location_004', 'power_of_attorney', 'service_type',
            'system_001', 'system_002', 'timeline', 'timeline_006', 'culture_002'
        ];
        
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });
        
        // Clear any other keys that start with common prefixes
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('contact_') || 
                key.startsWith('location_') || 
                key.startsWith('system_') || 
                key.startsWith('timeline_') ||
                key.startsWith('care_') ||
                key.startsWith('culture_') ||
                key === 'budget_range' ||
                key === 'emergency_contact' ||
                key === 'power_of_attorney' ||
                key === 'service_type') {
                localStorage.removeItem(key);
            }
        });
        
        // Clear formData object
        this.formData = {};
        
        console.log('Old questionnaire data cleared from localStorage and formData');
    }

    /**
     * Validate questionnaire data
     */
    validateQuestionnaireData(data) {
        const errors = [];
        
        // Validate service type
        const validServiceTypes = [
            'traditional-cremation', 'traditional_cremation',
            'direct-cremation', 'direct_cremation', 
            'simple-service', 'simple_service',
            'traditional-burial', 'traditional_burial',
            'natural-burial', 'natural_burial'
        ];
        if (!validServiceTypes.includes(data.serviceType)) {
            errors.push('Invalid service type');
        }
        
        // Validate postcode (UK format) - only if provided
        if (data.location.postcode) {
            const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i;
            if (!postcodeRegex.test(data.location.postcode)) {
                errors.push('Invalid UK postcode format');
            }
        }
        // Note: Postcode is not required for basic validation
        
        // Validate budget
        if (data.budget.min && data.budget.max) {
            if (data.budget.min > data.budget.max) {
                errors.push('Minimum budget cannot be greater than maximum budget');
            }
            if (data.budget.min < 0 || data.budget.max < 0) {
                errors.push('Budget values must be positive');
            }
        }
        
        // Validate email if provided
        if (data.contactInfo.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.contactInfo.email)) {
                errors.push('Invalid email format');
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Show validation errors to user
     */
    showValidationErrors(errors) {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.validation-error');
        existingErrors.forEach(error => error.remove());
        
        // Create error container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'validation-error';
        errorContainer.style.cssText = `
            background: #fee2e2;
            border: 1px solid #fca5a5;
            color: #991b1b;
            padding: 12px;
            border-radius: 6px;
            margin: 16px 0;
        `;
        
        const errorList = document.createElement('ul');
        errorList.style.margin = '0';
        errorList.style.paddingLeft = '20px';
        
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });
        
        errorContainer.appendChild(errorList);
        
        // Insert at top of form
        const form = document.getElementById('questionnaire-form');
        if (form) {
            form.insertBefore(errorContainer, form.firstChild);
        }
    }

    /**
     * Save questionnaire data to localStorage with validation
     */
    saveQuestionnaireData(data) {
        // Validate first
        const validation = this.validateQuestionnaireData(data);
        
        if (!validation.isValid) {
            console.error('Validation errors:', validation.errors);
            this.showValidationErrors(validation.errors);
            return false;
        }
        
        // Add timestamp
        data.timestamp = new Date().toISOString();
        
        try {
            localStorage.setItem('funeralAnalysis', JSON.stringify(data));
            console.log('Questionnaire data saved successfully');
            return true;
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
            // Handle quota exceeded or other errors
            if (e.name === 'QuotaExceededError') {
                alert('Unable to save your preferences. Please clear your browser data and try again.');
            }
            return false;
        }
    }

    /**
     * Setup progress indicator
     */
    setupProgressIndicator() {
        this.updateProgressBar();
        this.updateProgressText();
    }

    /**
     * Update progress indicator
     */
    updateProgress(currentQuestion, totalQuestions) {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill && progressText) {
            const percentage = (currentQuestion / totalQuestions) * 100;
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `Question ${currentQuestion} of ${totalQuestions}`;
        }
    }

    /**
     * Enable back navigation
     */
    enableBackNavigation() {
        const backButtons = document.querySelectorAll('.back-button');
        
        backButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const currentStep = parseInt(button.dataset.currentStep);
                const previousStep = currentStep - 1;
                
                if (previousStep >= 1) {
                    this.showStep(previousStep);
                    this.updateProgress(previousStep, this.totalSteps);
                }
            });
        });
    }

    /**
     * Setup save & continue later functionality
     */
    setupSaveForLater() {
        const saveButton = document.getElementById('save-for-later-btn');
        
        if (saveButton) {
            saveButton.addEventListener('click', async function() {
                // Get current questionnaire data
                const currentData = this.gatherCurrentData();
                
                // Prompt for email if not provided
                let email = currentData.contactInfo.email;
                if (!email) {
                    email = prompt('Please enter your email address to receive the resume link:');
                    if (!email) return;
                    currentData.contactInfo.email = email;
                }
                
                // Save to localStorage
                const saved = this.saveQuestionnaireData(currentData);
                
                if (saved) {
                    // Generate resume token (in real implementation, this would be server-side)
                    const resumeToken = btoa(JSON.stringify({
                        timestamp: Date.now(),
                        email: email
                    }));
                    
                    // Create resume URL
                    const resumeUrl = `${window.location.origin}${window.location.pathname}?resume=${resumeToken}`;
                    
                    // In real implementation, send email via API
                    // For now, just copy to clipboard
                    try {
                        await navigator.clipboard.writeText(resumeUrl);
                        alert(`Your progress has been saved!\n\nResume link copied to clipboard. You can also bookmark this page to continue later.`);
                    } catch (e) {
                        alert(`Your progress has been saved!\n\nBookmark this page to continue later:\n${resumeUrl}`);
                    }
                }
            }.bind(this));
        }
    }

    /**
     * Gather current data from form
     */
    gatherCurrentData() {
        // Return a deep copy of questionnaireData
        return JSON.parse(JSON.stringify(this.questionnaireData));
    }

    /**
     * Map service type from form to standardized format
     */
    mapServiceType(formValue) {
        const mapping = {
            'traditional_burial': 'traditional-burial',
            'traditional_cremation': 'traditional-cremation',
            'direct_cremation': 'direct-cremation',
            'simple_service': 'simple-service',
            'natural_burial': 'natural-burial'
        };
        return mapping[formValue] || 'traditional-cremation';
    }

    /**
     * Map budget range from form to min/max values
     */
    mapBudgetRange(formValue) {
        const mapping = {
            'under_2000': { min: 0, max: 2000 },
            '2000_4000': { min: 2000, max: 4000 },
            '4000_6000': { min: 4000, max: 6000 },
            'over_6000': { min: 6000, max: 10000 },
            'not_sure': { min: 0, max: 0, flexible: true }
        };
        return mapping[formValue] || { min: 0, max: 0 };
    }

    /**
     * Map timeline from form to standardized format
     */
    mapTimeline(formValue) {
        const mapping = {
            'immediate': 'urgent',
            'short_term': '1-2-weeks',
            'medium_term': '2-4-weeks',
            'planning_ahead': 'flexible'
        };
        return mapping[formValue] || 'flexible';
    }

    /**
     * Update progress bar
     */
    updateProgressBar() {
        const progressFill = document.querySelector('.progress-fill');
        if (!progressFill) return;

        const progressPercentage = (this.currentStep / this.totalSteps) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }

    /**
     * Update progress text
     */
    updateProgressText() {
        const progressText = document.querySelector('.progress-text');
        if (!progressText) return;

        progressText.textContent = `Step ${this.currentStep} of ${this.totalSteps}`;
    }

    /**
     * Setup form steps
     */
    setupFormSteps() {
        // Initialize question navigation
        this.setupQuestionNavigation();
    }

    /**
     * Show specific step
     */
    showStep(stepNumber) {
        // Hide all question cards
        const questionCards = document.querySelectorAll('.question-card');
        questionCards.forEach(card => {
            card.classList.add('hidden');
            card.classList.remove('active');
        });

        // Show current step
        const currentStepElement = document.querySelector(`#question-${stepNumber}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('hidden');
            currentStepElement.classList.add('active');
        }

        // Update current step
        this.currentStep = stepNumber;

        // Update progress
        this.updateProgressBar();
        this.updateProgressText();

        // Focus first input in current step
        const firstInput = currentStepElement?.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    /**
     * Setup step validation
     */
    setupStepValidation() {
        // Validation is handled by option selection
        // No additional validation needed for questionnaire
    }

    /**
     * Validate specific step
     */
    validateStep(stepNumber) {
        const stepElement = document.querySelector(`.step:nth-child(${stepNumber})`);
        if (!stepElement) return true;

        const requiredInputs = stepElement.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Clear step errors
     */
    clearStepErrors(stepNumber) {
        const stepElement = document.querySelector(`.step:nth-child(${stepNumber})`);
        if (!stepElement) return;

        const errorMessages = stepElement.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());

        const errorInputs = stepElement.querySelectorAll('.error');
        errorInputs.forEach(input => input.classList.remove('error'));
    }

    /**
     * Validate individual field
     */
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Validation rules
        switch (fieldName) {
            case 'serviceType':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a service type';
                }
                break;
            case 'location':
                const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i;
                if (!postcodeRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid UK postcode';
                }
                break;
            case 'budgetRange':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a budget range';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'contactPreference':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a contact preference';
                }
                break;
            case 'urgency':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select urgency level';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    /**
     * Show field error
     */
    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    /**
     * Clear field error
     */
    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    /**
     * Setup navigation
     */
    setupNavigation() {
        this.setupNextButton();
        this.setupPrevButton();
        this.setupSubmitButton();
    }

    /**
     * Setup next button
     */
    setupNextButton() {
        const nextButton = document.querySelector('.nav-button.next');
        if (!nextButton) return;

        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.goToNextStep();
        });
    }

    /**
     * Setup previous button
     */
    setupPrevButton() {
        const prevButton = document.querySelector('.nav-button.prev');
        if (!prevButton) return;

        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.goToPrevStep();
        });
    }

    /**
     * Setup submit button
     */
    setupSubmitButton() {
        const submitButton = document.querySelector('.nav-button.next[type="submit"]');
        if (!submitButton) return;

        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    /**
     * Go to next step
     */
    goToNextStep() {
        console.log('goToNextStep called');
        
        // Find current visible question - look for the one that's active
        let currentQuestion = document.querySelector('.question-card.active');
        if (!currentQuestion) {
            currentQuestion = document.querySelector('.question-card:not(.hidden)');
        }
        
        console.log('Current question:', currentQuestion);
        console.log('Current question ID:', currentQuestion ? currentQuestion.id : 'none');
        console.log('Current question title:', currentQuestion ? currentQuestion.querySelector('.question-title')?.textContent : 'none');
        
        if (!currentQuestion) {
            console.log('No current question found');
            return;
        }

        // Check if current question has a selected option or filled form fields
        const hasSelection = currentQuestion.querySelector('.option.selected');
        const hasFormFields = currentQuestion.querySelector('input[type="email"], input[type="text"]');
        
        console.log('Has selection:', hasSelection);
        console.log('Has form fields:', hasFormFields);
        console.log('Selected option text:', hasSelection ? hasSelection.textContent.trim() : 'none');
        
        // For form-based questions (like question-7), check if required fields are filled
        if (!hasSelection && hasFormFields) {
            const emailField = currentQuestion.querySelector('input[type="email"]');
            const postcodeField = currentQuestion.querySelector('input[type="text"]');
            
            if (emailField && postcodeField) {
                const emailValue = emailField.value.trim();
                const postcodeValue = postcodeField.value.trim();
                
                console.log('Email value:', emailValue);
                console.log('Postcode value:', postcodeValue);
                
                if (!emailValue || !postcodeValue) {
                    console.log('Form fields not filled, showing error');
                    this.showStepError('Please fill in all required fields before continuing');
                    return;
                }
                
                console.log('Form fields are filled, proceeding');
            }
        } else if (!hasSelection) {
            console.log('No selection found, showing error');
            this.showStepError('Please select an option before continuing');
            return;
        }

        console.log('Moving to next question with ID:', currentQuestion.id);
        
        // Get current step number and move to next
        const currentStepNumber = parseInt(currentQuestion.id.replace('question-', ''));
        const nextStepNumber = currentStepNumber + 1;
        
        console.log('Current step:', currentStepNumber, 'Next step:', nextStepNumber);
        
        // Check if next step exists
        const nextQuestion = document.getElementById(`question-${nextStepNumber}`);
        if (nextQuestion) {
            // Move to next question using showStep
            this.showStep(nextStepNumber);
        } else {
            // No more questions, show summary
            console.log('No more questions, showing summary');
            this.showSummary();
        }
    }

    /**
     * Go to previous step
     */
    goToPrevStep() {
        // Find current visible question
        const currentQuestion = document.querySelector('.question-card.active');
        if (!currentQuestion) return;

        // Get current step number and move to previous
        const currentStepNumber = parseInt(currentQuestion.id.replace('question-', ''));
        const prevStepNumber = currentStepNumber - 1;
        
        if (prevStepNumber >= 1) {
            // Move to previous question using showStep
            this.showStep(prevStepNumber);
        }
    }

    /**
     * Update navigation buttons
     */
    updateNavigationButtons() {
        const prevButton = document.querySelector('.nav-button.prev');
        const nextButton = document.querySelector('.nav-button.next');
        const submitButton = document.querySelector('#submitBtn');

        // Find current question
        const currentQuestion = document.querySelector('.question-card.active');
        const allQuestions = document.querySelectorAll('.question-card');
        const currentIndex = Array.from(allQuestions).indexOf(currentQuestion);
        const isLastQuestion = currentIndex === allQuestions.length - 1;

        // If no active question found, default to showing next button
        if (!currentQuestion) {
            if (nextButton) {
                nextButton.style.display = 'inline-block';
                nextButton.style.visibility = 'visible';
            }
            if (submitButton) submitButton.style.display = 'none';
            return;
        }

        // Update previous button
        if (prevButton) {
            prevButton.disabled = currentIndex === 0;
        }

        // Update next/submit buttons
        if (isLastQuestion) {
            if (nextButton) {
                nextButton.style.display = 'none';
                nextButton.style.visibility = 'hidden';
            }
            if (submitButton) {
                submitButton.style.display = 'inline-block';
                submitButton.style.visibility = 'visible';
            }
        } else {
            if (nextButton) {
                nextButton.style.display = 'inline-block';
                nextButton.style.visibility = 'visible';
            }
            if (submitButton) {
                submitButton.style.display = 'none';
                submitButton.style.visibility = 'hidden';
            }
        }
    }

    /**
     * Save step data
     */
    saveStepData(stepNumber) {
        const stepElement = document.querySelector(`.step:nth-child(${stepNumber})`);
        if (!stepElement) return;

        const inputs = stepElement.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.name) {
                if (input.type === 'checkbox') {
                    this.formData[input.name] = input.checked;
                } else if (input.type === 'radio') {
                    if (input.checked) {
                        this.formData[input.name] = input.value;
                    }
                } else {
                    this.formData[input.name] = input.value;
                }
            }
        });

        // Save to localStorage
        localStorage.setItem('questionnaireData', JSON.stringify(this.formData));
    }

    /**
     * Load step data
     */
    loadStepData() {
        const savedData = localStorage.getItem('questionnaireData');
        if (savedData) {
            try {
                this.formData = JSON.parse(savedData);
                this.populateForm();
            } catch (e) {
                console.warn('Could not parse saved questionnaire data');
            }
        }
    }

    /**
     * Populate form with saved data
     */
    populateForm() {
        Object.keys(this.formData).forEach(name => {
            const field = document.querySelector(`[name="${name}"]`);
            if (!field) return;

            if (field.type === 'checkbox') {
                field.checked = this.formData[name];
            } else if (field.type === 'radio') {
                if (field.value === this.formData[name]) {
                    field.checked = true;
                }
            } else {
                field.value = this.formData[name];
            }
        });
    }

    /**
     * Handle form submission
     */
    async handleSubmit() {
        if (this.isSubmitting) return;

        // Validate final step
        if (!this.validateStep(this.currentStep)) {
            this.showStepError('Please complete all required fields');
            return;
        }

        // Save final step data
        this.saveStepData(this.currentStep);

        this.isSubmitting = true;
        this.setSubmitButtonLoading(true);

        try {
            // Submit form data
            const response = await this.submitForm();
            
            if (response.success) {
                this.handleSubmissionSuccess(response);
            } else {
                this.showStepError(response.error || 'Submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            this.showStepError('Submission failed. Please try again.');
        } finally {
            this.isSubmitting = false;
            this.setSubmitButtonLoading(false);
        }
    }

    /**
     * Submit form data
     */
    async submitForm() {
        // Gather comprehensive data
        const comprehensiveData = this.gatherCurrentData();
        comprehensiveData.completed = true;
        
        console.log('Saving comprehensive questionnaire data:', comprehensiveData);
        
        // Save comprehensive data to localStorage with validation
        const saved = this.saveQuestionnaireData(comprehensiveData);
        
        if (!saved) {
            return {
                success: false,
                error: 'Failed to save questionnaire data. Please check your inputs and try again.'
            };
        }
        
        // Also save legacy format for backward compatibility
        localStorage.setItem('questionnaireData', JSON.stringify(this.formData));
        
        // Save individual fields for free report
        Object.keys(this.formData).forEach(key => {
            localStorage.setItem(key, this.formData[key]);
        });
        
        // Simulate successful response
        return {
            success: true,
            message: 'Data saved successfully',
            redirectUrl: 'reports/free_report.html'
        };
    }

    /**
     * Handle successful submission
     */
    handleSubmissionSuccess(response) {
        // Track successful submission
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'engagement',
                'event_label': 'questionnaire_complete',
                'value': 1
            });
        }

        // Don't clear saved data - we need it for the free report
        console.log('Questionnaire completed successfully');

        // Redirect to free report
        window.location.href = 'reports/free_report.html';
    }

    /**
     * Set submit button loading state
     */
    setSubmitButtonLoading(loading) {
        const submitButton = document.querySelector('.nav-button.next[type="submit"]');
        if (!submitButton) return;

        if (loading) {
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            submitButton.textContent = 'Submitting...';
        } else {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            submitButton.textContent = 'Submit Questionnaire';
        }
    }

    /**
     * Show step error
     */
    showStepError(message) {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.message.error');
        existingErrors.forEach(error => error.remove());

        // Create new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message error';
        errorDiv.textContent = message;

        // Insert at top of current step
        const currentStepElement = document.querySelector('.step.active');
        if (currentStepElement) {
            currentStepElement.insertBefore(errorDiv, currentStepElement.firstChild);
        }

        // Scroll to error
        errorDiv.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Setup data persistence
     */
    setupDataPersistence() {
        this.loadStepData();
        
        // Auto-save on input change
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.saveStepData(this.currentStep);
            });
        });
    }

    /**
     * Setup legal disclaimer
     */
    setupLegalDisclaimer() {
        const disclaimerBanner = document.querySelector('.legal-disclaimer-banner');
        if (!disclaimerBanner) return;

        // Add click handler to dismiss disclaimer
        disclaimerBanner.addEventListener('click', () => {
            disclaimerBanner.style.display = 'none';
        });

        // Auto-hide after 10 seconds
        setTimeout(() => {
            disclaimerBanner.style.opacity = '0.7';
        }, 10000);
    }

    /**
     * Track step completion
     */
    trackStepCompletion(stepNumber) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'questionnaire_step', {
                'event_category': 'engagement',
                'event_label': `step_${stepNumber}_complete`,
                'value': stepNumber
            });
        }
    }

    /**
     * Setup option selection functionality
     */
    setupOptionSelection() {
        const options = document.querySelectorAll('.option');
        
        if (options.length === 0) {
            console.error('Questionnaire: No options found!');
            return;
        }
        
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleOptionSelection(option);
            });
            
            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleOptionSelection(option);
                }
            });
        });
    }

    /**
     * Handle option selection
     */
    handleOptionSelection(selectedOption) {
        const questionCard = selectedOption.closest('.question-card');
        const questionId = questionCard.id;
        const questionType = selectedOption.dataset.question;
        const value = selectedOption.dataset.value;
        
        // Remove selection from other options in the same question
        const otherOptions = questionCard.querySelectorAll('.option');
        otherOptions.forEach(option => {
            option.classList.remove('selected');
        });
        
        // Select the clicked option
        selectedOption.classList.add('selected');
        
        // Store the selection
        this.formData[questionType] = value;
        
        // Also update questionnaireData for validation
        this.updateQuestionnaireData(questionType, value);
        
        // Update progress
        this.updateProgress();
        
        // Update navigation buttons after selection
        this.updateNavigationButtons();
    }

    /**
     * Update questionnaireData based on form selection
     */
    updateQuestionnaireData(questionType, value) {
        switch (questionType) {
            case 'service_type':
                this.questionnaireData.serviceType = value;
                break;
            case 'location_001': // postcode
                this.questionnaireData.location.postcode = value;
                break;
            case 'location_002': // town
                this.questionnaireData.location.town = value;
                break;
            case 'location_003': // county
                this.questionnaireData.location.county = value;
                break;
            case 'location_004': // region
                this.questionnaireData.location.region = value;
                break;
            case 'budget_range':
                const budgetMapping = {
                    'under-2000': { min: 0, max: 2000 },
                    '2000-3000': { min: 2000, max: 3000 },
                    '3000-4000': { min: 3000, max: 4000 },
                    '4000-5000': { min: 4000, max: 5000 },
                    '5000-6000': { min: 5000, max: 6000 },
                    'over-6000': { min: 6000, max: 10000 },
                    'flexible': { min: 0, max: 0, flexible: true }
                };
                const budget = budgetMapping[value];
                if (budget) {
                    this.questionnaireData.budget = budget;
                }
                break;
            case 'timeline':
                this.questionnaireData.timeline = value;
                break;
            case 'contact_001': // name
                this.questionnaireData.contactInfo.name = value;
                break;
            case 'contact_002': // email
                this.questionnaireData.contactInfo.email = value;
                break;
            case 'contact_003': // phone
                this.questionnaireData.contactInfo.phone = value;
                break;
        }
    }

    /**
     * Setup question navigation
     */
    setupQuestionNavigation() {
        // Hide all questions except the first one
        const questions = document.querySelectorAll('.question-card');
        questions.forEach((question, index) => {
            if (index === 0) {
                question.classList.remove('hidden');
                question.classList.add('active');
            } else {
                question.classList.add('hidden');
                question.classList.remove('active');
            }
        });
        
        // Set current step to 1
        this.currentStep = 1;
    }

    /**
     * Show next question
     */
    showNextQuestion(currentQuestionId) {
        console.log('showNextQuestion called with ID:', currentQuestionId);
        const currentQuestion = document.getElementById(currentQuestionId);
        console.log('Current question element:', currentQuestion);
        
        if (!currentQuestion) {
            console.log('Current question not found by ID');
            return;
        }
        
        // Find the next question-card, skipping intermediate sections
        let nextQuestion = currentQuestion.nextElementSibling;
        console.log('Next element:', nextQuestion);
        
        // Keep looking until we find a question-card or run out of elements
        while (nextQuestion && !nextQuestion.classList.contains('question-card')) {
            console.log('Skipping non-question element:', nextQuestion.id, nextQuestion.className);
            nextQuestion = nextQuestion.nextElementSibling;
        }
        
        console.log('Next question element:', nextQuestion);
        console.log('Next question ID:', nextQuestion ? nextQuestion.id : 'none');
        console.log('Next question classes:', nextQuestion ? nextQuestion.className : 'none');
        
        if (nextQuestion && nextQuestion.classList.contains('question-card')) {
            console.log('Moving to next question');
            console.log('Hiding current question:', currentQuestion.id);
            console.log('Showing next question:', nextQuestion.id);
            
            // Hide current question
            currentQuestion.classList.add('hidden');
            currentQuestion.classList.remove('active');
            
            // Show next question
            nextQuestion.classList.remove('hidden');
            nextQuestion.classList.add('active');
            
            // Update current step number
            const stepNumber = parseInt(nextQuestion.id.replace('question-', ''));
            this.currentStep = stepNumber;
            
            // Update progress
            this.updateProgress();
            
            // Update navigation buttons
            this.updateNavigationButtons();
            
            console.log('Transition completed successfully');
        } else {
            console.log('No more questions, showing summary');
            console.log('Current question was:', currentQuestion.id);
            console.log('No next question found, this should be the last question');
            // No more questions, show summary
            this.showSummary();
        }
    }

    /**
     * Update progress
     */
    updateProgress() {
        const totalQuestions = this.totalSteps;
        
        // Update progress bar
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            const progressPercentage = (this.currentStep / totalQuestions) * 100;
            progressFill.style.width = `${progressPercentage}%`;
        }
        
        // Update step counter
        const currentStepElement = document.getElementById('current-step');
        if (currentStepElement) {
            currentStepElement.textContent = this.currentStep;
        }
        
        // Update progress text
        const progressText = document.getElementById('progress-text');
        if (progressText) {
            progressText.textContent = `Question ${this.currentStep} of ${totalQuestions}`;
        }
    }

    /**
     * Show summary
     */
    showSummary() {
        console.log('showSummary called');
        const summarySection = document.querySelector('.summary-section');
        console.log('Summary section found:', summarySection);
        
        if (summarySection) {
            console.log('Showing summary section');
            summarySection.style.display = 'block';
            
            // Update summary with selected options
            this.updateSummary();
        } else {
            console.log('No summary section found!');
            // If no summary section, redirect to free report
            console.log('Redirecting to free report');
            window.location.href = 'reports/free_report.html';
        }
    }

    /**
     * Update summary with selected options
     */
    updateSummary() {
        // This would update the summary section with the selected options
        // Implementation depends on the specific summary structure
        console.log('Form data:', this.formData);
    }
}

/**
 * Initialize questionnaire module when DOM is loaded
 */
function initializeQuestionnaire() {
    try {
        window.questionnaire = new QuestionnaireModule();
    } catch (error) {
        console.error('Failed to initialize questionnaire:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeQuestionnaire);
} else {
    initializeQuestionnaire();
}

/**
 * Export for use in other modules
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionnaireModule;
}
