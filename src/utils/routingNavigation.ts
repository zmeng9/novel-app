import { createRef } from 'react'


/* 
 * Created the global navigation
*/

export const isMountedRef: any = createRef()
export const navigationRef: any = createRef()

export const navigation = {
  navigate(name: string, params?: any) {
    if (isMountedRef.current && navigationRef.current)
      navigationRef.current.navigate(name, params)
  },
  goBack() {
    if (isMountedRef.current && navigationRef.current)
      navigationRef.current.goBack()
  },
  setParams(obj: Object) {
    navigationRef.current.setParams(obj)
  },
}

export const goBack = () => {
  navigation.goBack()
}

export const goToPlaza = () => {
  navigation.navigate(`Plaza`)
}

export const goToSearch = () => {
  navigation.navigate(`Search`)
}

export const goToIntro = (id: number) => {
  navigation.navigate(`Intro`, { id })
}

export const goToReader = ({
  novelId, 
  firstChapterId,
}: {
  novelId: number
  firstChapterId: number
}) => {
  navigation.navigate(`Reader`, { novelId, firstChapterId })
}

export const goToLogin = () => {
  navigation.navigate(`Login`)
}

export const goToReg = () => {
  navigation.navigate(`Reg`)
}

export const goToSetting = () => {
  navigation.navigate(`Setting`)
}

export const goToUserInfo = () => {
  navigation.navigate(`UserInfo`)
}