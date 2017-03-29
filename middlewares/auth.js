'use strict'

const moment = require('moment-timezone')

module.exports = function(appconfig) {
  /**
   * Authentication middleware
   *
   * @param      {Express Request}   req     Express Request object
   * @param      {Express Response}  res     Express Response object
   * @param      {Function}          next    Next callback function
   * @return     {any}               void
   */
  return function(req, res, next) => {
    // Is user authenticated ?

    if (!req.isAuthenticated()) {
      return res.redirect(appconfig.baseUrl + '/login')
    }

    // Check permissions

    if (!rights.check(req, 'read')) {
      return res.render('error-forbidden')
    }

    // Set i18n locale

    req.i18n.changeLanguage(req.user.lang)
    res.locals.userMoment = moment
    res.locals.userMoment.locale(req.user.lang)

    // Expose user data

    res.locals.user = req.user

    return next()
  }
}
