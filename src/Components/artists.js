import { useState } from "react";
import Hero from "./hero";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ArtistView = () =>{
    const {id} = useParams()

    const [artistDetails, setArtistDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    const clientId = '523597aa04054f2b80d24e857ea34d6c';
    const clientSecret = 'effbe404b5254cadb0adf34dc5e770b9';
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const searchURL = `https://api.spotify.com/v1/artists/${id}`;

    useEffect(()=>{
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
              console.log(data);
              setArtistDetails(data);
              setIsLoading(false);
            })
          })
    }, [id])

    function renderArtistDetails(){
        if (isLoading){
            return <Hero text={"Loading..."}/>
        }
        if (artistDetails){

          let imageUrl = '';
          if (artistDetails.images[0]){
            imageUrl = artistDetails.images[0].url;
          } else{
            imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
          }
            

            return <>
                <Hero text={artistDetails.name} backdrop={imageUrl}/>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={imageUrl} className="img-fluid shadow rounded" alt=""/>
                        </div>
                        <div className="col-md-9"> 
                            <h1>{artistDetails.name}</h1>
                            <p>{`Genres: ${artistDetails.genres}`}</p>
                            <p className="fs-3 text-success fw-bold">{`Popularity on Spotify: ${artistDetails.popularity}%`}</p>
                            <Link to={artistDetails.external_urls.spotify} className="btn btn-success">
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-spotify" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
                              </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </> 
        }
    }

    return renderArtistDetails();
}

export default ArtistView;