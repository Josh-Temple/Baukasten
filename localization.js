// Keep the English source content in constants.ts. This file contains the
// corresponding Japanese copy and the small, testable locale helpers.
export const COPY = {
  en: {
    siteTagline: 'Tools for practice and connected reading.',
    intro: 'Practise mental maths, recall a passage, use English with an AI, or explore history, philosophy, and research. Browse by task, then open a project to see a first exercise and how it works.',
    about: 'About',
    aboutLink: 'About this collection',
    aboutAria: 'About Baukasten',
    language: 'Language',
    viewProject: 'View project',
    imagePreview: 'interface preview',
    back: 'Back to projects',
    notFound: 'Page not found',
    notFoundTitle: "This project page isn't available.",
    notFoundBody: 'The link may be outdated. Browse the current collection instead.',
    openApp: 'Open app',
    viewSource: 'View source',
    tryFirst: 'Try this first',
    audience: 'Who it is for',
    problem: 'The problem',
    approach: 'How it helps',
    howItWorks: 'How it works',
    step: 'Step',
    screenshots: 'Screenshots',
    swipe: 'Swipe to see more',
    technical: 'Source and technical details',
    aboutTitle: 'Why Baukasten exists',
    aboutBody: 'Baukasten brings together tools for focused practice and connected reading: mental maths, text recall, English conversation, history, philosophy, and research. Each project page explains the task, suggests a first exercise, and describes how to use the tool.',
    selectionTitle: 'How projects are selected',
    selection: [
      'A specific learning or reading task',
      'A distinct workflow that can be useful on its own',
      'A clear account of current features and conditions for use',
    ],
    statusTitle: 'Status meanings',
    statusIntro: 'The collection is grouped by task. Status labels describe the creator’s use or development focus; they do not measure learning outcomes.',
    pageTitle: 'Baukasten — Tools for practice and connected reading',
    metaDescription: 'Explore tools for mental maths, text recall, English conversation, history, philosophy, and connected research. Find a task and see how to start.',
  },
  ja: {
    siteTagline: '学習と知識の探究のためのツール。',
    intro: '暗算や文章の暗記、AIとの英会話、歴史・哲学・研究資料の探究に使えるツールを集めました。目的から選び、各アプリの最初の課題と使い方を確認できます。',
    about: 'サイトについて',
    aboutLink: 'このサイトについて',
    aboutAria: 'Baukastenについて',
    language: '表示言語',
    viewProject: '詳しく見る',
    imagePreview: '画面プレビュー',
    back: 'アプリ一覧に戻る',
    notFound: 'ページが見つかりません',
    notFoundTitle: 'このアプリの紹介ページはありません。',
    notFoundBody: 'リンクが古い可能性があります。現在のアプリ一覧をご覧ください。',
    openApp: 'アプリを開く',
    viewSource: 'ソースコードを見る',
    tryFirst: 'まず試してみる',
    audience: 'こんな人に',
    problem: '解決したい課題',
    approach: 'どのように役立つか',
    howItWorks: '使い方',
    step: '手順',
    screenshots: '画面イメージ',
    swipe: '横にスワイプして見る',
    technical: 'ソースコードと技術情報',
    aboutTitle: 'Baukastenについて',
    aboutBody: 'Baukastenは、暗算、文章の暗記、英会話、歴史、哲学、研究資料の閲覧など、集中的な学習と知識の探究を支えるツールを集めたサイトです。各アプリの紹介では、取り組める課題、最初に試すこと、使い方を説明しています。',
    selectionTitle: '掲載するアプリの選び方',
    selection: [
      '具体的な学習・読書の課題があること',
      '単独でも役立つ、明確な使い方があること',
      '現時点の機能と利用条件を説明できること',
    ],
    statusTitle: '開発・利用状況の見方',
    statusIntro: 'アプリは用途別に並べています。状況を示すラベルは、制作者による利用や開発の段階を表すもので、学習効果を測定した結果ではありません。',
    pageTitle: 'Baukasten — 学習と知識の探究のためのツール',
    metaDescription: '暗算、文章の暗記、AIとの英会話、歴史、哲学、研究資料の閲覧に使えるツールを紹介します。目的から選び、最初の課題や使い方を確認できます。',
  },
};

