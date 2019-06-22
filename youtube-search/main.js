$(document).ready(function() {
	let pageToken = null;
	let isLoadmore = false;
	let getResult = null;

	$('#loading').css('display', 'none');

	$('#keyword').on('input', function(event) {
		// event.preventDefault();
		$('#loading').css('display', 'block');
		const keyword = $('#keyword').val();
		clearTimeout(getResult);
		getResult = setTimeout(function() {
			$.ajax({
				type: 'GET',
				url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + keyword + '&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw',
				success: function(result) {
					const resultElem = result.items.map(function(item) {
						return `
							<div>
								<a
									target="_blank"
									href="https://www.youtube.com/watch?v=${item.id.videoId}"
								>
									${item.snippet.title}
								</a>
							</div>
						`;
					});
					$('#result-list').html(resultElem);
					pageToken = result.nextPageToken;
					$('#loading').css('display', 'none');
				}
			});
		}, 1000);
	});

	$(window).on('scroll', function() {
		if(!isLoadmore && pageToken && $(document).height()
			- ($(window).height() + $(window).scrollTop()) < 500) {
			isLoadmore = true;
			const keyword = $('#keyword').val();
			$('#loading').css('display', 'block');
			$.ajax({
				type: 'GET',
				url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + keyword + '&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=' + pageToken,
				success: function(result) {
					const resultElem = result.items.map(function(item) {
						return `
							<div>
								<a
									target="_blank"
									href="https://www.youtube.com/watch?v=${item.id.videoId}"
								>
									${item.snippet.title}
								</a>
							</div>
						`;
					});
					$('#result-list').append(resultElem);
					pageToken = result.nextPageToken;
					$('#loading').css('display', 'none');
					isLoadmore = false;
				}
			});
		}
	});
});