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
        this.totalSteps = 3;
        this.formData = {};
        this.isSubmitting = false;
        
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
        
        // Update navigation buttons after initialization
        this.updateNavigationButtons();
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
     * Setup progress indicator
     */
    setupProgressIndicator() {
        this.updateProgressBar();
        this.updateProgressText();
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
        // Hide all steps
        const steps = document.querySelectorAll('.step');
        steps.forEach(step => {
            step.classList.remove('active');
        });

        // Show current step
        const currentStepElement = document.querySelector(`.step:nth-child(${stepNumber})`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }

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
            console.log('Next button clicked');
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
        
        // Find current visible question - look for the one that's actually visible
        let currentQuestion = document.querySelector('.question-card[style*="block"]');
        if (!currentQuestion) {
            currentQuestion = document.querySelector('.question-card:not(.hidden):not([style*="none"])');
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
        // Move to next question
        this.showNextQuestion(currentQuestion.id);
    }

    /**
     * Go to previous step
     */
    goToPrevStep() {
        // Find current visible question
        const currentQuestion = document.querySelector('.question-card[style*="block"], .question-card:not([style*="none"])');
        if (!currentQuestion) return;

        // Find previous question
        const prevQuestion = currentQuestion.previousElementSibling;
        if (prevQuestion && prevQuestion.classList.contains('question-card')) {
            // Hide current question
            currentQuestion.style.display = 'none';
            
            // Show previous question
            prevQuestion.style.display = 'block';
            
            // Update progress
            this.updateProgress();
            
            // Update navigation buttons
            this.updateNavigationButtons();
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
        const currentQuestion = document.querySelector('.question-card[style*="block"], .question-card:not([style*="none"])');
        const allQuestions = document.querySelectorAll('.question-card');
        const currentIndex = Array.from(allQuestions).indexOf(currentQuestion);
        const isLastQuestion = currentIndex === allQuestions.length - 1;

        // Update previous button
        if (prevButton) {
            prevButton.disabled = currentIndex === 0;
        }

        // Update next/submit buttons
        if (isLastQuestion) {
            if (nextButton) nextButton.style.display = 'none';
            if (submitButton) submitButton.style.display = 'inline-block';
        } else {
            if (nextButton) nextButton.style.display = 'inline-block';
            if (submitButton) submitButton.style.display = 'none';
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
        // For local testing, save data to localStorage and redirect to free report
        console.log('Saving form data to localStorage:', this.formData);
        
        // Save form data to localStorage
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
        
        // Update progress
        this.updateProgress();
    }

    /**
     * Setup question navigation
     */
    setupQuestionNavigation() {
        // Hide all questions except the first one
        const questions = document.querySelectorAll('.question-card');
        questions.forEach((question, index) => {
            if (index === 0) {
                question.style.display = 'block';
            } else {
                question.style.display = 'none';
            }
        });
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
            currentQuestion.style.display = 'none';
            
            // Show next question
            nextQuestion.style.display = 'block';
            
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
        const questions = document.querySelectorAll('.question-card');
        const answeredQuestions = document.querySelectorAll('.question-card .option.selected').length;
        const totalQuestions = questions.length;
        
        // Update progress bar
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            const progressPercentage = (answeredQuestions / totalQuestions) * 100;
            progressFill.style.width = `${progressPercentage}%`;
        }
        
        // Update step counter
        const currentStepElement = document.getElementById('current-step');
        if (currentStepElement) {
            currentStepElement.textContent = answeredQuestions + 1;
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
document.addEventListener('DOMContentLoaded', () => {
    new QuestionnaireModule();
});

/**
 * Export for use in other modules
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionnaireModule;
}
