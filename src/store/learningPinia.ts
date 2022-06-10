import { defineStore } from "pinia";

export const useStore = defineStore("learningPinia", {
  state: () => ({
    title: "学习使用Pinia",
    progress: 0,
    statusList: [false, false, false, false, false],
    loadingList: [false, false, false, false, false],
    msgList: [],
  }),
  getters: {
    progress: state => {
      return (
        state.statusList.reduce((prev, current) => {
          if (current) {
            return prev + 1;
          }
          return prev;
        }, 0) * 10
      );
    },
  },
  actions: {
    async learnPart(index: number) {
      this.loadingList[index] = true;
      await new Promise(resolve => {
        setTimeout(() => resolve(true), 2000);
      });
      this.statusList[index] = true;
      this.loadingList[index] = false;
    },
  },
});
