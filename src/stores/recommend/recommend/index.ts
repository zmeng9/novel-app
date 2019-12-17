import { observable, action, computed } from 'mobx'

export class RecommendStore {
  @observable novels: Array<any> = []
  @observable page: number = 0

  @action
  changePage() {
    this.page ++
  }

  @computed
  get tenPage() {
    return this.page * 10
  }
}