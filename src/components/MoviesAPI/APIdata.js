// const API_KEY = '';
const base_url = 'https://api.themoviedb.org/3/movie/popular?api_key=53c258bb52d305146e19a71e58aa2cc5&language=en-US&page='

export const MoviesFetch = async (totalPages = 5) => {
  const allResults =[];
  try {
    for(let i = 1; i <= totalPages; i++){
      const response = await fetch(`${base_url}${i}`);
      const data = await response.json();

      allResults.push(...data.results);

      if(!data.results || data.results.length === 0){
        break;
      }
    }
    return allResults;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
    };

  







