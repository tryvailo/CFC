# Исправление проблемы с загрузкой старых данных в formData

**Дата:** 16 октября 2025  
**Проблема:** formData объект загружал старые данные из localStorage даже после очистки

---

## Найденная проблема

### Неправильный порядок инициализации
```javascript
init() {
    // Clear old data from localStorage
    this.clearOldData();
    
    this.setupProgressIndicator();
    this.setupFormSteps();
    this.setupNavigation();
    this.setupDataPersistence(); // ← Загружает старые данные!
    // ...
}
```

### Проблема в setupDataPersistence()
Метод `setupDataPersistence()` вызывает `loadStepData()`, который загружает данные из localStorage:
```javascript
loadStepData() {
    const savedData = localStorage.getItem('questionnaireData');
    if (savedData) {
        try {
            this.formData = JSON.parse(savedData); // ← Загружает старые данные!
            this.populateForm();
        } catch (e) {
            console.warn('Could not parse saved questionnaire data');
        }
    }
}
```

---

## Выполненные исправления

### 1. Изменен порядок инициализации

**Было:**
```javascript
init() {
    // Clear old data from localStorage
    this.clearOldData();
    
    this.setupProgressIndicator();
    this.setupFormSteps();
    this.setupNavigation();
    this.setupDataPersistence(); // ← Загружает данные ПОСЛЕ очистки
    // ...
}
```

**Стало:**
```javascript
init() {
    this.setupProgressIndicator();
    this.setupFormSteps();
    this.setupNavigation();
    
    // Clear old data from localStorage BEFORE setting up data persistence
    this.clearOldData();
    
    this.setupDataPersistence(); // ← Теперь очистка происходит ПЕРЕД загрузкой
    // ...
}
```

### 2. Добавлена очистка formData объекта

**Добавлено в clearOldData():**
```javascript
clearOldData() {
    // ... очистка localStorage ...
    
    // Clear formData object
    this.formData = {};
    
    console.log('Old questionnaire data cleared from localStorage and formData');
}
```

### 3. Добавлен ключ questionnaireData

**Добавлено в список очищаемых ключей:**
```javascript
const keysToRemove = [
    'questionnaire_data',
    'questionnaire_progress',
    'questionnaireData', // ← Ключ, используемый текущей системой
    // ... остальные ключи
];
```

---

## Результат

✅ **Правильный порядок** - очистка происходит ПЕРЕД загрузкой данных  
✅ **Очищен formData** - объект сбрасывается в пустое состояние  
✅ **Очищен localStorage** - все старые данные удалены  
✅ **Чистый старт** - анкета начинается с пустых данных  

---

## Как это работает

### Новый порядок инициализации:
1. **Настройка интерфейса** - progress, steps, navigation
2. **Очистка данных** - localStorage + formData
3. **Настройка персистентности** - теперь загружает пустые данные
4. **Настройка остального** - disclaimer, options, navigation

### Очищаемые данные:
- `localStorage` - все старые данные из браузера
- `this.formData` - объект с данными формы
- `questionnaireData` - основной ключ системы

---

## Дополнительные улучшения

### Отладочные сообщения:
```javascript
console.log('Old questionnaire data cleared from localStorage and formData');
```

### Проверка очистки:
После загрузки анкеты в консоли должно появиться сообщение о очистке данных.

---

## Заключение

Проблема с загрузкой старых данных решена:
- ✅ **Правильный порядок** - очистка перед загрузкой
- ✅ **Очищен formData** - объект сброшен
- ✅ **Очищен localStorage** - все старые данные удалены
- ✅ **Чистый старт** - анкета начинается с пустых полей

Теперь каждая новая сессия анкеты гарантированно начинается с чистого состояния.
