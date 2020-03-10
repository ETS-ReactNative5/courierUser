import React, {Component} from 'react'
import {View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import MapView, {Marker} from 'react-native-maps'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SlidingPanel from 'react-native-sliding-up-down-panels'
import DriverNewOrderTop from '../Components/DriverNewOrderTop'
import DriverNewOrderBody from '../Components/DriverNewOrderBody'
import AsyncStorage from '@react-native-community/async-storage'
// Styles
import styles from './Styles/CourierFoundScreenStyle'
import {orders} from '../Config/API'
import OrderAction from '../Redux/OrderRedux'
class CourierFoundScreen extends Component {
  constructor (props) {
    super(props)
    // AirBnB's Office, and Apple Park
    this.state = {
      driver: {
        first_name: '',
        last_name: ''
      },
      bill_amount: '',
      total_distance: '',
      latitude: 40.4093,
      longitude: 49.8671,
      error: null,
      order_notifications: '',
      location_tracking: '',
      drop_location: '',
      pickup_location: '',
      orderId: '',
      phone_number: null,
      photos: [],
      driverCoordinate: {
        latitude: 40.409264,
        longitude: 49.867092
      },
      coordinates: [
        {
          latitude: 40.409264,
          longitude: 49.867092
        },
        {
          latitude: 40.409264,
          longitude: 49.867092
        }
      ],
      region: {
        latitude: 40.4093,
        longitude: 49.8671,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      startLocation: 'Picup',
      endLocation: 'Azadliq Prospekti 74',
      driverStatus: 'arrived'
    }
    this.mapView = null
  }

  componentDidMount () {
    this.timer = setInterval(() => this.getDriver(), 1000)
    AsyncStorage.getItem('@token')
      .then((token) => {
        this.token = 'Bearer ' + token
        console.log(token)
      })

    this.setState({
      location_tracking: this.props.order.driver.id + '-tracking',
      pickup_location: this.props.order.pickup_location,
      drop_location: this.props.order.drop_location,
      bill_amount: this.props.order.bill_amount,
      total_distance: this.props.order.total_distance,
      orderId: this.props.order.id,
      courierPhone: this.props.order.driver.phone_number,
      photos: this.props.order.files,
      message: this.props.order.message,
      receiverName: this.props.order.receiver_name,
      receiverPhone: this.props.order.receiver_phone,
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
    // this.subscribeToPubNub()
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
      }
    })
      .then(json)
      .then(status)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data)
        console.log(data)
        if (data.status === 'arrived') {
          self.props.attemptOrder(data)
        } else if (data.status === 'ongoing') {
          self.props.attemptOrder(data)
        } else if (data.status === 'done') {
          clearInterval(self.timer)
          self.props.navigation.replace('UserOrderScreen')
        } else if (data.status === 'rejected') {
          clearInterval(self.timer)
          self.props.navigation.replace('CourierSeachScreen')
        }
      })
      .catch(function (error) {
        console.log(error)
        console.log('err')
      })

    function status (response) {
      if (response.status != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    }

    function json (response) {
      console.log(response, '-json-')
      return response.json()
    }
  }

  onPressCancel = () => {
    let body = {
      status: 'rejected'
    }
    const self = this
    const ordersUrl = orders + this.state.orderId
    console.log(body)
    fetch(ordersUrl, {
      body: JSON.stringify(body),
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token
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
        console.log(error, '-err-')
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
          <Marker.Animated
            ref={marker => {
              this.marker = marker
            }}
            coordinate={this.state.driverCoordinate}
          />
          {/* <Marker coordinate={this.state}/> */}
        </MapView>
        <View>
          <SlidingPanel
            headerLayoutHeight={280}
            headerLayout={() => <DriverNewOrderTop onPress={this.onPressCancel}
              drop_location={this.state.drop_location}
              pickup_location={this.state.pickup_location}
              order={this.props.driver}
              courierPhone={this.state.courierPhone} />}
            slidingPanelLayout={() => <DriverNewOrderBody
              first_name={this.state.driver.first_name}
              last_name={this.state.driver.last_name}
              bill_amount={this.state.bill_amount}
              total_distance={this.state.total_distance}
              photos={this.state.photos}
              message={this.state.message}
              receiverName={this.state.receiverName}
              receiverPhone={this.state.receiverPhone}
            />}
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
