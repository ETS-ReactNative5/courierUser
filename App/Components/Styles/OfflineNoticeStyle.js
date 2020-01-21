import { Dimensions, StyleSheet } from 'react-native'

let {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    height,
    width,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center'
  },
  topBox: {
    backgroundColor: '#7B2BFC',
    paddingVertical: 5,
    width
  },
  topBoxText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18
  },
  mainText: {
    position: 'absolute',
    bottom: height * 0.3,
    color: '#000',
    fontSize: 30
  },
  hintText: {
    position: 'absolute',
    bottom: height * 0.23,
    color: '#000',
    fontSize: 20
  },
  buttonBox: {
    position: 'absolute',
    bottom: height * 0.1,
    width,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  }
})
