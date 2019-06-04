$( document ).ready(function() {
	$('textarea').on("input", () => {
		const inputLength = $('textarea').val().length;
		$('#remain').text(200 - inputLength);
	});
});