import React from 'react';
import { connect } from "react-redux";
import './App.css';
import 'rsuite/styles/index.less';
import * as alerts from "./utils/alertUtils";
import { Router, navigate } from "@reach/router";
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
import Playlist from './components/playlists/Playlist'
import CreatePlaylistModal from './components/common/CreatePlaylistModal'

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

  onNavigate = (link) => {
    navigate(link)
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
          <Navbar onNavigateTo={this.onNavigate} onLogOut={this.onLogOut} onCreatePlaylistTrigger={this.onCreatePlaylist} />
        </Header>
        { /* Main content */ }
        <Container style={{flex: 1, "overflow":"auto"}}>
          <Sidebar style={{backgroundColor:"rgb(29,45,60)"}} className="rs-hidden-xs rs-hidden-sm">
            <MySidebar onNavigateTo={this.onNavigate} onLogOut={this.onLogOut} onCreatePlaylistTrigger={this.onCreatePlaylist} />
          </Sidebar>
          <Content style={{"overflow":"auto", backgroundImage:"radial-gradient(rgb(29,42,58), rgb(24,44,60), rgb(11,24,39))"}}>
            <Router style={{height:"100%"}}>
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