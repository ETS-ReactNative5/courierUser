import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
const {width,height} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  imgBox: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 160,
    width: 160
  },
  textBox: {
    flex: 4,
    alignItems: 'center',
    paddingHorizontal: width * 0.05
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#000'
  },
  textKod: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
    paddingVertical: 20
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
    paddingVertical: 30,
    paddingHorizontal: width * 0.15
  }
})
