import React from 'react'
import styles from './components.module.css'

const StorySlide = ({ imgUrl, storyHeading, storyDescription }) => {
    return (
        <>
            <div className={styles.story_slide} style={{ background: `url(${imgUrl})`, backgroundSize: 'cover' }}>
                <div>
                    <h3 className={styles.text_format}>{storyHeading}</h3>
                    <p className={styles.text_format}>{storyDescription}</p>
                </div>
            </div>
        </>
    )
}

export default StorySlide