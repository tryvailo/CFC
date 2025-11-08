/**
 * Report Engine - Data-Driven Report Generator
 * 
 * Универсальный движок для генерации отчетов на основе конфигурации
 * Заменяет множественные функции-генераторы одним универсальным решением
 */

class ReportEngine {
  constructor(config) {
    this.config = config;
    this.serviceTypeMap = config.serviceTypeMap || {};
  }

  /**
   * Основной метод генерации отчета
   * @param {string} serviceType - Тип похоронной услуги
   */
  generateReport(serviceType) {
    // Нормализация типа (поддержка синонимов)
    const normalizedType = this.normalizeServiceType(serviceType);
    
    // Получение конфигурации для типа
    const serviceConfig = this.config.serviceTypes[normalizedType] || 
                         this.config.serviceTypes.unsure;
    
    // Обновление заголовков и метаданных
    this.updateHeaders(serviceConfig, normalizedType);
    
    // Показать/скрыть образовательную таблицу
    this.toggleEducationTable(serviceConfig.showEducationTable);
    
    // Сгенерировать сценарии
    this.generateScenarios(serviceConfig.scenarios, serviceConfig.introText);
    
    // Обновить UI элементы
    this.updateUIElements(serviceConfig, normalizedType);
    
    // Трекинг для аналитики
    this.trackReportGeneration(normalizedType);
  }

  /**
   * Нормализация типа услуги (поддержка синонимов)
   */
  normalizeServiceType(serviceType) {
    // Маппинг синонимов
    const synonyms = {
      'not_sure': 'unsure',
      'hybrid': 'simple'
    };
    
    return synonyms[serviceType] || serviceType;
  }

  /**
   * Обновление заголовков страницы
   */
  updateHeaders(serviceConfig, serviceType) {
    // Обновление имени услуги в заголовке
    const serviceNameElement = document.getElementById('selected-service-name');
    if (serviceNameElement) {
      serviceNameElement.textContent = serviceConfig.displayName;
    }

    // Обновление акцента на типе услуги
    const serviceTypeEmphasisElement = document.getElementById('service-type-emphasis');
    if (serviceTypeEmphasisElement) {
      serviceTypeEmphasisElement.textContent = serviceConfig.displayName.toLowerCase();
    }

    // Обновление всех динамических элементов с типом услуги
    document.querySelectorAll('[data-service-type]').forEach(element => {
      element.textContent = serviceConfig.displayName;
    });

    // Обновление ссылки на сравнение (для unsure)
    const comparisonLinkContainer = document.getElementById('comparison-link-container');
    if (comparisonLinkContainer) {
      comparisonLinkContainer.style.display = 
        serviceConfig.showEducationTable ? 'block' : 'none';
    }
  }

  /**
   * Показать/скрыть образовательную таблицу
   */
  toggleEducationTable(show) {
    const educationSection = document.getElementById('service-education-section');
    if (educationSection) {
      educationSection.style.display = show ? 'block' : 'none';
    }
  }

  /**
   * Генерация сценариев на основе конфигурации
   */
  generateScenarios(scenarios, introText) {
    const container = document.getElementById('dynamic-scenarios-container');
    if (!container) {
      console.warn('Container #dynamic-scenarios-container not found');
      return;
    }

    // Очистка контейнера
    container.innerHTML = '';

    // Добавление вводного текста
    if (introText) {
      const intro = document.createElement('p');
      intro.className = 'text-center-large';
      intro.textContent = introText;
      container.appendChild(intro);
    }

    // Генерация карточек сценариев
    scenarios.forEach(scenario => {
      const card = this.createScenarioCard(scenario);
      container.appendChild(card);
    });
  }

