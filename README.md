# YUDA YUSEI Portfolio

デザインとコーディングの実績を紹介するポートフォリオサイトです。

## 使用技術

- HTML
- CSS
- JavaScript
- Vite

## 開発環境

```bash
npm install
npm run dev
```

## 本番ビルド

```bash
npm run build
```

生成されたファイルは`dist`ディレクトリに出力されます。

## お問い合わせフォーム

`contact.html`がフォーム画面です。送信先が未設定の間は入力・送信を無効にし、メールでの問い合わせを案内します。

現在の送信先は`https://formspree.io/f/mqpepynw`です。

1. [Formspree](https://formspree.io/)でアカウントを作成し、受信用メールアドレスを確認します。
2. フォームを作成し、`https://formspree.io/f/…`の送信先URLを取得します。
3. `contact.html`の`id="inquiry-form"`を持つフォームの`action`に、取得したURLを設定します。
4. ビルド・公開後に送信と受信を確認します。

FormspreeのフォームURLはHTMLに設定する公開用URLです。APIキーやアカウントのパスワードをコードに入れる必要はありません。
