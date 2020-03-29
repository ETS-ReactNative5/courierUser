import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: width * 0.03,
    marginVertical: height * 0.03,
    justifyContent: 'space-between'
  },
  inputContainer: {
    paddingBottom: width * 0.03,
  },
  buttonContainer: {
    backgroundColor: '#000',
    height: height * 0.3,
    justifyContent: 'center',
    flex: 1
  }

})
