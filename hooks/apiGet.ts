import axios from "axios";
import { MovieArtist, Movie, MovieAPI } from "../types";
import { API_KEY } from "./config/secret";
const genres: any = {
  12: 'Aventura',
  14: 'Fantasia',
  16: 'Animação',
  18: 'Drama',
  27: 'Terror',
  28: 'Ação',
  35: 'Comédia',
  36: 'Histórico',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentário',
  878: 'Ficção Cientifica',
  9648: 'Mistério',
  10402: 'Musical',
  10749: 'Romance',
  10751: 'Familia',
  10752: 'Guerra',
  10770: 'TV Movie',
};

const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=pt-BR`;
const getImagePath = (path: string) => 
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path: string) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const getArtistsAPI = async (movie_id: string): Promise<MovieArtist[]> => {
  const api_url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`
  try {
    const { data } = await axios.get(api_url, {
      headers: {
        Accept: 'application/json'
      }
    })

    const artists: MovieArtist[] = data.cast.map(
      ({
        id,
        name,
        profile_path,
        character,
      }: 
      {
        id: number,
        name: string,
        profile_path: string,
        character: string,
      }) => ({
        id: String(id),
        name: name,
        character: character,
        cover: profile_path !== null ? getImagePath(profile_path) : 'https://d2v9ipibika81v.cloudfront.net/uploads/sites/210/Profile-Icon.png'
      })
    )
    
    if(artists.length > 10){
      const cut = artists.length - 10;
      artists.splice(10, cut)

      console.log(artists.length)
    } 
    
    return artists
    
  } catch (error) {
    throw new Error
  }
}

export const getMovies = async () => {
  const { results } = await fetch(API_URL).then((x) => x.json());
  const movies: Movie[] = results.map(
    ({
      id,
      title,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }: MovieAPI) => ({
      key: String(id),
      title: title,
      original_title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      genres: genre_ids.map((genre) => genres[genre]),
      releaseDate: `${new Date(release_date).getUTCDate().toString().padStart(2, '0')}/${((new Date(release_date).getMonth() + 1).toString().padStart(2, '0'))}/${new Date(release_date).getFullYear()}`
    })
  )

  return movies
}