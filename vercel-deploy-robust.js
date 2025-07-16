const puppeteer = require('puppeteer');

// Helper function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function deployToVercel() {
  console.log('🚀 Starting Vercel deployment automation...');
  
  let browser;
  let page;
  
  try {
    browser = await puppeteer.launch({
      headless: false, // Make browser visible as requested
      defaultViewport: null,
      args: [
        '--start-maximized',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080'
      ]
    });
    
    page = await browser.newPage();
    
    // Set user agent and viewport
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to Vercel dashboard
    console.log('📱 Navigating to Vercel dashboard...');
    await page.goto('https://vercel.com/dashboard', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait for the page to load completely
    await delay(5000);
    
    // Take a screenshot to see current state
    await page.screenshot({ path: 'vercel-dashboard.png', fullPage: true });
    console.log('📸 Dashboard screenshot saved as vercel-dashboard.png');
    
    // Check if we're logged in or need to login
    console.log('🔍 Checking if logged in...');
    
    const isLoggedIn = await page.evaluate(() => {
      // Look for indicators that we're logged in
      const loginButtons = document.querySelectorAll('button, a');
      const hasLogin = Array.from(loginButtons).some(btn => 
        btn.textContent.includes('Login') || 
        btn.textContent.includes('Sign in') ||
        btn.textContent.includes('Log in')
      );
      
      const hasNewProject = Array.from(loginButtons).some(btn => 
        btn.textContent.includes('New Project') || 
        btn.textContent.includes('Import') ||
        btn.textContent.includes('Create')
      );
      
      return !hasLogin && hasNewProject;
    });
    
    if (!isLoggedIn) {
      console.log('❌ Not logged in to Vercel. Please login first.');
      
      // Try to find login button
      try {
        const loginSelectors = [
          'a[href*="login"]',
          'button:contains("Login")',
          'a:contains("Login")',
          'button:contains("Sign in")',
          'a:contains("Sign in")'
        ];
        
        for (const selector of loginSelectors) {
          try {
            const element = await page.$(selector);
            if (element) {
              console.log(`🔍 Found login button: ${selector}`);
              await element.click();
              break;
            }
          } catch (e) {
            // Continue to next selector
          }
        }
        
        // Wait for login page
        await delay(5000);
        console.log('🔐 Please complete login in the browser window and then run the script again.');
        
        // Keep browser open for manual login
        await delay(30000);
        
        return null;
        
      } catch (error) {
        console.error('❌ Could not find login button:', error.message);
        return null;
      }
    }
    
    console.log('✅ Logged in to Vercel');
    
    // Look for "New Project" button
    console.log('🔍 Looking for New Project button...');
    
    const newProjectButton = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, a'));
      return buttons.find(btn => 
        btn.textContent.includes('New Project') || 
        btn.textContent.includes('Import') ||
        btn.textContent.includes('Create Project') ||
        btn.textContent.includes('Add New')
      );
    });
    
    if (newProjectButton) {
      console.log('✅ Found New Project button');
      await page.evaluate((button) => {
        button.click();
      }, newProjectButton);
      
      // Wait for navigation
      await delay(3000);
      
      // Take screenshot of import page
      await page.screenshot({ path: 'vercel-import.png', fullPage: true });
      console.log('📸 Import page screenshot saved as vercel-import.png');
      
      // Look for GitHub import option
      console.log('🔍 Looking for GitHub import option...');
      
      const githubButton = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('button, a, div'));
        return elements.find(el => 
          el.textContent.includes('GitHub') || 
          el.textContent.includes('Import Git Repository')
        );
      });
      
      if (githubButton) {
        console.log('✅ Found GitHub import button');
        await page.evaluate((button) => {
          button.click();
        }, githubButton);
        
        // Wait for repository selection
        await delay(5000);
        
        // Take screenshot of repository selection
        await page.screenshot({ path: 'vercel-repos.png', fullPage: true });
        console.log('📸 Repository selection screenshot saved as vercel-repos.png');
        
        // Look for ClaudeTest repository
        console.log('🔍 Looking for ClaudeTest repository...');
        
        const repoButton = await page.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('button, a, div'));
          return elements.find(el => 
            el.textContent.includes('ClaudeTest') ||
            el.textContent.includes('claude-test')
          );
        });
        
        if (repoButton) {
          console.log('✅ Found ClaudeTest repository');
          await page.evaluate((button) => {
            button.click();
          }, repoButton);
          
          // Wait for configuration page
          await delay(5000);
          
          // Take screenshot of configuration
          await page.screenshot({ path: 'vercel-config.png', fullPage: true });
          console.log('📸 Configuration screenshot saved as vercel-config.png');
          
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
            console.log('✅ Found Deploy button');
            await page.evaluate((button) => {
              button.click();
            }, deployButton);
            
            // Wait for deployment to start
            console.log('⏳ Waiting for deployment to start...');
            await delay(10000);
            
            // Take screenshot of deployment status
            await page.screenshot({ path: 'vercel-deployment.png', fullPage: true });
            console.log('📸 Deployment screenshot saved as vercel-deployment.png');
            
            // Try to get the deployment URL
            console.log('🔍 Looking for deployment URL...');
            
            const deploymentUrl = await page.evaluate(() => {
              const elements = Array.from(document.querySelectorAll('*'));
              const urlElement = elements.find(el => 
                el.textContent.includes('vercel.app') && 
                (el.textContent.includes('claude-test') || el.textContent.includes('claudetest'))
              );
              
              if (urlElement) {
                const text = urlElement.textContent;
                const match = text.match(/https:\/\/[^\s]+\.vercel\.app/);
                return match ? match[0] : null;
              }
              
              // Also check for href attributes
              const links = Array.from(document.querySelectorAll('a'));
              const urlLink = links.find(link => 
                link.href && link.href.includes('vercel.app') && 
                (link.href.includes('claude-test') || link.href.includes('claudetest'))
              );
              
              return urlLink ? urlLink.href : null;
            });
            
            if (deploymentUrl) {
              console.log('🎉 DEPLOYMENT SUCCESSFUL!');
              console.log(`🌐 Live URL: ${deploymentUrl}`);
              
              // Wait a bit to show the result
              await delay(5000);
              
              return deploymentUrl;
            } else {
              console.log('⚠️ Deployment initiated but URL not found yet. Check screenshots for status.');
              
              // Wait longer for deployment to complete
              await delay(30000);
              
              // Try to get URL again
              const finalUrl = await page.evaluate(() => {
                const elements = Array.from(document.querySelectorAll('*'));
                const urlElement = elements.find(el => 
                  el.textContent.includes('vercel.app')
                );
                
                if (urlElement) {
                  const text = urlElement.textContent;
                  const match = text.match(/https:\/\/[^\s]+\.vercel\.app/);
                  return match ? match[0] : null;
                }
                return null;
              });
              
              return finalUrl;
            }
          } else {
            throw new Error('Could not find Deploy button');
          }
        } else {
          throw new Error('Could not find ClaudeTest repository in the list');
        }
      } else {
        throw new Error('Could not find GitHub import option');
      }
    } else {
      throw new Error('Could not find New Project button');
    }
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    
    if (page) {
      // Take a screenshot for debugging
      await page.screenshot({ path: 'vercel-error.png', fullPage: true });
      console.log('📸 Error screenshot saved as vercel-error.png');
    }
    
    throw error;
  } finally {
    if (browser) {
      // Keep browser open for a moment to see the result
      await delay(10000);
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
      console.log('3. Set up a custom domain if desired');
    } else {
      console.log('\n⏳ Deployment may still be in progress. Check the screenshots and Vercel dashboard.');
    }
  })
  .catch(error => {
    console.error('\n❌ Deployment automation failed:', error.message);
    console.log('\nℹ️ Check the screenshot files for debugging information.');
    process.exit(1);
  });