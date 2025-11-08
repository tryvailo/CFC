# 🔄 Руководство по Интеграции Data-Driven Подхода

## 📋 Обзор

Это руководство показывает, как интегрировать новый data-driven подход в существующий `free_report.html`.

---

## 🎯 Цель Рефакторинга

**До:**
- Множественные функции-генераторы (`generateTraditionalScenarios`, `generateDirectScenarios`, etc.)
- Дублирование кода
- Сложно добавлять новые типы

**После:**
- Один универсальный движок (`ReportEngine`)
- Данные в JSON конфиге
- Легко добавлять новые типы

---

## 📝 Шаги Интеграции

### **Шаг 1: Добавить скрипт движка в HTML**

В `free_report.html`, перед закрывающим тегом `</body>`, добавить:

```html
<!-- Существующие скрипты -->
<script src="../assets/js/main.js"></script>
<script src="../assets/js/reports.js"></script>

<!-- Новый движок отчетов -->
<script src="./js/report-engine.js"></script>
```

### **Шаг 2: Заменить существующий код генерации**

**Найти в `free_report.html` (около строки 686):**

```javascript
function showScenariosForServiceType(serviceType) {
    // ... существующий код ...
    
    switch(serviceType) {
        case 'traditional':
            generateTraditionalScenarios(container);
            break;
        // ... остальные case ...
    }
}
```

**Заменить на:**

```javascript
function showScenariosForServiceType(serviceType) {
    // Загрузка конфигурации и генерация отчета
    fetch('./config/scenarios-config.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load scenarios config');
            }
            return response.json();
        })
        .then(config => {
            const engine = new ReportEngine(config);
            engine.generateReport(serviceType);
        })
        .catch(error => {
            console.error('Error loading report config:', error);
            // Fallback на дефолтный сценарий
            const engine = new ReportEngine({
                serviceTypes: {
                    unsure: {
                        displayName: "Multiple Service Options",
                        showEducationTable: true,
                        introText: "Here are two balanced optimisation approaches:",
                        scenarios: [
                            {
                                title: "Traditional Service with Thoughtful Choices",
                                savings: "£500-£800",
                                percent: "10-15% savings",
                                description: "Maintain familiar funeral traditions while identifying unnecessary costs.",
                                steps: [
                                    "Compare local funeral directors",
                                    "Explore off-peak scheduling",
                                    "Review transport and venues"
                                ],
                                bestFor: "Families wanting familiar traditions",
                                timeNeeded: "2-3 hours",
                                recommended: false
                            },
                            {
                                title: "Direct Cremation + Memorial Service",
                                savings: "£1,500-£2,200",
                                percent: "35-50% savings",
                                description: "Direct cremation followed by separate memorial service for maximum savings and flexibility.",
                                steps: [
                                    "Direct cremation service",
                                    "Separate memorial gathering",
                                    "Flexible timing and location"
                                ],
                                bestFor: "Families wanting maximum savings",
                                timeNeeded: "3-4 hours",
                                recommended: true
                            }
                        ]
                    }
                },
                serviceTypeMap: {}
            });
            engine.generateReport('unsure');
        });
}
```

### **Шаг 3: Удалить старые функции-генераторы**

Удалить следующие функции (они больше не нужны):
- `generateTraditionalScenarios()`
- `generateDirectScenarios()`
- `generateSimpleScenarios()`
- `generateBurialScenarios()`
- `generateUnsureScenarios()`
- `generateDefaultScenarios()`

**Оставить:**
- `createScenarioCard()` - можно удалить, так как она теперь в `ReportEngine`
- `updateServiceTypeLabels()` - можно упростить или удалить, логика в движке
- `highlightPersonalization()` - можно удалить, логика в движке

### **Шаг 4: Упростить вспомогательные функции**

**Обновить `updatePersonalizationHeader()`:**

