# 🎨 CLEARFUNERALCOSTS STYLE GUIDE

## 📋 Оглавление
1. [BEM Методология](#bem-методология)
2. [Цветовая палитра](#цветовая-палитра)
3. [Типографика](#типографика)
4. [Компоненты](#компоненты)
5. [Утилиты](#утилиты)
6. [Responsive Design](#responsive-design)

---

## 🏗️ BEM Методология

### Принципы BEM
- **Block** (Блок) - независимый компонент
- **Element** (Элемент) - часть блока
- **Modifier** (Модификатор) - вариация блока или элемента

### Синтаксис
```css
/* Block */
.hero { }

/* Element */
.hero__title { }
.hero__subtitle { }

/* Modifier */
.hero--large { }
.hero__title--centered { }
```

### Примеры использования
```html
<!-- Block with Elements -->
<div class="hero">
    <h1 class="hero__title">Title</h1>
    <p class="hero__subtitle">Subtitle</p>
</div>

<!-- Block with Modifier -->
<div class="hero hero--large">
    <h1 class="hero__title hero__title--centered">Title</h1>
</div>
```

---

## 🎨 Цветовая палитра

### Основные цвета
```css
/* Primary Navy */
--primary-navy: #1e3a5f;
--primary-navy-light: #2d5a8a;
--primary-navy-dark: #152c47;

/* Accent Sage */
--accent-sage: #5a7a5f;
--accent-sage-light: #7a9a7f;
--accent-sage-pale: #e8f3ea;
--accent-sage-dark: #4a6a4f;

/* Neutral Colors */
--neutral-900: #1a202c;  /* Primary text */
--neutral-800: #2d3748;  /* Secondary text */
--neutral-700: #4a5568;  /* Tertiary text */
--neutral-600: #718096;  /* Muted text */
--neutral-500: #a0aec0;  /* Disabled text */
--neutral-400: #cbd5e0;  /* Borders */
--neutral-300: #e2e8f0;  /* Dividers */
--neutral-200: #edf2f7;  /* Hover backgrounds */
--neutral-100: #f7fafc;  /* Light backgrounds */
--neutral-50: #fafbfc;   /* Lightest backgrounds */
```

### Статусные цвета
```css
/* Success */
--success-green: #047857;
--success-green-light: #10b981;
--success-green-pale: #d1fae5;

/* Warning */
--warning-amber: #d97706;
--warning-amber-light: #f59e0b;
--warning-amber-pale: #fef3c7;

/* Error */
--error-red: #b91c1c;
--error-red-light: #dc2626;
--error-red-pale: #fee2e2;

/* Info */
--info-blue: #1e40af;
--info-blue-light: #3b82f6;
--info-blue-pale: #dbeafe;
```

---

## 📝 Типографика

### Размеры шрифтов
```css
/* Base */
--text-base: 20px;           /* Основной текст */
--text-xs: 14px;             /* Мелкий текст */
--text-sm: 16px;             /* Маленький текст */
--text-md: 18px;             /* Средний текст */
--text-lg: 24px;             /* Большой текст */
--text-xl: 28px;             /* Очень большой текст */

/* Headings */
--text-h1: 48px;             /* Заголовок 1 */
--text-h2: 36px;             /* Заголовок 2 */
--text-h3: 28px;             /* Заголовок 3 */
--text-h4: 24px;             /* Заголовок 4 */
--text-h5: 20px;             /* Заголовок 5 */
--text-h6: 18px;             /* Заголовок 6 */
```

### Веса шрифтов
```css
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Межстрочные интервалы
```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.4;
--leading-normal: 1.6;       /* По умолчанию */
--leading-relaxed: 1.8;      /* Для плотного текста */
--leading-loose: 2.0;
```

---

## 🧩 Компоненты

### Hero Section
```html
<section class="hero">
    <div class="hero__container">
        <div class="hero__content">
            <h1 class="hero__title">Main Title</h1>
            <p class="hero__subtitle">Subtitle text</p>
            <ul class="hero__proof">
                <li class="hero__proof-item">Proof point 1</li>
                <li class="hero__proof-item">Proof point 2</li>
            </ul>
        </div>
    </div>
</section>
```

### Information Service Form
```html
<div class="information-service">
    <h2 class="information-service__title">Form Title</h2>
    <p class="information-service__subtitle">Form description</p>
    <form class="information-service__form">
        <div class="information-service__form-group">
            <label class="information-service__label">Label</label>
            <input class="information-service__input" type="text">
        </div>
        <button class="information-service__button">Submit</button>
    </form>
</div>
```

### Buttons
```html
<!-- Primary Button -->
<button class="btn btn--primary">Primary Button</button>

<!-- Secondary Button -->
<button class="btn btn--secondary">Secondary Button</button>

<!-- Large Button -->
<button class="btn btn--primary btn--large">Large Button</button>

<!-- Small Button -->
<button class="btn btn--secondary btn--small">Small Button</button>
```

### Cards
```html
<div class="card">
    <div class="card__header">
        <h3 class="card__title">Card Title</h3>
        <p class="card__subtitle">Card subtitle</p>
    </div>
    <div class="card__body">
        <div class="card__content">Card content goes here</div>
    </div>
    <div class="card__footer">
        <button class="btn btn--primary">Action</button>
    </div>
</div>
```

### Sections
```html
<section class="section">
    <div class="section__container">
        <div class="section__header">
            <h2 class="section__title">Section Title</h2>
            <p class="section__subtitle">Section description</p>
        </div>
        <div class="section__content">
            <!-- Section content -->
        </div>
    </div>
</section>
```

### Stats Grid
```html
<div class="stats-grid">
    <div class="stats-grid__item">
        <div class="stats-grid__number">1,347</div>
        <div class="stats-grid__label">Funeral Directors</div>
    </div>
    <div class="stats-grid__item">
        <div class="stats-grid__number">£500-£1,500</div>
        <div class="stats-grid__label">Potential Savings</div>
    </div>
</div>
```

### Navigation
```html
<nav class="nav">
    <div class="nav__container">
        <a href="/" class="nav__logo">ClearFuneralCosts</a>
        <ul class="nav__list">
            <li class="nav__item">
                <a href="/" class="nav__link nav__link--active">Home</a>
            </li>
            <li class="nav__item">
                <a href="/about" class="nav__link">About</a>
            </li>
        </ul>
    </div>
</nav>
```

### FAQ
```html
<div class="faq">
    <div class="faq__container">
        <h2 class="faq__title">Frequently Asked Questions</h2>
        <div class="faq__item">
            <div class="faq__question">
                <h3 class="faq__question-text">Question text?</h3>
                <span class="faq__toggle-icon">▼</span>
            </div>
            <div class="faq__answer">
                <div class="faq__answer-content">Answer content</div>
            </div>
        </div>
    </div>
</div>
```

---

## 🛠️ Утилиты

### Spacing
```css
--space-0: 0;
--space-1: 8px;
--space-2: 16px;
--space-3: 24px;
--space-4: 32px;
--space-5: 40px;
--space-6: 48px;
--space-8: 64px;
--space-10: 80px;
--space-12: 96px;
```

### Border Radius
```css
--radius-none: 0;
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
--radius-2xl: 16px;
```

### Shadows
```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

---

## 📱 Responsive Design

### Breakpoints
```css
/* Desktop */
@media (min-width: 1024px) { }

/* Tablet */
@media (max-width: 968px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Small Mobile */
@media (max-width: 480px) { }
```

### Mobile-First подход
- Начинаем с мобильных стилей
- Добавляем стили для больших экранов через медиа-запросы
- Используем `min-width` для прогрессивного улучшения

### Touch Targets
```css
/* Минимальный размер для touch элементов */
--touch-target-min: 48px;
--touch-target-recommended: 56px;  /* Для 55+ */
--touch-target-mobile: 64px;       /* Мобильные для 55+ */
```

---

## 🎯 Лучшие практики

### Именование классов
- Используйте BEM методологию
- Избегайте сокращений
- Будьте описательными
- Используйте kebab-case для модификаторов

### Структура CSS
- Группируйте стили по блокам
- Используйте комментарии для разделения секций
- Следуйте единому порядку свойств

### Производительность
- Используйте CSS переменные
- Минифицируйте CSS для продакшена
- Избегайте глубокой вложенности селекторов
- Используйте `transform` и `opacity` для анимаций

### Доступность
- Обеспечьте достаточный контраст (WCAG AA)
- Используйте семантические HTML теги
- Добавляйте `focus` состояния
- Поддерживайте клавиатурную навигацию

---

## 📚 Дополнительные ресурсы

- [BEM Methodology](https://bem.info/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

*Последнее обновление: Октябрь 2025*
