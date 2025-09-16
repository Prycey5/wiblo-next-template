#!/bin/bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: ./scripts/full-scrape.sh <URL> [monolith_output_dir] [firecrawl_output_dir]" >&2
  exit 1
fi

URL="$1"
MONOLITH_DIR="${2:-docs/template_to_clone}"
FIRECRAWL_DIR="${3:-docs/template_firecrawl}"
MONOLITH_FILE="${MONOLITH_DIR%/}/content.html"
FIRECRAWL_FILE="${FIRECRAWL_DIR%/}/content.md"

mkdir -p "$MONOLITH_DIR"
mkdir -p "$FIRECRAWL_DIR"

./scripts/scrape-clean.sh "$URL" "$MONOLITH_FILE"

node scrape.js "$URL" -o "$FIRECRAWL_DIR" --direct

if [ ! -f "$FIRECRAWL_FILE" ]; then
  echo "Expected Firecrawl markdown at $FIRECRAWL_FILE but it was not created." >&2
  exit 1
fi

node scripts/merge-firecrawl-images.js "$MONOLITH_FILE" "$FIRECRAWL_FILE"

node scripts/chunk-file.js "$MONOLITH_FILE"

if [ -d "${MONOLITH_DIR%/}/assets" ]; then
  for css in "${MONOLITH_DIR%/}/assets"/*.css; do
    [ -f "$css" ] || continue
    node scripts/chunk-file.js "$css"
  done
fi

echo "Full scrape pipeline completed for $URL"
