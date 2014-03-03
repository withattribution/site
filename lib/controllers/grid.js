'use strict';

var _ = require('underscore')._;
var tumblr = require('tumblr');

var oauth = { consumer_key: process.env.TUMBLR_CONSUMER };

exports.tumblr = function(req, res) {

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
    var grid_posts = [];

    _.each(response.posts, function (post) { 
      var picked = _.pick(post,'id','type','caption','video_url','thumbnail_url');
      if(!_.isUndefined(post.photos)) {

        if(req.useragent.isDesktop || req.useragent.isiPad || req.useragent.isAndroidTablet) {
         picked['fullsize_photo_url'] = post.photos[0].original_size.url;
        }
        // picked['photo_url'] = [];
        // picked['photo_url'].push(post.photos[0].original_size.url);
        _.each(post.photos[0].alt_sizes, function (size) {
          if (size.width > 350 && size.width <= 400) {
            // picked['photo_url'].push(size.url);
            picked['mobile_photo_url'] = size.url;
          }
        })
      }
      grid_posts.push(picked);
    });

    var grid_payload = {};

    grid_payload['posts'] = grid_posts;
    grid_payload['total_posts'] = response.total_posts;
    
    res.json(grid_payload);
  });

}