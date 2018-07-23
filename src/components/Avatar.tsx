import React from 'react'
import { Avatar } from 'react-native-elements'

const CustomAvatar = (props: any) => props.uri ? (
  <Avatar
    xlarge={true}
    rounded={true}
    source={{ uri: props.uri }}
    activeOpacity={0.7}
    {...props}
  />
) : (
  <Avatar
    xlarge={true}
    rounded={true}
    icon={{name: 'ios-person', type: 'ionicon'}}
    activeOpacity={0.7}
    {...props}
  />
)

export default CustomAvatar
