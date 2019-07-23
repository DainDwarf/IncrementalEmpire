export function initialize(application) {
  application.inject('route', 'game', 'service:game');
  application.inject('template', 'game', 'service:game');
  application.inject('controller', 'game', 'service:game');
}

export default {
  initialize
};
