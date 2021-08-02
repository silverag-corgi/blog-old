---
layout: page
---

各タグのページを生成するために、このスクリプトをタグフォルダの下で実行してください。

新しいタグを追加した場合は、このページにアクセスして、再度スクリプトを実行する必要があります。

{% highlight bash %}
{% for tag in site.tags %}
echo --->>"{{ tag[0] }}.md"
echo layout: tag_index>>"{{ tag[0] }}.md"
echo tag: {{ tag[0] }}>>"{{ tag[0] }}.md"
echo --->>"{{ tag[0] }}.md"
{% endfor %}
{% endhighlight %}
