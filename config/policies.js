/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  '*': 'hasapi',






  // 'user/changepass': 'hasjwt',
  // 'user/editphone': 'hasjwt',

  
  // 'address/add': 'hasjwt',
  // 'address/fetch': 'hasjwt',
  // 'address/remove': 'hasjwt',
  // 'address/set': 'hasjwt',


  
  // 'restaurant/fetch': 'hasjwt',
  // 'menu/fetch': 'hasjwt',
  // 'menuitem/fetch': 'hasjwt',





  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

};
