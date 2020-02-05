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

  render () {
    const {onPress} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.minusBox}>
          <Icon style={styles.minusIcon} name='color-helper' color='#ddd' size={30} />
          <Text style={styles.minusText}>Sorgu Gonderilir...</Text>
        </View>
        <View style={styles.actionBox}>
          <TouchableOpacity style={styles.cancel} onPress={onPress}>
            <Icon name='window-close' color='#C71585' size={35} />
          </TouchableOpacity>
          <Text style={styles.adressTitle}>Gedisi legv et... </Text>
        </View>
      </View>
    )
  }
}
