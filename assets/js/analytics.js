/**
 * Analytics and Monitoring Module
 * Version: 1.0.0
 * Description: Enhanced analytics tracking for ClearFuneralCosts
 */

class AnalyticsModule {
    constructor() {
        this.init();
    }

    /**
     * Initialize analytics
     */
    init() {
        this.setupGoogleAnalytics();
        this.setupPerformanceMonitoring();
        this.setupErrorTracking();
        this.setupUserEngagement();
    }

    /**
     * Setup Google Analytics 4
     */
    setupGoogleAnalytics() {
        // Google Analytics 4 configuration
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
                'custom_parameter_1': 'service_type',
                'custom_parameter_2': 'postcode'
            }
        });

        // Track page views
        this.trackPageView();
    }

    /**
     * Track page views
     */
    trackPageView() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname
            });
        }
    }

    /**
     * Track form submissions
     */
    trackFormSubmission(formData) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'engagement',
                event_label: 'cost_analysis_form',
                value: 1,
                custom_parameter_1: formData.serviceType || 'unknown',
                custom_parameter_2: formData.postcode || 'unknown'
            });
        }
    }

    /**
     * Track calculator usage
     */
    trackCalculatorUsage(data) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'calculator_usage', {
                event_category: 'engagement',
                event_label: 'cost_calculator',
                value: 1,
                service_type: data.serviceType,
                postcode: data.postcode
            });
        }
    }

    /**
     * Track report generation
     */
    trackReportGeneration(reportType) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'report_generated', {
                event_category: 'conversion',
                event_label: reportType,
                value: 1
            });
        }
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        this.measureLCP();
        this.measureFID();
        this.measureCLS();
        this.measureFCP();
    }

    /**
     * Measure Largest Contentful Paint (LCP)
     */
    measureLCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'web_vitals', {
                        event_category: 'performance',
                        event_label: 'LCP',
                        value: Math.round(lastEntry.startTime)
                    });
                }
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    /**
     * Measure First Input Delay (FID)
     */
    measureFID() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'web_vitals', {
                            event_category: 'performance',
                            event_label: 'FID',
                            value: Math.round(entry.processingStart - entry.startTime)
                        });
                    }
                });
            });
            
            observer.observe({ entryTypes: ['first-input'] });
        }
    }

    /**
     * Measure Cumulative Layout Shift (CLS)
     */
    measureCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'web_vitals', {
                        event_category: 'performance',
                        event_label: 'CLS',
                        value: Math.round(clsValue * 1000)
                    });
                }
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
        }
    }

    /**
     * Measure First Contentful Paint (FCP)
     */
    measureFCP() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'web_vitals', {
                            event_category: 'performance',
                            event_label: 'FCP',
                            value: Math.round(entry.startTime)
                        });
                    }
                });
            });
            
            observer.observe({ entryTypes: ['paint'] });
        }
    }

    /**
     * Setup error tracking
     */
    setupErrorTracking() {
        // Track JavaScript errors
        window.addEventListener('error', (event) => {
            this.trackError('javascript_error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });

        // Track unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.trackError('promise_rejection', {
                reason: event.reason?.toString() || 'Unknown error'
            });
        });

        // Track resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.trackError('resource_error', {
                    type: event.target.tagName,
                    src: event.target.src || event.target.href
                });
            }
        }, true);
    }

    /**
     * Track errors
     */
    trackError(errorType, errorData) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                event_category: 'error',
                event_label: errorType,
                description: JSON.stringify(errorData),
                fatal: false
            });
        }
    }

    /**
     * Setup user engagement tracking
     */
    setupUserEngagement() {
        // Track scroll depth
        this.trackScrollDepth();
        
        // Track time on page
        this.trackTimeOnPage();
        
        // Track form interactions
        this.trackFormInteractions();
    }

    /**
     * Track scroll depth
     */
    trackScrollDepth() {
        let maxScroll = 0;
        const scrollThresholds = [25, 50, 75, 90, 100];
        const trackedThresholds = new Set();

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
            }

            scrollThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                    trackedThresholds.add(threshold);
                    this.trackEvent('scroll_depth', {
                        event_category: 'engagement',
                        event_label: `${threshold}%`,
                        value: threshold
                    });
                }
            });
        });
    }

    /**
     * Track time on page
     */
    trackTimeOnPage() {
        const startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            
            this.trackEvent('time_on_page', {
                event_category: 'engagement',
                event_label: 'page_duration',
                value: timeOnPage
            });
        });
    }

    /**
     * Track form interactions
     */
    trackFormInteractions() {
        // Track form field focus
        document.addEventListener('focusin', (event) => {
            if (event.target.matches('input, select, textarea')) {
                this.trackEvent('form_field_focus', {
                    event_category: 'engagement',
                    event_label: event.target.name || event.target.id,
                    value: 1
                });
            }
        });

        // Track form validation errors
        document.addEventListener('invalid', (event) => {
            this.trackEvent('form_validation_error', {
                event_category: 'engagement',
                event_label: event.target.name || event.target.id,
                value: 1
            });
        });
    }

    /**
     * Track custom events
     */
    trackEvent(eventName, eventData) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }

    /**
     * Track user journey
     */
    trackUserJourney(step, data = {}) {
        this.trackEvent('user_journey', {
            event_category: 'conversion',
            event_label: step,
            value: 1,
            ...data
        });
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.analytics = new AnalyticsModule();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsModule;
}
