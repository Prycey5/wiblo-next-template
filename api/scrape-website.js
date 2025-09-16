import FirecrawlApp from '@mendable/firecrawl-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export async function scrapeWebsiteAPI(url, formats = ['markdown', 'html', 'screenshot'], options = {}) {
  try {
    if (!url) {
      throw new Error('URL is required');
    }
    
    // Initialize Firecrawl with API key from environment
    const apiKey = process.env.FIRECRAWL_API_KEY;
    
    if (!apiKey) {
      console.error("FIRECRAWL_API_KEY not configured");
      // For demo purposes, return mock data if API key is not set
      return {
        success: true,
        data: {
          title: "Example Website",
          content: `This is a mock response for ${url}. Configure FIRECRAWL_API_KEY to enable real scraping.`,
          description: "A sample website",
          markdown: `# Example Website\n\nThis is mock content for demonstration purposes.`,
          html: `<h1>Example Website</h1><p>This is mock content for demonstration purposes.</p>`,
          metadata: {
            title: "Example Website",
            description: "A sample website",
            sourceURL: url,
            statusCode: 200
          }
        }
      };
    }
    
    const app = new FirecrawlApp({ apiKey });
    
    // Scrape the website using the latest SDK patterns
    // Include screenshot if requested in formats
    const scrapeResult = await app.scrape(url, {
      formats: formats,
      onlyMainContent: options.onlyMainContent !== false, // Default to true for cleaner content
      waitFor: options.waitFor || 3000, // Wait for dynamic content
      timeout: options.timeout || 30000,
      blockAds: true,
      ...options // Pass through any additional options
    });
    
    // Handle the response according to the latest SDK structure
    const result = scrapeResult;
    if (result.success === false) {
      throw new Error(result.error || "Failed to scrape website");
    }
    
    // The SDK may return data directly or nested
    const data = result.data || result;
    
    return {
      success: true,
      data: {
        title: data?.metadata?.title || "Untitled",
        content: data?.markdown || data?.html || "",
        description: data?.metadata?.description || "",
        markdown: data?.markdown || "",
        html: data?.html || "",
        metadata: data?.metadata || {},
        screenshot: data?.screenshot || null,
        links: data?.links || [],
        // Include raw data for flexibility
        raw: data
      }
    };
    
  } catch (error) {
    console.error("Error scraping website:", error);
    
    // Return a more detailed error response
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to scrape website",
      // Provide mock data as fallback for development
      data: {
        title: "Example Website",
        content: "This is fallback content due to an error. Please check your configuration.",
        description: "Error occurred while scraping",
        markdown: `# Error\n\n${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        html: `<h1>Error</h1><p>${error instanceof Error ? error.message : 'Unknown error occurred'}</p>`,
        metadata: {
          title: "Error",
          description: "Failed to scrape website",
          statusCode: 500
        }
      }
    };
  }
}

export async function scrapeScreenshotAPI(url) {
  try {
    if (!url) {
      throw new Error('URL is required');
    }

    // Initialize Firecrawl with API key from environment
    const apiKey = process.env.FIRECRAWL_API_KEY;
    
    if (!apiKey) {
      console.error("FIRECRAWL_API_KEY not configured");
      throw new Error('Firecrawl API key not configured');
    }
    
    const app = new FirecrawlApp({ apiKey });

    console.log('[scrape-screenshot] Attempting to capture screenshot for:', url);

    // Use the scrape method with screenshot format
    const scrapeResult = await app.scrape(url, {
      formats: ['screenshot'], // Request screenshot format
      waitFor: 3000, // Wait for page to fully load
      timeout: 30000,
      onlyMainContent: false, // Get full page for screenshot
      actions: [
        {
          type: 'wait',
          milliseconds: 2000 // Additional wait for dynamic content
        }
      ]
    });

    console.log('[scrape-screenshot] Scrape completed');
    
    // Check if we have data with screenshot
    if (scrapeResult && scrapeResult.screenshot) {
      // Direct screenshot response
      return {
        success: true,
        screenshot: scrapeResult.screenshot,
        metadata: scrapeResult.metadata || {}
      };
    } else if (scrapeResult?.data?.screenshot) {
      // Nested data structure
      return {
        success: true,
        screenshot: scrapeResult.data.screenshot,
        metadata: scrapeResult.data.metadata || {}
      };
    } else if (scrapeResult?.success === false) {
      // Explicit failure
      console.error('[scrape-screenshot] Firecrawl API error:', scrapeResult.error);
      throw new Error(scrapeResult.error || 'Failed to capture screenshot');
    } else {
      // No screenshot in response
      console.error('[scrape-screenshot] No screenshot in response');
      throw new Error('Screenshot not available in response');
    }

  } catch (error) {
    console.error('[scrape-screenshot] Screenshot capture error:', error);
    
    return { 
      success: false,
      error: error.message || 'Failed to capture screenshot'
    };
  }
}

export async function scrapeEnhancedAPI(url) {
  try {
    if (!url) {
      throw new Error('URL is required');
    }
    
    console.log('[scrape-url-enhanced] Scraping with Firecrawl:', url);
    
    const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
    if (!FIRECRAWL_API_KEY) {
      throw new Error('FIRECRAWL_API_KEY environment variable is not set');
    }
    
    // Make request to Firecrawl API with maxAge for 500% faster scraping
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
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
        ]
      })
    });
    
    if (!firecrawlResponse.ok) {
      const error = await firecrawlResponse.text();
      throw new Error(`Firecrawl API error: ${error}`);
    }
    
    const data = await firecrawlResponse.json();
    
    if (!data.success || !data.data) {
      throw new Error('Failed to scrape content');
    }
    
    const { markdown, html, metadata, screenshot, actions } = data.data;
    
    // Get screenshot from either direct field or actions result
    const screenshotUrl = screenshot || actions?.screenshots?.[0] || null;
    
    // Sanitize the markdown content
    const sanitizedMarkdown = sanitizeQuotes(markdown || '');
    
    // Extract structured data from the response
    const title = metadata?.title || '';
    const description = metadata?.description || '';
    
    // Format content for AI or other processing
    const formattedContent = `
Title: ${sanitizeQuotes(title)}
Description: ${sanitizeQuotes(description)}
URL: ${url}

Main Content:
${sanitizedMarkdown}
    `.trim();
    
    return {
      success: true,
      url,
      content: formattedContent,
      screenshot: screenshotUrl,
      structured: {
        title: sanitizeQuotes(title),
        description: sanitizeQuotes(description),
        content: sanitizedMarkdown,
        url,
        screenshot: screenshotUrl
      },
      metadata: {
        scraper: 'firecrawl-enhanced',
        timestamp: new Date().toISOString(),
        contentLength: formattedContent.length,
        cached: data.data.cached || false, // Indicates if data came from cache
        ...metadata
      },
      message: 'URL scraped successfully with Firecrawl (with caching for 500% faster performance)'
    };
    
  } catch (error) {
    console.error('[scrape-url-enhanced] Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Helper function to sanitize quotes
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