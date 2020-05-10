import AsyncStorage from '@react-native-community/async-storage'
import { splitByComma, joinByComma, unique } from './helper'

const tokenKeyName = `authToken`
const searchHistoryKeyName = `searchHistory`
const localBookrackKeyName = `localBookrack`
const searchHistoryLimit = 8

/* 
 * Auth token
 */

export const loadAuthToken = async () => {
  return await AsyncStorage.getItem(tokenKeyName)
}

export const saveAuthToken = async (token: string) => {
  if (!token && token.trim() === ``)
    return

  await AsyncStorage.setItem(tokenKeyName, token)
}

export const removeAuthToken = async () => {
  await AsyncStorage.removeItem(tokenKeyName)
}

/* 
 * Search history
 */

export const loadSearchHistory = async () => {
  const searchHistory = await AsyncStorage.getItem(searchHistoryKeyName)

  if (searchHistory) {
    const eightSearchHistorys = splitByComma(searchHistory).slice(0, searchHistoryLimit)
    return unique(eightSearchHistorys)
  }

  return null
}

export const saveSearchHistory = async (searchHistory: string) => {
  if (!searchHistory && searchHistory.trim() === ``)
    return

  const currentSearchHisyory = await AsyncStorage.getItem(searchHistoryKeyName)
  const newSearchHistory = currentSearchHisyory
    ? joinByComma(searchHistory, currentSearchHisyory)
    : searchHistory

  await AsyncStorage.setItem(searchHistoryKeyName, newSearchHistory)
}

export const removeSearchHistory = async () => {
  await AsyncStorage.removeItem(searchHistoryKeyName)
}


/* 
 * Local bookrack
 */

export const loadLocalBookrack = async () => {
  const localBookrack = await AsyncStorage.getItem(localBookrackKeyName)

  if (localBookrack) {
    const splitedLocalBookrack = splitByComma(localBookrack)
    return unique(splitedLocalBookrack)
  }

  return null
}

export const saveLocalBookrack = async (localBookrack: string) => {
  if (!localBookrack && localBookrack.trim() === ``)
    return

  const currentLocalBookrack = await AsyncStorage.getItem(localBookrackKeyName)
  const newLocalBookrack = currentLocalBookrack
    ? joinByComma(localBookrack, currentLocalBookrack)
    : localBookrack

  await AsyncStorage.setItem(localBookrackKeyName, newLocalBookrack)
}

export const removeLocalBookrack = async () => {
  await AsyncStorage.removeItem(localBookrackKeyName)
}

