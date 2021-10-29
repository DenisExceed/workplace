import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Grid, Paper, Avatar, TextField, Button, Typography, Link,
} from '@material-ui/core';
import { AccountCircleRounded } from '@material-ui/icons';
import { Alert, Stack } from '@mui/material';
import { logIn } from '../AuthReducer';

import './LoginForm.scss';

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  logIn: (props) => dispatch(logIn(props)),
});

const LoginForm = (props) => {
  const history = useHistory();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [userNameDirty, setUserNameDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [userNameError, setUserNameError] = useState('this field must not be empty');
  const [passwordError, setPasswordError] = useState('this field must not be empty');

  const [formValid, setFormValid] = useState(false);

  const buttonHandler = () => {
    props.logIn({ userName, password })
      .then(() => history.push('/'));
  };

  useEffect(() => {
    if (userNameError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [userNameError, passwordError]);

  const userNameHandler = (e) => {
    setUserName(e.target.value);

    const userNameValidate = () => /^[a-z\d_]{4,16}$/g.test(e.target.value);

    if (!userNameValidate) {
      setUserNameError('Некорректное имя пользователя');
    } else {
      setUserNameError('');
    }

    if (!e.target.value) {
      setUserNameError('Поле не может быть пустым');
    } else {
      setUserNameError('');
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);

    const passwordValidate = () => /[A-Z]/.test(e.target.value) && /[0-9]/.test(e.target.value) && !/[aeiou]/.test(e.target.value) && /^[@#][A-Za-z0-9]{7,13}$/.test(e.target.value);

    if (!passwordValidate) {
      setPasswordError('Некорректный пароль');
    } else {
      setPasswordError('');
    }

    if (!e.target.value) {
      setPasswordError('Пароль не может быть пустым');
    } else {
      setPasswordError('');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'username':
        setUserNameDirty(true);
        break;

      case 'password':
        setPasswordDirty(true);
        break;

      default:
        break;
    }
  };

  const paperStyle = {
    padding: 20, height: '45vh', width: 500, margin: '30px auto',
  };
  const avatarStyle = { backgroundColor: '#f4005b', margin: '10px auto' };
  const btnStyle = { margin: '35px 0' };
  const inputStyle = { margin: '10px 0' };
  const signUpStyle = { margin: '0 10px' };

  const { AuthReducer } = props;

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}><AccountCircleRounded /></Avatar>
          <h2>
            Sign Up TodoList ||
            <span style={{ color: '#f3005f', paddingLeft: '11px' }}>Login</span>
          </h2>
        </Grid>

        <TextField
          label="Username"
          name="username"
          placeholder="Enter username"
          onChange={userNameHandler}
          onBlur={blurHandler}
          value={userName}
          style={inputStyle}
          fullWidth
          required
        />
        {(userNameDirty && userNameError) && <div className="textError">{userNameError}</div>}

        <TextField
          label="Password"
          name="password"
          placeholder="Enter password"
          onChange={passwordHandler}
          onBlur={blurHandler}
          value={password}
          className="inputError"
          type="password"
          style={inputStyle}
          fullWidth
          required
        />
        {(passwordDirty && passwordError) && <div className="textError">{passwordError}</div>}

        <Stack sx={{ width: '100%' }} spacing={2}>
          { AuthReducer.message ? (
            <Alert severity={AuthReducer.status === 200 ? 'success' : 'error'}>
              {AuthReducer.message}
            </Alert>
          ) : (
            <></>
          )}
        </Stack>

        <Button
          disabled={!formValid}
          onClick={buttonHandler}
          type="submit"
          color="primary"
          variant="contained"
          style={btnStyle}
          fullWidth
        >
          Sign in
        </Button>

        <Typography>
          Do you haven`t an account?
          <Link style={signUpStyle} href="/registration">
            Register
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
