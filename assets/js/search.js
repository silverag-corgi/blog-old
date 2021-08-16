$(function() { // HTML要素読み込み待機
	
	var index;
	var docs;

	// 検索データ読み込み(Lunr.js)
	docs = $.getJSON("/contents/search.json").done(function(docs) {
		// インデックス作成
		index = lunr(function(index) {
			// 項目作成
//			index.use(lunr.multiLanguage("en", "jp")); // 課題(issues#45)によりマルチ言語は未対応
			index.use(lunr.ja);
			index.ref("id");
			index.field("url");
			index.field("title", { boost: 10 });
			index.field("date");
			index.field("update");
			index.field("tags");
			index.field("tagsurl");
			index.field("image");
			index.field("noimage");
			index.field("content");
			
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
	$("#search-form").submit(function(){
		event.preventDefault();
	});

	// 検索(キー入力時)
	$("#search-form").on('keyup', function(){
		// 検索クエリによる検索
		var searchQuery = $("#search-query").val();
		var results = index.search("*"+searchQuery+"*");
		
		// 検索結果表示
		displaySearchResults(results);
	});

	// 検索結果表示
	function displaySearchResults(results) {
		var searchResults = $("#search-results");
		
		searchResults.empty();
		
		docs.then(function(docs){
			if(results.length) {
				for(var result of results) {
					var item = docs[result.ref];
					var searchResult = generateSearchResult(item);
					searchResults.append(searchResult);
				}
			}
			else {
				var searchResult = "";
				searchResult += "<div class=\"post\">";
				searchResult += "    検索結果なし";
				searchResult += "</div>";
				searchResults.append(searchResult);
			}
		});
	}
	
	// 結果文字列生成(post-for-multiple.html参考)
	function generateSearchResult(item) {
		var searchResult = "";
		
		searchResult += "<div class=\"post\">";
		
		// 記事左(画像)
		searchResult += "    <div class=\"post-left\">";
		if(item.image) {
		searchResult += "        <a class=\"post-image\" href=\""+item.url+"\">";
		searchResult += "            <img src=\""+item.image+"\" alt=\"記事ヘッダ画像\">";
		searchResult += "        </a>";
		}
		else {
		searchResult += "        <a class=\"post-noimage\" href=\""+item.url+"\">";
		searchResult += "            <img src=\""+item.noimage+"\" alt=\"記事ヘッダ画像なし\">";
		searchResult += "        </a>";
		}
		searchResult += "    </div>";
		
		// 記事右(タイトル、メタ、説明、など)
		searchResult += "    <div class=\"post-right\">";
		searchResult += "        <h2 class=\"post-title\">";
		searchResult += "            <a href=\""+item.url+"\">";
		searchResult += "                <i class=\"fas fa-fw fa-newspaper\"></i>"+item.title+"";
		searchResult += "            </a>";
		searchResult += "        </h2>";
		
		searchResult += "        <div class=\"post-meta\">";
		searchResult += "            <ul class=\"post-time\">";
		searchResult += "                <li>";
		searchResult += "                    <i class=\"fa fa-fw fa-calendar-alt\"></i>";
		searchResult += "                    <span><time datetime=\""+item.date+"\">"+item.date+"</time></span>";
		searchResult += "                </li>";
		if(item.update) {
		searchResult += "                <li>";
		searchResult += "                    <i class=\"fa fa-fw fa-edit\"></i>";
		searchResult += "                    <span><time datetime=\""+item.update+"\">"+item.update+"</time></span>";
		searchResult += "                </li>";
		}
		searchResult += "            </ul>";
		searchResult += "            <ul class=\"post-tag\">";
		for(var i in item.tags) {
		searchResult += "                <li>";
		searchResult += "                    <i class=\"fas fa-fw fa-tag\"></i>";
		searchResult += "                    <a href=\""+item.tagsurl[i]+"\">";
		searchResult += "                        "+item.tags[i]+"";
		searchResult += "                    </a>";
		searchResult += "                </li>";
		}
		searchResult += "            </ul>";
		searchResult += "        </div>";
		
		searchResult += "        <div class=\"post-desc\">";
		searchResult += "            <p>";
		searchResult += "                "+item.content+"";
		searchResult += "            </p>";
		searchResult += "        </div>";
		
		searchResult += "        <div class=\"post-reading\">";
		searchResult += "            <a class=\"page-link\" href=\""+item.url+"\">記事を読む</a>";
		searchResult += "        </div>";
		searchResult += "    </div>";
		
		searchResult += "</div>";
		
		return searchResult;
	}
});
