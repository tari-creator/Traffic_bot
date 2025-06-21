import fetch from 'node-fetch';
import fs from 'fs';
import UserAgent from 'user-agents';

const links = [
  "https://www.profitableratecpm.com/d6wswtc5?key=9432ba05bad9ee51ab6d4c2cf968c878",
  "https://www.profitableratecpm.com/zwc4gtbv?key=7bb799656e3eb15c8701f81475bfe393",
  "https://www.profitableratecpm.com/zvm9evrs?key=26520e94197579f13c3fa2b221688cbb",
  "https://www.profitableratecpm.com/wt4fu98j?key=2b1df2ea4583ed6fb8763c044cfb337a"
];

let totalVisits = 0;

async function visitLink(url) {
  const userAgent = new UserAgent().toString();
  try {
    const response = await fetch(`https://api.scraperapi.com/?api_key=19090d6beb1fb14e71d21fd7bcc67150&url=${encodeURIComponent(url)}`, {
      headers: {
        'User-Agent': userAgent
      }
    });

    totalVisits++;
    fs.writeFileSync('visit-count.txt', `Total visits: ${totalVisits}`);
    console.log(`Visited: ${url} | Status: ${response.status} | UA: ${userAgent}`);
  } catch (err) {
    console.error(`Error visiting ${url}:`, err.message);
  }
}

async function start() {
  while (true) {
    for (const url of links) {
      await visitLink(url);
      await new Promise(resolve => setTimeout(resolve, 9000)); // 9 seconds delay
    }
  }
}

start();
