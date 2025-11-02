# Hero Section Cleanup - Trust Signals Moved to Footer

## Изменения
Убрана вспомогательная информация из hero секций и перенесена в футеры для улучшения UX и избежания дублирования.

## Что было убрано из Hero секций

### ❌ **УДАЛЕНО ИЗ HERO:**
- **Additional Trust Signals** (🏛️, 🤝, ❤️)
- **Data Sources** (gov.uk, CMA, Bereavement Support Payment)

### ✅ **ОСТАВЛЕНО В HERO:**
- **Основные trust-indicators** (🔒, 📊, ⚡, ℹ️)
- **Short disclaimer** с ссылкой на футер

## Что добавлено в Footer

### ✅ **ДОБАВЛЕНО В ФУТЕР:**

#### **Новая секция "Trust & Data Sources":**
```html
<div class="footer-section">
    <h3>Trust & Data Sources</h3>
    <div class="trust-signals">
        <div class="trust-signal-item">
            <span class="trust-icon">🏛️</span>
            <span class="trust-text">Based on official UK government data</span>
        </div>
        <div class="trust-signal-item">
            <span class="trust-icon">🤝</span>
            <span class="trust-text">Independent service - we don't sell funerals</span>
        </div>
        <div class="trust-signal-item">
            <span class="trust-icon">❤️</span>
            <span class="trust-text">Compassionate support for families</span>
        </div>
    </div>
    <div class="data-sources">
        <p class="data-sources-text">
            <strong>Data Sources:</strong> 
            <a href="https://www.gov.uk/funeral-payments" target="_blank" rel="noopener" class="source-link">gov.uk funeral payments</a> • 
            <a href="https://www.gov.uk/government/statistics/funeral-costs" target="_blank" rel="noopener" class="source-link">CMA funeral market study</a> • 
            <a href="https://www.gov.uk/bereavement-support-payment" target="_blank" rel="noopener" class="source-link">Bereavement Support Payment</a>
        </p>
    </div>
</div>
```

## Преимущества изменений

### 🎯 **Улучшенный UX:**
- **Чистый hero** - фокус на главном действии
- **Логичное размещение** - trust signals в футере
- **Нет дублирования** - информация в одном месте

### 📱 **Лучшая мобильная версия:**
- **Меньше контента** в hero секции
- **Быстрая загрузка** главного экрана
- **Четкий CTA** без отвлечений

### 🔍 **SEO преимущества:**
- **Trust signals** остаются на странице
- **Data sources** доступны для поисковиков
- **Лучшая структура** контента

## Файлы изменены
- ✅ `/index.html` - убраны trust signals из hero, добавлены в footer
- ✅ `/SouthEast/index.html` - убраны trust signals из hero, добавлены в footer

## Результат
**Hero секции стали чище и сфокусированнее, а trust signals и data sources логично размещены в футере без дублирования.** ✅
