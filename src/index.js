import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from "@reach/router";
// Redux imports
import { Provider } from 'react-redux'
import configureStore from "./redux/configureStore";
// My components
import AuthenticatedComponent from './components/auth/AuthComponentDecorators'
import ArtistsList from './components/artists/ArtistsList'
import Artist from './components/artists/Artist'
import Playlist from './components/playlists/Playlist'
import Login from './components/auth/Login'

// Default components
const NotFound = () => <p>404! Sorry, nothing here</p>
// Init app 
const store = configureStore()
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Login path="/login" />
            <AuthenticatedComponent path="/">
                <App path="/">
                    <NotFound default />
                    <ArtistsList path="/artists"/>
                    <Artist path="/artists/:artistId"/>
                    <Playlist path="/playlist/:playlistId"/>
                </App>
            </AuthenticatedComponent>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
