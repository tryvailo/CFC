# 🏗️ Архитектурная Рекомендация: Система Шаблонов Отчета

## 📋 Резюме Рекомендации

**Рекомендуемый подход:** **Гибридный с Data-Driven конфигурацией**

### ✅ Почему этот подход оптимален:

1. **Простота для bootstrap проекта** - один основной шаблон
2. **Поддерживаемость** - данные отделены от логики
3. **Масштабируемость** - легко добавлять новые типы похорон
4. **Готовность к миграции** - легко переносится в Next.js/React

---

## 🎯 Архитектурное Решение

### **Структура:**
```
reports/
├── free_report.html              # Основной шаблон (универсальный)
├── config/
│   └── scenarios-config.json     # Конфигурация сценариев
└── js/
    └── report-engine.js          # Движок генерации (data-driven)
```

### **Принцип работы:**

1. **Один универсальный шаблон** (`free_report.html`)
   - Содержит все возможные секции (скрытые по умолчанию)
   - Образовательная таблица всегда в HTML, показывается условно
   - Единая структура для всех типов

2. **Конфигурационный файл** (`scenarios-config.json`)
   - Данные для каждого типа похорон
   - Сценарии, тексты, параметры
   - Легко редактировать без изменения кода

3. **Движок генерации** (`report-engine.js`)
   - Читает конфигурацию
   - Генерирует контент на основе типа
   - Обрабатывает специальные случаи (unsure)

---

## 📊 Сравнение Подходов

### **Вариант 1: Один сложный шаблон** ❌
**Проблемы:**
- Сложная логика в одном месте
- Трудно поддерживать
- Риск ошибок при изменениях
- Плохо масштабируется

**Когда использовать:** Только если типов похорон 2-3 и они никогда не изменятся

---

### **Вариант 2: Множество шаблонов** ❌
**Проблемы:**
- Дублирование кода
- Сложно синхронизировать изменения
- Много файлов для поддержки
- Не подходит для bootstrap проекта

**Когда использовать:** Если типы похорон кардинально разные (разные макеты, структура)

---

### **Вариант 3: Гибридный Data-Driven** ✅ **РЕКОМЕНДУЕТСЯ**

**Преимущества:**
- ✅ Один шаблон - простота
- ✅ Данные отделены - поддерживаемость
- ✅ Легко добавлять типы - масштабируемость
- ✅ Готов к миграции в React - будущее-ориентированность

**Структура:**
```
1. HTML шаблон (универсальный)
   └── Все секции, условное отображение

2. JSON конфигурация (данные)
   └── Типы похорон, сценарии, тексты

3. JavaScript движок (логика)
   └── Чтение конфига, генерация контента
```

---

## 🔧 Реализация

### **Шаг 1: Конфигурационный файл**

```json
// config/scenarios-config.json
{
  "serviceTypes": {
    "traditional": {
      "displayName": "Traditional Funeral Service",
      "showEducationTable": false,
      "scenarios": [
        {
          "title": "Conservative Traditional",
          "savings": "£500-£800",
          "percent": "10-15% savings",
          "description": "Keep traditional service while comparing providers and timing.",
          "steps": [
            "Compare several funeral directors",
            "Request off-peak timing",
            "Optimize transport"
          ],
          "bestFor": "Families wanting traditional service",
          "timeNeeded": "2-3 hours",
          "recommended": false
        },
        {
          "title": "Optimized Traditional",
          "savings": "£1,200-£1,800",
          "percent": "25-35% savings",
          "description": "Full traditional service with strategic provider selection for maximum savings.",
          "steps": [
            "Compare 5-8 traditional providers",
            "Strategic timing optimization",
            "Optimize transport options"
          ],
          "bestFor": "Families wanting maximum savings",
          "timeNeeded": "4-6 hours",
          "recommended": true
        }
      ],
      "introText": "Based on your preference for traditional funeral service, here are two optimisation approaches:"
    },
    "unsure": {
      "displayName": "Multiple Service Options",
      "showEducationTable": true,
      "scenarios": [
        {
          "title": "Traditional Service with Thoughtful Choices",
          "savings": "£500-£800",
          "percent": "10-15% savings",
          "description": "Maintain familiar funeral traditions while identifying unnecessary costs.",
          "steps": [
            "Compare local funeral directors",
            "Explore off-peak scheduling",
            "Review transport and venues"
          ],
          "bestFor": "Families wanting familiar traditions",
          "timeNeeded": "2-3 hours",
          "recommended": false
        },
        {
          "title": "Direct Cremation + Memorial Service",
          "savings": "£1,500-£2,200",
          "percent": "35-50% savings",
          "description": "Direct cremation followed by separate memorial service for maximum savings and flexibility.",
          "steps": [
            "Direct cremation service",
            "Separate memorial gathering",
            "Flexible timing and location"
          ],
          "bestFor": "Families wanting maximum savings",
          "timeNeeded": "3-4 hours",
          "recommended": true
        }
      ],
      "introText": "Here are two balanced optimisation approaches:"
    }
    // ... другие типы
  }
}
```

