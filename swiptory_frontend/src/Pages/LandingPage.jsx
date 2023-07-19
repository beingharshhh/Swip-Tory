import React from 'react'
import { Categories, UserStories } from '../Components'

const LandingPage = () => {
    return (
        <>
            <div>
                <Categories />
            </div>
            <div style={{ marginTop: '50px' }}>
                <UserStories />
            </div>
        </>
    )
}

export default LandingPage