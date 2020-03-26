import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Hr from 'react-native-hr-component'
// Styles
import styles from './Styles/SharePromoScreenStyle'
import { Images } from '../Themes'
import Circlebutton from '../Components/Circlebutton'

class SharePromoScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.imgBox}>
          <Image style={styles.img} source={Images.letter} />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.textTitle}>3.5 AZN verin, 3.5 AZN alin</Text>
          <Hr textPadding={20} hrPadding={90} lineColor='#7f00dc' width={2} text='UH1M9' textStyles={styles.textKod} />
          <Text style={styles.text}>Promo kodunuzu dostlarınızla paylaşın və onların ilk sifarişi pulsuz olsun (3 AZN-ə qədər). Dostlarınız ilk sifarişi istifadə etdikdən sonra siz də pulsuz sifariş(3 AZN-ə qədər) qazanacaqsınız</Text>
          <View style={styles.iconBox}>
            <Circlebutton
                      // onPress={() => this.props.navigation.navigate('PaymentMethodScreen')}
              icon='facebook'
              iconColor='#fff'
              size={25}
              fontSize={20}
              backgroundColor='#3b5998' />
            <Circlebutton
              // onPress={() => this.props.navigation.navigate('PaymentMethodScreen')}
              icon='whatsapp'
              iconColor='#fff'
              size={25}
              fontSize={20}
              backgroundColor='#25D366' />
            <Circlebutton
              // onPress={() => this.props.navigation.navigate('PaymentMethodScreen')}
              icon='email-outline'
              iconColor='#fff'
              size={25}
              fontSize={20}
              backgroundColor='#3EDF6C' />
            <Circlebutton
              // onPress={() => this.props.navigation.navigate('PaymentMethodScreen')}
              icon='share-variant'
              iconColor='#fff'
              size={25}
              fontSize={20}
              backgroundColor='#FFE738' />
          </View>
          <TouchableOpacity>
            <Text>Qayadar ve Sertler</Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(SharePromoScreen)
