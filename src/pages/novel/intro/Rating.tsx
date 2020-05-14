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
        <View style={styles.title}>
          <Title fontSize={18} title={ratingProps.rating ? `已评分` : `评分：`} />
        </View>
        <View style={styles.rating}>
          <RnRating {...ratingProps} />
        </View>
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
  title: {
    flex: 1,
  },
  rating: {
    flex: 1,
    paddingLeft: 40,
  },
})