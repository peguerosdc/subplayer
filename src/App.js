import React from 'react';
import { Router } from "@reach/router";
import './App.css';
import 'rsuite/dist/styles/rsuite.min.css'
import Home from './Home';
// UI
import { Container, Content, Footer, Sidebar } from 'rsuite';
// Music player components
import MySidebar from './components/Sidebar';
import MusicPlayer from './MusicPlayer';
import ArtistsList from './components/artists/ArtistsList'
import Artist from './components/artists/Artist'

const NotFound = () => <p>404! Sorry, nothing here</p>

function App() {
  return (
    <Container style={{ display : "flex", height: "100vh", flexDirection:"column" }}>
      { /* Main content */ }
      <Container style={{flex: 1, "overflow":"auto"}}>
        <Sidebar >
          <MySidebar />
        </Sidebar>
        <Content style={{"overflow":"auto"}}>
          <Router>
              <NotFound default />
              <Home path="/" />
              <ArtistsList path="/artists"/>
              <Artist path="/artists/:artistId"/>
            </Router>
        </Content>
      </Container>
      { /* music player */ }
      <Footer>
        <MusicPlayer />
      </Footer>
    </Container>



  );
}

export default App;
