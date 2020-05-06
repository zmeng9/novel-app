import React, { useRef, useEffect } from 'react'
import { StyleSheet, Animated } from 'react-native'
import { observer } from 'mobx-react-lite'

/* 
 * Fade
 */

interface ICommon {
  children: React.ReactNode
}

export interface IFadeProps extends ICommon {
  isFade: boolean | null
}

export interface ISildeProps extends ICommon {
  direction?: `top` | `bottom` | `left` | `right`
  distance: number
  isSilde: boolean | null
}

export const Fade: React.SFC<IFadeProps> = observer(({
  children,
  isFade,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start()
  }

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    if (isFade === null)
      return
    else if (isFade)
      fadeIn()
    else
      fadeOut()
  }, [isFade])

  return (
    <Animated.View
      style={[
        styles.root,
        {
          opacity: fadeAnim // Bind opacity to animated value
        }
      ]}
    >
      {children}
    </Animated.View>
  )
})

/* 
 * Silde
*/

export const Silde: React.SFC<ISildeProps> = observer(({
  children,
  isSilde,
  direction = `top`,
  distance = 0,
}) => {
  

  const sildeAnim = useRef(new Animated.Value(-distance)).current

  const sildeIn = () => {
    Animated.timing(sildeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  const sildeOut = () => {
    Animated.timing(sildeAnim, {
      toValue: -distance,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  useEffect(() => {
    if (isSilde === null)
      return
    else if (isSilde)
      sildeIn()
    else
      sildeOut()
  }, [isSilde])

  return (
    <Animated.View style={{
      position: `absolute`,
      [direction]: sildeAnim,
    }}>
      {children}
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})