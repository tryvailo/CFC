/* ============================================
   CLEARFUNERALCOSTS - REPORTS FUNCTIONALITY
   Функциональность для страниц отчетов
   ============================================ */

/**
 * Reports Module - Handles report page functionality
 */
class ReportsModule {
    constructor() {
        this.init();
    }

    /**
     * Initialize reports functionality
     */
    init() {
        this.setupReportDate();
        this.setupCostAnalysis();
        this.setupRecommendations();
        this.setupCTASection();
        this.setupPrintFunctionality();
        this.setupShareFunctionality();
        this.setupProgressTracker();
        this.setupScriptCopying();
        this.setupProviderFreshness();
        this.setupRoadmapWithPriorities();
        this.setupGlossaryTooltips();
        this.setupFullGlossary();
        this.checkQuestionnaireData();
    }

    /**
     * Setup report date display
     */
    setupReportDate() {
        const reportDateElement = document.getElementById('reportDate');
        if (reportDateElement) {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            reportDateElement.textContent = now.toLocaleDateString('en-GB', options);
        }
    }

    /**
     * Setup cost analysis functionality
     */
    setupCostAnalysis() {
        this.updateCostRange();
        this.updateCostDescription();
        this.updateCostBreakdown();
    }

    /**
     * Update cost range based on URL parameters or localStorage
     */
    updateCostRange() {
        const costRangeElement = document.getElementById('costRange');
        if (!costRangeElement) return;

        // Try to get data from URL parameters first
        const urlParams = new URLSearchParams(window.location.search);
        const serviceType = urlParams.get('serviceType') || 'traditional';
        const postcode = urlParams.get('postcode') || 'BN1 4GH';

        // Try to get data from localStorage
        const savedData = localStorage.getItem('funeralAnalysis');
        let analysisData = null;

        if (savedData) {
            try {
                analysisData = JSON.parse(savedData);
            } catch (e) {
                console.warn('Could not parse saved analysis data');
            }
        }

        // Use saved data or default values
        if (analysisData && analysisData.estimatedCost) {
            costRangeElement.textContent = analysisData.estimatedCost.range;
        } else {
            // Default cost ranges based on service type
            const defaultRanges = {
                'traditional': '£3,200 - £4,800',
                'direct': '£1,200 - £2,400',
                'hybrid': '£2,400 - £3,600',
                'burial': '£4,000 - £6,000',
                'unsure': '£2,000 - £5,000'
            };
            costRangeElement.textContent = defaultRanges[serviceType] || defaultRanges.traditional;
        }
    }

    /**
     * Update cost description
     */
    updateCostDescription() {
        const costDescriptionElement = document.getElementById('costDescription');
        if (!costDescriptionElement) return;

        const urlParams = new URLSearchParams(window.location.search);
        const serviceType = urlParams.get('serviceType') || 'traditional';

        const descriptions = {
            'traditional': 'Traditional funeral service with ceremony and cremation',
            'direct': 'Direct cremation without ceremony',
            'hybrid': 'Simple service followed by cremation',
            'burial': 'Traditional burial service with ceremony',
            'unsure': 'Various service options available'
        };

        costDescriptionElement.textContent = descriptions[serviceType] || descriptions.traditional;
    }

