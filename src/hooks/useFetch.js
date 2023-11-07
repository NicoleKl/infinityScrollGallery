import { useState, useEffect } from "react";

export function useFetch(pageNumber) {
    const apiUrl = 'https://delightful-daffodil-63bc65.netlify.app/photos.json';
    const numberOfPhotos = 6;

    const [images, setGists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [start, setStart] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (start >= data.photos.length) {
                    setGists(prev => [...prev, ...data.photos.slice(0, numberOfPhotos)]);
                    setStart(numberOfPhotos);
                } else {
                    setGists(prev => [...prev, ...data.photos.slice(start, start + numberOfPhotos)]);
                    setStart(prev => prev + numberOfPhotos);
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error.message)
                console.log('There was a problem with the fetch operation:', error);
            });
    }, [pageNumber]);

    return { images, loading, error };
}

export default useFetch;