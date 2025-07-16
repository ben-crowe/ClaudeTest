const puppeteer = require('puppeteer');

// Helper function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function deployToVercel() {
  console.log('🚀 Starting Vercel deployment automation...');
  console.log('📋 Prerequisites: Please ensure you are logged in to Vercel in your browser');
  
  let browser;
  let page;
  
  try {
    browser = await puppeteer.launch({
      headless: false, // Make browser visible
      defaultViewport: null,
      args: [
        '--start-maximized',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    
    page = await browser.newPage();
    
    // Navigate to Vercel dashboard
    console.log('📱 Navigating to Vercel dashboard...');
    await page.goto('https://vercel.com/dashboard', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait for the page to load
    await delay(3000);
    
    // Take a screenshot to see current state
    await page.screenshot({ path: 'vercel-dashboard.png', fullPage: true });
    console.log('📸 Dashboard screenshot saved as vercel-dashboard.png');
    
    // Look for "New Project" button or similar
    console.log('🔍 Looking for New Project button...');
    
    // Wait for the button to appear
    await page.waitForSelector('button, a', { timeout: 10000 });
    
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
      console.log('✅ Found New Project button, clicking...');
      await page.evaluate((button) => {
        button.click();
      }, newProjectButton);
      
      // Wait for navigation
      await delay(3000);
      
      // Take screenshot of import page
      await page.screenshot({ path: 'vercel-import.png', fullPage: true });
      console.log('📸 Import page screenshot saved');
      
      // Look for GitHub import option
      console.log('🔍 Looking for GitHub import option...');
      
      const githubButton = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('button, a, div'));
        return elements.find(el => 
          el.textContent.includes('GitHub') || 
          el.textContent.includes('Continue with GitHub')
        );
      });
      
      if (githubButton) {
        console.log('✅ Found GitHub import option, clicking...');
        await page.evaluate((button) => {
          button.click();
        }, githubButton);
        
        // Wait for repository selection
        await delay(5000);
        
        // Take screenshot of repository selection
        await page.screenshot({ path: 'vercel-repos.png', fullPage: true });
        console.log('📸 Repository selection screenshot saved');
        
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
          console.log('✅ Found ClaudeTest repository, importing...');
          await page.evaluate((button) => {
            button.click();
          }, repoButton);
          
          // Wait for configuration page
          await delay(5000);
          
          // Take screenshot of configuration
          await page.screenshot({ path: 'vercel-config.png', fullPage: true });
          console.log('📸 Configuration screenshot saved');
          
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
            console.log('✅ Found Deploy button, starting deployment...');
            await page.evaluate((button) => {
              button.click();
            }, deployButton);
            
            // Wait for deployment to start
            console.log('⏳ Waiting for deployment to start...');
            await delay(10000);
            
            // Take screenshot of deployment status
            await page.screenshot({ path: 'vercel-deployment.png', fullPage: true });
            console.log('📸 Deployment screenshot saved');
            
            // Try to get the deployment URL
            console.log('🔍 Looking for deployment URL...');
            
            // Wait longer for deployment to complete
            await delay(30000);
            
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
                link.href && link.href.includes('vercel.app')
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
              console.log('⚠️ Deployment initiated but URL not found yet.');
              console.log('📋 Please check the Vercel dashboard manually for the deployment URL.');
              
              // Take final screenshot
              await page.screenshot({ path: 'vercel-final.png', fullPage: true });
              console.log('📸 Final screenshot saved as vercel-final.png');
              
              return null;
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
      console.log('🔄 Keeping browser open for 15 seconds to view result...');
      await delay(15000);
      await browser.close();
    }
  }
}

// Run the deployment
console.log('🚀 TechFlow Solutions Vercel Deployment');
console.log('=======================================');
console.log('');
console.log('📋 Instructions:');
console.log('1. This script will open a browser window');
console.log('2. Please ensure you are logged in to Vercel');
console.log('3. The script will automatically handle the deployment process');
console.log('');

deployToVercel()
  .then(url => {
    if (url) {
      console.log(`\n🎉 SUCCESS! TechFlow Solutions is now live at: ${url}`);
      console.log('\n📋 Next steps:');
      console.log('1. Visit the URL to verify the deployment');
      console.log('2. Check the /brand-guide page');
      console.log('3. Test the responsive design');
      console.log('4. Set up a custom domain if desired');
    } else {
      console.log('\n⏳ Deployment process completed.');
      console.log('📋 Please check the Vercel dashboard for the deployment URL.');
      console.log('🔍 Look for screenshots in the current directory for debugging.');
    }
  })
  .catch(error => {
    console.error('\n❌ Deployment automation failed:', error.message);
    console.log('\n🔍 Troubleshooting:');
    console.log('1. Check if you are logged in to Vercel');
    console.log('2. Verify the GitHub repository exists and is accessible');
    console.log('3. Check the screenshot files for visual debugging');
    console.log('4. Try running the script again after a few minutes');
    process.exit(1);
  });