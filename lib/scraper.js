import FirecrawlApp from '@mendable/firecrawl-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to sanitize smart quotes and other problematic characters
function sanitizeQuotes(text) {
  if (!text) return '';
  
  return text
    // Replace smart single quotes
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    // Replace smart double quotes
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    // Replace other quote-like characters
    .replace(/[\u00AB\u00BB]/g, '"') // Guillemets
    .replace(/[\u2039\u203A]/g, "'") // Single guillemets
    // Replace other problematic characters
    .replace(/[\u2013\u2014]/g, '-') // En dash and em dash
    .replace(/[\u2026]/g, '...') // Ellipsis
    .replace(/[\u00A0]/g, ' '); // Non-breaking space
}

// Function to save base64 image to file
async function saveBase64Image(base64String, filepath) {
  if (!base64String) return null;
  
  // Remove data:image/png;base64, or similar prefix if present
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  
  await fs.writeFile(filepath, buffer);
  return filepath;
}

export async function scrapeWebsite(url, options = {}) {
  try {
    // Check for API key
    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey) {
      throw new Error('FIRECRAWL_API_KEY not found in environment variables. Please set it in your .env file.');
    }

    console.log('🔥 Initializing Firecrawl...');
    const app = new FirecrawlApp({ apiKey });

    console.log(`🌐 Scraping website: ${url}`);
    console.log('⏳ This may take a moment...');

    // Scrape the website with enhanced options (similar to open-lovable)
    const scrapeResult = await app.scrape(url, {
      formats: ['markdown', 'html', 'screenshot'],
      onlyMainContent: options.onlyMainContent !== false, // Default to true for cleaner content
      waitFor: options.waitFor || 3000, // Wait for dynamic content
      timeout: options.timeout || 30000,
      blockAds: true, // Block ads for cleaner scraping
      actions: [
        {
          type: 'wait',
          milliseconds: 2000 // Additional wait for dynamic content
        }
      ],
      ...options // Pass through any additional options
    });

    // Handle the response
    const data = scrapeResult.data || scrapeResult;
    
    if (!data) {
      throw new Error('No data received from Firecrawl');
    }

    console.log('✅ Scraping completed successfully!');

    // Prepare the data
    const result = {
      url: url,
      title: sanitizeQuotes(data.metadata?.title || 'Untitled'),
      description: sanitizeQuotes(data.metadata?.description || ''),
      markdown: sanitizeQuotes(data.markdown || ''),
      html: data.html || '',
      screenshot: data.screenshot || null,
      metadata: {
        ...data.metadata,
        scrapedAt: new Date().toISOString(),
        sourceUrl: url,
        statusCode: data.metadata?.statusCode || 200
      },
      links: data.links || []
    };

    return result;

  } catch (error) {
    console.error('❌ Error scraping website:', error.message);
    throw error;
  }
}

export async function saveScrapedContent(scrapedData, outputDir = null) {
  try {
    // Use provided directory or default to docs/template
    const baseDir = outputDir || path.join(process.cwd(), 'docs', 'template');
    
    // Ensure directory exists
    await fs.mkdir(baseDir, { recursive: true });

    console.log(`📁 Saving content to ${baseDir}`);

    // Save markdown content
    const markdownPath = path.join(baseDir, 'content.md');
    await fs.writeFile(markdownPath, scrapedData.markdown);
    console.log('📝 Saved markdown content');

    // Save HTML content
    const htmlPath = path.join(baseDir, 'content.html');
    await fs.writeFile(htmlPath, scrapedData.html);
    console.log('📄 Saved HTML content');

    // Save screenshot if available
    let screenshotPath = null;
    if (scrapedData.screenshot) {
      screenshotPath = path.join(baseDir, 'screenshot.png');
      
      // Check if it's a base64 string or URL
      if (scrapedData.screenshot.startsWith('data:image') || !scrapedData.screenshot.startsWith('http')) {
        await saveBase64Image(scrapedData.screenshot, screenshotPath);
        console.log('📸 Saved screenshot');
      } else {
        // If it's a URL, save the URL in metadata instead
        console.log('📸 Screenshot URL saved in metadata');
        screenshotPath = scrapedData.screenshot;
      }
    }

    // Save metadata
    const metadataPath = path.join(baseDir, 'metadata.json');
    const metadata = {
      ...scrapedData.metadata,
      title: scrapedData.title,
      description: scrapedData.description,
      url: scrapedData.url,
      screenshotPath: screenshotPath,
      links: scrapedData.links,
      savedAt: new Date().toISOString()
    };
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
    console.log('📊 Saved metadata');

    console.log('✨ All content saved successfully!');
    
    return {
      success: true,
      outputDir: baseDir,
      files: {
        markdown: markdownPath,
        html: htmlPath,
        screenshot: screenshotPath,
        metadata: metadataPath
      }
    };

  } catch (error) {
    console.error('❌ Error saving content:', error.message);
    throw error;
  }
}

// Direct API call method (similar to open-lovable's enhanced endpoint)
export async function scrapeWithDirectAPI(url, options = {}) {
  try {
    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey) {
      throw new Error('FIRECRAWL_API_KEY not found in environment variables');
    }

    console.log('🔥 Using direct Firecrawl API call...');
    console.log(`🌐 Scraping: ${url}`);

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        formats: ['markdown', 'html', 'screenshot'],
        waitFor: 3000,
        timeout: 30000,
        blockAds: true,
        maxAge: 3600000, // Use cached data if less than 1 hour old (500% faster!)
        actions: [
          {
            type: 'wait',
            milliseconds: 2000
          },
          {
            type: 'screenshot',
            fullPage: false // Just visible viewport for performance
          }
        ],
        ...options
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Firecrawl API error: ${error}`);
    }

    const data = await response.json();
    
    if (!data.success || !data.data) {
      throw new Error('Failed to scrape content');
    }

    const { markdown, html, metadata, screenshot, actions } = data.data;
    
    // Get screenshot from either direct field or actions result
    const screenshotUrl = screenshot || actions?.screenshots?.[0] || null;

    console.log('✅ Scraping completed successfully!');
    
    return {
      url: url,
      title: sanitizeQuotes(metadata?.title || 'Untitled'),
      description: sanitizeQuotes(metadata?.description || ''),
      markdown: sanitizeQuotes(markdown || ''),
      html: html || '',
      screenshot: screenshotUrl,
      metadata: {
        ...metadata,
        scrapedAt: new Date().toISOString(),
        sourceUrl: url,
        cached: data.data.cached || false // Indicates if data came from cache
      },
      links: data.data.links || []
    };

  } catch (error) {
    console.error('❌ Error with direct API:', error.message);
    throw error;
  }
}