import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';
export default defineConfig({
 timeout:90000,expect:{timeout:25000},
 testDir:'./test',testMatch:['browser.spec.js','accounts.browser.spec.js'],fullyParallel:false,
 use:{baseURL:'http://localhost:5173',launchOptions:{executablePath:process.env.BROWSER_PATH || (existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']}},
 webServer:{command:'npm run preview -- --port 5173',url:'http://localhost:5173',reuseExistingServer:true,timeout:120000,env:{DATA_DIR:`/tmp/pratica-e2e-${process.pid}`}}
});
