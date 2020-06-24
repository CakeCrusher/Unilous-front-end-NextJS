import { withApollo } from "next-apollo"
// import ApolloClient, { HttpLink, InMemoryCache } from "apollo-boost"

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
// https://unilous-graphql-backend.herokuapp.com/graphql
// unilousSecret

// https://unilous-back-end-dev.herokuapp.com/graphql
// https://projectu-back-end-2020.herokuapp.com/graphql
// https://unilous-back-end-nextjs.herokuapp.com/graphql
// Unilous*2000

const httpLink = createHttpLink({
  uri: 'https://unilous-graphql-backend.herokuapp.com/graphql',
})

const authLink = setContext((_, { headers }) => {
  let token = null
  if(typeof window !== 'undefined') {
    token = localStorage.getItem('token')
  }
  return {
      headers: {
          ...headers,
          authorization: token ? `unilousSecret ${token}` : null,
      }
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

// const apolloClient = new ApolloClient({
//   uri: 'https://projectu-back-end-2020.herokuapp.com/graphql',
//   cache: new InMemoryCache(),
//   ssrMode: true
// })

export default withApollo(apolloClient)
