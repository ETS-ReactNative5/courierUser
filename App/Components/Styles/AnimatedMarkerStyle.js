import { StyleSheet, Dimensions } from 'react-native'
const {width} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    flex: 1
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(130,4,150, 0.3)'
  },
  ring: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)'
  }
})
