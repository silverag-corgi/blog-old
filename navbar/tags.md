---
layout: page
title: タグ一覧
---

<div class="page-content wc-container">
	<h1>タグ一覧</h1>
	<ul class="fa-ul">
		{% assign tags = site.tags | sort %}
		{% for tag in tags %}
		<li>
			<span class="fa-li"><i class="fas fa-tag"></i></span>
			<a href="{{ '/tag/' | append: tag[0] | relative_url }}" data-toggle="tooltip" data-placement="right" title="{{ tag[1].size }}">
				{{ tag[0] }}
			</a>
		</li>
		{% endfor %}
	</ul>
</div>
