import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { ScrollView, Text, View, TextInput, Platform, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/NewOrderBodyStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Dropdown } from 'react-native-material-dropdown'
import CheckBox from 'react-native-check-box'
import PhoneInput from 'react-native-phone-input'
import ImagesPicker from '../Components/ImagesPicker'
import ImagePicker from 'react-native-image-picker'
import MyRadioBtn from './MyRadioBtn'
import MyButton from './MyButton'
import SwipeButton from 'rn-swipe-button'
import PriceAction from '../Redux/PriceRedux'
import OrderAction from '../Redux/OrderRedux'
import { connect } from 'react-redux'
import { orders, prices } from '../Config/API'
import uuidv4 from 'uuid'
import AsyncStorage from '@react-native-community/async-storage'
import Spiner from './Spiner'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

type Props = {};

class NewOrderBody extends Component {
  setDate = (event, date) => {
    date = date || this.state.date
    let formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    this.setState({
      show: Platform.OS === 'ios',
      selectedDate: formattedDate
    })
    console.log(formattedDate)
  }

  show = mode => {
    this.setState({
      show: true,
      mode
    })
  }

  datepicker = () => {
    this.show('date')
    this.setState({
      selectedDate: this.state.date
    })
  }

  percent = (text) => {
    console.log(this.state.percent)
    this.setState({
      percent: text,
      billAmount: this.state.percent * 0.03 + this.state.pricee
    })
  }
  componentDidMount () {
    const {distance, duration, price, loading} = this.props
    this.setState({
      distance: distance,
      duration: duration,
      pricee: price,
      loading: loading
    })
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

    if (this.state.selectedItem === this.state.radioItems[1].label) {
      console.log(this.state.radioItems[1].label)
      this.setState({
        scheduled: false
      })
    } else {
      this.setState({
        scheduled: true
      })
    }
  }
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

  constructor (props) {
    super(props)

    // AirBnB's Office, and Apple Park
    this.state = {
      percent: null,
      loading: false,
      scheduled: false,
      date: new Date(),
      mode: 'date',
      show: false,
      selectedDate: 'chose date',
      phone: null,
      radioItems:
      [
        {
          label: 'Deliver now',
          color: '#1f1f1f',
          selected: true
        },
        {
          label: 'Scheduled',
          color: '#1f1f1f',
          selected: false
        }

      ],
      selectedItem: ''
    }

    AsyncStorage.getItem('@token')
      .then((token) => {
        this.token = 'Bearer ' + token
        console.log(token)
      })

    this.mapView = null
  }
  renderButton = () => {
    const SwipeIcon = () => (
      <Icon name='chevron-double-right' color='#fff' size={40} />
    )
    if (!this.state.loading) {
      return <SwipeButton
        disabled={false}
        title='Sifaris Et '
        titleColor='#FFFFFF'
        railBackgroundColor='#7B2BFC'
        railBorderColor='#7B2BFC'
        thumbIconBackgroundColor='#7B2BFC'
        thumbIconBorderColor='#7B2BFC'
        thumbIconComponent={SwipeIcon}
        railFillBackgroundColor='#000'
        railFillBorderColor='#fff'
        onSwipeSuccess={this.props.onPress} />
    }
    return <Spiner size='small' />
  }

