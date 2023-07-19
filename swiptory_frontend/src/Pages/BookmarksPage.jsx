import React from 'react'
import { useGetBookmarkedStoriesQuery } from '../services/stories_api'
import { StorySlide } from '../Components'

const BookmarksPage = () => {
    const { data, error, isLoading } = useGetBookmarkedStoriesQuery();
    console.log(data, 'Bookmark stories error is : ', error)

    return (
        <>
            <h1 style={{ fontFamily: '"DM Sans", sans-serif', textAlign: 'center', marginTop: '50px' }}>Your Bookmarked Stories</h1>
            <div style={{ minWidth: '90%', margin: '50px auto 0 auto', display: 'flex', justifyContent: 'center', gap: '22px' }}>
                {
                    data?.data.map(story => {
                        return (
                            <StorySlide
                                imgUrl={story?.slides[0]?.image_url}
                                storyHeading={story?.slides[0]?.heading}
                                storyDescription={story?.slides[0]?.description}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}

export default BookmarksPage