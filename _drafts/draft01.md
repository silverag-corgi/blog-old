---
layout: post
title:  下書き01
#date:   
#update: 
#image: /assets/post/00000/
toc:    true
tags:
  - 
---

# 初めに

今までは**GitHubPages**でサポートされているプラグインのみを使用していたため、
**GitHub**にプッシュするだけでサイトが公開されていた。
サポートされていないプラグインを使用するためには、
**GitHubPages**に組み込まれた**Jekyll**のビルドを使用せずに事前にビルドし、
その生成物をプッシュする必要がある。

しかし、資産と生成物の変更履歴が一緒になり汚くなる上、
資産を編集する度に資産と生成物の両方をプッシュするのは手間になる。
そのため、CI/CDツールである**GitHubActions**を用いてビルドやデプロイを自動化する環境を構築した。

今回はその構築手順をまとめる。


# ワークフロー

まず、ユーザがプッシュした後の**GitHub**視点のワークフローをまとめる。


## 変更前(GitHubPages組み込みJekyllによるビルド)

  1. **GitHub**が**master**ブランチへのプッシュを検知する
  1. **GitHub**が組み込まれた**Jekyll**でビルドする
  1. **GitHub**が生成物を**GitHubPages**にデプロイする
  1. **GitHubPages**がサイトを公開する


## 変更後(GitHubActionsを用いたJekyllによるビルド)

  1. **GitHubActions**が**master**ブランチへのプッシュを検知する
  1. **GitHubActions**がリポジトリをチェックアウトする(*)
  1. **GitHubActions**が**Ruby**をセットアップする(*)
  1. **GitHubActions**が**Gem**をインストールする(*)
  1. **GitHubActions**が**Jekyll**でビルドする
  1. **GitHubActions**が**gh-pages**ブランチへ生成物をプッシュする(*)
  1. **GitHubActions**が生成物を**GitHubPages**にデプロイする
  1. **GitHubPages**がサイトを公開する

(*)主語を除いて判断した時の差分ありの箇所。


# GitHubPagesの公開用ブランチ(gh-pages)の作成

資産と生成物の変更履歴を分けるため、
開発用ブランチ(master)と公開用ブランチ(gh-pages)で別々に管理する。
前者は既にあるので、後者を新たに作成する。

また、自分の環境での注意事項であるが、
普段使用している**TortoiseGit**は親のないブランチを作成する機能(orphan)は提供していないらしい。
そのため**GitCmd**で作成する必要がある。

公開用ブランチを作成した時のコマンドを示す。

GitCmd
{: .filename }
{% highlight shell %}
$ cd <workspace_path>              # ワークスペースに移動する
$ git clone <repo_url> <dir_name>  # ブランチ用のフォルダにリポジトリをクローンする
$ cd <dir_name>                    # ブランチ用のフォルダに移動する
$ git checkout --orphan gh-pages   # 親のないブランチとしてgh-pagesを作成する
$ git reset --hard                 # 既存のリポジトリの内容がステージングされているのでリセットする
$ type nul > README.md             # READMEを作成する
$ git add README.md                # READMEをステージングする
$ git commit -m "Initial commit"   # コミットする
$ git push origin gh-pages         # プッシュする
{% endhighlight %}

因みにorphanとは孤児のことらしい。
更に孤児は両親・親戚等の保護者のいない未成年者という意味で、親のないブランチってことらしい。


## 参考サイト

  1. [gitで親ブランチのない空ブランチを作成する - 脳汁portal
     ](https://portaltan.hatenablog.com/entry/2018/05/21/093622)


# GitHubActionsによる自動化の設定

資産を編集する度に資産と生成物の両方をプッシュするのは手間になるため、
CI/CDツールである**GitHubActions**を用いてビルドやデプロイを自動化する。

以下のワークフローファイルを作成し、**master**ブランチにプッシュした。

これにより、**master**ブランチに資産をプッシュすると、
今までのセーフモードONのGitHubPages組み込みJekyllによるビルドではなく、
セーフモードOFFのJekyllによるビルドから**GitHubPages**によるサイト公開までが自動で実行される。

.github/workflows/deploy-to-gh-pages.yml
{: .filename }
{% highlight yml %}
{% raw %}
# ワークフロー名
name: Deploy To GitHub Pages

# ジョブが実行されるトリガー
on:
  push:
    branches:
      - master # 1.GitHubActionsがmasterブランチへのプッシュを検知する

# 実行されるジョブ一覧
jobs:
  deploy: # ジョブ名
    runs-on: ubuntu-20.04 # 実行環境
    
    concurrency: # 並行処理(同じグループのジョブは処理待ち)
      group: ${{ github.workflow }}-${{ github.ref }}
      # [ワークフロー名]-[ワークフローの実行をトリガーしたブランチ名]
      # Deploy GitHub Pages-refs/heads/master
    
    steps: # ジョブで実行されるステップ一覧
      # 2.GitHubActionsがリポジトリをチェックアウトする
      - name: Checkout Repository
        uses: actions/checkout@v2
      
      # 3.GitHubActionsがRubyをセットアップする
      - name: Setup Ruby
        uses: actions/setup-ruby@v1
        with:
          ruby-version: 2.7
      
      # 4.GitHubActionsがGemをインストールする
      - name: Bundle Install According to Gemfile
        run: |
          bundle install
      
      # 5.GitHubActionsがJekyllでビルドする
      - name: Jekyll Build
        run: |
          bundle exec jekyll build
      
      # 6.GitHubActionsがgh-pagesブランチへ生成物をプッシュする
      # 7.GitHubActionsが生成物をGitHubPagesにデプロイする
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_branch: gh-pages
          publish_dir: ./_site
          force_orphan: true
          user_name: "github-actions[bot]"
          user_email: "github-actions[bot]@users.noreply.github.com"
{% endraw %}
{% endhighlight %}


## 参考サイト

  1. [GitHub Actions による GitHub Pages への自動デプロイ - Qiita
     ](https://qiita.com/peaceiris/items/d401f2e5724fdcb0759d)
  1. [peaceiris/actions-gh-pages
     ](https://github.com/peaceiris/actions-gh-pages)
  1. [Rubyでのビルドとテスト - GitHub Docs
     ](https://docs.github.com/ja/actions/guides/building-and-testing-ruby)


# GitHubActionsの実行ログ

GitHubActionsが実行された時のログを示す。

![GitHubActions実行ログ](
{{ '/assets/post/00007/GitHubActions_log.JPG' | relative_url }})

ワークフローファイルで定義した通りに実行されている。

気になる箇所は上から4つ目のBundleInstallである。
Gemをインストールするだけにも関わらず、3分も消費している。
今後、なにが問題か調べる。


# 最後に



