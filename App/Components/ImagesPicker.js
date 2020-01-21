import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/ImagesPickerStyle'
import ImagePicker from 'react-native-image-picker'
export default class ImagesPicker extends Component {
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
  state = {
    avatarSource: null,
    avatarSource2: null,
    avatarSource3: null
  };

  constructor (props) {
    super(props)

    this.selectPhotoTapped = this.selectPhotoTapped.bind(this)
    this.selectPhotoTapped2 = this.selectPhotoTapped2.bind(this)
    this.selectPhotoTapped3 = this.selectPhotoTapped3.bind(this)
  }

  selectPhotoTapped () {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        let source = {uri: response.uri}

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        })
      }
    })
  }
  selectPhotoTapped2 () {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        let source = {uri: response.uri}

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource2: source
        })
      }
    })
  }
  selectPhotoTapped3 () {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        let source = {uri: response.uri}

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource3: source
        })
      }
    })
  }
  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View
            style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
            {this.state.avatarSource === null ? (
              <Text>Select a Photo</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource} />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectPhotoTapped2.bind(this)}>
          <View
            style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
            {this.state.avatarSource2 === null ? (
              <Text>Select a Photo</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource2} />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectPhotoTapped3.bind(this)}>
          <View
            style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
            {this.state.avatarSource3 === null ? (
              <Text>Select a Photo</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource3} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
