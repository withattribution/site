
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

client.sendString(template, model, done);

function done (err,response) {
  console.log('Done. : '+JSON.stringify(response));
    res.json('OK');
}
// var client = require('campaign');

// var client = campaign({
//     provider: campaign.providers.mandrill()
// });

// console.log(client);
  // var client = campaign({
  //     from: 'albertotafoya@gmail.com',
  //     trap: 'albertotafoya@gmail.com',
  //     mandrill: { debug: true }
  // });

  // var template = '<p>Some {{data}}</p>';
  // var model = {
  //     to: 'foo@bar.com',
  //     subject: 'Awesome Things',
  //     data: 'interesting stuff'
  // };
  // client.sendString(template, model, done);

};



// function done (err, response) {
//     console.log('Done!', err, response);
// };

