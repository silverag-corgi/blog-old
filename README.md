# Rem_Note


## 概要

ブログ用のリポジトリ。

このブログはGitHubActionsを介して、セーフモードOFFのJekyllで静的ページを生成し、
GitHubPagesで公開している。


## ブログ公開までのワークフロー

このブログが公開されるまでのワークフローをまとめる。

  1. ユーザがmasterブランチへ資産をプッシュする
  1. GitHubActionsがmasterブランチへのプッシュを検知する
  1. GitHubActionsがリポジトリをチェックアウトする
  1. GitHubActionsがRubyをセットアップする
  1. GitHubActionsがGemをインストールする
  1. GitHubActionsがJekyll(セーフモードOFF)でビルドする
  1. GitHubActionsがgh-pagesブランチへ生成物をプッシュする
  1. GitHubがGitHubPagesに生成物をデプロイする
  1. GitHubPagesがブログを公開する

なお、上記の2.～7.がGitHubActionsにより自動化されている。


## リンク

  - [公開用リンク](https://silverag-corgi.github.io/)
  - [開発用リンク](http://localhost:4000/)


## ライセンス

MITライセンスの下で公開している。
詳細はLICENSE.txtを確認すること。

