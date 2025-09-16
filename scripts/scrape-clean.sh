#!/bin/bash

# Improved scraping script that excludes embedded media

URL="$1"
OUTPUT="$2"

OUTPUT_DIR="$(dirname "$OUTPUT")"

if [ ! -d "$OUTPUT_DIR" ]; then
    echo "Creating output directory $OUTPUT_DIR"
    mkdir -p "$OUTPUT_DIR"
fi

if [ -z "$URL" ] || [ -z "$OUTPUT" ]; then
    echo "Usage: ./scrape-clean.sh <URL> <OUTPUT_FILE>"
    exit 1
fi

echo "Scraping $URL without embedded media..."

# Use monolith with flags to exclude images, videos, and fonts
monolith \
    --no-images \
    --no-video \
    --no-frames \
    --no-fonts \
    --no-js \
    --isolate \
    --output "$OUTPUT" \
    "$URL"

# If monolith succeeded, clean up any remaining base64 content
if [ $? -eq 0 ]; then
    echo "Cleaning up base64 encoded content..."

    # Remove any remaining data URIs (backup original first)
    cp "$OUTPUT" "${OUTPUT}.backup"

    # Extract embedded assets to separate files and update references
    if command -v node &> /dev/null; then
        node "$(dirname "$0")/extract-data-uris.js" "$OUTPUT" || echo "Warning: data URI extraction failed"
    else
        echo "Warning: node not found, skipping data URI extraction"
    fi
    
    # Remove base64 data URIs while preserving HTML structure
    sed -i 's/data:[^"'\'']*base64[^"'\'']*//g' "$OUTPUT"
    
    # Remove empty src/href attributes
    sed -i 's/src=""//g; s/href=""//g' "$OUTPUT"
    
    # Format the HTML for better readability (optional)
    if command -v prettier &> /dev/null; then
        echo "Formatting HTML with prettier..."
        prettier --write "$OUTPUT" --parser html 2>/dev/null || true
    fi
    
    echo "✓ Scraping complete: $OUTPUT"
    echo "  Original with base64: ${OUTPUT}.backup"
else
    echo "✗ Scraping failed"
    exit 1
fi
