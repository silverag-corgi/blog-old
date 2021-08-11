---
layout: page
title: 管理
---

各タグのページを生成するために、このスクリプトをタグフォルダ配下で実行する。

新しいタグを追加した場合は、このページにアクセスして再度スクリプトを実行する必要がある。

{% highlight bash %}
cd C:/Git/silverag-corgi.github.io/tag
{% for tag in site.tags %}
set str{{forloop.index}}_01=---
set str{{forloop.index}}_02=layout: tag_index
set str{{forloop.index}}_03=title: {{ tag[0] }}
set str{{forloop.index}}_04=tag: {{ tag[0] }}
set str{{forloop.index}}_05=---
set dst{{forloop.index}}="{{ tag[0] }}.md"
{% endfor %}
chcp 65001
{% for tag in site.tags %}
echo %str{{forloop.index}}_01%>%dst{{forloop.index}}%
echo %str{{forloop.index}}_02%>>%dst{{forloop.index}}%
echo %str{{forloop.index}}_03%>>%dst{{forloop.index}}%
echo %str{{forloop.index}}_04%>>%dst{{forloop.index}}%
echo %str{{forloop.index}}_05%>>%dst{{forloop.index}}%
{% endfor %}
{% endhighlight %}
