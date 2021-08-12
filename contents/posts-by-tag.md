---
layout: page
title: タグ別記事一覧
---

<div>
	{% for tag in site.tags %}
		<div id="_tag_{{ tag[0] }}" class="posts posts-by-tag">
			<h1>
				タグ別記事一覧 - <i class="fas fa-tag"></i>{{ tag[0] }}
			</h1>

			{% for post in site.posts %}
				{% if post.tags contains tag[0] %}
					<div class="post">
						<div class="post-left">
							{% if post.image %}
								<a class="post-image" href="{{ post.url | relative_url }}">
									<img src="{{ post.image | relative_url }}">
								</a>
							{% else if %}
								<a class="post-noimage" href="{{ post.url | relative_url }}">
									<img src="{{ '/assets/css/pics/no-img/no-img.png' | relative_url }}">
								</a>
							{% endif %}
						</div>
						
						<div class="post-right">
							<h2 class="post-title">
								<a href="{{ post.url | relative_url }}">
									<i class="fas fa-newspaper"></i>{{ post.title }}
								</a>
							</h2>

							<div class="post-meta">
								<ul class="post-time">
									<li>
										<i class="fa fa-calendar-alt"></i>
										<span><time datetime='{{ post.date | date: "%Y-%m-%d" }}'>{{ post.date | date: '%Y/%m/%d %H:%M:%S' }}</time></span>
									</li>
									
									{% if post.update %}
									<li>
										<i class="fas fa-edit"></i>
										<span><time datetime='{{ post.update | date: "%Y-%m-%d" }}'>{{ post.update | date: '%Y/%m/%d %H:%M:%S' }}</time></span>
									</li>
									{% endif %}
								</ul>
								<ul class="post-tag">
									{% for tag in post.tags %}
									<li>
										<i class="fas fa-tag"></i>
										<a href="{{ '/contents/posts-by-tag/#_tag_' | append: tag | relative_url }}">
											{{ tag }}
										</a>
									</li>
									{% endfor %}
								</ul>
							</div>

							<div class="post-desc">
								<p>
									{{ post.excerpt | strip_html | truncatewords:site.excerpt_words }}
								</p>
							</div>

							<div class="post-reading">
								<a class="page-link" href="{{ post.url | relative_url }}">記事を読む</a>
							</div>
						</div>
					</div>
				{% endif %}
			{% endfor %}
		</div>
	{% endfor %}
</div>
