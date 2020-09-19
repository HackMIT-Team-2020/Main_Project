
// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const bucketName = 'Bucket where the file resides, e.g. my-bucket';
// const fileName = 'Path to file within bucket, e.g. path/to/image.png';

// Read a remote image as a text document
const [result] = await client.documentTextDetection(
  `gs://${bucketName}/${fileName}`
);
const fullTextAnnotation = result.fullTextAnnotation;
console.log(fullTextAnnotation.text);