  render () {
    // const SwipeIcon = () => (
    //   <Icon name='chevron-double-right' color='#fff' size={40} />
    // )
    const { show, date, mode } = this.state
    let data = [{
      value: '10:00'
    }, {
      value: '11:00'
    }, {
      value: '12:00'
    }, {
      value: '13:00'
    }, {
      value: '14:00'
    }, {
      value: '15:00'
    }, {
      value: '16:00'
    }, {
      value: '17:00'
    }, {
      value: '18:00'
    }, {
      value: '19:00'
    }, {
      value: '20:00'
    }, {
      value: '21:00'
    }]
    let datacash = [{
      value: 'Cash'
    }, {
      value: 'Card'
    }]
    return (
      <View style={styles.mainContainer}>
        <ScrollView >
          <View style={styles.profileHeader}>
            <View style={styles.profileHeaderBody}>
              <Text style={styles.fartime}>Məbləğ</Text>
            </View>
            <View style={styles.profileHeaderLeft}>
              <Text style={styles.fartime}>{this.state.pricee} AZN</Text>
            </View>
          </View>
          <View style={styles.cashBox}>
            <View>
              <Text style={styles.fartime}>Məsafə</Text>
            </View>
            <View>
              <Text style={styles.fartime}>{this.state.distance} km</Text>
            </View>
          </View>
          <View style={styles.cashBox}>
            <View>
              <Text style={styles.sectionTitle}>Çatdırılma vaxtı</Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>{this.state.duration} dəq</Text>
            </View>
          </View>
          {/* <View style={styles.orderDescriptionBox}><Text style={styles.orderDescription}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto corporis cupiditate deserunt distinctio ea et explicabo harum id, laborum laudantium natus nostrum qui quo quod unde velit voluptate. Fugiat.</Text></View> */}
          {/* <View style={styles.sectionLine} /> */}
          <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>Daşınacaq Yükün fotosu</Text></View>
          <View style={styles.imgScroll}>
            {this.props.firstPhoto}
            {this.props.secondPhoto}
            {this.props.thirdPhoto}
          </View>
          <View style={styles.receiverInfoBox}>
            <View>
              <Text>Çatdırılacaq şəxs</Text>
              <View style={styles.inputBox}>
                {this.props.receiverName}
              </View>
              <View >
                <Text>Çatdırılacaq şəxsin nömrəsi*</Text>
                {this.props.errorMsgPhone}
                <View style={styles.PhoneInputBox}>
                  {this.props.receiverPhone}
                </View>
              </View>
              <View>
                <Text>Message*</Text>
                {this.props.errorMsgMessage}
                <View style={styles.inputBox}>
                  {this.props.message}
                </View>
              </View>
              <View />
              {/* <View style={styles.actionBox}> */}
              {/*  { */}
              {/*    this.state.radioItems.map((item, key) => */}
              {/*      ( */}
              {/*        <MyRadioBtn key={key} button={item} onClick={this.changeActiveRadioButton.bind(this, key)} /> */}
              {/*      )) */}
              {/*  } */}
              {/* </View> */}
              {/* <View>{this.state.scheduled ? (<View> */}
              {/*  <View> */}
              {/*    <MyButton */}
              {/*      onPress={this.datepicker} */}
              {/*      text={this.state.selectedDate.toString()} */}
              {/*      backgroundColor='#7B2BFC' */}
              {/*      borderColor='#7B2BFC' */}
              {/*      borderRadius={30} */}
              {/*      color='#fff' /> */}
              {/*  </View> */}
              {/*  { show && <DateTimePicker value={new Date()} */}
              {/*    mode={mode} */}
              {/*    display='spinner' */}
              {/*    onChange={this.setDate} /> */}
              {/*  } */}
              {/*  <Dropdown */}
              {/*    label='Delivery time' */}
              {/*    data={data} */}
              {/*  /> */}
              {/*  <Dropdown */}
              {/*    label='Payment type' */}
              {/*    data={datacash} */}
              {/*  /> */}
              {/* </View>) : null}</View> */}
              {/* <View style={styles.checkContainer}> */}
              {/*  {this.props.insurance} */}
              {/*  <Text>+3%</Text> */}
              {/* </View> */}
              {/* <View> */}
              {/*  {this.props.insurance_price} */}
              {/* </View> */}
            </View>
          </View>
        </ScrollView>
        <View style={styles.swipeBox}>
          {this.renderButton()}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    startLongLat: state.destinationAddress.startLongLat,
    endLongLat: state.destinationAddress.endLongLat,
    startLocation: state.destinationAddress.startLocation,
    endLocation: state.destinationAddress.endLocation,
    distance: state.price.distance,
    duration: state.price.duration,
    price: state.price.price
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptPrice: (distance, duration, price) => dispatch(PriceAction.priceRequest(distance, duration, price)),
    attemptOrder: (orderId) => dispatch(OrderAction.orderRequest(orderId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewOrderBody)
