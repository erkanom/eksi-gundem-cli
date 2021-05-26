const cheerio = require('cheerio');

let axios = require('axios');


  async function scrape()  {
   const contentList=[];
   
    let what="";
  await  axios.get('https://eksisozluk.com/')
    .then((response) => {
        if(response.status === 200) {
       
            what=response.data;
          
    }
    }, (error) => console.log(err) );

    
    const $ = cheerio.load(what);


            const topicList = $("#partial-index > ul>li>a");
          
            topicList.each((i, element) => {
                let content = $(element).text();
                let link = $(element).attr('href');
                let index = link.indexOf('?a');
                let originalLink = link.substring(0, index);
                contentList.push({ topic: content, link: originalLink });
                



            });
          
 
return contentList;
}

module.exports=scrape;

 
 
