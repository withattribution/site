'use strict';

var _ = require('underscore')._;
var tumblr = require('tumblr');

var oauth = { consumer_key: process.env.TUMBLR_CONSUMER };

exports.tumblr = function(req, res) {
  console.log('in the grid list function: '+req.query.tag);
  var blog = new tumblr.Blog('withattribution.tumblr.com', oauth);

  blog.photo({ limit:req.query.limit, tag:req.query.tag, offset:req.query.offset },
   function(error, response) {
    if (error) {
      throw new Error(error);
    }
    // console.log(response.posts);
    res.json(response.posts);
  });

}