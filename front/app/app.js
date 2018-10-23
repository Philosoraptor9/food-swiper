
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


}
  else {
  		transform = 'translate(0, 0) rotate(0)';
  		$card.css({
  			'transform': transform,
  		});
  	}

	}
  function swipeRight(event, $card) {
		console.log(event);
  	var transform;
  	deltaX = event.deltaX;
  	transform = 'translate(' + deltaX * 0.8 + 'px, 0) rotate(-5deg)';
  	$card.css({
  		'transform': transform,
  	});
  }


function swipeLeft(event, $card) {
	var transform;
	deltaX = event.deltaX;
	transform = 'translate(' + deltaX * 0.8 + 'px, 0) rotate(5deg)';
	$card.css({
		'transform': transform,
	});
}
$('.js-swiping-card').each(function(index, element) {
	var $card = $(element)

  console.log($card);
		hammertime = new Hammer(element);

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
