import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route , Redirect} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import QuoteDetails from './components/QuoteDetails/QuoteDetails'


function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />
      <Switch>
          <Route path="/" exact component={() => <Redirect to="/quotes" />} />
          <Route path="/quotes" exact component={Home} />
          <Route path="/quotes/search" exact component={Home} />
          <Route path="/quotes/:id" exact component={QuoteDetails} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/quotes" />)} />
      </Switch>
    </Container>
  </BrowserRouter>
    
  )
}

export default App
