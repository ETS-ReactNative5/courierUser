import React, {Component} from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import {connect} from 'react-redux'
import MapView, {Marker} from 'react-native-maps'
import I18n from '../I18n'
import MyButton from '../Components/MyButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MapScreenStyle'
import RNGooglePlaces from 'react-native-google-places'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class MapScreen extends Component {
  state = {
    latitude: 40.4093,
    longitude: 49.8671,
    error: null,
    loading: false
  }

  componentDidMount () {
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
        <View style={styles.buttonContainer}>
          <MyButton onPress={() => this.props.navigation.navigate('DestinationAddressScreen')}
            backgroundColor='#fff'
            color='#451E5D'
            borderColor='#fff'
            borderRadius={30}
            text={I18n.t('Kuryer çagir')} />
        </View>
        <View style={[styles.gumburger, ]}>
          <TouchableOpacity onPress={this.props.open}>
            <Icon style={styles.nameBoxIcon} size={30} name='menu' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
