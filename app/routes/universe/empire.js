import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    let universe = this.modelFor('universe')
    return universe.get('mainEmpire')
  }
});
