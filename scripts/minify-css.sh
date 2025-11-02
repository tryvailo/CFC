#!/bin/bash

# ============================================
# CSS MINIFICATION AUTOMATION SCRIPT
# ClearFuneralCosts Project
# ============================================

echo "🚀 Starting CSS minification process..."

# Check if clean-css-cli is installed
if ! command -v cleancss &> /dev/null; then
    echo "❌ clean-css-cli not found. Installing..."
    npm install -g clean-css-cli
fi

# Create minified versions of CSS files
echo "📦 Minifying CSS files..."

# Check if files exist before minifying
minify_file() {
    local source="$1"
    local target="$2"
    
    if [ -f "$source" ]; then
        echo "  📄 Minifying $source..."
        cleancss -o "$target" "$source"
    else
        echo "  ⚠️  File $source not found, skipping..."
    fi
}

# Main CSS files
minify_file "assets/css/main.css" "assets/css/main.min.css"
minify_file "assets/css/reports.css" "assets/css/reports.min.css"
minify_file "assets/css/utilities.css" "assets/css/utilities.min.css"
minify_file "assets/css/critical.css" "assets/css/critical.min.css"

# BEM Components
minify_file "assets/css/bem-components.css" "assets/css/bem-components.min.css"

# Other CSS files
minify_file "assets/css/checkout.css" "assets/css/checkout.min.css"
minify_file "assets/css/questionnaire.css" "assets/css/questionnaire.min.css"
minify_file "assets/css/email-templates.css" "assets/css/email-templates.min.css"

echo "✅ CSS minification completed!"
echo "📊 File sizes:"

# Show file sizes for existing files
if [ -f "assets/css/main.css" ] && [ -f "assets/css/main.min.css" ]; then
    echo "Main CSS:"
    ls -lh assets/css/main.css assets/css/main.min.css
fi

if [ -f "assets/css/reports.css" ] && [ -f "assets/css/reports.min.css" ]; then
    echo "Reports CSS:"
    ls -lh assets/css/reports.css assets/css/reports.min.css
fi

if [ -f "assets/css/bem-components.css" ] && [ -f "assets/css/bem-components.min.css" ]; then
    echo "BEM Components CSS:"
    ls -lh assets/css/bem-components.css assets/css/bem-components.min.css
fi

echo "🎉 All CSS files have been minified successfully!"
