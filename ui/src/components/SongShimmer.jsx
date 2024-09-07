export const SongShimmer = () => {
  return (
    <div className="song">
      <div className="song-img shimmer-img"></div>
      <div className="song-details shimmer-details">
        <div className="song-name">
          <p className="name"></p>
          <p className="artist"></p>
        </div>
        <p id="duration"></p>
      </div>
    </div>
  );
};
