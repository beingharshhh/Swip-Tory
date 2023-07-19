import React from 'react';
import { useGetUserStoriesQuery } from '../services/stories_api';
import StorySlide from './StorySlide';


export default function UserStories() {
    const { data, error, isLoading } = useGetUserStoriesQuery();
    return (
        <>
            <h1 style={{ fontFamily: '"DM Sans", sans-serif', textAlign: 'center', marginTop: '50px' }}>Your Stories</h1>
            <div style={{ minWidth: '90%', margin: '30px auto 0 auto', display: 'flex', justifyContent: 'center', gap: '22px' }}>
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
    );
}