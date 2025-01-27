import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  profile: {
    flex: 1,
  },
  profileHeader: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  profileHeaderRight: {
    flexDirection: 'row',
    alignItems: 'flex-end',

    height: '45%'
  },
  profileHeaderRightRating: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  profileHeaderBodyText: {
    fontSize: 18,
    color: '#000',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  profileHeaderBodyTextY: {
    fontSize: 17,
    color: '#606060',
    fontWeight: 'bold'
  },
  profileBody: {
    flex: 9,
    backgroundColor: '#fff',
    padding: 30
  },
  profileFooter: {
    flex: 2,
    backgroundColor: '#451E5D'
  },
  exit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  exitText: {
    fontSize: 20,
    color: '#fff',
  },
  newsImage: {
    width: 65,
    height: 65,
    marginHorizontal: 10,
    borderRadius: 32
  },

})
