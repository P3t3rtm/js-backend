// policies/hasjwt.js
module.exports = async function (req, res, proceed) {
    // var user = await User.findOne({ jwtToken: req.headers.jwt ? req.headers.jwt:1 });
    var user = await User.findOne({ jwtToken: req.headers.jwt||1 });//||1 is a dummy value, just to make sure it's not undefined nor empty
    if (user) {
        return proceed();
    }

    //--•
    // Otherwise, this request did not come from a logged-in user.
    return res.notFound();

};