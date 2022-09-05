import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';


function App() {

	const [movies, setMovies] = useState([]);

	const getMovieRequest = async () => {
		const url = "http://www.omdbapi.com/?s=batman&apikey=c5d1db1f"

		const response = await fetch(url);
		const responseJson = await response.json();

		setMovies(responseJson.Search);
	};

	useEffect(() => {
		getMovieRequest();
	}, []);

	return (
		<div className='container-fluid movie-app'>
			<div className='row'>
				<MovieListHeading heading="Movies" />
			</div>
			<div className='row'>
				<MovieList movies={movies} />
			</div>
		</div>
	);
}

export default App;
