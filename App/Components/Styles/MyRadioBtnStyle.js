import { Dimensions, StyleSheet } from 'react-native'

const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    flex: 1
  },
  radioButton: {
    backgroundColor: '#f5f5f5',
    height: height * 0.12,
    width: width * 0.42,
    borderRadius: 10,
  },
  radioButtonChecked: {
    backgroundColor: '#f5f5f5',
    height: height * 0.12,
    width: width * 0.42,
    borderWidth: 2,
    borderColor: '#7b2bfc',
    borderRadius: 10,
  },
  radioButtonHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: 22,
  },
})
