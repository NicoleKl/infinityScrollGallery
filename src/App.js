import { useState, useEffect, useCallback, useRef } from "react";
import useFetch from "./hooks/useFetch";
import ImageCard from './components/ImageCard';
import LoadMoreBtn from './components/LoadMoreBtn';
import LoadingDots from './components/LoadingDots';
import './App.css';

function App() {
    const [pageNumber, setPage] = useState(-1);
    const { images, loading, error } = useFetch(pageNumber);
    const loader = useRef(null);

    const handleLoadMore = useCallback(() => {
        setPage(prev => prev + 1);
    }, []);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) handleLoadMore();
    }, [handleLoadMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, { threshold: 0 });
        if (loader.current) observer.observe(loader.current);
    }, [handleObserver]);

    return (
        <div className="App">
            <div id="infiniteScrollContainer" className="infiniteScrollContainer">
                <h1 classname="heading">gallery.</h1>
                <div className="gallery">
                    {images.map((image, i) => (
                        <ImageCard key={i} imageUrl={image.url} />
                    ))}
                    <div ref={loader}></div>
                </div>
                <div className="errorContainer">
                    {error && <p>{error}</p>}
                </div>
                <div className="loadingContainer">
                    {loading ? <LoadingDots /> : <LoadMoreBtn clickHandler={handleLoadMore} />}
                </div>
            </div>
        </div>
    );
}

export default App;