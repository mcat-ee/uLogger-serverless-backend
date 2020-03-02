'use strict';

module.exports.hello = async (event) => {
  console.log("\n\nCHECKING EVENT");

  console.log(JSON.stringify(event));
  var authorizationHeader = event.headers.Authorization;

  var username = null;
  var password = null;

  if (!authorizationHeader) {
    //Blargh, do nothing
    console.log("No auth header detected");
  } else {
    var encodedCreds = authorizationHeader.split(' ')[1];
    var plainCreds = (new Buffer.from(encodedCreds, 'base64')).toString().split(':');
    username = plainCreds[0];
    password = plainCreds[1];
    console.log("USER:",username);
    console.log("PASSWORD:",password);
  }
  var response = {
	statusCode: 200,
        body: JSON.stringify({
         error: false,
        })
  };

  if(event.body.indexOf("action=addtrack")!=-1){
    response.body = JSON.stringify({trackid: 1, error: false});
  }
  //altitude=94.2606533826858&lon=138.660570982078&speed=0.369515717029572&time=1583142373&action=addpos&trackid=1&lat=-34.900721192195&accuracy=48.0&provider=gps
  
  if(event.body.indexOf("action=addpos")!=-1){
    var terms = event.body.split("&");
    var data = {};
    terms.map(item => {
       var innerTerms = item.split("=");
       data[innerTerms[0]] = innerTerms[1];
    })
    console.log("\n\n\n");
    console.log(data);
    console.log("\n\n\n");
  }
  return response;
  
  /*return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
  */
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
