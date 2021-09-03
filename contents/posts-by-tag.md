---
layout: page
title: タグ別記事一覧
description: タグごとの記事をまとめたページ
---

<div>
	{% for tag in site.tags %}
		<div id="_tag_{{ tag[0] }}" class="posts posts-by-tag">
			<h1>
				タグ - <i class="fas fa-fw fa-tag"></i>{{ tag[0] }}
			</h1>

			{% for post in site.posts %}
				{% if post.tags contains tag[0] %}
{% include post-for-posts.html %}
				{% endif %}
			{% endfor %}
		</div>
	{% endfor %}
</div>
