
var deltaX = 0;
var deltaY = 0;

var index= 0
var deltaThreshold = 100
function postItem(id) {
		console.log("trying to like the food" + id);
        $.ajax({
            type: "POST",
            url: "/food/" + id + "/like",
			timeout: 2000,
			success: function(data){
				console.log(data)
				console.log("got AJAX");
			}
        });

    }//postItem()

function swipeEnded(event, direction, $card) {
	var  directionFactor,
		   transform;

if ( event.deltaX && deltaX > deltaThreshold || event.deltaX && deltaX < -1 * deltaThreshold || direction) {
		transform = 'translate(' + directionFactor * -100 + 'vw, 0) rotate(' + directionFactor * -5 + 'deg)';
				var id= $(`.card-id${index}`).text();
				postItem(id);
				index++;
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
