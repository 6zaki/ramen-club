$(function() {
	const url = 'https://api.gnavi.co.jp/RestSearchAPI/v3/?'
	if(document.URL.match('/detail.html')) {
		var shopID = new URLSearchParams(window.location.search);
		var params = {
			keyid: '63b545ef16c4d91065ba0e4237f48310',
			id: ''
		}
		params.id = shopID.get('id');
	} else {
		var params = {
			keyid: '63b545ef16c4d91065ba0e4237f48310',
			hit_per_page: 100,
			areacode_m: 'AREAM2822',
			category_s: 'RSFST08008',
		}
	}

	$.getJSON(url, params, function(result) {
		showResult(result)
	})
});

//ぐるなび情報取得
function showResult(result) {
	if(result.rest.length == 0) {
		$('#totalShop').html('<p class="cell small-12">該当件数： 0件</p>');
		return;
	}
	//rest（取得内容）分ループする
	for(var i in result.rest) {
		const id = result.rest[i].id
		const shopName = result.rest[i].name
		const kana = result.rest[i].name_kana
		const tel = result.rest[i].tel
		const shopAddress = result.rest[i].address
		const lat = result.rest[i].latitude
		const long = result.rest[i].longitude
		const prShort = result.rest[i].pr.pr_short
		const prLong = result.rest[i].pr.pr_long
		const open = result.rest[i].opentime
		if(open == "") {
			var openResult = "-"
		} else {
			var openResult = open
		}
		const holiday = result.rest[i].holiday
		if(holiday == "") {
			var holidayResult = "-"
		} else {
			var holidayResult = holiday
		}
		var totalShop = result.total_hit_count

		const image1 = result.rest[i].image_url.shop_image1
		if(image1 == "") {
			var image1Result = '<div class="cell small-6 medium-3"><img src="./image/noimage.png"></div>'
		} else {
			var image1Result = '<div class="cell small-6 medium-3"><img src="' + image1 + '"></div>'
		}
		const image2 = result.rest[i].image_url.shop_image2
		if(image2 == "") {
			var image2Result = ""
		} else {
			var image2Result = '<div class="cell small-6 medium-3"><img src="' + image2 + '"></div>'
		}

		if(document.URL.match('/detail.html')) {
			$('#shopList').append('<div class="shopname-box cell small-12"><h2>' + shopName + '</h2><p class="furi">' + kana + '</p></div><div class="shopimage-box grid-x grid-margin-x grid-margin-y cell small-12">' + image1Result + image2Result + '</div><div class="shoptext-box grid-x grid-margin-x grid-margin-y cell small-12"><p>' + prShort + '</p><p>' + prLong + '</p></div><div class="shopdetail-box cell small-12 medium-10 medium-offset-1"><h3>店舗詳細</h3><table><tr><th>電話番号</th><td>' + tel + '</td><tr><tr><th>開店時間</th><td>' + openResult + '</td></tr><tr><th>定休日</th>	<td>' + holidayResult + '</td></tr><tr><th>所在地</th><td>' + shopAddress + '</td>		</tr><tr><th>地図</th><td><iframe src="http://maps.google.co.jp/maps?q=' + lat + ',' + long + '&output=embed&t=m&z=16&hl=ja" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="500" height="350" class="map"></iframe></td></tr></table></div>');
		} else {
			$('#shopList').append('<section class="cell small-6 medium-3 shoplist-box"><a href="./detail.html?id=' + id + '" class="boxlink"><p class="shopname">' + shopName + '</p><p>' + shopAddress + '</p><p class="open"><span class="small">開店時間</span><br>' + openResult + '</p><p class="holiday"><span class="small">定休日</span><br>' + holidayResult + '</p></a></section>');
		}
	}
		$('#totalShop').html('<p class="cell small-12">該当件数：' + totalShop + '件</p>');
}

//document.getElementById("check").onclick =
function gnaviCheck() {
	const url = 'https://api.gnavi.co.jp/RestSearchAPI/v3/?';
	let word = [];
	const taste = document.checkform.taste;
	const text = document.getElementById('textbox').value;

	for (let i = 0; i < taste.length; i++) {
		if(taste[i].checked) {
			word.push(taste[i].value);
		}
	}

	if(text) {
		word = text;
	}

	const params = {
		keyid: '63b545ef16c4d91065ba0e4237f48310',
		freeword: decodeURIComponent(word),
		freeword_condition: 2,
		hit_per_page: 100,
		areacode_m: 'AREAM2822',
		category_s: 'RSFST08008',
	}
	$("add").ready(function() {
		$.getJSON(url, params)
		.done(function(result) {
			$('.shoplist-box').remove();
			showResult(result);
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
				$('.shoplist-box').remove();
				$('#shopList').append('<section class="shoplist-box resultnone"><p>検索内容に一致する店舗はありませんでした。</p></section>')
				$('#totalShop').html('<p class="cell small-12">該当件数： 0件</p>');
		});
	});
};