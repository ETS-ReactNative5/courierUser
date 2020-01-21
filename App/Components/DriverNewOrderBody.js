import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, ScrollView, Easing, Image } from 'react-native'
import styles from './Styles/DriverNewOrderBodyStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ZoomImage from 'react-native-zoom-image'
import SwipeButton from 'rn-swipe-button'
import { Images } from '../Themes'
export default class DriverNewOrderBody extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const SwipeIcon = () => (
      <Icon name='chevron-double-right' color='#fff' size={40} />
    )
    return (
      <View style={styles.mainContainer}>
        <ScrollView >
          <View style={styles.profileHeader}>
            <View style={styles.profileHeaderBody}>
              <Text style={styles.profileHeaderBodyText}>Joe</Text>
              <Text style={styles.profileHeaderBodyTextY}>Kia optima  10-TE-010</Text>
            </View>
            <View style={styles.profileHeaderLeft}>
              <Image style={styles.newsImage} source={Images.userDefaultImg} />
            </View>
          </View>
          <View style={styles.cashBox}>
            <View>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <Text style={styles.cashMetod}>Cash Payment</Text>
            </View>
            <View>
              <Text style={styles.cashValue}>4.20 AZN</Text>
            </View>
          </View>
          <View style={styles.cashBox}>
            <View>
              <Text style={styles.sectionTitle}>Catdirilma</Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>10/10/2019</Text>
              <Text style={styles.sectionTitle}>14:00</Text>
            </View>
          </View>
          <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>Daşınacaq Yükün fotosu</Text></View>
          <View style={styles.imgScroll}>
            <ScrollView horizontal>
              <ZoomImage
                source={{uri: 'https://ooo.0o0.ooo/2017/03/31/58de0e9b287f6.jpg'}}
                imgStyle={{width: 110, height: 110, borderRadius: 15}}
                style={styles.img}
                duration={200}
                enableScaling={false}
                easingFunc={Easing.ease}
              />
              <ZoomImage
                source={{uri: 'https://ooo.0o0.ooo/2017/03/31/58de0e9b287f6.jpg'}}
                imgStyle={{width: 110, height: 110, borderRadius: 15}}
                style={styles.img}
                duration={200}
                enableScaling={false}
                easingFunc={Easing.ease}
              />
              <ZoomImage
                source={{uri: 'https://ooo.0o0.ooo/2017/03/31/58de0e9b287f6.jpg'}}
                imgStyle={{width: 110, height: 110, borderRadius: 15}}
                style={styles.img}
                duration={200}
                enableScaling={false}
                easingFunc={Easing.ease}
              />
              <ZoomImage
                source={{uri: 'https://ooo.0o0.ooo/2017/03/31/58de0e9b287f6.jpg'}}
                imgStyle={{width: 110, height: 110, borderRadius: 15}}
                style={styles.img}
                duration={200}
                enableScaling={false}
                easingFunc={Easing.ease}
              />
            </ScrollView>
          </View>
          <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>Qeydlər</Text></View>
          <View style={styles.orderDescriptionBox}><Text style={styles.orderDescription}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto corporis cupiditate deserunt distinctio ea et explicabo harum id, laborum laudantium natus nostrum qui quo quod unde velit voluptate. Fugiat.</Text></View>
          <View style={styles.sectionLine} />
          <View style={styles.receiverInfoBox}>
            <Text style={styles.adressTitle}>Receiver Name </Text>
            <Text style={styles.receiverFields}>Jon Vik </Text>
            <Text style={styles.adressTitle}>Receiver Phone </Text>
            <Text style={styles.receiverFields}>+994 55 123 45 67 </Text>
          </View>
        </ScrollView>
        {/* <View style={styles.swipeBox}> */}
        {/*  <SwipeButton */}
        {/*    disabled={false} */}
        {/*    title='Accept in 8' */}
        {/*    titleColor='#FFFFFF' */}
        {/*    railBackgroundColor='#7B2BFC' */}
        {/*    railBorderColor='#7B2BFC' */}
        {/*    thumbIconBackgroundColor='#7B2BFC' */}
        {/*    thumbIconBorderColor='#7B2BFC' */}
        {/*    thumbIconComponent={SwipeIcon} */}
        {/*    railFillBackgroundColor='#000' */}
        {/*    railFillBorderColor='#fff' /> */}
        {/* </View> */}
      </View>
    )
  }
}
