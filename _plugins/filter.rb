module Jekyll
	module Filter
		
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
		
	end
end

Liquid::Template.register_filter(Jekyll::Filter)
