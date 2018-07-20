import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'

export default class EmployerView extends Component {
  render() {
    const { name, avatar } = this.props.navigation.getParam('employer')

    return (
      <View style={styles.container}>
        <Card title={name} image={{ uri: avatar }}>
          <Text style={{marginBottom: 10}}>
              The idea with React Native Elements is more about component structure than actual design.
          </Text>
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
});
