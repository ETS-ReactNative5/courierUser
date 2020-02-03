import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native'
import styles from './Styles/CourierSearchTopStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dash from 'react-native-dash'
import {orders} from '../Config/API'

export default class CourierSearchTop extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  onPress = () => {
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
        console.log(data)

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
    return (
      <View style={styles.container}>
        <View style={styles.minusBox}>
          <Icon style={styles.minusIcon} name='color-helper' color='#ddd' size={30} />
          <Text style={styles.minusText}>Sorgu Gonderilir...</Text>
        </View>
        <View style={styles.actionBox}>
          <TouchableOpacity style={styles.cancel} onPress={this.onPress}>
            <Icon name='window-close' color='#C71585' size={35} />
          </TouchableOpacity>
          <Text style={styles.adressTitle}>Gedisi legv et... </Text>
        </View>
      </View>
    )
  }
}
