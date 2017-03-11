/*
props: {
	container: '.someClassName',
	callback: {
		on: ()=>,
		off= ()=>
	}
}

*/


const classNames = {
	track: 'track',
	target: 'target'
}


const template = props => [
	`<div class='${classNames.track}' style="background-color:${props.trackColor}">`,
		`<div class="${classNames.target}"></div>`,
	`</div>`,
].join('')

const ToggleSwitch = props => {
	if (!props.container){
		return console.error('A string selector for the toggle container is required')
	}
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
		transitionTime: 200
	}
	const set = {
		active: update => state.active = update,
		dragPosX: update => state.dragPosX = update,
		toggleStartX: update => state.toggleStartX = update,
		difference: update => state.difference = update,
		togglePosX: update => state.togglePosX = update,
		toggleEndPosX: update => state.toggleEndPosX = update,
		toggleMargin: update => state.toggleMargin = update,
		onColor: update => state.onColor = update,
		offColor: update => state.offColor = update
	}
	const get = { 
		active: () => state.active,
		dragPosX: () => state.dragPosX,
		toggleStartX: () => state.toggleStartX,
		difference: () => state.difference,
		togglePosX: () => state.togglePosX,
		toggleEndPosX: () => state.toggleEndPosX,
		toggleMargin: () => state.toggleMargin,
		onColor: () => state.onColor,
		offColor: () => state.offColor
	}

	if (!!props.color) {
		!!props.color.off ? set.offColor(props.color.off) : ''
		!!props.color.on ? set.offColor(props.color.on) : '' 
	}

	const container = document.querySelector(props.container)
	container.innerHTML = template({trackColor: state.offColor})
	const track = container.querySelector(`.${classNames.track}`)
	const toggle = container.querySelector(`.${classNames.target}`)


	

	set.toggleMargin( (track.offsetHeight - toggle.offsetHeight) / 2 )
	set.toggleEndPosX( track.offsetWidth - toggle.offsetWidth - (state.toggleMargin * 2) )
	toggle.addEventListener("mousedown", eleMouseDown, false);

	function eleMouseDown(e) {
		toggle.style.transition = ''
		set.toggleStartX(e.pageX)
		set.togglePosX(toggle.offsetLeft)
		stateMouseDown = true
		document.addEventListener("mousemove", eleMouseMove, false)
	}

	function eleMouseMove(e) {
		set.dragPosX(e.pageX)
		set.difference(state.toggleStartX - state.togglePosX)
	
		if (state.dragPosX - state.difference <= 0) {
			toggle.style.left = '0px'		
		} else if ( (state.dragPosX - state.difference + state.toggleMargin) > state.toggleEndPosX) {
			toggle.style.left = state.toggleEndPosX + 'px'	
		} else {
			toggle.style.left = state.dragPosX - state.difference + 'px'
		}
		document.addEventListener("mouseup", eleMouseUp, false)
	}

	function eleMouseUp(e) {
		document.removeEventListener("mousemove", eleMouseMove, false)
		document.removeEventListener("mouseup", eleMouseUp, false)
		toggle.style.transition = 'left ' + state.transitionTime/1000 + 's'
		let calcDragX = state.dragPosX - state.difference + (toggle.offsetWidth/2) + state.toggleMargin
		let halfway = track.offsetWidth / 2

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

	return {
		get: get,
		set: {
			onColor: set.onColor
		}
	}
}










/* 
	Touchscreen support
	solution seems to work -- further testing required. 
*/
/*let eleTouch = document.getElementsByClassName("target-touch")[0]
let trackTouch = document.querySelector('.track-touch')


let touchX;

eleTouch.addEventListener("touchmove", (e)=>{
	e.preventDefault()
	let touch = e.targetTouches[0]
	touchX = touch.pageX
	eleTouch.style.left = touchX - trackTouch.offsetLeft - 50 + 'px'
}, false);

eleTouch.addEventListener('touchend', (e)=>{
	eleTouch.style.transition = 'left 0.3s'
	//console.log(eleTouch.offsetLeft)
	
	if ((eleTouch.offsetLeft +(eleTouch.offsetWidth/2)) < (trackTouch.offsetWidth/2)) { // need to detect center point
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