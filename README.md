# Rem_ Lab

## 概要

ブログ用のリポジトリ。

何を公開するか決まっていませんが、試しに作成してみました。

## リンク

  - [公開用リンク](https://silverag-corgi.github.io/)
  - [開発用リンク](http://localhost:4000/silverag-corgi.github.io/)

## Jekyll Clean Dark テーマ

※以降は[JekyllCleanDark](https://github.com/streetturtle/jekyll-clean-dark)のREADMEの和訳です。

JekyllCleanDarkはカスタマイズが簡単なJekyllテーマです。

  - [GitHub](https://github.com/streetturtle/jekyll-clean-dark)からDLしてください。
  - [デモ](http://pavelmakhov.com/jekyll-clean-dark)を見てください。
  - [テーマ作者のブログ](http://pavelmakhov.com)を見てください。
  - 簡単に[カスタム](http://pavelmakhov.com/jekyll-clean-dark/2016/09/customizations)できます。

<!-- ![preview01](./assets/images/preview/preview01.jpg) -->
![preview02](./assets/images/preview/preview02.jpg)
<!-- ![preview03](./assets/images/preview/preview03.jpg) -->

このテーマはTwitterBootstrapの一部を使用しています。
折りたたみ可能なナビバーを使用したり、サイドバーを隠したりすることで、モバイルデバイスでの見栄えを良くしています。

いくつかの機能：

  - [Disqus](http://disqus.com) (コメントシステム)
  - [Google Analytics](http://www.google.com/analytics/) (Googleが提供するWebページのアクセス解析サービス)
  - [Yandex Metrica](http://metrica.yandex.com) (Yandexが提供するWeb分析サービス)
  - タグ機能
    - [共有ボタン](http://pavelmakhov.com/jekyll-clean-dark/2016/09/be-social)
    - [目次](http://pavelmakhov.com/jekyll-clean-dark/2018/08/table-of-content)
  - Bootstrap 4
  - FontAwesome 5
  - [統計ページ](http://pavelmakhov.com/jekyll-clean-dark/stats)

これらの機能はすべて `_config.yml` で設定することができます。

また、ソーシャルプロファイルにつながるソーシャルアイコンも用意されています。
[FontAwesome](http://fontawesome.io/)を使用しているので、
どんなソーシャルプロフィールにも好きなアイコンを設定することができます。
すぐに使えるものとしては、LinkedIn、GitHub、StackOverflow、LastFm、Instagramが用意されています。
また、`social.html`に新しい表示領域を追加し、`_config.yml`で設定することで、簡単に追加することができます。

## インストール

自身のブログを持っていない場合は、このリポジトリをクローンして、記事を`_posts`フォルダに入れてください。
すでに自身のブログを持っている場合は、このリポジトリをクローンして、`_posts`フォルダにコンテンツをコピペしてください。

その後、`_config.yml`を設定してください。

テーマ作者さんによるとgemのインストールは試したみたいですが、テーマには多くのカスタマイズが施されているため、うまくいかなかったらしいです。
そのため、テーマを適用するのにgemの使用はお勧めしないとのこと。
ただ、ローカル環境で動作確認するのには必要だと自分は思いました。

## タグ機能

この機能を使用するには、サイトで使用している各タグのmdファイルを **tag** フォルダに作成する必要があります。
この手順を簡単にするために、[/admin](http://pavelmakhov.com/jekyll-clean-dark/admin.html)ページがあり、サイトの **tag** フォルダ内で実行する必要のあるbashコマンドを出力します。
また、新しいタグで記事を追加する時、このコマンドを再実行することを忘れないでください。

## ライセンス

このテーマのコンテンツは、[Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/legalcode)に基づいて配布・許諾されています。

    This license lets others distribute, remix, tweak, and build upon your work,
    even commercially, as long as they credit you for the original creation.
    This is the most accommodating of licenses offered. Recommended for maximum
    dissemination and use of licensed materials.

言い換えれば、このテーマでどんなサイトでも何でもできるということです。
ただし、GitHub上のオリジナルテーマへのリンクを提供してください。

このテーマには以下のファイルが含まれており、それぞれの所有者に帰属します。

* assets/js/bootstrap.min.js - [bootstrap](http://getbootstrap.com)
* assets/css/bootstrap.min.css - [bootstrap](http://getbootstrap.com)
* assets/js/jquery.min.js - [jquery](https://jquery.com)
