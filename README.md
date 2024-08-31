# KeyboardActions

**KeyboardActions** is a lightweight JavaScript utility that allows you to easily define custom keyboard shortcuts and manage key events in your web applications. With features like customizable key combinations, and action hooks, this package provides a flexible way to handle keyboard interactions.

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

> **OR**

```HTML
<!-- Load the script -->
<script src="https://unpkg.com/keyboard-actions@latest"></script>

<script>
// start using it
const keyboardActions = new KeyboardActions();

</script>
```

### Starting and Stopping the Keyboard Listener

You can start listening to key events by calling the `start` method. To stop listening, use the `stop` method.

```javascript
keyboardActions.start(); // Begin listening for key events
keyboardActions.stop();  // Stop listening for key events

// to read the running status
console.log(keyboardActions.isRunning);
```

### Adding a Key Action

To add a custom action for a specific key or key combination, use the `addKeyAction` method:

Defining key action can be in this ways

- Array -> `["Control" + "S"]`
- String -> `"Control + S"`

Also Keys are not case sensitive, its tolerance with upper and lower cases, but make sure to write the right name

NOTE: you can not the name by just turn on the `Logging`

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
  keepDefault: true,          // Prevent default browser behavior for key events
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

## Contributing

Contributions are welcome! Please submit a pull request or open an issue if you have any suggestions or find any bugs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