const JA_GROUPS = {
  recall: { title: '記憶と反復練習', description: '暗算、文章の暗記、数字とイメージの結び付けを練習します。' },
  conversation: { title: '英語を会話で使う', description: '役立つフレーズを練習し、外部のAIとの会話で使ってみます。' },
  exploration: { title: '歴史と哲学を探究する', description: '出来事のつながりを学び、考え方を比較します。' },
  reading: { title: '関連する研究資料を読む', description: '公開された知識ベースで概念、方法、関連ノートをたどります。' },
};

const JA_STATUSES = {
  'Daily use': ['日常的に使用', '制作者が日頃の練習に継続して使っています。'],
  'In validation': ['検証中', '大きく拡張する前に、学習の進め方を評価しています。'],
  'Stable': ['安定版', '現在の機能を利用でき、大きな機能拡張は進めていません。'],
  'Consolidating': ['整理・統合中', '既存の教材や学習の流れを整理し、つなぎ直しています。'],
  'Infrastructure': ['基盤・資料', 'ほかの作業を支える資料集やシステムです。'],
};

const JA_PROJECTS = {
  circuit: {
    oneLiner: '2桁同士の掛け算を練習し、間違えた問題を復習できます。',
    audience: '暗算の正確さや速さを集中的に練習したい人向けです。',
    fullProblem: '無作為に計算を繰り返すだけでは、どの掛け算が遅いのか、間違えやすいのか分かりません。',
    fullApproach: '正答率と解答時間を記録し、間違えた問題や苦手な問題を繰り返し練習しやすくします。',
    firstTask: '短い練習を1回終え、間違えた問題や時間のかかった問題を確認して、もう一度取り組んでみてください。',
    howItWorks: [
      { title: '計算する', desc: '練習を選び、2桁同士の掛け算に答えます。' },
      { title: '結果を確認する', desc: '問題ごとの正答率と解答時間を確認します。' },
      { title: '復習する', desc: '間違えた問題をもう一度解きます。' },
    ],
    trustNote: '練習履歴はこのブラウザに保存されます。サイトのデータを消すと履歴も失われます。',
    primaryActionLabel: '掛け算を練習する',
    screenshots: [{ caption: '練習画面' }, { caption: '解答結果' }, { caption: '練習の統計' }],
  },
  engrave: {
    oneLiner: '文章の一部を隠して思い出す練習ができます。読み方の補助や音声も利用できます。',
    audience: '詩、文章、スピーチ、引用文、外国語の文章などを覚えたい人向けです。',
    fullProblem: '一般的な単語カードは短い知識を覚えることに向いており、文章全体を正確に再現する練習には適さないことがあります。',
    fullApproach: '文章を扱いやすい単位に分け、段階的な暗記練習、読み方の補助、メモ、音声を利用できます。',
    firstTask: '覚えたい短い文章を追加します。一部を隠して思い出したら、表示して答えを確かめ、自分で評価してみてください。',
    howItWorks: [
      { title: '文章を追加する', desc: 'Quick Addで文章を分割します。必要なら読み方、メモ、音声を追加します。' },
      { title: '思い出す', desc: '隠す部分を段階的に増やし、表示して答えを確認します。' },
      { title: '復習する', desc: '思い出せた度合いを評価し、復習予定のカードに戻ります。' },
    ],
    trustNote: 'カードと復習履歴はこのブラウザ内に保存されます。端末の変更やサイトデータの削除前に、Settings → Download backupでバックアップしてください。',
    primaryActionLabel: '文章を暗記する',
    screenshots: [{ caption: 'ライブラリ' }],
  },
  majoris: {
    oneLiner: '00〜99の数字に結び付けた単語やイメージを思い出す練習ができます。',
    audience: '数字を子音に変え、覚えやすい単語やイメージに置き換える「メジャーシステム」を使う人向けです。',
    fullProblem: '数字と単語の対応表を持っていても、必要なときにすぐ思い出せるとは限りません。',
    fullApproach: '数字から連想する練習を繰り返し、習熟度を記録します。独自の単語リストも使えます。',
    firstTask: '数字と単語の対応表を確認してから、短い練習を試します。思い出すのに時間がかかった数字を復習してください。',
    howItWorks: [
      { title: 'リストを準備する', desc: '数字と単語の対応を確認するか、自分のリストを読み込みます。' },
      { title: '思い出す練習をする', desc: '練習の長さを選ぶか、無制限モードで続けます。' },
      { title: '進み具合を確認する', desc: '習熟度の統計から、練習が必要な組み合わせを確認します。' },
    ],
    trustNote: '数字のリストと練習の進み具合はこのブラウザに保存されます。バックアップや端末間の移行にはインポート・エクスポートを利用してください。',
    primaryActionLabel: '数字の暗記を練習する',
    screenshots: [{ caption: '練習ホーム' }],
  },
  parla: {
    oneLiner: 'AIに説明や言い換え、訂正を頼む英語表現を練習できます。',
    audience: '英語表現を学んでも、実際の会話ではうまく使えない学習者向けです。',
    fullProblem: '役立つ表現を見れば理解できても、会話が難しくなったときにすぐ使えるとは限りません。',
    fullApproach: 'フレーズを思い出す練習と、外部AIとの実際の会話に移るためのプロンプトを組み合わせています。',
    firstTask: 'Practice Setを選んでフレーズを練習します。Use with AIからプロンプトをコピーし、普段使うAIアプリで会話して、その表現を一つ使ってみてください。',
    howItWorks: [
      { title: 'フレーズを練習する', desc: 'お題を読み、英語表現を思い出して答えを表示し、自己評価します。' },
      { title: 'AIとの会話で使う', desc: '練習用プロンプトを外部のAIアプリにコピーし、会話で使います。' },
      { title: '復習する', desc: '思い出しにくかった表現や使いにくかった表現に戻ります。' },
    ],
    trustNote: '会話は別のAIアプリで行います。Parlaはフレーズ練習とコピーできるプロンプトを提供します。',
    primaryActionLabel: '英語フレーズを練習する',
    screenshots: [{ caption: '練習ホーム' }],
  },
  'world-history-lab': {
    oneLiner: '年表、因果関係、比較を通じて歴史上の出来事のつながりを学べます。',
    audience: '歴史上の年号を個別に覚えるだけでなく、出来事の関係を理解したい人向けです。',
    fullProblem: '世界史の学習では、時系列、因果関係、比較、史料、論述が別々の練習になりがちです。',
    fullApproach: '共通の歴史教材と復習データを使い、複数の学習モードを一つにまとめています。',
    firstTask: '単元を選んでガイド付きの練習を始めます。終わったら、難しかった出来事の関係を一つ振り返ってみてください。',
    howItWorks: [
      { title: '単元を選ぶ', desc: '学習するテーマと基本教材を選びます。' },
      { title: 'ガイドに沿って学ぶ', desc: '単元に応じて、時系列、出来事の順序、原因、比較を練習します。' },
      { title: '関係を掘り下げる', desc: '出来事に戻るか、別の練習モードで違う角度から考えます。' },
    ],
    trustNote: '利用できる練習モードは単元の教材によって異なります。内容と学習の流れは現在も整理・統合中です。',
    primaryActionLabel: '世界史を探究する',
    screenshots: [{ caption: '学習ダッシュボード' }],
  },
  noema: {
    oneLiner: '思想家を比較し、テーマ別の読書経路をたどりながら哲学の問いを探究できます。',
    audience: '哲学者ごとの説明を読んでも、その関係をつかみにくい人向けです。',
    fullProblem: '思想家や学説の一覧だけでは、意見の相違、影響関係、概念の違いを理解しにくいことがあります。',
    fullApproach: '思想家同士の比較やテーマ間のつながりを中心に、哲学の考え方を学べます。',
    firstTask: '自由や人間の本性に関する比較を一つ開き、双方の立場を読んで、違いを自分の言葉で説明してみてください。',
    howItWorks: [
      { title: '問いを選ぶ', desc: 'テーマ、おすすめの比較、検索から始めます。' },
      { title: '二つの立場を比較する', desc: '思想家を並べて読み、必要なら理解度チェックを使います。' },
      { title: '読書を続ける', desc: '関連する思想家をたどるか、学習棚に保存して後で読み返します。' },
    ],
    trustNote: '保存した項目と最近読んだ内容は、このブラウザに保存されます。',
    primaryActionLabel: '哲学の考え方を比較する',
    screenshots: [{ caption: 'ホーム' }],
  },
  'lumen-commonplace': {
    oneLiner: '検索できる知識ベースで、関連する研究ノート、概念、方法を読めます。',
    audience: '説明や方法、関連ノートを横断して、一つの考えを追いかけたい読者向けです。',
    fullProblem: '単独のノートで一つの考えを説明できても、関連する概念や方法とのつながりは見えにくいことがあります。',
    fullApproach: '公開された相互リンク付きの資料を、テーマ別索引、検索、文字サイズの調整機能から読めます。',
    firstTask: 'テーマ別索引を開き、概念を一つ選んで関連ページのリンクをたどり、別の考え方とのつながりを確かめてください。',
    howItWorks: [
      { title: 'テーマを探す', desc: '索引を見るか、ページのタイトル、要約、タグを検索します。' },
      { title: 'ページを読む', desc: '説明や方法を読み、必要に応じて文字サイズを調整します。' },
      { title: 'リンクをたどる', desc: '関連する概念やノートを、ページ内のリンクから読み進めます。' },
    ],
    trustNote: 'これは公開資料を読むためのサイトです。自分のノートを追加するには別途設定が必要です。',
    primaryActionLabel: '知識ベースを読む',
    screenshots: [{ caption: '知識ベースのホーム' }],
  },
};