    /**
     * Update cost breakdown
     */
    updateCostBreakdown() {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceType = urlParams.get('serviceType') || 'traditional';

        // Update breakdown based on service type
        const breakdowns = {
            'traditional': {
                'funeralDirector': '£1,800 - £2,400',
                'crematorium': '£800 - £1,200',
                'additional': '£600 - £1,200'
            },
            'direct': {
                'funeralDirector': '£800 - £1,200',
                'crematorium': '£400 - £800',
                'additional': '£0 - £400'
            },
            'hybrid': {
                'funeralDirector': '£1,200 - £1,800',
                'crematorium': '£600 - £1,000',
                'additional': '£600 - £800'
            },
            'burial': {
                'funeralDirector': '£2,000 - £2,800',
                'crematorium': '£0 - £0',
                'additional': '£2,000 - £3,200'
            }
        };

        const breakdown = breakdowns[serviceType] || breakdowns.traditional;
        
        // Update breakdown items if they exist
        const breakdownItems = document.querySelectorAll('.breakdown-item');
        if (breakdownItems.length >= 3) {
            const labels = ['Funeral Director Fees', 'Crematorium Fees', 'Additional Services'];
            const values = [breakdown.funeralDirector, breakdown.crematorium, breakdown.additional];
            
            breakdownItems.forEach((item, index) => {
                const labelElement = item.querySelector('.breakdown-label');
                const valueElement = item.querySelector('.breakdown-value');
                
                if (labelElement && index < labels.length) {
                    labelElement.textContent = labels[index];
                }
                if (valueElement && index < values.length) {
                    valueElement.textContent = values[index];
                }
            });
        }
    }

    /**
     * Setup recommendations functionality
     */
    setupRecommendations() {
        this.updateRecommendations();
        this.setupRecommendationInteractions();
    }

    /**
     * Update recommendations based on service type
     */
    updateRecommendations() {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceType = urlParams.get('serviceType') || 'traditional';

        const recommendations = {
            'traditional': [
                {
                    icon: '💡',
                    title: 'Compare Multiple Providers',
                    text: 'Get quotes from at least 3 different funeral directors to ensure you\'re getting the best value.'
                },
                {
                    icon: '📅',
                    title: 'Consider Timing',
                    text: 'Some providers offer preferential rates for off-peak scheduling or weekday services.'
                },
                {
                    icon: '📋',
                    title: 'Ask About Packages',
                    text: 'Many funeral directors offer package deals that can provide better value than individual services.'
                },
                {
                    icon: '🏠',
                    title: 'Consider Alternatives',
                    text: 'Direct cremation can be significantly more cost-effective if a traditional service isn\'t required.'
                }
            ],
            'direct': [
                {
                    icon: '💰',
                    title: 'Compare Cremation Services',
                    text: 'Direct cremation costs vary significantly between providers. Compare at least 3 quotes.'
                },
                {
                    icon: '📞',
                    title: 'Ask About Additional Services',
                    text: 'Some providers include basic services that others charge extra for.'
                },
                {
                    icon: '⏰',
                    title: 'Consider Timing',
                    text: 'Weekday services often represent better value than weekends.'
                }
            ],
            'hybrid': [
                {
                    icon: '🎯',
                    title: 'Balance Ceremony and Cost',
                    text: 'Work with your funeral director to create a meaningful but cost-effective service.'
                },
                {
                    icon: '🏛️',
                    title: 'Consider Alternative Venues',
                    text: 'Community halls or family homes can be more affordable than traditional venues.'
                }
            ],
            'burial': [
                {
                    icon: '🏞️',
                    title: 'Compare Burial Plot Costs',
                    text: 'Burial plot prices vary significantly by location and cemetery type.'
                },
                {
                    icon: '🌱',
                    title: 'Consider Green Burial',
                    text: 'Green burial options can be more cost-effective and environmentally friendly.'
                }
            ]
        };

        const serviceRecommendations = recommendations[serviceType] || recommendations.traditional;
        this.renderRecommendations(serviceRecommendations);
    }

    /**
     * Render recommendations to the page
     */
    renderRecommendations(recommendations) {
        const recommendationsContainer = document.querySelector('.recommendations');
        if (!recommendationsContainer) return;

        const recommendationsList = recommendationsContainer.querySelector('.recommendation-item');
        if (!recommendationsList) return;

        // Clear existing recommendations
        const existingItems = recommendationsContainer.querySelectorAll('.recommendation-item');
        existingItems.forEach(item => item.remove());

        // Add new recommendations
        recommendations.forEach(rec => {
            const item = document.createElement('div');
            item.className = 'recommendation-item';
            item.innerHTML = `
                <div class="recommendation-icon">${rec.icon}</div>
                <div class="recommendation-text">
                    <strong>${rec.title}:</strong> ${rec.text}
                </div>
            `;
            recommendationsContainer.appendChild(item);
        });
    }

