import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {setContext} from '@apollo/client/link/context'

// apollo client set up
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
})

const authLink = setContext((_,{headers})=>{
  const token = localStorage.getItem('authToken')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }

})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
