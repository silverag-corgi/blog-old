---
layout: post
title: Jekyllでサイトを生成し、GitHubPagesで公開してみました
# date: 
# update: 
description: 前回の記事ではGitHubPagesで公開していることを伝えましたが、今回はサイト構築に関するお話。
image: /assets/images/202108/github.JPG
toc: true
share: true
comments: false
tags:
  - サイト構築
  - Jekyll
  - GitHubPages
---

# 初めに

[前回の記事]({{ page.previous.url | relative_url }})ではGitHubPagesで公開していることを伝えましたが、
今回はサイト構築に関するお話。


# サイト構築のお話


## サンプルの動作確認まで

今回構築するにあたりGitHubPagesとJekyllを利用してみました。
殆どまっさらなサンプルサイトをサーバ上で動かすところまでは意外と簡単でした。
5年くらい前はそうは行かなかったんでしょうけど、今は公式がいろいろとサポートしてくれているみたいですね。
GitHubさんありがとう。

ただ、使用を検討していたプラグインがGitHubPagesでは
動作しないことがわかってショックを受けてます。
便利そうだったのに。。。

  - jekyll-last-modified-at
  - jekyll-archives

ローカルサーバでは動作しますが、
GitHubPagesではSafeモードとやらになってしまうらしく動作しないとのこと。
GithubActionsなんかでひと手間掛かりそうなので今回は断念しました。
いつかの機会に代替案でも探します。

因みに以下のページがサポートしているプラグイン。

  - [Dependency versions - GitHub Pages](https://pages.github.com/versions/)


## サカスタムテーマ適用まで

テーマ難しい



# 構築時の大まかな手順

構築時の大まかな手順を箇条書きする。




# 触った技術

構築する上で触ったサービス、言語、ライブラリなど。

GitHub Pages is a web hosting service for static web pages, for hosting user blogs, project documentation, or even whole books created as a page.
	Jekyll Clean Dark Theme is Jekyll Theme.
Jekyll is a static site generator (SSG) by Ruby.
Webrick is a http server by Ruby.
Liquid is a template language.
FontAwesome
Bootstrap


# 出典元

  - [GitHub Pages](https://pages.github.com/)
    - 投稿ヘッダ画像に使用しました



