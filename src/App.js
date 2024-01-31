import './App.css';
import Navbar from './Components/navbar';
import Home from './Components/home';
import AboutView from './Components/about';
import SearchView from './Components/search';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArtistView from './Components/artists';
import PageNotFound from './Components/notFound';

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleSearch = () =>{
    console.log(`${searchText} is the search`);

    const clientId = '523597aa04054f2b80d24e857ea34d6c';
    const clientSecret = 'effbe404b5254cadb0adf34dc5e770b9';
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const searchURL = `https://api.spotify.com/v1/search?q=${searchText}&type=artist&limit=12`;

    if(searchText){
      fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      })
      .then(response => response.json())
      .then(data => {
  
        const accessToken = data.access_token;
  
        fetch(searchURL, {
          method:'GET',
          headers: {
            Authorization:`Bearer ${accessToken}`,
          } 
        }
           
        )
        .then(response => response.json())
        .then(data => {
          console.log(data.artists.items);
          setSearchResults(data.artists.items);
        })
      })
    }

    

    
  }

  return (
    <div>
      <Navbar searchText={searchText} setSearchText={setSearchText} onSearch={handleSearch}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<AboutView/>}/>
        <Route path="/search" element={<SearchView keyword={searchText} searchResults={searchResults}/>}/>
        <Route path="/artists/:id" element={<ArtistView/>}/>
        <Route path="/*" element={<PageNotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
