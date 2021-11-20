/*if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function(fn, scope) {
    for(var i = 0, len = this.length; i < len; ++i) {
      fn.call(scope, this[i], i, this);
    }
  };
}

*/

const imageDownloader = require('image-downloader');
var URLS;
const download = require('image-downloader');
const google = require('googleapis').google;
const customSearch = google.customsearch('v1');
const googleSearchCredentials = {
"apiKey":"AIzaSyCQq551DW9ym7bb5yk72orqGRVXvv43TEE",
"searchEngineId": "745700e34730c2d5e"
};
const readline = require('readline-sync')
const sentenceBoundaryDetection = require('sbd')
const watsonApiKey = "NAmiPIdJT1hHNZlwyRyRWYCMyJg_a5VGXt6QF53cizO0"
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js') 
const nlu = new NaturalLanguageUnderstandingV1({
  iam_apikey: watsonApiKey,
  version: '2018-04-05',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
})
const contents = [ ];
	function start(){

const saiarosa = askAndReturnSearchTerm()
breakContentIntoSentences(saiarosa)
fetchKeywordsOfAllSentences(saiarosa, fetchImagesOfAllSentences)
console.log(contents)
console.log('> [image-robot] Starting...')
// fetchImagesOfAllSentences()
//downloadAllImages()
console.log(contents)
//console.log(saiarosa)
//1console.log(dowloadedImages)
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   
	function askAndReturnSearchTerm() {
    return readline.question('Type the hole text you want to get the images: ')
  }
	function breakContentIntoSentences(content) {

    const sentences = sentenceBoundaryDetection.sentences(content);
    sentences.forEach((sentence) => {
      contents.push({
        text: sentence,
        keywords: [],
        images: []
      })
//console.log(contents.slice(-1))
    })
  }

async function fetchKeywordsOfAllSentences(content, callback) {
    console.log('> [text-robot] Starting to fetch keywords from Watson')

    for (const sentence of contents) {
      console.log(`> [text-robot] Sentence: "${sentence.text}"`)

      sentence.keywords = await fetchWatsonAndReturnKeywords(sentence.text)
//console.log(sentence.keywords)
      console.log(`> [text-robot] Keywords: ${sentence.keywords.join(', ')}\n`)
    }
callback(downloadAllImages)	
  }

  async function fetchWatsonAndReturnKeywords(sentence) {
    return new Promise((resolve, reject) => {
      nlu.analyze({
        text: sentence,
        features: {
          keywords: {}
        },
  "language": "pt"

      }, (error, response) => {
        if (error) {
          reject(error)
          return
        }

        const keywords = response.keywords.map((keyword) => {
          return keyword.text
        })

        resolve(keywords)
      })
    })
  }
////--imagens----imagens----imagens----imagens--//
///--imagens----imagens----imagens----imagens--///
//--imagens----imagens----imagens----imagens--////

async function fetchImagesOfAllSentences(callback) {
    for (const sentenceIndex of contents) {
      let query = `${contents.searchTerm} ${sentenceIndex.keywords}`
     // let queri = query.slpit(" ");

      console.log(`> [image-robot] Querying Google Images with: "${query.substring(11)}"`)

      sentenceIndex.images = await fetchGoogleAndReturnImagesLinks(query.substring(11))
      sentenceIndex.googleSearchQuery = query.substring(11)
    }
	callback()
  }

  async function fetchGoogleAndReturnImagesLinks(query) {
    const response = await customSearch.cse.list({
      auth: googleSearchCredentials.apiKey,
      cx: googleSearchCredentials.searchEngineId,
      q: query,
      searchType: 'image',
      num: 1
    })
   let imagesUrl;
//	  let irem = item
if(response.data.items != undefined){
	console.log(response.data.items)
	console.log(response)
	console.log(response.data.items)
    imagesUrl = response.data.items.map((item) => {
      return item.link
    })}

    return imagesUrl
  }

  async function downloadAllImages() {
 const   downloadedImages = []

    for (const sentenceIndex of contents) {

      const images = sentenceIndex.images
if( images != undefined){
      for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
        const imageUrl = images[imageIndex]

        try {
          if (downloadedImages.includes(imageUrl)) {
            throw new Error("Image already downloaded")
          }

          await downloadAndSave(imageUrl, "${sentenceIndex-original.png")
          downloadedImages.push(imageUrl)
//	URLS = URLS + imageUrl
          console.log(`${imageUrl}`)
	//	console.log(dowloadedImages)
		break
        } catch(error) {
       //   console.log(`> [image-robot] [${sentenceIndex}][${imageIndex}] Error (${imageUrl}): ${error}`)
	//	console.log(dowloadedImages)
        }
//console.log(dowloadedImages)
	URLS = URLS +" " + imageUrl
      }
    }
//	  console.log(dowloadedImages)
    }
  }
async function downloadAndSave(url, fileName) {
var fs = require('fs');

fs.writeFile("meuarquive.txt", `${URLS}\r\n`, function(err, result) {
     if(err) console.log('error', err);
   });
//	console.log(URLS)
}
 /* async function downloadAndSave(url, fileName) {
     options={
      url: url,
      dest: `./storage/shared/diretorio_compartilhado/photo.jpg`
    }
download.image(options)
  .then(({ filename }) => {
    console.log('Saved to', filename) 
	  // saved to /path/to/dest/image.jpg
  })
  .catch((err) => console.error(err))
    }
*/
start()
