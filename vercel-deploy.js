const puppeteer = require('puppeteer');

async function deployToVercel() {
  console.log('🚀 Starting Vercel deployment automation...');
  
  const browser = await puppeteer.launch({
    headless: false, // Make browser visible as requested
    defaultViewport: null,
    args: ['--start-maximized']
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to Vercel dashboard
    console.log('📱 Navigating to Vercel dashboard...');
    await page.goto('https://vercel.com/dashboard', { waitUntil: 'networkidle2' });
    
    // Wait for the page to load
    await page.waitForTimeout(3000);
    
    // Look for "New Project" or "Import Project" button
    console.log('🔍 Looking for New Project button...');
    
    // Try multiple selectors for the new project button
    const newProjectSelectors = [
      'button[data-testid="new-project-button"]',
      'a[href*="new"]',
      'button:contains("New Project")',
      'a:contains("New Project")',
      'button:contains("Import")',
      'a:contains("Import")'
    ];
    
    let buttonFound = false;
    for (const selector of newProjectSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        console.log(`✅ Found New Project button: ${selector}`);
        await page.click(selector);
        buttonFound = true;
        break;
      } catch (e) {
        console.log(`❌ Button not found: ${selector}`);
      }
    }
    
    if (!buttonFound) {
      console.log('🔍 Trying to find any button with "New" or "Import" text...');
      // Use JavaScript to find buttons with text
      const button = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, a'));
        return buttons.find(btn => 
          btn.textContent.includes('New') || 
          btn.textContent.includes('Import') ||
          btn.textContent.includes('Create')
        );
      });
      
      if (button) {
        await page.click(button);
        console.log('✅ Clicked New Project button');
      } else {
        throw new Error('Could not find New Project button');
      }
    }
    
    // Wait for the import page to load
    await page.waitForTimeout(3000);
    
    // Look for GitHub import option
    console.log('🔍 Looking for GitHub import option...');
    
    const githubSelectors = [
      'button[data-testid="import-github"]',
      'a[href*="github"]',
      'button:contains("GitHub")',
      'div:contains("GitHub")'
    ];
    
    let githubFound = false;
    for (const selector of githubSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        console.log(`✅ Found GitHub import: ${selector}`);
        await page.click(selector);
        githubFound = true;
        break;
      } catch (e) {
        console.log(`❌ GitHub option not found: ${selector}`);
      }
    }
    
    if (!githubFound) {
      console.log('🔍 Trying to find GitHub option by text...');
      const githubElement = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('*'));
        return elements.find(el => 
          el.textContent.includes('GitHub') && 
          (el.tagName === 'BUTTON' || el.tagName === 'A')
        );
      });
      
      if (githubElement) {
        await page.click(githubElement);
        console.log('✅ Clicked GitHub import');
      } else {
        throw new Error('Could not find GitHub import option');
      }
    }
    
    // Wait for repository selection
    await page.waitForTimeout(3000);
    
    // Look for the ClaudeTest repository
    console.log('🔍 Looking for ClaudeTest repository...');
    
    // Try to find the repository in the list
    const repoSelectors = [
      'button:contains("ClaudeTest")',
      'a:contains("ClaudeTest")',
      'div:contains("ClaudeTest")',
      '[data-testid*="ClaudeTest"]'
    ];
    
    let repoFound = false;
    for (const selector of repoSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        console.log(`✅ Found ClaudeTest repository: ${selector}`);
        await page.click(selector);
        repoFound = true;
        break;
      } catch (e) {
        console.log(`❌ Repository not found: ${selector}`);
      }
    }
    
    if (!repoFound) {
      console.log('🔍 Trying to find ClaudeTest repository by text...');
      const repoElement = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('*'));
        return elements.find(el => 
          el.textContent.includes('ClaudeTest') && 
          (el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'DIV')
        );
      });
      
      if (repoElement) {
        await page.click(repoElement);
        console.log('✅ Clicked ClaudeTest repository');
      } else {
        throw new Error('Could not find ClaudeTest repository');
      }
    }
    
    // Wait for deployment configuration
    await page.waitForTimeout(3000);
    
    // Look for Deploy button
    console.log('🔍 Looking for Deploy button...');
    
    const deploySelectors = [
      'button[data-testid="deploy-button"]',
      'button:contains("Deploy")',
      'button:contains("Create")',
      'button[type="submit"]'
    ];
    
    let deployFound = false;
    for (const selector of deploySelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 5000 });
        console.log(`✅ Found Deploy button: ${selector}`);
        await page.click(selector);
        deployFound = true;
        break;
      } catch (e) {
        console.log(`❌ Deploy button not found: ${selector}`);
      }
    }
    
    if (!deployFound) {
      console.log('🔍 Trying to find Deploy button by text...');
      const deployElement = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(btn => 
          btn.textContent.includes('Deploy') || 
          btn.textContent.includes('Create') ||
          btn.textContent.includes('Import')
        );
      });
      
      if (deployElement) {
        await page.click(deployElement);
        console.log('✅ Clicked Deploy button');
      } else {
        throw new Error('Could not find Deploy button');
      }
    }
    
    // Wait for deployment to start
    console.log('⏳ Waiting for deployment to start...');
    await page.waitForTimeout(10000);
    
    // Try to get the deployment URL
    console.log('🔍 Looking for deployment URL...');
    
    // Look for the deployment URL in various places
    const urlSelectors = [
      'a[href*="vercel.app"]',
      '[data-testid="deployment-url"]',
      'code:contains("vercel.app")',
      'span:contains("vercel.app")'
    ];
    
    let deploymentUrl = null;
    for (const selector of urlSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 10000 });
        const element = await page.$(selector);
        if (element) {
          deploymentUrl = await page.evaluate(el => el.href || el.textContent, element);
          console.log(`✅ Found deployment URL: ${deploymentUrl}`);
          break;
        }
      } catch (e) {
        console.log(`❌ URL not found with selector: ${selector}`);
      }
    }
    
    if (!deploymentUrl) {
      console.log('🔍 Trying to find deployment URL by text...');
      deploymentUrl = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('*'));
        const urlElement = elements.find(el => 
          el.textContent.includes('vercel.app') && 
          el.textContent.includes('claude-test')
        );
        return urlElement ? urlElement.textContent : null;
      });
    }
    
    if (deploymentUrl) {
      console.log('🎉 DEPLOYMENT SUCCESSFUL!');
      console.log(`🌐 Live URL: ${deploymentUrl}`);
      return deploymentUrl;
    } else {
      console.log('⚠️ Deployment may be in progress. Check Vercel dashboard.');
      // Take a screenshot for debugging
      await page.screenshot({ path: 'vercel-deployment-status.png', fullPage: true });
      console.log('📸 Screenshot saved as vercel-deployment-status.png');
      return null;
    }
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    // Take a screenshot for debugging
    await page.screenshot({ path: 'vercel-error.png', fullPage: true });
    console.log('📸 Error screenshot saved as vercel-error.png');
    throw error;
  } finally {
    // Keep browser open for a moment to see the result
    await page.waitForTimeout(5000);
    await browser.close();
  }
}

// Run the deployment
deployToVercel()
  .then(url => {
    if (url) {
      console.log(`\n🎉 SUCCESS! TechFlow Solutions is now live at: ${url}`);
    } else {
      console.log('\n⏳ Deployment initiated. Check Vercel dashboard for status.');
    }
  })
  .catch(error => {
    console.error('\n❌ Deployment automation failed:', error.message);
    process.exit(1);
  });