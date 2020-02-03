import { Dimensions, StyleSheet } from 'react-native'
let {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    height: height - 200,
    paddingVertical: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  adressContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
    paddingTop: 15,
    paddingBottom: 10,
    width
    // backgroundColor: 'red'
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
  fieldBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    padding: 15
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  fieldText: {
    fontSize: 17
  }

})
