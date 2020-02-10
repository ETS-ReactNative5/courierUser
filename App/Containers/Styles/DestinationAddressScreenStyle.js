import {StyleSheet, Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    marginHorizontal: width * 0.06,
    flex: 1
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: height * 0.05

  },
  inputIcon: {
    flex: 1,
    paddingVertical: 5.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputButton: {
    flex: 9,
    justifyContent: 'space-between'
  },
  dash: {
    width: 2,
    height: height * 0.05,
    flexDirection: 'column'
  },
  buttonContainer: {
    paddingVertical: 20
  },
  errorMsg: {
    marginTop: 20,
    fontSize: 20,
    color: 'red',
    alignSelf: 'center'
  }
})
