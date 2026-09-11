const fs = require('fs');
const path = require('path');
const https = require('https');

const SITE_URL = 'https://planbotai.app';
const KEY = 'd3b07384d113edec49eaa6238ad5ff00';
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

// Read the out/sitemap.xml to extract URLs
const sitemapPath = path.join(__dirname, '../out/sitemap.xml');

if (!fs.existsSync(sitemapPath)) {
  console.error('Error: sitemap.xml not found in out/ directory. Run build first.');
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const urlMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)];
const urls = urlMatches.map(match => match[1]);

if (urls.length === 0) {
  console.error('No URLs found in sitemap.xml');
  process.exit(1);
}

console.log(`Found ${urls.length} URLs to submit to IndexNow.`);

const payload = JSON.stringify({
  host: 'planbotai.app',
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  console.log(`IndexNow API Response Status: ${res.statusCode}`);
  
  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log('✅ Successfully submitted URLs to IndexNow!');
  } else {
    console.error('❌ Failed to submit URLs to IndexNow.');
  }
  
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error('Error submitting to IndexNow:', error);
});

req.write(payload);
req.end();
