# Отладка навигации анкеты - кнопка "Далее" не работает

**Дата:** 16 октября 2025  
**Проблема:** Кнопка "Далее" не переводит на новую секцию анкеты

---

## Найденная проблема

### Данные теперь корректные
```javascript
Form data: {
    service_type: 'traditional_burial', 
    budget_range: '4000_6000', 
    timeline: 'short_term'
}
```

### Проблема с навигацией
- Кнопка "Далее" нажимается
- Данные сохраняются правильно
- Но переход на следующую секцию не происходит

---

## Добавленные отладочные сообщения

### 1. В методе goToNextStep()
```javascript
goToNextStep() {
    console.log('goToNextStep called');
    
    // Find current visible question - try multiple approaches
    let currentQuestion = document.querySelector('.question-card:not(.hidden)');
    if (!currentQuestion) {
        currentQuestion = document.querySelector('.question-card[style*="block"]');
    }
    if (!currentQuestion) {
        currentQuestion = document.querySelector('.question-card:not([style*="none"])');
    }
    
    console.log('Current question:', currentQuestion);
    console.log('Moving to next question with ID:', currentQuestion.id);
    // ...
}
```

### 2. В методе showNextQuestion()
```javascript
showNextQuestion(currentQuestionId) {
    console.log('showNextQuestion called with ID:', currentQuestionId);
    const currentQuestion = document.getElementById(currentQuestionId);
    console.log('Current question element:', currentQuestion);
    
    const nextQuestion = currentQuestion.nextElementSibling;
    console.log('Next question element:', nextQuestion);
    
    if (nextQuestion && nextQuestion.classList.contains('question-card')) {
        console.log('Moving to next question');
        // ... переход
    } else {
        console.log('No more questions, showing summary');
        // ... показать summary
    }
}
```

---

## Структура HTML анкеты

### Секции анкеты:
```html
<section class="question-card" id="question-1">...</section>
<section class="question-card hidden" id="question-2">...</section>
<section class="question-card hidden" id="question-3">...</section>
<!-- ... и так далее -->
```

### Логика поиска текущего вопроса:
1. **Первый подход:** `.question-card:not(.hidden)` - ищет секцию без класса hidden
2. **Второй подход:** `.question-card[style*="block"]` - ищет секцию с display: block
3. **Третий подход:** `.question-card:not([style*="none"])` - ищет секцию без display: none

---

## Ожидаемые отладочные сообщения

### При нажатии кнопки "Далее":
```
goToNextStep called
Current question: <section class="question-card" id="question-1">
Has selection: <div class="option selected">
Moving to next question with ID: question-1
showNextQuestion called with ID: question-1
Current question element: <section class="question-card" id="question-1">
Next question element: <section class="question-card hidden" id="question-2">
Moving to next question
```

### Если что-то не работает:
- `No current question found` - проблема с поиском текущей секции
- `No selection found` - не выбрана опция
- `Current question not found by ID` - проблема с ID
- `No more questions, showing summary` - достигнут конец анкеты

---

## Следующие шаги

### Проверить в консоли браузера:
1. **Какие сообщения появляются** при нажатии "Далее"
2. **Находится ли текущая секция** правильно
3. **Есть ли выбранная опция** в текущей секции
4. **Находится ли следующая секция** правильно

### Возможные проблемы:
- Неправильный селектор для поиска текущей секции
- Проблема с ID секций
- Проблема с nextElementSibling
- Проблема с классами CSS

---

## Заключение

Добавлены подробные отладочные сообщения для диагностики проблемы с навигацией анкеты. Теперь можно точно определить, на каком этапе происходит сбой.

**Следующий шаг:** Проверить консоль браузера и сообщить, какие отладочные сообщения появляются при нажатии кнопки "Далее".
