import React from 'react'
import { types, Instance } from 'mobx-state-tree'
import { RecommendStore } from './home'
import { ChapterStore, IntroStore } from './novel'
import { SearchStore } from './search'

export const stores = types
  .model({
    recommendStore: RecommendStore,
    chapterStore: ChapterStore,
    searchStore: SearchStore,
    introStore: IntroStore,
  })
  .create({
    recommendStore: RecommendStore.create(),
    chapterStore: ChapterStore.create(),
    searchStore: SearchStore.create(),
    introStore: IntroStore.create(),
  })

// Create the stores context
export const storesContext = React.createContext<Instance<typeof stores> | null>(null)