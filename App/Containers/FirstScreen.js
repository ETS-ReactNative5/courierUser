import React, {Component} from 'react'
import {Text, Image, View, ImageBackground} from 'react-native'
import { connect } from 'react-redux'
import {Images} from '../Themes'
import MyButton from '../Components/MyButton'

import AsyncStorage from '@react-native-community/async-storage'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/FirstScreenStyle'

class FirstScreen extends Component {
  componentDidMount () {
    // AsyncStorage.removeItem('@token');
    AsyncStorage.getItem('@token')
      .then((token) => {
        console.log(token)
        if (token) this.props.navigation.navigate('MenuScreen')
      })
  }

  render () {
    return (
      <ImageBackground
        style={styles.bg}
        source={Images.bg}>
        {/* <View style={styles.imageContainer}> */}
        {/*  <Image style={styles.image} source={Images.logo} /> */}
        {/* </View> */}
        <View style={styles.whiteArea} />
        <View style={styles.textContainer}>
          {/* <Text style={styles.text}>189 taksi şirkətinə </Text> */}
          <Text style={[styles.text, {fontWeight: 'bold'}]}>xoş gəlmisiniz</Text>
        </View>
        <View style={styles.buttonContainer}>
          <MyButton color='#fff'
            onPress={() => this.props.navigation.navigate('LoginScreen')}
            backgroundColor='#7B2BFC'
            borderColor='#7B2BFC'
            text='Daxil Ol'
            borderRadius={30}
            width='50%' />
          <MyButton width='50%'
            onPress={() => this.props.navigation.navigate('PhoneValidateInputScreen')}
            backgroundColor='#fff'
            color='#7B2BFC'
            borderColor='#7B2BFC'
            borderRadius={30}
            text='Qeydiyyat' />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen)
