import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react'
import { Header as HeaderComp, SearchBar } from '../../components'

export interface IHeaderProps {

}

export const Header: React.SFC<IHeaderProps> = observer(({

}) => {
  return (
    <HeaderComp isEmpty={true}>
      <SearchBar />
    </HeaderComp>
  )
})

const styles = StyleSheet.create({
  root: {
  },
})