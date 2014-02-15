'use strict';

var _ = require('underscore')._;
var tumblr = require('tumblr');

var oauth = { consumer_key: process.env.TUMBLR_CONSUMER };

exports.tumblr = function(req, res) {
  var blog = new tumblr.Blog('testaok.tumblr.com', oauth);

  blog.posts({ limit:req.query.limit, tag:req.query.tag, offset:req.query.offset },
   function(error, response) {
    if (error) {
      // throw new Error(error);
    }

    var grid_payload = [];

    _.each(response.posts, function (post) { 
      var picked = _.pick(post,'id','type','caption','video_url','thumbnail_url');
      // var picked = _.pick(post,'id','type','caption','video_url','thumbnail_url','photos');
      // console.log("picked: "+JSON.stringify(picked));
      if(!_.isUndefined(post.photos)) {
        picked['photo_url'] = [];
        picked['photo_url'].push(post.photos[0].original_size.url);
        _.each(post.photos[0].alt_sizes, function (size) {
          if (size.width === 400) {
            picked['photo_url'].push(size.url);
          }
        })
      }

      grid_payload.push(picked);
      // console.log("picked: "+JSON.stringify(grid_payload));
      // console.log(" --- ");
      // console.log(" --- ");
      // console.log(" --- ");
    });


    res.json(grid_payload);
  });

}