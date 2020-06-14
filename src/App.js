import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import './App.css'
import 'rsuite/lib/styles/themes/dark/index.less'
import './index.less'
import { Router } from "@reach/router"
import { logout } from "./redux/actions/authActions"
import { loadPlaylists } from "./redux/actions/playlistsActions"
// UI
import { Container, Content, Footer, Sidebar, Header } from 'rsuite'
import MySidebar from './components/sidebar/Sidebar'
import Navbar from './components/navbar/Navbar'
import MusicPlayer from './components/player/MusicPlayer'
import InfiniteLineLoader from './components/common/InfiniteLineLoader/InfiniteLineLoader'
import ArtistsList from './components/artists/ArtistsList/ArtistsList'
import Artist from './components/artists/Artist'
import AlbumView from './components/albums/AlbumView/AlbumView'
import Playlist from './components/playlists/Playlist'
import CreatePlaylistModal from './components/common/CreatePlaylistModal/CreatePlaylistModal'
import SearchView from './components/search/SearchView'
import FavouritesView from './components/favourites/FavouritesView'
import Queue from './components/queue/Queue'
import AlertsManager from './components/alerts/AlertsManager'
import RecentlyAdded from './components/latest/RecentlyAdded'

export class App extends React.Component  {

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

  onClosePlaylistModal = () => {
    this.setState({showModal : false})
  }

  render() {
    return (
      <Container style={{ display : "flex", height: "100vh", flexDirection:"column" }}>
        { /* Navbar for mobile navigation */ }
        <Header className="rs-hidden-lg rs-hidden-md">
          <Navbar id="mobileNavbar" onLogOut={this.onLogOut} onCreatePlaylistTrigger={this.onCreatePlaylist} />
        </Header>
        <InfiniteLineLoader id="loader" isLoading={this.props.asyncTasksInProgress > 0 } />
        { /* Main content */ }
        <Container style={{flex: 1, "overflow":"auto"}}>
          <Sidebar className="rs-hidden-xs rs-hidden-sm sidebar">
            <MySidebar id="sidebar" onLogOut={this.onLogOut} onCreatePlaylistTrigger={this.onCreatePlaylist} />
          </Sidebar>
          <Content className="main-content" style={{"overflow":"auto"}}>
            <Router style={{height:"100%"}}>
                <RecentlyAdded path="/latest" default/>
                <ArtistsList path="/artists"/>
                <Artist path="/artists/:artistId"/>
                <AlbumView path="/album/:albumId"/>
                <Playlist path="/playlist/:playlistId"/>
                <SearchView path="/search"/>
                <FavouritesView path="/favourites" />
                <Queue path="/queue" />
            </Router>
          </Content>
        </Container>
        { /* music player */ }
        <Footer className="music-player">
          <MusicPlayer />
        </Footer>
        { /* playlist creation modal */ }
        <CreatePlaylistModal id="createPlaylistModal" showModal={this.state.showModal} onClosePlaylistModal={this.onClosePlaylistModal} />
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

const mapDispatchToProps = { logout, loadPlaylists }

App.propTypes = {
    asyncTasksInProgress : PropTypes.number,
    loadPlaylists : PropTypes.func.isRequired,
    logout : PropTypes.func.isRequired
}

App.defaultProps = {
    asyncTasksInProgress : 0
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)