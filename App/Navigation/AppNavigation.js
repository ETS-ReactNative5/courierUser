import {createStackNavigator, createAppContainer} from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import DestinationAddressScreen from '../Containers/DestinationAddressScreen'
import PlaceScreen from '../Containers/PlaceScreen'
import RouteScreen from '../Containers/RouteScreen'
import MapScreen from '../Containers/MapScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import OrderScreen from '../Containers/OrderScreen'
import TestScreen from '../Containers/TestScreen'
import FirstScreen from '../Containers/FirstScreen'
import UserOrderScreen from '../Containers/UserOrderScreen'
import MenuScreen from '../Containers/MenuScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import PaymentMethodScreen from '../Containers/PaymentMethodScreen'
import AddCrediCardScreen from '../Containers/AddCrediCardScreen'
import OrderHistoryScreen from '../Containers/OrderHistoryScreen'
import PromoKodScreen from '../Containers/PromoKodScreen'
import NewsScreen from '../Containers/NewsScreen'
import SupportScreen from '../Containers/SupportScreen'
import SharePromoScreen from '../Containers/SharePromoScreen'
import AccountScreen from '../Containers/AccountScreen'
import SettingScreen from '../Containers/SettingScreen'
import DriverNewOrderScreen from '../Containers/DriverNewOrderScreen'
import OfflineNoticeScreen from '../Containers/OfflineNoticeScreen'
import PhoneValidateInputScreen from '../Containers/PhoneValidateInputScreen'
import PhoneValidateScreen from '../Containers/PhoneValidateScreen'
import CourierSeachScreen from '../Containers/CourierSeachScreen'
import CourierFoundScreen from '../Containers/CourierFoundScreen'
import OrderHistoryInnerScreen from '../Containers/OrderHistoryInnerScreen'
import AppIntroSliderScreen from '../Containers/AppIntroSliderScreen'
import I18n from '../I18n'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  AppIntroSliderScreen: {
    screen: AppIntroSliderScreen,
    navigationOptions: {
      header: null
    }
  },
  OrderHistoryInnerScreen: {
    screen: OrderHistoryInnerScreen,
    navigationOptions: {
      // title: I18n.t('AppIntroSliderScreen'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  CourierFoundScreen: {
    screen: CourierFoundScreen,
    navigationOptions: {
      header: null
    }
  },
  CourierSeachScreen: {
    screen: CourierSeachScreen,
    navigationOptions: {
      header: null
    }
  },
  PhoneValidateScreen: {
    screen: PhoneValidateScreen,
    navigationOptions: {
      header: null
    }
  },
  PhoneValidateInputScreen: {
    screen: PhoneValidateInputScreen,
    navigationOptions: {
      header: null
    }
  },
  OfflineNoticeScreen: {
    screen: OfflineNoticeScreen,
    navigationOptions: {
      header: null
    }
  },
  DriverNewOrderScreen: {
    screen: DriverNewOrderScreen,
    navigationOptions: {
      header: null
    }
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      title: I18n.t('Parametrlər'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  AccountScreen: {
    screen: AccountScreen,
    navigationOptions: {
      title: I18n.t('Profilim'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  SharePromoScreen: {
    screen: SharePromoScreen,
    navigationOptions: {
      // title: I18n.t('Share Promo kod'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  SupportScreen: {
    screen: SupportScreen,
    navigationOptions: {
      title: I18n.t('Support/FAQ'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  NewsScreen: {
    screen: NewsScreen,
    navigationOptions: {
      title: I18n.t('Bildirişlər'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  PromoKodScreen: {
    screen: PromoKodScreen,
    navigationOptions: {
      title: I18n.t('PromoKod'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  OrderHistoryScreen: {
    screen: OrderHistoryScreen,
    navigationOptions: {
      title: I18n.t('Sifarişlər'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  AddCrediCardScreen: {
    screen: AddCrediCardScreen,
    navigationOptions: {
      title: I18n.t('Kart əlavə et'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  PaymentMethodScreen: {
    screen: PaymentMethodScreen,
    navigationOptions: {
      title: I18n.t('Ödəniş növləri'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      title: I18n.t('Order'),
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#451E5D'
      }
    }
  },
  MenuScreen: {
    screen: MenuScreen,
    navigationOptions: {
      header: null
    }
  },
  UserOrderScreen: {
    screen: UserOrderScreen,
    navigationOptions: {
      header: null
    }
  },
  TestScreen: {
    screen: TestScreen,
    navigationOptions: {
      header: null
    }
  },
  FirstScreen: {
    screen: FirstScreen,
    navigationOptions: {
      header: null
    }
  },
  OrderScreen: {
    screen: OrderScreen,
    navigationOptions: {
      header: null
    }
  },
  RouteScreen: {
    // eslint-disable-next-line no-undef
    screen: RouteScreen,
    navigationOptions: {
      header: null
    }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      // title: I18n.t('register'),
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#451E5D'
      }
    }
  },
  DestinationAddressScreen: {
    screen: DestinationAddressScreen,
    navigationOptions: {
      // title: I18n.t('gedilecekUnvan'),
      headerTintColor: '#000',
      headerStyle: {
        backgroundColor: '#fff'
      }
    }
  },
  PlaceScreen: {screen: PlaceScreen},
  MapScreen: {screen: MapScreen, navigationOptions: {header: null}},
  LaunchScreen: {screen: LaunchScreen}
}, {
  // Default config for all screens
  // headerMode: 'none',
  initialRouteName: 'AppIntroSliderScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})
export default createAppContainer(PrimaryNav)
