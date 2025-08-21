import jwt from "jsonwebtoken"

export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET)
        
        req.userId = verifyToken.userId

        next()
    } catch (error) {
        console.log("Error in isAuth", error)
        return res.status(500).json({
            success: false,
            message: "Error in isAuth",
            error
        })
    }
}