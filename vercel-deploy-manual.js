const puppeteer = require('puppeteer');

// Helper function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function deployToVercel() {
  console.log('🚀 Starting Manual Vercel Deployment Process...');
  console.log('===============================================');
  console.log('');
  console.log('📋 This script will open Vercel and guide you through the deployment');
  console.log('💡 You will need to manually complete some steps');
  console.log('');
  
  let browser;
  let page;
  
  try {
    browser = await puppeteer.launch({
      headless: false, // Make browser visible
      defaultViewport: null,
      args: [
        '--start-maximized',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security'
      ]
    });
    
    page = await browser.newPage();
    
    // Navigate to Vercel dashboard
    console.log('📱 Opening Vercel dashboard...');
    await page.goto('https://vercel.com/dashboard', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // Wait for page to load
    await delay(5000);
    
    // Take a screenshot
    await page.screenshot({ path: 'vercel-start.png', fullPage: true });
    console.log('📸 Screenshot saved as vercel-start.png');
    
    console.log('');
    console.log('📋 Manual Steps to Complete:');
    console.log('1. If not logged in, please log in to Vercel now');
    console.log('2. Click on "New Project" or "Import Project"');
    console.log('3. Select "Import Git Repository"');
    console.log('4. Choose your GitHub account');
    console.log('5. Find and select the "ClaudeTest" repository');
    console.log('6. Click "Import" to start the deployment');
    console.log('');
    console.log('💡 The browser window will stay open for you to complete these steps');
    console.log('⏰ You have 5 minutes to complete the deployment');
    console.log('');
    
    // Wait 5 minutes for manual deployment
    const waitTime = 5 * 60 * 1000; // 5 minutes
    console.log(`⏳ Waiting ${waitTime / 60000} minutes for deployment completion...`);
    
    // Check every 30 seconds for deployment completion
    const checkInterval = 30000; // 30 seconds
    const maxChecks = waitTime / checkInterval;
    
    for (let i = 0; i < maxChecks; i++) {
      await delay(checkInterval);
      
      try {
        // Take a screenshot to track progress
        await page.screenshot({ path: `vercel-progress-${i + 1}.png`, fullPage: true });
        console.log(`📸 Progress screenshot ${i + 1} saved`);
        
        // Check if we can find a deployment URL
        const deploymentUrl = await page.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('*'));
          
          // Look for URL in text content
          const urlElement = elements.find(el => {
            const text = el.textContent || '';
            return text.includes('vercel.app') && 
                   (text.includes('claude-test') || 
                    text.includes('claudetest') || 
                    text.includes('techflow'));
          });
          
          if (urlElement) {
            const text = urlElement.textContent;
            const match = text.match(/https:\/\/[^\s]+\.vercel\.app/);
            return match ? match[0] : null;
          }
          
          // Also check for href attributes
          const links = Array.from(document.querySelectorAll('a'));
          const urlLink = links.find(link => 
            link.href && link.href.includes('vercel.app') && 
            (link.href.includes('claude-test') || 
             link.href.includes('claudetest') || 
             link.href.includes('techflow'))
          );
          
          return urlLink ? urlLink.href : null;
        });
        
        if (deploymentUrl) {
          console.log('🎉 DEPLOYMENT URL FOUND!');
          console.log(`🌐 Live URL: ${deploymentUrl}`);
          
          // Take a final screenshot
          await page.screenshot({ path: 'vercel-success.png', fullPage: true });
          console.log('📸 Success screenshot saved as vercel-success.png');
          
          return deploymentUrl;
        }
        
        // Check if deployment is in progress
        const deploymentStatus = await page.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('*'));
          
          // Look for deployment status indicators
          const statusElement = elements.find(el => {
            const text = el.textContent || '';
            return text.includes('Building') || 
                   text.includes('Deploying') || 
                   text.includes('Ready') ||
                   text.includes('Deployment');
          });
          
          return statusElement ? statusElement.textContent : null;
        });
        
        if (deploymentStatus) {
          console.log(`📊 Status: ${deploymentStatus}`);
        } else {
          console.log(`⏳ Check ${i + 1}/${maxChecks} - Waiting for deployment...`);
        }
        
      } catch (error) {
        console.log(`⚠️ Error during check ${i + 1}: ${error.message}`);
      }
    }
    
    console.log('⏰ Time limit reached. Taking final screenshot...');
    await page.screenshot({ path: 'vercel-final.png', fullPage: true });
    console.log('📸 Final screenshot saved as vercel-final.png');
    
    return null;
    
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    
    if (page) {
      try {
        await page.screenshot({ path: 'vercel-error.png', fullPage: true });
        console.log('📸 Error screenshot saved as vercel-error.png');
      } catch (screenshotError) {
        console.log('⚠️ Could not save error screenshot');
      }
    }
    
    throw error;
  } finally {
    if (browser) {
      console.log('🔄 Keeping browser open for 30 seconds to view final result...');
      await delay(30000);
      await browser.close();
    }
  }
}

// Run the deployment
deployToVercel()
  .then(url => {
    if (url) {
      console.log(`\n🎉 SUCCESS! TechFlow Solutions is now live at: ${url}`);
      console.log('\n📋 Next steps:');
      console.log('1. Visit the URL to verify the deployment');
      console.log('2. Check the /brand-guide page');
      console.log('3. Test the responsive design');
      console.log('4. Verify all assets are loading correctly');
    } else {
      console.log('\n⏳ Deployment process completed but URL not automatically detected.');
      console.log('📋 Please check the Vercel dashboard manually for the deployment URL.');
      console.log('🔍 Check the screenshot files for visual confirmation of deployment status.');
    }
  })
  .catch(error => {
    console.error('\n❌ Deployment script failed:', error.message);
    console.log('\n🔍 Troubleshooting:');
    console.log('1. Check the screenshot files for visual debugging');
    console.log('2. Try deploying manually through the Vercel dashboard');
    console.log('3. Verify the GitHub repository is accessible');
    process.exit(1);
  });