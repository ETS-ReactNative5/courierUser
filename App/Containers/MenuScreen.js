import React, { Component } from 'react'
import { connect } from 'react-redux'
import {BackHandler} from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MenuScreenStyle'
import ProfileScreen from './ProfileScreen'
import DriverNewOrderScreen from './DriverNewOrderScreen'
import Drawer from 'react-native-drawer'
import MapScreen from './MapScreen'
class MenuScreen extends Component {
  closeDrawer = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  componentDidMount () {
    // const that = this
    BackHandler.addEventListener('hardwareBackPress', this.backPress)
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backPress)
  }
  backPress = () => true
  render () {
    return (
      <Drawer
        type='overlay'
        tweenEasing='linear'
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
        tapToClose
        openDrawerOffset={100} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        ref={(ref) => this._drawer = ref}
        content={<ProfileScreen navigation={this.props.navigation} closeDrawer={this.closeDrawer} />}
      >
        <MapScreen navigation={this.props.navigation} open={() => { this.openControlPanel() }}
        />
      </Drawer>
    )
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3}
}
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen)
