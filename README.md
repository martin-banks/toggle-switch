# toggle-switch
Sel-set challenge project

### The brief
Create a re-usable template/component fora toggle switch. It must:
- Respond to drag events, for both mouse and touch input
- Make use of a factory function
- Perform a different function in on/off state 

**Extra credit**
- Wide range of configuration options

### Why?
Want to learn a bit out drag inputs and refresh on factories to crate re-usable componenets

## How to
### Basic use
Include the js and css files in your HTML

	`<link rel="stylesheet" href="./Toggle.css">`
	`<script type="text/javascript" src="./Toggle.js"></script>`

Create a dom element with className to use as a container for the switch
	`<div class="toggleContainer"></div>`

At the end of yuo html add a script tag, and initialise with the className of you container:

	`<script>
		const myToggle = ToggleSwitch({
			container: '.toggleContainer'
		})
	</script>`

Now we want it to do something, two call backs can be provided, one to run in either 'on' or 'off' state (note, off is left, on is right). Add your functions to the parameters:

	`<script>
		const myToggle = ToggleSwitch({
			container: '.toggleContainer',
			callbask: {
				on: () => console.log('The button is on'),
				off: () => console.log('The button is off')
			}
		})
	</script>`

While running the button will return an object to get some feedback from the button's state. For example you can get it's active state but calling:

	`myToggle().get.active() // returns true or false`

---

# Config options
Additional config options currently supported:

### Set background color
Add a color object with both or either on and off keys. All color declarations are supported (hex, rgb, rgba, names etc...)

	`color: { on: 'green', off: '#ff0000' }`

--
### Set size
Pass one of 4 different sizes as a string. The default is `regular`
- small    ~ 35px high
- regular  ~ 50px high
- large    ~ 75px high
- jumbo    ~ 100px high
	
	`size: 'large'`

----

# Still to do

- Full support for touch input
- Additional themes / styles for whole 



