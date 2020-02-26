import React, { Component } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/UserOrderScreenStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dash from 'react-native-dash'
class UserOrderScreen extends Component {
  constructor (props) {
    super(props)
    // AirBnB's Office, and Apple Park
    this.state = {
      bill_amount: '',
      total_distance: '',
      drop_location: '',
      pickup_location: '',
      phone_number: null,
      error: null,
      driver: {
        first_name: '',
        last_name: ''
      }
    }
  }
  componentDidMount (): void {
    this.setState({
      pickup_location: this.props.order.pickup_location,
      drop_location: this.props.order.drop_location,
      bill_amount: this.props.order.bill_amount,
      total_distance: this.props.order.total_distance,
      phone_number: this.props.order.driver.phone_number,
      driver: {
        first_name: this.props.order.driver.first_name,
        last_name: this.props.order.driver.last_name
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>

        <View style={styles.infoBox}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MenuScreen')}>
            <View style={styles.nameBox}>
              <Icon style={styles.nameBoxIcon} name='arrow-left' />
              <Text style={styles.nameBoxText}>Xəritə</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.adressBox}>
          <View style={styles.iconBox}>
            <Icon name='circle-outline' size={20} color='#606060' />
            <Dash style={styles.orderDash} />
            <Icon name='map-marker-outline' size={24} color='#606060' />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.text}>{this.state.pickup_location}</Text>
            <Text style={styles.text}>{this.state.drop_location}</Text>
          </View>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.nameBox}>
            <Icon style={styles.nameBoxIcon} name='cash' />
            <Text style={styles.nameBoxText}>Nəğd</Text>
          </View>
          <View>
            <Text style={styles.infoText}>{this.state.bill_amount} AZN</Text>
          </View>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.nameBox}>
            <Icon style={styles.nameBoxIcon} name='clock-outline' />
            <Text style={styles.nameBoxText}>Sifariş vaxti:</Text>
          </View>
          <View>
            <Text style={styles.infoText}>19:25</Text>
          </View>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.nameBox}>
            <Icon style={styles.nameBoxIcon} name='car-hatchback' />
            <Text style={styles.nameBoxText}>Kuryer Adi: {this.state.driver.first_name}</Text>
          </View>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.nameBox}>
            <Icon style={styles.nameBoxIcon} name='phone' />
            <Text style={styles.nameBoxText}>Kuryerin nömrəsi: {this.state.phone_number}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    driver: state.driver.payload,
    order: state.order.payload
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderScreen)
