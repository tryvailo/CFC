# Image Optimization Guide

## Current Image Requirements

### Logo Image
- **File**: `logo.png`
- **Usage**: Schema.org structured data
- **Recommended specs**:
  - Format: PNG with transparency
  - Size: 200x200px (square)
  - File size: < 50KB
  - Optimized for web

## Image Optimization Best Practices

### 1. Modern Image Formats
- **WebP**: 25-35% smaller than PNG/JPEG
- **AVIF**: 50% smaller than WebP (newer format)
- **SVG**: For logos and simple graphics

### 2. Responsive Images
```html
<picture>
  <source srcset="logo.avif" type="image/avif">
  <source srcset="logo.webp" type="image/webp">
  <img src="logo.png" alt="ClearFuneralCosts Logo" width="200" height="200">
</picture>
```

### 3. Lazy Loading
```html
<img src="image.jpg" alt="Description" loading="lazy" width="800" height="600">
```

### 4. Compression Tools
- **Online**: TinyPNG, Squoosh, ImageOptim
- **CLI**: imagemin, sharp, jpegoptim
- **Build tools**: Webpack, Vite, Parcel

### 5. File Size Targets
- **Hero images**: < 200KB
- **Thumbnails**: < 50KB
- **Icons**: < 10KB
- **Logos**: < 30KB

## Implementation Checklist

- [ ] Convert all images to WebP format
- [ ] Create AVIF versions for modern browsers
- [ ] Implement responsive images with `<picture>` element
- [ ] Add lazy loading to non-critical images
- [ ] Compress images to target file sizes
- [ ] Add proper alt attributes
- [ ] Include width/height attributes for layout stability

## Tools for Optimization

### Online Tools
- [Squoosh](https://squoosh.app/) - Google's image optimization tool
- [TinyPNG](https://tinypng.com/) - PNG/JPEG compression
- [ImageOptim](https://imageoptim.com/) - Mac image optimization

### Command Line Tools
```bash
# Install imagemin CLI
npm install -g imagemin-cli

# Optimize images
imagemin assets/images/*.{jpg,png} --out-dir=assets/images/optimized --plugin=webp
```

### Build Integration
```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true, quality: 80 },
              optipng: { enabled: false },
              pngquant: { quality: [0.65, 0.90], speed: 4 },
              gifsicle: { interlaced: false },
              webp: { quality: 80 }
            },
          },
        ],
      },
    ],
  },
};
```

## Performance Impact

### Before Optimization
- Large image files (500KB+)
- No responsive images
- No lazy loading
- Single format (PNG/JPEG)

### After Optimization
- 60-80% smaller file sizes
- Responsive images for different screen sizes
- Lazy loading for better initial page load
- Modern formats (WebP/AVIF) with fallbacks
- Proper alt attributes for accessibility

## Monitoring

### Tools
- **Lighthouse**: Image optimization audit
- **PageSpeed Insights**: Core Web Vitals
- **WebPageTest**: Detailed performance analysis

### Metrics to Track
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **Total page weight**: < 2MB
- **Image load time**: < 1s
