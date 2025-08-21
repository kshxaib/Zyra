import User from '../models/user.model.js'

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select('-password')

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User found",
            user
        })
    } catch (error) {
        console.log("Error in getCurrentUser", error)
        return res.status(500).json({
            success: false,
            message: "Error in getCurrentUser",
            error
        })
    }
}

export const updateAssistant = async (req, res) => {
    try {
        const userId = req.userId
        const {assistantName, imageFormGallery} = req.body

        let assistantImage = imageFormGallery

        const user = await User.findByIdAndUpdate(userId, {assistantName, assistantImage}, {new: true}).select('-password')

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Assistant updated successfully",
            user
        })


    } catch (error) {
        console.log("Error in updateAssistant", error)
        return res.status(500).json({
            success: false,
            message: "Error in updateAssistant",
            error
        })
    }
}