import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlay } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';

const apiKey = "b59fe494856b01f7fb082bb5d37edd5e"
const url = "https://api.themoviedb.org/3"
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming"
const nowPlaying = "now_playing"
const popular = "popular"
const topRated = "top_rated"


const Card = ({ img }) => (<img className='card' src={img} alt="cover" />)

const Row = ({ title, arr = [{

},
], }) => (
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {
        arr.map((item, index) => (
          <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
        ))


      }


    </div>
  </div>
)
function Home() {

  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [genre, setGenre] = useState([])
  useEffect(() => {
    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=1`)

      setUpcomingMovies(results)

    };
    const fetchNowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}&page=4`)

      setNowPlayingMovies(results)

    };
    const fetchPopular = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}&page=6`)

      setPopularMovies(results)

    };
    const fetchTopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)

      setTopRatedMovies(results)

    };

    const getAllGenre = async () => {
      const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)

      setGenre(genres)

    };

    fetchUpcoming()
    fetchNowPlaying()
    fetchPopular()
    fetchTopRated()
    getAllGenre()
  }, [])
  return (
    <section className='home'>
      <div className="banner" style={{
        backgroundImage: popularMovies[4] ? `url(${`${imgUrl}/${popularMovies[4].poster_path}`})` : "$bg-color:rgb(16, 16,16);"
      }}>

        {popularMovies[4] && <h1>{popularMovies[4].original_title}</h1>}
        {popularMovies[4] && <p>{popularMovies[4].overview}</p>}

        <div>
          <button> <BiPlay /> PLay </button>
          <button>My LIst <AiOutlinePlus /> </button>
        </div>



      </div>


      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
      </div>

    </section>
  )
}

export default Home
