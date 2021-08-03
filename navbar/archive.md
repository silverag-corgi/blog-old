---
layout: page
title: アーカイブ
---

<div class="page-content wc-container">
	<h1>アーカイブ</h1>
	{% assign this_ym = "" %}
	{% assign prev_ym = "" %}
	{% assign next_ym = "" %}
	{% for post in site.posts %}
		{% capture this_ym %}{{ post.date | date: "%Y" }}{% endcapture %}
		{% capture prev_ym %}{{ post.previous.date | date: "%Y" }}{% endcapture %}
		{% capture next_ym %}{{ post.next.date | date: "%Y" }}{% endcapture %}
		
		{% if forloop.first %}
			<h4>{{ this_ym }}</h4>
			<ul class="posts fa-ul">
		{% endif %}
		
		<li>
			<span class="fa-li"><i class="fas fa-newspaper"></i></span>
			<time>{{ post.date | date: '%Y/%m/%d %H:%M:%S' }}</time>
			<a href="{{ post.url | relative_url }}">{{ post.title }}</a>
		</li>
		
		{% if forloop.last %}
			</ul>
		{% elsif this_ym != prev_ym %}
			</ul>
			<h4>{{ prev_ym }}</h4>
			<ul class="posts fa-ul">
		{% endif %}
	{% endfor %}
</div>
