import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, Alert, Platform } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import styles from './Styles/OfflineNoticeStyle'

export default class OfflineNotice extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  constructor (props) {
    super(props)

    this.state = {
      isConnected: true,
      lastRefresh: Date(Date.now()).toString(),
    }

    this.refreshScreen = this.refreshScreen.bind(this)
  }
  //   someSetting: false
  refreshScreen() {
    this.setState({ lastRefresh: Date(Date.now()).toString() })
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };
  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          Alert.alert("You are online!");
        } else {
          Alert.alert("You are offline!");
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        this.handleConnectivityChange
      );
    }
  };

  render () {
    if (!this.state.isConnected) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topBox}>
            <Text style={styles.topBoxText}>No Internet Connection</Text>
          </View>
          <Text style={styles.mainText}>No Connection</Text>
          <Text style={styles.hintText}>Connect to WiFi or mobile data </Text>
        </SafeAreaView>
      )
    }
    return null
  }
}
