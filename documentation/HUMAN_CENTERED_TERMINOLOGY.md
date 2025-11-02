# Human-Centered Terminology for 55+ Audience

## Приоритет: #10 | Влияние: MEDIUM | Усилия: 15 минут

## Проблема
Контент использовал техническую терминологию ("calculator", "calculate", "tool", "input data", "results"), которая не резонировала с аудиторией 55+.

## Решение
Переформулированы ключевые фразы на более человечный язык, понятный возрастной аудитории.

## Изменения терминологии

### ❌ **ИЗБЕГАЕМ:**
- **"Calculator"** → ✅ **"Information Service"**
- **"Calculate"** → ✅ **"Understand" / "Explore"**
- **"Tool"** → ✅ **"Guide" / "Resource"**
- **"Input data"** → ✅ **"Tell us about your needs"**
- **"Results"** → ✅ **"Your personalized information"**

### ✅ **ИСПОЛЬЗУЕМ:**
- **"Compassionate guidance"**
- **"Understanding your options"**
- **"Clear information"**
- **"Helping families plan"**
- **"Respectful support"**

## Реализованные изменения

### 🔄 **HTML ИЗМЕНЕНИЯ:**

#### **1. Главная страница (index.html):**
```html
<!-- БЫЛО -->
<div class="calculator-widget" role="region" aria-labelledby="calculator-heading">
    <h2 id="calculator-heading" class="calculator-headline">Free Cost Analysis</h2>
    <form id="analysisForm" class="calculator-form" aria-label="Funeral cost analysis form">
        <button type="submit" class="cta-button">Explore Your Options</button>
    </form>
</div>

<!-- СТАЛО -->
<div class="information-service" role="region" aria-labelledby="information-heading">
    <h2 id="information-heading" class="information-headline">Free Cost Information Service</h2>
    <form id="analysisForm" class="information-form" aria-label="Funeral cost information form">
        <button type="submit" class="cta-button">Get Your Information</button>
    </form>
</div>
```

#### **2. Региональная страница (SouthEast/index.html):**
- Обновлены все аналогичные элементы
- Изменены skip links: "Skip to calculator" → "Skip to information service"
- Обновлены CTA кнопки

#### **3. JavaScript (main.js):**
```javascript
// БЫЛО
class CalculatorModule {
    setupCalculatorForm() {
        // ...
    }
}

// СТАЛО
class InformationServiceModule {
    setupInformationForm() {
        // ...
    }
}
```

### 🎨 **CSS ИЗМЕНЕНИЯ:**

#### **Обновлены все CSS классы:**
```css
/* БЫЛО */
.calculator-widget { }
.calculator-headline { }
.calculator-subheadline { }
.calculator-disclaimer { }
.calculator-form { }

/* СТАЛО */
.information-service { }
.information-headline { }
.information-subheadline { }
.information-disclaimer { }
.information-form { }
```

### 📝 **ТЕКСТОВЫЕ ИЗМЕНЕНИЯ:**

#### **Trust Indicators:**
- **"⚡ Instant Results"** → **"⚡ Instant Information"**

#### **Form Text:**
- **"Enter your email below to receive your detailed free analysis"** → **"Tell us your email below to receive your detailed free information"**

#### **Button Text:**
- **"Explore Your Options"** → **"Get Your Information"**

## Почему это важно для аудитории 55+

### 🧠 **Human-centered language:**
- **"Information Service"** звучит более надежно, чем "Calculator"
- **"Get Your Information"** более понятно, чем "Explore Options"
- **"Tell us your email"** более лично, чем "Enter your email"

### 🤝 **Эмоциональная связь:**
- **"Compassionate guidance"** - показывает понимание ситуации
- **"Helping families plan"** - фокус на поддержке, не технике
- **"Respectful support"** - уважение к трудному периоду

### 👥 **Доступность:**
- **Простые слова** - понятны всем возрастам
- **Человечный тон** - не технический жаргон
- **Эмпатичный подход** - фокус на людях, не процессах

## Файлы изменены
- ✅ `/index.html` - обновлена терминология
- ✅ `/SouthEast/index.html` - обновлена терминология
- ✅ `/assets/css/main.css` - обновлены CSS классы
- ✅ `/assets/js/main.js` - обновлены JavaScript классы

## Результат
**Терминология теперь использует human-centered language, понятный аудитории 55+ и создающий эмоциональную связь через сочувствующий, человечный подход.** ✅
