
module.exports.send = async function (path, callback) {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  const fileName = path;

  // Read a local image as a text document
  const [result] = await client.documentTextDetection(fileName);
  const fullTextAnnotation = result.fullTextAnnotation;
  console.log('Fulltext:')
  console.log(fullTextAnnotation.text);
  if(callback)
  callback(fullTextAnnotation.text)

  // fullTextAnnotation.pages.forEach(page => {
  //   page.blocks.forEach(block => {
  //     console.log(`Block confidence: ${block.confidence}`);
  //     block.paragraphs.forEach(paragraph => {
  //       console.log(`Paragraph confidence: ${paragraph.confidence}`);
  //       paragraph.words.forEach(word => {
  //         const wordText = word.symbols.map(s => s.text).join('');
  //         console.log(`Word text: ${wordText}`);
  //         console.log(`Word confidence: ${word.confidence}`);
  //         word.symbols.forEach(symbol => {
  //           console.log(`Symbol text: ${symbol.text}`);
  //           console.log(`Symbol confidence: ${symbol.confidence}`);
  //         });
  //       });
  //     });
  //   });
  // });
}
if (require.main === module) {
    this.send('public/images/b79ca10bf1508a3a2cd0445ee020a9f21d013d0a.png');
}
