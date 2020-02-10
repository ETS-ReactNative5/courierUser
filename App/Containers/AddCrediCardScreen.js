import React, { Component } from 'react'
import { Switch, View } from 'react-native'
import { connect } from 'react-redux'
import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddCrediCardScreenStyle'

import MyButton from '../Components/MyButton'

class AddCrediCardScreen extends Component {
  state = { useLiteCreditCardInput: false };

  _onChange = (formData) => console.log(JSON.stringify(formData, null, ' '));
  _onFocus = (field) => console.log('focusing', field);
  render () {
    return (
      <View style={styles.container}>
        <CreditCardInput
          autoFocus
          requiresName
          requiresCVC
          requiresPostalCode
          labelStyle={styles.label}
          inputStyle={styles.input}
          validColor={'black'}
          invalidColor={'red'}
          placeholderColor={'darkgray'}
          onFocus={this._onFocus}
          onChange={this._onChange} />
        <View style={styles.btnBox}>
          <MyButton
            onPress={() => this.props.navigation.goBack()}
            text='OK'
            color='#fff'
            backgroundColor='#7B2BFC'
            borderColor='#7B2BFC'
            borderRadius={30} />
        </View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCrediCardScreen)
