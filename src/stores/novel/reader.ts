import { types, cast } from 'mobx-state-tree'
import { CommonState, CommonActions } from '../common'

const Dir = types.model({
  id: types.identifierNumber,
  chapterTitle: '',
})

export const ReaderStore = types
  .model({
    ...CommonState,

    isShowSetting: false,
    isShowDir: false,
    dir: types.optional(types.array(Dir), []),
    fontSize: 24,
    page: 1,
    chapterId: -1,
    lines: types.optional(types.array(types.string), []),
    chunks: types.optional(types.array(types.string), []),
  })
  .actions(self => ({
    ...CommonActions(self),
    
    setIsShowSetting(isShowSetting: boolean) {
      self.isShowSetting = isShowSetting
    },
    setIsShowDir(isShowDir: boolean) {
      self.isShowDir = isShowDir
    },
    setDir(dir: Array<any>) {
      self.dir = cast(dir)
    },
    setChapterId(chapterId: number) {
      self.chapterId = chapterId
    },
    setLines(lines: Array<string>) {
      self.lines = cast(lines)
    },
    setChunks(chunks: Array<string>) {
      self.chunks = cast(chunks)
    },
  }))