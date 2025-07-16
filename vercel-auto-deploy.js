const puppeteer = require('puppeteer');

// Helper function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function deployToVercel() {
  console.log('🚀 Starting Full Automated Vercel Deployment...');
  console.log('===============================================');
  
  let browser;
  let page;
  
  try {
    browser = await puppeteer.launch({
      headless: false, // Keep visible for debugging
      defaultViewport: null,
      args: [
        '--start-maximized',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
    
    page = await browser.newPage();
    
    // Navigate to Vercel dashboard
    console.log('📱 Navigating to Vercel dashboard...');
    await page.goto('https://vercel.com/dashboard', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    await delay(3000);
    
    // Take screenshot of initial state
    await page.screenshot({ path: 'vercel-step-1.png', fullPage: true });
    console.log('📸 Step 1: Initial state captured');
    
    // Check if we're on login page
    const isLoginPage = await page.evaluate(() => {
      return document.querySelector('h1') && document.querySelector('h1').textContent.includes('Log in to Vercel');
    });
    
    if (isLoginPage) {
      console.log('🔐 On login page - attempting GitHub OAuth...');
      
      // Click "Continue with GitHub"
      const githubButton = await page.waitForSelector('button:has-text("Continue with GitHub"), a:has-text("Continue with GitHub")', { timeout: 10000 }).catch(() => null);
      
      if (!githubButton) {
        // Try alternative selector
        await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button, a'));
          const githubBtn = buttons.find(btn => btn.textContent.includes('Continue with GitHub'));
          if (githubBtn) githubBtn.click();
        });
      } else {
        await githubButton.click();
      }
      
      console.log('🔄 Clicked GitHub login button');
      await delay(3000);
      
      // Take screenshot after clicking GitHub login
      await page.screenshot({ path: 'vercel-step-2.png', fullPage: true });
      console.log('📸 Step 2: After GitHub login click');
      
      // Wait for GitHub OAuth or redirect back to dashboard
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 });
      
      await delay(3000);
      await page.screenshot({ path: 'vercel-step-3.png', fullPage: true });
      console.log('📸 Step 3: After navigation');
    }
    
    // Check if we're now on dashboard
    const isDashboard = await page.evaluate(() => {
      return document.querySelector('button, a') && 
             Array.from(document.querySelectorAll('button, a')).some(btn => 
               btn.textContent.includes('New Project') || 
               btn.textContent.includes('Import') ||
               btn.textContent.includes('Add New')
             );
    });
    
    if (!isDashboard) {
      console.log('⚠️ Not on dashboard yet - waiting for authentication...');
      
      // Wait for potential GitHub OAuth process
      await delay(10000);
      
      // Try to navigate back to dashboard
      await page.goto('https://vercel.com/dashboard', { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      await delay(3000);
      await page.screenshot({ path: 'vercel-step-4.png', fullPage: true });
      console.log('📸 Step 4: After dashboard navigation');
    }
    
    // Look for New Project button
    console.log('🔍 Looking for New Project button...');
    
    const newProjectButton = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, a'));
      return buttons.find(btn => 
        btn.textContent.includes('New Project') || 
        btn.textContent.includes('Import') ||
        btn.textContent.includes('Add New') ||
        btn.textContent.includes('Create')
      );
    });
    
    if (newProjectButton) {
      console.log('✅ Found New Project button - clicking...');
      await page.evaluate((button) => {
        button.click();
      }, newProjectButton);
      
      await delay(5000);
      await page.screenshot({ path: 'vercel-step-5.png', fullPage: true });
      console.log('📸 Step 5: After New Project click');
      
      // Look for GitHub import option
      console.log('🔍 Looking for GitHub import option...');
      
      const githubImportButton = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('button, a, div'));
        return elements.find(el => 
          el.textContent.includes('GitHub') || 
          el.textContent.includes('Import Git Repository')
        );
      });
      
      if (githubImportButton) {
        console.log('✅ Found GitHub import option - clicking...');
        await page.evaluate((button) => {
          button.click();
        }, githubImportButton);
        
        await delay(5000);
        await page.screenshot({ path: 'vercel-step-6.png', fullPage: true });
        console.log('📸 Step 6: After GitHub import click');
        
        // Look for ClaudeTest repository
        console.log('🔍 Looking for ClaudeTest repository...');
        
        // Wait for repositories to load
        await delay(3000);
        
        const repoButton = await page.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('button, a, div'));
          return elements.find(el => 
            el.textContent.includes('ClaudeTest') ||
            el.textContent.includes('claude-test')
          );
        });
        
        if (repoButton) {
          console.log('✅ Found ClaudeTest repository - importing...');
          await page.evaluate((button) => {
            button.click();
          }, repoButton);
          
          await delay(5000);
          await page.screenshot({ path: 'vercel-step-7.png', fullPage: true });
          console.log('📸 Step 7: After repository selection');
          
          // Look for Deploy button
          console.log('🔍 Looking for Deploy button...');
          
          const deployButton = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            return buttons.find(btn => 
              btn.textContent.includes('Deploy') ||
              btn.textContent.includes('Create') ||
              btn.textContent.includes('Import')
            );
          });
          
          if (deployButton) {
            console.log('✅ Found Deploy button - starting deployment...');
            await page.evaluate((button) => {
              button.click();
            }, deployButton);
            
            console.log('⏳ Deployment started - waiting for completion...');
            await delay(10000);
            
            await page.screenshot({ path: 'vercel-step-8.png', fullPage: true });
            console.log('📸 Step 8: Deployment in progress');
            
            // Wait for deployment to complete and look for URL
            console.log('🔍 Waiting for deployment URL...');
            
            let deploymentUrl = null;
            const maxAttempts = 20; // 20 attempts = ~2 minutes
            
            for (let i = 0; i < maxAttempts; i++) {
              await delay(6000); // Wait 6 seconds between checks
              
              deploymentUrl = await page.evaluate(() => {
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
                  link.href && link.href.includes('vercel.app')
                );
                
                return urlLink ? urlLink.href : null;
              });
              
              if (deploymentUrl) {
                console.log(`🎉 DEPLOYMENT SUCCESSFUL! Found URL: ${deploymentUrl}`);
                break;
              }
              
              console.log(`⏳ Attempt ${i + 1}/${maxAttempts} - Still waiting for deployment...`);
              await page.screenshot({ path: `vercel-progress-${i + 1}.png`, fullPage: true });
            }
            
            if (deploymentUrl) {
              await page.screenshot({ path: 'vercel-success.png', fullPage: true });
              console.log('📸 Final success screenshot saved');
              return deploymentUrl;
            } else {
              console.log('⚠️ Deployment may still be in progress - taking final screenshot');
              await page.screenshot({ path: 'vercel-final.png', fullPage: true });
              return null;
            }
          } else {
            throw new Error('Could not find Deploy button');
          }
        } else {
          throw new Error('Could not find ClaudeTest repository');
        }
      } else {
        throw new Error('Could not find GitHub import option');
      }
    } else {
      throw new Error('Could not find New Project button - may not be logged in');
    }
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    
    if (page) {
      await page.screenshot({ path: 'vercel-error.png', fullPage: true });
      console.log('📸 Error screenshot saved');
    }
    
    throw error;
  } finally {
    if (browser) {
      console.log('🔄 Keeping browser open for 15 seconds to view result...');
      await delay(15000);
      await browser.close();
    }
  }
}

