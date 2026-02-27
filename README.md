<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Baukasten

React + Vite で構築した、プロジェクトギャラリーサイトです。  
カード一覧・カテゴリフィルタ・詳細ビューを備え、`constants.ts` のデータを編集するだけで掲載内容を更新できます。

## 主な機能

- プロジェクトカードの一覧表示
- カテゴリ別フィルタ（All / Tool / App など）
- プロジェクト詳細画面（概要、課題、アプローチ、スクリーンショット）
- 情報ページ（Info View）
- GitHub Pages へのデプロイ対応

## 技術スタック

- React 19
- TypeScript
- Vite
- Tailwind CSS（ユーティリティクラスベース）

## セットアップ（ローカル実行）

**Prerequisites:** Node.js

1. 依存関係をインストール

   ```bash
   npm install
   ```

2. 開発サーバーを起動

   ```bash
   npm run dev
   ```

3. ブラウザで表示（通常）

   ```
   http://localhost:5173
   ```

## 利用可能なスクリプト

```bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド
npm run preview  # ビルド結果のローカル確認
```

## コンテンツ更新方法

掲載プロジェクトは `constants.ts` の `PROJECTS` 配列で管理されています。

- 新規プロジェクト追加: `PROJECTS` にオブジェクトを追加
- カテゴリ追加: `category` に新しい値を設定（ナビゲーションに自動反映）
- カード画像・スクリーンショット: `public/screenshots/...` に配置して `cardImage` / `screenshots` で参照

## ディレクトリ構成（主要部分）

```text
.
├─ App.tsx
├─ constants.ts
├─ components/
├─ public/
│  └─ screenshots/
├─ index.tsx
└─ README.md
```

## GitHub Pages デプロイ

1. サイトをビルド

   ```bash
   npm run build
   ```

2. GitHub で **Settings → Pages** を開く
3. **Build and deployment** で **GitHub Actions** を選択
4. `main` への push で `dist/` を公開

## 補足

- 現在の実装は、必須の API キー設定なしで起動できます。
- `constants.ts` 内には各プロジェクト説明として外部サービス名が含まれる箇所がありますが、README 自体は特定プラットフォーム前提の説明にはしていません。
