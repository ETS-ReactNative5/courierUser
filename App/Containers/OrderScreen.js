import React, {Component} from 'react'
import { Dimensions, View, TouchableOpacity, Text, Image, TextInput, Platform } from 'react-native'
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SlidingPanel from 'react-native-sliding-up-down-panels'
import NewOrderTop from '../Components/NewOrderTop'
import NewOrderBody from '../Components/NewOrderBody'
import PriceAction from '../Redux/PriceRedux'
import OrderAction from '../Redux/OrderRedux'
import AsyncStorage from '@react-native-community/async-storage'
import { files, orders, prices } from '../Config/API'
import uuidv4 from 'uuid'
import ImagePicker from 'react-native-image-picker'
import PhoneInput from 'react-native-phone-input'
import CheckBox from 'react-native-check-box'
const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const GOOGLE_MAPS_APIKEY = 'AIzaSyCMfIpRhn8QaGkYQ0I5KPWvFT1kLbA-DAM'

class OrderScreen extends Component {
  componentDidMount () {
    const {startLongLat, endLongLat, distance, duration, price, startLocation, endLocation} = this.props
    console.log(distance, '-distance-')
    console.log(duration, '-duration-')
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
      insurance: false,
      insurance_price: null,
      message: '',
      receiverName: '',
      receiver_mobile: null,
      scheduled_at: '',
      delivery_type: 'asap',
      photo: [],
      photos: [],
      firstPhoto: '',
      secondPhoto: '',
      thirdPhoto: '',
      percent: null,
      loading: false,
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
  onPress = () => {
    const {startLongLat, endLongLat, distance, duration, startLocation, endLocation} = this.props
    let body = {
      pickup_location: [startLongLat[0], startLongLat[1]],
      drop_location: [endLongLat[0], endLongLat[1]]
    }
    // this.setState({loading: true})
    const self = this
    let price = prices + '?pickup_location=' + startLongLat[0] + ',' + startLongLat[1] + '&drop_location=' + endLongLat[0] + ',' + endLongLat[1]
    // console.log(body, login)
    console.log(body, '-body-')
    console.log(price, '-price-')
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
        self.props.attemptPrice(data.distance, data.duration, data.price)
        useResponse(data)
      })
      .catch(function (error) {
        console.log(error, '-error-')
      })

    function status (response) {
      console.log(response, '-response-')
      console.log(response.status, '-responseStatus-')
      if (response.distance != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
        // return Promise.reject(new Error(response.statusText))
      }
    }

    function statusOrder (response) {
      console.log(response, '-response-')
      console.log(response.status, '-responseStatus-')
      self.setState({loading: false})
      if (response.id != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
        // return Promise.reject(new Error(response.statusText))
      }
    }

    function json (response) {
      console.log(response, '-json-')
      return response.json()
    }
    // const image = this.state.photo.map(function (item) {
    //   return {item}
    // })
    // const image = this.state.photo.map(function (item) {
    //   formData.append('file', {
    //     uri: item.uri,
    //     type: item.type, // or photo.type
    //     name: 'firstPhoto'
    //   })
    // })
    const uploadImage = (image, entityId, entityKey) => {
      const formData = new FormData()
      // const { key, data } = image
      formData.append('file', {
        uri: image.uri,
        type: image.type, // or photo.type
        name: image.fileName
      })
      formData.append('entity_id', entityId)
      formData.append('entity_key', entityKey)
      console.log(entityId, 'entityId')
      console.log(entityKey, 'entityKey')
      console.log(formData, 'formData')
      // console.log(image.uri, 'imageData')
      return fetch('https://www.delhero.com/customer/api/images', {
        body: formData,
        method: 'POST'
      })
    }

    useResponse = async () => {
      const ordersUrl = orders + uuidv4()
      console.log(ordersUrl, '-orderUrl-')
      let body = {
        bill_amount: self.state.price,
        drop_ltd: '' + endLongLat[0],
        drop_lng: '' + endLongLat[1],
        drop_location: endLocation,
        insurance: this.state.insurance,
        insurance_price: this.state.insurance_price,
        message: this.state.message,
        receiver_name: this.state.receiverName,
        receiver_phone: this.state.receiver_mobile,
        delivery_type: this.state.delivery_type,
        pickup_ltd: '' + startLongLat[0],
        pickup_lng: '' + startLongLat[1],
        pickup_location: startLocation,
        total_distance: distance,
        total_duration: duration,
        payment_type: 'cash'
      }
      console.log(body, '-body-')
      console.log(this.token, '-bareer + token-')
      const {firstPhoto} = this.state
      let meResponse = await fetch(ordersUrl, {
        body: JSON.stringify(body),
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.token
        }
      })
        .then(json)
        .then(statusOrder)
        .then(function (data) {
          console.log('Request succeeded with JSON response', data)
          Promise.all(
            self.state.photos.map((image) => uploadImage(image, data.id, 'orders'))
          ).then((res) => console.log(res))
          if (data.status === 'pending') {
            console.log('içeride')
            self.props.attemptOrder(data.id)
            self.props.attemptOrderSuccess(data)
            self.props.navigation.replace('CourierSeachScreen')
          }
        })
        .catch(function (error) {
          console.log(error, '-error-')
          self.setState({
            error: error.detail,
            loading: false
          })
        })
      // only proceed once promise is resolved
      let meData = await meResponse.json()

