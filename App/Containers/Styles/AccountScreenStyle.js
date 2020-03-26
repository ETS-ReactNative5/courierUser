import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: width * 0.03,
    marginVertical: height * 0.03
  },
  inputContainer: {
    flex: 3
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#000',
  }

})
