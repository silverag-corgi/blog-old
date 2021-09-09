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
	{% assign accordion_checkbox = 0 %}
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
				
				<input type="checkbox" class="accordion-checkbox" id="accordion-checkbox-{{ accordion_checkbox }}">
				<label class="accordion-label" for="accordion-checkbox-{{ accordion_checkbox }}">
					{{ this_date }} ({{ posts_by_date[index_of_posts_by_date][1] }})
				</label>
				{% assign accordion_checkbox = accordion_checkbox | plus: 1 %}
				{% assign index_of_posts_by_date = index_of_posts_by_date | plus: 1 %}
				
				<ul class="fa-ul accordion-content">
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
				
				<input type="checkbox" class="accordion-checkbox" id="accordion-checkbox-{{ accordion_checkbox }}">
				<label class="accordion-label" for="accordion-checkbox-{{ accordion_checkbox }}">
					{{ prev_date }} ({{ posts_by_date[index_of_posts_by_date][1] }})
				</label>
				{% assign accordion_checkbox = accordion_checkbox | plus: 1 %}
				{% assign index_of_posts_by_date = index_of_posts_by_date | plus: 1 %}
				
				<ul class="fa-ul accordion-content">
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
			
			<input type="checkbox" class="accordion-checkbox" id="accordion-checkbox-{{ accordion_checkbox }}">
			<label class="accordion-label" for="accordion-checkbox-{{ accordion_checkbox }}">
				{{ tag[0] }} ({{ tag[1].size }})
			</label>
			{% assign accordion_checkbox = accordion_checkbox | plus: 1 %}
			
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
