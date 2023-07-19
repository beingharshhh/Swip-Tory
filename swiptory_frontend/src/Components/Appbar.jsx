import React, { useEffect, useState } from 'react';
import styles from './components.module.css';
import { LoginModal, RegisterModal } from '../Components';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/auth/auth_slice';


const Appbar = ({ children }) => {
    let { isAuth, profilePic } = useSelector(state => state.auth);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)

    const handleLogout = () => {
        dispatch(logout())
        window.location.reload();
        console.log(isAuth)
    }

    const handleLoginOpen = () => {
        setIsLoginOpen(true)
    }

    const handleLoginClose = () => {
        setIsLoginOpen(false)
    }

    const handlRegisterOpen = () => {
        setIsRegisterOpen(true)
    }

    const handlRegisterClose = () => {
        setIsRegisterOpen(false)
    }

    return (
        <>
            <div className={styles.appbar} id='appbar'>
                <Link to='/' style={{ textDecoration: 'none', color: 'black' }}><h3>SwipTory</h3></Link>
                {!isAuth
                    ? (
                        <div className={styles.button_group}>
                            <button
                                onClick={handlRegisterOpen}
                                className={`${styles.btn} ${styles.reg_btn}`}
                            >
                                Register Now
                            </button>
                            <button
                                onClick={handleLoginOpen}
                                className={`${styles.btn} ${styles.signin_btn}`}
                            >
                                Sign In
                            </button>
                        </div>
                    )
                    : (
                        <div className={styles.button_group}>
                            <button
                                onClick={() => navigate('/bookmarks')}
                                className={`${styles.btn} ${styles.reg_btn}`}
                            >
                                🔖 Bookmarks
                            </button>
                            <button
                                onClick={handleLoginOpen}
                                className={`${styles.btn} ${styles.reg_btn}`}
                            >
                                Add Story
                            </button>
                            <img src={profilePic} alt="profile" style={{ display: 'block', borderRadius: '50%' }} width='30px' height='30px' />
                            <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                <span className="material-symbols-outlined">
                                    logout
                                </span>
                            </div>
                        </div>
                    )
                }
            </div>
            <LoginModal onOpen={isLoginOpen} onClose={handleLoginClose} />
            <RegisterModal onOpen={isRegisterOpen} onClose={handlRegisterClose} />
            <div style={{ marginTop: '74px' }}>
                {children}
            </div>

        </>
    )
}

export default Appbar