    /**
     * Setup recommendation interactions
     */
    setupRecommendationInteractions() {
        const recommendationItems = document.querySelectorAll('.recommendation-item');
        recommendationItems.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('expanded');
            });
        });
    }

    /**
     * Setup CTA section functionality
     */
    setupCTASection() {
        this.setupCTAClickTracking();
        this.setupCTAScrollToForm();
    }

    /**
     * Setup CTA click tracking
     */
    setupCTAClickTracking() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Track CTA clicks
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'cta_click', {
                        'event_category': 'engagement',
                        'event_label': button.textContent.trim(),
                        'value': 1
                    });
                }
            });
        });
    }

    /**
     * Setup CTA scroll to form functionality
     */
    setupCTAScrollToForm() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            if (button.href && button.href.includes('questionnaire')) {
                button.addEventListener('click', (e) => {
                    // Track navigation to questionnaire
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'navigation', {
                            'event_category': 'engagement',
                            'event_label': 'questionnaire_click',
                            'value': 1
                        });
                    }
                });
            }
        });
    }

    /**
     * Setup print functionality
     */
    setupPrintFunctionality() {
        // Add print button if not exists
        if (!document.getElementById('printButton')) {
            const printButton = document.createElement('button');
            printButton.id = 'printButton';
            printButton.className = 'enhanced-cta';
            printButton.textContent = 'Print Report';
            printButton.addEventListener('click', () => {
                window.print();
            });

            const ctaSection = document.querySelector('.cta-section');
            if (ctaSection) {
                ctaSection.appendChild(printButton);
            }
        }
    }

    /**
     * Setup share functionality
     */
    setupShareFunctionality() {
        // Add share button if not exists
        if (!document.getElementById('shareButton')) {
            const shareButton = document.createElement('button');
            shareButton.id = 'shareButton';
            shareButton.className = 'enhanced-cta';
            shareButton.textContent = 'Share Report';
            shareButton.addEventListener('click', () => {
                this.shareReport();
            });

            const ctaSection = document.querySelector('.cta-section');
            if (ctaSection) {
                ctaSection.appendChild(shareButton);
            }
        }
    }

    /**
     * Share report functionality
     */
    shareReport() {
        if (navigator.share) {
            navigator.share({
                title: 'My Funeral Cost Analysis',
                text: 'I received a free funeral cost analysis from ClearFuneralCosts',
                url: window.location.href
            });
        } else {
            // Fallback to copying URL
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Report URL copied to clipboard');
            });
        }
    }

    /**
     * Setup data freshness indicator
     */
    setupDataFreshness() {
        const dataFreshnessElement = document.querySelector('.data-freshness-text');
        if (dataFreshnessElement) {
            const lastUpdate = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            dataFreshnessElement.textContent = `Data updated ${lastUpdate.toLocaleDateString('en-GB', options)} from official CMA sources`;
        }
    }

    /**
     * Setup progress tracker functionality
     */
    setupProgressTracker() {
        // Make updateChecklistProgress globally available
        window.updateChecklistProgress = this.updateChecklistProgress.bind(this);
        
        // Load saved progress on page load
        this.loadSavedProgress();
    }

    /**
     * Enhanced Interactive Checklist with Progress Bar and localStorage
     */
    updateChecklistProgress(checkbox) {
        const taskId = checkbox.closest('.task-checkbox-enhanced').querySelector('.task-action').textContent;
        const dataValue = parseInt(checkbox.dataset.value) || 0;
        
        // Save to localStorage
        const savedProgress = JSON.parse(localStorage.getItem('premiumReportProgress') || '{}');
        savedProgress[taskId] = checkbox.checked;
        localStorage.setItem('premiumReportProgress', JSON.stringify(savedProgress));
        
        // Calculate total completed and savings
        let completed = 0;
        let totalSavings = 0;
        const totalTasks = document.querySelectorAll('.task-checkbox-enhanced input[type="checkbox"]').length;
        
        document.querySelectorAll('.task-checkbox-enhanced input[type="checkbox"]').forEach(cb => {
            const taskValue = parseInt(cb.dataset.value) || 0;
            if (cb.checked) {
                completed++;
                totalSavings += taskValue;
            }
        });
        
        // Update progress display
        const completionCounter = document.getElementById('completion-counter');
        const savingsTracker = document.getElementById('savings-tracker');
        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = document.getElementById('progress-percentage');
        const achievementMessage = document.getElementById('achievement-message');
        
        if (completionCounter) {
            completionCounter.textContent = `${completed} of ${totalTasks} tasks completed`;
        }
        
        if (savingsTracker) {
            savingsTracker.textContent = `Potential financial benefits unlocked: £${totalSavings.toLocaleString()}`;
        }
        
        // Update progress bar
        const percentage = Math.round((completed / totalTasks) * 100);
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        if (progressPercentage) {
            progressPercentage.textContent = `${percentage}%`;
        }
        
        // Show achievement message for milestones
        if (achievementMessage) {
            if (completed > 0 && completed % 5 === 0) {
                achievementMessage.style.display = 'block';
                setTimeout(() => {
                    achievementMessage.style.display = 'none';
                }, 3000);
            } else {
                achievementMessage.style.display = 'none';
            }
        }
    }

    /**
     * Load saved progress from localStorage
     */
    loadSavedProgress() {
        const savedProgress = JSON.parse(localStorage.getItem('premiumReportProgress') || '{}');
        
        document.querySelectorAll('.task-checkbox-enhanced input[type="checkbox"]').forEach(checkbox => {
            const taskId = checkbox.closest('.task-checkbox-enhanced').querySelector('.task-action').textContent;
            if (savedProgress[taskId]) {
                checkbox.checked = true;
                this.updateChecklistProgress(checkbox);
            }
        });
    }

    /**
     * Copy script to clipboard functionality
     */
    setupScriptCopying() {
        // Make copyScript globally available
        window.copyScript = this.copyScript.bind(this);
    }

    /**
     * Copy script content to clipboard
     */
    async copyScript(scriptId) {
        const scriptElement = document.getElementById(scriptId);
        if (!scriptElement) return;
        
        let textToCopy = '';
        
        if (scriptId === 'email-script') {
            // Extract clean text from email script
            textToCopy = scriptElement.textContent.trim();
        } else if (scriptId === 'phone-script') {
            // Extract clean text from phone script
            textToCopy = scriptElement.textContent.trim();
        } else if (scriptId === 'questions-script') {
            // Extract questions list
            const listItems = scriptElement.querySelectorAll('li');
            textToCopy = Array.from(listItems).map(li => li.textContent.trim()).join('\n');
        } else {
            // Default: get all text content
            textToCopy = scriptElement.textContent.trim();
        }
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            
            // Show success feedback
            const button = document.querySelector(`[onclick="copyScript('${scriptId}')"]`);
            if (button) {
                const originalText = button.querySelector('.copy-text').textContent;
                button.querySelector('.copy-text').textContent = 'Copied!';
                button.style.background = 'var(--sage-green)';
                
                setTimeout(() => {
                    button.querySelector('.copy-text').textContent = originalText;
                    button.style.background = '';
                }, 2000);
            }
            
            // Track copy event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'script_copy', {
                    'event_category': 'engagement',
                    'event_label': scriptId,
                    'value': 1
                });
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy to clipboard. Please try again.');
        }
    }

    /**
     * Setup provider data freshness indicator
     */
    setupProviderFreshness() {
        // Make setupProviderFreshness globally available
        window.setupProviderFreshness = this.setupProviderFreshness.bind(this);
        
        // Initialize freshness indicators on page load
        this.updateProviderFreshness();
    }

    /**
     * Update provider freshness indicators based on data age
     */
    updateProviderFreshness() {
        const providerElements = document.querySelectorAll('[data-updated]');
        
        providerElements.forEach(element => {
            const updatedDate = new Date(element.dataset.updated);
            const now = new Date();
            const daysDiff = Math.floor((now - updatedDate) / (1000 * 60 * 60 * 24));
            
            const updatedElement = element.querySelector('.provider-updated');
            if (updatedElement) {
                // Remove existing freshness classes
                updatedElement.classList.remove('fresh', 'aging', 'stale');
                
                // Add appropriate freshness class based on age
                if (daysDiff <= 30) {
                    updatedElement.classList.add('fresh');
                } else if (daysDiff <= 60) {
                    updatedElement.classList.add('aging');
                } else {
                    updatedElement.classList.add('stale');
                }
                
                // Update the displayed date to be more human-readable
                this.updateDisplayedDate(updatedElement, updatedDate);
            }
        });
    }

    /**
     * Update the displayed date in a more human-readable format
     */
    updateDisplayedDate(updatedElement, date) {
        const textElement = updatedElement.querySelector('.updated-text');
        if (textElement) {
            const options = { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
            };
            const formattedDate = date.toLocaleDateString('en-GB', options);
            textElement.textContent = `Updated: ${formattedDate}`;
        }
    }

    /**
     * Setup user preferences summary
     */
    setupUserPreferencesSummary() {
        // Make setupUserPreferencesSummary globally available
        window.setupUserPreferencesSummary = this.setupUserPreferencesSummary.bind(this);
        // Try to get data from localStorage
        const savedData = localStorage.getItem('funeralAnalysis');
        let analysisData = null;
        
        if (savedData) {
            try {
                analysisData = JSON.parse(savedData);
            } catch (e) {
                console.warn('Could not parse saved analysis data');
            }
        }
        
        // Also check URL parameters as fallback
        const urlParams = new URLSearchParams(window.location.search);
        
        // Service Type
        const serviceTypeElement = document.getElementById('pref-service-type');
        if (serviceTypeElement) {
            const serviceType = analysisData?.serviceType || urlParams.get('serviceType') || 'traditional-cremation';
            const serviceNames = {
                'traditional-cremation': 'Traditional Cremation',
                'direct-cremation': 'Direct Cremation',
                'simple-service': 'Simple Service + Cremation',
                'traditional-burial': 'Traditional Burial',
                'natural-burial': 'Natural Burial',
                'unsure': 'Exploring Options',
                'traditional': 'Traditional Funeral Service',
                'direct': 'Direct Cremation',
                'simple': 'Simple Service + Cremation',
                'burial': 'Traditional Burial',
                'not_sure': 'Exploring Options'
            };
            serviceTypeElement.textContent = serviceNames[serviceType] || 'Not specified';
        }
        
        // Location
        const locationElement = document.getElementById('pref-location');
        if (locationElement) {
            const postcode = analysisData?.location?.postcode || urlParams.get('postcode') || '';
            const town = analysisData?.location?.town || urlParams.get('town') || '';
            
            // Try to extract area name from postcode if no town provided
            let locationText = '';
            if (town && postcode) {
                locationText = `${town}, ${postcode}`;
            } else if (postcode) {
                // Map postcode areas to readable names
                const areaMap = {
                    'BN': 'Brighton, East Sussex',
                    'GU': 'Guildford, Surrey', 
                    'RG': 'Reading, Berkshire',
                    'SO': 'Southampton, Hampshire',
                    'PO': 'Portsmouth, Hampshire',
                    'TN': 'Tunbridge Wells, Kent',
                    'ME': 'Medway, Kent',
                    'CT': 'Canterbury, Kent'
                };
                
                const area = postcode.substring(0, 2);
                const areaName = areaMap[area] || `${postcode} area`;
                locationText = areaName;
            } else if (town) {
                locationText = town;
            } else {
                locationText = 'Not specified';
            }
            
            locationElement.textContent = locationText;
        }
        
        // Budget
        const budgetElement = document.getElementById('pref-budget');
        if (budgetElement) {
            const budgetMin = analysisData?.budget?.min;
            const budgetMax = analysisData?.budget?.max;
            
            if (budgetMin && budgetMax) {
                budgetElement.textContent = `£${budgetMin.toLocaleString()} - £${budgetMax.toLocaleString()}`;
            } else {
                budgetElement.textContent = 'Flexible';
            }
        }
        
        // Timeline
        const timelineElement = document.getElementById('pref-timeline');
        if (timelineElement) {
            const timeline = analysisData?.timeline || urlParams.get('timeline') || 'Not specified';
            const timelineLabels = {
                'urgent': 'Urgent (within days)',
                '1-2-weeks': 'Within 1-2 weeks',
                '2-4-weeks': 'Within 2-4 weeks',
                'flexible': 'Flexible timing',
                'asap': 'As soon as possible',
                'within-week': 'Within a week'
            };
            
            timelineElement.textContent = timelineLabels[timeline] || timeline;
        }
    }

    /**
     * Setup roadmap with priority levels
     */
    setupRoadmapWithPriorities() {
        // Make setupRoadmapWithPriorities globally available
        window.setupRoadmapWithPriorities = this.setupRoadmapWithPriorities.bind(this);
        
        // Initialize roadmap with priorities
        this.renderRoadmapWithPriorities();
    }

    /**
     * Setup glossary tooltips for funeral terms
     */
    setupGlossaryTooltips() {
        window.setupGlossaryTooltips = this.setupGlossaryTooltips.bind(this);
        
        // For mobile: toggle tooltip on tap
        if ('ontouchstart' in window) {
            document.querySelectorAll('.term-tooltip').forEach(term => {
                term.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Close other tooltips
                    document.querySelectorAll('.term-tooltip.active').forEach(other => {
                        if (other !== this) {
                            other.classList.remove('active');
                        }
                    });
                    
                    // Toggle this tooltip
                    this.classList.toggle('active');
                });
            });
            
            // Close tooltip when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.term-tooltip')) {
                    document.querySelectorAll('.term-tooltip.active').forEach(term => {
                        term.classList.remove('active');
                    });
                }
            });
        }
        
        // Make tooltips keyboard accessible
        document.querySelectorAll('.term-tooltip').forEach(term => {
            term.setAttribute('tabindex', '0');
            term.setAttribute('role', 'button');
            term.setAttribute('aria-label', `Definition: ${term.dataset.term}`);
            
            term.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
                if (e.key === 'Escape') {
                    this.classList.remove('active');
                }
            });
        });
    }

    /**
     * Setup full glossary section
     */
    setupFullGlossary() {
        window.setupFullGlossary = this.setupFullGlossary.bind(this);
        
        const toggleButton = document.getElementById('glossary-toggle');
        const glossaryContent = document.getElementById('glossary-content');
        const glossaryGrid = document.getElementById('glossary-grid');
        
        if (!toggleButton || !glossaryContent || !glossaryGrid) return;
        
        // Populate glossary
        Object.entries(glossary).forEach(([term, definition]) => {
            const termElement = document.createElement('div');
            termElement.className = 'glossary-item';
            termElement.innerHTML = `
                <h4 class="glossary-term">${term.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                <p class="glossary-definition">${definition}</p>
            `;
            glossaryGrid.appendChild(termElement);
        });
        
        // Toggle functionality
        toggleButton.addEventListener('click', function() {
            const isVisible = glossaryContent.style.display !== 'none';
            glossaryContent.style.display = isVisible ? 'none' : 'block';
            this.querySelector('.toggle-arrow').textContent = isVisible ? '▼' : '▲';
            this.querySelector('.toggle-text').textContent = isVisible ? 'View Full Glossary' : 'Hide Glossary';
        });
    }

    /**
     * Load questionnaire data with validation
     */
    loadQuestionnaireData() {
        const savedData = localStorage.getItem('funeralAnalysis');
        
        if (!savedData) {
            console.warn('No questionnaire data found');
            return null;
        }
        
        try {
            const data = JSON.parse(savedData);
            
            // Check if data is expired (30 days)
            if (data.timestamp) {
                const savedDate = new Date(data.timestamp);
                const now = new Date();
                const daysDiff = Math.floor((now - savedDate) / (1000 * 60 * 60 * 24));
                
                if (daysDiff > 30) {
                    console.warn('Questionnaire data expired');
                    localStorage.removeItem('funeralAnalysis');
                    return null;
                }
            }
            
            return data;
        } catch (e) {
            console.error('Failed to parse questionnaire data:', e);
            localStorage.removeItem('funeralAnalysis');
            return null;
        }
    }

    /**
     * Check questionnaire data and show prompt if missing
     */
    checkQuestionnaireData() {
        const data = this.loadQuestionnaireData();
        
        if (!data || !data.completed) {
            this.showIncompleteDataPrompt();
        }
    }

    /**
     * Show prompt to complete questionnaire if data is missing
     */
    showIncompleteDataPrompt() {
        const promptElement = document.createElement('div');
        promptElement.className = 'incomplete-data-prompt';
        promptElement.innerHTML = `
            <div class="prompt-content">
                <h3>Complete Your Questionnaire</h3>
                <p>For the most accurate recommendations, please complete our short questionnaire.</p>
                <a href="questionnaire.html" class="prompt-button">Complete Questionnaire</a>
                <button class="prompt-dismiss">Continue with defaults</button>
            </div>
        `;
        
        document.body.insertBefore(promptElement, document.body.firstChild);
        
        // Handle dismiss
        promptElement.querySelector('.prompt-dismiss').addEventListener('click', function() {
            promptElement.remove();
        });
    }

    /**
     * Render roadmap with priority levels
     */
    renderRoadmapWithPriorities() {
        const roadmapContainer = document.getElementById('roadmap-actions-container');
        if (!roadmapContainer) return;

        // Clear existing content
        roadmapContainer.innerHTML = '';

        // Add priority legend
        const legend = document.createElement('div');
        legend.className = 'priority-legend';
        legend.innerHTML = `
            <h4>Priority Levels:</h4>
            <div class="legend-items">
                <span class="priority-badge priority-high">HIGH</span>
                <span class="legend-text">Must do within 24-48 hours</span>
                <span class="priority-badge priority-medium">MEDIUM</span>
                <span class="legend-text">Should do within 3-7 days</span>
                <span class="priority-badge priority-low">LOW</span>
                <span class="legend-text">Can do within 1-2 weeks</span>
            </div>
        `;
        roadmapContainer.appendChild(legend);

        // Render each action
        roadmapActions.forEach(action => {
            const actionElement = document.createElement('div');
            actionElement.className = 'roadmap-action';
            actionElement.innerHTML = `
                <div class="action-header">
                    <span class="priority-badge priority-${action.priority}">${action.priority.toUpperCase()} PRIORITY</span>
                    <span class="action-timeframe">${action.timeframe}</span>
                </div>
                <h4 class="action-title">${action.title}</h4>
                <p class="action-description">${action.description}</p>
                ${action.tip ? `
                    <div class="action-tip">
                        <span class="tip-icon">💡</span>
                        <span class="tip-text">${action.tip}</span>
                    </div>
                ` : ''}
            `;
            roadmapContainer.appendChild(actionElement);
        });
    }
}

