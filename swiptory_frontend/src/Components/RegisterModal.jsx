import React, { useState } from 'react'
import { Modal, TextField } from '../Components';
import styles from './components.module.css';
import { useCreateUserMutation } from '../services/auth/user_auth';

const RegisterModal = ({ onOpen, onClose }) => {
    const [createUser, { data, error, isLoading }] = useCreateUserMutation();
    const [email_id, setEmail_Id] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        userName: "",
        password: ""
    })

    const handleRegister = async () => {
        try {
            if (!email_id) {
                setErrorMessage({ email_id: "Please enter username", password: "" })
            } else if (!password) {
                setErrorMessage({ email_id: "", password: "Please enter password" })
            } else if (email_id && password) {
                setErrorMessage({ email_id: "", password: "" })
                createUser({ email_id, password })
                    .unwrap()
                    .then(resp => {
                        console.log(resp)
                        setEmail_Id("")
                        setPassword("")
                        localStorage.setItem('userInfo', JSON.stringify(resp?.data))
                        onClose();
                    })
                    .catch(err => {
                        console.log(err)
                        setErrorMessage({ ...errorMessage, registerError: err?.data?.message })
                    })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <Modal onOpen={onOpen} onClose={onClose} title="Register to SwipTory">
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
                {errorMessage.registerError && <span style={{ color: 'red', fontFamily: "\"DM Sans\", sans-serif" }}>{errorMessage.registerError}</span>}
                <button onClick={handleRegister} className={`${styles.btn} ${styles.reg_btn}`}>Register Now</button>
            </Modal>
        </>
    )
}

export default RegisterModal;