import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form'
import Error from './components/Error/Error404'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home/dog/form' component={Form}/>
          <Route exact path='/home/dog/:id' component={Detail}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='*' component={Error}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
