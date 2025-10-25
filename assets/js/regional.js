/* ============================================
   CLEARFUNERALCOSTS - REGIONAL FUNCTIONALITY
   Региональная функциональность
   ============================================ */

/**
 * Regional Module - Handles regional page functionality
 */
class RegionalModule {
    constructor() {
        this.regionName = 'South East England';
        this.regionStats = null;
        this.calculatorData = {};
        this.comparisonData = [];
        
        this.init();
    }

    /**
     * Initialize regional functionality
     */
    init() {
        this.loadRegionData();
        this.setupRegionalStats();
        this.setupRegionalCalculator();
        this.setupRegionalComparison();
        this.setupMobileOptimizations();
        this.setupAnalytics();
    }

    /**
     * Load region data
     */
    loadRegionData() {
        // Get region from URL or default to South East
        const urlParams = new URLSearchParams(window.location.search);
        const region = urlParams.get('region') || 'south-east';
        
        this.regionName = this.getRegionName(region);
        this.regionStats = this.getRegionStats(region);
        this.comparisonData = this.getComparisonData(region);
    }

    /**
     * Get region name from region code
     */
    getRegionName(regionCode) {
        const regionNames = {
            'south-east': 'South East England',
            'london': 'London',
            'south-west': 'South West England',
            'midlands': 'Midlands',
            'north': 'North England',
            'scotland': 'Scotland',
            'wales': 'Wales',
            'northern-ireland': 'Northern Ireland'
        };
        
        return regionNames[regionCode] || 'South East England';
    }

    /**
     * Get region statistics
     */
    getRegionStats(regionCode) {
        const stats = {
            'south-east': {
                averageCost: 4200,
                costRange: [3200, 5800],
                population: 9200000,
                providers: 45,
                savings: 1500,
                trends: {
                    yearOverYear: 3.2,
                    seasonal: 'Higher in winter months'
                }
            },
            'london': {
                averageCost: 5200,
                costRange: [4200, 7200],
                population: 9000000,
                providers: 180,
                savings: 2000,
                trends: {
                    yearOverYear: 4.1,
                    seasonal: 'Consistent throughout year'
                }
            },
            'south-west': {
                averageCost: 3800,
                costRange: [2800, 5200],
                population: 5600000,
                providers: 28,
                savings: 1200,
                trends: {
                    yearOverYear: 2.8,
                    seasonal: 'Higher in summer months'
                }
            },
            'midlands': {
                averageCost: 3600,
                costRange: [2600, 4800],
                population: 10800000,
                providers: 65,
                savings: 1000,
                trends: {
                    yearOverYear: 2.5,
                    seasonal: 'Stable throughout year'
                }
            },
            'north': {
                averageCost: 3200,
                costRange: [2200, 4200],
                population: 15000000,
                providers: 85,
                savings: 800,
                trends: {
                    yearOverYear: 2.1,
                    seasonal: 'Slightly higher in winter'
                }
            }
        };
        
        return stats[regionCode] || stats['south-east'];
    }

    /**
     * Get comparison data
     */
    getComparisonData(regionCode) {
        return [
            {
                region: this.regionName,
                averageCost: this.regionStats.averageCost,
                population: this.regionStats.population,
                providers: this.regionStats.providers,
                trend: 'up',
                change: this.regionStats.trends.yearOverYear
            },
            {
                region: 'National Average',
                averageCost: 4200,
                population: 67000000,
                providers: 2000,
                trend: 'stable',
                change: 0.8
            },
            {
                region: 'London',
                averageCost: 5200,
                population: 9000000,
                providers: 180,
                trend: 'up',
                change: 4.1
            }
        ];
    }

    /**
     * Setup regional statistics
     */
    setupRegionalStats() {
        this.updateRegionalStats();
        this.setupStatsInteractions();
    }

