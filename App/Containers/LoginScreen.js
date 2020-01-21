import React, {Component, PropTypes} from 'react'
import {ScrollView, Text, KeyboardAvoidingView, Dimensions, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions from '../Redux/LoginRedux'
import PhoneInput from 'react-native-phone-input'
import MyInput from '../Components/MyInput';
import MyButton from '../Components/MyButton';


// Styles
import styles from './Styles/LoginScreenStyle'

const {width} = Dimensions.get('window');

class LoginScreen extends Component {
  state = {
    mobile: null,
    password: null,

  }
  onPres = () => {
    const {mobile, password} = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(mobile, password)
    this.props.navigation.navigate('PromoKodScreen')
  }
  onPhoneNumberChange = () => {
    this.setState({
      mobile: this.phone.getValue(),
    });
    const {mobile, password} = this.state
    this.props.attemptLogin(mobile, password)

  };
  onPasswordChange = (text) => {
    this.setState({password: text});
    const {mobile, password} = this.state
    this.props.attemptLogin(mobile, password)
  };

  render() {
    console.log(this.props);
    const {mobile, password} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.headBackground} />
        <View>
          <Text style={styles.logo}>Logo</Text>
          <Text style={styles.logoDescription}>Hello, nice to meet you!</Text>
        </View>
        <ScrollView>
          <View style={styles.loginArea}>
            <Text style={styles.loginAreaTitle}>Get moving with Logo</Text>
            <Text style={styles.loginAreaDescription}>Elə indi qeydiyyatdan keç</Text>
            <View style={styles.inputBox}>
              <PhoneInput value={this.state.phone} onChangePhoneNumber={this.onPhoneNumberChange} initialCountry='az' style={{
                fontSize:15,
                width: '100%',
              }} ref={ref => {
                this.phone = ref;
              }}/>
            </View>
            <View style={{marginTop: 15, flex: 1}}>
              <MyButton
                onPress={this.onPres}
                text="Next"
                color="#fff"
                backgroundColor="#7B2BFC"/>
            </View>
          </View>
        </ScrollView>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    mobile: state.login.mobile,
    password: state.login.password,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (mobile, password) => dispatch(LoginActions.loginRequest(mobile, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
