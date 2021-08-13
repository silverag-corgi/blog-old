---
layout: page
title: アーカイブ
---

<h1>アーカイブ(年月別)</h1>

{% comment %}
	年月別記事数カウント
{% endcomment %}
{% assign date_format = "%Y/%m" %}
{% assign posts_by_date = "" | split: "" %}
{% assign this_date = "" %}
{% assign prev_date = "" %}
{% assign next_date = "" %}
{% for post in site.posts %}
	{% capture this_date %}{{ post.date | date: date_format }}{% endcapture %}
	{% capture prev_date %}{{ post.previous.date | date: date_format }}{% endcapture %}
	{% capture next_date %}{{ post.next.date | date: date_format }}{% endcapture %}
	
	{% if forloop.first %}
		{% assign count = 0 %}
	{% endif %}
	
	{% assign count = count | plus: 1 %}
	
	{% if forloop.last or this_date != prev_date %}
		{% assign item = "" | split: "" | push: this_date | push: count %}
		{% assign posts_by_date = posts_by_date | push: item %}
		{% assign count = 0 %}
	{% endif %}
{% endfor %}

{% comment %}
	年月別記事表示
{% endcomment %}
<ul class="fa-ul">
	{% assign index_of_posts_by_date = 0 %}
	{% assign this_date = "" %}
	{% assign prev_date = "" %}
	{% assign next_date = "" %}
	{% for post in site.posts %}
		{% capture this_date %}{{ post.date | date: date_format }}{% endcapture %}
		{% capture prev_date %}{{ post.previous.date | date: date_format }}{% endcapture %}
		{% capture next_date %}{{ post.next.date | date: date_format }}{% endcapture %}
		
		{% if forloop.first %}
			<li>
				<span class="fa-li"><i class="fa fa-fw fa-calendar-alt"></i></span>
				<a href="{{ '/contents/archive/#_date_' | append: this_date | relative_url }}">
					{{ this_date }} ({{ posts_by_date[index_of_posts_by_date][1] }})
					{% assign index_of_posts_by_date = index_of_posts_by_date | plus: 1 %}
				</a>
			</li>
			<li>
				<ul id="_date_{{ this_date }}" class="fa-ul posts-by-date">
		{% endif %}
		
		<li>
			<span class="fa-li"><i class="fas fa-fw fa-newspaper"></i></span>
			<time>{{ post.date | date: '%Y/%m/%d %H:%M:%S' }}</time>
			<a href="{{ post.url | relative_url }}">{{ post.title }}</a>
		</li>
		
		{% if forloop.last %}
				</ul>
			</li>
		{% elsif this_date != prev_date %}
				</ul>
			</li>
			<li>
				<span class="fa-li"><i class="fa fa-fw fa-calendar-alt"></i></span>
				<a href="{{ '/contents/archive/#_date_' | append: prev_date | relative_url }}">
					{{ prev_date }} ({{ posts_by_date[index_of_posts_by_date][1] }})
					{% assign index_of_posts_by_date = index_of_posts_by_date | plus: 1 %}
				</a>
			</li>
			<li>
				<ul id="_date_{{ prev_date }}" class="fa-ul posts-by-date">
		{% endif %}
	{% endfor %}
</ul>

<h1>アーカイブ(タグ別)</h1>
<ul class="fa-ul">
	{% for tag in site.tags %}
		<li>
			<span class="fa-li"><i class="fas fa-fw fa-tag"></i></span>
			<a href="{{ '/contents/archive/#_tag_' | append: tag[0] | relative_url }}">
				{{ tag[0] }} ({{ tag[1].size }})
			</a>
		</li>
		<li>
			<ul id="_tag_{{ tag[0] }}" class="fa-ul posts-by-tag">
				{% for post in site.posts %}
					{% if post.tags contains tag[0] %}
						<li>
							<span class="fa-li"><i class="fas fa-fw fa-newspaper"></i></span>
							<time>{{ post.date | date: '%Y/%m/%d %H:%M:%S' }}</time>
							<a href="{{ post.url | relative_url }}">{{ post.title }}</a>
						</li>
					{% endif %}
				{% endfor %}
			</ul>
		</li>
	{% endfor %}
</ul>
