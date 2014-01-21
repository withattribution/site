'use strict';

exports.stripe = function(req,res) {
  console.log('oooooo - mmmmmmmm - ggggggg : event received!');
  console.log(req.body.type);
  console.log(req.query.type);
  // console.log('oooooo - mmmmmmmm - ggggggg : event received!');
  // console.log(req.body);

var campaign = require('campaign');
var client = campaign({
  "mandrill": {
        // "apiKey": "<not provided>",
        "debug": true
    },
    "from": "admin@a-ok.so",
    "trap": "albertotafoya@gmail.com"
    // provider: campaign.providers.mandrill()
});
var template = '<p>Your password reset key is: {{reset}}</p>';
var model = {
    to: 'alberto@important.com',
    subject: 'Password Reset',
    reset: 'q12jFbwJsCKm'
};

function done (err,response) {
  console.log('Done. : '+JSON.stringify(response));
    res.json('OK');
}

client.sendString(template, model, done);



};
