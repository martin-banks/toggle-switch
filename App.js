
const toggleOptions = {
	container: '.tester',
	callback: {
		on: () => console.log('Button on'),
		off: () => console.log('Button off'),
	},
	color: {
		off: false,
		on: false,
	},
	size: 'jumbo',
	theme: 'chrome',
}
const testToggle = ToggleSwitch(toggleOptions)


// render config code into dom as example
// document.querySelector('.configCode code').innerHTML = `const options = ${JSON.stringify(toggleOptions, 'utf-8', '\t')}`

hljs.highlightBlock(document.querySelector('.configCode code'))
