# 🏗️ Система генерации региональных страниц

## Быстрый старт

### 1. Создание нового региона

Создайте файл `data/regions/[region-slug].json` по примеру:

```json
{
  "id": "london",
  "slug": "london",
  "regionName": "London",
  "regionNameShort": "London",
  "regionNameAdjective": "London",
  
  "meta": {
    "title": "London Funeral Guidance: Honouring Your Loved One Within Your Means | ClearFuneralCosts",
    "description": "London funeral guidance helping families..."
  },
  
  "hero": {
    "subheadline": "We're here to help London families...",
    "trustBadge": "4.8/5 satisfaction – 2,100 London families helped",
    "benefits": [
      "<strong>Typically save £1,500–£2,200</strong> in your region",
      "450 London funeral directors analysed",
      "Westminster, Kensington & Camden crematorium costs compared"
    ]
  },
  
  "statistics": {
    "funeralDirectorsCount": 450,
    "averageSavings": "£1,500",
    "familiesHelped": 2100,
    "familiesHelpedFormatted": "2,100",
    "savingsRange": "£1,500–£2,200"
  }
}
```

### 2. Генерация страницы

```bash
# Один регион
npm run generate:region south-east

# Все регионы
npm run generate:all
```

## Структура данных

### Обязательные поля

- `id`, `slug` - идентификатор региона
- `regionName` - полное название
- `regionNameShort` - короткое название  
- `regionNameAdjective` - название в прилагательном
- `meta.title`, `meta.description` - SEO метаданные
- `hero.subheadline`, `hero.trustBadge`, `hero.benefits` - Hero секция
- `statistics` - статистика региона

### Опциональные поля

- `cities` - города региона
- `testimonials` - отзывы
- `faq.questions` - вопросы FAQ
- `caseStudy.scenarios` - кейс-стади
- `schema.faq` - FAQ для Schema.org

## Переменные в шаблоне

Все переменные доступны как `{{SECTION_FIELD_NAME}}`:

- `{{REGION_NAME}}` → `regionName`
- `{{STATISTICS_FUNERAL_DIRECTORS_COUNT}}` → `statistics.funeralDirectorsCount`
- `{{HERO_SUBHEADLINE}}` → `hero.subheadline`
- `{{BENEFIT_1}}`, `{{BENEFIT_2}}` → массив `hero.benefits`
- `{{TESTIMONIAL_1_QUOTE}}` → `testimonials[0].quote`

## Примеры использования

### Создание региона "London"

1. Скопируйте `data/regions/south-east.json` → `data/regions/london.json`
2. Замените все данные на London-специфичные
3. Запустите `npm run generate:region london`
4. Проверьте `regions/london/index.html`

### Обновление шаблона

1. Отредактируйте `templates/regional-template.html`
2. Запустите `npm run generate:all`
3. Все регионы будут обновлены

## Преимущества

✅ **DRY** - один шаблон для всех регионов  
✅ **Быстро** - новый регион = новый JSON файл  
✅ **Безопасно** - шаблоны и данные в Git  
✅ **Масштабируемо** - легко добавить 10+ регионов  

