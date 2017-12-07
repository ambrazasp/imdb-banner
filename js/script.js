$(document).ready(function(){
	

	var movieArray = ["The Hitman's Bodyguard", 
							"It", 
							"Annabelle: Creation", 
							"Logan Lucky", 
							"Dunkirk", 
							"Guardians of the Galaxy Vol. 2",
							"Sing"];
	$(".movies").slick({
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
  		autoplay: true,
  		autoplaySpeed: 10000,
  		draggable: false,
  		arrows: true,
        responsive: [
	    {
	      breakpoint: 360,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        infinite: true,
	        dots: true,
  			autoplay: false,
  			draggable: true,
  			arrows: false,
	      }
	    }]
    });
	function getMovies() {
		for (i = 0; i < movieArray.length; i++) {
			$.getJSON('https://theimdbapi.org/api/find/movie?title=' + encodeURI(movieArray[i])).then(function(response) {
				movie = response[0];
				var str = $('\
					<div class="movie">\
						<div>\
				    		<div class="image"><img src="'+movie.poster.thumb+'"/></div>\
				    		<div class="info">\
					    		<div class="title">'+movie.title+'</div>\
						      	<div class="genre">'+movie.genre+'</div>\
						      	<a href="'+movie.url.url+'"><div class="more">more</div></a>\
				    		</div>\
				    	</div>\
				      	<div>\
				      		<div class="rating">'+movie.rating+'</div>\
					      	<div class="description">'+movie.description+'</div>\
				      	</div>\
					</div>');
				$(".movies").slick('slickAdd', str);
			});
		}
	}	
	getMovies();

	$('.movies').on('reInit', function() {
		var count = $('.movie').not('.slick-cloned').length;
		var sliderbarWidth = $('.slick-sliderbar').width();
		$('.slick-sliderbar .bar').width((sliderbarWidth - 40) / count * 2);

		$('.slick-prev').click(function(){
			moveBar();
		});
		$('.slick-next').click(function(){
			moveBar();
		});
		if (count % 2 != 0)
			$('.movie:nth-of-type(2n+1)').not('.slick-cloned').css('border-right','1px solid #797977');
	});

	function moveBar() {
			var count = $('.movie').not('.slick-cloned').length;
			var current = $('.movies').slick('slickCurrentSlide');
			if (current >= count)
				current = 0;

			if ((current+1 == count) && (movieArray.length%2!=0))
				current -= 1;

			var sliderbarWidth = $('.slick-sliderbar').width();
			sliderbarWidth = sliderbarWidth - 40;
			$('.slick-sliderbar .bar').css('margin-left', 20 + sliderbarWidth / count * current);
	}

	$('.movies').on('afterChange', function() {
		moveBar();
	});

	
	

}); 
