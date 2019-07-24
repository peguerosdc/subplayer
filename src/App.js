import React from 'react';
import { connect } from "react-redux";
import './App.css';
import 'rsuite/styles/index.less';
import * as alerts from "./utils/alertUtils";
// UI
import { Container, Content, Footer, Sidebar, Navbar, Header, Icon, IconButton, Nav, Drawer, Alert } from 'rsuite';
import MySidebar from './components/sidebar/Sidebar';
import MusicPlayer from './components/player/MusicPlayer';

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

  render() {
    const showDrawer = this.state.showDrawer
    return (
      <Container style={{ display : "flex", height: "100vh", flexDirection:"column" }}>
        { /* Navbar for mobile navigation */ }
        <Header className="rs-hidden-lg rs-hidden-md">
          <Navbar>
            <Navbar.Body>
              <Nav onSelect={this.showDrawer}>
                <Nav.Item eventKey="drawer" icon={<Icon icon="bars" style={{color:"white"}} />}/>
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
            {this.props.children}
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

const mapStateToProps = (state) => {
    return {
        lastUpdateOperationResult : state.playlists.lastUpdateOperationResult,
    }
}

export default connect(
    mapStateToProps,
    null
)(App)