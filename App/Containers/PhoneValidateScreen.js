import React, {Component} from 'react'
import {View, Text, KeyboardAvoidingView, Alert} from 'react-native'
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
class PhoneValidateScreen extends Component {
  state = {
    code: '',
    verification_id: ''

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
    let {verification_id} = this.state

    let body = {
      verification_id: verification_id,
      sms_code: code,
      step: 'code'
    }
    this.postSmsVerification(body)
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
      this.props.navigation.navigate('MenuScreen')
    } else {
      this.setState({
        error: postSmsVerification.status,
        loading: false
      })
    }
  }

  render () {
    const {verification_id} = this.props
    console.log('redux')
    console.log(verification_id)
    console.log('redux')
    return (
      <View style={styles.container}>

        <View style={styles.kodBox}>
          <Text style={styles.kodTitle}>Zəhmət olmasa identifikasiya
            kodunu daxil edin</Text>
          <KeyboardAvoidingView behavior='position' style={{borderBottomWidth: 1}}>
            <CodeInput
              ref='codeInputRef2'
              // secureTextEntry
              borderType='circle'
              activeColor='#7C7C7C'
              inactiveColor='#7C7C7C'
              autoFocus={false}
              inputPosition='center'
              codeLength={6}
              size={25}
              onFulfill={this._onFulfill1}
              containerStyle={{marginTop: 40, marginBottom: 45}}
              codeInputStyle={{borderWidth: 0, backgroundColor: '#D9D9DA'}}
            />
          </KeyboardAvoidingView>

        </View>

      </View>
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneValidateScreen)
