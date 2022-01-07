class KeyboardActions {
  constructor() {
    this.keyEvent = "keydown";
    this.defaultActionsOnAnyKey = [];
    this.keyMapActions = {};

    this.start();
  }

  getKeyName(e) {
    const allias = { " ": "Space" };
    const keySystemDefaultName = e.key;
    const name = allias[keySystemDefaultName] || keySystemDefaultName;

    return name;
  }

  listenToButtons(callback) {
    this.listenerAction = (e) => callback(e);
    document.addEventListener(this.keyEvent, this.listenerAction);
  }

  mainListenerRunner(e) {
    const keyName = this.getKeyName(e);
    const keyActions = this.keyMapActions[keyName] || [];

    this.defaultActionsOnAnyKey.map((func) => func(e));
    keyActions.map((func) => func(e));
  }

  // printer
  showClickedButtonName() {
    const printKeyName = (e) => {
      const keyName = this.getKeyName(e);
      console.log(keyName);
    };

    this.assignDefaultActionToAllKeys(printKeyName);
  }

  // methods that handle key Actions
  assignKeyAction(key, callback) {
    this.updateKeyAction(key, callback);
  }

  updateKeyAction(key, callback) {
    if (this.keyMapActions.hasOwnProperty(key))
      this.keyMapActions[key].push(callback);
    else this.keyMapActions[key] = [callback];
  }

  setKeyAction(key, callback) {
    this.keyMapActions[key] = [callback];
  }

  cleanKeyAction(key) {
    this.keyMapActions[key] = [];
  }

  assignDefaultActionToAllKeys(callback) {
    this.defaultActionsOnAnyKey.push(callback);
  }

  cleanDefaultAction() {
    this.defaultActionsOnAnyKey = [];
  }

  // short hand when prevet default
  prevent(e) {
    e.preventDefault();
  }

  // switch on/off the document listening
  stop() {
    document.removeEventListener(this.keyEvent, this.listenerAction);
  }

  start() {
    this.listenToButtons((e) => this.mainListenerRunner(e));
  }
}

if (typeof exports != "undefined") module.exports = KeyboardActions;