### **Шаг 2: Универсальный движок**

```javascript
// js/report-engine.js
class ReportEngine {
  constructor(config) {
    this.config = config;
  }

  generateReport(serviceType) {
    const serviceConfig = this.config.serviceTypes[serviceType] || 
                         this.config.serviceTypes.unsure;
    
    // Показать/скрыть образовательную таблицу
    this.toggleEducationTable(serviceConfig.showEducationTable);
    
    // Обновить заголовки
    this.updateHeaders(serviceConfig);
    
    // Сгенерировать сценарии
    this.generateScenarios(serviceConfig.scenarios, serviceConfig.introText);
  }

  toggleEducationTable(show) {
    const educationSection = document.getElementById('service-education-section');
    if (educationSection) {
      educationSection.style.display = show ? 'block' : 'none';
    }
  }

  generateScenarios(scenarios, introText) {
    const container = document.getElementById('dynamic-scenarios-container');
    if (!container) return;

    container.innerHTML = '';

    // Добавить вводный текст
    const intro = document.createElement('p');
    intro.className = 'text-center-large';
    intro.textContent = introText;
    container.appendChild(intro);

    // Сгенерировать карточки сценариев
    scenarios.forEach(scenario => {
      const card = this.createScenarioCard(scenario);
      container.appendChild(card);
    });
  }

  createScenarioCard(data) {
    // Единая функция создания карточки
    // Использует данные из конфига
  }
}
```

### **Шаг 3: Использование**

```javascript
// В free_report.html
fetch('./config/scenarios-config.json')
  .then(response => response.json())
  .then(config => {
    const engine = new ReportEngine(config);
    const serviceType = getServiceTypeFromURL(); // 'traditional', 'unsure', etc.
    engine.generateReport(serviceType);
  });
```

---

## 🚀 Преимущества для Bootstrap Проекта

### **1. Простота**
- Один HTML файл
- Один JS файл движка
- Один JSON конфиг
- Легко понять и изменить

### **2. Поддерживаемость**
- Изменение текстов → редактируй JSON
- Добавление типа → добавь в JSON
- Изменение логики → редактируй движок
- Четкое разделение ответственности

### **3. Масштабируемость**
- Новый тип похорон = новая запись в JSON
- Не нужно трогать HTML/JS
- Легко A/B тестировать варианты

### **4. Готовность к миграции**
- JSON конфиг → легко перенести в React state/context
- Движок → легко переписать на React компоненты
- Шаблон → легко разбить на React компоненты

---

## 📈 Эволюция Архитектуры

### **Фаза 1: Текущая (Static HTML)**
```
free_report.html + embedded JS
```

### **Фаза 2: Рефакторинг (Data-Driven)**
```
free_report.html + report-engine.js + scenarios-config.json
```

### **Фаза 3: Миграция в Next.js**
```
app/reports/free/page.tsx
  └── components/
      ├── ReportTemplate.tsx
      ├── ScenarioCard.tsx
      └── EducationTable.tsx
  └── config/
      └── scenarios-config.json
```

---

## 🎯 Рекомендации по Реализации

### **Для текущего проекта (Static HTML):**

1. **Создать `config/scenarios-config.json`**
   - Вынести все данные сценариев
   - Структурировать по типам похорон

2. **Создать `js/report-engine.js`**
   - Универсальный движок генерации
   - Читает конфиг, генерирует контент

3. **Рефакторить `free_report.html`**
   - Убрать встроенные генераторы
   - Использовать движок

### **Для будущей миграции (Next.js):**

1. **Конфиг → TypeScript типы**
   ```typescript
   interface ServiceTypeConfig {
     displayName: string;
     showEducationTable: boolean;
     scenarios: Scenario[];
     introText: string;
   }
   ```

2. **Движок → React компоненты**
   ```tsx
   <ReportTemplate serviceType={serviceType} config={config} />
   ```

3. **Шаблон → Компонентная структура**
   ```tsx
   <ReportHeader />
   <EducationTable show={config.showEducationTable} />
   <Scenarios scenarios={config.scenarios} />
   ```

---

## ✅ Итоговая Рекомендация

**Использовать Гибридный Data-Driven подход:**

1. ✅ **Один универсальный шаблон** - простота
2. ✅ **JSON конфигурация** - поддерживаемость
3. ✅ **Универсальный движок** - масштабируемость
4. ✅ **Готовность к миграции** - будущее-ориентированность

**Это оптимальный баланс между:**
- Простотой для bootstrap проекта
- Поддерживаемостью кода
- Адаптацией функционала
- Готовностью к росту

---

## 📝 Следующие Шаги

1. Создать `config/scenarios-config.json` с текущими данными
2. Создать `js/report-engine.js` с универсальной логикой
3. Рефакторить `free_report.html` для использования движка
4. Протестировать все типы похорон
5. Документировать процесс добавления новых типов

---

**Дата:** 2025-01-27  
**Статус:** ✅ Рекомендация готова к реализации

