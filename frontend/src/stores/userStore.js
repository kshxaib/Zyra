import { create } from 'zustand'
import { axiosInstance } from '../utils/axiosInstance.js'

export const useUserStore = create((set) => ({
    user: null,
    isUpdating: false,

    updateAssistant: async (data) => {
        try {
            set({ isUpdating: true })
            const res = await axiosInstance.post('/user/update', data)
            set({ user: res.data.user })
            return res.data
        } catch (error) {
            console.log("Error in updateAssistant", error)
            throw error
        } finally {
            set({ isUpdating: false })
        }
    },
}))