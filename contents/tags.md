---
layout: page
title: タグ一覧
---

<h1>タグ一覧</h1>
<ul class="fa-ul">
	{% assign tags = site.tags | sort %}
	{% for tag in tags %}
		<li>
			<span class="fa-li"><i class="fas fa-tag"></i></span>
			<a href="{{ '/contents/posts-by-tag/#_tag_' | append: tag[0] | relative_url }}">
				{{ tag[0] }} ({{ tag[1].size }})
			</a>
		</li>
	{% endfor %}
</ul>
