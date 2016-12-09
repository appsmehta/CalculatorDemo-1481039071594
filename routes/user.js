
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.authenticate = function (req,res)
{
	console.log(req.body);

	if(req.body.username=="coach")
	{
	res.json({"status":"loggedIn","userType":"coach"});
	}
	else
	{
		res.json({"status":"notLoggedIn"});
	}

}