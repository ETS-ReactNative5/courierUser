import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/NewOrderTopStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dash from 'react-native-dash'
import MyRadio from '../Components/MyRadio'
import { Images } from '../Themes'
export default class NewOrderTop extends Component {
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
  state = {
    phone: null,
    radioItems:
      [
        {
          label: 'Piyada',
          size: 30,
          color: '#1f1f1f',
          selected: false,
          image: Images.piyada

        },
        {
          label: 'Motosiklet',
          color: '#1f1f1f',
          size: 30,
          selected: true,
          image: Images.moto
        },
        {
          label: 'Avtomobil',
          size: 30,
          color: '#1f1f1f',
          selected: false,
          image: Images.avto
        }

      ],
    selectedItem: ''
  }
  componentDidMount () {
    this.state.radioItems.map((item) => {
      if (item.selected === true) {
        this.setState({ selectedItem: item.label })
      }
    })
  }

  changeActiveRadioButton (index) {
    this.state.radioItems.map((item) => {
      item.selected = false
    })

    this.state.radioItems[index].selected = true
    console.log(this.state.selectedItem)
    this.setState({ radioItems: this.state.radioItems }, () => {
      this.setState({ selectedItem: this.state.radioItems[index].label })
    })

    if (this.state.selectedItem === this.state.radioItems[2].label) {
      console.log(this.state.radioItems[2].label)
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.minusBox}>
          <Icon style={styles.minusIcon} name='color-helper' color='#ddd' size={30} />
          <Text style={styles.minusText}>ARRIVES IN 2 MIN</Text>
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
              <Text style={styles.adressText}>307 portland Ave S,Mineapolis</Text>
            </View>
            <View style={styles.adressBox}>
              <Text style={styles.adressTitle}>Dropoff</Text>
              <Text style={styles.adressText}>307 portland Ave S,Mineapolis</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionBox}>
          {
            this.state.radioItems.map((item, key) =>
              (
                <MyRadio key={key} button={item} onClick={this.changeActiveRadioButton.bind(this, key)} />
              ))
          }
        </View>
      </View>
    )
  }
}
