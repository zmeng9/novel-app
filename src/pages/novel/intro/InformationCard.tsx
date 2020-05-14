import React, { useCallback } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { Card, Icon, Img, Rating } from '../../../components'
import { goToReader } from '../../../utils'
import _ from 'lodash'


export interface IInformationCardProps {
  novel: any
}

export const InformationCard: React.SFC<IInformationCardProps> = observer(({
  novel,
}) => {
  const {
    id = -1,
    cover = ``,
    title = ``,
    chaptersNum = 1,
    wordsNum = 0,
    clickNum = 0,
    collectionsNum = 0,
  } = novel

  const username = _.get(novel, `author.username`, `无名氏`)
  const typeName = _.get(novel, `type.name`, `暂无类型`)
  const rating = _.get(novel, `rating.source`, 0)
  const ratingCount = _.get(novel, `rating.count`, 0)

  const handleGoToReader = useCallback(() => {
    return goToReader(id)
  }, [])

  return (
    <Card handle={handleGoToReader}>
      <View style={styles.root}>
        <View style={styles.leftContainer}>
          <Img uri={cover} height={215} width={150} />
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{rating}</Text>
            <Rating starSize={22} rating={rating / 2} />
          </View>
          <Text style={styles.ratingCount}>{ratingCount ? `${ratingCount}人点评过` : `暂无人点评`}</Text>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.line}>
            <Icon name='ios-book' size={20} />
            <Text style={styles.text}>{title}</Text>
          </View>
          <TouchableOpacity style={styles.line}>
            <Icon name='ios-person' size={20} />
            <Text style={styles.text}>{username}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.line}>
            <Icon name='ios-pricetag' size={20} />
            <Text style={styles.text}>{typeName}</Text>
          </TouchableOpacity>
          <View style={styles.line}>
            <Icon name='ios-list-box' size={20} />
            <Text style={styles.text}>{chaptersNum}章</Text>
          </View>
          <View style={styles.line}>
            <Icon name='ios-hourglass' size={20} />
            <Text style={styles.text}>{wordsNum}字</Text>
          </View>
          <View style={styles.line}>
            <Icon name='ios-color-wand' size={20} />
            <Text style={styles.text}>{clickNum}次点击</Text>
          </View>
          <View style={styles.line}>
            <Icon name='ios-filing' size={20} />
            <Text style={styles.text}>{collectionsNum}人收藏</Text>
          </View>
        </View>
      </View>
    </Card>
  )
})

const styles = StyleSheet.create({
  root: {
    flexDirection: `row`,
    justifyContent: `space-between`,
  },
  topContianer: {
    flexDirection: `row`,
    justifyContent: `space-around`,
  },
  ratingContainer: {
    flexDirection: `row`,
    alignItems: `center`,
    marginVertical: 2,
  },
  ratingCount: {
    fontSize: 15,
    color: `#555`,
    fontWeight: `300`,
    marginBottom: 5,
  },
  leftContainer: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
  },
  rightContainer: {
    flex: 1,
    justifyContent: `flex-start`,
    paddingLeft: 10,
  },
  ratingText: {
    fontSize: 26,
    color: `#333`,
    marginRight: 10,
  },
  line: {
    margin: 5,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
  },
  text: {
    fontSize: 15,
    color: `#555`,
  },
})