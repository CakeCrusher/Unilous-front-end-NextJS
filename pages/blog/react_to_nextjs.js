import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import B from '../../styles/blog.module.css'

const RtN = () => {
    const reactPackages = `
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
},`
    const nextPackages = `
"scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
},`
    const routerItems = `
<BrowserRouter>
    <NavBar onQueryChange={onQueryChange} enteredSearch={enteredSearch} />
    <Route exact path="/" render={() => <Home search={search} /> } />
    <Route path="/post/:id" render={({match}) => <PostPage postId={match.params.id} /> } />
</BrowserRouter>`
    const layout = `
<NavBar onQueryChange={onQueryChange} enteredSearch={enteredSearch} />
{props.children}`
    const layoutPage = `
import Layout from '../components/Layout'

const Page = () => {
    return (
        <Layout>
        
        ...

        </Layout>
    )
}`
    const bindMiddleware = `
const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}`
    const store = `
const store = () => createStore(reducers, bindMiddleware([thunkMiddleware]))`
    const oldDispatch = `
export default connect(
    mapStateToProps,
    {changeReducer}
)(Page)`
    const newDispatch = `
import {bindActionCreators} from 'redux'

...

const mapDispatchToProps = (dispatch) => {
    return {
        changeReducer: bindActionCreators(changeReducer, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)`
    const apolloExport = `
import { withApollo } from "next-apollo"

...

export default withApollo(apolloClientVariable)`
    const oldToken = `
const token = localStorage.getItem('token')`
    const newToken = `
let token = null
if(typeof window !== 'undefined') {
    token = localStorage.getItem('token')
}`
    const getInitialPropsEx = `
import {apolloClient} from '../lib/apollo'
import {FIND_POST} from '../schemas/queries'

const Page = (props) => {
    const post = props.post
    ...
}

Page.getInitialProps = async () => {
    const postQuery = await apolloClient.query({
        query: FIND_POST,
        variables: {title: 'Unilous'} 
    }).catch(err => console.log(err))
    return {
        post: postQuery.data.findPost,
    }
}`
    const _appRC = `
import { Provider } from 'react-redux'

const MyApp = ({ Component, pageProps, store }) => {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}`
    const _appGIP = `
MyApp.getInitialProps = async ({Component, ctx}) => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    if (Object.keys(pageProps).length > 0) {
        return {pageProps};
    } else {
        return {};
    }
};`
    const _appDE = `
import initStore from '../redux/store'
import withRedux from 'next-redux-wrapper'
import {compose} from 'redux'
import withApollo from '../lib/apollo'

...

export default compose(withRedux(initStore), withApollo({ssr: true}))(MyApp)`
    const oldSVG = `
import logo from '../static/svg/logo.svg'

...

return (
    <img src={logo} />
)`
const newSVG = `
return (
    <img src="/svg/logo.svg" />
)`

    return (
        <Layout>
            <Head>
                <title>Converting a React app with Redux and Apollo to Next.JS | Unilous</title>
                <meta property="og:image" content="https://i.imgur.com/mW3nk8o.jpg" key="title" />
                <meta name="description" content="I will cover the key changes I had to make when converting my React application with both Redux (state management) and Apollo (GraphQL API), to Next.JS." key="description"/>
            </Head>
            <div className="navbar-height" />
            <article className={B.container}>
                <Link href="/user/[username]" as="/user/SebastianSosa">
                    <a className={`${B.authorContainer} neutralize-link`}>
                        <img src="/svg/userB.svg" className={B.userIcon} />
                        <p className={B.authorName}>SebastianSosa</p>
                    </a>
                </Link>
                <h1 className={B.title} style={{marginTop: '0px'}}>Converting a React application with Redux and Apollo to Next.JS</h1>
                <img className={B.imgTitle} src="https://i.imgur.com/mW3nk8o.jpg" />
                <p className={B.text}>
                    If you have clicked on this blog odds are that you have heard of <a href="https://nextjs.org/">Next.JS</a>, if not allow me to introduce it. 
                    Next.JS is a <a href="https://reactjs.org/">React</a> framework that is best known for its server side rendering capabilities which allows for better search engine optimization (SEO). 
                    In short the reason for which we at Unilous among other React developers switch to Next.JS is to alleviate the hassle of SEO in the most effective manner.
                </p>
                <p className={B.text}>
                    Although Next.JS is already built on the shoulders of React, there are still many challenges which need to be overcome before getting the application up and running.
                    For this guide I will touch on the key changes I had to make when converting my React application with the centralized state management: <a href="https://redux.js.org/">Redux</a>, and the GraphQL API: <a href="https://www.apollographql.com/">Apollo</a>, to Next.JS. 
                </p>
                <p className={B.text}>
                    My top resources for figuring all of this out were the <a href="https://github.com/vercel/next.js/tree/master/examples">official Next.JS examples on GitHub</a> and the <a href="https://nextjs.org/learn/basics/create-nextjs-app">official guide on Next.js</a>. 
                    <strong>I highly suggest you finish official guide on Next.JS before transforming your applcation.</strong>
                </p>
                <p className={B.text}>
                    For reference this is what your final Next.JS application should look like.
                </p>
                <div style={{display: 'grid'}}>
                    <img className={B.imgSM} src="https://i.imgur.com/3HosEcE.png" />
                </div>
                <ol className={B.listContainer}>
                    <li className={B.listItem}>
                        <h2 className={B.title}>1. Update your node environment</h2>
                        <p className={B.text}>
                            First you must set up the proper node packages so that the application runs as a Next.JS app rather than a React app.
                        </p>
                        <p className={B.text}>
                            You will need to replace the following scripts from React
                        </p>
                        <div className={`${B.codeContainer} ${B.remove}`}>
                            <code>{reactPackages}</code>
                        </div>
                        <p className={B.text}>
                            With the standard Next.JS scripts
                        </p>
                        <div className={`${B.codeContainer} ${B.add}`}>
                            <code>{nextPackages}</code>
                        </div>
                    </li>
                    <li className={B.listItem}>
                        <h2 className={B.title}>2. Adjusting navigation</h2>
                        <p className={B.text}>
                            Next.JS routing depends on the file structure whereas React routing was dependent on the <span className={B.codeBit}><code>BrowserRouter</code></span> component. 
                            This process can be separated into several steps...
                        </p>
                        <h3 className={B.subTitle}>a. Reorganize components</h3>
                        <p className={B.text}>
                            Next.JS requires a root level folder named <span className={B.codeLike}>pages</span>.
                        </p>
                        <div style={{display: 'grid'}}>
                            <img className={B.imgSM} src="https://i.imgur.com/3FfHkZg.png" />
                        </div>
                        <p className={B.text}>
                            Within this folder is where all of the routing happens. 
                            You can think of the pages folder as the host of your site and the files within the folder are paths with an exception of <span className={B.codeLike}>index.js</span> which will serve as the host page.
                            For more information on routing in Next.JS I reccomend this <a href="https://nextjs.org/learn/basics/navigate-between-pages/pages-in-nextjs">guide</a> from its official documentation.
                        </p>
                        <p className={B.text}>
                            To accomplish this you will need to move all of your root page files excluding your <span className={B.codeLike}>App.js</span> file into a new pages folder.
                            Next I strongly suggest you rename all of your files to follow <a href="https://library.stanford.edu/research/data-management-services/data-best-practices/best-practices-file-naming" rel="nofollow">proper url naming conventions</a> so that you avoid problems with browsers and ensure your url remains readable.
                            In the case that you have dynamic routes you will need to follow this <a href="https://nextjs.org/learn/basics/dynamic-routes">guide</a> from the official Next.JS documentation.
                        </p>
                        <h3 className={B.subTitle}>b. Transform <span className={B.codeLike}>App.js</span> to <span className={B.codeLike}>Layout.js</span></h3>
                        <p className={B.text}>
                            The traditional <span className={B.codeLike}>App.js</span> serves to distribute components to all of the pages to ensure they have a uniform appearance. 
                            In Next.JS, since all of the pages are independent of each other, that will no longer work. 
                        </p>
                        <p className={B.text}>
                            Usually within this App.js file you will contain the <span className={B.codeBit}><code>BrowserRouter</code></span> component, the navigation bar or header, and the footer. 
                            To get started adjusting this file, rename it to <span className={B.codeLike}>Layout.js</span>, then move this file to the <span className={B.codeLike}>components</span> folder and relocate the <span className={B.codeLike}>components</span> folder to the root application directory. 
                            Then remove the <span className={B.codeBit}><code>BrowserRouter</code></span> component along with the <span className={B.codeBit}><code>Route</code></span> components within it, as they are no longer needed. 
                        </p>
                        <div className={`${B.codeContainer} ${B.remove}`}>
                            <code>{routerItems}</code>
                        </div>
                        <p className={B.text}>
                            In its place leave the other components like the navigation bar and add <span className={B.codeBit}><code>{'{props.children}'}</code></span>
                        </p>
                        <div className={`${B.codeContainer} ${B.add}`}>
                            <code>{layout}</code>
                        </div>
                        <p className={B.text}>
                            Now that the global components are not destributed by the <span className={B.codeLike}>App.js</span> you will need to import the <span className={B.codeLike}>Layout.js</span> and have it wrap your each of your <span className={B.codeLike}>pages</span> files.
                            The resulting code should look like this...
                        </p>
                        <div className={`${B.codeContainer} ${B.add}`}>
                            <code>{layoutPage}</code>
                        </div>
                        <h3 className={B.subTitle}>c. Redirect paths</h3>
                        <p className={B.text}>
                            Once you have your <span className={B.codeLike}>pages</span> folder setup make sure to redirect all paths to other files within the folder as they have been relocated within your application.
                        </p>
                    </li>
                    <li className={B.listItem}>
                        <h2 className={B.title}>3. Adjusting Redux</h2>
                        <p className={B.text}>
                            Redux integration to react looks mostly the same throughout the whole application.
                            The reducers do not need to be changed in any way outside of relocating them to the root of your project.
                            The <span className={B.codeLike}>store.js</span> on the other hand does receive two additions to be able to implement Thunk into Redux as middleware.
                        </p>
                        <p className={B.text}>
                            First you must implement the following function to connect the middleware to Redux.
                        </p>
                        <div className={`${B.codeContainer} ${B.add}`}>
                            <code>{bindMiddleware}</code>
                        </div>
                        <p className={B.text}>
                            Then the <span className={B.codeBit}><code>bindMiddleware</code></span> function must be implemented before exporting the store.
                            To do that we replace the <span className={B.codeBit}><code>applyMiddleware</code></span> function with <span className={B.codeBit}><code>bindMiddleware</code></span> and place the bind middleware inside.
                            Additionally we make the store a function to avoid errors later on.
                            The final store variable should look like the following...
                        </p>
                        <div className={`${B.codeContainer} ${B.add}`}>
                            <code>{store}</code>
                        </div>
                        <p className={B.text}>
                            This will then affect the way you will need to map dispatch to props, by requiring the use of the <span className={B.codeBit}><code>bindActionCreators</code></span> import from redux.
                            In the end any file that needs to dispatch to props will need to change from this...
                        </p>
                        <div className={`${B.codeContainer} ${B.remove}`}>
                            <code>{oldDispatch}</code>
                        </div>
                        <p className={B.text}>
                            to something similar to this...
                        </p>
                        <div className={`${B.codeContainer} ${B.add}`}>
                            <code>{newDispatch}</code>
                        </div>
                        <p className={B.text}>
                            There will be some more changes needed to get Redux to work but I will address them in part 5.
                        </p>
                    </li>
                    <li className={B.listItem}>
                        <h2 className={B.title}>4. Integrating Apollo</h2>
                        <p className={B.text}>
                            The integration of Apollo requires a dew changes much like redux. 
                            The first change will be to relocate the <span className={B.codeBit}><code>ApolloClient</code></span> and everything connected within it to its own <span className={B.codeLike}>apollo.js</span> file, then move that file inside a folder named <span className={B.codeLike}>lib</span> on the root of the app. 
                            Once <span className={B.codeLike}>apollo.js</span> is in its new folder, make sure to to export whatever variable you have <span className={B.codeBit}><code>ApolloClient</code></span> set to. 
                            For the default export you will need to utilize the withApollo import from Next.JS, the final default export will look like the following...
                        </p>
                        <div className={`${B.codeContainer} ${B.add}`}>
                            <code>{apolloExport}</code>
                        </div>
                        <p className={B.text}>
                            Additionally in the case that you have have user authentication and rely on a browsers <span className={B.codeBit}><code>localStorage</code></span>, you will need to make the following change to the way you get your <span className={B.codeBit}><code>token</code></span>.
                            From this...
                        </p>
                        <div className={`${B.codeContainer} ${B.remove}`}>
                            <code>{oldToken}</code>
                        </div>
                        <p className={B.text}>
                            To this...
                        </p>
                        <div className={`${B.codeContainer} ${B.add}`}>
                            <code>{newToken}</code>
                        </div>
                        <p className={B.text}>
                            This lack of access to browser utilities as a result of server side routing results in the biggest change to working with Apollo in Next.JS. 
                            The same issue with the token will likely occur in other areas of your application depending on how you interact with browser utilities like <span className={B.codeBit}><code>localStorage</code></span>.
                            In general I recommend that that you reduce the amount of code that lies inside <span className={B.codeBit}><code>if(typeof window !== 'undefined') {'{}'}</code></span>. 
                            Additionally you should include an <span className={B.codeBit}><code>else</code></span> statement for when that information cannot be received so that your component does not render blank coming into the client.
                        </p>
                        <p className={B.text}>
                            As a means of dealing with the same issue posed by server side rendering, Next.JS provides the functionality to load data while on render. 
                            To do that Next.JS provides the <span className={B.codeBit}><code>getInitialProps</code></span> functionality which is ran before the actual React component is rendered. 
                            This means that crawlers will have access to you page with the data already rendered.
                            Once that data is fetched it can then be passed as a prop to the same React component. 
                            The code would look similar to this...
                        </p>
                        <div className={`${B.codeContainer} ${B.add}`}>
                            <code>{getInitialPropsEx}</code>
                        </div>
                        <p className={B.text}>
                            One thing to note is that only files under the <span className={B.codeLike}>pages</span> directory can use <span className={B.codeBit}><code>getInitialProps</code></span> so components wont have this option. 
                        </p>
                        <p className={B.text}>
                            There will be some more changes needed to get Apollo to work but I will address them in part 5.
                        </p>
                    </li>
                    <li className={B.listItem}>
                        <h2 className={B.title}>5. Formatting <span className={B.codeLike}>index.js</span> to <span className={B.codeLike}>_app.js</span></h2>
                        <p className={B.text}>
                            The index file is used to connect other top level technologies like Apollo and Redux. 
                            Next.JS requires a similar file, this file must to be named <span className={B.codeLike}>_app.js</span> and be located inside the pages folder. 
                            Since we have already separated the Apollo code into its dedicated file the <span className={B.codeLike}>_app.js</span> file becomes very simple. 
                            The <span className={B.codeLike}>_app.js</span> file will now only contain a React component with a <span className={B.codeBit}><code>getInitialProps</code></span> attached to it and a somewhat complicated default export.
                        </p>
                        <p className={B.text}>
                            For the React component the props will need to get destructured into the key components <span className={B.codeBit}><code>{`{ Component, pageProps, store }`}</code></span>. 
                            The <span className={B.codeBit}><code>Component</code></span> will serve as the x component that lies inside then you mist pass the <span className={B.codeBit}><code>pageProps</code></span> for its attributes. 
                            The <span className={B.codeBit}><code>Component</code></span> will only need to be wrapped by the <span className={B.codeLike}>react-redux</span> <span className={B.codeBit}><code>Provider</code></span> where the <span className={B.codeBit}><code>store</code></span> will be passed. 
                            The resulting code will look like this...
                        </p>
                        <div className={`${B.codeContainer} ${B.add}`}>
                            <code>{_appRC}</code>
                        </div>
                        <p className={B.text}>
                            Unfortunately you cannot get access to props without directly adding the following <span className={B.codeBit}><code>getInitialProps</code></span>. 
                            This serves to pass the props to the rest of the pages. 
                            The code will look like this...
                        </p>
                        <div className={`${B.codeContainer} ${B.add}`}>
                            <code>{_appGIP}</code>
                        </div>
                        <p className={B.text}>
                            The default export for <span className={B.codeLike}>_app.js</span> is far from ordinary as it requires some final additions. 
                            The redux store needs to be wrapped around the <span className={B.codeBit}><code>withRedux</code></span> wrapper provided by Next.JS.
                            The Apollo component needs you to indicate that the application is server side rendered (SSR) with <span className={B.codeBit}><code>{`{ssr: true}`}</code></span>.
                            Finally you stitch together both React and Apollo with the <span className={B.codeBit}><code>compose</code></span> function from <span className={B.codeLike}>redux</span>. 
                            The final code will look like this...
                        </p>
                        <div className={`${B.codeContainer} ${B.add}`}>
                            <code>{_appDE}</code>
                        </div>
                    </li>
                    <li className={B.listItem}>
                        <h2 className={B.title}>6. Working with static files</h2>
                        <p className={B.text}>
                            For static files there are only a few minor changes needed.
                            First the static folder should be moved to the root directory of your applications. 
                            In the case that you have any SVGs you will need to move them to the <span className={B.codeLike}>public</span> folder.
                            Now that the static folder is finalized in the root directory all that is left is to update paths leading to it.
                        </p>
                        <p className={B.text}>
                            Since the SVGs are now located under the <span className={B.codeLike}>public</span> folder there will need to be one major change towards accessing th SVGs.
                            Unlike before where you would import SVGs into your application and distribute them as a variable, like so...
                        </p>
                        <div className={`${B.codeContainer} ${B.remove}`}>
                            <code>{oldSVG}</code>
                        </div>
                        <p className={B.text}>
                            Now you can simply access your SVGs through a route as if your <span className={B.codeLike}>public</span> folder was the host 
                        </p>
                        <div className={`${B.codeContainer} ${B.add}`}>
                            <code>{newSVG}</code>
                        </div>
                        <p className={B.text}>
                            Next.JS also offers a great feature with files by simply adding a <span className={B.codeLike}>.module</span> to  CSS files. 
                            This feature serves to better organize the naming of styles.
                            To learn more about this feature visit this <a href="https://nextjs.org/learn/basics/assets-metadata-css/layout-component">guide</a> from the official Next.JS documentation.
                        </p>
                    </li>
                </ol>
            </article>
        </Layout>
    )
}

const mapStateToProps = (state) => {
	return {
        // currentUser: state.currentUser,
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        // setUserDD: bindActionCreators(setUserDD, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RtN)