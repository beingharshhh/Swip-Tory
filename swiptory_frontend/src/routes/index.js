import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { BookmarkPage, LandingPage, StoriesByCategoryPage } from '../Pages';
import PrivateRoute from './PrivateRoutes';


const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/:category' element={<StoriesByCategoryPage />} />
                <Route path='/bookmarks' element={<PrivateRoute><BookmarkPage /></PrivateRoute>} />
            </Routes>
        </>
    )
}

export default AppRoutes