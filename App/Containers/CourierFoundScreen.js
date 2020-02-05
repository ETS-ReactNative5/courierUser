import React, { Component } from 'react'
import { View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CourierFoundScreenStyle'
import MapView from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SlidingPanel from 'react-native-sliding-up-down-panels'
import DriverNewOrderTop from '../Components/DriverNewOrderTop'
import DriverNewOrderBody from '../Components/DriverNewOrderBody'
import {orders} from '../Config/API'
import OrderAction from '../Redux/OrderRedux'
class CourierFoundScreen extends Component {
  state = {
    driver: {
      first_name: '',
      last_name: ''
    },
    pickup_location: '',
    drop_location: '',
    bill_amount: '',
    total_distance: '',
    latitude: 0,
    longitude: 0,
    error: null
  }

  componentDidMount () {
    this.setState({
      pickup_location: this.props.order.pickup_location,
      drop_location: this.props.order.drop_location,
      bill_amount: this.props.order.bill_amount,
      total_distance: this.props.order.total_distance,
      id: this.props.order.id,
      driver: {
        first_name: this.props.order.driver.first_name,
        last_name: this.props.order.driver.last_name
      }
    })

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        })
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 20000}
    )
  }

  onPressCancel = () => {
    let body = {
      status: 'rejected'
    }

    const self = this
    const ordersUrl = orders + this.state.id
    // console.log(body, login)
    console.log(body)

    fetch(ordersUrl, {
      body: JSON.stringify(body),
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.props.token

        // 'X-localization': currentLang
        //   'Accept': 'application/json',
        // 'Content-Type': 'application/json'
      }

    })
      .then(json)
      .then(status)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data)
        self.props.attemptOrder(data)
        self.props.navigation.replace('MenuScreen')
      })
      .catch(function (error) {
        console.log(error)
        console.log('err')
      })

    function status (response) {
      if (response.id != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    }

    function json (response) {
      return response.json()
    }
  }

  render () {
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
          }}

        >
          {/* <Marker coordinate={this.state}/> */}
        </MapView>
        <View>
          <SlidingPanel
            // onDrag={this.ondraq}
            headerLayoutHeight={260}
            headerLayout={() => <DriverNewOrderTop
              onPress={this.onPressCancel}
              drop_location={this.state.drop_location}
              pickup_location={this.state.pickup_location}
              order={this.props.driver} />}
            slidingPanelLayout={() => <DriverNewOrderBody
              first_name={this.state.driver.first_name}
              last_name={this.state.driver.last_name}
              bill_amount={this.state.bill_amount}
              total_distance={this.state.total_distance} />}
          />
        </View>
        <View style={[styles.gumburger]}>
          <TouchableOpacity onPress={this.props.open}>
            <Icon style={styles.nameBoxIcon} size={30} name='menu' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    driver: state.driver.payload,
    order: state.order.payload

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptOrder: (payload) => dispatch(OrderAction.orderSuccess(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourierFoundScreen)
