# Исправление проблемы со старыми данными localStorage

**Дата:** 16 октября 2025  
**Проблема:** Анкета использует старые данные из localStorage от предыдущих тестов

---

## Найденная проблема

### Старые данные в localStorage
Анкета загружала старые данные из localStorage браузера:
```javascript
{
    contact_001: 'фдуч еууц',
    contact_002: 'test@gmail.com', 
    contact_003: '+447798994940',
    contact_004: 'relative',
    contact_005: 'Al;fj',
    budget_range: '2000_4000',
    care_003: '',
    emergency_contact: '+447798994940',
    location_001: 'Birmingham',
    location_002: '15km',
    location_003: '1',
    location_004: 'essential',
    power_of_attorney: 'patient_decides',
    service_type: 'traditional_burial',
    system_001: 'gdpr_consent',
    system_002: 'terms_consent',
    timeline: 'immediate',
    timeline_006: ''
}
```

---

## Выполненные исправления

### 1. Добавлен метод очистки старых данных

```javascript
clearOldData() {
    // Clear all questionnaire-related data from localStorage
    const keysToRemove = [
        'questionnaire_data',
        'questionnaire_progress',
        'contact_001', 'contact_002', 'contact_003', 'contact_004', 'contact_005',
        'budget_range', 'care_003', 'emergency_contact', 'location_001', 'location_002',
        'location_003', 'location_004', 'power_of_attorney', 'service_type',
        'system_001', 'system_002', 'timeline', 'timeline_006', 'culture_002'
    ];
    
    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
    });
    
    // Clear any other keys that start with common prefixes
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('contact_') || 
            key.startsWith('location_') || 
            key.startsWith('system_') || 
            key.startsWith('timeline_') ||
            key.startsWith('care_') ||
            key.startsWith('culture_') ||
            key === 'budget_range' ||
            key === 'emergency_contact' ||
            key === 'power_of_attorney' ||
            key === 'service_type') {
            localStorage.removeItem(key);
        }
    });
    
    console.log('Old questionnaire data cleared from localStorage');
}
```

### 2. Добавлен вызов очистки при инициализации

```javascript
init() {
    // Clear old data from localStorage
    this.clearOldData();
    
    this.setupProgressIndicator();
    this.setupFormSteps();
    this.setupNavigation();
    this.setupDataPersistence();
    this.setupLegalDisclaimer();
    this.setupOptionSelection();
    
    // Update navigation buttons after initialization
    this.updateNavigationButtons();
}
```

---

## Результат

✅ **Старые данные очищены** - localStorage очищается при загрузке анкеты  
✅ **Чистый старт** - анкета начинается с пустых данных  
✅ **Нет конфликтов** - старые данные не влияют на новую сессию  
✅ **Отладочное сообщение** - в консоли появляется подтверждение очистки  

---

## Как это работает

### При загрузке анкеты:
1. **Очищается localStorage** - удаляются все старые данные анкеты
2. **Инициализируется анкета** - начинается с чистого состояния
3. **Пользователь заполняет заново** - все данные свежие

### Очищаемые ключи:
- `contact_*` - контактные данные
- `location_*` - данные о местоположении  
- `system_*` - системные данные
- `timeline_*` - данные о временных рамках
- `care_*` - данные об уходе
- `culture_*` - культурные данные
- `budget_range` - бюджетный диапазон
- `emergency_contact` - экстренный контакт
- `power_of_attorney` - доверенность
- `service_type` - тип услуги

---

## Дополнительные возможности

### Ручная очистка localStorage:
Если нужно очистить данные вручную, в консоли браузера выполните:
```javascript
localStorage.clear();
```

### Проверка данных в localStorage:
```javascript
console.log('All localStorage data:', localStorage);
```

---

## Заключение

Проблема со старыми данными решена:
- ✅ localStorage очищается автоматически
- ✅ Анкета начинается с чистого состояния
- ✅ Нет влияния старых данных на новую сессию
- ✅ Пользователь получает свежий опыт

Теперь каждая новая сессия анкеты начинается с чистого листа.
