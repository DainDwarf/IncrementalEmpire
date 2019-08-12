import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async clicked() {
      console.log("Click from thing1")
    },
  },
});
