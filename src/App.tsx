import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

import EmployerView from './screens/employees/view'
import EmployeesList from './screens/employees/list'
import EmployeesRegister from './screens/employees/register'

import EmployeesStore from './mobx/employees'

const EmployeeStack = createStackNavigator({
  EmployeesList: {
    screen: (props: any) => <EmployeesList {...props} store={EmployeesStore} />,
    navigationOptions: { header: null }
  },
  EmployerView
});

const App = createBottomTabNavigator(
  {
    EmployeesList: { screen: EmployeeStack, navigationOptions: { title: 'EMPLOYEES' } },
    EmployeesRegister: {
      screen: (props: any) => <EmployeesRegister {...props} store={EmployeesStore} />,
      navigationOptions: { title: 'REGISTER' }
    }
  },
  {
    navigationOptions: ({ navigation }) => {

      const tabBarVisible = navigation.state.index > 0 ? false : true
      const tabBarIcon = ({ focused, tintColor }: { focused: boolean, tintColor: any }) => {
        const { routeName } = navigation.state

        let iconName = ''
        if (routeName === 'EmployeesList') {
          iconName = `ios-list${focused ? '' : '-outline'}`
        } else if (routeName === 'EmployeesRegister') {
          iconName = `ios-person-add${focused ? '' : '-outline'}`
        }

        return (
          <Ionicons size={35} name={iconName} color={tintColor} />
        )
      }
      
      return ({
        tabBarIcon,
        tabBarVisible
      })
    },
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  }
)

export default App
