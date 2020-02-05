import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import styles from './Styles/CourierSearchBodyStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dash from 'react-native-dash'
import {orders} from "../Config/API";
export default class CourierSearchBody extends Component {
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
    const {bill_amount, startLocation, endLocation, distance} = this.props
    return (
      <View style={styles.mainContainer}>
        <View style={styles.adressContainer}>
          <View style={styles.dashBox}>
            <Icon name='circle' color='#000080' size={20} />
            <Dash style={{ width: 1, height: 40, flexDirection: 'column' }} />
            <Icon name='circle' color='#C71585' size={20} />
          </View>
          <View>
            <View style={styles.adressBox}>
              <Text style={styles.adressTitle}>Pickup</Text>
              <Text style={styles.adressText}>{startLocation}</Text>
            </View>
            <View style={styles.adressBox}>
              <Text style={styles.adressTitle}>Dropoff</Text>
              <Text style={styles.adressText}>{endLocation}</Text>
            </View>
          </View>
        </View>
        <View style={styles.fieldBox}>
          <Text style={styles.fieldText}>Price</Text>
          <Text style={styles.fieldText}>{bill_amount} azn</Text>
        </View>
        <View style={styles.fieldBox}>
          <Text style={styles.fieldText}>Distance</Text>
          <Text style={styles.fieldText}>{distance} KM</Text>
        </View>
      </View>
    )
  }
}
