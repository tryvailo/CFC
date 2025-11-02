#!/bin/bash

# ============================================
# BEM CLASS MIGRATION SCRIPT
# ClearFuneralCosts Project
# ============================================

echo "🔄 Starting BEM class migration..."

# Create backup directory
mkdir -p backups/$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"

# Function to check if file exists
check_file() {
    local file="$1"
    if [ ! -f "$file" ]; then
        echo "⚠️  File $file not found, skipping..."
        return 1
    fi
    return 0
}

# Backup original files
echo "📦 Creating backups..."
if check_file "index.html"; then
    cp index.html "$BACKUP_DIR/"
fi
if check_file "reports/free_report.html"; then
    cp reports/free_report.html "$BACKUP_DIR/"
fi
if check_file "reports/premium_report.html"; then
    cp reports/premium_report.html "$BACKUP_DIR/"
fi
if check_file "regions/south-east/index.html"; then
    cp regions/south-east/index.html "$BACKUP_DIR/"
fi

echo "✅ Backups created in $BACKUP_DIR"

# Function to replace classes in a file
replace_classes() {
    local file="$1"
    
    if [ ! -f "$file" ]; then
        echo "⚠️  File $file not found, skipping..."
        return
    fi
    
    echo "🔄 Processing $file..."
    
    # Create a temporary file for safer editing
    local temp_file="${file}.tmp"
    cp "$file" "$temp_file"
    
    # Hero section classes
    sed -i '' 's/class="hero-container"/class="hero__container"/g' "$temp_file"
    sed -i '' 's/class="hero-content"/class="hero__content"/g' "$temp_file"
    sed -i '' 's/class="hero-headline"/class="hero__title"/g' "$temp_file"
    sed -i '' 's/class="hero-subheadline"/class="hero__subtitle"/g' "$temp_file"
    sed -i '' 's/class="hero-proof"/class="hero__proof"/g' "$temp_file"
    
    # Information service classes
    sed -i '' 's/class="information-headline"/class="information-service__title"/g' "$temp_file"
    sed -i '' 's/class="information-subheadline"/class="information-service__subtitle"/g' "$temp_file"
    sed -i '' 's/class="information-form"/class="information-service__form"/g' "$temp_file"
    sed -i '' 's/class="form-group"/class="information-service__form-group"/g' "$temp_file"
    sed -i '' 's/class="form-label"/class="information-service__label"/g' "$temp_file"
    sed -i '' 's/class="form-input"/class="information-service__input"/g' "$temp_file"
    sed -i '' 's/class="form-select"/class="information-service__select"/g' "$temp_file"
    
    # Button classes
    sed -i '' 's/class="cta-primary"/class="btn btn--primary"/g' "$temp_file"
    sed -i '' 's/class="cta-secondary"/class="btn btn--secondary"/g' "$temp_file"
    sed -i '' 's/class="cta-button"/class="btn btn--primary"/g' "$temp_file"
    sed -i '' 's/class="plan-button"/class="btn btn--primary"/g' "$temp_file"
    
    # Card classes
    sed -i '' 's/class="plan-card"/class="card"/g' "$temp_file"
    sed -i '' 's/class="stat-card"/class="card"/g' "$temp_file"
    
    # Section classes
    sed -i '' 's/class="section-standard"/class="section"/g' "$temp_file"
    sed -i '' 's/class="section-large"/class="section section--large"/g' "$temp_file"
    sed -i '' 's/class="section-medium"/class="section section--small"/g' "$temp_file"
    
    # Navigation classes
    sed -i '' 's/class="site-header"/class="nav"/g' "$temp_file"
    sed -i '' 's/class="header-container"/class="nav__container"/g' "$temp_file"
    sed -i '' 's/class="logo"/class="nav__logo"/g' "$temp_file"
    sed -i '' 's/class="nav-list"/class="nav__list"/g' "$temp_file"
    sed -i '' 's/class="nav-item"/class="nav__item"/g' "$temp_file"
    sed -i '' 's/class="nav-link"/class="nav__link"/g' "$temp_file"
    
    # FAQ classes
    sed -i '' 's/class="faq-section"/class="faq"/g' "$temp_file"
    sed -i '' 's/class="faq-item"/class="faq__item"/g' "$temp_file"
    sed -i '' 's/class="faq-question"/class="faq__question"/g' "$temp_file"
    sed -i '' 's/class="faq-answer"/class="faq__answer"/g' "$temp_file"
    
    # Stats grid classes
    sed -i '' 's/class="stats-grid"/class="stats-grid"/g' "$temp_file"
    sed -i '' 's/class="stat-item"/class="stats-grid__item"/g' "$temp_file"
    sed -i '' 's/class="stat-number"/class="stats-grid__number"/g' "$temp_file"
    sed -i '' 's/class="stat-label"/class="stats-grid__label"/g' "$temp_file"
    
    # Replace original file with modified version
    mv "$temp_file" "$file"
    
    echo "✅ Processed $file"
}

# Process HTML files
replace_classes "index.html"
replace_classes "reports/free_report.html"
replace_classes "reports/premium_report.html"
replace_classes "regions/south-east/index.html"

echo "🎉 BEM class migration completed!"
echo "📝 Updated files:"
echo "  - index.html"
echo "  - reports/free_report.html"
echo "  - reports/premium_report.html"
echo "  - regions/south-east/index.html"
echo ""
echo "💡 Next steps:"
echo "  1. Test the updated pages"
echo "  2. Update CSS to use BEM classes"
echo "  3. Run CSS minification"
echo ""
echo "🔙 To restore original files:"
echo "  cp $BACKUP_DIR/* ."
