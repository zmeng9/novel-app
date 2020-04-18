import React from 'react'
import { useLocalStore } from 'mobx-react'
import { RecommendStore, IRecommendStore } from './recommend'
import { ChapterStore, IChapterStore } from './novel'

interface IStoreProviderProps {
  children: React.ReactNode
}

// Defined stores interface
interface IStores {
  recommendStore: IRecommendStore
  chapterStore: IChapterStore
}

// Create the stores context
export const storesContext = React.createContext<IStores | null>(null)

// Create provider
export const StoreProvider = ({ children }: IStoreProviderProps) => {
  const stores = {
    recommendStore: useLocalStore(RecommendStore),
    chapterStore: useLocalStore(ChapterStore),
  }
  return <storesContext.Provider value={stores} >{children}</storesContext.Provider>
}