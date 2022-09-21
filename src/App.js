import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';

function App() {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		const getMovieRequest = async () => {
			const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c5d1db1f`
	
			const response = await fetch(url);
			const responseJson = await response.json();
	
			if (responseJson.Search) {
				setMovies(responseJson.Search)
			}
		};
		
		getMovieRequest(searchValue);
	}, [searchValue]);


	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading="Movies" />
				<SearchBox searhValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList movies={movies} favoriteComponent = {AddFavorites}/>
			</div>
		</div>
	);
};

export default App;