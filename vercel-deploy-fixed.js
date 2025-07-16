const puppeteer = require('puppeteer');

async function deployToVercel() {
  console.log('🚀 TechFlow Solutions - Automated Vercel Deployment');
  console.log('==================================================');
  
  let browser;
  let page;
  
  try {
    // Launch browser with robust settings
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-extensions',
        '--disable-plugins',
        '--disable-gpu',
        '--disable-web-security',
        '--allow-running-insecure-content',
        '--disable-features=VizDisplayCompositor',
        '--start-maximized'
      ]
    });
    
    // Create new page with error handling
    page = await browser.newPage();
    
    // Enhanced error handling
    page.on('error', err => console.log('Page error (continuing):', err.message));
    page.on('pageerror', err => console.log('Page error (continuing):', err.message));
    
    // Navigate with retry logic
    let retries = 3;
    while (retries > 0) {
      try {
        console.log('📱 Navigating to Vercel dashboard...');
        await page.goto('https://vercel.com/dashboard', { 
          waitUntil: 'networkidle0',
          timeout: 30000 
        });
        console.log('✅ Vercel dashboard loaded successfully');
        break;
      } catch (error) {
        console.log(`⚠️  Navigation attempt failed (${4-retries}/3): ${error.message}`);
        retries--;
        if (retries === 0) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    // Wait for page to stabilize
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check if we need to login
    console.log('🔍 Checking login status...');
    
    try {
      // Look for login button or already logged in state
      const loginButton = await page.$('text=Login');
      const newProjectButton = await page.$('text=New Project');
      
      if (loginButton) {
        console.log('🔐 Need to login - clicking login button...');
        await loginButton.click();
        
        // Wait for GitHub login
        console.log('⏳ Waiting for GitHub OAuth...');
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 });
        
        // Wait for redirect back to dashboard
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
      
      // Now look for New Project button
      console.log('🔍 Looking for New Project button...');
      await page.waitForSelector('text=New Project', { timeout: 10000 });
      
      console.log('✅ Ready to import project');
      console.log('🎯 Clicking New Project...');
      
      await page.click('text=New Project');
      
      // Wait for import page
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('📁 Looking for GitHub repository...');
      
      // Look for the repository
      const repoSelector = 'text=ben-crowe/ClaudeTest';
      await page.waitForSelector(repoSelector, { timeout: 10000 });
      
      console.log('✅ Found repository - importing...');
      await page.click(repoSelector);
      
      // Wait for deploy button
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('🚀 Clicking Deploy...');
      await page.click('text=Deploy');
      
      console.log('⏳ Waiting for deployment to complete...');
      
      // Wait for deployment completion (this can take a few minutes)
      await page.waitForSelector('text=Your project has been deployed', { timeout: 180000 });
      
      // Get the deployment URL
      const deploymentUrl = await page.evaluate(() => {
        const urlElement = document.querySelector('a[href*="vercel.app"]');
        return urlElement ? urlElement.href : null;
      });
      
      if (deploymentUrl) {
        console.log('🎉 DEPLOYMENT SUCCESSFUL!');
        console.log('🌐 Live URL:', deploymentUrl);
        
        // Test the URL
        console.log('🧪 Testing deployment...');
        await page.goto(deploymentUrl);
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log('✅ Deployment verified and working!');
        return deploymentUrl;
      } else {
        console.log('⚠️  Could not find deployment URL');
      }
      
    } catch (error) {
      console.log('❌ Automation failed:', error.message);
      console.log('📋 Please complete manually:');
      console.log('1. Click "New Project"');
      console.log('2. Import ben-crowe/ClaudeTest');
      console.log('3. Click Deploy');
      console.log('');
      console.log('🌐 Browser will stay open for manual completion...');
      
      // Keep browser open for manual completion
      await new Promise(resolve => setTimeout(resolve, 300000)); // 5 minutes
    }
    
  } catch (error) {
    console.error('💥 Critical error:', error.message);
    console.log('🌐 Browser will stay open for manual completion...');
    await new Promise(resolve => setTimeout(resolve, 300000)); // 5 minutes
  } finally {
    if (browser) {
      console.log('🔚 Closing browser...');
      await browser.close();
    }
  }
}

// Run the deployment
deployToVercel().catch(console.error);