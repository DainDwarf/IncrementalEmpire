import Controller from '@ember/controller';

export default Controller.extend({
  saveData: '',

  actions: {
    async importEverything() {
      await this.store.importData(atob(this.saveData))
      await this.game.load()
      this.transitionToRoute('index')
    },
    async exportEverything() {
      await this.store.exportData(['universes', 'empires', 'upgrades', 'achievements', 'templates'])
        .then(data => this.set('saveData', btoa(data)))
    },
    async destroyEverything(event) {
      event.preventDefault();
      let destroy = window.confirm('Are you sure? This will lose all your game progress and cannot be recovered in any way.')
      if (destroy) {
        // TODO: I don't know why this does not work. :(
        await window.localStorage.clear();
        await this.game.load()
        this.transitionToRoute('index')
      }
    },
  },
});
