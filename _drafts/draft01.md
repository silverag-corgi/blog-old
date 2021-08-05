---
layout: post
title: Jekyllでサイトを生成し、GitHubPagesで公開してみました
# date: 
# update: 
# description: 
image: /assets/images/202108/github.JPG
toc: true
share: true
comments: false
tags:
  - サイト公開
  - Jekyll
  - GitHubPages
---

# 初めに

本サイトは公開するにあたり**GitHub Pages**と**Jekyll**を利用しています。
[前回の記事]({% post_url /2021-08-04-001 %})で**GitHub Pages**で公開していることを伝えましたが、
大まかに段階を踏んで公開までの話をしようと思います。


# サンプルサイトの作成と動作確認１

まずは**GitHub Pages**のみで完結するサンプルサイトを作成します。

GitHubの画面で言われるがままに操作し、殆ど何もないサイトが出来上がりました。
こんなことができるのかというイメージの確認程度です。

![サンプルサイト01](
{{ '/assets/images/202108/sample_site_01.JPG' | relative_url }})
{: .post-content-img }

# サンプルサイトの作成と動作確認２

次に**GitHub Pages**と**Jekyll**を利用したサンプルサイトを作成します。

**Jekyll**で静的なサンプルサイトを生成し、それを**GitHub Pages**で公開し、
ブログっぽいそれなりのサイトが出来上がりました。

![サンプルサイト01](
{{ '/assets/images/202108/sample_site_02.JPG' | relative_url }})
{: .post-content-img }

ただ、使用を検討していたプラグインが**GitHub Pages**では動作しないことがわかってショックを受けてます。
便利そうだったのに。。。

  - jekyll-last-modified-at
  - jekyll-archives

ローカルサーバでは動作しますが、**GitHub Pages**では**Jekyll**がセーフモードとやらになってしまうらしく、
動作しないとのこと。
**Github Actions**なんかでひと手間掛かりそうなので今回は断念しました。
いつかの機会に代替案でも模索します。

因みに以下のページがサポートしているプラグインです。意外と少ない。

  - [Dependency versions - GitHub Pages
    ](https://pages.github.com/versions/)


# カスタムテーマ適用

次に作成したサイトにテーマを適用します。

400のテーマ(20ページまで)の中から以下のテーマを適用しました。

  - [Jekyll Clean Dark - Jekyll Themes
    ](http://jekyllthemes.org/themes/jekyll-clean-dark/)

ここまでは意外と簡単でしたが、テーマをカスタムするとなると意外と大変でした。

自分は静的サイトジェネレーターというもの(今回は**Jekyll**)を今まで触ったことがありませんでした。
なのでそこを理解するためにも、資産が綺麗に管理されてそうで、
理解の妨げになる余分な資産がないテーマを最終的に選びました。

思った通りで改善点は沢山ありますが、このテーマで満足しています。
自分ならデザインを１から決めてテーマを作成するなんて、センスないので出来ないです。

また、ここはまだまだ続けていくつもりです。


# サイト公開

最後に**GitHub Pages**でサイトを公開します。

プッシュするだけで、裏で**Jekyll**がページを生成・ディプロイしてくれて、
**GitHub Pages**が公開してくれるのですごい楽です。


# 最後に

今回は本サイトを公開した時の流れ、感想、気になったことなどをまとめました。
いつか見返した時にこんなことやったなーと思い出す材料になると嬉しい。


# (付録)触った技術

付録として公開する上で触ったサービス、言語、ライブラリなどの説明をすごく簡単にまとめました。
(出典元2)

  - **Jekyll**
    - 静的サイトジェネレーター (SSG)
  - **GitHub Pages**
    - 静的ウェブページのためのウェブホスティングサービス
    - ユーザーのブログやプロジェクトのドキュメント、1冊の本全体を公開するためにも使用できる
    - 内部で**Jekyll**を使用できる
    - 上記以外を使用したい場合は、**Github Actions**などと連携が必要になる
  - **Liquid**
    - テンプレート言語
    - 別のメインとなる言語(今回はHTMLやJavaScript)に埋め込める言語
  - **Font Awesome**
    - フォントとアイコンのツールキット
  - **Bootstrap**
    - フロントエンドWebアプリケーションフレームワーク
    - HTMLおよびCSSベースのデザインテンプレートとして用意されている


# 参考サイト

今回公開するにあたり参考にしたサイトです。
とても助かりました。ありがとうございす。

  - [GitHubを使ってMarkdown文書を５ステップでホームページとして公開する方法 - Qiita
    ](https://qiita.com/MahoTakara/items/3800e9dc83b530d0a050)
  - [JekyllとGitHub Pagesでブログを作る＠初期設定編 - Qiita
    ](https://qiita.com/Shirokuma89/items/7d63627e3e97b030c63a)
  - [JekyllとGitHub Pagesでブログを作る＠テーマ設定編 - Qiita
    ](https://qiita.com/Shirokuma89/items/0262b8f8ef7c8b7f69ef)
  - [個人用wikiをJekyllに移行したときにやったこと2 [カスタマイズ編] - のんびりSEの議事録
    ](https://carefree-se.hatenablog.com/entry/2020/07/21/110000)
  - [個人用wikiをJekyllに移行したときにやったこと1 [Jekyll紹介編] - のんびりSEの議事録
    ](https://carefree-se.hatenablog.com/entry/2020/07/20/110000)
  - [Jekyll Clean Dark - Jekyll Themes
    ](http://jekyllthemes.org/themes/jekyll-clean-dark/)


# 出典元

  1. [GitHub Pages
    ](https://pages.github.com/)
    - 投稿ヘッダ画像に使用しました
  2. [ウィキペディア
    ](https://ja.wikipedia.org/wiki/)