  /**
   * Создание карточки сценария
   * Универсальная функция для всех типов похорон
   */
  createScenarioCard(data) {
    const card = document.createElement('div');
    card.className = 'enhanced-scenario-card';
    
    let html = '';
    
    // Бейдж "Рекомендуется" если есть
    if (data.recommended) {
      html += '<div class="recommended-text-simple">RECOMMENDED APPROACH</div>';
    }
    
    // Заголовок
    html += `<h3 class="enhanced-scenario-title">${this.escapeHtml(data.title)}</h3>`;
    
    // Блок с экономией
    html += `
      <div class="savings-highlight">
        <div class="savings-amount">${this.escapeHtml(data.savings)}</div>
        <div class="savings-subtitle">${this.escapeHtml(data.percent)}</div>
      </div>
    `;
    
    // Описание
    html += `
      <p class="enhanced-scenario-description">
        ${this.escapeHtml(data.description)}
      </p>
    `;
    
    // Список шагов
    if (data.steps && data.steps.length > 0) {
      html += '<ul class="enhanced-steps-list">';
      data.steps.forEach(step => {
        html += `<li>${this.escapeHtml(step)}</li>`;
      });
      html += '</ul>';
    }
    
    // Информация о сценарии
    html += `
      <div class="enhanced-scenario-info">
        <p><strong>Best for:</strong> ${this.escapeHtml(data.bestFor)}</p>
        <p><strong>Time needed:</strong> ${this.escapeHtml(data.timeNeeded)}</p>
      </div>
    `;
    
    card.innerHTML = html;
    return card;
  }

  /**
   * Обновление UI элементов на странице
   */
  updateUIElements(serviceConfig, serviceType) {
    // Обновление меток типа услуги
    document.querySelectorAll('.dynamic-service-type').forEach(el => {
      el.textContent = serviceConfig.displayName;
    });

    // Обновление типа услуги в секции FREE vs PREMIUM
    const clarityServiceType = document.querySelector('.free-vs-premium-clarity .dynamic-service-type');
    if (clarityServiceType) {
      clarityServiceType.textContent = serviceConfig.displayName || 'your service';
    }

    // Обновление заголовка страницы
    this.updatePageTitle(serviceConfig, serviceType);

    // Добавление индикаторов персонализации
    this.highlightPersonalization(serviceType);
  }

  /**
   * Обновление заголовка страницы
   */
  updatePageTitle(serviceConfig, serviceType) {
    if (serviceConfig.showEducationTable) {
      // Для unsure не меняем заголовок
      return;
    }

    const titleElement = document.querySelector('.report-title');
    if (titleElement) {
      const originalTitle = 'Your Funeral Cost Analysis';
      titleElement.innerHTML = `${originalTitle}<br><span class="service-type-subtitle">${serviceConfig.displayName}</span>`;
    }
  }

  /**
   * Подсветка персонализации
   */
  highlightPersonalization(serviceType) {
    if (serviceType !== 'unsure' && serviceType !== 'not_sure') {
      document.body.classList.add('personalized-content');
      
      // Добавление бейджей персонализации к карточкам
      setTimeout(() => {
        document.querySelectorAll('.enhanced-scenario-card').forEach((card, index) => {
          if (!card.querySelector('.personalization-badge')) {
            const badge = document.createElement('div');
            badge.className = 'personalization-badge';
            badge.innerHTML = `<span class="badge-icon">✓</span> Optimized for ${this.getServiceTypeDisplayName(serviceType)}`;
            card.insertBefore(badge, card.firstChild);
          }
        });
      }, 100);
    } else {
      document.body.classList.remove('personalized-content');
    }
  }

  /**
   * Получение отображаемого имени типа услуги
   */
  getServiceTypeDisplayName(serviceType) {
    const displayNames = {
      'traditional': 'Traditional Services',
      'direct': 'Direct Cremation',
      'simple': 'Simple Services',
      'hybrid': 'Simple Services',
      'burial': 'Burial Services'
    };
    return displayNames[serviceType] || 'Your Service Type';
  }

  /**
   * Трекинг генерации отчета для аналитики
   */
  trackReportGeneration(serviceType) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'service_type_selected', {
        'service_type': serviceType,
        'page_location': window.location.href
      });
    }

    // Трекинг количества сценариев
    setTimeout(() => {
      const scenarioCount = document.querySelectorAll('.enhanced-scenario-card').length;
      if (typeof gtag !== 'undefined') {
        gtag('event', 'scenarios_generated', {
          'service_type': serviceType,
          'scenario_count': scenarioCount
        });
      }
    }, 500);
  }

  /**
   * Экранирование HTML для безопасности
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ReportEngine;
}

