import { PhotoCard } from './PhotoCard';

const heights = [
  'h-48 sm:h-56',
  'h-64 sm:h-80',
  'h-56 sm:h-72',
  'h-72 sm:h-96',
  'h-48 sm:h-60',
  'h-80 sm:h-[28rem]',
  'h-56 sm:h-64',
  'h-64 sm:h-84',
  'h-56 sm:h-72',
  'h-64 sm:h-80',
  'h-48 sm:h-60',
  'h-72 sm:h-96',
  'h-56 sm:h-64',
  'h-64 sm:h-84',
  'h-48 sm:h-56',
  'h-80 sm:h-[28rem]',
];

export const Gallery = ({
  photos,
  favorites,
  onToggleFavorite,
  onPhotoClick,
}) => {
  const isFavorite = (photoId) => {
    return favorites.some(
      (photo) => photo.id === photoId
    );
  };

  const enhancedPhotos = photos.map(
    (photo, index) => ({
      ...photo,
      heightClass:
        heights[index % heights.length],
    })
  );

  return (
    <div className="masonry-grid">
      {enhancedPhotos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavorite={isFavorite(photo.id)}
          onToggleFavorite={onToggleFavorite}
          onClick={() =>
            onPhotoClick(photo)
          }
        />
      ))}
    </div>
  );
};