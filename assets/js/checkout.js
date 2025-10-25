/* ============================================
   CLEARFUNERALCOSTS - CHECKOUT FUNCTIONALITY
   Функциональность для страниц оплаты
   ============================================ */

/**
 * Checkout Module - Handles payment processing functionality
 */
class CheckoutModule {
    constructor() {
        this.stripe = null;
        this.elements = null;
        this.cardElement = null;
        this.expiryElement = null;
        this.cvvElement = null;
        this.paymentIntent = null;
        this.isProcessing = false;
        
        this.init();
    }

    /**
     * Initialize checkout functionality
     */
    async init() {
        await this.initializeStripe();
        this.setupFormValidation();
        this.setupStripeElements();
        this.setupFormSubmission();
        this.setupSecurityBadges();
        this.setupOrderSummary();
    }

    /**
     * Initialize Stripe
     */
    async initializeStripe() {
        try {
            // Check if Stripe is loaded
            if (typeof Stripe === 'undefined') {
                console.error('Stripe is not loaded');
                return;
            }

            this.stripe = Stripe('pk_test_51234567890abcdef'); // Replace with actual publishable key
            
            // Create payment intent
            await this.createPaymentIntent();
            
        } catch (error) {
            console.error('Error initializing Stripe:', error);
            this.showError('Payment system initialization failed. Please try again.');
        }
    }

