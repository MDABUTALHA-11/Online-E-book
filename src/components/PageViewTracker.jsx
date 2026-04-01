import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useViewCount } from '../hooks/useViewCount';

/**
 * Tracks views for every page visited by the user.
 * It uses the location pathname as the identifier for Firestore 'page_views' collection.
 */
const PageViewTracker = () => {
    const location = useLocation();
    const { incrementView } = useViewCount(null, 'page_views');

    useEffect(() => {
        // Clean path to use as document ID (e.g., "/" -> "home", "/about" -> "about")
        const pageId = location.pathname === '/' ? 'home' : location.pathname.substring(1).replace(/\//g, '_');
        
        // Accurate increment call
        incrementView(pageId, 'page_views');
        
        // Also increment total site views
        incrementView('total_site_views', 'stats');

    }, [location.pathname, incrementView]);

    return null; // Side-effect only component
};

export default PageViewTracker;
