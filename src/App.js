import React from 'react';
import { Router } from "@reach/router";
import './App.css';
import 'rsuite/styles/index.less';
import Home from './Home';
// UI
import { Container, Content, Footer, Sidebar } from 'rsuite';
// Music player components
import MySidebar from './components/sidebar/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import ArtistsList from './components/artists/ArtistsList'
import Artist from './components/artists/Artist'
import Playlist from './components/playlists/Playlist'

const NotFound = () => <p>404! Sorry, nothing here</p>

function App() {
  return (
    <Container style={{ display : "flex", height: "100vh", flexDirection:"column" }}>
      { /* Main content */ }
      <Container style={{flex: 1, "overflow":"auto"}}>
        <Sidebar style={{backgroundColor:"rgb(29,45,60)"}} >
          <MySidebar />
        </Sidebar>
        <Content style={{"overflow":"auto", backgroundImage:"radial-gradient(rgb(29,42,58), rgb(24,44,60), rgb(11,24,39))"}}>
          <Router>
              <NotFound default />
              <Home path="/" />
              <ArtistsList path="/artists"/>
              <Artist path="/artists/:artistId"/>
              <Playlist path="/playlist/:playlistId"/>
            </Router>
        </Content>
      </Container>
      { /* music player */ }
      <Footer style={{backgroundColor:"rgb(42,62,82)"}}>
        <MusicPlayer />
      </Footer>
    </Container>



  );
}

export default App;
