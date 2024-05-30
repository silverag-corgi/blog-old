$(function() { // HTML要素読み込み待機
	// 検索クエリ取得
	var searchQuery = getSearchQuery();
	$("#search-query").val(searchQuery);

	// 検索データ非同期読み込み(Lunr.js)
	$.getJSON("/blog/search.json").done(function(docs) {
		// インデックス作成
		var index = lunr(function(index) {
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
		
		// 検索クエリ取得済みの場合
		if(searchQuery != "") {
			// 検索実行
			var results = index.search("*"+searchQuery+"*");
			
			// 検索結果表示
			var searchResultsArea = $("#search-results");
			searchResultsArea.empty();
			displaySearchResults(docs, searchResultsArea, results);
		}
	})
	.fail((jqxhr, textStatus, error) => {
		console.error(textStatus + ", " + error);
	});

	// 検索クエリ取得
	function getSearchQuery() {
		var searchQuery = "";
		
		// URLのパラメータを"?"を除外して取得
		var paramsStr = location.search.substring(1);
		
		// パラメータが空文字でない場合
		if(paramsStr != "") {
			// パラメータを区切り文字"&"で分割
			var params = paramsStr.split("&");
			
			// パラメータごとの処理
			for(var paramExpStr of params) {
				var paramExp = paramExpStr.split("=");
				var paramName = paramExp[0];
				var paramValue = paramExp[1];
				
				// パラメタ名が検索クエリの場合
				if(paramName == "search-query") {
					// 検索クエリ取得
					var decodedParamValue = decodeURIComponent(paramValue);
					var replacedParamValue = decodedParamValue.replace(/　/g, "\+").replace(/\++/g, " ");
					searchQuery = replacedParamValue;
					break;
				}
			}
		}
		
		return searchQuery;
	}

	// 検索結果表示
	function displaySearchResults(docs, searchResultsArea, results) {
		var searchResult = "";
		searchResult += "<div class=\"posts\">\r\n";
		
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
		searchResultsArea.append(searchResult);
	}

	// 結果文字列生成(post-for-posts.html参考)
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
