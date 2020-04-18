export interface IRecommendState {
  limit: number
  offset: number
  novels: Array<any>
}

export const RecommendState: IRecommendState = {
  limit: 20,
  offset: 0,
  novels: [],
}

export const RecommendStore = () => ({
  ...RecommendState,

  setNovels(novels: Array<any>) {
    this.novels = [...novels]
  },
})

export type IRecommendStore = ReturnType<typeof RecommendStore>