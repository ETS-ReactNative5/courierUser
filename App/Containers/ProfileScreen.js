import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle'
import MenuLink from '../Components/MenuLink'

import { Images } from '../Themes'
class ProfileScreen extends Component {
  render () {
    return (
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <View style={styles.profileHeaderLeft}>
            <Image style={styles.newsImage} source={Images.news1} />
          </View>
          <View style={styles.profileHeaderBody}>
            <Text style={styles.profileHeaderBodyText}>ALİ HASANLİ</Text>
            <Text style={styles.profileHeaderBodyTextY}>+994 745 84 47</Text>
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
          <MenuLink text='Support/FAQ'
            onPress={() => this.props.navigation.navigate('SupportScreen')}
            icon='help-circle'
            color='#606060'
            size={25}
            fontSize={20} />
          <MenuLink text='Log out'
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