/**
 * Roadmap Actions with Priority Levels
 * Sensitive context - priorities help users focus during difficult times
 */
const roadmapActions = [
    {
        priority: 'high',
        timeframe: 'Day 1-2',
        title: 'Contact 3 funeral directors for quotes',
        description: 'Get written quotes to compare prices and services. Use the email template provided in Section 5.',
        tip: 'Aim to contact directors by phone first, then follow up with email'
    },
    {
        priority: 'high',
        timeframe: 'Day 1-2',
        title: 'Request Standard Price Lists (SPL)',
        description: 'All funeral directors must provide their SPL. This helps you compare like-for-like.',
        tip: 'SPLs are legally required and must be provided free of charge'
    },
    {
        priority: 'high',
        timeframe: 'Day 2-3',
        title: 'Check crematorium availability',
        description: 'Contact local crematoria to understand availability and book preferred dates.',
        tip: 'Weekday mornings often have better availability and may be less expensive'
    },
    {
        priority: 'medium',
        timeframe: 'Day 3-5',
        title: 'Compare quotes and services',
        description: 'Review all quotes side-by-side. Look beyond price to services included.',
        tip: 'Use our comparison checklist to ensure you\'re comparing equivalent services'
    },
    {
        priority: 'medium',
        timeframe: 'Day 4-6',
        title: 'Visit or video call with shortlisted directors',
        description: 'Meet with your top 2-3 choices to discuss details and ask questions.',
        tip: 'Trust your instincts - you need to feel comfortable with the funeral director'
    },
    {
        priority: 'medium',
        timeframe: 'Day 5-7',
        title: 'Review contract terms carefully',
        description: 'Before signing, ensure you understand all costs, payment terms, and cancellation policy.',
        tip: 'Don\'t feel pressured to decide immediately - take time to review'
    },
    {
        priority: 'low',
        timeframe: 'Day 7-10',
        title: 'Arrange additional services',
        description: 'Order flowers, arrange catering, book venues for wake if needed.',
        tip: 'Some funeral directors offer packages, but you can often save by arranging separately'
    },
    {
        priority: 'low',
        timeframe: 'Day 8-12',
        title: 'Finalize ceremony details',
        description: 'Choose music, readings, order of service. Work with celebrant or officiant.',
        tip: 'Personal touches make the ceremony more meaningful and don\'t have to be expensive'
    },
    {
        priority: 'low',
        timeframe: 'Day 10-14',
        title: 'Confirm all arrangements',
        description: 'Final check with funeral director, crematorium, and any other service providers.',
        tip: 'Get written confirmation of all details to avoid misunderstandings'
    }
];

