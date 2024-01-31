import {useNavigate, Link} from 'react-router-dom';

const Navbar = ({searchText, setSearchText, onSearch}) =>{

  const navigate = useNavigate()

  const updateSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchButtonClick = (event) => {
    event.preventDefault();
    onSearch();
    navigate("/search");
  };

    return (
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">Music Browser</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about">About</Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearchButtonClick}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchText} onChange={updateSearchText}/>
              <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    );
  }

export default Navbar;