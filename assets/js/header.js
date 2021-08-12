// ナビ
$(function() {
	var eleNav = $('nav');
	
	$(window).scroll(function() {
		if ($(document).scrollTop() > 50) {
			eleNav.addClass('shrink');
		} else {
			eleNav.removeClass('shrink');
		}
	});

	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});
});

// ページトップ
$(function() {
	var eleBtn = $('#page-top-card');
	
	// ボタン表示(スクロール50px以上)
	eleBtn.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			eleBtn.fadeIn();
		} else {
			eleBtn.fadeOut();
		}
	});
	
	// ページトップへスクロール(1000ms)
	eleBtn.click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
		return false;
	});
});
