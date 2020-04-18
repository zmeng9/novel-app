/* 
 * Set navigation
*/

let navigation: any

export const setNavigation = (navigationRef: any) => {
  navigation = navigationRef
}

export const goBack = () => {
  navigation.goBack()
}

export const goToPlaza = () => {
  navigation.navigate('Plaza')
}

export const goToIntro = (id: number) => {
  navigation.navigate('Intro', { id })
}

export const goToChapter = (id: number) => {
  navigation.navigate('Chapter', { id })
}