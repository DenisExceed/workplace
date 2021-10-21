import React, { useEffect } from 'react'
import { useState } from 'react'
// import { createItem } from '../../Containers/TodoList/todoSlice';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import { AccountCircleRounded } from '@material-ui/icons'

import './LoginForm.scss'

const LoginForm = () => {

const [userName, setUserName] = useState('')
const [password, setPassword] = useState('')

const [userNameDirty, setUserNameDirty] = useState(false)
const [passwordDirty, setPasswordDirty] = useState(false)

const [userNameError, setUserNameError] = useState('this field must not be empty')
const [passwordError, setPasswordError] = useState('this field must not be empty')

const [formValid, setFormValid] = useState(false)

useEffect(() => {
    if(userNameError || passwordError) {
        setFormValid(false)
    } else {
        setFormValid(true)
    }

}, [userNameError, passwordError])


const userNameHandler = (e) => {
    setUserName(e.target.value)

    const userName_validate = (e) => {
        return /^[a-z\d_]{4,16}$/g.test(e.target.value);
    }

    if (!userName_validate) {
        setUserNameError('Некорректное имя пользователя')
    } else {
        setUserNameError('')
    }

    if (!e.target.value) {
        setUserNameError('Поле не может быть пустым')
    } else {
        setUserNameError('')
    }

}

const passwordHandler = (e) => {
    setPassword(e.target.value)

    const password_validate = (e) => {
        return /[A-Z]/.test(e.target.value) && /[0-9]/.test(e.target.value) && !/[aeiou]/.test(e.target.value) && /^[@#][A-Za-z0-9]{7,13}$/.test(e.target.value)
    }

    if (!password_validate) {
        setPasswordError('Некорректный пароль')
    } else {
        setPasswordError('')
    }

    if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым')
    } else {
        setPasswordError('')
    }

}

const blurHandler = (e) => {
    switch (e.target.name) {
        case 'username':
            setUserNameDirty(true)
            break
        
        case 'password':
            setPasswordDirty(true)
            break
        
    }
}

    const paperStyle={padding:20, height:'45vh', width:500, margin:'30px auto'}
    const avatarStyle={backgroundColor:'#f4005b', margin:'10px auto'}
    const btnStyle={margin:'35px 0'}
    const inputStyle={margin:'10px 0'}
    const signUpStyle={margin:'0 10px'}

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><AccountCircleRounded/></Avatar>
                    <h2>Sign In TodoList || <span style={{color:'#f3005f'}}>Login</span></h2>
                </Grid>
                

                <TextField 
                  label='Username'
                  name='username'  
                  placeholder='Enter username'
                  onChange={(e) => userNameHandler(e)}
                  onBlur={(e) => blurHandler(e)}
                  value={userName}
                  style={inputStyle} 
                  fullWidth required/>
                  {(userNameDirty && userNameError) && <div className="textError">{userNameError}</div>} 
                
                
                <TextField
                  label='Password'
                  name='password' 
                  placeholder='Enter password'
                  onChange={(e) => passwordHandler(e)}
                  onBlur={(e) => blurHandler(e)}
                  value={password}
                  className="inputError"
                  type='password'
                  style={inputStyle}  
                  fullWidth required/>
                  {(passwordDirty && passwordError) && <div className="textError">{passwordError}</div>} 

                <Button 
                  disabled={!formValid} 
                  type='submit' 
                  color='primary' 
                  variant="contained" 
                  style={btnStyle} 
                  fullWidth>Sign in
                </Button>

                <Typography>Do you haven`t an account?
                     <Link style={signUpStyle} href="/registration" >
                        Register 
                     </Link>
                     <Link style={signUpStyle} href="/todo" >
                        ToDo 
                     </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default LoginForm;