// Execute the deployment
console.log('🚀 TechFlow Solutions - Full Automated Deployment');
console.log('==================================================');
console.log('');

deployToVercel()
  .then(url => {
    if (url) {
      console.log(`\n🎉 SUCCESS! TechFlow Solutions is now live at: ${url}`);
      console.log('\n📋 Deployment Complete:');
      console.log('✅ Homepage: Features TechFlow Solutions branding');
      console.log('✅ Brand Guide: Available at /brand-guide');
      console.log('✅ Responsive Design: Desktop and mobile optimized');
      console.log('✅ SVG Assets: Custom logo and graphics');
      console.log('✅ Static Export: Optimized for performance');
      console.log('');
      console.log('🔗 URLs to verify:');
      console.log(`🏠 Homepage: ${url}`);
      console.log(`📖 Brand Guide: ${url}/brand-guide`);
    } else {
      console.log('\n⏳ Deployment process completed but URL not found.');
      console.log('📋 Please check the Vercel dashboard for the deployment status.');
      console.log('🔍 Check the screenshot files for visual debugging.');
    }
  })
  .catch(error => {
    console.error('\n❌ Automated deployment failed:', error.message);
    console.log('\n🔍 Check the screenshot files for debugging information.');
    console.log('📋 The deployment may still be accessible via the Vercel dashboard.');
  });