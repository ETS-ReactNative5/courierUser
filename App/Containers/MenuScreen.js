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
import AsyncStorage from '@react-native-community/async-storage'
import API from '../Services/Api'
class MenuScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      first_name: '',
      id: '',
      last_name: '',
      phone_number: '',
      username: 'Morqan'
    }
    this.getUserData()
  }
  getUserData = async () => {
    const token = await AsyncStorage.getItem('@token')
    this.token = 'Bearer ' + token
    const api = API.create()
    let headers = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token
      }
    }
    const getUserData = await api.getUserData(headers)
    console.log(getUserData.data)
    if (getUserData.status === 200) {
      this.setState({
        loading: false
      })
      AsyncStorage.setItem('@verId', getUserData.data.id)
    } else {
      console.log(getUserData)
      this.setState({
        error: getUserData.data.msg,
        loading: false
      })
    }
  }
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
    profil: state.profil.payload,
    password: state.login.password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen)
