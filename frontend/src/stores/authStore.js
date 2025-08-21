import { create } from 'zustand'
import { axiosInstance } from '../utils/axiosInstance.js'

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false, 
  isLoggingIn: false, 
  isCheckingUser: false,

  signUp: async (formData) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post('/auth/signup', formData)
      set({ user: res.data.user })
    } catch (error) {
      console.log("Error in signUp", error)
      throw error; 
    } finally {
      set({ isSigningUp: false }) 
    }
  },

  signIn: async (formData) => {
    set({ isLoggingIn: true }) 
    try {
      const res = await axiosInstance.post('/auth/signin', formData)
      set({ user: res.data.user })
    } catch (error) {
      console.log("Error in signIn", error)
      throw error; 
    } finally {
      set({ isLoggingIn: false }) 
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get('/auth/logout')
      set({ user: null })
    } catch (error) {
      console.log("Error in logout", error)
    }
  },

  checkUser: async () => {
    set({ isCheckingUser: true })
    try {
      const res = await axiosInstance.get('/user/current')
      set({ user: res.data.user })
    } catch (error) {
      console.log("Error in checkUser", error)
      set({ user: null })
    } finally {
      set({ isCheckingUser: false })
    }
  }
}))