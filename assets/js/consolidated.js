/**
 * CONSOLIDATED JAVASCRIPT - CLEARFUNERALCOSTS
 * Version: 1.0.0
 * Description: Consolidated JavaScript with no duplication
 */

class ClearFuneralCosts {
    constructor() {
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();
        this.initializeModules();
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('#analysisForm')) {
                this.handleFormSubmission(e);
            }
        });

        // Input changes
        document.addEventListener('input', (e) => {
            if (e.target.matches('#postcode, #serviceType')) {
                this.updateCostEstimate();
            }
        });

        // FAQ toggles
        document.addEventListener('click', (e) => {
            if (e.target.matches('.faq-question')) {
                this.toggleFAQ(e.target);
            }
        });

        // Smooth scrolling
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                this.smoothScroll(e);
            }
        });
    }

    /**
     * Initialize all modules
     */
    initializeModules() {
        this.calculatorModule = new CalculatorModule();
        this.faqModule = new FAQModule();
        this.analyticsModule = new AnalyticsModule();
        this.uxModule = new UXModule();
    }

    /**
     * Handle form submission
     */
    handleFormSubmission(event) {
        event.preventDefault();
        const formData = this.getFormData(event.target);
        
        if (this.validateForm(formData)) {
            this.submitForm(formData);
        }
    }

    /**
     * Get form data
     */
    getFormData(form) {
        return {
            postcode: form.postcode.value,
            serviceType: form.serviceType.value,
            email: form.email.value
        };
    }

    /**
     * Validate form data
     */
    validateForm(data) {
        const errors = [];
        
        if (!data.postcode) {
            errors.push('Postcode is required');
        }
        
        if (!data.serviceType) {
            errors.push('Service type is required');
        }
        
        if (!data.email) {
            errors.push('Email is required');
        } else if (!this.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (errors.length > 0) {
            this.showErrors(errors);
            return false;
        }
        
        return true;
    }

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Show validation errors
     */
    showErrors(errors) {
        const errorContainer = document.getElementById('message-box');
        if (errorContainer) {
            errorContainer.innerHTML = errors.map(error => 
                `<div class="error-message">${error}</div>`
            ).join('');
            errorContainer.style.display = 'block';
        }
    }

    /**
     * Submit form
     */
    submitForm(data) {
        this.showLoadingState();
        
        // Simulate API call
        setTimeout(() => {
            this.hideLoadingState();
            this.redirectToReport(data);
        }, 1000);
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Processing...';
        }
    }

    /**
     * Hide loading state
     */
    hideLoadingState() {
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Explore Your Options';
        }
    }

    /**
     * Redirect to report
     */
    redirectToReport(data) {
        const params = new URLSearchParams(data);
        window.location.href = `reports/free_report.html?${params.toString()}`;
    }

    /**
     * Update cost estimate
     */
    updateCostEstimate() {
        const postcode = document.getElementById('postcode')?.value;
        const serviceType = document.getElementById('serviceType')?.value;
        
        if (postcode && serviceType) {
            this.showEmailForm();
            this.enableSubmitButton();
        } else {
            this.hideEmailForm();
            this.disableSubmitButton();
        }
    }

    /**
     * Show email form
     */
    showEmailForm() {
        const emailContainer = document.querySelector('.email-container');
        if (emailContainer) {
            emailContainer.style.display = 'block';
        }
    }

    /**
     * Hide email form
     */
    hideEmailForm() {
        const emailContainer = document.querySelector('.email-container');
        if (emailContainer) {
            emailContainer.style.display = 'none';
        }
    }

    /**
     * Enable submit button
     */
    enableSubmitButton() {
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = false;
        }
    }

    /**
     * Disable submit button
     */
    disableSubmitButton() {
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
        }
    }

    /**
     * Toggle FAQ item
     */
    toggleFAQ(button) {
        const content = button.nextElementSibling;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            this.closeFAQItem(button, content);
        } else {
            this.openFAQItem(button, content);
        }
    }

    /**
     * Open FAQ item
     */
    openFAQItem(button, content) {
        button.setAttribute('aria-expanded', 'true');
        content.style.display = 'block';
        content.style.maxHeight = content.scrollHeight + 'px';
    }

    /**
     * Close FAQ item
     */
    closeFAQItem(button, content) {
        button.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0';
        setTimeout(() => {
            content.style.display = 'none';
        }, 300);
    }

    /**
     * Smooth scroll to element
     */
    smoothScroll(event) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

/**
 * Calculator Module
 */
class CalculatorModule {
    constructor() {
        this.regionalCosts = this.getRegionalCostData();
    }

    /**
     * Get regional cost data
     */
    getRegionalCostData() {
        return {
            'BN1': { basic: 3500, standard: 4500, premium: 6500 },
            'BN2': { basic: 3600, standard: 4600, premium: 6600 },
            'BN3': { basic: 3400, standard: 4400, premium: 6400 },
            'default': { basic: 3500, standard: 4500, premium: 6500 }
        };
    }

    /**
     * Calculate cost estimate
     */
    calculateEstimate(postcode, serviceType) {
        const area = postcode.substring(0, 3);
        const costs = this.regionalCosts[area] || this.regionalCosts.default;
        
        switch (serviceType) {
            case 'basic':
                return costs.basic;
            case 'standard':
                return costs.standard;
            case 'premium':
                return costs.premium;
            default:
                return costs.standard;
        }
    }
}

/**
 * FAQ Module
 */
class FAQModule {
    constructor() {
        this.openItems = new Set();
    }

    /**
     * Toggle FAQ item
     */
    toggle(id) {
        if (this.openItems.has(id)) {
            this.close(id);
        } else {
            this.open(id);
        }
    }

    /**
     * Open FAQ item
     */
    open(id) {
        this.openItems.add(id);
        const content = document.getElementById(`faq-answer-${id}`);
        const button = document.getElementById(`faq-question-${id}`);
        
        if (content && button) {
            button.setAttribute('aria-expanded', 'true');
            content.style.display = 'block';
        }
    }

    /**
     * Close FAQ item
     */
    close(id) {
        this.openItems.delete(id);
        const content = document.getElementById(`faq-answer-${id}`);
        const button = document.getElementById(`faq-question-${id}`);
        
        if (content && button) {
            button.setAttribute('aria-expanded', 'false');
            content.style.display = 'none';
        }
    }
}

/**
 * Analytics Module
 */
class AnalyticsModule {
    constructor() {
        this.init();
    }

    init() {
        this.setupGoogleAnalytics();
        this.trackPageView();
    }

    setupGoogleAnalytics() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
    }

    trackPageView() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }

    trackEvent(eventName, eventData) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }
}

/**
 * UX Module
 */
class UXModule {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingStates();
        this.setupFormValidation();
        this.setupSmoothScrolling();
    }

    setupLoadingStates() {
        // Loading states implementation
    }

    setupFormValidation() {
        // Form validation implementation
    }

    setupSmoothScrolling() {
        // Smooth scrolling implementation
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.clearFuneralCosts = new ClearFuneralCosts();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ClearFuneralCosts;
}
