import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Content, ListItem, Text, Radio, Right, Left, Icon } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PaymentMethodScreenStyle'
import MyButton from '../Components/MyButton'
class PaymentMethodScreen extends Component {
  constructor () {
    super()
    this.state = {
      itemSelected: 'itemOne'
    }
  }
  render () {
    return (
      <Container>
        <Content>
          <ListItem style={styles.radioBox} onPress={() => this.setState({ itemSelected: 'itemOne' })} >
            <Left>
              <Icon style={styles.ccIcon} name='cash' />
              <Text>Nəğd</Text>
            </Left>
            <Right>
              <Radio
                selectedColor={'#451E5D'}
                selected={this.state.itemSelected == 'itemOne'}
              />
            </Right>
          </ListItem>
          <ListItem style={styles.radioBox} onPress={() => this.setState({ itemSelected: 'itemTwo' })}>
            <Left>
              <Icon style={styles.ccIcon} type='FontAwesome' name='cc-visa' />
              <Text>9524</Text>
            </Left>
            <Right>
              <Radio
                color={'#f0ad4e'}
                selectedColor={'#451E5D'}
                selected={this.state.itemSelected == 'itemTwo'}
              />
            </Right>
          </ListItem>
          <ListItem style={styles.radioBox} onPress={() => this.setState({ itemSelected: 'itemTree' })}>
            <Left>
              <Icon style={styles.ccIcon} type='FontAwesome' name='cc-mastercard' />
              <Text>2655</Text>
            </Left>
            <Right>
              <Radio
                color={'#f0ad4e'}
                selectedColor={'#451E5D'}
                selected={this.state.itemSelected == 'itemTree'}
              />
            </Right>
          </ListItem>
        </Content>
        <View style={styles.btnBox}>
          <MyButton
            onPress={() => this.props.navigation.navigate('AddCrediCardScreen')}
            text='KART ƏLAVƏ ET'
            color='#fff'
            backgroundColor='#7B2BFC'
            borderColor='#7B2BFC'
            borderRadius={30} />
        </View>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodScreen)
