# Regional Pages Generator

## Архитектура решения

Для создания десятков региональных страниц без дублирования кода используется система шаблонов с переменными.

### Структура проекта

```
├── templates/
│   └── regional-template.html    # Базовый шаблон с переменными типа {{REGION_NAME}}
├── data/
│   └── regions/
│       ├── south-east.json        # Данные для South East
│       ├── london.json            # Данные для London
│       └── ...                    # Данные для других регионов
├── regions/
│   ├── south-east/
│   │   └── index.html            # Сгенерированная страница
│   └── ...
└── scripts/
    └── generate-regional-pages.js # Скрипт генерации
```

## Использование

### 1. Создание данных для региона

Создайте файл `data/regions/[region-slug].json` по примеру `data/regions/south-east.json`:

```json
{
  "id": "london",
  "slug": "london",
  "regionName": "London",
  "regionNameAdjective": "London",
  "statistics": {
    "funeralDirectorsCount": 450,
    "averageSavings": "£1,500",
    "familiesHelped": 2100,
    "savingsRange": "£1,500–£2,200"
  },
  "cities": {
    "main": ["Westminster", "Kensington", "Camden"],
    "mainFormatted": "Westminster, Kensington & Camden"
  }
}
```

### 2. Генерация страниц

**Генерация одной страницы:**
```bash
npm run generate:region south-east
```

**Генерация всех страниц:**
```bash
npm run generate:all
```

## Переменные в шаблоне

Все переменные оборачиваются в двойные фигурные скобки: `{{VARIABLE_NAME}}`

### Основные переменные

- `{{REGION_NAME}}` - Полное название региона
- `{{REGION_NAME_SHORT}}` - Короткое название
- `{{REGION_NAME_ADJECTIVE}}` - Название в прилагательном
- `{{SLUG}}` - URL slug региона

### Статистика

- `{{STATISTICS_FUNERAL_DIRECTORS_COUNT}}` - Количество funeral directors
- `{{STATISTICS_AVERAGE_SAVINGS}}` - Средние сбережения
- `{{STATISTICS_FAMILIES_HELPED}}` - Количество семей
- `{{STATISTICS_SAVINGS_RANGE}}` - Диапазон сбережений

### Города

- `{{CITIES_MAIN_FORMATTED}}` - Отформатированный список городов
- `{{CITIES_MAIN}}` - Массив городов (для циклов)

### Преимущества (Benefits)

- `{{BENEFIT_1}}`, `{{BENEFIT_2}}`, etc. - Каждый пункт из списка benefits

### Отзывы (Testimonials)

- `{{TESTIMONIAL_1_QUOTE}}` - Текст отзыва
- `{{TESTIMONIAL_1_AUTHOR}}` - Автор
- `{{TESTIMONIAL_1_LOCATION}}` - Локация
- `{{TESTIMONIAL_1_STRATEGIES}}` - Использованные стратегии
- `{{TESTIMONIAL_1_SAVED}}` - Сэкономленная сумма

### FAQ

- `{{FAQ_1_QUESTION}}` - Вопрос
- `{{FAQ_1_ANSWER}}` - Ответ

### Кейс-стади (Case Study)

- `{{SCENARIO_1_NAME}}` - Название сценария
- `{{SCENARIO_1_ORIGINAL}}` - Исходная цена
- `{{SCENARIO_1_OPTIMISED}}` - Оптимизированная цена
- `{{SCENARIO_1_SAVINGS}}` - Сбережения
- `{{SCENARIO_1_PERCENTAGE}}` - Процент сбережений

## Пример использования переменных в HTML

```html
<h1>{{REGION_NAME}} Funeral Guidance</h1>
<p>We help {{REGION_NAME_ADJECTIVE}} families save {{STATISTICS_SAVINGS_RANGE}}.</p>

<ul>
  <li>{{BENEFIT_1}}</li>
  <li>{{BENEFIT_2}}</li>
</ul>

<div class="testimonial">
  <p>"{{TESTIMONIAL_1_QUOTE}}"</p>
  <strong>{{TESTIMONIAL_1_AUTHOR}}</strong>
  <span>{{TESTIMONIAL_1_LOCATION}}</span>
</div>
```

## Рабочий процесс

1. **Создайте JSON файл** с данными региона в `data/regions/`
2. **Обновите шаблон** `templates/regional-template.html` если нужно изменить структуру
3. **Запустите генерацию**: `npm run generate:region [slug]`
4. **Проверьте результат** в `regions/[slug]/index.html`
5. **Закоммитьте** сгенерированные файлы в Git

## Преимущества архитектуры

✅ **DRY принцип** - нет дублирования кода  
✅ **Быстрое создание** - новый регион = новый JSON файл  
✅ **Легкое обновление** - измените шаблон или JSON  
✅ **Типобезопасность** - можно добавить JSON Schema для валидации  
✅ **Версионирование** - шаблоны и данные в Git  
✅ **Масштабируемость** - легко добавить новые регионы  

## Расширение функционала

### Добавление новых переменных

1. Добавьте поле в JSON файл региона
2. Переменная автоматически станет доступна как `{{SECTION_FIELD_NAME}}`
3. Используйте в шаблоне

### Валидация данных

Можно добавить JSON Schema для проверки структуры данных перед генерацией.

### Автоматизация

Добавьте в CI/CD pipeline автоматическую генерацию при изменении данных или шаблона.

