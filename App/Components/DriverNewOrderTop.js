import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Linking } from 'react-native'
import styles from './Styles/DriverNewOrderTopStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dash from 'react-native-dash'

export default class DriverNewOrderTop extends Component {
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

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.minusBox}>
          <Icon style={styles.minusIcon} name='color-helper' color='#ddd' size={30} />
          <Text style={styles.minusText}>Kuryerin çatma vaxtı  2 deyqe</Text>
        </View>
        <View style={styles.adressContainer}>
          <View style={styles.dashBox}>
            <Icon name='circle' color='#000080' size={20} />
            <Dash style={{ width: 1, height: 40, flexDirection: 'column' }} />
            <Icon name='circle' color='#C71585' size={20} />
          </View>
          <View>
            <View style={styles.adressBox}>
              <Text style={styles.adressTitle}>Pickup</Text>
              <Text style={styles.adressText}>{this.props.pickup_location}</Text>
            </View>
            <View style={styles.adressBox}>
              <Text style={styles.adressTitle}>Dropoff</Text>
              <Text style={styles.adressText}>{this.props.drop_location}</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionBox}>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.props.onPress}>
            <View style={styles.iconBox}>
              <Icon name='window-close' color='#000' size={20} />
            </View>
            <Text style={styles.adressTitle}>Ləğv et</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <View style={styles.iconBox}>
              <Icon name='message-text-outline' color='#000' size={20} />
            </View>
            <Text style={styles.adressTitle}>Mesaj</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }}
            onPress={() => {
              Linking.openURL('tel:' + this.props.courierPhone)
              console.log(this.props.courierPhone)
            }}>
            <View style={styles.iconBox}>
              <Icon name='phone' color='#000' size={20} />
            </View>
            <Text style={styles.adressTitle}>Əlaqə</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
