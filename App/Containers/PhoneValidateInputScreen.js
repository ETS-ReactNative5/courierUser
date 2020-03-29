import React, {Component} from 'react'
import { View, Text, Dimensions, ImageBackground } from 'react-native'
import {connect} from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import RegisterAction from '../Redux/RegisterRedux'
import I18n from '../I18n'
import PhoneInput from 'react-native-phone-input'
import MyButton from '../Components/MyButton'

// Styles
import styles from './Styles/PhoneValidateScreenStyle'
import Spiner from '../Components/Spiner'
import API from '../Services/Api'
import AsyncStorage from '@react-native-community/async-storage'
import { Images } from '../Themes'
const {width} = Dimensions.get('window')

class PhoneValidateInputScreen extends Component {
  state = {
    country_code: '',
    number: '',
    step: 'phone_number',
    error: '',
    loading: false

  }

  onPhoneNumberChange = () => {
    this.setState({
      country_code: this.phone.getCountryCode(),
      number: this.phone.getValue()
    })
  };
  onPres = () => {
    this.setState({loading: true})
    if (this.state.number === '' || this.state.country_code === '') {
      this.setState({
        error: 'Mobil nömrə vacibdi',
        loading: false
      })
    } else {
      this.onPressNext()
    }
  }
  onPressNext = () => {
    // console.log(this.props.fetching)
    let number = this.state.number
    let country_code = '+' + this.state.country_code
    let num = number.replace(country_code, '')
    let body = {
      country_code: country_code,
      number: num,
      step: 'phone_number'
    }
    console.log(body)
    AsyncStorage.setItem('@phoneNumber', num)
    AsyncStorage.setItem('@countryCode', country_code)
    this.postLogin(body)
  }

  postLogin = async (param) => {
    console.log(param)
    const api = API.create()

    const login = await api.postLogin(param)
    console.log(login, 'response')
    console.log(login.data.verification_id, 'response.data.id')
    console.log(login.status, 'response.status')
    if (login.status === 200) {
      this.setState({
        loading: false
      })
      const {number} = this.state
      const verification_id = login.data.verification_id
      this.props.attemptRegister(number, verification_id)
      this.props.navigation.navigate('PhoneValidateScreen')
    } else {
      this.setState({
        error: login.status,
        loading: false
      })
    }
  }
  renderButton = () => {
    if (!this.state.loading) {
      return <MyButton
        onPress={this.onPres}
        color='#fff'
        backgroundColor='#7B2BFC'
        borderColor='#7B2BFC'
        borderRadius={30}
        text={I18n.t('GET CODE')}
      />
    }
    return <Spiner size='small' />
  }
  render () {
    const {number, error} = this.state
    const errorMsg = error ? (<Text style={styles.errorMsg}>{error}</Text>) : null
    return (
      <ImageBackground style={styles.bg}
        source={Images.mapBg}>
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>Verification</Text>
          <Text style={styles.loginText}>Please, enter your phone and we will create account for you</Text>
          <PhoneInput
            onChangePhoneNumber={this.onPhoneNumberChange}
            initialCountry='az'
            flagStyle={{borderRadius: 100}}
            value={number} style={styles.loginInput} ref={ref => { this.phone = ref }} />
          {errorMsg}
          <View style={styles.loginBtnBox}>
            {this.renderButton()}
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptRegister: (number, verification_id) => dispatch(RegisterAction.registerRequest(number, verification_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneValidateInputScreen)
