import React, {Component} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import {Images} from '../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RouteScreenStyle'
import MapView from 'react-native-maps'
import MyButton from '../Components/MyButton'
import I18n from '../I18n'
import uuidv4 from 'uuid'
import AsyncStorage from '@react-native-community/async-storage'

import MapViewDirections from 'react-native-maps-directions'
import {prices, orders} from '../Config/API'
import PriceAction from '../Redux/PriceRedux'
import SlidingPanel from 'react-native-sliding-up-down-panels'
import NewOrderTop from '../Components/NewOrderTop'
import NewOrderBody from '../Components/NewOrderBody'
const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const GOOGLE_MAPS_APIKEY = 'AIzaSyCMfIpRhn8QaGkYQ0I5KPWvFT1kLbA-DAM'

class RouteScreen extends Component {
  componentDidMount () {
    const {startLongLat, endLongLat, startLocation, endLocation, distance, duration, pricee} = this.props
    let body = {
      pickup_location: [startLongLat[0], startLongLat[1]],
      drop_location: [endLongLat[0], endLongLat[1]],
      startLocation: startLocation,
      endLocation: endLocation
    }
    // this.setState({loading: true})
    const self = this
    let price = prices + '?pickup_location=' + startLongLat[0] + ',' + startLongLat[1] + '&drop_location=' + endLongLat[0] + ',' + endLongLat[1]
    // console.log(body, login)
    console.log(body)
    console.log(price)
    fetch(price, {
      // body: JSON.stringify(body),
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }

    })
      .then(json)
      .then(status)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data)
        console.log(data)
        console.log(typeof data.price)
        self.props.attemptPrice(data.distance, data.duration, data.price)
        // useResponse(data)
        // self.props.navigation.navigate('OrderScreen')
      })
      .catch(function (error) {
        console.log(error)
        console.log('err')
      })

    function status (response) {
      console.log(response)
      console.log('status')
      console.log(response.status)
      self.setState({loading: false})
      if (response.distance != null) {
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
    this.setState({
      region: {
        latitude: startLongLat[0],
        longitude: startLongLat[1],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922 * ASPECT_RATIO
      },
      adress: {
        startLocation: startLocation,
        endLocation: endLocation
      },
      coordinates: [
        {
          latitude: startLongLat[0],
          longitude: startLongLat[1]
        },
        {
          latitude: endLongLat[0],
          longitude: endLongLat[1]
        }
      ]
    })
  }

  constructor (props) {
    super(props)

    // AirBnB's Office, and Apple Park
    this.state = {
      coordinates: [
        {
          latitude: 37.3317876,
          longitude: -122.0054812
        },
        {
          latitude: 37.771707,
          longitude: -122.4053769
        }
      ],
      region: {
        latitude: 37.771707,
        longitude: -122.4053769,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      adress: {
        startLocation: '',
        endLocation: ''
      },
    }

    AsyncStorage.getItem('@token')
      .then((token) => {
        this.token = 'Bearer ' + token
        console.log(token)
      })

    this.mapView = null
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate
      ]
    })
  }

  onPress = () => {
    const {startLongLat, endLongLat, startLocation, endLocation, distance, duration, pricee} = this.props
    let body = {
      pickup_location: [startLongLat[0], startLongLat[1]],
      drop_location: [endLongLat[0], endLongLat[1]],
      startLocation: startLocation,
      endLocation: endLocation
    }
    // this.setState({loading: true})
    const self = this
    let price = prices + '?pickup_location=' + startLongLat[0] + ',' + startLongLat[1] + '&drop_location=' + endLongLat[0] + ',' + endLongLat[1]
    // console.log(body, login)
    console.log(body)
    console.log(price)
    fetch(price, {
      // body: JSON.stringify(body),
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }

    })
      .then(json)
      .then(status)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data)
        console.log(data)
        console.log(typeof data.price)
        const priceTypeIng = parseInt(data.price, 100) + 1
        console.log(priceTypeIng)
        self.props.attemptPrice(data.distance, data.duration, data.price)

        useResponse(data)
        // self.props.navigation.navigate('OrderScreen')
      })
      .catch(function (error) {
        console.log(error)
        console.log('err')
      })

    function status (response) {
      console.log(response)
      console.log('status')
      console.log(response.status)
      self.setState({loading: false})
      if (response.distance != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)

        // return Promise.reject(new Error(response.statusText))
      }
    }

    function statusOrder (response) {
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

    useResponse = async (data) => {
      const ordersUrl = orders + uuidv4()
      console.log(ordersUrl)

      let body = {
        bill_amount: pricee,
        drop_lng: '' + startLongLat[0],
        drop_location: startLongLat[0] + ',' + startLongLat[1],
        drop_ltd: '' + startLongLat[1],
        pickup_lng: '' + endLongLat[0],
        pickup_location: endLongLat[0] + ',' + endLongLat[1],
        pickup_ltd: '' + endLongLat[1],
        total_distance: distance,
        total_duration: duration,
        payment_type: 'cash'
      }

      console.log('----body----')
      console.log(body)
      console.log('----body----')

      console.log('----bareer')
      console.log(this.token)
      console.log('----bareer---')

      let meResponse = await fetch(ordersUrl, {
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
        // body: 'country_id=' + c.id
      })
        .then(json)
        .then(statusOrder)
        .then(function (data) {
          console.log('Request succeeded with JSON response', data)
          console.log(data)
          if (data.status === 'pending') {
            self.props.navigation.navigate('DriverNewOrderScreen')//curyerpendingscreen
          }

          // self.props.navigation.navigate('OrderScreen')
        })
        .catch(function (error) {
          console.log(error)
          console.log('err')
        })
      // only proceed once promise is resolved
      let meData = await meResponse.json()

      try {
        // const is_company = data.data.is_company||0
        console.log()
        self.props.navigation.navigate('OrderScreen')
      } catch (e) {
        Alert.alert('Error: ' + e.message)
      }

      // try {

      //   await AsyncStorage.setItem('@phone', this.state.phone)
      //   this.props.navigation.navigate('VerifyScreen')
      // } catch (e) {
      //   Alert.alert('Error: ' + e.getMessage())
      // }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.latitudeDelta
          }}
          style={{flex: 1}}
          ref={c => this.mapView = c}
          // onPress={this.onMapPress}
        >

          {this.state.coordinates.map((coordinate, index) =>
            <MapView.Marker key={`coordinate_${index}`} image={Images.marker} coordinate={coordinate} />
          )}
          {(this.state.coordinates.length >= 2) && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={(this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1) : null}
              destination={this.state.coordinates[this.state.coordinates.length - 1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor='#451E5D'
              optimizeWaypoints
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`)
              }}
              onReady={result => {
                // console.log('Distance: ${result.distance} km')
                // console.log('Duration: ${result.duration} min.')

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20)
                  }
                })
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <View >
          <SlidingPanel
            // onDrag={this.ondraq}
            headerLayoutHeight={300}
            headerLayout={() => <NewOrderTop />}
            slidingPanelLayout={() => <NewOrderBody />}
          />
        </View>
        <View style={styles.buttonContainer}>
          <MyButton onPress={this.onPress}
            // onPress={() => this.props.navigation.navigate('OrderScreen')}
            backgroundColor='#451E5D'
            color='#000'
            borderColor='#451E5D'
            text={I18n.t('teyinEt')}
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
    endLongLat: state.destinationAddress.endLongLat,
    endLocation: state.destinationAddress.endLocation,
    distance: state.price.distance,
    duration: state.price.duration,
    pricee: state.price.price
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptPrice: (distance, duration, price) => dispatch(PriceAction.priceRequest(distance, duration, price))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteScreen)
