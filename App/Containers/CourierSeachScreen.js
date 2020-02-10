import React, {Component} from 'react'
import {View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import MapView, {Marker} from 'react-native-maps'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {orders} from '../Config/API'
// Styles
import styles from './Styles/CourierSeachScreenStyle'
import MyButton from '../Components/MyButton'
import I18n from '../I18n'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SlidingPanel from 'react-native-sliding-up-down-panels'
import CourierSearchTop from '../Components/CourierSearchTop'
import CourierSearchBody from '../Components/CourierSearchBody'
import AnimatedMarker from '../Components/AnimatedMarker'
import AsyncStorage from '@react-native-community/async-storage'
import ProfileScreen from './ProfileScreen'
import DriverAction from '../Redux/DriverRedux'
import OrderAction from '../Redux/OrderRedux'

import io from 'socket.io-client/dist/socket.io'

class CourierSeachScreen extends Component {
  state = {
    bill_amount: null,
    startLocation: '',
    endLocation: '',
    price: '',
    distance: '',
    latitude: 40.4093,
    longitude: 49.8671,
    error: null,
    markers: {
      latitude: 40.4050531,
      longitude: 49.8346519
    }

  }

  componentDidMount () {
    // const {startLongLat} = this.props
    //
    this.setState({
      bill_amount: this.props.order.bill_amount
    })
    AsyncStorage.getItem('@token')
      .then((token) => {
        this.token = 'Bearer ' + token
        console.log(token)
      })

    const {startLongLat, price, startLocation, endLocation, distance, orderId} = this.props
    this.timer = setInterval(() => this.getDriver(), 1000)
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          startLocation,
          endLocation,
          price,
          orderId,
          distance,
          latitude: startLongLat[0],
          longitude: startLongLat[1],
          markers: {
            ...this.state.markers,
            latitude: startLongLat[0],
            longitude: startLongLat[1]
          },
          error: null
        })
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 50000}
    )
    window.navigator.userAgent = 'ReactNative'
    const socket = io('http://worker.delhero.com', {
      forceNew: true,
      transports: ['websocket']
    })
    socket.on('connect', () => {
      socket.emit('new_order', {
        order_id: this.state.orderId
      })
    })
  }

  async getDriver () {
    const self = this
    let orderUrl = orders + this.state.orderId

    console.log(orderUrl)
    fetch(orderUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token

        // 'X-localization': currentLang
        //   'Accept': 'application/json',
        // 'Content-Type': 'application/json'
      }
    })
      .then(json)
      .then(status)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data)
        console.log(data)
        if (data.status === 'accepted') {
          // if (data.status === 'pending') {
          clearInterval(self.timer)
          self.props.attemptDriver(data)
          self.props.attemptOrder(data)
          self.props.navigation.replace('CourierFoundScreen')
        } else if (data.status === 'rejected') {
          clearInterval(self.timer)
        }
        // self.props.navigation.navigate('OrderScreen')
      })
      .catch(function (error) {
        console.log(error)
        console.log('err')
      })

    function status (response) {
      console.log(response)
      console.log('status')
      console.log('-------')
      console.log(response.status)
      console.log('-------')

      if (response.status != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)

        // return Promise.reject(new Error(response.statusText))
      }
    }

    function json (response) {
      console.log(response)
      console.log('json')
      return response.json()
    }
  }

  onPressCancel = () => {
    let body = {
      status: 'rejected'
    }

    // this.setState({loading: true})
    const self = this
    const ordersUrl = orders + this.props.orderId
    // console.log(body, login)
    console.log(body)

    fetch(ordersUrl, {
      body: JSON.stringify(body),
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token

        // 'X-localization': currentLang
        //   'Accept': 'application/json',
        // 'Content-Type': 'application/json'
      }

    })
      .then(json)
      .then(status)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data)
        console.log(data)
        self.props.attemptOrder(data)
        self.props.navigation.navigate('MenuScreen')
      })
      .catch(function (error) {
        console.log(error)
        console.log('err')
      })

    function status (response) {
      console.log(response)
      console.log('status')
      console.log('-------')
      console.log(response.status)
      console.log('-------')
      self.setState({loading: false})
      if (response.id != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)

        // return Promise.reject(new Error(response.statusText))
      }
    }

    function json (response) {
      console.log(response)
      console.log('json')
      return response.json()
    }
  }

  render () {
    // let that = this
    // setTimeout(function () {
    //   that.props.navigation.navigate('UserWaitTaxyScreen')
    // }, 5000)

    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          showsUserLocation
          provider={MapView.PROVIDER_GOOGLE}
          showsMyLocationButton
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}>
          <Marker
            coordinate={this.state.markers}>
            <AnimatedMarker />
          </Marker>
        </MapView>
        <View>
          <SlidingPanel
            // onDrag={this.ondraq}
            headerLayoutHeight={200}
            headerLayout={() => <CourierSearchTop
              onPress={this.onPressCancel}
              navigation={this.props.navigation}
              token={this.token}
              orderId={this.state.orderId} />}
            slidingPanelLayout={() => <CourierSearchBody
              startLocation={this.state.startLocation}
              endLocation={this.state.endLocation}
              distance={this.state.distance}
              bill_amount={this.state.bill_amount} />}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    startLongLat: state.destinationAddress.startLongLat,
    startLocation: state.destinationAddress.startLocation,
    endLocation: state.destinationAddress.endLocation,
    distance: state.price.distance,
    duration: state.price.duration,
    price: state.price.price,
    orderId: state.order.orderId,
    order: state.order.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptDriver: (payload) => dispatch(DriverAction.driverSuccess(payload)),
    attemptOrder: (payload) => dispatch(OrderAction.orderSuccess(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourierSeachScreen)
