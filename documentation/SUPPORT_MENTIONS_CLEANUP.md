# Support Mentions Cleanup

## Обзор

Полностью удалены все упоминания поддержки (support) из всех активных файлов проекта согласно требованиям пользователя.

## ✅ Удаленные упоминания

### ❌ **УДАЛЕНО:**
- ✅ Все упоминания "60-day support"
- ✅ Все упоминания "support@clearfuneralcosts.co.uk"
- ✅ Support expiry calculator

### 🔄 **ЗАМЕНЕНО НА:**
- `refunds@clearfuneralcosts.co.uk` - для запросов о возврате средств

## 📁 Измененные файлы

### **Основные страницы:**
1. **`/index.html`** - заменен email в footer
2. **`/SouthEast/index.html`** - заменен email в footer  
3. **`/privacy.html`** - заменен email в footer
4. **`/reports/free_report.html`** - заменен email в footer

### **Отчеты:**
5. **`/reports/premium_report.html`** - удален supportExpiry calculator

### **Email Templates:**
6. **`/email-templates/email-premium-delivery.html`** - заменен email
7. **`/email-templates/email-premium-confirmation.html`** - заменен email
8. **`/email-templates/email-free-report.html`** - заменен email

### **Checkout страницы:**
9. **`/checkout/payment-failed.html`** - заменены все упоминания email
10. **`/checkout/thank-you.html`** - заменен email

## 🔍 Детали изменений

### **1. Удален Support Expiry Calculator**
```javascript
// ❌ УДАЛЕНО из premium_report.html:
// Set support expiry date (60 days from now)
const supportExpiry = new Date();
supportExpiry.setDate(supportExpiry.getDate() + 60);
document.getElementById('supportExpiry').textContent = 
    supportExpiry.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
```

### **2. Заменены все email адреса**
```html
<!-- ❌ БЫЛО: -->
<a href="mailto:support@clearfuneralcosts.co.uk">support@clearfuneralcosts.co.uk</a>

<!-- ✅ СТАЛО: -->
<a href="mailto:refunds@clearfuneralcosts.co.uk">refunds@clearfuneralcosts.co.uk</a>
```

### **3. Обновлены все контактные секции**
- Footer на всех основных страницах
- Email templates для всех типов писем
- Checkout страницы для обработки платежей
- Отчеты (free и premium)

## 📊 Статистика изменений

### **Файлы изменены:** 10
### **Упоминаний заменено:** 15+
### **JavaScript код удален:** 1 блок (supportExpiry calculator)

## ✅ Результат

**Все упоминания поддержки полностью удалены из активных файлов!**

### **Что осталось:**
- ✅ Только `refunds@clearfuneralcosts.co.uk` для запросов о возврате средств
- ✅ Упрощенная структура без упоминаний поддержки
- ✅ Четкое разделение: только возврат средств, никакой поддержки

### **Что НЕ затронуто:**
- 📁 Документация (остается для истории изменений)
- 📁 Backup файлы (`.bak`, `.bak2`)
- 📁 Файлы в папке `reports/documentation/`

**Проект полностью очищен от упоминаний поддержки!** ✅
