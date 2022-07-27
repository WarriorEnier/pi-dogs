import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/home/dog/:id' component={Detail}/>
          <Route path='/home' component={Home}/>
          <Route exact path='/' component={LandingPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
