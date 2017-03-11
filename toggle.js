
const template = props => [
	`<div class='track'>`,
		`<div class="target"></div>`,
	`</div>`,
].join('')



const ToggleSwitch = props => {
	if (!props.container){
		return console.error('A string selector for the toggle container is required')
	}
	let	state = {
		status: false,
		dragPosX: 0,
		toggleStartX: null,
		difference: null,
		togglePosX: null,
		toggleEndPosX: null,
		toggleMargin: null
	}
	const set = {
		status: update => state.status = update,
		dragPosX: update => state.dragPosX = update,
		toggleStartX: update => state.toggleStartX = update,
		difference: update => state.difference = update,
		togglePosX: update => state.togglePosX = update,
		toggleEndPosX: update => state.toggleEndPosX = update,
		toggleMargin: update => state.toggleMargin = update,
	}
	const get = { 
		status: ()=> state.status,
		dragPosX: ()=> state.dragPosX,
		toggleStartX: ()=> state.toggleStartX,
		difference: ()=> state.difference,
		togglePosX: ()=> state.togglePosX,
		toggleEndPosX: ()=> state.toggleEndPosX,
		toggleMargin: ()=> state.toggleMargin,
	}

	const container = document.querySelector(props.container)
	container.innerHTML = template()
	const track = container.querySelector('.track')
	const toggle = container.querySelector('.target')

	set.toggleMargin( (track.offsetHeight - toggle.offsetHeight) / 2 )
	set.toggleEndPosX( track.offsetWidth - toggle.offsetWidth - (state.toggleMargin * 2) )
	toggle.addEventListener("mousedown", eleMouseDown, false);

	function eleMouseDown(e) {
		set.toggleStartX(e.pageX)
		set.togglePosX(toggle.offsetLeft)
		stateMouseDown = true;
		document.addEventListener("mousemove", eleMouseMove, false);
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
		document.addEventListener("mouseup", eleMouseUp, false);
	}

	function eleMouseUp(e) {
		document.removeEventListener("mousemove", eleMouseMove, false);
		document.removeEventListener("mouseup", eleMouseUp, false);
		
		toggle.style.transition = 'left 0.3s'
		let calcDragX = state.dragPosX - state.difference + (toggle.offsetWidth/2) + state.toggleMargin
		let halfway = track.offsetWidth / 2

		if ( calcDragX < halfway ) { 
			toggle.style.left = '0px'
			track.style.background = ''
			set.status(false)
		} else {
			toggle.style.left = state.toggleEndPosX + 'px'
			track.style.background = 'rgba(100,140,0,1)'
			set.status(true)
		}

		setTimeout(() => {
			toggle.style.transition = ''
		}, 300)
	}

	return {
		get: get
	}
}










/* 
	Touchscreen support
	solution seems to work -- further testing required. 
*/
/*let eleTouch = document.getElementsByClassName("target-touch")[0];
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