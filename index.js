let Parser = require('rss-parser');
let parser = new Parser();

(async () => {
  let feed = [];
  const rssLinks = process.argv.splice(2);

  if (rssLinks.length === 0) return console.log('Please input one or more rss links!');

  for (const link of rssLinks) {
    feed = feed.concat((await parser.parseURL(link)).items);
  };

  feed.sort((a, b) => {
    if (new Date(a.isoDate) > new Date(b.isoDate)) return -1;
    if (new Date(a.isoDate) < new Date(b.isoDate)) return 1;
    return 0;
  });

  for (item of feed) 
    console.log(`Title: ${item.title || 'N/A'} \nDescription: ${item.description || 'N/A'} \nDate: ${item.pubDate || 'N/A'} \nLink: ${item.link || 'N/A'} \n`);
})();