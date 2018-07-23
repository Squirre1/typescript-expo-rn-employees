import React, { Component } from 'react'
import { StyleSheet, View, Text} from 'react-native'
import { Card, Button } from 'react-native-elements'

import Avatar from '../../components/Avatar'

interface IProps {
  navigation: any;
}

export default class EmployerView extends Component<IProps> {
  render() {
    const { name, surname, position, avatar } = this.props.navigation.getParam('employer')

    return (
      <View style={styles.container}>
        <Card title={`${name} ${surname}`}>
          <Avatar uri={avatar} containerStyle={styles.avatarContainer} />
          <Text style={styles.position}>{position}</Text>
          <Button
            title='REMOVE'
            buttonStyle={styles.buttonStyle}
            onPress={this.props.navigation.state.params.removeEmployer}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  position: {
    alignSelf: 'center'
  },
  avatarContainer: {
    marginVertical: 25,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: "rgba(255, 00, 120, 1)",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    marginTop: 50
  },
});
