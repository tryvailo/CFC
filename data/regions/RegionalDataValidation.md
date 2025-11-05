# Regional Data Generation Prompt for AI Assistant

## Задача

Создай JSON файл для региональной страницы ClearFuneralCosts на основе предоставленной информации о регионе.

## Контекст

Это файл данных для системы генерации региональных страниц. JSON будет использоваться для автоматической генерации HTML страницы с регионально-специфичным контентом.

## Структура JSON файла

Создай файл `data/regions/[region-slug].json` со следующей структурой:

### 1. Базовая информация (обязательно)

```json
{
  "id": "region-slug",
  "slug": "region-slug",
  "regionName": "Full Region Name",
  "regionNameShort": "Short Name",
  "regionNameAdjective": "Region Name Adjective",
  "regionNameGenitive": "Region Name Genitive",
  "regionNameAdjectiveShort": "Short Adjective"
}
```

**Правила:**
- `id` и `slug` должны быть одинаковыми (lowercase, с дефисами)
- Примеры: `north-west`, `london`, `east-midlands`
- `regionName` - полное официальное название региона
- `regionNameShort` - короткая версия (без "England")
- `regionNameAdjective` - обычно совпадает с `regionName`
- `regionNameGenitive` - обычно совпадает с `regionName`
- `regionNameAdjectiveShort` - обычно совпадает с `regionNameShort`

### 2. Meta информация (SEO)

```json
"meta": {
  "title": "Full SEO Title with Region Name",
  "description": "SEO description 150-160 chars with region and savings range",
  "canonical": "https://clearfuneralcosts.co.uk/regions/[slug]/"
}
```

**Правила:**
- Title должен включать название региона и ключевые слова
- Description должен упоминать регион и потенциальные сбережения
- Canonical URL должен использовать правильный slug

### 3. Hero секция

```json
"hero": {
  "headline": "Losing someone you love is incredibly difficult—especially when choosing funeral services locally",
  "subheadline": "We're here to help [REGION] families understand funeral costs and explore your options—including how to <strong>typically save [SAVINGS_RANGE] without compromising on dignity</strong>.",
  "trustBadge": "4.8/5 satisfaction – [FAMILIES_HELPED] [REGION_SHORT] families helped with confidence and dignity",
  "benefits": [
    "<strong>Typically save [SAVINGS_RANGE]</strong> in your region",
    "[COUNT] [REGION_SHORT] funeral directors analysed (CMA data)",
    "[CITY1], [CITY2] & [CITY3] crematorium costs compared",
    "100% independent—no commissions from local providers"
  ]
}
```

**Правила:**
- Headline одинаковый для всех регионов (не меняй)
- Subheadline: замени `[REGION]` на `regionNameAdjective`, `[SAVINGS_RANGE]` на диапазон сбережений
- TrustBadge: используй `familiesHelpedFormatted` и `regionNameShort`
- Benefits: используй реальные данные региона

### 4. Статистика

```json
"statistics": {
  "funeralDirectorsCount": 298,
  "averageSavings": "£1,134",
  "familiesHelped": 1156,
  "familiesHelpedFormatted": "1,156",
  "totalFamiliesHelped": 2847,
  "totalFamiliesHelpedFormatted": "2,847",
  "satisfactionRating": "4.8/5",
  "savingsRange": "£1,100–£1,700",
  "costRange": "£3,300-£5,800+",
  "potentialSavingsRange": "£900-£2,200"
}
```

**Правила:**
- `funeralDirectorsCount` - реальное количество funeral directors в регионе (проверь данные CMA)
- `averageSavings` - средние сбережения (формат: `"£X,XXX"` с запятыми)
- `familiesHelped` - количество семей в регионе (число)
- `familiesHelpedFormatted` - то же с форматированием: `"1,156"`
- `totalFamiliesHelped` - общее количество по всем регионам (обычно 2847)
- `totalFamiliesHelpedFormatted` - `"2,847"`
- `satisfactionRating` - `"4.8/5"` (одинаково для всех)
- `savingsRange` - используй en-dash `–` (не дефис!)
- `costRange` - диапазон цен в регионе
- `potentialSavingsRange` - потенциальный диапазон для SEO

### 5. Города

```json
"cities": {
  "main": ["City1", "City2", "City3"],
  "mainFormatted": "City1, City2 & City3",
  "examples": [
    {
      "name": "City1",
      "costRange": "£3,300-£4,900",
      "variation": "£1,600 variation"
    },
    {
      "name": "City2",
      "cremationStandard": "£995",
      "cremationOffPeak": "£725",
      "comparison": "standard vs off-peak exploration"
    },
    {
      "name": "City3",
      "variation": "41%",
      "description": "Area name funeral directors price variation within 10 miles"
    }
  ]
}
```

