import React, { useCallback } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Card, Icon, Img, Rating, ColorfulText } from '../../../components'
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
    chapters: [{ id: firstChapterId }],
  } = novel

  const username = _.get(novel, `author.username`, `无名氏`)
  const typeName = _.get(novel, `type.name`, `暂无类型`)
  const rating = _.get(novel, `rating.source`, 0)
  const ratingCount = _.get(novel, `rating.count`, 0)


  const handleGoToReader = useCallback(() => {
    return goToReader({
      novelId: id,
      firstChapterId,
    })
  }, [])

  return (
    <Card handle={handleGoToReader}>
      <View style={styles.root}>
        <View style={styles.leftContainer}>
          <Img uri={cover} height={215} width={150} />
          <View style={styles.ratingContainer}>
            <ColorfulText text={rating} fontSize={26} marginRight={10} />
            <Rating starSize={22} rating={rating / 2} />
          </View>
          <ColorfulText
            text={ratingCount ? `${ratingCount}人点评过` : `暂无人点评`}
            fontSize={15}
            fontWeight='300'
            marginBottom={8}
          />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.line}>
            <Icon name='ios-book' size={20} />
            <ColorfulText text={title} fontSize={15} />
          </View>
          <TouchableOpacity style={styles.line}>
            <Icon name='ios-person' size={20} />
            <ColorfulText text={username} fontSize={15} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.line}>
            <Icon name='ios-pricetag' size={20} />
            <ColorfulText text={typeName} fontSize={15} />
          </TouchableOpacity>
          <View style={styles.line}>
            <Icon name='ios-list-box' size={20} />
            <ColorfulText text={`${chaptersNum}章`} fontSize={15} />
          </View>
          <View style={styles.line}>
            <Icon name='ios-hourglass' size={20} />
            <ColorfulText text={`${wordsNum}字`} fontSize={15} />
          </View>
          <View style={styles.line}>
            <Icon name='ios-color-wand' size={20} />
            <ColorfulText text={`${clickNum}次点击`} fontSize={15} />
          </View>
          <View style={styles.line}>
            <Icon name='ios-filing' size={20} />
            <ColorfulText text={`${collectionsNum}人收藏`} fontSize={15} />
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
    paddingTop: 5,
    paddingLeft: 10,
  },
  line: {
    margin: 2,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
  },
})