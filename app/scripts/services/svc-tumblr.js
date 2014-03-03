'use strict';

angular.module('aokSiteApp')
  .value('version', '0.1')
  .factory('TumblrService', function ($http) {

    var tumblr = function(){
      var posts = [],
          offset = 0,
          busy = false,
          endOf = false;

      this.defaults = { 
        tagged: '',    /* override tagged to return tagged results */
        limit: 5      /* default limit */
      };

      this.query = function(option, responseHandler) {
        if (endOf || busy) { return };
          busy = true;

          if (typeof option != 'object' && typeof option == 'function') { responseHandler = arguments[0]; };

          var options = {};
          angular.extend(options,this.defaults,option);

          var limit = options.limit;
          var tagged = options.tagged;

          $http({
              url: '/api/grid', 
              method: 'GET',
              params: {
                limit: limit,
                tag: tagged,
                offset: offset
              }
           }).success(function(data, status, headers) {
              if (data.posts.length > 0) {
                for (var i = 0; i < data.posts.length; i++) 
                {
                  posts.push(data.posts[i]);
                }

                if(posts.length == data.total_posts) { endOf = true; }
              }
              offset += limit;
              busy = false;
              responseHandler(posts);
           }, function(response){
                busy = false;
                console.error('tumblr fail: '+response);
          }); 
      }
    };

    var service = {
      instance: function(){ return new tumblr(); }
    }

    return service;
  });

