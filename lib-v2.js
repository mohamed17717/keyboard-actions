class Type {
  static objectWithDefaultValue(defaultGenerator) {
    let handler = {
      get: function(target, name) {
        name = name.toLowerCase(); // tolerant for case sensitivity
        if (target.hasOwnProperty(name) ) {
          return target[name];
        } else {
          target[name] = defaultGenerator();
          return target[name];
        }
      }
    };
  
    return new Proxy({}, handler);
  }
  
  static uniqueArray(arr=[]) {
    let handler = {
      get(target, prop) {
        if (prop === 'push') {
          return function(...args) {
            args.forEach((item) => {
              if (!target.includes(item)) {
                Array.prototype.push.call(target, item);
              }
            });
            return target.length;
          };
        } else if (prop === 'filter') {
          return function (...args) {
            const filteredArray = Array.prototype.filter.apply(target, args);
            return Type.uniqueArray(filteredArray);
          };
        }
        return Reflect.get(target, prop);
      }
    };
  
    return new Proxy(arr, handler);
  }
}

class KeyboardActionsConfig {
  // user can modify
  element = document;

  logKeys = true;
  keepDefault = true;
  isAutoKeyOrdering = true;

  preActionHook = () => {};
  postActionHook = () => {};
}

class Utils {
  static onWindowChange(callback) {
    window.addEventListener('blur', callback)
    window.addEventListener('focus', callback)
    window.addEventListener('focusin', callback)
    window.addEventListener('focusout', callback)
    window.addEventListener('close', callback)
  }
}

class ClickManager {
  constructor(config) {
    this.config = config;
    this.currentClickedButtons = Type.uniqueArray(); // buttons clicked right now
    this.buttonActions = Type.objectWithDefaultValue(() => []);
  }

  
  // Logging
  logKeys() {
    let keys = this.currentClickedButtons;
    this.config.logKeys && console.log(this.getCombinedKeysName(keys));
  }

  // Events
  clear = (e) => {
    this.currentClickedButtons = Type.uniqueArray();
  }

  keyDownMethod = (e) => {
    this.config.keepDefault || e.preventDefault();
    const keyName = this.getKeyName(e.key);
    
    this.currentClickedButtons.push(keyName);
    
    const actions = this.getKeyActions();
    this.config.preActionHook();
    if(actions.length) {
      actions.map(callback => callback(e));
      this.clear();
    }
    this.config.postActionHook();


    this.logKeys();
  }

  keyUpMethod = (e) => {
    const keyName = this.getKeyName(e.key);
    this.currentClickedButtons = this.currentClickedButtons.filter((key) => key !== keyName);

    this.logKeys();
  }

  // Key Actions
  getKeyActions() {
    let keys = this.currentClickedButtons;
    return this.buttonActions[this.getCombinedKeysName(keys)]
  }

  // Naming
  getCombinedKeysName(keys){
    let keysCLone = [...keys];
    if(this.config.isAutoKeyOrdering){
      keysCLone.sort()
    }

    return keysCLone.join(' + ')
  }

  getKeyName(key) {
    const ALIAS = { " ": "Space", "+": "Plus", "-": "Minus" };
    let keyName;

    if (typeof key == 'string' && key.includes('+'))
      key = key.split('+').map(k => k.trim())

    if (typeof key == 'string')
      keyName = ALIAS[key] || key;
    else if (Array.isArray(key)){
      key = key.map(k => this.getKeyName(k));
      keyName = this.getCombinedKeysName(key);
    }
    else
      throw new Error('invalid key type');
    return keyName;
  }


}

class EventsManager {
  constructor(config) {
    this.events = [];
    this.config = config;
  }

  addEventListener(eventName, callback) {
    this.events.push([eventName, callback]);
    this.config.element.addEventListener(eventName, callback);
  }

  remove() {
    this.events.forEach(([eventName, callback]) => this.config.element.removeEventListener(eventName, callback));
    this.events = [];
  }
}

class KeyboardActions {

  constructor() {
    this.config = new KeyboardActionsConfig();
    this.clickManager = new ClickManager(this.config);
    this.eventsManager = new EventsManager(this.config);

    this.isRunning = false; // to avoid multiple start / stop
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.eventsManager.addEventListener('keydown', this.clickManager.keyDownMethod);
    this.eventsManager.addEventListener('keyup', this.clickManager.keyUpMethod);

    Utils.onWindowChange(this.clickManager.clear);
  }

  stop() {
    this.eventsManager.remove();
    this.isRunning = false;
  }

  addKeyAction(key, callback) {
    let keyName = this.clickManager.getKeyName(key);
    this.clickManager.buttonActions[keyName].push(callback);
  }

  clearKeyAction(key) {
    let keyName = this.clickManager.getKeyName(key);
    this.clickManager.buttonActions[keyName] = [];
  }
}

if (typeof exports != "undefined") module.exports = KeyboardActions;

