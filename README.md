# Keyboard Actions

Keyboard-actions is a package that allows devs to make their websites accessible from keyboard, which will give their users away better experience.

Just assign actions to keyboard buttons.

## uses example

* navigate slider throw arrow buttons
* close popup using escape button
* prevent default of the tab button
etc....

## Installing keyboard-actions

To install keyboard-actions, just run:

``` bash
npm i keyboard-actions
```

Or use it via cdn

```html
<script src="https://unpkg.com/keyboard-actions@latest"></script>
```

## Documentation of keyboard-actions

pick the funcion you want to use.

``` js
import KeyboardActions from 'keyboard-actions';

const kb = new KeyboardActions();

// first show button names in console if you don't know its names
kb.showClickedButtonName();


// attach function to the key
kb.assignKeyAction('KeyName', (e) => console.log('assigned successfully 🥳'))

// update key with new functions
kb.updateKeyAction('KeyName', (e) => console.log('key has 2️⃣ functions now.'))

// reset the key to this only function
kb.setKeyAction('KeyName', (e) => console.log('it has just me now 😜'))

// clean key from all functions assigned to it
kb.cleanKeyAction('KeyName') // 🧹

// attach action to all keys
kb.assignDefaultActionToAllKeys((e) => console.log('i am every where 🙋'))
// clean default actions
kb.cleanDefaultAction() // 🧹


// prevent default for the button
kb.assignKeyAction("Tab", kb.prevent);



// switch on/off
kb.stop();    // stop the listeneing event
kb.start();   // start listening event


```

## Contact

If you want to contact me you can reach me at mo.err17@gmail.com

## License

This project uses the following license: [MIT](https://choosealicense.com/licenses/mit/).
