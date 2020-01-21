import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles, Colors} from '../../Themes/'

const {width} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  orderText: {
    color: '#606060',
    fontSize: 19
  },
  orderContainer: {
    // height: 120,
    borderBottomWidth: 1,
    borderBottomColor: Colors.orderLine,
    paddingBottom: 20,
    marginHorizontal: width * 0.03,
    marginBottom: 10
  },
  orderBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  orderAdressBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20
  },
  orderImg: {
    width: 60,
    height: 45,
    marginRight: 10
  },
  orderImgMarker: {
    marginRight: 10,
    width: 14,
    height: 19
  },
  orderImgEllips: {
    marginRight: 10,
    width: 14,
    height: 14
  },
  orderAdress: {
    fontSize: 15,
    marginLeft: 10
  },
  orderDash: {
    height: 15,
    paddingLeft: 30,
    flexDirection: 'column'
  },
  orderPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 25
  },
  orderPriceBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 60
  },
  container: {

    flex: 1

  }
})
