// ナビ(トップ、ボトム)表示切替
$(function() {
	// ナビトップ
	toggleNav(".fixed-top", true);
	
	// ナビボトム
	toggleNav(".fixed-bottom", false);
	
	// ナビ表示切替
	function toggleNav(className, isTop) {
		var navObj = $(className);
		var startPosition = 0;
		
		$(window).on("scroll", function () {
			var currentPosition = $(this).scrollTop();
			
			 // ナビトップの場合または、ナビボトムかつモバイル画面の場合
			if(isTop == true && currentPosition >= 86 || isTop == false && isMobileScreen() == true) {
				if(currentPosition <= startPosition) {
					navObj.css({ "display": "block" });
				} else {
					navObj.css({ "display": "none" });
				}
			}
			
			startPosition = currentPosition;
		});
	}
});

// ページトップ
$(function() {
	var buttonObj = $(".page-top");
	
	// ページトップへスクロール(1000ms)
	buttonObj.click(function () {
		$("body,html").animate({
			scrollTop: 0
		}, 1000);
		return false;
	});
});

// CSSクラス適用切替
function toggleCssClass(elementId, className) {
	var elementObj = $(elementId);
	
	if(elementObj.hasClass(className)) {
		elementObj.removeClass(className);
	}
	else {
		elementObj.addClass(className);
	}
	
	return;
}

// モバイル画面判定
function isMobileScreen() {
	if(window.matchMedia && window.matchMedia("(max-width: 991px)").matches) {
		return true;
	} else {
		return false;
	}
}
