// policies/hasapi.js
module.exports = async function (req, res, proceed) {

    if (req.headers.api === "Z81jFHhfuq712hadaAjudqoabbffhgfjqi71K") {
      return proceed();
    }
  
    //--•
    // Otherwise, this request did not come from a logged-in user.
    return res.notFound();
  
  };