import {StyleSheet, Dimensions} from 'react-native'

const {width} = Dimensions.get('window')
export default StyleSheet.create({
  // container: {
  //   backgroundColor: '#F5FCFF',
  //   flex: 1,
  //   paddingTop: 100
  // },
  // forgotPasswordText: {
  //   color: '#BCBEC0',
  //   fontSize: width * 0.027,
  //   marginTop: width * 0.027,
  //   alignSelf: 'center'
  // },
  container: {
    marginHorizontal: width * 0.06,
    marginVertical: width * 0.125,
    flex: 1,
    justifyContent: 'space-between'
  },
  forgotPasswordText: {
    color: '#BCBEC0',
    fontSize: width * 0.027,
    marginTop: width * 0.027,
    alignSelf: 'center'
  },
  headBackground: {
    backgroundColor: '#7B2BFC',
    position: 'absolute',
    top: 0,
    left: 0,
    height: 350,
    width: '100%',
    borderBottomRightRadius: 300
  },
  logo: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#f2f2f2'
  },
  logoDescription: {
    textAlign: 'center',
    color: '#f2f2f2'
  },
  loginArea: {
    marginHorizontal: 40,
    marginVertical: 60,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 7,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowRadius: 3,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  loginAreaTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10
  },
  loginAreaDescription: {
    marginBottom: 20,
    fontSize: 12,
    color: '#720D5D',
    textAlign: 'center'
  },
  inputBox: {
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#f1f1f1',
    color: '#999',
    fontWeight: '600',
    borderRadius: 7
  },
})
