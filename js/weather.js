$(function() {
	var api_key = 'af98330d4686156e1481f87c5b86e7d7';
	var city = 'Tsukuba';
	var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',jp&units=metric&appid=' + api_key;

	var request = new XMLHttpRequest();
	request.open("GET", url,　true);

	request.onload = function (){
		var data = JSON.parse(this.responseText);
		var img = document.createElement('img');
		img.src = 'http://openweathermap.org/img/w/'+data.weather[0].icon+'.png';
		img.alt = data.weather[0].main;
		img.width = "50";

		var tempMax = Math.round(data.main.temp);

		document.getElementById('weatherIcon').appendChild(img);
		document.getElementById('temp').innerHTML = tempMax + '℃';

	}
	request.send(null);
});