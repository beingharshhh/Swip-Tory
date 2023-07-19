import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetStoriesByCategoryQuery } from '../services/stories_api';
import { StorySlide } from '../Components'

const StoriesByCategoryPage = ({ simplified }) => {
    const { category } = useParams();
    let limit = simplified ? 5 : 100;
    const { data, error, isLoading } = useGetStoriesByCategoryQuery({ category, limit });
    console.log(category, 'and category wise data is : ', data)
    return (
        <>
            <h1 style={{ fontFamily: '"DM Sans", sans-serif', textAlign: 'center', marginTop: '50px' }}>Top Stories About {category}</h1>
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

export default StoriesByCategoryPage