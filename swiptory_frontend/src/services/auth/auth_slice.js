import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: localStorage.getItem("isAuth") || false,
    token: localStorage.getItem("token") || "",
    profilePic: localStorage.getItem("profilePic") || "",
    email: localStorage.getItem("email") || "",
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logedin(state, actions) {
            localStorage.setItem('token', actions.payload.token);
            localStorage.setItem('profilePic', actions.payload.profile_pic);
            localStorage.setItem('isAuth', actions.payload.isAuth);
            localStorage.setItem('email', actions.payload.email_id)
        },
        logout(state) {
            localStorage.removeItem('token')
            localStorage.removeItem('profilePic')
            localStorage.removeItem('isAuth')
            localStorage.removeItem('email')
        },
    },
})

export const { logedin, logout } = authSlice.actions
export default authSlice.reducer