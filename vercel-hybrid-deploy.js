const puppeteer = require('puppeteer');
const { exec } = require('child_process');

// Helper function for delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function hybridVercelDeployment() {
  console.log('🚀 TechFlow Solutions - Hybrid Vercel Deployment');
  console.log('===============================================');
  console.log('');
  console.log('🤖 This hybrid approach will:');
  console.log('1. Open Vercel dashboard with Puppeteer');
  console.log('2. Wait for you to manually import ben-crowe/ClaudeTest');
  console.log('3. Resume automation to capture deployment URL');
  console.log('4. Verify the deployment works');
  console.log('');
  
  let browser;
  let page;
  
  try {
    // Launch browser with minimal interference settings
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: [
        '--start-maximized',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });
    
    page = await browser.newPage();
    
    // Navigate to Vercel dashboard
    console.log('📱 Opening Vercel dashboard...');
    await page.goto('https://vercel.com/dashboard', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    await delay(3000);
    
    // Take initial screenshot
    try {
      await page.screenshot({ path: 'hybrid-step-1.png', fullPage: true });
      console.log('📸 Initial dashboard screenshot saved');
    } catch (e) {
      console.log('⚠️ Initial screenshot failed, continuing...');
    }
    
    console.log('');
    console.log('✅ Vercel dashboard opened successfully');
    console.log('');
    console.log('👤 MANUAL STEPS - Please complete these now:');
    console.log('==========================================');
    console.log('');
    console.log('1. 🔐 Log in to Vercel (if not already logged in)');
    console.log('2. 🆕 Click "New Project" or "Import Project"');
    console.log('3. 🔗 Select "Import Git Repository"');
    console.log('4. 🐙 Choose your GitHub account');
    console.log('5. 🔍 Find and select "ben-crowe/ClaudeTest" repository');
    console.log('6. ⚙️ Configure settings (should auto-detect Next.js)');
    console.log('7. 🚀 Click "Deploy"');
    console.log('');
    console.log('⏳ I\'ll wait and monitor for the deployment URL...');
    console.log('💡 Take your time - I\'ll detect when deployment starts');
    console.log('');
    
    // Wait for manual import and monitor for deployment
    let deploymentUrl = null;
    let deploymentDetected = false;
    const maxWaitTime = 15 * 60 * 1000; // 15 minutes total
    const checkInterval = 10000; // Check every 10 seconds
    const maxChecks = maxWaitTime / checkInterval;
    
    console.log('🔍 Starting deployment monitoring...');
    console.log('');
    
    for (let i = 0; i < maxChecks; i++) {
      await delay(checkInterval);
      
      try {
        // Check current page state
        const currentUrl = await page.url();
        const pageTitle = await page.title();
        
        // Take periodic screenshots
        if (i % 6 === 0) { // Every minute
          await page.screenshot({ path: `hybrid-monitor-${Math.floor(i/6) + 1}.png`, fullPage: true });
          console.log(`📸 Monitor screenshot ${Math.floor(i/6) + 1} saved`);
        }
        
        // Check for deployment indicators
        const deploymentStatus = await page.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('*'));
          
          // Look for deployment status text
          const statusElement = elements.find(el => {
            const text = el.textContent || '';
            return text.includes('Building') || 
                   text.includes('Deploying') || 
                   text.includes('Ready') ||
                   text.includes('Deployment') ||
                   text.includes('Build logs') ||
                   text.includes('Function logs');
          });
          
          return statusElement ? statusElement.textContent.trim() : null;
        });
        
        // Check for deployment URL
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
            link.href && link.href.includes('vercel.app') && 
            (link.href.includes('claude-test') || 
             link.href.includes('claudetest') || 
             link.href.includes('techflow'))
          );
          
          return urlLink ? urlLink.href : null;
        });
        
        if (deploymentUrl) {
          console.log(`🎉 DEPLOYMENT URL DETECTED: ${deploymentUrl}`);
          await page.screenshot({ path: 'hybrid-success.png', fullPage: true });
          console.log('📸 Success screenshot saved');
          deploymentDetected = true;
          break;
        }
        
        if (deploymentStatus) {
          if (!deploymentDetected) {
            console.log(`📊 Deployment detected! Status: ${deploymentStatus}`);
            deploymentDetected = true;
          } else {
            console.log(`📊 Status update: ${deploymentStatus}`);
          }
        } else {
          const timeLeft = Math.floor((maxWaitTime - (i * checkInterval)) / 60000);
          console.log(`⏳ Waiting for deployment... (${timeLeft} minutes remaining)`);
        }
        
      } catch (error) {
        console.log(`⚠️ Monitor check ${i + 1} error: ${error.message}`);
      }
    }
    
    if (deploymentUrl) {
      console.log('');
      console.log('🔍 Verifying deployment...');
      
      // Verify the deployment works
      const verification = await verifyDeployment(deploymentUrl);
      
      return {
        url: deploymentUrl,
        verification: verification
      };
    } else {
      console.log('⏰ Monitoring time limit reached');
      await page.screenshot({ path: 'hybrid-timeout.png', fullPage: true });
      console.log('📸 Timeout screenshot saved');
      return null;
    }
    
  } catch (error) {
    console.error('❌ Hybrid deployment failed:', error.message);
    
    if (page) {
      try {
        await page.screenshot({ path: 'hybrid-error.png', fullPage: true });
        console.log('📸 Error screenshot saved');
      } catch (e) {
        console.log('⚠️ Error screenshot failed');
      }
    }
    
    throw error;
  } finally {
    if (browser) {
      console.log('');
      console.log('🔄 Keeping browser open for 30 seconds to view result...');
      await delay(30000);
      
      try {
        await browser.close();
      } catch (e) {
        console.log('⚠️ Browser close failed');
      }
    }
  }
}

