import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const secret = process.env.SECRET;

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const splitToken = token.split(" ")[1]
        const isAuth = splitToken.length < 500;
        let decodedData;
        if (splitToken && isAuth) {
            decodedData = jwt.verify(splitToken, secret);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(splitToken);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export default auth;