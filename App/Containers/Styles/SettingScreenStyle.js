import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  btnBox: {
    position: 'absolute',
    bottom: height * 0.1,
    width: '100%'
  },
  ccIcon: {
    fontSize: 40,
    marginRight: 10,
    width: width * 0.15,
    color: '#7b2bfc'
  },
  radioBox: {
    marginHorizontal: width * 0.04
  },
  orderImg: {
    width: 55,
    height: 33,
    marginRight: 10
  }
})