**Правила:**
- Выбери 3 основных города региона
- `mainFormatted` - формат: "City1, City2 & City3" (запятая и & перед последним)
- City 1: нужны `costRange` и `variation`
- City 2: нужны `cremationStandard`, `cremationOffPeak`, `comparison`
- City 3: нужны `variation` (процент) и `description`

### 6. Отзывы

```json
"testimonials": [
  {
    "quote": "Реалистичный отзыв с конкретными деталями",
    "author": "First Name L.",
    "location": "City from cities.main",
    "strategies": "Strategy1 + Strategy2",
    "saved": "£X,XXX"
  }
]
```

**Правила:**
- Создай 3 реалистичных отзыва
- Используй разные города из `cities.main`
- Суммы сбережений должны быть в рамках `savingsRange`
- Формат author: `"First Name L."` или `"First & Second Name K."`
- Strategies: комбинации типа "Timing + Provider Selection"

### 7. FAQ

```json
"faq": {
  "title": "Common questions about our [REGION_ADJECTIVE] service",
  "questions": [
    {
      "question": "Is this a fully licensed service?",
      "answer": "Стандартный ответ (одинаковый для всех регионов)"
    },
    {
      "question": "Do you receive commissions from funeral directors?",
      "answer": "Стандартный ответ (одинаковый для всех регионов)"
    },
    {
      "question": "How accurate is your data?",
      "answer": "Very accurate. We analyse [COUNT] [REGION_ADJECTIVE] providers..."
    }
  ]
}
```

**Правила:**
- Первые 2 вопроса одинаковые для всех регионов
- Третий вопрос должен содержать `funeralDirectorsCount` и `regionNameAdjective`

### 8. Case Study

```json
"caseStudy": {
  "city": "First city from cities.main",
  "scenarios": [
    {
      "name": "Better Provider",
      "original": "£4,200",
      "optimised": "£3,600",
      "savings": "£600",
      "percentage": "14%"
    },
    {
      "name": "Direct Cremation",
      "original": "£4,200",
      "optimised": "£1,750",
      "savings": "£2,450",
      "percentage": "58%"
    },
    {
      "name": "Hybrid",
      "original": "£4,200",
      "optimised": "£3,200",
      "savings": "£1,000",
      "percentage": "24%"
    }
  ]
}
```

**Правила:**
- `city` - первый город из `cities.main`
- `original` - должна быть одинаковой для всех 3 сценариев
- Цены должны отражать типичную стоимость в регионе
- Проценты должны быть рассчитаны правильно

### 9. Schema FAQ

```json
"schema": {
  "faq": [
    {
      "question": "How much does a funeral cost in [REGION_ADJECTIVE]?",
      "answer": "Funeral costs in [REGION_ADJECTIVE] typically range from [COST_RANGE]..."
    },
    {
      "question": "What factors affect funeral costs in [REGION_ADJECTIVE]?",
      "answer": "... [CITIES_FORMATTED] crematoriums..."
    },
    {
      "question": "How can I reduce funeral costs in [REGION_ADJECTIVE]?",
      "answer": "... Savings of [SAVINGS_RANGE] are possible..."
    }
  ]
}
```

**Правила:**
- Замени все плейсхолдеры реальными данными из других секций
- Используй `costRange`, `potentialSavingsRange`, `savingsRange`, `cities.mainFormatted`

---

## Источники данных

Для получения актуальных данных используй:

1. **CMA (Competition and Markets Authority) данные:**
   - Количество funeral directors по регионам
   - Официальные Standardised Price Lists

2. **Правительственные источники:**
   - Данные о funeral costs по регионам UK
   - Regional pricing variations

3. **Реалистичные расчеты:**
   - Средние сбережения на основе типичных цен
   - Проценты сбережений должны быть реалистичными (10-65%)

---

## Примеры для справки

### Существующие регионы:

**South East England:**
- Провайдеры: 342
- Сбережения: £1,200–£1,800
- Города: Brighton, Reading, Guildford

**South West England:**
- Провайдеры: 287
- Сбережения: £1,000–£1,600
- Города: Bristol, Plymouth, Exeter

---

## Формат вывода

Верни только валидный JSON файл, готовый к использованию. Не добавляй комментарии или пояснения внутри JSON.

**Важно:**
- Используй en-dash `–` (не дефис `-`) для `savingsRange`
- Форматируй числа с запятыми для тысяч: `"1,156"` вместо `"1156"`
- Все суммы должны быть в формате `"£X,XXX"`
- Убедись, что JSON валидный (проверь скобки, запятые, кавычки)

---

## Задача

Создай JSON файл для региона: **[УКАЖИ РЕГИОН]**

Используй актуальные данные из официальных источников и следуй всем правилам выше.

