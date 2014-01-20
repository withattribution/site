'use strict';

angular.module('CartService', [])
  .value('version', '0.1')
  .factory('CartService', function ($resource) {
  return $resource('/api/cart/', null, {
        query : {method:'GET', isArray:true},
          add : {method:'POST', params:{name:'@name'},url:'/api/cart/add/:name'},
       update : {method:'PUT', params:{id:'@id',quantity:'@quantity'},url:'/api/cart/:id/:quantity'}
  });
});