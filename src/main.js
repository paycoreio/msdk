// const s = require("@paycore/merchant-sdk-js");
import s from '"@paycore/merchant-sdk-js"';
// const { jsdocMd } = require("jsdoc-md");

// jsdocMd({
//   sourceGlob: "index.js",
//   markdownPath: "readme.md",
//   targetHeading: "Docs"
// });

let x = new s({
  apiKey: 'com_pk_live_v2g4OLf68_z9QB7smwg893JYRXMF0a_i5W1DQUpDzzs',
});

try {
  let data = x
    .makePaymentPrerequest('USD')
    .then(res => console.log(res))
    .catch(e => {
      console.log('Error', e);
    });
  console.log('data', data);
} catch (e) {
  console.log('error', e);
}
