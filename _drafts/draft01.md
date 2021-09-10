---
layout: post
title:  GitHubActionsで実行されるGemインストールの高速化手順
# date:   
# update: 
image:  /assets/post/00008/GitHubActions.jpg
toc:    true
categories:
  - 技術紹介
tags:
  - ブログ構築
  - GitHubActions
---

# 初めに

[前回の記事]({% post_url /2021-09-02-00007 %})
ではCI/CDツールであるGitHubActionsを用いてビルドやプッシュを自動化する環境を構築した。

しかし、Gemをインストールする処理は他のステップに比べて処理時間が約10倍もかかっていた。
実行する度に約30個のGemを毎回最初からインストールしていたためである。

この問題を解決するためにキャッシュによりGemインストールを高速化した結果、
ワークフローの処理時間が約1/2になった。
今回はその手順と実行結果をまとめる。


# ブログ公開までのワークフロー

まず、このブログが公開されるまでのワークフローをまとめる。

★が記載された行が変更箇所である。


## 高速化前

  1. ユーザがmasterブランチへ資産をプッシュする
  1. GitHubActionsがmasterブランチへのプッシュを検知する
  1. GitHubActionsがタイムゾーンを設定する
  1. GitHubActionsがリポジトリをチェックアウトする
  1. GitHubActionsがRubyをセットアップする
  1. GitHubActionsがGemをインストールする
  1. GitHubActionsがJekyll(セーフモードOFF)でビルドする
  1. GitHubActionsがgh-pagesブランチへ生成物をプッシュする
  1. GitHubがGitHubPagesに生成物をデプロイする
  1. GitHubPagesがブログを公開する


## 高速化後

  1. ユーザがmasterブランチへ資産をプッシュする
  1. GitHubActionsがmasterブランチへのプッシュを検知する
  1. GitHubActionsがタイムゾーンを設定する
  1. GitHubActionsがリポジトリをチェックアウトする
  1. (★)Gemをキャッシュに保存する
  1. GitHubActionsがRubyをセットアップする
  1. (★)GitHubActionsがGemをインストールする
  1. GitHubActionsがJekyll(セーフモードOFF)でビルドする
  1. GitHubActionsがgh-pagesブランチへ生成物をプッシュする
  1. GitHubがGitHubPagesに生成物をデプロイする
  1. GitHubPagesがブログを公開する


# キャッシュによるGemインストールの高速化

Gemインストールを高速化するために変更した箇所を以下に示す。
また、
[前回の記事]({% post_url /2021-09-02-00007 %})
のワークフローをベースにしている。

.github/workflows/push-to-gh-pages-branch.yml
{: .filename }
{% raw %}
```diff
name: Push To gh-pages Branch

on:
  push:
    branches:
      - master # 2. GitHubActionsがmasterブランチへのプッシュを検知する

jobs:
  deploy:
    runs-on: ubuntu-20.04
    
    concurrency:
      group: ${{ github.workflow }} - ${{ github.ref }}
    
    steps:
      # 3. GitHubActionsがタイムゾーンを設定する
      - name: Set Timezone
        uses: szenius/set-timezone@v1.0
        with:
          timezoneLinux: "Asia/Tokyo"
      
      # 4. GitHubActionsがリポジトリをチェックアウトする
      - name: Checkout Repository
        uses: actions/checkout@v2
      
+     # 5. Gemをキャッシュに保存する
+     - name: Store Gem to Cache
+       uses: actions/cache@v2
+       with:
+         path: vendor/bundle
+         key: ${{ runner.os }}-gem-${{ hashFiles('**/Gemfile.lock') }}
+         restore-keys: |
+           ${{ runner.os }}-gem-
      
      # 6. GitHubActionsがRubyをセットアップする
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 2.7
      
      # 7. GitHubActionsがGemをインストールする
      - name: Bundle Install According to Gemfile
        run: |
-         bundle install
+         bundle config path vendor/bundle
+         bundle install --jobs 4 --retry 3
      
      # 8. GitHubActionsがJekyll(セーフモードOFF)でビルドする
      - name: Jekyll Build
        run: |
          bundle exec jekyll build
      
      # 9. GitHubActionsがgh-pagesブランチへ生成物をプッシュする
      - name: Push to gh-pages Branch
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_branch: gh-pages
          publish_dir: ./_site
          force_orphan: true
          user_name: "github-actions[bot]"
          user_email: "github-actions[bot]@users.noreply.github.com"
```
{% endraw %}


## 参考サイト

  1. [actions/cache: Cache dependencies and build outputs in GitHub Actions
     ](https://github.com/actions/cache)
  1. [GitHub ActionsでCacheを使ってみた | freks blog
     ](https://blog.freks.jp/github-action-cache/)


# GitHubActionsによる自動化の実行結果

Gemインストールを高速化した前後でワークフローの処理時間の変化を確認する。


## 実行ログ(高速化前)

ワークフローの処理時間は31秒であり、Gemインストールは24秒である。

![GitHubActions_log](
{{ '/assets/post/00008/GitHubActions_log_before.JPG' | relative_url }})


## 実行ログ(高速化後)

ワークフローの処理時間は14秒であり、Gemインストールは2秒である。

![GitHubActions_log](
{{ '/assets/post/00008/GitHubActions_log_after.JPG' | relative_url }})


## 処理時間の変化

ワークフローの処理時間は高速化前の約1/2になり、大幅に改善した。
また、Gemインストールに至っては1/12になった。


# 最後に

今回はGitHubActionsのワークフローのGemインストールをキャッシュにより高速化した。

これで毎回無駄な処理により時間を浪費せずに済む。

