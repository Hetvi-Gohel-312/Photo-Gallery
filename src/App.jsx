import { useReducer, useState, useCallback, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Gallery } from './components/Gallery';
import { PhotoModal } from './components/PhotoModal';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { useGalleryData } from './hooks/useGalleryData';
import { favoritesReducer, initialState } from './reducers/favoritesReducer';
import { Search, ImageOff } from 'lucide-react';

function App() {
  const { photos, loading, error } = useGalleryData();
  const [favoritesState, dispatch] = useReducer(favoritesReducer, initialState);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

const filteredPhotos = useMemo(() => {
  const query = searchQuery.toLowerCase().trim();

  return photos.filter((photo) => {
    const matchesQuery =
      !query ||
      photo.title.toLowerCase().includes(query) ||
      photo.category.toLowerCase().includes(query);

    const matchesCategory =
      categoryFilter === 'All' ||
      photo.category === categoryFilter;

    return matchesQuery && matchesCategory;
  });
}, [photos, searchQuery, categoryFilter]);

const galleryPhotos = useMemo(() => {
  return filteredPhotos.map((photo) => ({
    ...photo,
    imageUrl: photo.image,
  }));
}, [filteredPhotos]);

  const handleToggleFavorite = useCallback((photo) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: photo });
  }, []);

  const handlePhotoClick = useCallback((photo) => {
    setSelectedPhoto(photo);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const currentIndex = selectedPhoto ? filteredPhotos.findIndex(p => p.id === selectedPhoto.id) : 0;

  const handlePrevPhoto = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    setSelectedPhoto(galleryPhotos[newIndex]);
  }, [currentIndex, filteredPhotos]);

  const handleNextPhoto = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    const newIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    setSelectedPhoto(galleryPhotos[newIndex]);
  }, [currentIndex, filteredPhotos]);

  const isPhotoFavorite = (photoId) => {
    return favoritesState.favorites.some((photo) => photo.id === photoId);
  };

  return (
    <div className="min-h-screen bg-[#f7f2f7] text-slate-900">
      <Navbar
        favoritesCount={favoritesState.favorites.length}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Gallery Container */}
      <main className="pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            {['All', 'Men', 'Women', 'Accessories', 'Footwear'].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setCategoryFilter(category)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 shadow-sm ${
                  categoryFilter === category
                    ? 'bg-slate-950 text-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.25)]'
                    : 'bg-white/90 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Error State */}
          {error && (
            <div className="flex items-center justify-center py-32">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <ImageOff className="w-8 h-8 text-red-300" />
                </div>
                <p className="text-gray-500">Unable to load photos</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && !error && <LoadingSkeleton />}

          {/* Empty State */}
          {!loading && !error && filteredPhotos.length === 0 && (
            <div className="flex items-center justify-center py-32">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-purple-300" />
                </div>
                <p className="text-gray-600 font-medium mb-2">No photos found</p>
                <p className="text-gray-400 text-sm">Try a different search term</p>
              </div>
            </div>
          )}

          {/* Gallery */}
          {!loading && !error && filteredPhotos.length > 0 && (
            <Gallery
              photos={galleryPhotos}
              favorites={favoritesState.favorites}
              onToggleFavorite={handleToggleFavorite}
              onPhotoClick={handlePhotoClick}
            />
          )}
        </div>
      </main>

      {/* Photo Modal */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          photos={galleryPhotos}
          currentIndex={currentIndex}
          onClose={handleCloseModal}
          onPrev={handlePrevPhoto}
          onNext={handleNextPhoto}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isPhotoFavorite(selectedPhoto.id)}
        />
      )}
    </div>
  );
}

export default App;
