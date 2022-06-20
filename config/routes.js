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
  // 'GET /user/auth': 'user/auth',
  // 'GET /user/forgot': 'user/forgot',
  // 'GET /user/reset': 'user/reset',
  // 'GET /user/changepass': 'user/changepass',
  // 'GET /user/googlesignin': 'user/googlesignin',
  // 'GET /user/facebooksignin': 'user/facebooksignin',
  // 'GET /user/applesignin': 'user/applesignin',
  // 'GET /user/editphone': 'user/editphone',

  // 'GET /address/add': 'address/add',
  // 'GET /address/fetch': 'address/fetch',
  // 'GET /address/remove': 'address/remove',
  // 'GET /address/set': 'address/set',



  // 'GET /restaurant/fetch': 'restaurant/fetch',
  // 'GET /menu/fetch': 'menu/fetch',
  // 'GET /menuitem/fetch': 'menuitem/fetch',

};
