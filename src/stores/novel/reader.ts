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
    isShowSettingBar: false,
    dir: types.optional(types.array(Dir), []),
    fontSize: 17,
    chapterId: -1,
    pages: types.optional(types.array(types.string), []),
  })
  .views(self => ({
    get totalPage() {
      return self.pages.length
    },
  }))
  .actions(self => ({
    ...CommonActions(self),
    
    setIsShowSetting(isShowSetting: boolean) {
      self.isShowSetting = isShowSetting
    },
    setIsShowDir(isShowDir: boolean) {
      self.isShowDir = isShowDir
    },
    setIsShowSettingBar(isShowSettingBar: boolean) {
      self.isShowSettingBar = isShowSettingBar
    },
    setDir(dir: Array<any>) {
      self.dir = cast(dir)
    },
    setFontSize(fontSize: number) {
      self.fontSize = fontSize
    },
    setChapterId(chapterId: number) {
      self.chapterId = chapterId
    },
    setPages(pages: Array<string>) {
      self.pages = cast(pages)
    },
  }))