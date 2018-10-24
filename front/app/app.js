
var deltaX = 0;
var deltaY = 0;

var index= $(".stack").children().length-1
var deltaThreshold = 100
function swipeEnded(event, direction, $card) {
	var  directionFactor,
		   transform;

if ( event.deltaX && deltaX > deltaThreshold || event.deltaX && deltaX < -1 * deltaThreshold || direction) {
		transform = 'translate(' + directionFactor * -100 + 'vw, 0) rotate(' + directionFactor * -5 + 'deg)';

				index--;
       	$card.delay(100)
       	$card.queue(function () {
         $(this).css('transform', transform).dequeue();
       })
      	$card .delay(300)
      	$card .queue(function () {
         $(this).addClass('done').remove();
       });




}
  else {
  		transform = 'translate(0, 0) rotate(0)';
  		$card.css({
  			'transform': transform,
  		});
  	}

	}
  function swipeRight(event, $card) {

  	var transform;
		var para = $(`.card-id${index}`).text();
		console.log(para);

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
