import React from 'react'
import { useGetCategoryQuery } from '../services/category_api'
import image from '../assets/food_image.jpg';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate()
    const { data, error, isLoading } = useGetCategoryQuery();
    console.log(data?.data)
    return (
        <>
            <div style={{ minWidth: '90%', margin: '74px auto 0 auto', display: 'flex', justifyContent: 'center', gap: '22px' }}>
                {
                    data?.data.map(category => {
                        return (
                            <div style={{
                                minWidth: '150px',
                                minHeight: '150px',
                                background: `url(${image})`,
                                backgroundSize: '170px 170px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px',
                                borderRadius: '0.8rem',
                                cursor: 'pointer',
                            }}
                                onClick={() => navigate(`/${category.category_name}`)}
                            >
                                <h3 style={{ fontFamily: '"DM Sans", sans-serif', color: '#fff' }}>{category?.category_name}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Categories