#!/usr/bin/env node

import { scrapeWebsite, saveScrapedContent, scrapeWithDirectAPI } from './lib/scraper.js';
import { Command } from 'commander';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const program = new Command();

program
  .name('scrape')
  .description('Scrape a website using Firecrawl and save content to docs/template')
  .version('1.0.0');

program
  .argument('<url>', 'URL of the website to scrape')
  .option('-o, --output <dir>', 'Output directory (default: docs/template)')
  .option('-d, --direct', 'Use direct API call with caching (faster)')
  .option('--full-content', 'Include full page content (not just main content)')
  .option('--wait <ms>', 'Wait time in milliseconds', parseInt)
  .option('--timeout <ms>', 'Timeout in milliseconds', parseInt)
  .action(async (url, options) => {
    try {
      console.log('🚀 Starting website scraper...\n');

      // Validate URL
      try {
        new URL(url);
      } catch (e) {
        console.error('❌ Invalid URL provided:', url);
        process.exit(1);
      }

      // Check for API key
      if (!process.env.FIRECRAWL_API_KEY) {
        console.error('❌ FIRECRAWL_API_KEY not found in .env file');
        console.error('   Please add your Firecrawl API key to the .env file');
        console.error('   Get your API key from: https://firecrawl.dev');
        process.exit(1);
      }

      // Prepare scraping options
      const scrapeOptions = {
        onlyMainContent: !options.fullContent,
        waitFor: options.wait,
        timeout: options.timeout
      };

      // Scrape the website
      let scrapedData;
      if (options.direct) {
        scrapedData = await scrapeWithDirectAPI(url, scrapeOptions);
      } else {
        scrapedData = await scrapeWebsite(url, scrapeOptions);
      }

      // Save the content
      const result = await saveScrapedContent(scrapedData, options.output);

      console.log('\n🎉 Success! Content saved to:');
      console.log(`   📁 ${result.outputDir}`);
      console.log('\nFiles created:');
      console.log(`   📝 Markdown: ${result.files.markdown}`);
      console.log(`   📄 HTML: ${result.files.html}`);
      if (result.files.screenshot) {
        console.log(`   📸 Screenshot: ${result.files.screenshot}`);
      }
      console.log(`   📊 Metadata: ${result.files.metadata}`);

    } catch (error) {
      console.error('\n❌ Error:', error.message);
      process.exit(1);
    }
  });

program.parse();

// If no arguments provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}