import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            status: user.status
        },
        process.env.JWT_SECRET
    );
};

export default generateToken;