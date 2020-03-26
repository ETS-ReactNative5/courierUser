import React, { Component } from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import AsyncStorage from '@react-native-community/async-storage'

// Styles
import styles from './Styles/ProfileScreenStyle'
import MenuLink from '../Components/MenuLink'
import { userRegistration } from '../Config/API'
import ProfilAction from '../Redux/ProfilRedux'
import { Images } from '../Themes'
class ProfileScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      first_name: 'AD',
      id: '024c8d63-83d7-4abe-ac4f-0c23fb8d8f26',
      last_name: '',
      phone_number: 'Nömrə',
      username: 'Morqan'
    }
    this.getUserData()
  }
  getUserData = async () => {
    const token = await AsyncStorage.getItem('@token')
    const firstName = await AsyncStorage.getItem('@firstName')
    const lastName = await AsyncStorage.getItem('@lastName')
    const email = await AsyncStorage.getItem('@email')
    const phoneNumber = await AsyncStorage.getItem('@phoneNumber')
    this.token = 'Bearer ' + token
    this.setState({
      token: this.token,
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber
    })
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
  render () {
    let user = this.state.first_name ? (<View>
      <Text style={styles.profileHeaderBodyTextY}>{this.state.first_name}</Text>
      <Text style={styles.profileHeaderBodyTextY}>{this.state.phone_number}</Text>
    </View>) : <View>
      <Text style={styles.profileHeaderBodyTextY}>AD</Text>
      <Text style={styles.profileHeaderBodyTextY}>{this.state.phone_number}</Text>
    </View>
    return (
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <View style={styles.profileHeaderLeft}>
            <Image style={styles.newsImage} source={Images.userDefaultImg} />
          </View>
          <View style={styles.profileHeaderBody}>
            {user}
          </View>

        </View>
        <View style={styles.profileBody}>
          <MenuLink text='Profilim'
            onPress={() => this.props.navigation.navigate('AccountScreen')}
            icon='account'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Ödəniş növləri'
            onPress={() => this.props.navigation.navigate('PaymentMethodScreen')}
            icon='cash-multiple'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Sifarişlər'
            onPress={() => this.props.navigation.navigate('OrderHistoryScreen')}
            icon='history'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Bildirişlər'
            onPress={() => this.props.navigation.navigate('NewsScreen')}
            icon='bell-ring'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Parametrlər'
            onPress={() => this.props.navigation.navigate('SettingScreen')}
            icon='settings'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Dostunla Paylaş'
            onPress={() => this.props.navigation.navigate('SharePromoScreen')}
            icon='share-variant'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Dəstək/FAQ'
            onPress={() => this.props.navigation.navigate('SupportScreen')}
            icon='help-circle'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Çıxış'
            onPress={() => {
              AsyncStorage.removeItem('@token')
              this.props.navigation.navigate('PhoneValidateInputScreen')
            }}
            icon='exit-to-app'
            color='#606060'
            size={25}
            fontSize={20} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    verification_id: state.register.verification_id,
    profil: state.profil.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
