import { Dimensions, PixelRatio, StyleSheet } from 'react-native'
import {ApplicationStyles} from '../../Themes/'

const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  map: {
    flex: 1,
    width,
    height
  },
  orderContainer: {
    paddingHorizontal: width * 0.06,
    bottom: 0,
    position: 'absolute',
    paddingBottom: height * 0.04,
    backgroundColor: '#fff'
  },
  addressContainer: {
    flexDirection: 'row',
    marginTop: height * 0.03

  },
  inputIcon: {
    flex: 1,
    paddingVertical: 5.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputButton: {
    flex: 9,
    justifyContent: 'space-between',
    marginVertical: height * 0.02
  },
  dash: {
    width: 2,
    height: height * 0.04,
    flexDirection: 'column'
  },
  line: {
    borderBottomColor: '#353535',
    borderBottomWidth: 1,
    marginVertical: 10
  },
  carType: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  carTypeItem: {
    backgroundColor: '#451E5D',
    height: height * 0.09,
    width: height * 0.09,
    borderRadius: 7,
    justifyContent: 'center'
  },
  icon: {
    width: width * 0.16 - width * 0.03,
    alignSelf: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  gumburger: {
    padding: 10,
    position: 'absolute',
    top: 20,
    left: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100
  },
  avatar: {
    borderRadius: 10,
    width: 100,
    height: 100
  },
  inputBox: {
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10
  },
})
