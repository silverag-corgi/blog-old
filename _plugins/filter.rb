module Jekyll
	module Filter
		require "uri"
		
		# タグ配列を人気のタグ配列に変換する(記事数：降順、タグ名：小文字昇順)
		# 使用例：{% assign tags = site.tags | convert_into_popular_tags %}
		def convert_into_popular_tags(tags)
			popular_tags = tags.sort_by { | item, posts | [-posts.size, item.downcase] }
			return popular_tags
		end
		
		# 配列(カテゴリやタグなど)を名前でソートする
		# 使用例：{% assign tags = site.tags | sort_array_by_name: "ASC" %}
		def sort_array_by_name(array, order="ASC")
			array_sorted_by_name = array.sort_by { | item, posts | item.downcase }
			
			order = order.upcase
			case order
			when "DESC"
				array_sorted_by_name_with_order = array_sorted_by_name.reverse
			when "ASC"
				array_sorted_by_name_with_order = array_sorted_by_name
			else
				array_sorted_by_name_with_order = []
			end
			
			return array_sorted_by_name_with_order
		end
		
		# 配列(カテゴリやタグなど)を記事数でソートする
		# 使用例：{% assign tags = site.tags | sort_array_by_posts_count: "ASC" %}
		def sort_array_by_posts_count(array, order="ASC")
			array_sorted_by_posts_count = array.sort_by { | item, posts | posts.count }
			
			order = order.upcase
			case order
			when "DESC"
				array_sorted_by_posts_count_with_order = array_sorted_by_posts_count.reverse
			when "ASC"
				array_sorted_by_posts_count_with_order = array_sorted_by_posts_count
			else
				array_sorted_by_posts_count_with_order = []
			end
			
			return array_sorted_by_posts_count_with_order
		end
		
		# URLからページナビ配列を生成する
		# 使用例：{% assign page_navi_array = 
		#             page.url | generate_page_navi: page.categories, site.data.words %}
		#         {% assign page_name = page_navi_array[i][0] %}
		#         {% assign page_path = page_navi_array[i][1] %}
		def generate_page_navi(url, page_categories, data_words)
			# 1.URLを"/"ごとに分割し、ページ配列に変換する
			url_temp = url
			url_temp = url_temp.gsub("index.html","")
			url_temp = url_temp.gsub(".html","")
			pages = url_temp.split("/")
			
			# 2.ページ配列のサイズが0の場合、ホームを表す空白文字を追加する
			if pages.size == 0
				pages.push("")
			end
			
			# 3.ページ配列の要素ごとにページナビ配列を作成する
			prev_path = ""
			this_path = ""
			is_category = false
			cat_root_path = ""
			page_navi_array = Array.new(0) { Array.new(2,"") }
			pages.each_with_index do | page, index |
				prev_path = this_path
				this_path = URI.decode_www_form_component(this_path + page + "/")
				page_eng = URI.decode_www_form_component(page)
				page_navi_element = Array.new(2)
				
 				if page == "page"        # ページがpageの場合
					next
				elsif page == "contents" # ページがcontentsの場合
					next
				else                     # ページが上記以外の場合
					# 3-1.ページ名(英名)が単語帳に登録済みの場合、和名をページ名(和名)に設定する
					page_jpn = ""
					for word in data_words
						if page_eng == word["eng"]
							page_jpn = word["jpn"]
							break
						end
					end
					
					# 3-2.ページ名(和名)が単語帳に
					#     未登録の場合はページ名(英名)をページナビ要素に設定し、
					#     登録済みの場合はページ名(和名)をページナビ要素に設定する
					if page_jpn == ""
						page_navi_element[0] = page_eng
					else
						page_navi_element[0] = page_jpn
					end
					
					# 3-3.ページ名(英名)がカテゴリの場合、カテゴリフラグを真に設定し、
					#     初回のみカテゴリルートパスを設定する
					if page_categories != nil
						for category in page_categories
							if page_eng == category
								is_category = true
								if cat_root_path == ""
									cat_root_path = prev_path
								end
							end
						end
					end
					
					# 3-4.カテゴリフラグが
					#     偽の場合は現在のパスをページナビ要素に設定し、
					#     真の場合は当該カテゴリのパスをページナビ要素に設定する
					if is_category == false
						page_navi_element[1] = this_path
					else
						page_navi_element[1] = URI.decode_www_form_component(cat_root_path + page + "/")
					end
					
					# 3-3.ページナビ配列にページナビ要素を追加する
					page_navi_array.push(page_navi_element)
				end
			end
			
			return page_navi_array
		end
		
		# 読了時間を取得する
		# 使用例：{{ include.post-obj.content | strip_html | strip_newlines | replace: "	", "" | xml_escape | get_reading_time }}
		def get_reading_time(page_content)
			char_per_min = 400
			
			char = page_content.size;
			minutes = (char/char_per_min).floor
			
			return minutes > 0 ? "約#{minutes}分" : "1分未満"
		end
		
	end
end

Liquid::Template.register_filter(Jekyll::Filter)
