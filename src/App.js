import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [favourites, setFavourites] = useState([]);

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

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
	}

	const removeFavourites = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID	
		);

		setFavourites(newFavouriteList);
	}

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading="Movies" />
				<SearchBox searhValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList 
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favoriteComponent = {AddFavourites}
				/>
			</div>

			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading="Favourites" />
			</div>
			<div className='row'>
				<MovieList 
					movies={favourites}
					handleFavouritesClick={removeFavourites}
					favoriteComponent = {RemoveFavourites}
				/>
			</div>
		</div>
	);
};

export default App;