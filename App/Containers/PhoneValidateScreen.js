import React, {Component} from 'react'
import { View, Text, KeyboardAvoidingView, Alert, ImageBackground, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import CodeInput from 'react-native-code-input'
import MyButton from '../Components/MyButton'
import _ from 'lodash'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles

// Styles
import styles from './Styles/PhoneValidateScreenStyle'
import API from '../Services/Api'
import AsyncStorage from '@react-native-community/async-storage'
import { Images } from '../Themes'
import Spiner from '../Components/Spiner'
import RegisterAction from '../Redux/RegisterRedux'
class PhoneValidateScreen extends Component {
  state = {
    code: '',
    verification_id: '',
    smsCode: ''
  }
  _alert = message => Alert.alert(
    'Confirmation Code',
    message,
    [{text: 'OK'}],
    {cancelable: false}
  )

  componentDidMount () {
    this.setState({
      verification_id: this.props.verification_id
    })
    console.log(this.state.verification_id)
    console.log(this.props.verification_id)
  }

  _onFulfill1 = (code) => {
    this.setState({
      smsCode: code
    })
  }
  postSmsVerification = async (param) => {
    console.log(param)
    const api = API.create()

    const postSmsVerification = await api.postSmsVerification(param)
    console.log(postSmsVerification, 'response')
    console.log(postSmsVerification.data.access_token, 'response.data.token')
    console.log(postSmsVerification.status, 'response.status')
    if (postSmsVerification.status === 200) {
      this.setState({
        loading: false
      })
      AsyncStorage.setItem('@token', postSmsVerification.data.access_token)
      this.props.navigation.replace('MenuScreen')
    } else {
      this.setState({
        error: postSmsVerification.status,
        loading: false,
        loadingSms: false
      })
    }
  }
  onPres = () => {
    let smsCode = this.state.smsCode
    console.log(smsCode)
    console.log(smsCode.length)
    this.setState({loading: true})
    if (smsCode.length !== 6) {
      this.setState({
        error: 'Kod 6 rəqəmli olmalidi',
        loading: false
      })
    } else {
      let {verification_id} = this.state
      let body = {
        verification_id: verification_id,
        sms_code: smsCode,
        step: 'code'
      }
      this.postSmsVerification(body)
    }
  }

  newCode = async () => {
    this.setState({
      loadingSms: true
    })
    const phoneNumber = await AsyncStorage.getItem('@phoneNumber')
    const countryCode = await AsyncStorage.getItem('@countryCode')
    console.log(phoneNumber)
    console.log(countryCode)
    let body = {
      country_code: countryCode,
      number: phoneNumber,
      step: 'phone_number'
    }
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
        loadingSms: false
      })
      const {number} = this.state
      const verification_id = login.data.verification_id
      this.props.attemptRegister(number, verification_id)
    } else {
      this.setState({
        error: login.status,
        loadingSms: false
      })
    }
  }
  renderButton = () => {
    if (!this.state.loading) {
      return <MyButton onPress={this.onPres}
        color='#fff'
        backgroundColor='#7B2BFC'
        borderColor='#7B2BFC'
        borderRadius={30}
        text='APPLY'
      />
    }
    return <Spiner size='small' />
  }
  renderSmsBtn = () => {
    if (!this.state.loadingSms) {
      return (<TouchableOpacity
        style={styles.newCode} onPress={this.newCode}>
        <Text style={styles.newCodeText}>Send new code</Text>
      </TouchableOpacity>)
    }
    return (<View style={styles.loadingSmsBox}>
      <Spiner size='small' />
    </View>)
  }
  render () {
    const {verification_id} = this.props
    console.log('redux')
    console.log(verification_id)
    const {error} = this.state
    const errorMsg = error ? (<Text style={styles.errorMsg}>{error}</Text>) : null
    return (
      <ImageBackground style={styles.bg} source={Images.mapBg}>
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>Verification</Text>
          <Text style={styles.loginText}>Please, enter code from SMS which we sent you</Text>
          <View style={styles.loginCodeBox}>
            <CodeInput
              ref='codeInputRef2'
              activeColor='#000'
              // inactiveColor='rgba(49, 180, 4, 1.3)'
              autoFocus={false}
              inputPosition='center'
              size={45}
              codeLength={6}
              onFulfill={this._onFulfill1}
              containerStyle={{flex: 1}}
              codeInputStyle={styles.loginCodeInput}
            />
          </View>
          {errorMsg}
          <View style={styles.loginBtnBox}>
            {this.renderButton()}
          </View>
          {this.renderSmsBtn()}
        </View>
      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    number: state.register.number,
    verification_id: state.register.verification_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptRegister: (number, verification_id) => dispatch(RegisterAction.registerRequest(number, verification_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneValidateScreen)
