// policies/hasjwt.js
module.exports = async function (req, res, proceed) {
    var user = await User.findOne({ jwtToken: req.headers.jwt ? req.headers.jwt:1 });
    if (user) {
        return proceed();
    }

    //--•
    // Otherwise, this request did not come from a logged-in user.
    return res.forbidden();

};