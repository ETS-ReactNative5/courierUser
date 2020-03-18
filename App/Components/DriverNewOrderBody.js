import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, ScrollView, Easing, Image } from 'react-native'
import styles from './Styles/DriverNewOrderBodyStyle'
import ZoomImage from 'react-native-zoom-image'
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
    return (
      <View style={styles.mainContainer}>
        <ScrollView >
          <View style={styles.profileHeader}>
            <View style={styles.profileHeaderBody}>
              <Text style={styles.profileHeaderBodyText}>{this.props.first_name}</Text>
              <Text style={styles.profileHeaderBodyTextY}>{this.props.last_name}</Text>
            </View>
            <View style={styles.profileHeaderLeft}>
              <Image style={styles.newsImage} source={Images.userDefaultImg} />
            </View>
          </View>
          <View style={styles.cashBox}>
            <View>
              <Text style={styles.sectionTitle}>Ödəniş növü</Text>
              <Text style={styles.cashMetod}>Nəğd</Text>
            </View>
            <View>
              <Text style={styles.cashValue}>{this.props.bill_amount} AZN</Text>
            </View>
          </View>
          <View style={styles.cashBox}>
            <View>
              <Text style={styles.sectionTitle}>Məsafə</Text>
            </View>
            <View>
              <Text style={styles.cashValue}>{this.props.total_distance} KM</Text>
            </View>
          </View>
          {/* <View style={styles.cashBox}> */}
          {/*  <View> */}
          {/*    <Text style={styles.sectionTitle}>Catdirilma</Text> */}
          {/*  </View> */}
          {/*  <View> */}
          {/*    <Text style={styles.sectionTitle}>10/03/2020</Text> */}
          {/*    <Text style={styles.sectionTitle}>14:00</Text> */}
          {/*  </View> */}
          {/* </View> */}
          {this.props.photos.length === 0 ? null : <View>
            <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>Daşınacaq Yükün fotosu</Text></View>
            <View style={styles.imgScroll}>
              <ScrollView horizontal>
                {
                  this.props.photos.map((item, key) =>
                    (
                      <ZoomImage
                        key={key}
                        source={{uri: item.url}}
                        imgStyle={{width: 110, height: 110, borderRadius: 15}}
                        style={styles.img}
                        duration={200}
                        enableScaling={false}
                        easingFunc={Easing.ease}
                      />
                    ))
                }
              </ScrollView>
            </View>
          </View>}
          <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>Qeydlər</Text></View>
          <View style={styles.orderDescriptionBox}><Text style={styles.orderDescription}>{this.props.message}</Text></View>
          <View style={styles.sectionLine} />
          <View style={styles.receiverInfoBox}>
            {this.props.receiverName === '' ? null : <View>
              <Text style={styles.adressTitle}>Çatdırılacaq şəxs:</Text>
              <Text style={styles.receiverFields}>{this.props.receiverName} </Text>
            </View>}
            <Text style={styles.adressTitle}>Çatdırılacaq şəxsin nömrəsi:</Text>
            <Text style={styles.receiverFields}>{this.props.receiverPhone}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
