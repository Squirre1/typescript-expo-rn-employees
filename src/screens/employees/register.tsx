import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { observer } from 'mobx-react/native'

import Avatar from '../../components/Avatar'

const { ImagePicker, Permissions } = require('expo')

const defaultState = {
  name: '',
  surname: '',
  position: '',
  avatar: {}
}

interface IProps {
  store: any;
  navigation: any;
}

interface IState {
  name: string,
  surname: string,
  position: string,
  avatar: any
}

@observer
export default class EmployeesRegister extends Component<IProps, IState> {

  constructor(props: any){
      super(props);
      this.state = defaultState;
  }

  onChange = (key: string) => (value: string | boolean | object) => (
    this.setState({ [key]: value } as Pick<IState, keyof IState>)
  )

  pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!pickerResult.cancelled) {
      this.onChange('avatar')(pickerResult)
    }
  };

  register = async () => {
    await this.props.store.addEmployer(this.state)

    this.setState(defaultState, () => {
      this.props.navigation.navigate('EmployeesList');
    })
  }

  render() {
    const { store: { loading, error } } = this.props
    const { name, surname, position, avatar } = this.state

    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <View style={styles.container}>

        <Avatar
          uri={avatar.uri}
          onPress={this.pickImage}
          containerStyle={styles.avatarContainer}
        />

        <FormLabel>Name</FormLabel>
        <FormInput value={name} onChangeText={this.onChange('name')}/>

        <FormLabel>Surname</FormLabel>
        <FormInput value={surname} onChangeText={this.onChange('surname')}/>

        <FormLabel>Position</FormLabel>
        <FormInput value={position} onChangeText={this.onChange('position')}/>

        <Button
          title='REGISTER'
          onPress={this.register}
          buttonStyle={styles.buttonStyle}
        />

        {error && (
          <FormValidationMessage containerStyle={styles.error}>
            {error}
          </FormValidationMessage>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarContainer: {
    marginTop: 50,
    marginBottom: 25,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    marginTop: 50
  },
  error: {
    alignSelf: 'center'
  }
});
