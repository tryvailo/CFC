# ClearFuneralCosts - Карта зависимостей проекта

**Дата создания:** 19 декабря 2024  
**Тип:** Полная карта зависимостей между файлами

---

## 🗺️ **ВИЗУАЛЬНАЯ КАРТА ЗАВИСИМОСТЕЙ**

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLEARFUNERALCOSTS PROJECT                   │
│                        DEPENDENCY MAP                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   HTML FILES     │    │   CSS FILES      │    │  JS FILES       │
│                 │    │                 │    │                 │
│ index.html ─────┼────┼─► main.css      │    │ main.js         │
│ privacy.html ───┼────┼─► main.css      │    │                 │
│ questionnaire ───┼────┼─► main.css      │    │                 │
│ test_nav.html ──┼────┼─► main.css      │    │                 │
│                 │    │                 │    │                 │
│ checkout/       │    │ premium_report  │    │                 │
│ ├─ payment.html ┼────┼─► main.css      │    │                 │
│ ├─ failed.html ─┼────┼─► main.css      │    │                 │
│ └─ thank-you ───┼────┼─► main.css      │    │                 │
│                 │    │                 │    │                 │
│ reports/        │    │ optimized.css   │    │                 │
│ ├─ free_report ─┼────┼─► main.css      │    │                 │
│ ├─ premium_rpt ─┼────┼─► premium.css   │    │                 │
│ └─ *_old.html ──┼────┼─► main.css      │    │                 │
│                 │    │                 │    │                 │
│ SouthEast/      │    │ mobile-opt.css  │    │                 │
│ └─ index.html ──┼────┼─► main.css      │    │                 │
│                 │    │                 │    │                 │
│ email-templates/│    │ complete.css    │    │                 │
│ ├─ free_email ──┼────┼─► inline styles │    │                 │
│ ├─ premium_conf ┼────┼─► inline styles │    │                 │
│ ├─ premium_del ─┼────┼─► inline styles │    │                 │
│ └─ support_resp ┼────┼─► inline styles │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 📊 **ДЕТАЛЬНАЯ КАРТА ЗАВИСИМОСТЕЙ**

### **1. ОСНОВНЫЕ СТРАНИЦЫ**

```
index.html
├── CSS Dependencies:
│   ├── main.css (100% - основные стили)
│   └── Встроенные стили (специфические элементы)
├── JS Dependencies:
│   ├── main.js (initializeCalculator)
│   ├── main.js (initializeFAQ)
│   ├── main.js (initializeSmoothScrolling)
│   └── main.js (initializeAnalytics)
└── External Dependencies:
    ├── Google Analytics (опционально)
    └── Системные шрифты
```

### **2. СТРАНИЦЫ ОПЛАТЫ**

```
checkout/payment.html
├── CSS Dependencies:
│   └── main.css (100% - наследует все стили)
├── JS Dependencies:
│   ├── main.js (initializeCalculator)
│   ├── main.js (form validation)
│   └── main.js (initializeAnalytics)
└── Form Dependencies:
    ├── Stripe.js (планируется)
    └── Валидация полей

checkout/payment-failed.html
├── CSS Dependencies:
│   └── main.css (100%)
└── JS Dependencies:
    └── main.js (initializeAnalytics)

checkout/thank-you.html
├── CSS Dependencies:
│   └── main.css (100%)
└── JS Dependencies:
    └── main.js (initializeAnalytics)
```

### **3. ОТЧЕТЫ**

```
reports/free_report.html
├── CSS Dependencies:
│   ├── main.css (базовые стили)
│   └── premium_report.css (специфические стили отчета)
├── JS Dependencies:
│   └── main.js (initializeAnalytics)
└── Content Dependencies:
    ├── Динамические данные отчета
    └── Пользовательские данные

reports/premium_report.html
├── CSS Dependencies:
│   ├── main.css (базовые стили)
│   └── premium_report.css (специфические стили)
├── JS Dependencies:
│   ├── main.js (initializeAnalytics)
│   └── main.js (progress tracking)
└── Interactive Dependencies:
    ├── Прогресс-трекинг
    ├── Копирование скриптов
    └── Интерактивные элементы
```

### **4. РЕГИОНАЛЬНЫЕ СТРАНИЦЫ**

```
SouthEast/index.html
├── CSS Dependencies:
│   └── main.css (100% - наследует все стили)
├── JS Dependencies:
│   ├── main.js (initializeCalculator)
│   ├── main.js (regional data)
│   ├── main.js (initializeFAQ)
│   └── main.js (initializeAnalytics)
└── Data Dependencies:
    ├── southEastCostData (в main.js)
    └── Региональные данные стоимости
```

### **5. EMAIL ШАБЛОНЫ**

