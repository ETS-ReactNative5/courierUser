import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SettingScreenStyle'
import { Container, Content, Icon, Left, ListItem, Radio, Right, Text } from 'native-base'
import MyButton from '../Components/MyButton'
import { Images } from '../Themes'
class SettingScreen extends Component {
  constructor () {
    super()
    this.state = {
      itemSelected: 'AZ'
    }
  }
  render () {
    return (
      <Container>
        <Content>
          <ListItem style={styles.radioBox} onPress={() => this.setState({ itemSelected: 'AZ' })} >
            <Left>
              <Image style={styles.orderImg} source={Images.az} />
              <Text>AZ</Text>
            </Left>
            <Right>
              <Radio
                selectedColor={'#451E5D'}
                selected={this.state.itemSelected == 'AZ'}
              />
            </Right>
          </ListItem>
          <ListItem style={styles.radioBox} onPress={() => this.setState({ itemSelected: 'RU' })}>
            <Left>
              <Image style={styles.orderImg} source={Images.ru} />
              <Text>RU</Text>
            </Left>
            <Right>
              <Radio
                color={'#f0ad4e'}
                selectedColor={'#451E5D'}
                selected={this.state.itemSelected == 'RU'}
              />
            </Right>
          </ListItem>
          <ListItem style={styles.radioBox} onPress={() => this.setState({ itemSelected: 'US' })}>
            <Left>
              <Image style={styles.orderImg} source={Images.us} />
              <Text>US</Text>
            </Left>
            <Right>
              <Radio
                color={'#f0ad4e'}
                selectedColor={'#451E5D'}
                selected={this.state.itemSelected == 'US'}
              />
            </Right>
          </ListItem>
        </Content>
        <View style={styles.btnBox}>
          <MyButton
            onPress={() => this.props.navigation.navigate('MenuScreen')}
            text='Yadda saxla'
            color='#fff'
            backgroundColor='#7b2bfc' />
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)
