$(function(){
	document.getElementById("acordion").style.visibility = "hidden";
	let clickCount = true;
	$('#searchbtn').click(function(){
		if(clickCount) {
			$('#acordion').css({
				visibility: 'visible'
			});
		} else {
			$('#acordion').css({
				visibility: 'hidden'
			});
		}
		clickCount = !clickCount;
	});
	$('#check').click(function() {
		if(!clickCount) {
			$('#acordion').css({
				visibility: 'hidden'
			});
			clickCount = !clickCount;
		}
	});
	$('#word').click(function() {
		if(!clickCount) {
			$('#acordion').css({
				visibility: 'hidden'
			});
			clickCount = !clickCount;
		}
	});
});