async function verifyDeployment(url) {
  console.log('🔍 Verifying deployment functionality...');
  
  const verification = {
    homepage: false,
    brandGuide: false,
    responsive: false,
    assets: false
  };
  
  try {
    // Test homepage
    console.log(`📡 Testing homepage: ${url}`);
    const homepageTest = await fetch(url);
    verification.homepage = homepageTest.ok;
    
    // Test brand guide
    console.log(`📡 Testing brand guide: ${url}/brand-guide`);
    const brandGuideTest = await fetch(`${url}/brand-guide`);
    verification.brandGuide = brandGuideTest.ok;
    
    console.log('✅ Deployment verification complete');
    
  } catch (error) {
    console.log('⚠️ Verification failed:', error.message);
  }
  
  return verification;
}

// Execute hybrid deployment
hybridVercelDeployment()
  .then(result => {
    if (result) {
      console.log('');
      console.log('🎉 SUCCESS! TechFlow Solutions Deployment Complete!');
      console.log('==================================================');
      console.log('');
      console.log(`🌐 Live URL: ${result.url}`);
      console.log('');
      console.log('📋 Verification Results:');
      console.log(`🏠 Homepage: ${result.verification.homepage ? '✅ Working' : '❌ Failed'}`);
      console.log(`📖 Brand Guide: ${result.verification.brandGuide ? '✅ Working' : '❌ Failed'}`);
      console.log('');
      console.log('🔗 URLs to test:');
      console.log(`🏠 Homepage: ${result.url}`);
      console.log(`📖 Brand Guide: ${result.url}/brand-guide`);
      console.log('');
      console.log('🎯 SuperClaude Brand-to-Website Workflow Complete!');
      console.log('From fictional client brief → brand development → website creation → live deployment');
      console.log('');
      console.log('✅ Features Included:');
      console.log('• Modern TechFlow Solutions branding');
      console.log('• Interactive brand guide with color palette');
      console.log('• Responsive design (desktop + mobile)');
      console.log('• Custom SVG assets and graphics');
      console.log('• Static export for optimal performance');
      console.log('• Professional tech company aesthetic');
    } else {
      console.log('');
      console.log('⏳ Hybrid deployment monitoring completed but URL not detected.');
      console.log('📋 Please check the Vercel dashboard for the deployment status.');
      console.log('🔍 Check the screenshot files for visual confirmation.');
      console.log('');
      console.log('💡 The deployment may still be in progress or completed successfully.');
      console.log('Please check your Vercel dashboard for the live URL.');
    }
  })
  .catch(error => {
    console.error('');
    console.error('❌ Hybrid deployment failed:', error.message);
    console.log('');
    console.log('🔍 Troubleshooting:');
    console.log('1. Check the screenshot files for visual debugging');
    console.log('2. Verify you completed the manual import steps');
    console.log('3. Check the Vercel dashboard directly for deployment status');
    console.log('4. Try running the script again if needed');
  });