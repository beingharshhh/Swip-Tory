import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    let isAuth = useSelector(state => state.auth.isAuth)


    const location = useLocation();

    // console.log("privateRoute:loaction--> ", location)

    if (!isAuth) {
        return <Navigate to={'/'} state={location.pathname} replace />;
    }
    return children
}

export default PrivateRoute