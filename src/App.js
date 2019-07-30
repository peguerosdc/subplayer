import React from 'react';
import { connect } from "react-redux";
import './App.css';
import 'rsuite/styles/index.less';
import './index.less'
import * as alerts from "./utils/alertUtils";
import { Router } from "@reach/router";
import { logout } from "./redux/actions/authActions";
import { createPlaylist, loadPlaylists } from "./redux/actions/playlistsActions";
// UI
import { Container, Content, Footer, Sidebar, Header, Alert } from 'rsuite';
import MySidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import MusicPlayer from './components/player/MusicPlayer';
import InfiniteLineLoader from './components/common/InfiniteLineLoader'
import ArtistsList from './components/artists/ArtistsList'
import Artist from './components/artists/Artist'
import AlbumView from './components/albums/AlbumView'
import Playlist from './components/playlists/Playlist'
import CreatePlaylistModal from './components/common/CreatePlaylistModal'
import SearchView from './components/search/SearchView'

class App extends React.Component  {

  constructor(props) {
    super(props)
    this.state = { showModal : false }
  }

  componentDidMount() {
    this.props.loadPlaylists()
  }

  componentDidUpdate(prevProps) {
    const currentOperationResult = this.props.lastUpdateOperationResult
    if( prevProps.lastUpdateOperationResult !== currentOperationResult){
      if( currentOperationResult.result === alerts.SUCCESS ) {
        Alert.success(currentOperationResult.message)
      }
      else if( currentOperationResult.result === alerts.WARNING ) {
        Alert.warning(currentOperationResult.message) 
      }
      else {
        Alert.error(currentOperationResult.message)  
      }
    }
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
        <InfiniteLineLoader isLoading={this.props.apiCallsInProgress > 0 } />
        { /* Navbar for mobile navigation */ }
        <Header className="rs-hidden-lg rs-hidden-md">
          <Navbar onLogOut={this.onLogOut} onCreatePlaylistTrigger={this.onCreatePlaylist} />
        </Header>
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
            </Router>
          </Content>
        </Container>
        { /* music player */ }
        <Footer className="music-player">
          <MusicPlayer />
        </Footer>
        { /* playlist creation modal */ }
        <CreatePlaylistModal showModal={this.state.showModal} createPlaylist={this.onPlaylistCreated} onClosePlaylistModal={this.onClosePlaylistModal} />
      </Container>
    );
  }

}

const mapStateToProps = (state) => {
    return {
        lastUpdateOperationResult : state.playlists.lastUpdateOperationResult,
        apiCallsInProgress : state.apiCallsInProgress
    }
}

const mapDispatchToProps = { logout, createPlaylist, loadPlaylists }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)