import { useState, useEffect } from "react";

export function useFetch(pageNumber) {
    const apiUrl = 'https://almost-json-server.netlify.app/photos.json';
    const numberOfPhotos = 6;

    const [images, setGists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [start, setStart] = useState(-1);

    useEffect(() => {
        if (start < 0) {
            setStart(0);
            return;
        }
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
                    let end = start + numberOfPhotos;
                    setGists(prev => [...prev, ...data.photos.slice(start, end)]);
                    setStart(end);
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