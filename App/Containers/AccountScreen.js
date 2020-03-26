import React, { Component } from 'react'
import {View, Dimensions, Text, KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AccountScreenStyle'
import I18n from '../I18n'
import MyInput from '../Components/MyInput'
import MyButton from '../Components/MyButton'
import AsyncStorage from '@react-native-community/async-storage'
import API from '../Services/Api'
import Spiner from '../Components/Spiner'
const {width} = Dimensions.get('window')

class AccountScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: null,
      first_name: null,
      id: '',
      last_name: null,
      phone_number: '',
      username: ''
    }
    this.getUserData()
  }
  getUserData = async () => {
    const token = await AsyncStorage.getItem('@token')
    const firstName = await AsyncStorage.getItem('@firstName')
    const lastName = await AsyncStorage.getItem('@lastName')
    const email = await AsyncStorage.getItem('@email')
    const phoneNumber = await AsyncStorage.getItem('@phoneNumber')
    const id = await AsyncStorage.getItem('@verId')
    console.log(id)
    this.token = 'Bearer ' + token
    this.setState({
      token: this.token,
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      id: id,
      loading: false,
      loadingBtn: false
    })
  }
  onPressUpdate = () => {
    let {email, first_name, last_name} = this.state
    let param = {
      email,
      first_name,
      last_name
    }
    AsyncStorage.setItem('@firstName', first_name)
    AsyncStorage.setItem('@lastName', last_name)
    AsyncStorage.setItem('@email', email)

    console.log(param)
    this.putUserData(param)
  }
  putUserData = async (param) => {
    const orderID = this.state.id
    this.token = this.state.token
    const api = API.create()
    let headers = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': this.token
      }
    }
    const putUserData = await api.putUserData(headers, orderID, param)
    console.log(putUserData)
    if (putUserData.status === 200) {
      this.props.navigation.replace('MenuScreen')
    } else {
      this.setState({
        error: putUserData.data.msg
      })
    }
  }
  handleChange = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  renderButton = () => {
    if (this.state.loadingBtn === true) {
      return <Spiner size='small' />
    }
    return (
      <View slyle={styles.buttonContainer}>
        <MyButton onPress={this.onPressUpdate}
          color='#fff'
          backgroundColor='#7B2BFC'
          borderColor='#7B2BFC'
          borderRadius={30}
          text={I18n.t('Yadda saxla')} />
      </View>
    )
  }
  renderInput = () => {
    return (
      <View style={styles.inputContainer}>
        <MyInput
          text={I18n.t('Ad')}
          onChangeText={first_name => this.setState({ first_name })}
          value={this.state.first_name} />
        <MyInput
          text={I18n.t('Soyad')}
          value={this.state.last_name}
          onChangeText={last_name => this.setState({ last_name })}
        />
        <MyInput
          text={I18n.t('Email')}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <MyInput text={I18n.t('Nömrə')} disabled value={this.state.phone_number} />
      </View>
    )
  }
  renderContent = () => {
    if (this.state.loading === false) {
      return (
        <View style={styles.container}>
          {this.renderInput()}
          {this.renderButton()}
        </View>
      )
    }
    return <Spiner size='large' />
  }
  render () {
    return this.renderContent()
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
