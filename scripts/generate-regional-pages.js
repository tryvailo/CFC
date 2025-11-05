#!/usr/bin/env node

/**
 * Regional Page Generator
 * 
 * Generates regional pages from templates and JSON data files
 * Usage: node scripts/generate-regional-pages.js [region-slug]
 * 
 * If no region slug is provided, generates all regions in data/regions/
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BASE_DIR = path.resolve(__dirname, '..');
const TEMPLATE_DIR = path.join(BASE_DIR, 'templates');
const DATA_DIR = path.join(BASE_DIR, 'data', 'regions');
const OUTPUT_DIR = path.join(BASE_DIR, 'regions');

// Helper function to replace variables in text (with recursive replacement)
function replaceVariables(text, data) {
    let result = text;
    
    // Build replacement map from nested data structure
    const replacements = buildReplacementMap(data);
    
    // Replace all variables (multiple passes for nested variables)
    let changed = true;
    let passes = 0;
    while (changed && passes < 10) {
        changed = false;
        passes++;
        for (const [key, value] of Object.entries(replacements)) {
            const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
            const newResult = result.replace(regex, value);
            if (newResult !== result) {
                changed = true;
                result = newResult;
            }
        }
    }
    
    return result;
}

// Helper function to convert camelCase to UPPER_SNAKE_CASE
function camelToSnake(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}

// Build a flat map of all variables from nested data structure
function buildReplacementMap(data, prefix = '') {
    const map = {};
    
    for (const [key, value] of Object.entries(data)) {
        // Convert camelCase to snake_case for the key
        const snakeKey = camelToSnake(key);
        const fullKey = prefix ? `${prefix}_${snakeKey}` : snakeKey;
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Recursively process nested objects
            Object.assign(map, buildReplacementMap(value, fullKey));
        } else if (Array.isArray(value)) {
            // Handle arrays specially (for benefits, testimonials, etc.)
            if (key === 'benefits') {
                value.forEach((item, index) => {
                    map[`BENEFIT_${index + 1}`] = typeof item === 'string' ? item : item.text || item;
                });
            } else if (key === 'testimonials') {
                value.forEach((testimonial, index) => {
                    const idx = index + 1;
                    map[`TESTIMONIAL_${idx}_QUOTE`] = testimonial.quote || '';
                    map[`TESTIMONIAL_${idx}_AUTHOR`] = testimonial.author || '';
                    map[`TESTIMONIAL_${idx}_LOCATION`] = testimonial.location || '';
                    map[`TESTIMONIAL_${idx}_STRATEGIES`] = testimonial.strategies || '';
                    map[`TESTIMONIAL_${idx}_SAVED`] = testimonial.saved || '';
                });
            } else if (key === 'questions') {
                value.forEach((item, index) => {
                    const idx = index + 1;
                    map[`FAQ_${idx}_QUESTION`] = item.question || '';
                    map[`FAQ_${idx}_ANSWER`] = item.answer || '';
                });
            } else if (key === 'scenarios') {
                value.forEach((scenario, index) => {
                    const idx = index + 1;
                    map[`SCENARIO_${idx}_NAME`] = scenario.name || '';
                    map[`SCENARIO_${idx}_ORIGINAL`] = scenario.original || '';
                    map[`SCENARIO_${idx}_OPTIMISED`] = scenario.optimised || '';
                    map[`SCENARIO_${idx}_SAVINGS`] = scenario.savings || '';
                    map[`SCENARIO_${idx}_PERCENTAGE`] = scenario.percentage || '';
                });
            } else if (key === 'examples') {
                value.forEach((example, index) => {
                    const idx = index + 1;
                    map[`CITY_${idx}_NAME`] = example.name || '';
                    map[`CITY_${idx}_COST_RANGE`] = example.costRange || '';
                    map[`CITY_${idx}_VARIATION`] = example.variation || '';
                    map[`CITY_${idx}_COMPARISON`] = example.comparison || '';
                    map[`CITY_${idx}_DESCRIPTION`] = example.description || '';
                    map[`CITY_${idx}_CREATION_STANDARD`] = example.cremationStandard || '';
                    map[`CITY_${idx}_CREATION_OFF_PEAK`] = example.cremationOffPeak || '';
                });
            } else if (key === 'faq') {
                value.forEach((item, index) => {
                    const idx = index + 1;
                    map[`SCHEMA_FAQ_${idx}_QUESTION`] = item.question || '';
                    map[`SCHEMA_FAQ_${idx}_ANSWER`] = item.answer || '';
                });
            }
        } else {
            map[fullKey] = String(value);
        }
    }
    
    // Add special case study city variable
    if (data.caseStudy && data.caseStudy.city) {
        map['CASE_STUDY_CITY'] = data.caseStudy.city;
    }
    
    return map;
}

// Process template and generate HTML
function generatePage(regionSlug) {
    const dataPath = path.join(DATA_DIR, `${regionSlug}.json`);
    const templatePath = path.join(TEMPLATE_DIR, 'regional-template.html');
    const outputPath = path.join(OUTPUT_DIR, regionSlug, 'index.html');
    
    // Check if data file exists
    if (!fs.existsSync(dataPath)) {
        console.error(`❌ Data file not found: ${dataPath}`);
        return false;
    }
    
    // Check if template exists
    if (!fs.existsSync(templatePath)) {
        console.error(`❌ Template not found: ${templatePath}`);
        console.log(`💡 Creating template from existing regional page...`);
        createTemplateFromExisting(regionSlug);
        return false;
    }
    
    // Load data
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // Load template
    let template = fs.readFileSync(templatePath, 'utf8');
    
    // Replace variables
    template = replaceVariables(template, data);
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write output
    fs.writeFileSync(outputPath, template, 'utf8');
    
    console.log(`✅ Generated: ${outputPath}`);
    return true;
}

// Create template from existing regional page (one-time setup)
function createTemplateFromExisting(regionSlug) {
    const existingPath = path.join(OUTPUT_DIR, regionSlug, 'index.html');
    
    if (!fs.existsSync(existingPath)) {
        console.error(`❌ Existing page not found: ${existingPath}`);
        return;
    }
    
    console.log(`📝 Creating template from: ${existingPath}`);
    console.log(`⚠️  Please manually replace regional data with variables like {{REGION_NAME}}, {{SAVINGS_RANGE}}, etc.`);
    
    // Create templates directory if it doesn't exist
    if (!fs.existsSync(TEMPLATE_DIR)) {
        fs.mkdirSync(TEMPLATE_DIR, { recursive: true });
    }
    
    // Copy existing file as starting point
    const template = fs.readFileSync(existingPath, 'utf8');
    fs.writeFileSync(
        path.join(TEMPLATE_DIR, 'regional-template.html'),
        template,
        'utf8'
    );
    
    console.log(`✅ Template created at: ${path.join(TEMPLATE_DIR, 'regional-template.html')}`);
}

// Main function
function main() {
    const regionSlug = process.argv[2];
    
    if (regionSlug) {
        // Generate single region
        console.log(`\n🔨 Generating page for region: ${regionSlug}`);
        generatePage(regionSlug);
    } else {
        // Generate all regions
        console.log(`\n🔨 Generating pages for all regions...`);
        
        if (!fs.existsSync(DATA_DIR)) {
            console.error(`❌ Data directory not found: ${DATA_DIR}`);
            process.exit(1);
        }
        
        const dataFiles = fs.readdirSync(DATA_DIR)
            .filter(file => file.endsWith('.json'))
            .map(file => file.replace('.json', ''));
        
        if (dataFiles.length === 0) {
            console.log(`⚠️  No JSON data files found in ${DATA_DIR}`);
            console.log(`💡 Create data files like: ${DATA_DIR}/south-east.json`);
            process.exit(1);
        }
        
        console.log(`📋 Found ${dataFiles.length} region(s): ${dataFiles.join(', ')}\n`);
        
        let successCount = 0;
        dataFiles.forEach(slug => {
            if (generatePage(slug)) {
                successCount++;
            }
        });
        
        console.log(`\n✨ Generated ${successCount}/${dataFiles.length} pages successfully`);
    }
}

// Run
main();

