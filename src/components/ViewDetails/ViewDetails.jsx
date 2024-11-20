import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { Card, CardContent, Grid } from '@mui/material';


const ViewDetails = () => {
    const { id } = useParams();

    const [film, setFilms] = useState({})

    const ViewFilmDetails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/film/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });


            if (response.ok) {
                const data = await response.json();
                setFilms(data.data)
                console.log('Response Data:', data);

            } else {
                console.error('Failed to load data.');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    useEffect(() => {
        ViewFilmDetails()
    }, [])

    return (
        <>
            <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '2rem' }}>
                {film ?
                    <>
                        <Grid item xs={12} sm={12} md={12} lg={12} key={film.id}>
                            <Card
                                variant="outlined"
                                sx={{
                                    minHeight: '280px',
                                    borderRadius: '15px',
                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
                                    },
                                    backgroundColor: '#f9f9f9',
                                }}
                            >
                                <CardContent>

                                    <h1>
                                        Title:-{film.title}
                                    </h1>
                                    <h5>
                                        English:-{film.english_title}
                                    </h5>

                                </CardContent>

                            </Card>

                        </Grid>
                    </> : <> <p>Data is not available</p> </>}
            </div>
        </>



    )
}

export default ViewDetails