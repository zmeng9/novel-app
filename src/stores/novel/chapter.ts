import { types, cast } from 'mobx-state-tree'
import { CommonState, CommonActions } from '../common'

const Dir = types.model({
  id: types.identifierNumber,
  chapterTitle: '',
})

export const ChapterStore = types
  .model({
    ...CommonState,

    isShowSetting: false,
    isShowDir: false,
    dir: types.optional(types.array(Dir), []),
    fontSize: 16,
    page: 1,
    chapterId: types.optional(types.identifierNumber, -1),
    lines: types.optional(types.array(types.string), []),
  })
  .actions(self => ({
    ...CommonActions,
    
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
  }))