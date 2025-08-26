import jwt from 'jsonwebtoken';

export const protectedRoute = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authenticated User",
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Token is expired or invalid"
            });
        }

        req.id = decoded.userId; // attach userId to req
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
