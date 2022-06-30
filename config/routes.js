/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /user/register': 'user/register',
  'GET /user/confirm': 'user/confirm',
  'GET /user/resend': 'user/resend',
  'GET /user/login': 'user/login',
  'GET /user/auth': 'user/auth',

  'GET /data/fetch': 'data/fetch',
  'GET /data/fetchusers': 'data/fetchusers',
  'GET /data/addlog': 'data/addlog',


  'GET /production/fetchproducts': 'production/fetchproducts',
  'POST /production/addproduction': 'production/addproduction',
  'GET /production/addproduct': 'production/addproduct',
  'GET /production/fetchproduction': 'production/fetchproduction',
  'GET /production/confirmproduction': 'production/confirmproduction',
  'GET /production/rejectproduction': 'production/rejectproduction',
  'GET /production/fetchlots': 'production/fetchlots',

  // 'GET /user/forgot': 'user/forgot',
  // 'GET /user/reset': 'user/reset',
  // 'GET /user/changepass': 'user/changepass',
  // 'GET /user/googlesignin': 'user/googlesignin',
  // 'GET /user/facebooksignin': 'user/facebooksignin',
  // 'GET /user/applesignin': 'user/applesignin',
  // 'GET /user/editphone': 'user/editphone',


  // 'GET /user/auth': 'user/auth',


};
