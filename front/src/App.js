import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

//Components
import Nav from './components/Nav';
import Register from './components/Register';
import Index from './components/Index';
import Login from './components/Login';

const autenticated = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return false;
  }
}

const MyRoute = (props) => {
  return autenticated() ? <Route {...props} /> : <Redirect to='/' />
}

function App() {
  return (
    <Router>
      <Nav />
      <Route path="/" exact component={Login} />
      <Route path="/registrar" exact component={Register} />
      <MyRoute path="/index" exact component={Index} />
    </Router>
  );
}

export default App;
