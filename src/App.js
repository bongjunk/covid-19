import './App.css';
import Main from './Main';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

function App() {

  return (
      <BrowserRouter>
        <header class="header">
          코로나바이러스감염증-19(국내통계)
          <nav>
            <a><Link to="/">HOME</Link></a>
            <a><Link to="/about">About</Link></a>
            <a><Link to="/work">Work</Link></a>
            <a><Link to="/contact">Contact</Link></a>
          </nav>
        </header>

        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/about'>
            <div>프로필</div>
            <p>안녕하세요</p>
          </Route>
          <Route path='/work'>
            <div>포트폴리오</div>
            <p>제작중</p>
          </Route>
          <Route path='/contact'>
            <div>이메일</div>
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
