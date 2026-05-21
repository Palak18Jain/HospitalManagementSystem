import jwt from "jsonwebtoken";


const authDoctor = async (req, res, next) => {

    try {   
        // Look for token in 'token', 'utoken', or 'Authorization: Bearer <token>' headers
        let token = req.headers.token || req.headers.dToken;
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        console.log("Token received:", token);

        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)


        req.body = req.body || {};
        req.body.docId = (token_decode.id)
        next()

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });

    }

}
export default authDoctor
