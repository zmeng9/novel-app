import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import {
  Header as HeaderComp,
  SearchBar,
  ISearchBarProps,
} from '../../components'

export interface IHeaderProps extends ISearchBarProps {

}

export const Header: React.FC<IHeaderProps> = observer(({
  ...SearchBarProps
}) => {
  return (
    <HeaderComp isEmpty >
      <SearchBar {...SearchBarProps} />
    </HeaderComp>
  )
})

const styles = StyleSheet.create({
  root: {
  },
})