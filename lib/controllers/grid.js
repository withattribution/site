'use strict';

var _ = require('underscore')._;
var tumblr = require('tumblr');

var oauth = { consumer_key: process.env.TUMBLR_CONSUMER };

exports.tumblr = function(req, res) {
  // console.dir("agent: "+req.useragent.isDesktop);

  var blog = new tumblr.Blog('testaok.tumblr.com', oauth);

  blog.posts({ 
    limit: req.query.limit,
    tag: req.query.tag,
    offset: req.query.offset,
    filter: 'text'
  },
   function(error, response) {
    if (error) {
      // throw new Error(error);
    }
    var grid_payload = [];
    _.each(response.posts, function (post) { 
      var picked = _.pick(post,'id','type','caption','video_url','thumbnail_url');
      if(!_.isUndefined(post.photos)) {
        
        if(req.useragent.isDesktop) {
         picked['fullsize_photo_url'] = post.photos[0].original_size.url;
        }
        // picked['photo_url'] = [];
        // picked['photo_url'].push(post.photos[0].original_size.url);
        _.each(post.photos[0].alt_sizes, function (size) {
          if (size.width === 400) {
            // picked['photo_url'].push(size.url);
            picked['mobile_photo_url'] = size.url;
          }
        })
      }
      grid_payload.push(picked);
    });

    res.json(grid_payload);
  });

}