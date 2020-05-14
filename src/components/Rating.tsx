import React from 'react'
import { useDarkMode } from 'react-native-dark-mode'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import StarRating from 'react-native-star-rating'

export interface IRatingProps {
  rating: number
  starSize?: number
  handleStarRating?: (rating: number) => void
}

export const Rating: React.SFC<IRatingProps> = observer(({
  rating,
  starSize = 30,
  handleStarRating,
}) => {
  const isDarkMode = useDarkMode()
  return (
    <StarRating
      disabled={typeof handleStarRating === `undefined`}
      starSize={starSize}
      emptyStar='ios-star-outline'
      fullStar='ios-star'
      halfStar='ios-star-half'
      iconSet='Ionicons'
      fullStarColor={isDarkMode ? `#aaa` : `#333`}
      rating={rating}
      selectedStar={handleStarRating}
    />
  )
})

const styles = StyleSheet.create({
  root: {
  },
})