// Glossary definitions for funeral terms
const glossary = {
    'funeral-director': 'A professional who arranges and manages funeral services, including care of the deceased, paperwork, and coordination of all aspects.',
    'crematorium': 'A facility where cremation takes place. Typically includes a chapel for services and viewing.',
    'coffin': 'A container for the deceased, typically tapered at the head and foot. Different from a casket which is rectangular.',
    'casket': 'A rectangular container for the deceased, typically more expensive than a coffin.',
    'hearse': 'A vehicle designed to carry a coffin to the funeral service and crematorium or cemetery.',
    'chapel-of-rest': 'A peaceful room where the deceased can be viewed by family and friends before the funeral.',
    'direct-cremation': 'A cremation without a ceremony, typically the most affordable option. The deceased is collected, cremated, and ashes returned to family.',
    'natural-burial': 'An eco-friendly burial in a woodland or meadow setting using biodegradable materials. No embalming or traditional headstones.',
    'spl': 'Standard Price List - A legally required document that all funeral directors must provide, showing their prices for services and products.',
    'disbursements': 'Third-party costs that the funeral director pays on your behalf, such as crematorium fees, doctor\'s fees, and death certificates.',
    'celebrant': 'A person who conducts a funeral ceremony, can be religious or non-religious (humanist).',
    'embalming': 'A preservation process for the deceased, typically only needed if there will be a delay before the funeral or for international repatriation.',
    'viewing': 'An opportunity for family and friends to see the deceased before the funeral, usually at the chapel of rest.',
    'wake': 'A gathering after the funeral service where family and friends come together to remember the deceased, often with refreshments.',
    'ashes': 'The cremated remains returned to the family after cremation, technically called "cremated remains".',
    'urn': 'A container for holding cremated remains (ashes).',
    'memorial': 'A permanent marker or tribute, such as a headstone, plaque, or tree, to remember the deceased.'
};

/**
 * Initialize reports module when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    new ReportsModule();
});

/**
 * Export for use in other modules
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReportsModule;
}
