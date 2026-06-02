import { useState, useEffect } from 'react';
import { galleryItems } from '../data/galleryData';

export const useGalleryData = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      // Simulate async data loading
      setPhotos(galleryItems);
    } catch (err) {
      setError(err.message || 'An error occurred while loading gallery');
    } finally {
      setLoading(false);
    }
  }, []);

  return { photos, loading, error };
};
