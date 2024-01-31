import { Link } from "react-router-dom";
import Hero from "./hero";


const SearchCard = ({artist}) =>{

    let imgURL='';
    if (artist.images[0]){
        imgURL = artist.images[0].url;
    } else{
        imgURL = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
    }

    const detailUrl = `/artists/${artist.id}`

    return <div className="col-lg-4 col-md-5 col my-4">
        <div className="card" style={{width: '18em'}}>
            <img src={imgURL} width="20%" height="auto" className="card-img-top" alt="no"/>
            <div className="card-body">
                <h5 className="card-title">{artist.name}</h5>
                <p className="card-text">Main Genre: {artist.genres[0]}</p>
                <p className="card-text">Popularity: {artist.popularity}%</p>
                <Link to={detailUrl} className="btn btn-primary">Show details</Link>
            </div>
        </div>
    </div>
}

const SearchView = ({keyword, searchResults}) =>{

    const title = `You are searching for ${keyword}`

    const resultsHtml = searchResults.map((obj, i) => {
        return <SearchCard artist={obj} key={i}/>
    })

    return (
        <>
            <Hero text={title}/>
            <h1>Search results:</h1>
            {searchResults.length ? (
                <div className="container">
                    <div className="row">
                        {resultsHtml}
                    </div>
                </div>
            ) : (
                <h1>No results found :(</h1>
            )}
        </>
    )
    
}

export default SearchView;