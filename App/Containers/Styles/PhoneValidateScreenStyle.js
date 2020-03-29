import {StyleSheet, Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.06,
  },
  errorMsg: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center'
  },
  loginBox: {
    backgroundColor: '#fff',
    padding: width * 0.05,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14
  },
  loginTitle: {
    color: '#031424',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  loginText: {
    color: '#79828d',
    textAlign: 'center',
    fontSize: 16,
    paddingTop: width * 0.06,
    paddingHorizontal: width * 0.03
  },
  loginInput: {
    fontSize: width * 0.037,
    width: '100%',
    backgroundColor: '#f4f6f8',
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.04,
    borderRadius: 30
  },
  loginBtnBox: {
    justifyContent: 'center',
    height: 80
  },
  loginCodeBox: {
    height: 80
  },
  loadingSmsBox: {
    height: 40
  },
  loginCodeInput: {
    backgroundColor: '#f4f6f8',
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold'
  },
  newCodeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#031424',
  }
})
