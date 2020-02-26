import { Dimensions, StyleSheet } from 'react-native'

const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    height: height * 0.12,
    width: width * 0.26,
    borderRadius: 10,
  },
  radioButtonChecked: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    height: height * 0.12,
    width: width * 0.26,
    borderWidth: 2,
    borderColor: '#7b2bfc',
    borderRadius: 10,
  },
  radioButtonHolder: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20

  },
  radioImage: {
    width: 90,
    height: 70,
    position: 'absolute',
    bottom: 2,
  },
  label: {
    position: 'absolute',
    bottom: 15,
    fontSize: 15,
  },
})
