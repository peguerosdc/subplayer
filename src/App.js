import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { Router } from "@reach/router"
import { loadPlaylists } from "./redux/actions/playlistsActions"
// UI
import { Container, Content, Footer, Sidebar, Header } from 'rsuite'
import MySidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import MusicPlayer from './components/MusicPlayer'
import InfiniteLineLoader from './components/InfiniteLineLoader'
import ArtistsList from './components/ArtistsList'
import AlbumsList from './components/AlbumsList'
import Artist from './components/Artist'
import AlbumView from './components/AlbumView'
import Playlist from './components/Playlist'
import CreatePlaylistModal from './components//CreatePlaylistModal'
import SearchView from './components/SearchView'
import FavouritesView from './components/FavouritesView'
import Queue from './components/QueueView'
import AlertsManager from './components/AlertsManager'
import RecentlyAdded from './components/RecentlyAddedView'
import Settings from './components/SettingsView'

export class App extends React.Component  {

  constructor(props) {
    super(props)
    this.state = { showModal : false }
  }

  componentDidMount() {
    this.props.loadPlaylists()
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
          <Navbar id="mobileNavbar" onCreatePlaylistTrigger={this.onCreatePlaylist} />
        </Header>
        <InfiniteLineLoader id="loader" isLoading={this.props.asyncTasksInProgress > 0 } />
        { /* Main content */ }
        <Container style={{flex: 1, "overflow":"auto"}}>
          <Sidebar className="rs-hidden-xs rs-hidden-sm">
            <MySidebar id="sidebar" onCreatePlaylistTrigger={this.onCreatePlaylist} />
          </Sidebar>
          <Content className="main-content" style={{"overflow":"auto"}}>
            <Router style={{height:"100%"}}>
                <RecentlyAdded path="/latest" default/>
                <ArtistsList path="/artists"/>
                <Artist path="/artists/:artistId"/>
                <AlbumsList path="/album"/>
                <AlbumView path="/album/:albumId"/>
                <Playlist path="/playlist/:playlistId"/>
                <SearchView path="/search"/>
                <FavouritesView path="/favourites" />
                <Queue path="/queue" />
                <Settings path="/settings" />
            </Router>
          </Content>
        </Container>
        { /* music player */ }
        <Footer>
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

const mapDispatchToProps = { loadPlaylists }

App.propTypes = {
    asyncTasksInProgress : PropTypes.number,
    loadPlaylists : PropTypes.func.isRequired,
}

App.defaultProps = {
    asyncTasksInProgress : 0
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)