```javascript
function updatePersonalizationHeader(serviceType) {
    // Эта функция теперь вызывается изнутри ReportEngine
    // Можно удалить или оставить как обертку для обратной совместимости
    // Если оставляем, то просто вызываем движок:
    const urlParams = new URLSearchParams(window.location.search);
    const currentServiceType = urlParams.get('serviceType') || serviceType;
    
    fetch('./config/scenarios-config.json')
        .then(response => response.json())
        .then(config => {
            const engine = new ReportEngine(config);
            engine.generateReport(currentServiceType);
        });
}
```

---

## 🔧 Полный Пример Интеграции

### **Минимальная интеграция (в `free_report.html`):**

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // ... существующий код (updateCurrentDate, etc.) ...
    
    // Получение параметров из URL
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const postcode = urlParams.get('postcode');
    const serviceType = urlParams.get('serviceType') || 'traditional';
    
    // ... существующий код обновления postcode, email ...
    
    // НОВЫЙ КОД: Генерация отчета через движок
    fetch('./config/scenarios-config.json')
        .then(response => response.json())
        .then(config => {
            const engine = new ReportEngine(config);
            engine.generateReport(serviceType);
        })
        .catch(error => {
            console.error('Error loading report config:', error);
            // Fallback на unsure сценарий
            showFallbackScenarios();
        });
    
    // ... остальной существующий код ...
});

// Fallback функция на случай ошибки загрузки конфига
function showFallbackScenarios() {
    const fallbackConfig = {
        serviceTypes: {
            unsure: {
                displayName: "Multiple Service Options",
                showEducationTable: true,
                introText: "Here are two balanced optimisation approaches:",
                scenarios: [
                    // ... базовые сценарии ...
                ]
            }
        },
        serviceTypeMap: {}
    };
    const engine = new ReportEngine(fallbackConfig);
    engine.generateReport('unsure');
}
```

---

## ✅ Проверочный Список

После интеграции проверить:

- [ ] Конфиг загружается без ошибок
- [ ] Все типы похорон работают (traditional, direct, simple, burial, unsure)
- [ ] Образовательная таблица показывается только для unsure
- [ ] Сценарии генерируются корректно
- [ ] Заголовки обновляются правильно
- [ ] Аналитика работает
- [ ] Нет ошибок в консоли браузера

---

## 🧪 Тестирование

### **Тест 1: Все типы похорон**

```javascript
// В консоли браузера
const testTypes = ['traditional', 'direct', 'simple', 'burial', 'unsure'];

testTypes.forEach(type => {
    console.log(`Testing ${type}...`);
    fetch('./config/scenarios-config.json')
        .then(r => r.json())
        .then(config => {
            const engine = new ReportEngine(config);
            engine.generateReport(type);
            console.log(`✅ ${type} OK`);
        });
});
```

### **Тест 2: Проверка количества сценариев**

```javascript
// После генерации отчета
const scenarioCount = document.querySelectorAll('.enhanced-scenario-card').length;
console.log(`Scenarios generated: ${scenarioCount}`); // Должно быть 2
```

### **Тест 3: Проверка образовательной таблицы**

```javascript
// Для unsure типа
const educationSection = document.getElementById('service-education-section');
console.log('Education table visible:', educationSection.style.display !== 'none');
```

---

## 🚀 Преимущества После Интеграции

1. **Простота добавления нового типа:**
   - Добавить запись в `scenarios-config.json`
   - Готово! Не нужно трогать JavaScript

2. **Легкое редактирование текстов:**
   - Редактировать JSON файл
   - Не нужно искать в коде

3. **Единая точка входа:**
   - Вся логика в `ReportEngine`
   - Легко дебажить и тестировать

4. **Готовность к миграции:**
   - JSON → легко в React state
   - Движок → легко в React компоненты

---

## 📝 Следующие Шаги

1. ✅ Интегрировать движок в `free_report.html`
2. ✅ Протестировать все типы похорон
3. ✅ Удалить старые функции-генераторы
4. ✅ Документировать процесс добавления новых типов
5. ✅ Подготовить к миграции в Next.js

---

**Дата:** 2025-01-27  
**Статус:** ✅ Готово к интеграции

