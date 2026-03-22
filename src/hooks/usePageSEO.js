import { useEffect } from 'react';

const usePageSEO = ({ title, description, keywords }) => {
  useEffect(() => {
    // Update title
    const prevTitle = document.title;
    if (title) {
      document.title = `${title} | Shaifly`;
    }

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDescription = metaDescription ? metaDescription.getAttribute('content') : '';
    if (description) {
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    const prevKeywords = metaKeywords ? metaKeywords.getAttribute('content') : '';
    if (keywords) {
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    return () => {
      document.title = prevTitle;
      if (metaDescription) metaDescription.setAttribute('content', prevDescription);
      if (metaKeywords) metaKeywords.setAttribute('content', prevKeywords);
    };
  }, [title, description, keywords]);
};

export default usePageSEO;
