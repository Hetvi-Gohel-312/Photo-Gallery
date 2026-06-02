import { Heart } from 'lucide-react';
import { useState } from 'react';

export const PhotoCard = ({ photo, isFavorite, onToggleFavorite, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Generate random heights for masonry effect
  const heightClass = photo.heightClass || 'h-64';

  return (
    <div
      className={`group relative ${heightClass} rounded-[28px] overflow-hidden bg-white/95 border border-slate-200/80 shadow-[0_24px_76px_-40px_rgba(15,23,42,0.16)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_32px_88px_-40px_rgba(15,23,42,0.18)]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Skeleton loader */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Image */}
      <img
        src={photo.imageUrl}
        alt={photo.title}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'scale-110' : 'scale-100'}`}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/15 to-transparent transition-opacity duration-300 ease-out ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Content Overlay */}
      <div className={`absolute inset-0 p-5 flex flex-col justify-end transition-all duration-300 ease-out ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-white text-base font-medium tracking-wide drop-shadow-lg truncate">
              {photo.title}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(photo);
            }}
            className={`p-2.5 rounded-full transition-all duration-300 flex-shrink-0 border border-white/60 ${isFavorite
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30 scale-110'
                : 'bg-white/90 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Quick favorite button (always visible) */}
      <div className={`absolute top-3 right-3 transition-all duration-300 ${isHovered ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(photo);
          }}
          className={`p-2 rounded-full border border-white/70 bg-white/90 text-slate-800 shadow-sm transition-all duration-300 ${isFavorite
              ? 'bg-purple-600 text-white shadow-purple-600/20'
              : 'hover:bg-slate-100'
            }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
};
