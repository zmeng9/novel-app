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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

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
    <Card handle={handleGoToReader}>
      <View style={styles.root}>
        <View style={styles.leftContainer}>
          <Img uri={cover} height={200} width={150} />
          <Btn text='点击阅读' handle={handleGoToReader} />
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
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.line}>
            <Icon name='ios-hourglass' size={20} />
            <Text style={styles.text}>{wordsNum}字</Text>
          </TouchableOpacity>
          <View style={styles.line}>
            <Icon name='ios-color-wand' size={20} />
            <Text style={styles.text}>{clickNum}次点击</Text>
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
    marginLeft: 40,
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