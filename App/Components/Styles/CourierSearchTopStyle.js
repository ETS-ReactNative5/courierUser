import { Dimensions, StyleSheet } from 'react-native'
let {width} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width
  },
  cancelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    paddingTop: 15,
    paddingBottom: 10,
    width,
  },
  dashBox: {
    alignItems: 'center',
    marginRight: 10
  },
  adressBox: {
    width: width * 0.85,
    paddingHorizontal: 10
  },
  adressTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  adressText: {
    fontSize: 12,
    color: '#A9A9A9',
    marginTop: 8,
    marginBottom: 15
  },
  actionBox: {
    paddingHorizontal: 35,
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  receiverFields: {
    paddingVertical: 10
  },
  minusBox: {
    paddingBottom: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
  },
  minusIcon: {
    marginTop: -15
  },
  minusText: {
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: 'bold'
  },
  cancel: {
    marginBottom: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
})
