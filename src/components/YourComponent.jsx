import React, { useEffect } from 'react';

export const YourComponent = () => {
  useEffect(() => {
    const playTrailerLink = document.querySelector('.play_trailer');
    const trailerContainer = document.getElementById('trailerContainer');
    const trailerFrame = document.getElementById('trailerFrame');

    playTrailerLink.addEventListener('click', (event) => {
      event.preventDefault();

      const videoId = playTrailerLink.getAttribute('data-id');
      const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

      trailerFrame.src = youtubeUrl;
      trailerContainer.style.display = 'block';
    });
  }, []);

};

export default YourComponent;
