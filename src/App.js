import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Individual from './components/IndividualResto';
import SearchPage from './components/SearchPage';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/details/:id" exact component={Individual} />
        <Route path="/search/:term" exact component={SearchPage} />
      </Switch>
    </Router>
  );
}

export default App;
