import React, { useCallback } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react'
import { Card, Icon, Img, Btn } from '../../../components'
import { goToReader } from '../../../utils'

export interface IInformationCardProps {
  novel: any
}

export const InformationCard: React.SFC<IInformationCardProps> = observer(({
  novel,
}) => {
  const {
    id = -1,
    cover = '',
    title = '',
    author: { username = '' },
    type: { name = '' },
    wordsNum,
    clickNum = 0,
  } = novel

  const handleGoToReader = useCallback(() => {
    return goToReader(id)
  }, [])

  return (
    <Card>
      <View style={styles.root}>
        <TouchableOpacity style={styles.leftContainer} onPress={handleGoToReader}>
          <Img uri={cover} height={200} width={150} />
          <View>
            <Btn text='点击阅读' />
          </View>
        </TouchableOpacity>
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
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.line}>
            <Icon name='ios-hourglass' size={20} />
            <Text style={styles.text}>{wordsNum}</Text>
          </TouchableOpacity>
          <View style={styles.line}>
            <Icon name='ios-color-wand' size={20} />
            <Text style={styles.text}>{clickNum}</Text>
          </View>
        </View>
      </View>
    </Card>
  )
})

const styles = StyleSheet.create({
  root: {
    padding: 5,
    flexDirection: `row`,
    justifyContent: `space-between`,
  },
  leftContainer: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
  },
  rightContainer: {
    flex: 1,
    marginLeft: 10,
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