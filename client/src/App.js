import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Portfolios from './pages/Portfolio';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   request: operation => {
//     const token = localStorage.getItem('id_token')
//     operation.setContext({
//       headers: {
//         authorization: token ? `Bearer ${token}` : ''
//       }
//     })
//   },
//   uri: '/graphql'
// })

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Navbar />
          <div className="container">
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
