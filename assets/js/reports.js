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
}

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
