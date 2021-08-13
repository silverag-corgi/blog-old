# Rem_Note

## 概要

ブログ用のリポジトリ。

自分がしたことや考えたことなどを備忘録として記録します。

## リンク

  - [公開用リンク](https://silverag-corgi.github.io/)
  - [開発用リンク](http://localhost:4000/silverag-corgi.github.io/)

## JekyllCleanDarkテーマ

※以降は[JekyllCleanDark](https://github.com/streetturtle/jekyll-clean-dark)のREADMEとテーマ説明用記事の和訳です。

JekyllCleanDarkはカスタマイズが簡単なJekyllテーマです。

  - [GitHub](https://github.com/streetturtle/jekyll-clean-dark)からDLしてください。
  - [デモ](http://pavelmakhov.com/jekyll-clean-dark)を見てください。
  - [テーマ作者のブログ](http://pavelmakhov.com)を見てください。
  - 簡単に[カスタム](http://pavelmakhov.com/jekyll-clean-dark/2016/09/customizations)できます。

このテーマはTwitterBootstrapの一部を使用しています。
折りたたみ可能なナビバーを使用したり、サイドバーを隠したりすることで、モバイルデバイスでの見栄えを良くしています。

いくつかの機能：

  - [Disqus](http://disqus.com) (コメントシステム)
  - [Google Analytics](http://www.google.com/analytics/) (アクセス解析サービス)
  - [Yandex Metrica](http://metrica.yandex.com) (アクセス解析サービス)
  - タグ
  - [SNS共有ボタン](http://pavelmakhov.com/jekyll-clean-dark/2016/09/be-social)
  - [目次](http://pavelmakhov.com/jekyll-clean-dark/2018/08/table-of-content)
  - [統計](http://pavelmakhov.com/jekyll-clean-dark/stats)

これらの機能はすべて `_config.yml` で設定することができます。

また、ソーシャルプロファイルにつながるソーシャルアイコンも用意されています。
[FontAwesome](http://fontawesome.io/)を使用しているので、
どんなソーシャルプロフィールにも好きなアイコンを設定することができます。
すぐに使えるものとしては、LinkedIn、GitHub、StackOverflow、LastFm、Instagramが用意されています。
また、`social.html`に新しい表示領域を追加し、`_config.yml`で設定することで、簡単に追加することができます。

## インストール方法

自身のブログを持っていない場合は、[リポジトリ](https://github.com/streetturtle/jekyll-clean-dark)をクローンして、記事を`_posts`フォルダに入れてください。
すでに自身のブログを持っている場合は、[リポジトリ](https://github.com/streetturtle/jekyll-clean-dark)をクローンして、`_posts`フォルダにコンテンツをコピペしてください。

その後、`_config.yml`を設定してください。

テーマ作者さんによるとgemのインストールは試したみたいですが、テーマには多くのカスタマイズが施されているため、うまくいかなかったらしいです。
そのため、テーマを適用するのにgemの使用はお勧めしないとのこと。

以下は各機能の設定方法です。

### Disqus (コメントシステム)

有効化するためには[ここ](http://disqus.com/)でサービスを開始してください。

その後、`_config.yml`に自分の名前を追加してください。

コメントは記事ごとにON/OFFを切り替えられます。
有効化するためには`comments: true`と記述してください。

### Google Analytics (アクセス解析サービス)

有効化するためには[ここ](https://analytics.google.com/analytics/web/provision/#/provision)でサービスを開始してください。

その後、`_config.yml`に`UA-********-1`のような形式のトラッキングIDを追加してください。

### Yandex Metrica (Web分析サービス)

有効化するためには[ここ](http://metrica.yandex.com/)でサービスを開始してください。

その後、カウンタを作成し、`/_includes/yandex-metrica.html`にそのコードをコピペしてください。

### タグ

使用するためには、サイトで使用している各タグのmdファイルを`tag`フォルダに作成する必要があります。

この手順を簡単にするために、[/admin](http://pavelmakhov.com/jekyll-clean-dark/admin.html)ページがあり、サイトの`tag`フォルダ内で実行する必要のあるbashコマンドを出力します。

また、新しいタグで記事を追加する時、このコマンドを再実行することを忘れないでください。

### SNSアイコン

自身のSNSサイトへのリンクを表示するアイコンです。

追加するためには、以下を実施してください。

  1. 使いたいSNSアイコンを[Font Awesome Icons](https://fortawesome.github.io/Font-Awesome/icons/)で選ぶ
  1. `_config.yml`に変数を追加する
  1. `social.html`にSNSアイコンを追加する

### SNS共有ボタン

記事を外部に共有するボタンで、記事の下に表示されます。

有効化するためには、記事のFrontMatterで`share: true`と記述してください。

複数ある共有ボタンのいくつかを無効化するためには、`_config.yml`で`twitter: false`のように記述してください。

新しい共有ボタンを追加するためには、以下を実施してください。

  1. `_config.yml`にアイコン名を追加する
  2. `_includes/share.html`にセクションを追加する
  3. `css/theme.css`にスタイルを追加する

### 目次

目次を有効化するためには、記事のFrontMatterで`toc: true`と記述してください。

## ライセンス

このテーマのコンテンツは、[Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/legalcode)に基づいて配布・許諾されています。

言い換えれば、このテーマでどんなサイトでも何でもできるということです。
ただし、GitHub上のオリジナルテーマへのリンクを提供してください。

このテーマには以下のファイルが含まれており、それぞれの所有者に帰属します。

* assets/js/bootstrap.min.js - [bootstrap](http://getbootstrap.com)
* assets/css/bootstrap.min.css - [bootstrap](http://getbootstrap.com)
* assets/js/jquery.min.js - [jquery](https://jquery.com)
