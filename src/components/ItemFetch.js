import { HSdomain, BFdomain, MFCdomain, CORS } from './Constants';
import cheerio from 'cheerio';
import axios from 'axios';

export default function ItemFetch(props) {
  const fetchHS = async (url) => {
    const itemID = url.substr(url.length - 8);
    const itemType = itemID.substring(2, 4);
    const item = [];

    console.log("Fetching info from Hobby Search by ID...");
    const res1 = await axios.get(`${CORS + HSdomain}/eng/${itemID}`);
    const $1 = cheerio.load(res1.data);
    console.log("Success!");

    item['HSurl'] = url;
    item['itemID'] = itemID;
    item['HStitle'] = $1('.h2_itemDetail').text();
    item['HSprice'] = $1('#masterBody_trPrice .tdItemDetail span span').first().text().replace(/([0-9])([a-z])/, '$1 $2');
    item['HSstock'] = (($1('.cart_button2').html() != null) ? 'Out of Stock' : 'In Stock');
    item['image'] = `${HSdomain}/itbig${itemType}/${itemID}.jpg`;
    item['JAN'] = $1('#masterBody_trJanCode td').text().match(/[0-9]+/)[0];

    item['MFCurl'] = MFCdomain + item['JAN'];

    console.log("Fetching info from buyfriend by JAN code...");
    const res2 = await axios.get(CORS + BFdomain + item.JAN);
    const $2 = cheerio.load(res2.data);
    console.log("Success!");

    item['AAurl'] = $2('.new_item a').attr('href').match(/(=)(.+)/)[2];

    console.log("Fetching stock from AmiAmi...");
    const res3 = await axios.get(CORS + BFdomain + item.AAurl)
    const $3 = cheerio.load(res3.data);
    console.log("Success!");

    const infoClass = '.item_detail_right';

    item['AAprice'] = $3(infoClass).first().text().match(/Price: ([0-9]+ [A-Z]+)/)[1].replace(/([0-9]+)(.{7})/, '$1,$2');
    item['AAstock'] = $3(infoClass).text().match(/Stock Available: ([0-9]+)/)[1];
    item['release'] = $3(infoClass).text().match(/Date: ([a-zA-Z]+-[0-9]+)/)[1];

    return item;
  }

  const fetchAA = async (url) => {
    console.log("Fetching info from amiami by ID...");
    const res1 = await axios.get(CORS + BFdomain + url);
    const $1 = cheerio.load(res1.data);
    console.log("Success!");

    const item = [];
    const infoClass = '.item_detail_right';

    item['AAurl'] = url;
    item['itemID'] = $1('h3').text().match(/(?:scode=|gcode=)([a-zA-Z]+-[a-zA-Z0-9-]+)/)[1];
    item['image'] = $1('.item_detail_left img').first().attr('src');
    item['AAtitle'] = $1(`${infoClass} div`).first().text();
    item['AAprice'] = $1(infoClass).text().match(/Price: ([0-9]+ [A-Z]+)/)[1].replace(/([0-9]+)(.{7})/, '$1,$2');
    item['AAstock'] = $1(infoClass).text().match(/Stock Available: ([0-9]+)/)[1];
    item['release'] = $1(infoClass).text().match(/Release Date: (.+)/)[1];
    const JAN = $1('script')[0].children[0].data.match(/jan=([0-9]+)/)[1];
    item['JAN'] = JAN;
    item['MFCurl'] = MFCdomain + JAN;

    const res2 = await axios.get(`${CORS + HSdomain}/eng/search?searchkey=${item.JAN}`);
    const $2 = cheerio.load(res2.data)

    if ($2('#masterBody_pnlNonSearch').html() != null) {
      item['HSstock'] = item['HSurl'] = item['HSprice'] = 'N/A';
    } else {
      item['HSstock'] = (($2('.cart_button2').html() != null) ? 'Out of Stock' : 'In Stock');

      const resURL = $2('link[rel=alternate]').attr('href');

      if (resURL.includes('search')) {
        item['HSurl'] = HSdomain + $2('.ListItemName a').attr('href');
        item['HSprice'] = $2('#masterBody_ilList_lvList_ctrl0_lblVal2_2_0 span').text();
      } else {
        item['HSurl'] = resURL;
        item['HSprice'] = $2('#masterBody_trPrice .tdItemDetail span span').first().text().replace(/([0-9])([a-z])/, '$1 $2');
      }
    }

    return item;
  }

  const fetchStock = async (item) => {
    console.log('Fetching stock from AA...');
    const res1 = await axios.get(CORS + BFdomain + item.AAurl);
    const $1 = cheerio.load(res1.data);
    item['AAstock'] = $1('.item_detail_right').text().match(/Stock Available: ([0-9]+)/)[1];
    console.log('AA updated!');
    if (item.HSstock !== 'N/A') {
      console.log('Fetching stock from HS...');
      const res2 = await axios.get(`${CORS + HSdomain}/eng/search?searchkey=${item.JAN}`);
      const $2 = cheerio.load(res2.data)
      item['HSstock'] = (($2('.cart_button2').html() != null) ? 'Out of Stock' : 'In Stock');
      console.log('HS updated!');
    }
    return item;
  }

  if (typeof props === 'string') {
    if (props.includes('1999.co.jp')) {
      return fetchHS(props);
    } else if (props.includes('amiami')) {
      return fetchAA(props);
    } else {
      return console.log('Invalid URL');
    }
  } else if (props.hasOwnProperty('AAurl')) {
    return fetchStock(props);
  } else if (Array.isArray(props)) {
    return props.map(item => {
      return (item.url.includes('1999.co.jp')) ? fetchHS(item.url) : fetchAA(item.url);
    })
  }
}