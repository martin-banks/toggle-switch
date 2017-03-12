/*
	Define class names used in template structure 
	These are used to get and update elements without 
	needing to perform much DOM interigation  
*/
const classNames = {
	track: 'track',
	target: 'target'
}


/*
	HTML Template
	ES6 string template returns the tempalte with configurable options
*/
const template = props => `
	<div class="${props.size}">
		<div class='${classNames.track}' style="background-color:${props.trackColor}">
			<div class="${classNames.target}"></div>
		</div>
	</div>`



/* 
	Main toggle switch 
	'props' is a paramter object, only the container is a required value
	Details of other options are in the README.md 
*/
const ToggleSwitch = props => {
	/* 
		Check for required arguments before app to render starts
	*/
	if (!props.container){
		return console.error('A string selector for the toggle container is required')
	}
	
	/* Instantiate state obj, all options and value are referenced from here*/
	let	state = {
		active: false,
		dragPosX: 0,
		toggleStartX: null,
		difference: null,
		togglePosX: null,
		toggleEndPosX: null,
		toggleMargin: null,
		onColor: 'rgba(100,140,0,1)',
		offColor: '',
		transitionTime: 200,
		size: 'regular'
	}

	 /* Instantiate object with function expressions for SETTING state values */
	const set = {
		active: update => state.active = update,
		dragPosX: update => state.dragPosX = update,
		toggleStartX: update => state.toggleStartX = update,
		difference: update => state.difference = update,
		togglePosX: update => state.togglePosX = update,
		toggleEndPosX: update => state.toggleEndPosX = update,
		toggleMargin: update => state.toggleMargin = update,
		onColor: update => state.onColor = update,
		offColor: update => state.offColor = update,
		size: update => state.size = update
	}
	/* Instantiate object with function expressions for GETTING state values */
	const get = { 
		active: () => state.active,
		dragPosX: () => state.dragPosX,
		toggleStartX: () => state.toggleStartX,
		difference: () => state.difference,
		togglePosX: () => state.togglePosX,
		toggleEndPosX: () => state.toggleEndPosX,
		toggleMargin: () => state.toggleMargin,
		onColor: () => state.onColor,
		offColor: () => state.offColor,
		size: () => state.size
	}

	/* check for color options in props, update state if needed */
	if (!!props.color) {
		!!props.color.off ? set.offColor(props.color.off) : ''
		!!props.color.on ? set.offColor(props.color.on) : '' 
	}
	/* check for size options on props, update state if needed */
	!!props.size ? set.size(props.size) : ''

	/* store container object as described by props in variable */
	const container = document.querySelector(props.container)
	/* render toggle template into container */
	container.innerHTML = template({
		trackColor: state.offColor,
		size: state.size
	})
	
	/* store track and toggle elements for reference later */
	const track = container.querySelector(`.${classNames.track}`)
	const toggle = container.querySelector(`.${classNames.target}`)
	
	/* store the toggle's margin in state by calculating difference bwteen it's height and the track height */
	set.toggleMargin( (track.offsetHeight - toggle.offsetHeight) / 2 )
	
	/* store the furthest position (on position) in state by subtracting the toggle width from the track */
	set.toggleEndPosX( track.offsetWidth - toggle.offsetWidth - (state.toggleMargin * 2) )

	/* Start listening for mouse events */
	/* Listen for mousedown events on the toggle button */
	toggle.addEventListener("mousedown", (toggleMouseDown), false)


	/* 
		Function to perform on mousedown 
		-- when user first starts interacting with toggle by pressing down on mouse button
	*/
	function toggleMouseDown(e) {
		/* 
			Remove toggle button transition values for smooth draggin
			toggle position should update instantly not through animation
		*/
		toggle.style.transition = ''

		/* Store the position of the mouseDown event */
		set.toggleStartX(e.pageX)
		/* Store the initial position of the toggle button */
		set.togglePosX(toggle.offsetLeft)
		/* 
			Store the difference of mouseDown position to the toggle button position.
			This is used later to calculate the exact position to move the button to.
				eg: if the user clicks in the middle of the button we want to the middle of the button to 
				stay aligned to the mouse cursor, not for it jump to align the left edge.
		*/
		set.difference(state.toggleStartX - state.togglePosX)
		/* Now start listening for mouseMove events and call mouseMove function */
		document.addEventListener("mousemove", toggleMouseMove, false)
	}

	/* Function to perform when mouse moves while mouse is still down
	 -- when user is 'dragging' toggle button */
	function toggleMouseMove(e) {
		/* continually store the current mouse position */
		set.dragPosX(e.pageX)
		/* calculate the exact drag position based on it's drag position 
			less the difference of where the user clicked to start the drag */
		const actualPosition = state.dragPosX - state.difference
		/*
			We do want the toggle to be dragged beyond the edges of the track
			Continually check to see if the caluculated toggle position is below 0 -- beginning position
			or over the (track width) - (toggle width) -- end poistion

			IF - has tried to drag beyond left edge, set position to left position
			ELSE IF - has dragged the right edge, set position to far right position
			ELSE - is dragging within the track, update to current drag position
		*/
		if (actualPosition <= 0) {
			toggle.style.left = '0px'		
		} else if ( (actualPosition - state.toggleMargin) > state.toggleEndPosX) {
			toggle.style.left = state.toggleEndPosX + 'px'	
		} else {
			/* 
				The toggle button has a margin to provide some space between it and the edges of the track, 
				we must subtract this from the position calculation to prevent it going too far
			*/
			toggle.style.left = (actualPosition - state.toggleMargin) + 'px'
		}
		/* start listening for mouseUp events; when the user has finished interacting */
		document.addEventListener("mouseup", toggleMouseUp, false)
	}



	/*
		Function to perform when mouse button is released
		-- user has finisehed interacting with button
	*/
	function toggleMouseUp(e) {
		/* 
			Remove eventListeners for mousemove and mouseup; user has finished this interaction session.
			We add these event listeners again if the user starts another interaction session
		 */
		document.removeEventListener("mousemove", toggleMouseMove, false)
		document.removeEventListener("mouseup", toggleMouseUp, false)

		/* 
			Add css transition so the toggle moves smoothly if not dragged the full distance
			Transition time is stored as milliseconds in state
		 */
		toggle.style.transition = 'left ' + state.transitionTime + 'ms'
		
		/* 
			Calculate where the button was dragged to.
			Get the dragged position, subtract the 'difference' of the cursor position to the toggle position
		*/
		let calcDragX = state.dragPosX - state.difference + (toggle.offsetWidth/2) + state.toggleMargin

		/* Calculate the halfway point; half the width of the track */
		let halfway = track.offsetWidth / 2

		/* IF toggle poistion is less than halfway then set toggle to it's off position
				- the toggle to the left side 
				- track color to 'off' value
				- state.active to false
				- call the off callback supplied

			ELSE, set toggle to it's onposition
				- the toggle to the right side (endPosition)
				- track color to 'on' value
				- state.active to true
				- call the 'on' callback supplied
		*/
		if ( calcDragX < halfway ) { 
			toggle.style.left = '0px'
			track.style.background = state.offColor
			set.active(false)
			if(!!props.callback.off) props.callback.off()
			return
		} else {
			toggle.style.left = state.toggleEndPosX + 'px'
			track.style.background = state.onColor
			set.active(true)
			if(!!props.callback.on) props.callback.on()
			return
		}
	}


	/* 
		Return an object when the toggle button is initialised: 
			- all functions to get state values.  
					example: get.active() // returns true of false boolean 
	*/
	return {
		get: get,
	}
}










/* 
	Touchscreen support
	solution seems to work -- further testing required. 
*/
/*let eleTouch = document.getElementsByClassName("target-touch")[0]
let trackTouch = document.querySelector('.track-touch')


let touchX

eleTouch.addEventListener("touchmove", (e)=>{
	e.preventDefault()
	let touch = e.targetTouches[0]
	touchX = touch.pageX
	eleTouch.style.left = touchX - trackTouch.offsetLeft - 50 + 'px'
}, false)

eleTouch.addEventListener('touchend', (e)=>{
	eleTouch.style.transition = 'left 0.3s'
	//console.log(eleTouch.offsetLeft)
	
	if ((eleTouch.offsetLeft +(eleTouch.offsetWidth/2)) < (trackTouch.offsetWidth/2)) { 
	// need to detect center point
		eleTouch.style.left = '0px'
		trackTouch.style.background = ''
	} else {
		//console.log(touchX)
		eleTouch.style.left = trackTouch.offsetWidth - (eleTouch.offsetWidth + (margin*2)) + 'px'
		trackTouch.style.background = 'rgba(100,140,0,1)'
	}

	setTimeout(() => {
		eleTouch.style.transition = ''
	}, 300)
	
}, false)
*/

/* add click event to toggle */