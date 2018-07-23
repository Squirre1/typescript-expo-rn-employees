import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { List, ListItem, Avatar } from 'react-native-elements'
import { observer } from 'mobx-react/native'

import { Employer } from '../../types/Employer'

interface IProps {
  store: any;
  navigation: any;
}

@observer
export default class EmployeesList extends Component<IProps> {

  removeEmployer = (employerId: string) => async () => {
    await this.props.store.removeEmployer(employerId)
    this.props.navigation.navigate('EmployeesList');
  }

  goToEmployerView = (employer: any) => () => {
    this.props.navigation.navigate(
      'EmployerView',
      { employer, removeEmployer: this.removeEmployer(employer.id) }
    )
  }

  render() {
    const { employees } = this.props.store

    return (
      <View style={styles.container}>
        <List containerStyle={{marginBottom: 20}}>
          {
            employees.map((employer: Employer, i: number) => (
              <ListItem
                key={i}
                roundAvatar={true}
                title={`${employer.name} ${employer.surname}`}
                subtitle={employer.position}
                avatar={(
                  <Avatar
                    rounded={true}
                    title={`${employer.name[0]}${employer.surname[0]}`.toUpperCase()}
                    source={employer.avatar ? {uri: employer.avatar} : undefined}
                  />
                )}
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
