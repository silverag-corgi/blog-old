// ナビ(トップ、ボトム)表示切替
$(function() {
	// ナビトップ
	toggleNav(".fixed-top", true);
	
	// ナビボトム
	toggleNav(".fixed-bottom", false);
	
	// ナビ表示切替
	function toggleNav(className, isTop) {
		var navObj = $(className);
		var heightOfNav = navObj.innerHeight();
		var startPosition = 0;
		
		$(window).on("scroll", function () {
			var currentPosition = $(this).scrollTop();
			
			if(isTop == true) {
				if (currentPosition <= startPosition) {
					// 上にスクロールした場合、ナビを表示する
					navObj.css({ "top": 0 });
				} else {
					// 下にスクロールした場合、ナビを非表示する
					navObj.css({ "top": "-" + heightOfNav + "px" });
				}
			}
			else {
				if (currentPosition <= startPosition) {
					// 上にスクロールした場合、ナビを表示する
					navObj.css({ "bottom": 0 });
				} else {
					// 下にスクロールした場合、ナビを非表示する
					navObj.css({ "bottom": "-" + heightOfNav + "px" });
				}
			}
			
			startPosition = currentPosition;
		});
		
		$(window).trigger("scroll");
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
