//finding user id using json web token. this middleware function is executed before the controller function when we hit the api. 
import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const token = req.headers.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.json({ success: false, message: "not authorized. Login again." })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            //ensure req body exists. caused an error when it was not present.
            req.body = req.body || {};
            //attach it to req body.
            req.body.userId = tokenDecode.id
            next();
        } else {
            return res.json({ success: false, message: "not authorized. Login again." })
        }

        //this function will execute the usercredit controller function
        // next();
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
};

export default userAuth