    /**
     * Create payment intent
     */
    async createPaymentIntent() {
        try {
            const response = await fetch('/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 4680, // £46.80 in pence
                    currency: 'gbp',
                    customerEmail: 'test@example.com', // Will be updated from form
                    reportId: 'premium_guide'
                })
            });

            const data = await response.json();
            
            if (data.success) {
                this.paymentIntent = data.data;
            } else {
                throw new Error(data.error || 'Failed to create payment intent');
            }
        } catch (error) {
            console.error('Error creating payment intent:', error);
            // For demo purposes, create a mock payment intent
            this.paymentIntent = {
                id: 'pi_mock_' + Date.now(),
                client_secret: 'pi_mock_secret_' + Date.now(),
                amount: 4680,
                currency: 'gbp',
                status: 'requires_payment_method'
            };
        }
    }

    /**
     * Setup form validation
     */
    setupFormValidation() {
        const form = document.getElementById('payment-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
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
            case 'cardholderName':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Cardholder name must be at least 2 characters';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'billingAddress':
                if (value.length < 5) {
                    isValid = false;
                    errorMessage = 'Please enter a complete address';
                }
                break;
            case 'city':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'City must be at least 2 characters';
                }
                break;
            case 'postcode':
                const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i;
                if (!postcodeRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid UK postcode';
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
     * Setup Stripe Elements
     */
    setupStripeElements() {
        if (!this.stripe) return;

        const elements = this.stripe.elements({
            clientSecret: this.paymentIntent?.client_secret
        });

        this.elements = elements;

        // Card number element
        this.cardElement = elements.create('cardNumber', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
            },
        });

        // Expiry date element
        this.expiryElement = elements.create('cardExpiry', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
            },
        });

        // CVV element
        this.cvvElement = elements.create('cardCvc', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
            },
        });

        // Mount elements
        const cardNumberContainer = document.getElementById('cardNumber');
        const expiryContainer = document.getElementById('expiryDate');
        const cvvContainer = document.getElementById('cvv');

        if (cardNumberContainer) {
            this.cardElement.mount('#cardNumber');
        }
        if (expiryContainer) {
            this.expiryElement.mount('#expiryDate');
        }
        if (cvvContainer) {
            this.cvvElement.mount('#cvv');
        }

        // Add event listeners
        this.cardElement.on('change', (event) => {
            this.handleStripeElementChange(event, 'cardNumber');
        });

        this.expiryElement.on('change', (event) => {
            this.handleStripeElementChange(event, 'expiryDate');
        });

        this.cvvElement.on('change', (event) => {
            this.handleStripeElementChange(event, 'cvv');
        });
    }

    /**
     * Handle Stripe element change events
     */
    handleStripeElementChange(event, elementType) {
        const displayError = document.getElementById(`${elementType}-error`);
        
        if (event.error) {
            if (displayError) {
                displayError.textContent = event.error.message;
                displayError.style.display = 'block';
            }
        } else {
            if (displayError) {
                displayError.style.display = 'none';
            }
        }
    }

    /**
     * Setup form submission
     */
    setupFormSubmission() {
        const form = document.getElementById('payment-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
    }

    /**
     * Handle form submission
     */
    async handleFormSubmission() {
        if (this.isProcessing) return;

        // Validate form
        if (!this.validateForm()) {
            return;
        }

        this.isProcessing = true;
        this.setSubmitButtonLoading(true);

        try {
            // Get form data
            const formData = this.getFormData();
            
            // Confirm payment with Stripe
            const result = await this.stripe.confirmCardPayment(
                this.paymentIntent.client_secret,
                {
                    payment_method: {
                        card: this.cardElement,
                        billing_details: {
                            name: formData.cardholderName,
                            email: formData.email,
                            address: {
                                line1: formData.billingAddress,
                                city: formData.city,
                                postal_code: formData.postcode,
                                country: 'GB',
                            },
                        },
                    },
                }
            );

            if (result.error) {
                this.showError(result.error.message);
            } else {
                this.handlePaymentSuccess(result.paymentIntent);
            }
        } catch (error) {
            console.error('Payment error:', error);
            this.showError('Payment failed. Please try again.');
        } finally {
            this.isProcessing = false;
            this.setSubmitButtonLoading(false);
        }
    }

    /**
     * Validate entire form
     */
    validateForm() {
        const form = document.getElementById('payment-form');
        const requiredFields = form.querySelectorAll('input[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Get form data
     */
    getFormData() {
        const form = document.getElementById('payment-form');
        const formData = new FormData(form);
        
        return {
            cardholderName: formData.get('cardholderName'),
            email: formData.get('email'),
            billingAddress: formData.get('billingAddress'),
            city: formData.get('city'),
            postcode: formData.get('postcode')
        };
    }

    /**
     * Set submit button loading state
     */
    setSubmitButtonLoading(loading) {
        const submitButton = document.getElementById('submitButton');
        if (!submitButton) return;

        if (loading) {
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            submitButton.textContent = 'Processing...';
        } else {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            submitButton.textContent = 'Complete Payment - £39';
        }
    }

    /**
     * Handle successful payment
     */
    handlePaymentSuccess(paymentIntent) {
        // Track successful payment
        if (typeof gtag !== 'undefined') {
            gtag('event', 'purchase', {
                'transaction_id': paymentIntent.id,
                'value': 46.80,
                'currency': 'GBP'
            });
        }

        // Redirect to success page
        window.location.href = 'thank-you.html?payment_intent=' + paymentIntent.id;
    }

    /**
     * Show error message
     */
    showError(message) {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.message.error');
        existingErrors.forEach(error => error.remove());

        // Create new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message error';
        errorDiv.textContent = message;

        // Insert at top of form
        const form = document.getElementById('payment-form');
        if (form) {
            form.insertBefore(errorDiv, form.firstChild);
        }

        // Scroll to error
        errorDiv.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Setup security badges
     */
    setupSecurityBadges() {
        const securityBadges = document.querySelectorAll('.security-badge');
        securityBadges.forEach(badge => {
            badge.addEventListener('click', () => {
                this.showSecurityInfo(badge);
            });
        });
    }

    /**
     * Show security information
     */
    showSecurityInfo(badge) {
        const badgeText = badge.textContent.trim();
        let message = '';

        switch (badgeText) {
            case 'SSL Encrypted':
                message = 'Your connection is encrypted with SSL/TLS technology, the same security used by banks.';
                break;
            case 'Stripe Protected':
                message = 'Your payment is processed by Stripe, a PCI DSS Level 1 certified payment processor.';
                break;
            case 'PCI Compliant':
                message = 'We meet the highest standards for payment card industry security.';
                break;
        }

        if (message) {
            alert(message);
        }
    }

    /**
     * Setup order summary
     */
    setupOrderSummary() {
        // Update order summary with current date
        const orderDate = new Date().toLocaleDateString('en-GB');
        const orderSummary = document.querySelector('.order-summary');
        if (orderSummary) {
            // Add order date if not exists
            let dateElement = orderSummary.querySelector('.order-date');
            if (!dateElement) {
                dateElement = document.createElement('div');
                dateElement.className = 'summary-item order-date';
                dateElement.innerHTML = `
                    <span class="summary-label">Order Date</span>
                    <span class="summary-value">${orderDate}</span>
                `;
                orderSummary.appendChild(dateElement);
            }
        }
    }
}

/**
 * Initialize checkout module when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    new CheckoutModule();
});

/**
 * Export for use in other modules
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CheckoutModule;
}
