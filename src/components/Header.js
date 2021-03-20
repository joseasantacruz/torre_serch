import './App.css';

function Header() {
  return (
    <header className="App-header">
        <div className="menu-header">
            <a className="a-header">Torre Search </a>
            <div className="boton-header">
                <a className="nav-link" href="/people">People</a>
                <a className="nav-link" href="/jobs">Jobs</a>
        </div>
        </div>
    </header>
  );
}

export default Header;