      try {
        // const is_company = data.data.is_company||0
        self.props.navigation.navigate('OrderScreen')
      } catch (e) {
        Alert.alert('Error: ' + e.message)
      }
    }
  }
  renderPickerButton (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.avatarContainer}>
          <Text>Select a Photo</Text>
        </View>
      </TouchableOpacity>
    )
  }
  openImagePecker (type) {
    const options = {
      title: 'Şəkil seç',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        const source = { uri: response.uri }
        if (type === 'firstPhoto') {
          this.setState({
            firstPhoto: source,
            photo: [
              ...this.state.photo,
              source
            ],
            photos: [
              ...this.state.photos,
              response
            ]
          })
        } else if (type === 'secondPhoto') {
          this.setState({
            secondPhoto: source,
            photo: [
              ...this.state.photo,
              source
            ],
            photos: [
              ...this.state.photos,
              response
            ]
          })
        } else {
          this.setState({
            thirdPhoto: source,
            photo: [
              ...this.state.photo,
              source
            ],
            photos: [
              ...this.state.photos,
              response
            ]
          })
          console.log(this.state.photos, '--test--')
        }
      }
    })
  }
  onPhoneNumberChange = () => {
    this.setState({
      receiver_mobile: this.phone.getValue()
    })
    console.log(this.state.receiver_mobile)
    // const {mobile, password} = this.state
    // this.props.attemptLogin(mobile, password)
  };
  percent = (text) => {
    console.log(this.state.percent)
    this.setState({
      percent: text,
      insurance_price: this.state.percent * 0.03 + this.state.price
    })
  }
  render () {
    const firstPhoto = this.state.firstPhoto === '' ? (this.renderPickerButton(() => this.openImagePecker('firstPhoto'))) : (
      <Image style={styles.avatar} source={this.state.photo[0]} />)
    const secondPhoto = this.state.secondPhoto === '' ? (this.renderPickerButton(() => this.openImagePecker('secondPhoto'))) : (
      <Image style={styles.avatar} source={this.state.photo[1]} />)
    const thirdPhoto = this.state.thirdPhoto === '' ? (this.renderPickerButton(() => this.openImagePecker('thirdPhoto'))) : (
      <Image style={styles.avatar} source={this.state.photo[2]} />)
    let receiverPhone = <PhoneInput value={this.state.receiver_mobile} onChangePhoneNumber={this.onPhoneNumberChange} initialCountry='az'
      style={{ fontSize: 15, width: '100%' }}
      ref={ref => { this.phone = ref }} />
    let receiverName = <TextInput placeholder='Ad Soyad' onChangeText={(text) => this.setState({ receiverName: text })} value={this.state.receiverName} />
    let message = <TextInput multiline numberOfLines={4} placeholder='Message' onChangeText={(text) => this.setState({ message: text })} value={this.state.message} />
    let insurance = <CheckBox style={{flex: 1}} onClick={() => { this.setState({ insurance: !this.state.insurance }) }} isChecked={this.state.insurance} rightText={'Add insurance'} />
    let insurance_price = this.state.insurance ? (<View>
      <Text>Daşınacaq yükün dəyəri :</Text>
      <View style={styles.inputBox}>
        <TextInput
          keyboardType='numeric'
          placeholder='Daşınacaq yükün dəyəri :'
          onChangeText={this.percent}
          value={this.state.percent} />
      </View>
      <View>
        <Text>Bill amount </Text>
        <Text>{this.state.insurance_price} AZN</Text>
      </View>
    </View>) : null
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
              loading={this.state.loading}
              onPress={this.onPress}
              openImagePecker={this.openImagePecker}
              firstPhoto={firstPhoto}
              secondPhoto={secondPhoto}
              thirdPhoto={thirdPhoto}
              receiverPhone={receiverPhone}
              receiverName={receiverName}
              message={message}
              insurance={insurance}
              insurance_price={insurance_price}
              onPhoneNumberChange={this.onPhoneNumberChange}
              token={this.token}
              orderId={this.state.orderId} />}
          />
        </View>
        <View style={styles.gumburger}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon style={styles.nameBoxIcon} size={30} name='keyboard-backspace' />
          </TouchableOpacity>
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
    attemptPrice: (distance, duration, price) => dispatch(PriceAction.priceRequest(distance, duration, price)),
    attemptOrder: (orderId) => dispatch(OrderAction.orderRequest(orderId)),
    attemptOrderSuccess: (payload) => dispatch(OrderAction.orderSuccess(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)
