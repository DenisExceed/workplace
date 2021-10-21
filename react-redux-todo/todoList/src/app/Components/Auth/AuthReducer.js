import React from 'react';
import { Redirect } from 'react-router-dom';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {

  username: '',
  password: '',
  message: '',
  status: 0,

};

export const createUser = createAsyncThunk(

  'AddUser:',
    async (props) => {

      const newUser = await axios
      .post(`http://localhost:5000/auth/registration`, { username: props.userName, password: props.password })

      .then((res) => {
        localStorage.setItem('token', JSON.stringify(res.data?.token))
      
        return {status: res.status, message: res.data.message}

      })  

      .catch((error) => {
        const errorMsg = 'Ошибка. Пользователь не создан'
        console.log(errorMsg, error)
        return {status: error, message: errorMsg}
      });
      
      return newUser;
      
    }
    
  )

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {

    // userNameChange: (state = initialState, { payload }) => {
    //   console.log(payload);
    //   return {
    //    ...state,
    //    username: payload
    //   };
    // },

    // passwordChange: (state = initialState, { payload }) => {
    //   console.log(payload);
    //   return {
    //    ...state,
    //    password: payload
    //   };
    // },


  },

  extraReducers: (builder) => {

    builder.addCase(
      
      createUser.fulfilled, (state, action) => {
        state.message = (action.payload.message)
        state.status = (action.payload.status)
      }
  
    )
  },

});




export const authActions = authSlice.actions;

export default authSlice.reducer;
