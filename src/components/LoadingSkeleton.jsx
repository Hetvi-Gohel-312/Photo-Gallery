const CardSkeleton = ({ heightClass }) => (
  <div className={`${heightClass} rounded-[20px] overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100`}>
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
    </div>
  </div>
);

export const LoadingSkeleton = () => {
  const heights = [
    'h-48 sm:h-56',
    'h-64 sm:h-80',
    'h-56 sm:h-72',
    'h-72 sm:h-96',
    'h-48 sm:h-60',
    'h-80 sm:h-[28rem]',
    'h-56 sm:h-64',
    'h-64 sm:h-84',
  ];

  return (
    <div className="masonry-grid">
      {[...Array(20)].map((_, index) => (
        <CardSkeleton key={index} heightClass={heights[index % heights.length]} />
      ))}
    </div>
  );
};