```
email-templates/email-free-report.html
├── CSS Dependencies:
│   └── Встроенные стили (inline styles)
└── Content Dependencies:
    ├── Переменные шаблона
    └── Пользовательские данные

email-templates/email-premium-confirmation.html
├── CSS Dependencies:
│   └── Встроенные стили (inline styles)
└── Content Dependencies:
    ├── Данные оплаты
    └── Информация о заказе

email-templates/email-premium-delivery.html
├── CSS Dependencies:
│   └── Встроенные стили (inline styles)
└── Content Dependencies:
    ├── Ссылки на отчет
    └── Инструкции по доступу

email-templates/email-support-response.html
├── CSS Dependencies:
│   └── Встроенные стили (inline styles)
└── Content Dependencies:
    ├── Ответы поддержки
    └── Контактная информация
```

---

## 🔄 **CSS ЗАВИСИМОСТИ**

### **Иерархия CSS файлов:**

```
main.css (БАЗОВЫЙ)
├── CSS Variables
├── Base Styles
├── Typography
├── Layout
├── Components
└── Utilities

premium_report.css
└── main.css (наследует базовые стили)
    ├── Report-specific styles
    ├── Interactive elements
    └── Print styles

optimized.css
└── main.css (исходник)
    ├── Minified version
    ├── Production ready
    └── Performance optimized

mobile-optimized.css
└── main.css (исходник)
    ├── Mobile-first approach
    ├── Responsive breakpoints
    └── Touch-friendly elements

complete-styles.css
├── main.css
├── premium_report.css
└── All styles combined
```

---

## ⚡ **JAVASCRIPT ЗАВИСИМОСТИ**

### **Функциональные зависимости:**

```
main.js
├── Calculator Functions
│   ├── initializeCalculator()
│   ├── validatePostcode()
│   ├── calculateCost()
│   └── displayResults()
├── FAQ Functions
│   ├── initializeFAQ()
│   ├── toggleFAQ()
│   └── animateFAQ()
├── Navigation Functions
│   ├── initializeSmoothScrolling()
│   ├── handleAnchorLinks()
│   └── scrollToSection()
├── Analytics Functions
│   ├── initializeAnalytics()
│   ├── trackEvent()
│   └── trackPageView()
└── Data Dependencies
    ├── southEastCostData
    ├── FAQ data
    └── Analytics configuration
```

---

## 📱 **АДАПТИВНЫЕ ЗАВИСОСТИ**

### **Breakpoint Dependencies:**

```
Mobile (< 480px)
├── mobile-optimized.css
├── Touch-friendly elements
└── Simplified navigation

Tablet (480px - 768px)
├── main.css (responsive)
├── Flexible grid
└── Optimized forms

Desktop (> 768px)
├── main.css (full features)
├── Complete functionality
└── Advanced interactions
```

---

## 🔧 **ТЕХНИЧЕСКИЕ ЗАВИСИМОСТИ**

### **Внешние зависимости:**

```
Google Analytics
├── gtag.js (опционально)
├── Event tracking
└── Page view tracking

System Fonts
├── -apple-system
├── BlinkMacSystemFont
├── 'Segoe UI'
└── Fallback fonts

CDN Resources (планируется)
├── Stripe.js
├── External libraries
└── Performance optimization
```

---

## 🚀 **МИГРАЦИОННЫЕ ЗАВИСИМОСТИ**

### **Критический путь миграции:**

```
1. CSS Migration
   main.css → Tailwind CSS
   premium_report.css → Component styles
   Variables → Tailwind config

2. JavaScript Migration
   main.js → React hooks
   Calculator → React components
   FAQ → React state management

3. HTML Migration
   Static HTML → Next.js pages
   Forms → React Hook Form
   Templates → React components

4. Data Migration
   Static data → API routes
   Mock data → Database
   Analytics → Next.js analytics
```

---

## ✅ **ЗАКЛЮЧЕНИЕ**

**Карта зависимостей показывает четкую архитектуру проекта:**

### **Ключевые зависимости:**
- ✅ **main.css** - основа всех стилей
- ✅ **main.js** - основа всей интерактивности
- ✅ **premium_report.css** - специфические стили отчетов
- ✅ **Региональные данные** - встроены в main.js

### **Миграционная готовность:**
- ✅ **Все зависимости выявлены** - полная карта связей
- ✅ **Критический путь определен** - порядок миграции
- ✅ **Технические требования понятны** - что нужно перенести
- ✅ **Совместимость обеспечена** - все функции сохранятся

**Проект готов к полной миграции с сохранением всех зависимостей!** 🎯

---

**Карта зависимостей создана:** 19 декабря 2024  
**Статус:** ✅ **ПОЛНАЯ КАРТА ЗАВИСИМОСТЕЙ ЗАВЕРШЕНА**  
**Следующий шаг:** Планирование миграции в Next.js 14
