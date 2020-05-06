import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { Header as RnHeader } from '../../../components'

export interface IHeaderProps {

}

export const Header: React.SFC<IHeaderProps> = observer(({

}) => {
  return (
    <RnHeader></RnHeader>
  )
})

const styles = StyleSheet.create({
  root: {
  },
})