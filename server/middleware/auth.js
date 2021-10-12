import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
      
        // if token lenth is less than 500 (non google 0auth) isCustomAuth = true
        const isCustomAuth = token.length < 500;

        let decodedData;

        // get user id if user is using custom auth
        if(token && isCustomAuth) {
            // remember to replace test with process.env.JWT_SECRET
            decodedData = jwt.verify(token, 'test');
            
            req.userId = decodedData?.id;
        } else {
            // get user id if user is using google auth
            decodedData = jwt.decode(token);
            // sub is a unique user id in google speak
            req.userId = decodedData?.sub;
            
        }

        next();
        
    } catch {
        console.log("auth error")
    }
}

export default auth; 
