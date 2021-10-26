// import { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {

  username: '',
  password: '',
  message: '',
  status: 0,
  userId: ''

};

export const createUser = createAsyncThunk(

  'AddUser:',
    async (props) => {

      const newUser = await axios
      .post(`http://localhost:5000/auth/registration`, { username: props.userName, password: props.password })

      .then((res) => {
        const token = JSON.parse(localStorage.getItem('token'));
        
        if (token) {
         localStorage.removeItem('token');
        }

        if(!token) {
         localStorage.setItem('token', JSON.stringify(res.data?.token))
        }
        
        return {status: res.status, message: res.data.message, userId: res.data.userId}

      })  

      .catch((error) => {
        const errorMsg = 'Ошибка. Пользователь не создан'
        console.log(errorMsg, error)
        return {status: error, message: errorMsg}
      });
      
      return newUser;
      
    }
  )

export const logIn = createAsyncThunk(

  'LogInUser:',
    async (props) => {
    
      const User = await axios
      .post(`http://localhost:5000/auth/login`, { username: props.userName, password: props.password })
    
      .then((res) => {

        const token = JSON.parse(localStorage.getItem('token'));

        if (!token) {
           localStorage.setItem('token', JSON.stringify(res.data?.token))
        }
       
        return { status: res.status, message: res.data.message, token: res.data.token, userId: res.data.userId }
    
      })  
    
      .catch((error) => {
        const errorMsg = 'Ошибка. Пользователь не найден'
        console.log(errorMsg, error)
        return {status: error, message: errorMsg}
      });

      return User;
      
    }
  )  

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {

    createToken: (state = initialState, { payload }) => {
      return {
       ...state,
       token: payload
      }
    },

    createUserId: (state = initialState, { payload }) => {
      return {
       ...state,
       userId: payload
      }
    },
  },

  extraReducers: (builder) => {

    builder.addCase(
      
      createUser.fulfilled, (state, action) => {
        state.message = (action.payload.message)
        state.status = (action.payload.status)
        state.userId = (action.payload.userId)
      },
    );

    builder.addCase(
      logIn.fulfilled, (state, action) => {
        state.message = (action.payload.message)
        state.status = (action.payload.status)
        state.token = (action.payload.token)
        state.userId = (action.payload.userId)
      }
    );

  },

});


export const authActions = authSlice.actions;

export default authSlice.reducer;
