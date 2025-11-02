# Инструкции по отладке анкеты questionnaire.html

**Дата:** 16 октября 2025  
**Проблема:** Анкета не работает - опции не выделяются при клике

---

## Отладочные сообщения добавлены

### 1. Инициализация
```javascript
console.log('Questionnaire: DOM loaded, initializing...');
```

### 2. Настройка опций
```javascript
console.log('Found options:', options.length);
console.log(`Option ${index}:`, option);
```

### 3. Клик по опции
```javascript
console.log('Option clicked:', option);
console.log('handleOptionSelection called with:', selectedOption);
console.log('Added selected class to:', selectedOption);
```

---

## Инструкции по отладке

### Шаг 1: Откройте анкету в браузере
1. Откройте `questionnaire.html` в браузере
2. Откройте консоль разработчика (F12 → Console)

### Шаг 2: Проверьте инициализацию
В консоли должно появиться:
```
Questionnaire: DOM loaded, initializing...
```

### Шаг 3: Проверьте количество опций
В консоли должно появиться:
```
Found options: X
```
Где X - количество найденных опций (должно быть больше 0)

### Шаг 4: Проверьте каждую опцию
В консоли должно появиться:
```
Option 0: <div class="option" data-question="service_type" data-value="traditional_burial" ...>
Option 1: <div class="option" data-question="service_type" data-value="traditional_cremation" ...>
...
```

### Шаг 5: Попробуйте кликнуть на опцию
В консоли должно появиться:
```
Option clicked: <div class="option" ...>
handleOptionSelection called with: <div class="option" ...>
Question card: <div class="question-card" id="question-1" ...>
Type: service_type
Value: traditional_burial
Added selected class to: <div class="option" ...>
```

---

## Возможные проблемы и решения

### Проблема 1: "Found options: 0"
**Причина:** JavaScript не находит элементы `.option`
**Решение:** Проверьте, что CSS файлы загружены правильно

### Проблема 2: Нет сообщения "Option clicked"
**Причина:** Обработчики событий не добавляются
**Решение:** Проверьте, что JavaScript файл загружается без ошибок

### Проблема 3: "handleOptionSelection called" но опция не выделяется
**Причина:** CSS стили не применяются
**Решение:** Проверьте, что CSS переменные определены

### Проблема 4: Ошибки JavaScript в консоли
**Причина:** Синтаксические ошибки в коде
**Решение:** Проверьте консоль на наличие ошибок

---

## Проверка CSS

### 1. Проверьте, что CSS файлы загружены
В консоли выполните:
```javascript
document.querySelectorAll('link[rel="stylesheet"]').forEach(link => console.log(link.href));
```

### 2. Проверьте CSS переменные
В консоли выполните:
```javascript
const root = document.documentElement;
const styles = getComputedStyle(root);
console.log('--burgundy-accent:', styles.getPropertyValue('--burgundy-accent'));
console.log('--warm-grey-bg:', styles.getPropertyValue('--warm-grey-bg'));
```

### 3. Проверьте стили опции
В консоли выполните:
```javascript
const option = document.querySelector('.option');
const styles = getComputedStyle(option);
console.log('Option styles:', {
    cursor: styles.cursor,
    pointerEvents: styles.pointerEvents,
    display: styles.display
});
```

---

## Ожидаемый результат

После выполнения всех проверок:
1. ✅ Анкета должна инициализироваться
2. ✅ Должно найтись больше 0 опций
3. ✅ Клик по опции должен вызывать обработчик
4. ✅ Опция должна получить класс `selected`
5. ✅ Опция должна визуально выделиться

---

## Следующие шаги

1. **Выполните все проверки** по инструкции выше
2. **Скопируйте все сообщения** из консоли
3. **Сообщите результаты** - какие сообщения появились, а какие нет
4. **Укажите ошибки** если они есть в консоли

Это поможет точно определить, где именно происходит сбой.
