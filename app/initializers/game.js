export function initialize(application) {
  application.inject('route', 'game', 'service:game');
  application.inject('template', 'game', 'service:game');
  application.inject('controller', 'game', 'service:game');
  application.inject('component', 'game', 'service:game');
  application.inject('model', 'game', 'service:game');
  application.inject('helper', 'game', 'service:game');
}

export default {
  initialize
};
