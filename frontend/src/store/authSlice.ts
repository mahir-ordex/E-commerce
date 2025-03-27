import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: any | null; // Store user data
  token: string | null; // Store access token
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
  setUser:(state,action:PayloadAction<any>) =>{
    state.user = action.payload
    localStorage.setItem('user',JSON.stringify(action.payload))
  },
  setToken: (state,action:PayloadAction<string>) =>{
    state.token = action.payload
    localStorage.setItem('token',action.payload)
  },
  logout: (state) => {  
    state.user = null;
    state.token = null;
    localStorage.removeItem('user'); // Clear localStorage
    localStorage.removeItem('token');
  },
  },
})

// Action creators are generated for each case reducer function
export const {setToken,setUser,logout} = authSlice.actions

export default authSlice.reducer