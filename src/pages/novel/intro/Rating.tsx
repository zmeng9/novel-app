import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Card, Rating as RnRating, IRatingProps, Title } from '../../../components'


export const Rating: React.SFC<IRatingProps> = observer(({
  ...ratingProps
}) => {
  return (
    <Card>
      <View style={styles.root}>
        <Title fontSize={18} title='评分：' />
        <RnRating {...ratingProps} />
      </View>
    </Card>
  )
})

const styles = StyleSheet.create({
  root: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    paddingRight: 5,
  },
})