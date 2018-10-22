
var deltaX = 0;
var deltaY = 0;
var deltaThreshold = 100
function swipeEnded(event, direction, $card) {
	var  directionFactor,
		   transform;

if ( event.deltaX && deltaX > deltaThreshold || event.deltaX && deltaX < -1 * deltaThreshold || direction) {
		transform = 'translate(' + directionFactor * -100 + 'vw, 0) rotate(' + directionFactor * -5 + 'deg)';
		$card
       .delay(100)
       .queue(function () {
         $(this).css('transform', transform).dequeue();
       })
       .delay(300)
       .queue(function () {
         $(this).addClass('done').remove();
       });

     //Do something
		console.log('Swipe done. \nCard:', $card, '\nDirection:', directionFactor);

}
	//If the threshold isn't reached, the card goes back to its initial place
  else {
  		transform = 'translate(0, 0) rotate(0)';
  		$card.css({
  			'transform': transform,
  		});
  	}

	}
  function swipeRight(event, $card) {
  	var transform;
  	deltaX = event.deltaX;
  	transform = 'translate(' + deltaX * 0.8 + 'px, 0) rotate(-5deg)';
    //translate the card on swipe
  	$card.css({
  		'transform': transform,
  	});
  }


function swipeLeft(event, $card) {
	var transform;
	deltaX = event.deltaX;
	transform = 'translate(' + deltaX * 0.8 + 'px, 0) rotate(5deg)';
  //translate the card on swipe
	$card.css({
		'transform': transform,
	});
}
// Subscribe to a desired event
$('.js-swiping-card').each(function(index, element) {
	var $card = $(element)

  console.log($card);
		//Add hammer events on element
		hammertime = new Hammer(element);

  //Mobile gesture
	hammertime.on('panleft swipeleft', function(event) {
		swipeLeft(event, $card);
	});
	hammertime.on('panright swiperight', function(event) {
		swipeRight(event, $card);
	});
	hammertime.on('panend', function(event) {
		swipeEnded(event, false, $card);
	});
});
