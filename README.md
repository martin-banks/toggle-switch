# toggle-switch
Self-set challenge project

### The brief
Create a re-usable template/component fora toggle switch. It must:
- Respond to drag events, for both mouse and touch input
- Make use of a factory function
- Perform a different function in on/off state 

**Extra credit**

- Additional configuration options
- Creat a version using ES6 classes




### Why?
I want to learn about drag inputs and refresh on factories to crate re-usable componenets


## How to
### Basic use
Include the js and css files in your HTML

	<link rel="stylesheet" href="./Toggle.css">
	<script type="text/javascript" src="./Toggle.js"></script>

Create a dom element with className to use as a container for the switch


	<div class="toggleContainer"></div>

At the end of yuo html add a script tag, and initialise with the className of you container:

	<script>
		const myToggle = ToggleSwitch({
			container: '.toggleContainer'
		})
	</script>

Now we want it to do something, two call backs can be provided, one to run in either 'on' or 'off' state (note, off is left, on is right). Add your functions to the parameters:

	<script>
		const myToggle = ToggleSwitch({
			container: '.toggleContainer',
			callback: {
				on: () => console.log('The button is on'),
				off: () => console.log('The button is off')
			}
		})
	</script>

While running the button will return an object to get some feedback from the button's state. For example you can get it's active state but calling:

	`myToggle().get.active() // returns true or false`




---

# Config options
Additional config options currently supported:

### Set background color
Add a color object with both or either on and off keys. All color declarations are supported (hex, rgb, rgba, names etc...)

	color: { on: 'green', off: '#ff0000' }

--
### Set size
Pass one of 4 different sizes as a string under a size key. 
The default is `regular`

__options__

	- Small			~ 35px high
	- Regular 		~ 50px high
	- Large			~ 75px high
	- Jumbo			~ 100px high

__to use:__

	size: 'large'

--

# Still to do

- Improve touch input
- Additional themes / styles for whole 

---

#License
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

