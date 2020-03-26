import React, {Component} from 'react'
import { ScrollView, View, KeyboardAvoidingView, Text } from 'react-native'
import {connect} from 'react-redux'
import I18n from '../I18n'
import MyButton from '../Components/MyButton'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Dash from 'react-native-dash'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import DestinationAddressAction from '../Redux/DestinationAddressRedux'

// Styles
import styles from './Styles/DestinationAddressScreenStyle'
import RNGooglePlaces from 'react-native-google-places'
import {orders, prices} from '../Config/API'
import uuidv4 from 'uuid'
import PriceAction from '../Redux/PriceRedux'
import Spiner from '../Components/Spiner'

class DestinationAddressScreen extends Component {
  state = {
    startLocation: '',
    endLocation: '',
    startLongLat: [],
    endLongLat: [],
    error: '',
    loading: false
  }

  componentDidMount () {
    this.setState({
      startLocation: I18n.t('Başlanğıc nöqtəsi'),
      endLocation: I18n.t('Bitiş nöqtəsi')
    })
  }

  openSearchModal (type) {
    RNGooglePlaces.openAutocompleteModal({
      country: 'AZ'
    })
      .then((place) => {
        console.log(place)
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
        if (type === 'start') {
          this.setState({
            startLocation: place.name,
            startLongLat: [place.location.latitude, place.location.longitude]
          })
        } else if (type === 'end') {
          this.setState({
            endLocation: place.name,
            endLongLat: [place.location.latitude, place.location.longitude]
          })
        }
      })
      .catch(error => console.log(error.message))  // error is a Javascript Error object
  }

  onPres = () => {
    this.setState({loading: true})
    if (this.state.startLocation === I18n.t('baslangicNoqtesi') || this.state.endLocation === I18n.t('bitisNoqtesi')) {
      this.setState({
        error: 'xana bos ola bilmez',
        loading: false
      })
    } else {
      this.onCheckFields()
    }
  }

  onCheckFields = () => {
    const {startLongLat, endLongLat, startLocation, endLocation} = this.state
    this.props.attemptDestinationAddress(startLongLat, endLongLat, startLocation, endLocation)
    const self = this
    let price = prices + '?pickup_location=' + startLongLat[0] + ',' + startLongLat[1] + '&drop_location=' + endLongLat[0] + ',' + endLongLat[1]
    console.log(price)
    fetch(price, {
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
        self.props.attemptPrice(data.distance, data.duration, data.price.eco)
        self.props.navigation.navigate('OrderScreen')
      })
      .catch(function (error) {
        console.log(error)
        console.log('err')
        self.setState({
          error: error.detail,
          loading: false
        })
      })

    function status (response) {
      console.log(response, '-response-')
      console.log(response.status, '-status-')
      self.setState({loading: false})
      if (response.distance != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
        // return Promise.reject(new Error(response.statusText))
      }
    }
    function json (response) {
      console.log(response, '-jsonResponse-')
      return response.json()
    }
  }
  renderButton = () => {
    if (!this.state.loading) {
      return <MyButton onPress={this.onPres}
        backgroundColor='#7B2BFC'
        borderColor='#7B2BFC'
        borderRadius={30}
        color='#fff'
        // text={I18n.t('next')}
        text='Növbəti'
      />
    }
    return <Spiner size='small' />
  }
  render () {
    const {error} = this.state
    const errorMsg = error ? (<Text style={styles.errorMsg}>{error}</Text>) : null
    return (
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView behavior='position'>
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Icon name='compass' size={30} color='#27093D' />
                <Dash style={styles.dash} />
                <Icon name='location-pin' size={30} color='#27093D' />
              </View>
              <View style={styles.inputButton}>
                <MyButton onPress={() => this.openSearchModal('start')}
                  backgroundColor='#fff'
                  color='#606060'
                  borderColor='#451E5D'
                  borderRadius={30}
                  text={this.state.startLocation}
                />
                <MyButton onPress={() => this.openSearchModal('end')}
                  backgroundColor='#fff'
                  color='#606060'
                  borderColor='#451E5D'
                  borderRadius={30}
                  text={this.state.endLocation}
                />

              </View>
            </View>
            {errorMsg}
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.buttonContainer}>
          {this.renderButton()}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    startLongLat: state.destinationAddress.startLongLat,
    endLongLat: state.destinationAddress.endLongLat
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptPrice: (distance, duration, price) => dispatch(PriceAction.priceRequest(distance, duration, price)),
    attemptDestinationAddress: (startLongLat, endLongLat, startLocation, endLocation) => dispatch(DestinationAddressAction.destinationAddressRequest(startLongLat, endLongLat, startLocation, endLocation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DestinationAddressScreen)
