# KeyboardActions

**KeyboardActions** is a lightweight JavaScript utility that allows you to easily define custom keyboard shortcuts and manage key events in your web applications. With features like customizable key combinations, action hooks, and event management, this package provides a flexible way to handle keyboard interactions.

## Installation

Install the package via npm:

```bash
npm install keyboard-actions
```

## Features

- **Custom Key Combinations:** Define actions for specific key sequences.
- **Hooks:** Pre-action and post-action hooks to run custom logic before or after the key action.
- **Automatic Key Ordering:** Ensure that key combinations are recognized regardless of the order of key presses.
- **Event Management:** Easily add or remove event listeners.
- **Logging:** Optionally log key combinations to the console for debugging.

## Usage

### Basic Setup

First, import and initialize the `KeyboardActions` class:

```javascript
const KeyboardActions = require('keyboard-actions');

const keyboardActions = new KeyboardActions();
```

### Starting and Stopping the Keyboard Listener

You can start listening to key events by calling the `start` method. To stop listening, use the `stop` method.

```javascript
keyboardActions.start(); // Begin listening for key events
keyboardActions.stop();  // Stop listening for key events
```

### Adding a Key Action

To add a custom action for a specific key or key combination, use the `addKeyAction` method:

```javascript
keyboardActions.addKeyAction('Control + S', (event) => {
  console.log('Save command triggered!');
  // Your custom save logic here
});
```

You can also add actions for single keys:

```javascript
keyboardActions.addKeyAction('Escape', (event) => {
  console.log('Escape key pressed!');
});
```

### Clearing a Key Action

If you need to remove a specific key action, use the `clearKeyAction` method:

```javascript
keyboardActions.clearKeyAction('Control + S');
```

### Configuration Options

The `KeyboardActionsConfig` class provides several options to customize the behavior of the keyboard listener.

#### Default Configuration

```javascript
const config = {
  element: document,           // The DOM element to attach the event listeners to
  logKeys: true,               // Whether to log key combinations to the console
  keepDefault: false,          // Prevent default browser behavior for key events
  isAutoKeyOrdering: true,     // Automatically order key combinations
  preActionHook: () => {},     // Function to run before each key action
  postActionHook: () => {},    // Function to run after each key action
};
```

#### Customizing Configuration

You can modify the configuration by accessing the `config` property of the `KeyboardActions` instance:

```javascript
keyboardActions.config.logKeys = false;  // Disable logging
keyboardActions.config.keepDefault = true; // Allow default browser behavior
keyboardActions.config.preActionHook = () => {
  console.log('Action is about to be executed!');
};
keyboardActions.config.postActionHook = () => {
  console.log('Action executed!');
};
```

### Managing Window Events

The `Utils.onWindowChange` method can be used to attach a callback function that runs when the window's focus changes:

```javascript
const Utils = require('keyboard-actions').Utils;

Utils.onWindowChange((event) => {
  if (event.type === 'blur') {
    console.log('Window lost focus');
  } else if (event.type === 'focus') {
    console.log('Window gained focus');
  }
});
```

### Example: Implementing a Simple Shortcut

Here's an example of how you can implement a simple keyboard shortcut using `KeyboardActions`:

```javascript
const KeyboardActions = require('keyboard-actions');

const keyboardActions = new KeyboardActions();

keyboardActions.addKeyAction('Control + N', (event) => {
  console.log('New document command triggered!');
  // Your logic to create a new document
});

keyboardActions.addKeyAction('Control + S', (event) => {
  console.log('Save command triggered!');
  // Your logic to save the current document
});

keyboardActions.start();
```

### Example: Using Hooks and Auto Key Ordering

```javascript
const keyboardActions = new KeyboardActions();

// Custom pre-action and post-action hooks
keyboardActions.config.preActionHook = () => console.log('Before action');
keyboardActions.config.postActionHook = () => console.log('After action');

// Enable automatic key ordering
keyboardActions.config.isAutoKeyOrdering = true;

keyboardActions.addKeyAction('N + Control', () => {
  console.log('This will work even if N is pressed before Control');
});

keyboardActions.start();
```

### Example: Managing Event Listeners

The `EventsManager` class allows you to easily add and remove event listeners:

```javascript
const EventsManager = require('keyboard-actions').EventsManager;

const eventsManager = new EventsManager({ element: document });

// Add custom event listeners
eventsManager.addEventListener('click', () => console.log('Document clicked'));
eventsManager.addEventListener('keydown', () => console.log('Key down'));

// Remove all event listeners
eventsManager.remove();
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue if you have any suggestions or find any bugs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
