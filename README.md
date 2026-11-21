# YUSEI WEB Portfolio

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

## 木和工務店の制作実績

実績一覧の3件目と `works/kiwa-komuten.html` に掲載しています。架空の工務店サイトの自主制作として、情報設計・デザイン・コーディングの工夫を紹介しています。制作期間は未記載です。

- 紹介ページ：`works/kiwa-komuten.html`
- サムネイル：`public/images/works/work-kiwa-komuten.jpg`（実際のTOPを1800×1200pxで撮影）
- デモ：`public/demos/kiwa-komuten/index.html`（TOP・下層ページを含む9ページ）

デモは静的ファイルを同梱しているため、ビルド後も外部の公開サイトや開発サーバーに依存せず表示できます。紹介ページから相対パスで別タブに開き、GitHub Pagesのサブディレクトリ配下にも対応します。デモ内の電話番号・開催情報・お問い合わせ先は、制作サイトの仮表記・準備中表示を引き継いでいます。

木和工務店のサイトを修正した後は、このフォルダで以下を実行してからビルドします。同期元は隣の `../kiwa-komuten/dist/` です。通常のビルド・公開時には同期元フォルダは不要です。

```sh
npm run sync:kiwa
npm run build
```

同期は配信用ファイルのみをコピーし、Git情報や開発資料は含めません。サムネイルは同期に含めないため、見た目を変更した場合は別途撮り直してください。

## お問い合わせフォーム

`contact.html`がフォーム画面です。送信先が未設定の間は入力・送信を無効にし、メールでの問い合わせを案内します。

現在の送信先は`https://formspree.io/f/mqpepynw`です。

1. [Formspree](https://formspree.io/)でアカウントを作成し、受信用メールアドレスを確認します。
2. フォームを作成し、`https://formspree.io/f/…`の送信先URLを取得します。
3. `contact.html`の`id="inquiry-form"`を持つフォームの`action`に、取得したURLを設定します。
4. ビルド・公開後に送信と受信を確認します。

FormspreeのフォームURLはHTMLに設定する公開用URLです。APIキーやアカウントのパスワードをコードに入れる必要はありません。
