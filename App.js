var ele = document.getElementsByClassName("target")[0];
var track = document.querySelector('.track')
	//ele.onmousedown = eleMouseDown;
ele.addEventListener("mousedown", eleMouseDown, false);
var pX;
var startX;
var diff;
var eleX;


var endPos = track.offsetWidth - ele.offsetWidth

let margin = (track.offsetHeight - ele.offsetHeight) / 2

function eleMouseDown(e) {
	startX = e.pageX
	eleX = ele.offsetLeft
	//console.log('start', startX, '\tpX', pX)
	stateMouseDown = true;
	document.addEventListener("mousemove", eleMouseMove, false);
}

function eleMouseMove(ev) {
	pX = ev.pageX;
	diff = startX - eleX

	//var pY = ev.pageY;
	if (pX - diff <= 0) {
		ele.style.left = '0px'
		
	} else if (pX - diff + (2*margin) > endPos) {
		ele.style.left = endPos - (margin*2) + 'px'
		
	} else {
		ele.style.left = pX - diff + 'px'
	}
	//ele.style.top = pY + "px";
	document.addEventListener("mouseup", eleMouseUp, false);
	// console.log(pX)
}

function eleMouseUp(e) {
	document.removeEventListener("mousemove", eleMouseMove, false);
	document.removeEventListener("mouseup", eleMouseUp, false);
	ele.style.transition = 'left 0.3s'
	
	if ((pX - diff + (ele.offsetWidth/2) + margin) < (track.offsetWidth/2)) { 
		ele.style.left = '0px'
		track.style.background = ''
	} else {
		ele.style.left = endPos - (margin*2) + 'px'
		track.style.background = 'rgba(100,140,0,1)'
	}

	setTimeout(() => {
		ele.style.transition = ''
	}, 300)
}




/* 
	Touchscreen support
	solution seems to work -- further testing required. 
*/
var eleTouch = document.getElementsByClassName("target-touch")[0];
let trackTouch = document.querySelector('.track-touch')


var touchX;

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


/* add click event to toggle */