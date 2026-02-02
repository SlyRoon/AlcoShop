import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/user/IUser';
import AuthService from '../service/auth/AuthService';
import { AppDispatch } from './store';
import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { API_URL } from '../http';

interface AuthState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;  
}

const initialState: AuthState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false, 
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>){
      state.isLoading = action.payload
    }  
  },
});



export const { setAuth, setUser , setLoading } = authSlice.actions;

export default authSlice.reducer;

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await AuthService.login(email, password);
    console.log(response);

    localStorage.setItem('token', response.data.accessToken);

    dispatch(setAuth(true));
    dispatch(setUser(response.data.user));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  }
};

export const registration = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await AuthService.registration(email, password);
    console.log(response);

    localStorage.setItem('token', response.data.accessToken);

    dispatch(setAuth(true));
    dispatch(setUser(response.data.user));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  }
};
export const logout = () => async (dispatch: AppDispatch) => {
  try {
    const response = await AuthService.logout();
    console.log(response)
    localStorage.removeItem('token');

    dispatch(setAuth(false));
    dispatch(setUser({} as IUser));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  }
   finally {
    dispatch(setLoading(false))
  }
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true)) 
  try {
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh` , {withCredentials: true});
    console.log(response)
    localStorage.setItem('token', response.data.accessToken);
    dispatch(setAuth(true));
    dispatch(setUser(response.data.user));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(setLoading(false))
  }
};
