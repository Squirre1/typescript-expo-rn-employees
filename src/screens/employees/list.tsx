import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { List, ListItem } from 'react-native-elements'

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]

export default class EmployeesList extends Component {

  goToEmployerView = (employer: any) => () => {
    this.props.navigation.navigate('EmployerView', { employer })
  }

  render() {

    return (
      <View style={styles.container}>
        <List containerStyle={{marginBottom: 20}}>
          {
            list.map((employer, i) => (
              <ListItem
                key={i}
                roundAvatar
                title={employer.name}
                subtitle={employer.subtitle}
                avatar={{ uri: employer.avatar_url }}
                onPress={this.goToEmployerView(employer)}
              />
            ))
          }
        </List>
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
