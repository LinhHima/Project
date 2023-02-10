const Axios = require("axios");

const categoriesSimilarWeb = [
  // {
  //   prefix: "adult",
  //   list: [""],
  // },
  // {
  //   prefix: "arts-and-entertainment",
  //   list: ["animation-and-comics", "arts-and-entertainment", "books-and-literature", "humor", "music", "performing-arts", "tv-movies-and-streaming", "visual-arts-and-design"]
  // },
  // {
  //   prefix: "business-and-consumer-services",
  //   list: ["business-and-consumer-services", "business-services", "marketing-and-advertising", "online-marketing", "publishing-and-printing", "real-estate", "relocation-and-household-moving", "shipping-and-logistics", "textiles"] 
  // },
  // {
  //   prefix: "computers-electronics-and-technology",
  //   list: ["advertising-networks", "computer-hardware", "computer-security", "computers-electronics-and-technology", "consumer-electronics", "email", "file-sharing-and-hosting", "graphics-multimedia-and-web-design", "programming-and-developer-software", "search-engines", "social-networks-and-online-communities", "telecommunications", "web-hosting-and-domain-names"]
  // },
  // {
  //   prefix: 'sports',
  //   list: [
  //     'american-football',
  //     'baseball',
  //     'basketball',
  //     'boxing',
  //     'climbing',
  //     'cycling-and-biking',
  //     'extreme-sports',
  //     'fantasy-sports',
  //     'fishing',
  //     'golf',
  //     'hunting-and-shooting',
  //     'martial-arts',
  //     'rugby',
  //     'running',
  //     'soccer',
  //     'sports',
  //     'tennis',
  //     'volleyball',
  //     'water-sports',
  //     'winter-sports'
  //   ]
  // },
  // {
  //   prefix: 'science-and-education',
  //   list: [
  //     'astronomy',
  //     'biology',
  //     'business-training',
  //     'chemistry',
  //     'earth-sciences',
  //     'education',
  //     'environmental-science',
  //     'grants-scholarships-and-financial-aid',
  //     'history',
  //     'libraries-and-museums',
  //     'literature',
  //     'math',
  //     'philosophy',
  //     'physics',
  //     'public-records-and-directories',
  //     'science-and-education',
  //     'social-sciences',
  //     'universities-and-colleges',
  //     'weather'
  //   ]
  // },
  // {
  //   prefix: 'food-and-drink',
  //   list: [
  //     'beverages',
  //     'cooking-and-recipes',
  //     'food-and-drink',
  //     'groceries',
  //     'restaurants-and-delivery',
  //     'vegetarian-and-vegan'
  //   ]
  // },
  // {
  //   prefix: 'travel-and-tourism',
  //   list: [
  //     'accommodation-and-hotels',
  //     'air-travel',
  //     'car-rentals',
  //     'ground-transportation',
  //     'tourist-attractions',
  //     'transportation-and-excursions',
  //     'travel-and-tourism'
  //   ]
  // },
  // {
  //   prefix: 'health',
  //   list: [
  //     'addictions',
  //     'alternative-and-natural-medicine',
  //     'biotechnology-and-pharmaceuticals',
  //     'childrens-health',
  //     'dentist-and-dental-services',
  //     'developmental-and-physical-disabilities',
  //     'geriatric-and-aging-care',
  //     'health',
  //     'health-conditions-and-concerns',
  //     'medicine',
  //     'mens-health',
  //     'mental-health',
  //     'nutrition-diets-and-fitness',
  //     'public-health-and-safety',
  //     'womens-health',
  //     'pharmacy'
  //   ]
  // },
  // {
  //   prefix: 'pets-and-animals',
  //   list: [
  //     'animals',
  //     'birds',
  //     'fish-and-aquaria',
  //     'horses',
  //     'pet-food-and-supplies',
  //     'pets',
  //     'pets-and-animals'
  //   ]
  // },
  {
    prefix: 'law-and-government',
    list: [
      'government',
      'immigration-and-visas',
      'law-and-government',
      'law-enforcement-and-protective-services',
      'legal',
      'national-security'
    ]
  }
];

const time = ["united-kingdom", "united-states", "australia", 
                "canada", "ireland", "new-zealand", "netherlands"];

let cheerio = require('cheerio');
var fs = require("fs");

let data = [];
const workingWebsite = [];

const fetchTitle = async (region, title, prefix) => {
  try{
    const clientAxios = Axios.create({
      timeout: 5000,
    });
    const response = await clientAxios.get(`https://www.similarweb.com/top-websites/${region}/category/${prefix}/${title}/`, { headers: {
      Host: "www.similarweb.com",
      Accept: "*/*",
      "accept-encoding": "*"
    }})
    if(response.status === 200) {
      const $ = cheerio.load(response.data, { decodeEntities: false });

      for(var i = 1; i < 51; i++){
        const titleI = $(`body > div.wrapperBody--topRanking.wrapper-body.js-wrapperBody > main > div > section.topRankingSection > div > div.topWebsites-table > div.topRankingGrid > table > tbody > tr:nth-child(${i}) > td.topRankingGrid-cell.topWebsitesGrid-cellWebsite.showInMobile > div > a.topRankingGrid-title.js-tooltipTarget > span`);
        const realTitle = titleI.text().trim();
        data.push(realTitle);
      }
    }
  } catch(e) {
  }
}

const fetchRegion = async (region, ele) => {
  for(const title of ele.list){
    await fetchTitle(region, title, ele.prefix);
  }
}

const fetchWebData = async (d, ele) => {
  try{
    const item = {};
    const clientAxios = Axios.create({
      timeout: 5000,
    });
    console.log(`Fetching: https://${d}/`)
    const response = await clientAxios.get(`https://${d}/`, { headers: {
      Accept: "*/*",
      "accept-encoding": "*"
    }});
    const $ = cheerio.load(response.data, { decodeEntities: false, normalizeWhitespace: true });

    $("script").remove();
    $("style").remove();
    $('*').each(function() {      
      this.attribs = {}; 
    });
    const content = $.html().replace(/<[^>]*>/g, " ").replaceAll("&nbsp;", "").replaceAll("&amp;", "")
    .replaceAll("&gt;", "").replaceAll("&lt;", "")
    .replace(/\s\s+/g, ' ')
    .trim();
    if(content.length <= 1000){
      return;
    }
    item.type = ele.prefix;
    item.url = d;
    item.content = content;
    console.log(`Fetching: https://${d}/ OK`);

    workingWebsite.push(item);
  } catch(e) {
  }
}

const run = async (ele) => {
  for(checkRegion of time){
    await fetchRegion(checkRegion, ele);
  }
  
  data = [...new Set(data)];

  // let promiseWebData = [];

  for(const d of data) {
    await fetchWebData(d, ele);
    // promiseWebData.push(fetchWebData(d, ele));
  }

  // await Promise.all(promiseWebData);
}

const test = async () => {
  for (const ele of categoriesSimilarWeb) {
    await run(ele);
  }

  workingWebsite.sort((a, b) => a.type - b.type);
  
  fs.writeFileSync(`data.json`, JSON.stringify(workingWebsite, false, 1));
}
test();