export function selectLanguage(search = '', stored = null, browserLanguage = 'en') {
  const requested = new URLSearchParams(search).get('lang');
  if (requested === 'ja' || requested === 'en') return requested;
  if (stored === 'ja' || stored === 'en') return stored;
  return typeof browserLanguage === 'string' && browserLanguage.toLowerCase().startsWith('ja') ? 'ja' : 'en';
}

export function localizeGroup(group, language) {
  return language === 'ja' ? { ...group, ...(JA_GROUPS[group.id] || {}) } : group;
}

export function localizeStatus(status, language) {
  return language === 'ja' ? JA_STATUSES[status]?.[0] || status : status;
}

export function localizeStatusMeaning(status, englishMeaning, language) {
  return language === 'ja' ? JA_STATUSES[status]?.[1] || englishMeaning : englishMeaning;
}

export function localizeProject(project, language) {
  if (language !== 'ja') return project;
  const translation = JA_PROJECTS[project.id];
  if (!translation) return project;
  // Screenshot paths and other product facts always come from the English source.
  const screenshots = project.screenshots?.map((screen, index) => ({
    ...screen,
    caption: translation.screenshots?.[index]?.caption || screen.caption,
  }));
  return { ...project, ...translation, screenshots };
}

export function checkJapaneseCoverage(projects, groups, statuses) {
  return {
    missingProjects: projects.filter(project => {
      const translated = JA_PROJECTS[project.id];
      return !translated ||
        ['oneLiner', 'audience', 'fullProblem', 'fullApproach', 'firstTask', 'trustNote', 'primaryActionLabel']
          .some(key => project[key] && !translated[key]) ||
        translated.howItWorks?.length !== project.howItWorks?.length ||
        translated.screenshots?.length !== (project.screenshots?.length || 0);
    }).map(project => project.id),
    missingGroups: groups.filter(group => !JA_GROUPS[group.id]).map(group => group.id),
    missingStatuses: Object.keys(statuses).filter(status => !JA_STATUSES[status]),
  };
}
