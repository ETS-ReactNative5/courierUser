import React, {Component} from 'react'
import {TextInput, Text, Dimensions, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OrderScreenStyle'
import MapView from 'react-native-maps'
import {Images} from '../Themes'
import MapViewDirections from 'react-native-maps-directions'
import MyButton from '../Components/MyButton'
import I18n from '../I18n'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Dash from 'react-native-dash'
import SlidingPanel from 'react-native-sliding-up-down-panels'
import NewOrderTop from '../Components/NewOrderTop'
import NewOrderBody from '../Components/NewOrderBody'
import PriceAction from '../Redux/PriceRedux'
import OrderAction from '../Redux/OrderRedux'
import AsyncStorage from '@react-native-community/async-storage'
import {orders, prices} from '../Config/API'
import uuidv4 from 'uuid'
import CourierSearchBody from '../Components/CourierSearchBody'
const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const GOOGLE_MAPS_APIKEY = 'AIzaSyCMfIpRhn8QaGkYQ0I5KPWvFT1kLbA-DAM'

class OrderScreen extends Component {
  componentDidMount () {
    const {startLongLat, endLongLat, distance, duration, price, startLocation, endLocation} = this.props
    console.log(distance)
    console.log('---')
    console.log(duration)
    this.setState({
      startLocation,
      endLocation,
      price,
      region: {
        latitude: startLongLat[0],
        longitude: startLongLat[1],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922 * ASPECT_RATIO
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
      }
    }

    AsyncStorage.getItem('@token')
      .then((token) => {
        this.token = 'Bearer ' + token
        console.log(token)
      })

    this.mapView = null
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
          style={styles.map}
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
                console.log(`Distance: ${result.distance} km`)
                console.log(`Duration: ${result.duration} min.`)

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
        <View hide>
          <SlidingPanel
            // onDrag={this.ondraq}
            headerLayoutHeight={320}
            headerLayout={() => <NewOrderTop />}
            slidingPanelLayout={() => <NewOrderBody
              token={this.token}
              orderId={this.state.orderId}
              navigation={this.props.navigation} />}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    startLongLat: state.destinationAddress.startLongLat,
    endLongLat: state.destinationAddress.endLongLat,
    startLocation: state.destinationAddress.startLocation,
    endLocation: state.destinationAddress.endLocation,
    distance: state.price.distance,
    duration: state.price.duration,
    price: state.price.price
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptPrice: (distance, duration, price) => dispatch(PriceAction.priceRequest(distance, duration, price))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)
