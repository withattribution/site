'use strict';

var Easypost = require('node-easypost')(process.env.AOK_EASYPOST_TEST);

var _ = require('underscore')._;

function validateShippingForm(request) {
  request.checkBody('firstName', 'firstName is required').notEmpty();
  request.checkBody('lastName', 'lastName is required').notEmpty();
  request.checkBody('lineOne', 'lineOne is required').notEmpty();
  request.checkBody('city', 'city is required').notEmpty();
  request.checkBody('state', 'state is required').notEmpty();
  request.checkBody('zipcode', 'zipcode should only contain numbers').isNumeric();

  return request.validationErrors();
}

exports.rates = function(req, res) {
//   var errors = validateShippingForm(req) 
//   if(errors) {
//     console.log('errors');
//     res.json(400, errors);
//     return;
//   }

  // var toAddress = {
  //   name: req.body.firstName +' '+ req.body.lastName,
  //   street1: req.body.lineOne +' '+req.body.lineTwo,
  //   city: req.body.city,
  //   state: req.body.state,
  //   zip: req.body.zipcode,
  //   country: "US"
  // }

  var toAddress = {
      name: "bro town",
      street1: "13 alamo creek dr",
      city: "santa fe",
      state: "NM",
      zip: "87506",
      country: "US"
  };

  var fromAddress = {
      company: "Studio A-OK",
      street1: "377 South 3rd Street",
      street2: "Suite 2",
      city: "Brooklyn",
      state: "NY",
      zip: "11211",
      country: "US",
      phone: "505-572-2680"
  };

  // verify address
  Easypost.Address.create(toAddress, function(err, toAddress) {
      toAddress.verify(function(err, response) {
          if (err) {
              console.log('Address is invalid.');
          } else if (response.message !== undefined && response.message !== null) {
              console.log('Address is valid but has an issue: ', response.message);
              var verifiedAddress = response.address;
          } else {
              console.log('address valid');
              var verifiedAddress = response;
          }
      });
  });

  // set parcel
  Easypost.Parcel.create({
      predefined_package: "InvalidPackageName",
      weight: 21.2
  }, function(err, response) {
      console.log(err);
  });

  var parcel = {
      length: 10.2,
      width: 7.8,
      height: 4.3,
      weight: 21.2
  };

  // create shipment
  Easypost.Shipment.create({
      to_address: toAddress,
      from_address: fromAddress,
      parcel: parcel
      // customs_info: customsInfo
  }, function(err, shipment) {
      res.json(200, 
      {
        'status'  : (err) ? 'error' : 'success',
        'data'    : shipment.rates,
        'message' : null
      });
  });
};

exports.purchase = function(req, res){
  Easypost.Shipment.retrieve({ id: req.body.ship_id }, 
    function(result, shipment) {
    // console.log("shipment retrieval result: "+JSON.stringify(shipment));
    // console.log("lowest rate: "+JSON.stringify(shipment.lowestRate(['USPS'])) );
      var rateObj = _.find(shipment.rates, function(obj) { 
        return obj.id === req.body.rate_id;
      });

      // console.log("underscore says this is the rate object: "+JSON.stringify(rateObj));
      shipment.buy({rate:rateObj}, 
          function(err, shipment) {
          if (err) {
            console.log('errorrrrred: '+JSON.stringify(err));
          }else {
            console.log('ship-track: '+shipment.tracking_code);
            console.log('ship-label: '+shipment.postage_label.label_url);
          }
      });
    res.json('OK');
  });
};

// exports.retrieve = function(req, res) {
//   console.log('in retrieve');
//   var shipId = {"id": "shp_t4E9Y7C9"};

//   Easypost.Shipment.retrieve({
//       id: "shp_t4E9Y7C9"
//   }, function(result, shipment) {
//     console.log("shipment retrieval result: "+JSON.stringify(shipment));
//     res.json('OK');
//   });
// };
