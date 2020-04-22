import React from 'react'
import { types, Instance } from 'mobx-state-tree'
import { RecommendStore } from './recommend'
import { ChapterStore } from './novel'

export const stores = types
  .model({
    recommendStore: RecommendStore,
    chapterStore: ChapterStore,
  })
  .create({
    recommendStore: RecommendStore.create(),
    chapterStore: ChapterStore.create(),
  })

// Create the stores context
export const storesContext = React.createContext<Instance<typeof stores> | null>(null)