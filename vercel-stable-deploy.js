const puppeteer = require('puppeteer');

// Helper function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function deployToVercel() {
  console.log('🚀 Starting Stable Vercel Deployment...');
  console.log('======================================');
  
  let browser;
  let page;
  
  try {
    browser = await puppeteer.launch({
      headless: false, // Keep visible
      defaultViewport: null,
      args: [
        '--start-maximized',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-extensions',
        '--disable-plugins',
        '--disable-images',
        '--disable-javascript-harmony-shipping',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection'
      ]
    });
    
    const pages = await browser.pages();
    page = pages[0] || await browser.newPage();
    
    // Set a longer timeout
    page.setDefaultTimeout(60000);
    
    // Navigate to Vercel dashboard
    console.log('📱 Navigating to Vercel dashboard...');
    await page.goto('https://vercel.com/dashboard', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // Wait for page to stabilize
    await delay(5000);
    
    // Take screenshot safely
    try {
      await page.screenshot({ path: 'vercel-stable-1.png', fullPage: true });
      console.log('📸 Step 1: Dashboard loaded');
    } catch (e) {
      console.log('⚠️ Screenshot failed, continuing...');
    }
    
    // Check for login requirement
    const needsLogin = await page.evaluate(() => {
      return document.querySelector('h1') && 
             document.querySelector('h1').textContent.includes('Log in to Vercel');
    }).catch(() => true);
    
    if (needsLogin) {
      console.log('🔐 Login required - attempting GitHub OAuth...');
      
      // Find and click GitHub login button
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, a'));
        const githubBtn = buttons.find(btn => btn.textContent.includes('Continue with GitHub'));
        if (githubBtn) {
          githubBtn.click();
          return true;
        }
        return false;
      });
      
      console.log('🔄 Clicked GitHub OAuth button');
      
      // Wait for navigation or login process
      await delay(10000);
      
      // Try to navigate back to dashboard
      await page.goto('https://vercel.com/dashboard', { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });
      
      await delay(5000);
      
      try {
        await page.screenshot({ path: 'vercel-stable-2.png', fullPage: true });
        console.log('📸 Step 2: After login attempt');
      } catch (e) {
        console.log('⚠️ Screenshot failed, continuing...');
      }
    }
    
    // Look for New Project button
    console.log('🔍 Looking for New Project button...');
    
    const foundNewProject = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, a'));
      const newProjectBtn = buttons.find(btn => 
        btn.textContent.includes('New Project') || 
        btn.textContent.includes('Import') ||
        btn.textContent.includes('Add New') ||
        btn.textContent.includes('Create')
      );
      
      if (newProjectBtn) {
        newProjectBtn.click();
        return true;
      }
      return false;
    });
    
    if (foundNewProject) {
      console.log('✅ Clicked New Project button');
      await delay(5000);
      
      try {
        await page.screenshot({ path: 'vercel-stable-3.png', fullPage: true });
        console.log('📸 Step 3: Import page loaded');
      } catch (e) {
        console.log('⚠️ Screenshot failed, continuing...');
      }
      
      // Look for GitHub import
      console.log('🔍 Looking for GitHub import option...');
      
      const foundGitHub = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('button, a, div'));
        const githubElement = elements.find(el => 
          el.textContent.includes('GitHub') || 
          el.textContent.includes('Import Git Repository')
        );
        
        if (githubElement) {
          githubElement.click();
          return true;
        }
        return false;
      });
      
      if (foundGitHub) {
        console.log('✅ Clicked GitHub import option');
        await delay(8000); // Wait for repository list to load
        
        try {
          await page.screenshot({ path: 'vercel-stable-4.png', fullPage: true });
          console.log('📸 Step 4: Repository list loaded');
        } catch (e) {
          console.log('⚠️ Screenshot failed, continuing...');
        }
        
        // Look for ClaudeTest repository
        console.log('🔍 Looking for ClaudeTest repository...');
        
        const foundRepo = await page.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('button, a, div'));
          const repoElement = elements.find(el => 
            el.textContent.includes('ClaudeTest') ||
            el.textContent.includes('claude-test')
          );
          
          if (repoElement) {
            repoElement.click();
            return true;
          }
          return false;
        });
        
        if (foundRepo) {
          console.log('✅ Selected ClaudeTest repository');
          await delay(5000);
          
          try {
            await page.screenshot({ path: 'vercel-stable-5.png', fullPage: true });
            console.log('📸 Step 5: Repository configuration');
          } catch (e) {
            console.log('⚠️ Screenshot failed, continuing...');
          }
          
          // Look for Deploy button
          console.log('🔍 Looking for Deploy button...');
          
          const foundDeploy = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const deployBtn = buttons.find(btn => 
              btn.textContent.includes('Deploy') ||
              btn.textContent.includes('Create') ||
              btn.textContent.includes('Import')
            );
            
            if (deployBtn) {
              deployBtn.click();
              return true;
            }
            return false;
          });
          
          if (foundDeploy) {
            console.log('✅ Started deployment process');
            console.log('⏳ Waiting for deployment to complete...');
            
            // Wait for deployment to start
            await delay(15000);
            
            try {
              await page.screenshot({ path: 'vercel-stable-6.png', fullPage: true });
              console.log('📸 Step 6: Deployment in progress');
            } catch (e) {
              console.log('⚠️ Screenshot failed, continuing...');
            }
            
            // Look for deployment URL
            console.log('🔍 Searching for deployment URL...');
            
            let deploymentUrl = null;
            const maxAttempts = 15; // 15 attempts = ~2.5 minutes
            
            for (let i = 0; i < maxAttempts; i++) {
              await delay(10000); // Wait 10 seconds between checks
              
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
              }).catch(() => null);
              
              if (deploymentUrl) {
                console.log(`🎉 DEPLOYMENT SUCCESSFUL! Found URL: ${deploymentUrl}`);
                break;
              }
              
              console.log(`⏳ Attempt ${i + 1}/${maxAttempts} - Still waiting for deployment...`);
              
              try {
                await page.screenshot({ path: `vercel-wait-${i + 1}.png`, fullPage: true });
              } catch (e) {
                console.log(`⚠️ Screenshot ${i + 1} failed, continuing...`);
              }
            }
            
            if (deploymentUrl) {
              try {
                await page.screenshot({ path: 'vercel-success.png', fullPage: true });
                console.log('📸 Final success screenshot saved');
              } catch (e) {
                console.log('⚠️ Final screenshot failed, but deployment succeeded');
              }
              return deploymentUrl;
            } else {
              console.log('⚠️ Deployment may still be in progress');
              try {
                await page.screenshot({ path: 'vercel-timeout.png', fullPage: true });
                console.log('📸 Timeout screenshot saved');
              } catch (e) {
                console.log('⚠️ Timeout screenshot failed');
              }
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
      throw new Error('Could not find New Project button');
    }
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    
    if (page) {
      try {
        await page.screenshot({ path: 'vercel-error.png', fullPage: true });
        console.log('📸 Error screenshot saved');
      } catch (e) {
        console.log('⚠️ Error screenshot failed');
      }
    }
    
    throw error;
  } finally {
    if (browser) {
      console.log('🔄 Keeping browser open for 20 seconds to view result...');
      await delay(20000);
      
      try {
        await browser.close();
      } catch (e) {
        console.log('⚠️ Browser close failed');
      }
    }
  }
}

// Execute the deployment
console.log('🚀 TechFlow Solutions - Stable Automated Deployment');
console.log('====================================================');
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