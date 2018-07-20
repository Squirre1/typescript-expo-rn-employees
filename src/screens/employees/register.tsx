import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Avatar } from 'react-native-elements'
import Exponent, { Constants, ImagePicker, registerRootComponent, Permissions } from 'expo';

export default class EmployeesRegister extends Component {

  onChange = () => {
    console.log('aaa')
  }

  pickImage = async () => {
    const { status_roll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this.handleImagePicked(pickerResult);
  };

  handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.setState({ image: uploadResult.location });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <Avatar
          large
          rounded
          icon={{name: 'ios-person', type: 'ionicon'}}
          onPress={this.pickImage}
          activeOpacity={0.7}
          containerStyle={{marginLeft: 20, marginTop: 50}}
        />
      

        <FormLabel>First Name</FormLabel>
        <FormInput onChangeText={this.onChange}/>
        <FormLabel>Surname</FormLabel>
        <FormInput onChangeText={this.onChange}/>
        <FormValidationMessage>Error message</FormValidationMessage>
        <FormLabel>Position</FormLabel>
        <FormInput onChangeText={this.onChange}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
