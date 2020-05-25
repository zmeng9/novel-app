import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import StarRating from 'react-native-star-rating'
import { useTheme } from '@/hooks'

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
  const { btn } = useTheme()
  return (
    <StarRating
      disabled={typeof handleStarRating === `undefined`}
      starSize={starSize}
      emptyStar='ios-star-outline'
      fullStar='ios-star'
      halfStar='ios-star-half'
      iconSet='Ionicons'
      fullStarColor={btn.text.secondary}
      rating={rating}
      selectedStar={handleStarRating}
    />
  )
})

const styles = StyleSheet.create({
  root: {
  },
})