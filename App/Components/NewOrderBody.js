import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { ScrollView, Text, View, TextInput, Platform } from 'react-native'
import styles from './Styles/NewOrderBodyStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Dropdown } from 'react-native-material-dropdown'
import CheckBox from 'react-native-check-box'
import PhoneInput from 'react-native-phone-input'
import ImagesPicker from '../Components/ImagesPicker'
import MyRadioBtn from './MyRadioBtn'
import MyButton from './MyButton'
import SwipeButton from 'rn-swipe-button'
import { connect } from 'react-redux'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

type Props = {};

class NewOrderBody extends Component {
  state = {
    distance: 0,
    duration: 0,
    pricee: 0,
    isChecked: false,
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

  percent = () => {
    console.log(this.state.percent)
    this.setState({
      billAmount: this.state.percent * 0.03 + this.state.price
    })
  }
  componentDidMount () {
    const {distance, duration, pricee} = this.props
    this.setState({
      distance: distance,
      duration: duration,
      pricee: pricee,
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

  render () {
    const SwipeIcon = () => (
      <Icon name='chevron-double-right' color='#fff' size={40} />
    )
    const { show, date, mode } = this.state
    let data = [{
      value: '00:00 - 02:00'
    }, {
      value: '02:00 - 04:00'
    }, {
      value: '04:00 - 06:00'
    }, {
      value: '06:00 - 08:00'
    }, {
      value: '08:00 - 10:00'
    }, {
      value: '10:00 - 12:00'
    }, {
      value: '12:00 - 14:00'
    }, {
      value: '14:00 - 16:00'
    }, {
      value: '16:00 - 18:00'
    }, {
      value: '18:00 - 20:00'
    }, {
      value: '20:00 - 22:00'
    }, {
      value: '22:00 - 00:00'
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
          <View style={styles.orderDescriptionBox}><Text style={styles.orderDescription}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto corporis cupiditate deserunt distinctio ea et explicabo harum id, laborum laudantium natus nostrum qui quo quod unde velit voluptate. Fugiat.</Text></View>
          <View style={styles.sectionLine} />
          <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>Daşınacaq Yükün fotosu</Text></View>
          <View style={styles.imgScroll}>
            <ImagesPicker />
          </View>
          <View style={styles.receiverInfoBox}>
            <View>
              <Text>Receiver name</Text>
              <View style={styles.inputBox}>
                <TextInput
                  placeholder='Ad Soyad'
                  onChangeText={(text) => this.setState({ text })}
                  value={this.state.text} />
              </View>
              <View >
                <Text>Receiver number</Text>
                <View style={styles.PhoneInputBox}>
                  <PhoneInput
                    value={this.state.phone}
                    onChangePhoneNumber={this.onPhoneNumberChange}
                    initialCountry='az'
                    style={{ fontSize: 15, width: '100%' }}
                    ref={ref => { this.phone = ref }} />
                </View>
              </View>
              <View>
                <Text>Message</Text>
                <View style={styles.inputBox}>
                  <TextInput
                    multiline
                    numberOfLines={4}
                    placeholder='Message'
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text} />
                </View>
              </View>
              <View />
              <View style={styles.actionBox}>
                {
                  this.state.radioItems.map((item, key) =>
                    (
                      <MyRadioBtn key={key} button={item} onClick={this.changeActiveRadioButton.bind(this, key)} />
                    ))
                }
              </View>
              <View>{this.state.scheduled ? (<View>
                <View>
                  <MyButton
                    onPress={this.datepicker}
                    text={this.state.selectedDate.toString()}
                    color='#fff'
                    backgroundColor='#7B2BFC' />
                </View>
                { show && <DateTimePicker value={new Date()}
                  mode={mode}
                  display='spinner'
                  onChange={this.setDate} />
                }
                <Dropdown
                  label='Delivery time'
                  data={data}
                />
                <Dropdown
                  label='Payment type'
                  data={datacash}
                />
              </View>) : null}</View>
              <View style={styles.checkContainer}>
                <CheckBox
                  style={{flex: 1}}
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked
                    })
                  }}
                  isChecked={this.state.isChecked}
                  rightText={'Add insurance'}
                />
                <Text>+3%</Text>
              </View>
              <View>{this.state.isChecked ? (<View>
                <Text>Daşınacaq yükün dəyəri :</Text>
                <View style={styles.inputBox}>
                  <TextInput
                    keyboardType='numeric'
                    placeholder='Daşınacaq yükün dəyəri :'
                    onChangeText={this.percent}
                    value={this.state.percent} />
                </View>
                <View>
                  <Text>Bill amount </Text>
                  <Text>{this.state.billAmount} AZN</Text>
                </View>
              </View>) : null}</View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.swipeBox}>
          <SwipeButton
            disabled={false}
            title='Accept '
            titleColor='#FFFFFF'
            railBackgroundColor='#7B2BFC'
            railBorderColor='#7B2BFC'
            thumbIconBackgroundColor='#7B2BFC'
            thumbIconBorderColor='#7B2BFC'
            thumbIconComponent={SwipeIcon}
            railFillBackgroundColor='#000'
            railFillBorderColor='#fff' />
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    distance: state.price.distance,
    duration: state.price.duration,
    pricee: state.price.price
  }
}
export default connect(mapStateToProps)(NewOrderBody)
