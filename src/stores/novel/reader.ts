import { types, cast } from 'mobx-state-tree'
import { CommonState, CommonActions } from '../common'

const Dir = types.model({
  id: types.identifierNumber,
  chapterTitle: '',
})

export const ReaderStore = types
  .model({
    ...CommonState(),

    isShowSetting: false,
    isShowDir: false,
    isShowSettingBar: false,
    dir: types.optional(types.array(Dir), []),
    fontSize: 18,
    chapterId: -1,
    currentPageNum: 1,
    contentOfPage: types.optional(types.array(types.string), []),
  })
  .views(self => ({
    get totalPageNum() {
      return self.contentOfPage.length
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
    setCurrentPageNum(currentPageNum: number) {
      self.currentPageNum = currentPageNum
    },
    setContentOfPage(contentOfPage: Array<string>) {
      self.contentOfPage = cast(contentOfPage)
    },
  }))