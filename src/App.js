import './App.css';
import PersonForm from './components/person-form/person-form';
import Home from './components/home/home'
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
}from "react-router-dom";


function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/person-form">
          <PersonForm />
        </Route>
        <Route exact path="/person-form/:id">
          <PersonForm />
        </Route>
        <Route exact path="">
          <Redirect exact from="/" to="/home" />
        </Route>
      </Switch>
    </Router>
  </div>
  );
}

export default App; 
