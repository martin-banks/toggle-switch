function buttonOnFunction(){console.log('Button on')}
const buttonOffFunction = ()=> console.log('Button off')

const toggleOptions = {
	container: '.tester',
	callback: {
		on: buttonOnFunction,
		off: buttonOffFunction
	},
	color: {
		off: false,
		on: false
	},
	size: 'jumbo'
}
const testToggle = ToggleSwitch(toggleOptions)


/* render config code into dom as example */
document.querySelector('.configCode code').innerHTML = `const options = ${JSON.stringify(toggleOptions, 'utf-8', '\t')}`

hljs.initHighlightingOnLoad();
