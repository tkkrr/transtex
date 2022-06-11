# TeansTex
![TransTexのロゴ](src/img/image.jpg)

**Let's Try! -> https://transtex.netlify.app**

PDFをコピペした時に含まれる謎の改行およびハイフネーションを取り除き，読みやすい（and 機械翻訳しやすい）段落分けして整形するアプリケーション．

整形後の文字列は，ワンクリックでそのままDeepLへ移動して翻訳でき，クリップボードへのコピーも可能．


# 開発者の方へ
本アプリケーションはGatsby.jsフレームワークを用いて作成されています．
開発にはNode.jsのランタイム環境が必要です

```bash
# ライブラリをインストールする
$ yarn install
### or
$ npm install

# 開発用サーバを立ち上げる -> http://localhost:8000/
$ npm start
```