import React from 'react'
import { connect } from "react-redux"
import './App.css'
import 'rsuite/styles/index.less'
import './index.less'
import { Router } from "@reach/router"
import { logout } from "./redux/actions/authActions"
import { createPlaylist, loadPlaylists } from "./redux/actions/playlistsActions"
// UI
import { Container, Content, Footer, Sidebar, Header } from 'rsuite'
import MySidebar from './components/sidebar/Sidebar'
import Navbar from './components/navbar/Navbar'
import MusicPlayer from './components/player/MusicPlayer'
import InfiniteLineLoader from './components/common/InfiniteLineLoader'
import ArtistsList from './components/artists/ArtistsList'
import Artist from './components/artists/Artist'
import AlbumView from './components/albums/AlbumView'
import Playlist from './components/playlists/Playlist'
import CreatePlaylistModal from './components/common/CreatePlaylistModal'
import SearchView from './components/search/SearchView'
import FavouritesView from './components/favourites/FavouritesView'
import AlertsManager from './components/alerts/AlertsManager'

class App extends React.Component  {

  constructor(props) {
    super(props)
    this.state = { showModal : false }
  }

  componentDidMount() {
    this.props.loadPlaylists()
  }

  onLogOut = () => {
    this.props.logout()
  }

  onCreatePlaylist = () => {
    this.setState({showModal : true})
  }

  onPlaylistCreated = (name) => {
    this.props.createPlaylist(name)
    this.setState({showModal : false})
  }

  onClosePlaylistModal = () => {
    this.setState({showModal : false})
  }

  render() {
    return (
      <Container style={{ display : "flex", height: "100vh", flexDirection:"column" }}>
        { /* Navbar for mobile navigation */ }
        <Header className="rs-hidden-lg rs-hidden-md">
          <Navbar onLogOut={this.onLogOut} onCreatePlaylistTrigger={this.onCreatePlaylist} />
        </Header>
        <InfiniteLineLoader isLoading={this.props.asyncTasksInProgress > 0 } />
        { /* Main content */ }
        <Container style={{flex: 1, "overflow":"auto"}}>
          <Sidebar className="rs-hidden-xs rs-hidden-sm sidebar">
            <MySidebar onLogOut={this.onLogOut} onCreatePlaylistTrigger={this.onCreatePlaylist} />
          </Sidebar>
          <Content className="main-content" style={{"overflow":"auto"}}>
            <Router style={{height:"100%"}}>
                <ArtistsList path="/artists"/>
                <Artist path="/artists/:artistId"/>
                <AlbumView path="/album/:albumId"/>
                <Playlist path="/playlist/:playlistId"/>
                <SearchView path="/search"/>
                <FavouritesView path="/favourites" />
            </Router>
          </Content>
        </Container>
        { /* music player */ }
        <Footer className="music-player">
          <MusicPlayer />
        </Footer>
        { /* playlist creation modal */ }
        <CreatePlaylistModal showModal={this.state.showModal} createPlaylist={this.onPlaylistCreated} onClosePlaylistModal={this.onClosePlaylistModal} />
        { /* component to handle the alerts */ }
        <AlertsManager />
      </Container>
    )
  }

}

const mapStateToProps = (state) => {
    return {
        asyncTasksInProgress : state.asyncTasksInProgress,
    }
}

const mapDispatchToProps = { logout, createPlaylist, loadPlaylists }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)