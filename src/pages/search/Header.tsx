import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import {
  Header as RnHeader,
  SearchBar,
  ISearchBarProps,
} from '@/components'

export interface IHeaderProps extends ISearchBarProps {

}

export const Header: React.FC<IHeaderProps> = observer(({
  ...SearchBarProps
}) => {
  return (
    <RnHeader isEmpty >
      <SearchBar {...SearchBarProps} />
    </RnHeader>
  )
})

const styles = StyleSheet.create({
  root: {
  },
})