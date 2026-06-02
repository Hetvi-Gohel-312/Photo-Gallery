import { Heart, X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useEffect, useCallback } from 'react';

export const PhotoModal = ({ photo, onClose, onPrev, onNext, onToggleFavorite, isFavorite, photos, currentIndex }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in" />

      <div
        className="relative z-10 w-full h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top navigation */}
        <div className="flex items-center justify-between gap-4 rounded-b-[32px] bg-white/10 border-b border-white/10 px-5 py-4 sm:px-6 sm:py-5 backdrop-blur-md shadow-[0_12px_40px_-24px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="hidden sm:block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
              <span className="text-white/80 text-sm font-medium">
                {currentIndex + 1} / {photos.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={photo.imageUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label="Download photo"
            >
              <Download className="w-5 h-5" />
            </a>
            <button
              onClick={() => onToggleFavorite(photo)}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm ${
                isFavorite
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Main image area with navigation */}
        <div className="flex-1 flex flex-col items-center justify-center relative px-4 sm:px-16">
          {/* Previous button */}
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm group"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Image */}
          <div className="relative max-w-7xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center gap-4">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="max-w-full max-h-[70vh] object-contain rounded-[28px] shadow-[0_36px_80px_-48px_rgba(15,23,42,0.35)] animate-scale-in"
            />

            <div className="w-full max-w-3xl rounded-[26px] border border-white/15 bg-slate-950/20 px-5 py-3 backdrop-blur-xl text-center text-white/90 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.25)]">
              <p className="text-lg font-semibold tracking-tight text-white">
                {photo.title}
              </p>
              <div className="mt-2 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.18em] text-slate-200/80">
                <span className="inline-flex h-2 w-2 rounded-full bg-[#8B5CF6]" />
                <span>{photo.category}</span>
              </div>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm group"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