    /**
     * Update regional statistics display
     */
    updateRegionalStats() {
        // Update average cost
        const averageCostElement = document.querySelector('.stat-number');
        if (averageCostElement) {
            averageCostElement.textContent = `£${this.regionStats.averageCost.toLocaleString()}`;
        }

        // Update cost range
        const costRangeElement = document.querySelector('.cost-range');
        if (costRangeElement) {
            costRangeElement.textContent = `£${this.regionStats.costRange[0].toLocaleString()} - £${this.regionStats.costRange[1].toLocaleString()}`;
        }

        // Update population
        const populationElement = document.querySelector('[data-stat="population"]');
        if (populationElement) {
            populationElement.textContent = this.regionStats.population.toLocaleString();
        }

        // Update providers
        const providersElement = document.querySelector('[data-stat="providers"]');
        if (providersElement) {
            providersElement.textContent = this.regionStats.providers;
        }

        // Update savings
        const savingsElement = document.querySelector('[data-stat="savings"]');
        if (savingsElement) {
            savingsElement.textContent = `£${this.regionStats.savings.toLocaleString()}`;
        }
    }

    /**
     * Setup stats interactions
     */
    setupStatsInteractions() {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            card.addEventListener('click', () => {
                this.showStatDetails(card);
            });
        });
    }

    /**
     * Show stat details
     */
    showStatDetails(card) {
        const statType = card.dataset.stat;
        let details = '';

        switch (statType) {
            case 'averageCost':
                details = `The average funeral cost in ${this.regionName} is £${this.regionStats.averageCost.toLocaleString()}, based on data from ${this.regionStats.providers} local providers.`;
                break;
            case 'population':
                details = `${this.regionName} has a population of ${this.regionStats.population.toLocaleString()}, making it one of the most populous regions in the UK.`;
                break;
            case 'providers':
                details = `There are ${this.regionStats.providers} funeral directors and crematoria in ${this.regionName}, providing good choice for families.`;
                break;
            case 'savings':
                details = `Families in ${this.regionName} can typically save £${this.regionStats.savings.toLocaleString()} by comparing providers and considering alternative service types.`;
                break;
        }

        if (details) {
            alert(details);
        }
    }

    /**
     * Setup regional calculator
     */
    setupRegionalCalculator() {
        this.setupCalculatorForm();
        this.setupCalculatorValidation();
        this.setupCalculatorSubmission();
    }

    /**
     * Setup calculator form
     */
    setupCalculatorForm() {
        const form = document.querySelector('.calculator-form');
        if (!form) return;

        // Pre-populate with region data
        this.populateCalculatorForm();
        
        // Add event listeners for cost estimation
        this.setupCostEstimation();
    }

    /**
     * Populate calculator form
     */
    populateCalculatorForm() {
        // Set default postcode based on region
        const postcodeInput = document.querySelector('input[name="postcode"]');
        if (postcodeInput && !postcodeInput.value) {
            const defaultPostcodes = {
                'south-east': 'BN1 4GH',
                'london': 'SW1A 1AA',
                'south-west': 'BS1 5TR',
                'midlands': 'B1 1BB',
                'north': 'M1 1AA'
            };
            
            const regionCode = new URLSearchParams(window.location.search).get('region') || 'south-east';
            postcodeInput.value = defaultPostcodes[regionCode] || 'BN1 4GH';
        }
    }

    /**
     * Setup cost estimation
     */
    setupCostEstimation() {
        const postcodeInput = document.querySelector('input[name="postcode"]');
        const serviceTypeSelect = document.querySelector('select[name="serviceType"]');

        if (postcodeInput && serviceTypeSelect) {
            postcodeInput.addEventListener('input', () => {
                this.updateCostEstimate();
            });

            serviceTypeSelect.addEventListener('change', () => {
                this.updateCostEstimate();
            });
        }
    }

    /**
     * Update cost estimate
     */
    updateCostEstimate() {
        const postcodeInput = document.querySelector('input[name="postcode"]');
        const serviceTypeSelect = document.querySelector('select[name="serviceType"]');
        const estimateRange = document.getElementById('estimateRange');
        const estimateDescription = document.getElementById('estimateDescription');
        const emailFormContainer = document.getElementById('email-form-container');
        const submitBtn = document.getElementById('submitBtn');

        if (!postcodeInput || !serviceTypeSelect || !estimateRange) return;

        const postcode = postcodeInput.value.trim();
        const serviceType = serviceTypeSelect.value;

        if (postcode.length >= 2 && serviceType) {
            const costData = this.getCostForPostcode(postcode, serviceType);
            if (costData) {
                estimateRange.textContent = costData.range;
                if (estimateDescription) {
                    estimateDescription.textContent = costData.description;
                }
                
                // Show email form container
                if (emailFormContainer) {
                    emailFormContainer.classList.add('visible');
                }
                
                // Enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                }
            }
        } else {
            // Hide email form container if not enough data
            if (emailFormContainer) {
                emailFormContainer.classList.remove('visible');
            }
            
            // Disable submit button
            if (submitBtn) {
                submitBtn.disabled = true;
            }
        }
    }

    /**
     * Get cost data for postcode
     */
    getCostForPostcode(postcode, serviceType) {
        const areaCode = postcode.substring(0, 2).toUpperCase();
        const data = this.getRegionalCostData(areaCode);

        if (!data[serviceType]) return null;

        const [min, max] = data[serviceType];
        const range = `£${min.toLocaleString()} - £${max.toLocaleString()}`;
        
        const descriptions = {
            traditional: 'Traditional funeral service with ceremony',
            direct: 'Direct cremation without ceremony',
            hybrid: 'Simple service followed by cremation',
            burial: 'Traditional burial service',
            unsure: 'Various service options available'
        };

        return {
            range,
            description: descriptions[serviceType] || 'Funeral service',
            providers: data.providers || 20
        };
    }

    /**
     * Get regional cost data
     */
    getRegionalCostData(areaCode) {
        const regionalData = {
            'BN': { // Brighton
                traditional: [3200, 4800],
                direct: [1200, 2400],
                hybrid: [2400, 3600],
                burial: [4000, 6000],
                unsure: [2000, 5000],
                providers: 23
            },
            'SW': { // South West London
                traditional: [3500, 5200],
                direct: [1400, 2600],
                hybrid: [2600, 3800],
                burial: [4200, 6200],
                unsure: [2200, 5200],
                providers: 28
            },
            'default': {
                traditional: [3000, 4500],
                direct: [1100, 2200],
                hybrid: [2200, 3400],
                burial: [3800, 5800],
                unsure: [1800, 4500],
                providers: 20
            }
        };

        return regionalData[areaCode] || regionalData.default;
    }

    /**
     * Setup calculator validation
     */
    setupCalculatorValidation() {
        const form = document.querySelector('.calculator-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateCalculatorField(input));
            input.addEventListener('input', () => this.clearCalculatorFieldError(input));
        });
    }

    /**
     * Validate calculator field
     */
    validateCalculatorField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearCalculatorFieldError(field);

        // Validation rules
        switch (fieldName) {
            case 'postcode':
                const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i;
                if (!postcodeRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid UK postcode';
                }
                break;
            case 'serviceType':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a service type';
                }
                break;
            case 'timeline':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a timeline';
                }
                break;
        }

        if (!isValid) {
            this.showCalculatorFieldError(field, errorMessage);
        }

        return isValid;
    }

    /**
     * Show calculator field error
     */
    showCalculatorFieldError(field, message) {
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
     * Clear calculator field error
     */
    clearCalculatorFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    /**
     * Setup calculator submission
     */
    setupCalculatorSubmission() {
        const form = document.querySelector('.calculator-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCalculatorSubmission();
        });
    }

    /**
     * Handle calculator submission
     */
    async handleCalculatorSubmission() {
        const form = document.querySelector('.calculator-form');
        if (!form) return;

        // Validate form
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateCalculatorField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showCalculatorError('Please complete all required fields');
            return;
        }

        // Get form data
        const formData = new FormData(form);
        this.calculatorData = Object.fromEntries(formData);

        // Show loading state
        this.setCalculatorLoading(true);

        try {
            // Redirect to free report with form data
            this.redirectToFreeReport();
        } catch (error) {
            console.error('Calculator error:', error);
            this.showCalculatorError('Submission failed. Please try again.');
        } finally {
            this.setCalculatorLoading(false);
        }
    }

    /**
     * Redirect to free report
     */
    redirectToFreeReport() {
        const data = this.calculatorData;
        if (data.email && data.postcode && data.serviceType) {
            window.location.href = `../reports/free_report.html?email=${encodeURIComponent(data.email)}&postcode=${encodeURIComponent(data.postcode)}&serviceType=${encodeURIComponent(data.serviceType)}`;
        }
    }

    /**
     * Calculate regional costs
     */
    async calculateRegionalCosts() {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const serviceType = this.calculatorData.serviceType;
        const postcode = this.calculatorData.postcode;
        
        // Calculate costs based on service type and region
        const baseCosts = this.getBaseCosts(serviceType);
        const regionalMultiplier = this.getRegionalMultiplier();
        
        const minCost = Math.round(baseCosts.min * regionalMultiplier);
        const maxCost = Math.round(baseCosts.max * regionalMultiplier);
        const averageCost = Math.round((minCost + maxCost) / 2);

        return {
            serviceType,
            postcode,
            costRange: `£${minCost.toLocaleString()} - £${maxCost.toLocaleString()}`,
            averageCost,
            description: this.getServiceDescription(serviceType),
            providers: this.regionStats.providers,
            savings: Math.round(averageCost * 0.15)
        };
    }

    /**
     * Get base costs for service type
     */
    getBaseCosts(serviceType) {
        const baseCosts = {
            'traditional': { min: 2800, max: 4200 },
            'direct': { min: 1200, max: 2400 },
            'hybrid': { min: 2000, max: 3200 },
            'burial': { min: 4000, max: 6000 },
            'unsure': { min: 2000, max: 5000 }
        };
        
        return baseCosts[serviceType] || baseCosts.traditional;
    }

    /**
     * Get regional multiplier
     */
    getRegionalMultiplier() {
        const multipliers = {
            'south-east': 1.0,
            'london': 1.25,
            'south-west': 0.9,
            'midlands': 0.85,
            'north': 0.8
        };
        
        const regionCode = new URLSearchParams(window.location.search).get('region') || 'south-east';
        return multipliers[regionCode] || 1.0;
    }

    /**
     * Get service description
     */
    getServiceDescription(serviceType) {
        const descriptions = {
            'traditional': 'Traditional funeral service with ceremony and cremation',
            'direct': 'Direct cremation without ceremony',
            'hybrid': 'Simple service followed by cremation',
            'burial': 'Traditional burial service with ceremony',
            'unsure': 'Various service options available'
        };
        
        return descriptions[serviceType] || descriptions.traditional;
    }

    /**
     * Display calculator result
     */
    displayCalculatorResult(result) {
        // Update cost range
        const costRangeElement = document.querySelector('.cost-range');
        if (costRangeElement) {
            costRangeElement.textContent = result.costRange;
        }

        // Update cost description
        const costDescriptionElement = document.querySelector('.cost-description');
        if (costDescriptionElement) {
            costDescriptionElement.textContent = result.description;
        }

        // Show result section
        const resultSection = document.querySelector('.calculator-result');
        if (resultSection) {
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Track calculator usage
        this.trackCalculatorUsage(result);
    }

    /**
     * Set calculator loading state
     */
    setCalculatorLoading(loading) {
        const submitButton = document.querySelector('.calculate-button');
        if (!submitButton) return;

        if (loading) {
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            submitButton.textContent = 'Calculating...';
        } else {
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            submitButton.textContent = 'Calculate Costs';
        }
    }

    /**
     * Show calculator error
     */
    showCalculatorError(message) {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.message.error');
        existingErrors.forEach(error => error.remove());

        // Create new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message error';
        errorDiv.textContent = message;

        // Insert at top of calculator form
        const calculatorForm = document.querySelector('.calculator-form');
        if (calculatorForm) {
            calculatorForm.insertBefore(errorDiv, calculatorForm.firstChild);
        }

        // Scroll to error
        errorDiv.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * Setup regional comparison
     */
    setupRegionalComparison() {
        this.updateComparisonTable();
        this.setupComparisonInteractions();
    }

    /**
     * Update comparison table
     */
    updateComparisonTable() {
        const comparisonRows = document.querySelectorAll('.comparison-row');
        
        comparisonRows.forEach((row, index) => {
            if (index < this.comparisonData.length) {
                const data = this.comparisonData[index];
                this.updateComparisonRow(row, data);
            }
        });
    }

    /**
     * Update comparison row
     */
    updateComparisonRow(row, data) {
        const cells = row.querySelectorAll('div');
        
        if (cells.length >= 4) {
            cells[0].textContent = data.region;
            cells[1].textContent = `£${data.averageCost.toLocaleString()}`;
            cells[2].textContent = data.population.toLocaleString();
            cells[3].textContent = data.providers;
            
            // Add trend indicator
            const trendClass = `trend-${data.trend}`;
            cells[1].className = `cost-value ${trendClass}`;
        }
    }

    /**
     * Setup comparison interactions
     */
    setupComparisonInteractions() {
        const comparisonRows = document.querySelectorAll('.comparison-row');
        comparisonRows.forEach(row => {
            row.addEventListener('click', () => {
                this.showComparisonDetails(row);
            });
        });
    }

    /**
     * Show comparison details
     */
    showComparisonDetails(row) {
        const regionName = row.querySelector('div:first-child')?.textContent;
        if (regionName) {
            const details = this.getComparisonDetails(regionName);
            if (details) {
                alert(details);
            }
        }
    }

    /**
     * Get comparison details
     */
    getComparisonDetails(regionName) {
        const details = {
            'South East England': 'South East England has moderate funeral costs with good provider choice and seasonal variations.',
            'National Average': 'The national average represents typical funeral costs across all UK regions.',
            'London': 'London has the highest funeral costs due to higher overheads and demand.'
        };
        
        return details[regionName];
    }

    /**
     * Setup mobile optimizations
     */
    setupMobileOptimizations() {
        this.setupMobileNavigation();
        this.setupMobileForms();
        this.setupMobileTables();
    }

    /**
     * Setup mobile navigation
     */
    setupMobileNavigation() {
        // Add mobile menu toggle if needed
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
        }
    }

    /**
     * Setup mobile forms
     */
    setupMobileForms() {
        // Prevent zoom on iOS
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.style.fontSize !== '16px') {
                input.style.fontSize = '16px';
            }
        });
    }

    /**
     * Setup mobile tables
     */
    setupMobileTables() {
        const tables = document.querySelectorAll('.comparison-table');
        tables.forEach(table => {
            this.makeTableResponsive(table);
        });
    }

    /**
     * Make table responsive
     */
    makeTableResponsive(table) {
        // Add data labels for mobile
        const headers = table.querySelectorAll('.comparison-header > div');
        const rows = table.querySelectorAll('.comparison-row');
        
        headers.forEach((header, index) => {
            const label = header.textContent;
            rows.forEach(row => {
                const cell = row.children[index];
                if (cell) {
                    cell.setAttribute('data-label', label);
                }
            });
        });
    }

    /**
     * Setup analytics
     */
    setupAnalytics() {
        this.trackPageView();
        this.trackCalculatorUsage();
        this.trackComparisonUsage();
    }

    /**
     * Track page view
     */
    trackPageView() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                'page_title': `${this.regionName} Funeral Costs`,
                'page_location': window.location.href
            });
        }
    }

    /**
     * Track calculator usage
     */
    trackCalculatorUsage(result) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'calculator_usage', {
                'event_category': 'engagement',
                'event_label': `${this.regionName}_${result.serviceType}`,
                'value': result.averageCost
            });
        }
    }

    /**
     * Track comparison usage
     */
    trackComparisonUsage() {
        const comparisonRows = document.querySelectorAll('.comparison-row');
        comparisonRows.forEach(row => {
            row.addEventListener('click', () => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'comparison_click', {
                        'event_category': 'engagement',
                        'event_label': 'regional_comparison',
                        'value': 1
                    });
                }
            });
        });
    }
}

/**
 * Initialize regional module when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    new RegionalModule();
});

/**
 * Export for use in other modules
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RegionalModule;
}
