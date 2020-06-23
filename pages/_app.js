import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import initStore from '../redux/store'
import {compose} from 'redux'
import withApollo from '../lib/apollo'
import '../styles/base.css'
import '../styles/notifs.css'

const MyApp = ({ Component, pageProps, store }) => {
  return (
      <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
  )
}

MyApp.getInitialProps = async ({Component, ctx}) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  if (Object.keys(pageProps).length > 0) {
    return {pageProps};
  } else {
    return {};
  }
};

export default compose(withRedux(initStore), withApollo({ssr: true}))(MyApp)
