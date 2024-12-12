import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Artists from './components/Artists';
import Songs from './components/Songs';
import Users from './components/Users';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <ul>  
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/artists'>Artists</Link>
            </li>
            <li>
              <Link to='/songs'>Songs</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
          </ul>
        </header>
        <main>
          <Routes>
            <Route path='/' />
            <Route path='/artists' element={<Artists/>}/>
            <Route path='/songs' element={<Songs/>}/>
            <Route path='/users' element={<Users/>}/>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
