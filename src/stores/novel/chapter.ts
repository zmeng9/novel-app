import { CommonState, CommonStore, resetObj } from '../common'

/* 
 * 1. Defined the state interface
 * 2. Defined the state and load the common store
 * 3. Defined the methods of store
 * 4. Export the type of Store
 */

export interface IChapterState {
  isShowSetting: boolean
  isShowDir: boolean
  dir: Array<any>
  fontSize: number
  page: number
  chapterId: number
  lines: Array<string>
}

const ChapterState: IChapterState = {
  isShowSetting: false,
  isShowDir: false,
  dir: [],
  fontSize: 16,
  page: 1,
  chapterId: -1,
  lines: [],
}

export let ChapterStore = () => ({
  ...ChapterState,
  ...CommonStore,

  setIsShowSetting(isShowSetting: boolean) {
    this.isShowSetting = isShowSetting
  },
  setIsShowDir(isShowDir: boolean) {
    this.isShowDir = isShowDir
  },
  setDir(dir: Array<any>) {
    this.dir = dir
  },
  setChapterId(chapterId: number) {
    this.chapterId = chapterId
  },
  setLines(lines: Array<string>) {
    this.lines = lines
  },

  resetState() {
    resetObj(this, [ChapterState, CommonState])
  },
})

export type IChapterStore = ReturnType<typeof ChapterStore>