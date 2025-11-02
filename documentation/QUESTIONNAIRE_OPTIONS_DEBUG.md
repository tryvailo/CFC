# Отладка выделения опций в анкете questionnaire.html

**Дата:** 16 октября 2025  
**Проблема:** Нельзя выделить опции на первом вопросе анкеты

---

## Выполненные исправления

### 1. Удалены конфликтующие CSS переменные
- **Проблема:** В `questionnaire.css` были определены переменные, которые конфликтовали с `main.css`
- **Решение:** Удален блок `:root` из `questionnaire.css`, теперь используются переменные из `main.css`

### 2. Добавлены отладочные сообщения
- Инициализация JavaScript
- Количество найденных опций
- Клики по опциям
- Обработка выбора опций

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

## Проверка CSS

### 1. Проверьте CSS переменные
В консоли выполните:
```javascript
const root = document.documentElement;
const styles = getComputedStyle(root);
console.log('--burgundy-accent:', styles.getPropertyValue('--burgundy-accent'));
console.log('--warm-grey-bg:', styles.getPropertyValue('--warm-grey-bg'));
console.log('--border-subtle:', styles.getPropertyValue('--border-subtle'));
```

### 2. Проверьте стили опции
В консоли выполните:
```javascript
const option = document.querySelector('.option');
const styles = getComputedStyle(option);
console.log('Option styles:', {
    cursor: styles.cursor,
    pointerEvents: styles.pointerEvents,
    display: styles.display,
    background: styles.background,
    border: styles.border
});
```

### 3. Проверьте стили выбранной опции
В консоли выполните:
```javascript
// Сначала кликните на опцию, затем выполните:
const selectedOption = document.querySelector('.option.selected');
if (selectedOption) {
    const styles = getComputedStyle(selectedOption);
    console.log('Selected option styles:', {
        borderColor: styles.borderColor,
        backgroundColor: styles.backgroundColor,
        boxShadow: styles.boxShadow
    });
} else {
    console.log('No selected option found');
}
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
**Решение:** Проверьте CSS переменные и стили

### Проблема 4: CSS переменные undefined
**Причина:** Конфликт между CSS файлами
**Решение:** Убедитесь, что `main.css` загружается перед `questionnaire.css`

---

## Ожидаемый результат

После выполнения всех проверок:
1. ✅ Анкета должна инициализироваться
2. ✅ Должно найтись больше 0 опций
3. ✅ Клик по опции должен вызывать обработчик
4. ✅ Опция должна получить класс `selected`
5. ✅ Опция должна визуально выделиться (изменить цвет границы и фона)

---

## Следующие шаги

1. **Выполните все проверки** по инструкции выше
2. **Скопируйте все сообщения** из консоли
3. **Сообщите результаты** - какие сообщения появились, а какие нет
4. **Укажите ошибки** если они есть в консоли
5. **Проверьте CSS переменные** и стили опций

Это поможет точно определить, где именно происходит сбой.
