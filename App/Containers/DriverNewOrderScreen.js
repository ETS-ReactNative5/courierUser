import React, {Component} from 'react'
import { View, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import MapView, {Marker} from 'react-native-maps'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DriverNewOrderScreenStyle'
import RNGooglePlaces from 'react-native-google-places'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SlidingPanel from 'react-native-sliding-up-down-panels'
import NewOrderTop from '../Components/NewOrderTop'
import NewOrderBody from '../Components/NewOrderBody'
import MyButton from '../Components/MyButton'
import I18n from '../I18n'

class DriverNewOrderScreen extends Component {
  state = {
    latitude: 40.405053,
    longitude: 49.834652,
    error: null
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
        <View hide>
          <SlidingPanel
            // onDrag={this.ondraq}
            headerLayoutHeight={260}
            headerLayout={() => <NewOrderTop />}
            slidingPanelLayout={() => <NewOrderBody />}
          />
        </View>

        {/*<View style={styles.buttonContainer}>*/}
        {/*  <MyButton onPress={() => this.props.navigation.navigate('DestinationAddressScreen')}*/}
        {/*    backgroundColor='#fff'*/}
        {/*    color='#451E5D'*/}
        {/*    borderColor='#fff'*/}
        {/*    text={I18n.t('gedeceyinizUnvan')} />*/}
        {/*</View>*/}
        <View style={styles.gumburger}>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverNewOrderScreen)
