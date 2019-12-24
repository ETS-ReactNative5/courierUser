import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native'
import styles from './Styles/CirclebuttonStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Circlebutton extends Component {
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
    const {onPress, backgroundColor, width, borderColor, size, icon, iconColor} = this.props
    return (
      <TouchableOpacity
        style={[styles.container, {backgroundColor: backgroundColor, width: width, borderColor: borderColor}]}
        onPress={onPress}>
        <Icon style={styles.linkIcon} name={icon} size={size} color={iconColor}  />
      </TouchableOpacity>
    )
  }
}
