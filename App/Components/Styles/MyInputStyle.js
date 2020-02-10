import {StyleSheet, Dimensions} from 'react-native'

const {width} = Dimensions.get('window')
export default StyleSheet.create({
  container: {},
  text: {
    fontSize: width * 0.03,
    color: '#606060',
    marginBottom: width * 0.04,
    fontWeight: 'bold'
  },
  input: {
    fontSize: width * 0.037,
    borderBottomWidth: 1,
    borderColor: '#353535',
    width: '100%',
    marginBottom: width * 0.1
  }
})
