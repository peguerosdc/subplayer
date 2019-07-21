import React from 'react';
import { Router } from "@reach/router";
import './App.css';
import 'rsuite/styles/index.less';
import Home from './Home';
// UI
import { Container, Content, Footer, Sidebar, Navbar, Header, Icon, IconButton, Nav, Drawer } from 'rsuite';
// Music player components
import MySidebar from './components/sidebar/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import ArtistsList from './components/artists/ArtistsList'
import Artist from './components/artists/Artist'
import Playlist from './components/playlists/Playlist'

const NotFound = () => <p>404! Sorry, nothing here</p>

class App extends React.Component  {

  constructor(props) {
    super(props)
    this.state = {showDrawer : false}
  }

  showDrawer = (eventKey = null) => {
    this.setState({showDrawer : true})
  }

  hideDrawer = () => {
    this.setState({showDrawer : false})
  }

  render() {
    const showDrawer = this.state.showDrawer
    return (
      <Container style={{ display : "flex", height: "100vh", flexDirection:"column" }}>
        { /* Navbar for mobile navigation */ }
        <Header className="rs-hidden-lg rs-hidden-md">
          <Navbar>
            <Navbar.Body>
              <Nav onSelect={this.showDrawer}>
                <Nav.Item eventKey="drawer" icon={<Icon icon="bars" />}/>
              </Nav>
            </Navbar.Body>
          </Navbar>
        </Header>
        { /* Main content */ }
        <Container style={{flex: 1, "overflow":"auto"}}>
          <Sidebar style={{backgroundColor:"rgb(29,45,60)"}} className="rs-hidden-xs rs-hidden-sm">
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
        { /* Drawer menu for mobile navigation */ }
        <Drawer show={showDrawer} placement="left" size="xs" className="rs-hidden-xs rs-hidden-sm" backdrop={true}>
          <Drawer.Body>
            <MySidebar onNavigatedTo={this.hideDrawer} />
          </Drawer.Body>
          <Drawer.Footer>
            <IconButton appearance="link" onClick={this.hideDrawer} icon={<Icon icon="angle-left" />} />
          </Drawer.Footer>
        </Drawer>
      </Container>
    );
  }

}

export default App;
