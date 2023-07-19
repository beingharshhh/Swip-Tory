import React, { useState } from 'react'
import { Modal, TextField } from '../Components';
import styles from './components.module.css';
import { useLoginMutation } from '../services/auth/user_auth';
import { useDispatch, useSelector } from 'react-redux';
import { logedin } from '../services/auth/auth_slice';


const LoginModal = ({ onOpen, onClose }) => {
    let isAuth = useSelector(state => state.auth.isAuth);
    let dispatch = useDispatch();
    const [login, { data: userData, error: loginError, isLoading }] = useLoginMutation();
    const [email_id, setEmail_Id] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        email_id: "",
        password: ""
    })

    const handleLogin = () => {
        try {
            if (!email_id) {
                setErrorMessage({ email_id: "Please enter username", password: "" })
            } else if (!password) {
                setErrorMessage({ email_id: "", password: "Please enter password" })
            } else if (email_id && password) {
                console.log(email_id, password)
                setErrorMessage({ userName: "", password: "" })
                login({ email_id, password })
                    .unwrap()
                    .then(resp => {
                        dispatch(logedin(resp?.data))
                        console.log(resp)
                        console.log(isAuth)
                        setEmail_Id("")
                        setPassword("")
                        onClose()
                        window.location.reload();
                    })
                    .catch(err => {
                        console.log(err)
                        setErrorMessage({ ...errorMessage, loginError: err?.data?.message })
                    })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <Modal onOpen={onOpen} onClose={onClose} title="Login to SwipTory">
                <TextField
                    value={email_id}
                    onChange={(e) => setEmail_Id(e.target.value)}
                    type='email'
                    label='Username'
                    placeholder='Enter Username'
                    helperText={errorMessage.email_id ? errorMessage.email_id : null}
                />
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    label='Password'
                    placeholder='Enter Password'
                    helperText={errorMessage.password ? errorMessage.password : null}
                />
                {errorMessage.loginError && <span style={{ color: 'red', fontFamily: "\"DM Sans\", sans-serif" }}>{errorMessage.loginError}</span>}
                <button onClick={handleLogin} className={`${styles.btn} ${styles.signin_btn}`}>Login</button>
            </Modal>
        </>
    )
}

export default LoginModal