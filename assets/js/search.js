$(function() { // HTML要素読み込み待機

	var index;
	var docs;

	// 検索データ非同期読み込み(Lunr.js)
	docs = $.getJSON("/contents/search.json").done(function(docs) {
		// インデックス作成
		index = lunr(function(index) {
			// 項目作成
//			index.use(lunr.multiLanguage("en", "jp")); // 課題(issues#45)によりマルチ言語は未対応
			index.use(lunr.ja);
			index.ref("id",        { boost:  0 });
			index.field("url",     { boost:  0 });
			index.field("title",   { boost: 30 });
			index.field("date",    { boost:  0 });
			index.field("update",  { boost:  0 });
			index.field("tags",    { boost: 20 });
			index.field("tagsurl", { boost:  0 });
			index.field("image",   { boost:  0 });
			index.field("noimage", { boost:  0 });
			index.field("content", { boost: 10 });
			index.field("excerpt", { boost:  0 });
			
			// 文書登録
			for(var doc of docs) {
				index.add(doc);
			}
		});
	})
	.fail((jqxhr, textStatus, error) => {
		var err = textStatus + ", " + error;
		console.error("検索データ読み込み失敗：", err);
	});

	// 送信時の読み込みなし
	$("#search-form").submit(function() {
		event.preventDefault();
	});

	// 検索(キー入力時)
	$("#search-form").keyup(function() {
		// 検索クエリによる検索
		var searchQuery = $("#search-query").val();
		var results = index.search("*"+searchQuery+"*");
//		console.log(results);
		
		// 記事カードへ検索結果表示
		var searchResultArea = $(".post-card");
		searchResultArea.empty();
		displaySearchResults(searchResultArea, results);
		
		// 記事ナビカード非表示
		var disusedArea = $(".post-navi-card");
		disusedArea.remove();
	});

	// 検索結果表示
	function displaySearchResults(searchResultArea, results) {
		docs.then(function(docs) {
			var searchResult = "";
			searchResult += "<div class=\"posts\">\r\n";
			searchResult += "    <h1>検索結果</h1>\r\n";
			
			if(results.length == 0) {
				searchResult += generateSearchResult(null);
			}
			else {
				for(var result of results) {
					var item = docs[result.ref];
					searchResult += generateSearchResult(item);
				}
			}
			
			searchResult += "</div>\r\n";
			searchResultArea.append(searchResult);
		});
	}
	
	// 結果文字列生成(post-for-multiple.html参考)
	function generateSearchResult(item) {
		var searchResult = "";
		
		if(item === null) {
			searchResult += "    <div class=\"post\">\r\n";
			searchResult += "        検索結果なし\r\n";
			searchResult += "    </div>\r\n";
		}
		else {
			searchResult += "    <div class=\"post\">\r\n";
			
			// 記事左(画像)
			searchResult += "        <div class=\"post-left\">\r\n";
			if(item.image) {
			searchResult += "            <a class=\"post-image\" href=\""+item.url+"\">\r\n";
			searchResult += "                <img src=\""+item.image+"\" alt=\"記事ヘッダ画像\">\r\n";
			searchResult += "            </a>\r\n";
			}
			else {
			searchResult += "            <a class=\"post-noimage\" href=\""+item.url+"\">\r\n";
			searchResult += "                <img src=\""+item.noimage+"\" alt=\"記事ヘッダ画像なし\">\r\n";
			searchResult += "            </a>\r\n";
			}
			searchResult += "        </div>\r\n";
			
			// 記事右(タイトル、メタ、説明、など)
			searchResult += "        <div class=\"post-right\">\r\n";
			searchResult += "            <h2 class=\"post-title\">\r\n";
			searchResult += "                <a href=\""+item.url+"\">\r\n";
			searchResult += "                    <i class=\"fas fa-fw fa-newspaper\"></i>"+item.title+"\r\n";
			searchResult += "                </a>\r\n";
			searchResult += "            </h2>\r\n";
			
			searchResult += "            <div class=\"post-meta\">\r\n";
			searchResult += "                <ul class=\"post-time\">\r\n";
			searchResult += "                    <li>\r\n";
			searchResult += "                        <i class=\"fa fa-fw fa-calendar-alt\"></i>\r\n";
			searchResult += "                        <span><time datetime=\""+item.date+"\">"+item.date+"</time></span>\r\n";
			searchResult += "                    </li>\r\n";
			if(item.update) {
			searchResult += "                    <li>\r\n";
			searchResult += "                        <i class=\"fa fa-fw fa-edit\"></i>\r\n";
			searchResult += "                        <span><time datetime=\""+item.update+"\">"+item.update+"</time></span>\r\n";
			searchResult += "                    </li>\r\n";
			}
			searchResult += "                </ul>\r\n";
			searchResult += "                <ul class=\"post-tag\">\r\n";
			for(var i in item.tags) {
			searchResult += "                    <li>\r\n";
			searchResult += "                        <i class=\"fas fa-fw fa-tag\"></i>\r\n";
			searchResult += "                        <a href=\""+item.tagsurl[i]+"\">\r\n";
			searchResult += "                            "+item.tags[i]+"";
			searchResult += "                        </a>\r\n";
			searchResult += "                    </li>\r\n";
			}
			searchResult += "                </ul>\r\n";
			searchResult += "            </div>\r\n";
			
			searchResult += "            <div class=\"post-desc\">\r\n";
			searchResult += "                <p>\r\n";
			searchResult += "                    "+item.excerpt+"\r\n";
			searchResult += "                </p>\r\n";
			searchResult += "            </div>\r\n";
			
			searchResult += "            <div class=\"post-reading\">\r\n";
			searchResult += "                <a class=\"page-link\" href=\""+item.url+"\">記事を読む</a>\r\n";
			searchResult += "            </div>\r\n";
			searchResult += "        </div>\r\n";
			
			searchResult += "    </div>\r\n";
		}
		
		return searchResult;
	}
});
