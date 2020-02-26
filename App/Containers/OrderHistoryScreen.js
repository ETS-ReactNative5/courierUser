import React, { Component } from 'react'
import { Text, Image, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OrderHistoryScreenStyle'
import MyButton from '../Components/MyButton'
import Dash from 'react-native-dash'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DATA from '../Fixtures/DATA'
import {getOrders} from '../Config/API'
import AsyncStorage from '@react-native-community/async-storage'
class OrderHistoryScreen extends Component {
  state = {
    data: []
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('@token')
    this.token = 'Bearer ' + token
    // AsyncStorage.getItem('@token')
    //   .then((token) => {
    //     this.token = 'Bearer ' + token
    //     console.log(token)
    //   })
    console.log(this.token)
    const self = this
    console.log(getOrders)
    fetch(getOrders, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.token
      }
    })
      .then(json)
      .then(status)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data)
        console.log(data)



        self.setState({
          data: data.data
        })
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
      if (response.data != null) {
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
  renderOrdersItem = ({item}) => {
    item.created = new Date(item.created)
    return (
      <View style={styles.orderContainer}>
        <View style={styles.orderBox}>
          <Icon name='chevron-right' size={30} color='#451E5D' />
          <Text style={styles.orderText}>Piyada | {item.created.toLocaleDateString()} </Text>
        </View>
        <View style={styles.orderBox}>
          <View>
            <View style={styles.orderAdressBox}>
              <Icon style={{paddingLeft: 3}} name='circle-outline' size={16} color='#606060' />
              <Text style={styles.orderAdress}>{item.pickup_location}</Text>
            </View>
            <Dash style={styles.orderDash} />
            <View style={styles.orderAdressBox}>
              <Icon name='map-marker-outline' size={21} color='#606060' />
              <Text style={styles.orderAdress}>{item.drop_location}</Text>
            </View>
          </View>
          <View style={styles.orderPriceBox}>
            <Text style={styles.orderPrice}>{item.bill_amount}AZN </Text>
          </View>
        </View>
      </View>
    )
  };
  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 8}}>
          <FlatList
            renderItem={this.renderOrdersItem}
            keyExtractor={(item) => item.id}
            data={this.state.data} />
        </View>
        {/* <View style={{flex: 1 }}> */}
        {/*  <MyButton */}
        {/*    text="TƏQVİMDƏN SEÇ" */}
        {/*    color="#fff" */}
        {/*    backgroundColor="#451E5D" /> */}
        {/* </View> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryScreen)
