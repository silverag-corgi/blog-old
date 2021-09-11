---
layout: page
title: アーカイブ
description: 全ての記事を年月別やタグ別でまとめたページ
---

<h1>
	<i class="fas fa-fw fa-book"></i>アーカイブ
</h1>

<h2>
	<i class="fas fa-fw fa-calendar-alt"></i>年月(降順)
</h2>

{% comment %}
	年月別記事数カウント
{% endcomment %}
{% assign date_format = "%Y/%m" %}
{% assign num_of_posts = 0 %}
{% assign num_of_posts_by_date = "" | split: "" %}
{% assign this_date = "" %}
{% assign prev_date = "" %}
{% assign next_date = "" %}
{% for post in site.posts %}
	{% assign this_date = post.date | date: date_format %}
	{% assign prev_date = post.previous.date | date: date_format %}
	{% assign next_date = post.next.date | date: date_format %}
	
	{% assign num_of_posts = num_of_posts | plus: 1 %}
	
	{% if this_date != prev_date %}
		{% assign num_of_posts_of_date = "" | split: "" | push: this_date | push: num_of_posts %}
		{% assign num_of_posts_by_date = num_of_posts_by_date | push: num_of_posts_of_date %}
		{% assign num_of_posts = 0 %}
	{% endif %}
{% endfor %}

{% comment %}
	年月別記事表示
{% endcomment %}
<ul class="fa-ul">
	{% assign index = 0 %}
	{% assign this_date = "" %}
	{% assign prev_date = "" %}
	{% assign next_date = "" %}
	{% for post in site.posts %}
		{% assign this_date = post.date | date: date_format %}
		{% assign prev_date = post.previous.date | date: date_format %}
		{% assign next_date = post.next.date | date: date_format %}
		
		{% if this_date != next_date %}
			<li>
				<span class="fa-li"><i class="fa fa-fw fa-calendar-alt"></i></span>
				
				<input type="checkbox" class="accordion-checkbox" id="accordion-checkbox-{{ index }}">
				<label class="accordion-label" for="accordion-checkbox-{{ index }}">
					{{ num_of_posts_by_date[index][0] }} ({{ num_of_posts_by_date[index][1] }})
				</label>
				{% assign index = index | plus: 1 %}
				
				<ul class="fa-ul accordion-content">
		{% endif %}
		
					<li>
						<span class="fa-li"><i class="fas fa-fw fa-newspaper"></i></span>
						<time>{{ post.date | date: '%Y/%m/%d %H:%M:%S' }}</time>
						<a href="{{ post.url | relative_url }}">{{ post.title }}</a>
					</li>
		
		{% if this_date != prev_date %}
				</ul>
			</li>
		{% endif %}
	{% endfor %}
</ul>

<h2>
	<i class="fas fa-fw fa-tag"></i>タグ名(昇順)
</h2>

<ul class="fa-ul">
	{% assign tags = site.tags | sort_array_by_name %}
	{% for tag in tags %}
		<li>
			<span class="fa-li"><i class="fas fa-fw fa-tag"></i></span>
			
			<input type="checkbox" class="accordion-checkbox" id="accordion-checkbox-{{ index }}">
			<label class="accordion-label" for="accordion-checkbox-{{ index }}">
				{{ tag[0] }} ({{ tag[1].size }})
			</label>
			{% assign index = index | plus: 1 %}
			
			<ul class="fa-ul accordion-content">
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
