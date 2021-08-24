---
layout: post
title: リポジトリの言語統計から外部ライブラリを除外する方法
date:  2021/08/25
update: 
#image: /assets/post/00000/
toc: true
tags:
  - GitHub
---

# 初めに

GitHubのリポジトリページには言語統計(Languages)が表示されている。
自分のレポジトリを確認している際、表示されている割合に違和感を覚えたので、
調べてみると外部ライブラリや記事で紹介したツールの成果物も集計されていた。
今回はそれらを集計から除外する方法をまとめる。


# 言語統計の提供元(github-linguist)

GitHubで言語統計を表示する機能は、**RubyGems**の**github-linguist**の機能の一部である。
[github-linguist - RubyGems
](https://rubygems.org/gems/github-linguist)
の説明を翻訳すると以下のように書いてあるため、
「言語のブレークダウングラフの生成」が担っていることがわかる。

> 私たちは、blob言語の検出、コードのハイライト、バイナリファイルの無視、差分での生成ファイルの抑制、
> 言語のブレークダウングラフの生成を行うために、GitHubではのライブラリを使っています。


# ドキュメントの確認

[Linguist - 動作を変更する方法
](https://github.com/github/linguist/blob/master/docs/overrides.md)
を確認するとドキュメントに解決策が記載されていた。
必要そうな箇所のみを和訳し、以下にまとめる。

## 設定ファイルgitattributes

プロジェクトに`.gitattributes`ファイルを追加し、
下記テーブルの特殊な属性を使い、オーバーライドしたいファイルに対して、
`.gitignore`のような標準的なgitのパスマッチャーを使用する。
このファイルは言語統計を確定するために使われ、構文の強調にも使われる。


### 概要

| Git属性                    | 定義ファイル        | ファイルでの効果                                             |
| -------------------------- | ------------------- | ------------------------------------------------------------ |
| `linguist-detectable`      | `languages.yml`     | 言語の種類がdataやproseであっても統計に含まれる              |
| `linguist-documentation`   | `documentation.yml` | ドキュメントとして統計から除外される                         |
| `linguist-generated`       | `generated.rb`      | 生成されたファイルとして統計からは除外され、diffでは隠される |
| `linguist-language`=*name* | `languages.yml`     | 指定された言語としてハイライトされ、分類される               |
| `linguist-vendored`        | `vendor.yml`        | ベンダーから提供されたファイルとして統計から除外される       |


### ベンダーから提供されたコード(Vendored code)

JavaScriptライブラリなど、自分が書いていないコードをリポジトリにチェックすることはよくあることだが、
これはよくプロジェクトの言語統計を膨らませ、
さらにはプロジェクトが別の言語としてラベル付けされる原因にもなる。

デフォルトでは`vendor.yml`で定義されたすべてのパスをvendoredとして扱うため、
リポジトリの言語統計には含まれない。

パスをベンダーまたは非ベンダーにするには`linguist-vendored`属性を使用する。

.gitattributes
{:.filename}
{% highlight git %}
# ディレクトリ内のすべてのファイルにオーバーライドを適用する
special-vendored-path/* linguist-vendored
# 特定のファイルにオーバーライドを適用する
jquery.js -linguist-vendored
# ディレクトリ内のすべてのファイルとディレクトリにオーバーライドを適用する
ano-dir/** linguist-vendored
{% endhighlight %}


# 外部ライブラリを除外する設定ファイルの作成

gitattributesファイルを作成することにより、
外部ライブラリや記事で紹介したツールの成果物を集計から除外できることがわかった。

実際に作成したファイルを以下に示す。

.gitattributes
{:.filename}
{% highlight git %}
# Excluded from stats
assets/lib/**  linguist-vendored
assets/post/** linguist-documentation
{% endhighlight %}

自分のリポジトリの構成上、資産フォルダ配下のライブラリと記事添付ファイルは除外したかった。
また、それぞれvendoredとdocumentationに分類されるため、上記のような設定となった。


# 参考サイト

  1. [github-linguist - RubyGems
     ](https://rubygems.org/gems/github-linguist)
  2. [Linguist - リポジトリ
     ](https://github.com/github/linguist)
  3. [Linguist - 動作を変更する方法(今回であれば除外ファイル指定)
     ](https://github.com/github/linguist/blob/master/docs/overrides.md)
  4. [Linguist - デフォルトで除外するファイルやフォルダを設定するファイル
     ](https://github.com/github/linguist/blob/master/lib/linguist/vendor.yml)

