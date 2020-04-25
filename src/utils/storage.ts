import AsyncStorage from '@react-native-community/async-storage'
import { splitByComma, joinByComma, unique } from './helper'

const tokenKeyName = `authToken`
const searchHistoryKeyName = `searchHistory`
const searchHistoryLimit = 8

/* 
 * Auth token
 */

export const loadToken = async () => {
  return await AsyncStorage.getItem(tokenKeyName)
}

export const saveToken = async (token: string) => {
  if (!token && token.trim() === ``)
    return

  await AsyncStorage.setItem(tokenKeyName, token)
}

export const removeToken = async () => {
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

