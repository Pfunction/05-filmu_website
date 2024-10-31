// const API_KEY = '';
const base_url = 'https://api.themoviedb.org/3/movie/popular?api_key=53c258bb52d305146e19a71e58aa2cc5&language=en-US&page='

const API_KEY = '53c258bb52d305146e19a71e58aa2cc5';
// const popularPageUrl = 'https://api.themoviedb.org/3/movie/'+ data-id +'-venom-the-last-dance'




export const MoviesFetch = async (page) => {
  try {
    const response = await fetch(`${base_url}${page}`);
    const data = await response.json();
    
    return data.results || []; // Return results or an empty array if none
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
export const fetchTrailer = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
    const data = await response.json();

    // Filter to get the official YouTube trailer
    const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
    return trailer ? trailer.key : null;
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};




