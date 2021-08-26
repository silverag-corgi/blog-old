// ナビ
$(function () {
	var headerObj = $("header");
	var heightOfHeader = headerObj.innerHeight();
	var startPosition = 0;
	
	$(window).on("scroll", function () {
		var currentPosition = $(this).scrollTop();
		
		if (currentPosition <= startPosition) {
			// 上にスクロールした場合、ヘッダーを表示する
			headerObj.css({ "top": 0 });
		} else {
			// 下にスクロールした場合、ヘッダーを非表示する
			headerObj.css({ "top": "-" + heightOfHeader + "px" });
		}
		
		startPosition = currentPosition;
	});
	
	$(window).trigger("scroll");
});

// ツールチップ
$(function() {
	$("[data-toggle='tooltip']").tooltip();
});

// ページトップ
$(function() {
	var buttonObj = $("#page-top-card");
	
	// ボタン表示(スクロール50px以上)
	buttonObj.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			buttonObj.fadeIn();
		} else {
			buttonObj.fadeOut();
		}
	});
	
	// ページトップへスクロール(1000ms)
	buttonObj.click(function () {
		$("body,html").animate({
			scrollTop: 0
		}, 1000);
		return false;
	});
});

// CSSクラス切り替え
function toggleCssClass(elementId, cssClassName) {
	var elementObj = $(elementId);
	
	if(elementObj.hasClass(cssClassName)) {
		elementObj.removeClass(cssClassName);
	}
	else {
		elementObj.addClass(cssClassName);
	}
	
	return;
}
