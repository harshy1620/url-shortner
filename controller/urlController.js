// Import the 'shortid' library for generating unique short IDs
const shortid=require("shortid");
// Import the 'URL' model from the specified path
const URL=require("../model/url");

// 'postUrl' controller function to handle requests for URL shortening
module.exports.postUrl= async function(req, res){
    const user = req.user;
    // Extracting the 'originalUrl' from the request body
    const url = req.body.originalUrl;
    // Generating a unique short ID using the 'shortid' library
    const ShortID = shortid();
    try{
        // checkinging if url is found or not
        //for not found
        if(!url){
            return res.status(404).json({error:"Url is required"})
        }
        // for found
        else{
            const urlAlreadyPresent = await URL.findOne({redirectURL: url});
            if(urlAlreadyPresent) return res.json(urlAlreadyPresent)
            else{
                // Create a new URL document in the database with the generated short ID and original URL
                await URL.create({user:user._id,shortId:ShortID,redirectURL:url});
                // Respond with a JSON object containing the original URL and the generated short ID
                return res.json({orignalUrl: url, shortUrl: `http://localhost:8001/${ShortID}`});
            }
        }
    }
    catch(error){
        // If an error occurs during the URL creation process, log the error and return a 500 response indicating an internal server error
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


// 'getUrl' controller function to handle requests for retrieving original URLs
module.exports.getUrl = async function(req, res) {
    // Extract the 'shortId' from the request parameters
    const shortId = req.params.shortId;
    try {
        // Query the database to find the URL document with the specified 'shortId'
        const geturl = await URL.findOne({ shortId: shortId });
        // If no URL document is found, return a 404 response indicating the short URL is not found
        if (!geturl) {
            return res.status(404).json({ error: "Short URL not found" });
        } else {
            // If a URL document is found, redirect the user to the original URL
            const getshortid = geturl.redirectURL.startsWith('http://') || geturl.redirectURL.startsWith('https://') ?
            geturl.redirectURL 
            :
            'http://' + geturl.redirectURL;
            res.redirect(getshortid);
        }
    } catch (error) {
        // If an error occurs during the database query, log the error and return a 500 response indicating an internal server error
        console.error("Error fetching short URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};