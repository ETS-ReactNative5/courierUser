import React, { Component } from 'react'
import {View, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AccountScreenStyle'
import I18n from '../I18n'
import PhoneInput from 'react-native-phone-input'
import MyInput from '../Components/MyInput'
import MyButton from '../Components/MyButton'
import ModalRating from '../Components/ModalRating'
import AsyncStorage from '@react-native-community/async-storage'
import { userRegistration } from '../Config/API'
const {width} = Dimensions.get('window')
class AccountScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      first_name: '',
      id: '',
      last_name: '',
      phone_number: '',
      username: ''
    }
  }
  componentDidMount () {
    const getProfileData = async (token) => {
      const data = await fetch(userRegistration, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + token
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState(data)
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
      return data
    }
    AsyncStorage.getItem('@token')
      .then((token) => {
        getProfileData(token)
      })
      .catch((error) => console.log(error))
  }

  onPressUpdate = () => {
    let {email, first_name, last_name} = this.state

    let body = {
      email,
      first_name,
      last_name
    }
    console.log(body)
    const updateProfile = async (token) => {
      const customerUrl = userRegistration + '/' + this.state.id
      await fetch(customerUrl, {
        body: JSON.stringify(body),
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + token
        }

      })
        .then((res) => console.log(res))
    }
    AsyncStorage.getItem('@token')
      .then((token) => {
        updateProfile(token)
      })
      .catch((error) => console.log(error))
    this.props.navigation.goBack()
  }

  handleChange = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View>
            <MyInput
              text={I18n.t('surname')}
              onChangeText={first_name => this.setState({ first_name })}
              value={this.state.first_name} />
            <MyInput
              text={I18n.t('surname')}
              value={this.state.last_name}
              onChangeText={last_name => this.setState({ last_name })}
            />
            <MyInput
              text={I18n.t('email')}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
            <MyInput text={I18n.t('NÖMRƏ')} disabled value={this.state.phone_number} />
          </View>
          <View style={styles.buttonContainer}>
            <MyButton onPress={this.onPressUpdate}
              color='#fff'
              backgroundColor='#7B2BFC'
              borderColor='#7B2BFC'
              borderRadius={30}
              text={I18n.t('SUBMIT')}
            />

          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    verification_id: state.register.verification_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
