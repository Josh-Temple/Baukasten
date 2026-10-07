# Josh-Temple 公開Webサイト 横断セキュリティ監査 — 2026-10-07

## Executive summary

監査対象は **公開28リポジトリ、公開31 URL（GitHub Pages 7、Vercel 24）**。GitHubのdefault branch、公開ページ、接続済みVercelと取得可能なGitHub設定をfresh readした。サイト数はホスト/公開入口単位で数え、Parlaの2ホスト、kaigo-rulesのroot/ops-site、Instant RadioのPages/Vercelを別入口とした。

**重大度別FindingはCritical 0 / High 2 / Medium 2 / Low 1。これは実証済みexploitの件数ではない。** High 2件は、実在するコード/依存関係の問題について、公開APIへの悪用成功やWAF通過を確認していない候補。Mediumには確認済みStorage設定と、到達性未確定の古いNext.jsを含む。実害を起こす検証は一切行っていない。

| ID | Severity | 判定 | 対象 | 必要性 |
|---|---|---|---|---|
| F-01 | High（条件付き） | potential issue / exploit unverified | Plexus: GitHub App APIにサーバー認証なし、allowlist空で許可 | 最優先。公開情報サイトの範囲を超えてGitHub資産に影響し得る |
| F-02 | High（環境で緩和可能） | version affected / production exploit unverified | Lilt: 成功デプロイのlockfileがNext 15.2.5 | 直ちに更新計画。RSC RCEの影響範囲 |
| F-03 | Medium | confirmed configuration / abuse unverified | Engraveの接続先とみられるStorageに匿名INSERT、公開、bucket制限なし | 匿名アップロード/コスト境界を見直す |
| F-04 | Medium（条件付き） | potential issue / reachability unknown | Commonplace 14.2.35、Noema 14.2.5のRSC DoS関連advisory | 機能/ビルドを確認して修正版へ。DoS検証しない |
| F-05 | Low | confirmed credential-persistence issue | Wenku: GitHub書込tokenを共有originのlocalStorageへ保存 | 修正PR作成済み。漏えい済みとは判断していない |

大部分のサイトは静的な公開情報/端末内学習ツールで、認証済みバックエンドやDBを持たない。その範囲のリスクは低い。全体を一律に「低リスク」「脆弱性なし」とは評価しない。Plexus、Engrave、HabHub、LiltはDB/認証/外部への書込処理を持つ例外で、公開情報だけを扱うという前提を個別に見直す必要がある。

今すぐ必要な対応はPlexusのGitHub書込経路の保護、Liltの古い成功デプロイと依存関係の更新、Engraveの匿名Storage権限の見直し。Wenkuの修正は [PR #12](https://github.com/Josh-Temple/Wenku/pull/12) にあり、まだ本番に反映していない。

## Scope・方法・制約

- Snapshotは2026-10-07 UTC。各default branchのimmutable commit SHAを末尾に記録し、そのSHAでコードを取得した。過去チャット/Memoryは現在状態の証拠にしていない。
- 公開repo一覧とhomepage/Pages情報、27 Vercel project、公開READMEと既存Web品質正本を照合した。
- 1,093コード/設定ファイルを取得。追加のlockfile、API/公開script、直近diff等も確認した。初期対象1,094ファイル中、HabHubのlegacy_archive/components/HabitCard.tsxのみ取得失敗。この旧Viteアーカイブは現在のNext配信コードではない。
- 現在GitHubから取得した11 lockfile（10 repo、kaigo root/ops別）をnpm公式registryのauditで追加照合。全11件の結果取得に成功。packageのinstall、lifecycle script、npm audit fixは実行せず、lockfileを書き換えていない。
- 28 repoのrecursive treeはtruncatedでない。90 workflowを取得して、イベント/権限/checkout/secret/入力展開/書込先/Pages artifactを確認した。
- 通常のブラウザGETで31公開入口を確認した。認証フォームへの入力/ログイン/書込API呼出はしていない。Plexusは/authへ、HabHubは/app/todayへ遷移した。
- shellから対象ホストへのHEADはタイムアウト、ブラウザによるAPI URL直接表示はnet::ERR_BLOCKED_BY_CLIENTだった。これは監査クライアントの制約であり、サイト側の401/403、APIが安全、サイト停止の証拠ではない。
- GitHub上の大量ファイル読取はソース取得であり、公開Web環境へのactive scanではない。負荷試験、DoS、brute force、認証回避、権限昇格、データ改ざん、悪用payload、見つかった秘密の使用は行っていない。
- Vercel envはdecrypt:falseで変数名/target等のmetadataのみ確認。秘密値は復号していない。Supabaseは接続済みprojectのpolicy/bucketカタログをSELECTしただけで、ユーザーデータやStorage objects本文は読んでいない。
- 全Git履歴のclone/全blob走査は行えていない。10重点repoの直近5 commit metadata、各2 commit diff（計20）、28 repo×2 path（.env / .env.local）の履歴照会、Lilt .env.localの導入diffを調べた。任意名の削除済み秘密、全branch/tag、LFS/binary、全研究Markdown/データdumpは未網羅。
- Report正本は既存の横断Web品質資料と同じBaukasten/docs/web-design。本書1つを正本とし、各repoに同じ文書を複製しない。

## Site inventory

Riskは本監査範囲の評価。「要確認」は安全なversion/実環境を断定できないことを表す。静的Vite/ReactのpackageにReactがあっても、サーバーRSCを持たない構成をRSC RCEの対象にしていない。

| Repository | URL | Hosting | Architecture | Attack surface | Risk |
|---|---|---|---|---|---|
| [Josh-Temple/CIRCUIT](https://github.com/Josh-Temple/CIRCUIT) | https://circuit-gold.vercel.app | Vercel | Vite/React・静的 | 計算入力・端末内状態・SW | Low |
| [Josh-Temple/Baukasten](https://github.com/Josh-Temple/Baukasten) | https://josh-temple.github.io/Baukasten/ | Pages | Vite/React・静的 | 公開リンク・外部Tailwind script | Low |
| [Josh-Temple/HabHub](https://github.com/Josh-Temple/HabHub) | https://hab-hub.vercel.app | Vercel | Next App Router | Supabase認証/DB、習慣入力、ブラウザ保存 | 要確認 |
| [Josh-Temple/Aether_2](https://github.com/Josh-Temple/Aether_2) | https://aether-2.vercel.app | Vercel | Next App Router + API | 天気検索/座標、WeatherAPI代理、localStorage | Low（quota要確認） |
| [Josh-Temple/Plexus](https://github.com/Josh-Temple/Plexus) | https://plexus-nine.vercel.app | Vercel | Next App Router + API | Supabase認証/DB、GitHub App読取/書込、Markdown、SW | High候補 F-01 |
| [Josh-Temple/world-history-lab](https://github.com/Josh-Temple/world-history-lab) | https://world-history-lab.vercel.app | Vercel | HTML/JS・静的 | 検索・選択・反省文・localStorage・SW | Low |
| [Josh-Temple/Majoris](https://github.com/Josh-Temple/Majoris) | https://majoris.vercel.app | Vercel | Vite/React・静的 | 学習入力/インポート、localStorage、SW | Low |
| [Josh-Temple/Engrave](https://github.com/Josh-Temple/Engrave) | https://engrave-theta.vercel.app | Vercel | Vite/React・静的 + Storage API | 文章/音声入力、端末内保存、Supabase Storage、SW | Medium F-03 |
| [Josh-Temple/GrokMath](https://github.com/Josh-Temple/GrokMath) | https://grok-math.vercel.app | Vercel | Next App Router | リポジトリMarkdown表示、学習状態、SW | 要確認（lockなし） |
| [Josh-Temple/Wenku](https://github.com/Josh-Temple/Wenku) | https://josh-temple.github.io/Wenku/ | Pages | HTML/JS・静的 | Markdown編集、GitHub token/Contents API、localStorage、CDN | Low F-05 |
| [Josh-Temple/Synapse](https://github.com/Josh-Temple/Synapse) | https://synapse-one-rho.vercel.app | Vercel | Vite/React・静的 | グラフJSONインポート、localStorage、SW | Low |
| [Josh-Temple/Retrace](https://github.com/Josh-Temple/Retrace) | https://retrace-eta.vercel.app | Vercel | Vite/React・静的 | 学習状態、localStorage/sessionStorage、SW | Low |
| [Josh-Temple/Parla](https://github.com/Josh-Temple/Parla) | https://parla-teal.vercel.app<br>https://parla-snxy.vercel.app | Vercel（2系統） | Next App Router | 学習入力・localStorage・SW、公開教材 | 要確認（lockなし） |
| [Josh-Temple/Echoir](https://github.com/Josh-Temple/Echoir) | https://echoir-theta.vercel.app | Vercel | Vite/React・静的 | 学習入力、localStorage、SW | Low |
| [Josh-Temple/Noema](https://github.com/Josh-Temple/Noema) | https://noema-mu.vercel.app | Vercel | Next App Router | 検索/保存、localStorage、SW、公開教材 | Medium候補 F-04 |
| [Josh-Temple/Recita](https://github.com/Josh-Temple/Recita) | https://recita-wine.vercel.app | Vercel | Vite/React・静的 | 学習入力/状態、localStorage | Low |
| [Josh-Temple/Lilt](https://github.com/Josh-Temple/Lilt) | https://lilt-six.vercel.app | Vercel | Next App Router + API | 公開教材API、Supabase接続コード、学習状態 | High候補 F-02 |
| [Josh-Temple/Tenet](https://github.com/Josh-Temple/Tenet) | https://tenet.vercel.app | Vercel | Vite/React・静的 | 個人ジャーナル/取引記録の端末内入力 | Low |
| [Josh-Temple/Commonplace](https://github.com/Josh-Temple/Commonplace) | https://commonplace-sable.vercel.app | Vercel | Next App Router | 公開ノート表示/検索、localStorage、SW | Medium候補 F-04 |
| [Josh-Temple/Loci](https://github.com/Josh-Temple/Loci) | https://loci-gamma.vercel.app | Vercel | Vite/React・静的 | 3D教材・学習操作 | Low |
| [Josh-Temple/studio-lab-research](https://github.com/Josh-Temple/studio-lab-research) | https://josh-temple.github.io/studio-lab-research/ | Pages | Jekyll・静的 | 公開研究/リンク。独自APIなし | Low |
| [Josh-Temple/kaigo-rules](https://github.com/Josh-Temple/kaigo-rules) | https://kaigo-rules.vercel.app<br>https://ops-site-pi.vercel.app | Vercel（root/ops-site） | Next App Router、rootに読取API | 検索・公開制度データ・Analytics。DB/認証なし | Low |
| [Josh-Temple/parenting-evidence](https://github.com/Josh-Temple/parenting-evidence) | https://parenting-evidence.vercel.app | Vercel | Astro output: static | 公開記事・リンク | Low |
| [Josh-Temple/ai-business-transformation](https://github.com/Josh-Temple/ai-business-transformation) | https://ai-business-transformation-nine.vercel.app | Vercel | HTML/CSS・静的 | 公開記事/ポートフォリオ、リンク | Low |
| [Josh-Temple/systematic-trading-research](https://github.com/Josh-Temple/systematic-trading-research) | https://josh-temple.github.io/systematic-trading-research/ | Pages | HTML/JS・静的 | 公開研究JSON表示。注文/決済APIなし | Low |
| [Josh-Temple/public-sector-ai-procurement-japan](https://github.com/Josh-Temple/public-sector-ai-procurement-japan) | https://josh-temple.github.io/public-sector-ai-procurement-japan/ | Pages | HTML/JS・静的 | 検索/比較/仕様草案、公開CSV、ブラウザ内処理 | Low |
| [Josh-Temple/can-ai-do-this](https://github.com/Josh-Temple/can-ai-do-this) | https://josh-temple.github.io/can-ai-do-this/ | Pages | HTML/JS・静的 | 検索/比較、GitHub issue URL生成、公開JSON | Low |
| [Josh-Temple/instant-radio](https://github.com/Josh-Temple/instant-radio) | https://josh-temple.github.io/instant-radio/<br>https://instant-radio.vercel.app | Pages + Vercel | HTML/JS・静的 | 貼付/共有query、SpeechSynthesis、localStorage、SW | Low |

対象外/候補確認: PortfolioPrototype/Portfolio_GASには静的ホスティング案やAI Studio編集リンクがあるが、現在の公開配信を確認できなかった。Ingrain/habhub_androidはAndroid系、theory-reading-lab/studio-lab-sandbox/Josh-Templeは制作/研究/プロフィール用途。AetherはVercel projectに失敗deploymentがあるが、公開稼働URLの証拠がなく対象サイト数に含めない。接続済みVercelの非公開source projectは今回の「公開repo」監査外とし、非公開source情報をここに転載していない。

## Findings — severity順

### F-01 — Plexus: GitHub Appの読取/書込APIにサーバー側認証・認可がない

- Repository/current commit/production metadata: Josh-Temple/Plexus、**add8f035821931dda0970367770c626e5861dddc**。公開 https://plexus-nine.vercel.app/ は/authへ遷移。Vercel READY deploymentも同SHA。
- Files: [commit route](https://github.com/Josh-Temple/Plexus/blob/add8f035821931dda0970367770c626e5861dddc/src/app/api/github/commit/route.ts) lines 16–103、[save-note route](https://github.com/Josh-Temple/Plexus/blob/add8f035821931dda0970367770c626e5861dddc/src/app/api/save-note/route.ts)、[open route](https://github.com/Josh-Temple/Plexus/blob/add8f035821931dda0970367770c626e5861dddc/src/app/api/github/open/route.ts)、[githubApp.ts](https://github.com/Josh-Temple/Plexus/blob/add8f035821931dda0970367770c626e5861dddc/src/lib/githubApp.ts) lines 44–95。
- 該当処理: POST bodyからowner/repo/branch/path/contentを受け取り、GitHub App installation tokenを発行してContents APIを読む/書く。routeにSupabase getUser/getClaims、session検証、userとrepo/pathの認可がない。middleware/proxyもtreeにない。UI側ログイン確認はこのrouteを保護しない。
- assertRepoAllowedはallowListが空ならreturnする。現在取得できたVercel env metadataには本番GITHUB_APP_IDとGITHUB_APP_PRIVATE_KEYがあり、GITHUB_ALLOWED_REPOSはない。値の有効性/installationの対象repo/permissionsは未確認。
- Attacker input: request JSONのrepo/branch/path/content。save-noteはnotes/*.mdと..除外があるが、認証にはならない。commit routeはより広いファイル指定を受け付ける。
- Attack path: 公開APIに直接requestできる条件下で、Appに許可されたrepoの読取/書込処理へ進み得る。allowlist追加だけではログインユーザーの認可不足は残る。GitHub側のApp permissions、branch protection、Vercel側のroute制限で最終影響は変わる。
- Impact: Appにcontents writeがあれば公開ページ/記事の改ざん、許可対象private repoの内容読取等。workflow file書込はAppの別権限も必要なので、その経路は断定しない。秘密鍵そのものがAPIから返る証拠はない。
- Reachability: 公開UI・同SHA READY・credentials設定の存在まで確認。GETのAPI直接表示はクライアント側block。POST/認証回避/書込は実施していないため **potential issue / production exploit unverified**。
- Confidence: コード上の認証欠落/空allowlistはHigh。公開API悪用/対象資産の範囲は未確認。Severity **High（条件付き）**、Criticalとはしていない。
- 推奨修正: 全3 routeの冒頭で既存Supabase sessionをサーバーで検証し、許可user/app_metadata等とrepo/branch/pathを認可。clientから検証用Bearer tokenを渡す方式または検証済cookie方式を整合させる。自己申告user IDやuser_metadataを信用しない。allowlist空は拒否、installation tokenは対象repositoryに絞り、GitHub App権限も最小化。bodyサイズ制限/型validation、汎用error、rate limitを加える。
- 安全な検証案: mock GitHub fetchでunauthenticated=401、authenticated-but-not-authorized=403、allowlist空=拒否、いずれもtoken発行/PUTなし、許可された既存操作だけ成功をテストする。本番POSTで確認しない。
- 未修正理由: client/server認証方式と許可user/repoの運用決定が必要。空allowlistを即拒否すると現在の連携を止めるため、互換性を保証できる小修正ではない。暫定の経路停止/保護と本修正を優先する。

### F-02 — Lilt: 古い成功デプロイがRSC RCEの影響versionを保持

- Repo/current SHA: Josh-Temple/Lilt、**81ab692de04ac59a9622d1ad56fbd6ffaa270947**。公開 https://lilt-six.vercel.app/ は通常表示し「Local fallback mode」を示す。
- Vercelのlatest deploymentはERROR。直近READY production deployment **dpl_AFCr8x58XgexyMoXCoKAUsN89u5r** のsourceは **f839a10f33cc283a257a15cea603757205518f49**。そのSHAのpackage-lock.jsonもfresh readし、next **15.2.5**、react **19.0.0**を確認した。READY履歴だけでalias切替履歴の全ては断定できないが、古い成功版が残るリスクは実在する。
- Evidence: [default lock](https://github.com/Josh-Temple/Lilt/blob/81ab692de04ac59a9622d1ad56fbd6ffaa270947/package-lock.json)、[READY source lock](https://github.com/Josh-Temple/Lilt/blob/f839a10f33cc283a257a15cea603757205518f49/package-lock.json)、app/配下のApp Router、Next API route。
- Advisory: [GHSA-9qr9-h5gf-34mp](https://github.com/vercel/next.js/security/advisories/GHSA-9qr9-h5gf-34mp) / upstream **CVE-2025-55182**、Next downstream **CVE-2025-66478**。Advisory severity Critical/CVSS10、15.2系の該当範囲 **>=15.2.0 <15.2.6**、固定version **15.2.6**。stable14系にはこのRCEを適用しない。
- Attacker input/attack path: App Router/RSC requestのdeserialization。単なるクライアントReactとは異なりサーバーRSCを含むNext構成。成功すればserverでのコード実行/環境変数へのアクセス等。Local fallback UIはNextサーバーそのものを消さない。
- Reachability: affected source/lockと公開Next画面は確認済み。ビルドで実際に解決された全package、RSC requestのWAF通過/実行は未確認。**version affected / reachability unknown at exploit level**。悪用payloadは送信していない。
- Vercelは[WAF緩和策](https://vercel.com/changelog/cve-2025-55182)を公開しているが、同時にWAFだけに依存せずupgradeを求める。緩和を無視して「今すぐRCE可能」とは判断していない。
- Confidence: lock/構成 High、実環境exploit Medium/未実証。Site severity **High（条件付き）**。既に侵害されたとは判断しない。
- 推奨修正: 15.2.6はこのRCEだけの最低修正版で、後続advisoryまで解消する最終目標ではない。現在の15系修正目標 **15.5.27**（[2026-09 release](https://nextjs.org/blog/september-2026-security-release)）等へpackage/lockを整合更新。現在manifestの^15.2.10とlockの15.2.5にもずれがある。npm ci、tests/typecheck/build、公開教材/API/オフライン機能を検証し、成功deploymentのSHA/versionを記録する。
- 未修正理由: lockを更新せずversion文字列だけ変える修正はしない。dependency install/build/破壊的変更の検証を完了していないためupdate PRは作っていない。運用停止/秘密rotation等は人間の操作が必要で、本監査では実施しない。

### F-03 — Engrave: 匿名アップロードと公開Storageの境界

- Repo/current+production SHA: Josh-Temple/Engrave、**76869e530804cfce5bed4c8b4b479ad434384799**。公開 https://engrave-theta.vercel.app/。
- Evidence: [audioStorage.ts](https://github.com/Josh-Temple/Engrave/blob/76869e530804cfce5bed4c8b4b479ad434384799/src/lib/audioStorage.ts) lines 3–43/79–110、[supabase.ts](https://github.com/Josh-Temple/Engrave/blob/76869e530804cfce5bed4c8b4b479ad434384799/src/lib/supabase.ts) lines 1–3/38–51。VercelにVITE_SUPABASE_URL/ANON_KEY/AUDIO_STORAGE_MODEとEngrave名のSupabase integration envがある。公開keyは秘密扱いしない。
- Live connected setting: 接続済みproject「supabase-engrave」のpg_policies読取でstorage.objectsへのanon INSERT、条件bucket_id='card-audio'を確認。storage.bucketsの当該行は **public=true、file_size_limit=null、allowed_mime_types=null**。SELECTしたのは設定カタログだけ。実環境設定はrepo commitに属さないため別証拠として扱う。
- コードはanonymous keyでuploadし、700KB/MP3-WAVチェックをclientで行う。client制限は直接Storage API requestの制限にならない。Storageの全体上限/プラン制限は別にあり「完全に無制限」とは表現しない。
- Attacker input/attack path: 公開publishable/anon keyを利用できる条件下で、新規object名/内容のINSERTを許す設定。公開bucketからそのobjectが配信される構成。別userの既存objectを上書き/削除できるpolicyは今回のqueryにないので断定しない。
- Impact: 意図しないファイル公開、保存容量/転送コスト、spam hosting。公開音声URL自体は設計上意図された公開であり、既存音声が個人情報漏えいとは判定していない。
- Reachability: policy/bucket設定はconfirmed。project名とintegration envからEngraveとの関連は強く推定するが、env値は復号せずVITE_URLの完全一致/現在のstorage modeは未確認。anonymous upload/公開取得の実行はしていない。**confirmed configuration / actual abuse unverified**。
- Confidence: 設定 High、サイトからの正確な接続/稼働mode Medium。Severity **Medium**。標準用途の公開Storageであることだけを問題にしていない。
- 推奨修正: 不要ならSupabase upload modeを廃止してlocal保存を正本にする。必要なら認証済userごとのpath/owner制約、serverが発行する限定upload権限、bucket側700KB程度の上限とaudio MIME allowlistを導入し、費用監視/制限を設ける。匿名uploadを続けるなら明示的なabuse対策が必要。
- 未修正理由: INSERT policy削除は現行機能を止める。音声の公開/認証方式の判断、migrationと許可/拒否の検証が必要。production policyを勝手に変更していない。
- [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control)。Advisorが重大警告を返さないことを、そのpolicyが用途に安全である証拠にはしない。

### F-04 — Commonplace / Noema: Next14の古い依存関係とRSC DoS候補

- Repos/SHAs: Commonplace **fa6ef9b59cf12e0dbe630d2ddff4da2725a421ac**、Noema **5f92b579f0d84529da2f10465b87a1ef3b9bd515**。それぞれ公開 https://commonplace-sable.vercel.app/、https://noema-mu.vercel.app/、READY sourceは同SHA。
- [Commonplace lock](https://github.com/Josh-Temple/Commonplace/blob/fa6ef9b59cf12e0dbe630d2ddff4da2725a421ac/package-lock.json): next **14.2.35**。 [Noema lock](https://github.com/Josh-Temple/Noema/blob/5f92b579f0d84529da2f10465b87a1ef3b9bd515/package-lock.json): next **14.2.5**。どちらもApp Router、Next configにoutput:'export'なし。アプリ固有API/明示的'use server'関数は取得コードに検出しなかった。
- [GHSA-h25m-26qc-wcjf](https://github.com/vercel/next.js/security/advisories/GHSA-h25m-26qc-wcjf) / upstream **CVE-2026-23864**: next **>=13.0.0 <15.0.8**等の影響range、15.0系固定 **15.0.8**。他branch固定15.1.12/15.2.9/15.3.9/15.4.11/15.5.10/16.0.11/16.1.5。Advisory severity High。
- Noemaはさらに[GHSA-5j59-xgg2-r9c4 / CVE-2025-67779](https://github.com/vercel/next.js/security/advisories/GHSA-5j59-xgg2-r9c4)の14系固定14.2.35にも達していない。Commonplaceはこの2025年の固定点には達しているが、2026年の問題全ての安全証明にはならない。
- Attacker input/attack path: 影響するApp Router Server Functionのrequest deserialization。起動している該当endpointがあればCPU/メモリ枯渇/一時停止。DBやユーザー情報の取得を意味しない。
- Reachability: 公開App Router UIとaffected versionは確認。該当Server Functionがビルドartifactで公開されるかは未確認。**version affected / reachability unknown**。DoS試験を行わず、「静的教材だから安全」「確実に停止させられる」のどちらも断定しない。
- Confidence: version High、機能到達性 Medium以下。Site severity **Medium（条件付き）**。stable14はF-02のRCEにはnot affected。
- 推奨修正: supported修正branch（15.5.27等）への移行を検証。Next14→15はbreaking change確認が必要。Server Function/build artifactを確認し、純静的exportへ変更する場合も配信方式の変更として別に検証する。今回はmigration/update/DoS検証をしていない。

### F-05 — Wenku: GitHub書込tokenの永続保存

- Repo/current+Pages source SHA: Josh-Temple/Wenku、**fb15258d6a239c63839031469ee3f26b5293c358**。公開 https://josh-temple.github.io/Wenku/。成功Pages run 22903537087のhead SHAも一致。
- Evidence: [app.js](https://github.com/Josh-Temple/Wenku/blob/fb15258d6a239c63839031469ee3f26b5293c358/app.js) lines 134–169。token入力をgetConfigFromInputsに含め、saveConfigで全configをlocalStorageのwenku.github.config.v1に保存、loadConfigで復元する。theme変更時にもsaveConfigを呼ぶ。index.html lines127–130は外部JSを同ページに読み込む。
- Attacker input/attack path: 攻撃者が既に同originのscript実行を得ることが条件。GitHub project Pagesはpathが違ってもjosh-temple.github.io originを共有し、他projectのscriptもそのlocalStorageを読める。第三者CDN scriptもページ内の入力/保存tokenにアクセスできる。今回、そのscript改ざんやXSSを実証したわけではない。
- Impact: 被害者が保存したtokenのscope/expiryに応じGitHub repoの読取/書込。保管期間を延ばし他Pagesへ境界を広げる点が問題。実在する保存tokenは読み出していない。漏えい済み/鍵rotation必須とは判断していない。
- Reachability: public UIとコードのtoken永続保存はconfirmed。token奪取には別のscript侵害等が必要。Confidence High、Severity **Low**。単独のunauthenticated remote exploitとしてMedium/Highに上げない。
- 修正: [Wenku PR #12](https://github.com/Josh-Temple/Wenku/pull/12)、head **5400721689e6181c4e1951eded5cc0eadf282b7e**。tokenを現在pageだけに保持し、保存configから除外、旧tokenをload時に除去、壊れた旧configは内容をログせず消去。repo/theme設定と既存GitHub requestは維持。reload時はtoken再入力が必要。
- 検証: node --check app.js、node scripts/test-config-security.mjs PASS。未保存/旧token除去/非秘密設定維持/壊れたconfigから秘密をログしないことを確認。dependency変更なし。本番token使用/書込テストなし。
- 残存: PR未merge・未deployなので公開版は未修正。入力中tokenへ同ページscriptがアクセスできる境界は残る。short-lived/単一repo token、外部JS固定/自己配信等を次の改善とする。

## Dependency assessment

判定はadvisoryのversionだけでなく、サーバー/ビルド/クライアントの利用条件を分けた。lockがないrepoについてpackage.jsonのrangeを「実際にinstallされたversion」として扱わない。Vercel metadataのLAMBDASやlive:falseも、API実在/サイト停止の根拠に使わない。

| Repository / package | 確認version | Advisory / fixed version | Reachability判定 |
|---|---|---|---|
| kaigo-rules root / ops-site Next | 16.3.6 / 16.3.6（ops READY SHAでも同じ） | GHSA-9qr9-h5gf-34mp: 16.0.7 fixed | not affected（当該RCE） |
| 同上 Next ImageResponse | 16.3.6 | [GHSA-vcvr-r3jv-pc5j / CVE-2026-94545](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j): >=16.2.0 <16.3.6、fixed16.3.6 | not affected。当該versionは固定点 |
| 同上 Next September SSRF/cache等 | 16.3.6 | [2026-09 release](https://nextjs.org/blog/september-2026-security-release): 16.3.8/15.5.27 | version affected / 条件別ではlikely unreachable。remotePatterns、next/image、next/og、root catch-all、use cache、Draft Modeを取得コードに検出せず。全未確認条件の安全保証はしない |
| Lilt Next | 15.2.5（default/READY source） | F-02:15.2.6 fixed RCE、後続DoS15.2.9等 | version affected / exploit reachability unknown |
| Commonplace Next | 14.2.35 | F-04 | version affected / reachability unknown。2025 RSC RCEはnot affected |
| Noema Next | 14.2.5 | F-04、CVE-2025-67779 fixed14.2.35 | version affected / reachability unknown。2025 RSC RCEはnot affected |
| Plexus / GrokMath / HabHub / Parla / Aether_2 Next | lockなし。manifest ^15.0.0 / ^15.2.5 / ^15.5.8 / 14.2.5 / 14.2.5 | 15系RCE固定点、14系DoS等に要照合 | deployed version unknown。range/manifestだけでconfirmed CVEにはしない |
| Baukasten / Engrave Vite | 6.4.1 | [GHSA-p9ff-h696-f583](https://github.com/vitejs/vite/security/advisories/GHSA-p9ff-h696-f583): >=6 <=6.4.1、fixed6.4.2（他line7.3.2/8.0.5） | affected but likely unreachable in production。静的build配信にdev WebSocketなし。ローカルdev運用は別 |
| CIRCUIT / Tenet Vite | 6.4.3 | 上記fixed6.4.2 | not affected（当該advisory） |
| Recita / Noema Vite | 5.4.21 | [GHSA-93m4-6634-74q7 / CVE-2025-62522](https://github.com/vitejs/vite/security/advisories/GHSA-93m4-6634-74q7): 5系<=5.4.20、fixed5.4.21/6.4.1 | not affected。Windows公開dev条件も本番には成立しない |
| parenting-evidence Astro / Vite | 7.3.3 / 8.3.0 | Astroはoutput:static。上記Vite WSはfixed8.0.5 | 当該Vite issue not affected。サーバー用Astro機能を静的サイトへ過大適用しない |
| Wenku DOMPurify | CDN指定3.1.6 | [GHSA-vhxf-7vqr-mrjg / CVE-2025-26791](https://github.com/cure53/DOMPurify/security/advisories/GHSA-vhxf-7vqr-mrjg): <3.2.4、fixed3.2.4 | affected but likely unreachable: SAFE_FOR_TEMPLATES=true条件を設定しない |
| 同上 DOMPurify | 3.1.6 | [GHSA-v8jm-5vwx-cfxm / CVE-2025-15599](https://github.com/advisories/GHSA-v8jm-5vwx-cfxm): >=3.1.3 <3.2.7、fixed3.2.7 | affected but likely unreachable: sanitized出力はpreview div。rawtext要素内へ配置する条件を検出せず |
| 同上 DOMPurify | 3.1.6 | [GHSA-p3vf-v8qc-cwcr](https://github.com/cure53/DOMPurify/security/advisories/GHSA-p3vf-v8qc-cwcr): <2.4.2、fixed2.4.2 | not affected。NVD CPE等だけを根拠に3.1.6へ誤適用しない |
| Wenku marked / Mermaid / highlight.js | unversioned / major11 / 11.10.0 CDN | 取得時の実配信versionは未確認 | floating指定は再現性/サプライチェーンhardening。脆弱性の実在とは分ける |

kaigo-rulesは現在のroot/ops lockをfresh readし、古いNext.jsという先入観でFindingを出していない。ops-siteのpublic sourceはdefault branchより古いb79a26a75644ede56dd8712bd8208fcd34968f29だが、そのlockも16.3.6だった。単に16.3.8未満という理由でHighにしていない。

2026-08のAVIF/sharp経路はNext16.3.3/15.5.24 fixedのreleaseを照合。kaigo16.3.6には当該固定が含まれる。Windows server特有の問題をVercelの構成へそのまま当てはめない。すべての依存CVEがないという保証ではない。

## npm公式registryとの追加照合 — versionと公開到達性を分離

2026-10-07 UTCに、現在SHAから取得したpackage/lockのみを使って `npm audit --package-lock-only --ignore-scripts --json` を実行した。以下は**脆弱と報告されたpackageの件数**で、unique advisory数・到達可能な本番脆弱性数・上記Finding数とは異なる。間接依存の連鎖と同じadvisoryの重複も含む。Noemaは初回timeout後の1回の再取得で結果を取得した。

| Lockfile | Critical | High | Moderate | Low | Total packages |
|---|---:|---:|---:|---:|---:|
| Baukasten | 0 | 7 | 1 | 1 | 9 |
| CIRCUIT | 2 | 2 | 2 | 0 | 6 |
| Commonplace | 1 | 8 | 2 | 0 | 11 |
| Engrave | 0 | 6 | 1 | 6 | 13 |
| Lilt | 1 | 13 | 2 | 2 | 18 |
| Noema | 3 | 22 | 6 | 0 | 31 |
| Recita | 0 | 5 | 2 | 1 | 8 |
| Tenet | 0 | 5 | 4 | 0 | 9 |
| kaigo-rules/ops-site | 0 | 2 | 0 | 0 | 2 |
| kaigo-rules | 0 | 2 | 0 | 0 | 2 |
| parenting-evidence | 0 | 3 | 0 | 0 | 3 |

### 追加で確認した主要な依存リスク

| Package / source evidence | Advisory、affected range、patched | 本サイトでの入力・attack path・影響 | 判定・修正方針 |
|---|---|---|---|
| sharp: kaigo root/ops・parenting-evidence **0.35.4**、Lilt **0.33.5**。各package-lock.json。現在SHAは末尾表、kaigo ops READY sourceでも0.35.4 | [GHSA-wq5f-xc86-pv6w / CVE-2026-96889](https://github.com/lovell/sharp/security/advisories/GHSA-wq5f-xc86-pv6w): **<0.35.5**、patched **0.35.5**。librsvg 2.63.2で修正 | 悪意あるSVGのdecodeが前提。glibc/LinuxでRCEになる条件はNode binary等にも依存。取得appにユーザーSVG upload→sharp処理、next/image import、危険なSVG許可設定を検出せず。Astroはstatic build。Next画像endpointの実動作/実行binaryは未確認 | **affected but likely unreachable**、version confidence High、公開到達性 Medium以下。Next16.3.6だから全依存安全とは言えない。次回更新でsharp0.35.5以上に整合更新しbuild。画像受入追加前は再評価。Liltには別途libvips/libheif advisoryもある |
| source-map-js **1.2.1**: 全11 lockfile | [GHSA-68fv-2mgg-jv7q / CVE-2026-93749](https://github.com/7rulnik/source-map-js/security/advisories/GHSA-68fv-2mgg-jv7q): **>=1.0.0 <1.2.2**、patched **1.2.2** | 攻撃者のindexed source map section offsetsをparserが処理することでevent-loop DoS。公開APIでsource mapを受け取りこのparserに渡す経路を検出せず。通常はCSS/buildツールの依存 | **affected but likely unreachable in production**。CIが未信頼mapを処理するリスクは別。次回lock更新で1.2.2以上。DoSは実行しない |
| Engrave katex **0.16.33**: package-lock.json、React Markdown/math renderer | [GHSA-238p-pmpm-9mq7 / CVE-2026-103923](https://github.com/KaTeX/KaTeX/security/advisories/GHSA-238p-pmpm-9mq7): **>=0.11.0 <0.18.2**、patched **0.18.2** | 数式入力はユーザー制御だが、trust制限回避には**既存のprototype pollutionまたはoptions prototype制御**が追加条件。KaTeX自身がpollutionを発生させるadvisoryではない。その入口を取得コードで検出せず。条件成立時は生成HTML/リンクからXSS等 | **affected but likely unreachable**、version High/条件確認 Medium。単なる数式入力だけでconfirmed XSSにしない。renderer互換性を確認して更新 |
| Tenet react-router **7.17.0**: package-lock.json、src/App.tsxのBrowserRouter、各pagesのnavigate | [GHSA-wrjc-x8rr-h8h6 / CVE-2026-53669](https://github.com/remix-run/react-router/security/advisories/GHSA-wrjc-x8rr-h8h6): **>=6 <7.18.0**、patched **7.18.0**。RSC/SSR関連の後続advisoryもregistryで照合 | 攻撃者制御のraw destinationをLink/useNavigateに渡すとbackslash open redirect。取得コードは固定pathか固定prefix+idで、raw外部destinationを渡す箇所を検出せず。RSC/SSR server/actionを持たないVite静的構成 | open redirect **affected but likely unreachable**。RSC/SSR固有条件は構成上成立しない。次回更新で後続CSRFもfixedの7.18.2以上を目標にnavigation確認 |
| CIRCUIT / Noema tinypool **1.1.1**: test依存 | [GHSA-85c8-ppgw-ccpr / CVE-2026-104849](https://github.com/tinylibs/tinypool/security/advisories/GHSA-85c8-ppgw-ccpr): **<2.1.2**、patched **2.1.2**。先行GHSA-5gmw-xhrv-c9v3も照合 | 既存prototype pollutionとworker/run options等が前提のRCE gadget。公開サイトのAPIからworker optionsに渡す処理を検出せず。test runnerの依存で、静的配信にtest workerはない | **affected but likely unreachable in production**。registry Criticalをsite Criticalへ加算しない。Vitest/workerをセットで更新しテスト |
| parenting-evidence http-cache-semantics **4.2.0**: build依存 | [GHSA-ch52-4w7c-c8xp / CVE-2026-93748](https://github.com/kornelski/http-cache-semantics/security/advisories/GHSA-ch52-4w7c-c8xp): **<=4.2.0**、patched版は今回未確認 | max-staleで共有cacheから他利用者のresponseを出す構成が条件。Astro static outputにログイン/利用者別server response cacheは検出せず | **affected but likely unreachable**。更新時にadvisoryのpatched版を再確認。認証cacheへ流用しない |

Next関連のregistry Criticalについても区別する。**Windows-hosted RCE GHSA-p293-qw3h-jr36**はVercelの通常Linux実行環境と条件が異なり、site Criticalにしない。**AVIF Image Optimization RCE GHSA-2xp9-vwfh-vxw4**はNext15.5.24/16.3.3で修正。Lilt/Commonplace/Noemaはversion affectedだが、取得コードにnext/image、攻撃者制御AVIF upload/remotePatternsを検出せず、到達性はlikely unreachable / runtime unknown。kaigo Next16.3.6はこのNext advisoryにnot affectedだが、上記**別のsharp SVG advisoryにはaffected**である。

F-04にはregistryの後続RSC DoS [GHSA-q4gf-8mx6-v5v3](https://github.com/vercel/next.js/security/advisories/GHSA-q4gf-8mx6-v5v3)（>=13 <15.5.15、fixed15.5.15）、[GHSA-8h8q-6873-q5fj](https://github.com/vercel/next.js/security/advisories/GHSA-8h8q-6873-q5fj)（>=13 <15.5.16、fixed15.5.16）も同じ修正対象として含める。Server Action/RSCの実ビルド到達性は未検証で、DoSを実行しない。個別advisoryを同じ根本問題のFindingとして重複加算しない。

それ以外のNext advisoryはmiddleware/proxy認可、Pages i18n、nonce、beforeInteractiveへの未信頼値、rewrites、custom serverのWebSocket、image cache、Cache Components、Server Actions等の条件に分類した。取得対象では対応する機能/入力経路の多くを検出せず **affected but likely unreachable**。RSC cacheやrequest body/cacheの実動作は **version affected / reachability unknown**。middlewareがないNoemaを「middleware auth bypass confirmed」としない。

Babel/PostCSS/source-map/rollupのfile read/write、glob CLI、brace/glob/selector/YAML解析、browserslist等のDoSは、通常のbuild/lint/testに関する依存。公開入力からbuild command、任意source map、glob pattern、YAML mergeに到達する経路を検出せず、**affected but likely unreachable in production**。Noemaのws/form-data等はconsumerを含めて本番入力経路を確定できず **version affected / reachability unknown** と残す。外部PRや依存更新がCIで動く場合の未信頼コード処理は供給経路の別問題であり、依存脆弱性の存在だけでsecrets付き実行を断定しない。公開dev serverを持たないVite/esbuild/Vitestのadvisoryはproductionからlikely unreachable。手元dev serverの公開や未信頼workspaceは本監査の実測対象外。

### Registryが報告した直接advisoryの追跡表

以下はregistry応答に含まれるadvisoryを重複整理した追跡用一覧。Severityは**advisory自体**の値。列のrangeはregistryが返す代表branchのrangeで、全branchを網羅する公式affected rangeではない（例: Next14と15、picomatch2と4）。installedはそのpackageについてregistryが示したnode群の実lock versionであり、列内の全versionが代表rangeに入るという意味ではない。複数lineのaffected/fixedはリンク先の一次advisoryが正本。主要な修正目標は上表/本文でverified、その他のpatched versionは未確認として残し、更新時の再確認を必須とする。

| Package | Advisory / severity | Registry range（代表line） | Repo: installed lock version |
|---|---|---|---|
| @babel/core | [GHSA-4x5r-pxfx-6jf8](https://github.com/advisories/GHSA-4x5r-pxfx-6jf8) / low | `<=7.29.0` | Baukasten:7.28.6; Engrave:7.29.0; Recita:7.29.0 |
| baseline-browser-mapping | [GHSA-w5vr-8v7q-w6rv](https://github.com/advisories/GHSA-w5vr-8v7q-w6rv) / moderate | `>=2.0.0 <2.11.0` | Baukasten:2.9.19; Engrave:2.10.0; Noema:2.10.8; Recita:2.10.11; Tenet:2.10.37 |
| browserslist | [GHSA-c83g-rgw3-j3cx](https://github.com/advisories/GHSA-c83g-rgw3-j3cx) / high | `<=4.28.6` | Baukasten:4.28.1; Engrave:4.28.1; Noema:4.28.1; Recita:4.28.1; Tenet:4.28.2 |
| browserslist | [GHSA-73wf-gq98-2v4g](https://github.com/advisories/GHSA-73wf-gq98-2v4g) / high | `<=4.28.6` | Baukasten:4.28.1; Engrave:4.28.1; Noema:4.28.1; Recita:4.28.1; Tenet:4.28.2 |
| esbuild | [GHSA-g7r4-m6w7-qqqr](https://github.com/advisories/GHSA-g7r4-m6w7-qqqr) / low | `>=0.27.3 <0.28.1` | Engrave:0.27.3 |
| katex | [GHSA-238p-pmpm-9mq7](https://github.com/advisories/GHSA-238p-pmpm-9mq7) / low | `>=0.11.0 <0.18.2` | Engrave:0.16.33 |
| nanoid | [GHSA-28wg-ghj8-5hjv](https://github.com/advisories/GHSA-28wg-ghj8-5hjv) / high | `<3.3.16` | Baukasten:3.3.11; Engrave:3.3.11; Lilt:3.3.11; Noema:3.3.11; Recita:3.3.11; Tenet:3.3.12 |
| nanoid | [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8) / high | `<3.3.18` | Baukasten:3.3.11; CIRCUIT:3.3.16; Commonplace:3.3.16; Engrave:3.3.11; Lilt:3.3.11; Noema:3.3.11; Recita:3.3.11; Tenet:3.3.12 |
| nanoid | [GHSA-xwg4-73v4-xw9w](https://github.com/advisories/GHSA-xwg4-73v4-xw9w) / high | `<3.3.12` | Baukasten:3.3.11; Engrave:3.3.11; Lilt:3.3.11; Noema:3.3.11; Recita:3.3.11 |
| picomatch | [GHSA-3v7f-55p6-f55p](https://github.com/advisories/GHSA-3v7f-55p6-f55p) / moderate | `>=4.0.0 <4.0.4` | Baukasten:4.0.3; Engrave:4.0.3; Noema:2.3.1,4.0.3 |
| picomatch | [GHSA-c2c7-rcm5-vvqj](https://github.com/advisories/GHSA-c2c7-rcm5-vvqj) / high | `>=4.0.0 <4.0.4` | Baukasten:4.0.3; Engrave:4.0.3; Noema:2.3.1,4.0.3 |
| postcss | [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) / moderate | `<8.5.10` | Baukasten:8.5.6; Commonplace:8.4.31; Engrave:8.5.6; Lilt:8.4.31,8.5.8; Noema:8.4.31,8.4.39,8.5.8; Recita:8.5.8 |
| postcss | [GHSA-6g55-p6wh-862q](https://github.com/advisories/GHSA-6g55-p6wh-862q) / high | `<=8.5.11` | Baukasten:8.5.6; Commonplace:8.4.31; Engrave:8.5.6; Lilt:8.4.31,8.5.8; Noema:8.4.31,8.4.39,8.5.8; Recita:8.5.8 |
| postcss | [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp) / moderate | `<=8.5.22` | Baukasten:8.5.6; CIRCUIT:8.5.22; Commonplace:8.4.31; Engrave:8.5.6; Lilt:8.4.31,8.5.8; Noema:8.4.31,8.4.39,8.5.8; Recita:8.5.8; Tenet:8.5.15 |
| postcss | [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849) / high | `<=8.5.17` | Baukasten:8.5.6; Commonplace:8.4.31; Engrave:8.5.6; Lilt:8.4.31,8.5.8; Noema:8.4.31,8.4.39,8.5.8; Recita:8.5.8; Tenet:8.5.15 |
| source-map-js | [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) / high | `>=1.0.0 <1.2.2` | Baukasten:1.2.1; CIRCUIT:1.2.1; Commonplace:1.2.1; Engrave:1.2.1; Lilt:1.2.1; Noema:1.2.1; Recita:1.2.1; Tenet:1.2.1; kaigo-rules/ops-site:1.2.1; kaigo-rules:1.2.1; parenting-evidence:1.2.1 |
| vite | [GHSA-4w7w-66w2-5vf9](https://github.com/advisories/GHSA-4w7w-66w2-5vf9) / moderate | `<=6.4.1` | Baukasten:6.4.1; Engrave:6.4.1; Noema:5.4.21; Recita:5.4.21 |
| vite | [GHSA-p9ff-h696-f583](https://github.com/advisories/GHSA-p9ff-h696-f583) / high | `>=6.0.0 <=6.4.1` | Baukasten:6.4.1; Engrave:6.4.1 |
| vite | [GHSA-v6wh-96g9-6wx3](https://github.com/advisories/GHSA-v6wh-96g9-6wx3) / moderate | `<=6.4.2` | Baukasten:6.4.1; Engrave:6.4.1; Noema:5.4.21; Recita:5.4.21 |
| vite | [GHSA-fx2h-pf6j-xcff](https://github.com/advisories/GHSA-fx2h-pf6j-xcff) / high | `<=6.4.2` | Baukasten:6.4.1; Engrave:6.4.1; Noema:5.4.21; Recita:5.4.21 |
| @eslint/plugin-kit | [GHSA-xffm-g5w8-qvg7](https://github.com/advisories/GHSA-xffm-g5w8-qvg7) / low | `<0.3.4` | Lilt:0.2.8 |
| @humanfs/node | [GHSA-p498-v437-472g](https://github.com/advisories/GHSA-p498-v437-472g) / moderate | `<0.16.8` | Lilt:0.16.7 |
| brace-expansion | [GHSA-jxxr-4gwj-5jf2](https://github.com/advisories/GHSA-jxxr-4gwj-5jf2) / moderate | `>=5.0.0 <5.0.6` | Lilt:1.1.13,5.0.5 |
| brace-expansion | [GHSA-3jxr-9vmj-r5cp](https://github.com/advisories/GHSA-3jxr-9vmj-r5cp) / high | `<1.1.16` | Lilt:1.1.13,5.0.5; Noema:1.1.12,2.0.2 |
| brace-expansion | [GHSA-mh99-v99m-4gvg](https://github.com/advisories/GHSA-mh99-v99m-4gvg) / high | `<1.1.17` | Commonplace:1.1.16,2.1.2,5.0.8; Lilt:1.1.13,5.0.5; Noema:1.1.12,2.0.2 |
| brace-expansion | [GHSA-rgw5-rvv9-x895](https://github.com/advisories/GHSA-rgw5-rvv9-x895) / high | `>=4.0.0 <5.0.9` | Commonplace:1.1.16,2.1.2,5.0.8; Lilt:1.1.13,5.0.5; Noema:1.1.12,2.0.2 |
| brace-expansion | [GHSA-q2hr-2g5m-vwhr](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr) / moderate | `<1.1.21` | Commonplace:1.1.16,2.1.2,5.0.8; Lilt:1.1.13,5.0.5; Noema:1.1.12,2.0.2 |
| brace-expansion | [GHSA-qhr7-859c-m2p7](https://github.com/advisories/GHSA-qhr7-859c-m2p7) / high | `<1.1.20` | Commonplace:1.1.16,2.1.2,5.0.8; Lilt:1.1.13,5.0.5; Noema:1.1.12,2.0.2 |
| brace-expansion | [GHSA-6j4f-fj2g-mc7p](https://github.com/advisories/GHSA-6j4f-fj2g-mc7p) / high | `<1.1.19` | Commonplace:1.1.16,2.1.2,5.0.8; Lilt:1.1.13,5.0.5; Noema:1.1.12,2.0.2 |
| braces | [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) / high | `<=3.0.3` | Lilt:3.0.3; Noema:3.0.3 |
| js-yaml | [GHSA-h67p-54hq-rp68](https://github.com/advisories/GHSA-h67p-54hq-rp68) / moderate | `>=4.0.0 <=4.1.1` | Lilt:4.1.1; Noema:4.1.1 |
| js-yaml | [GHSA-52cp-r559-cp3m](https://github.com/advisories/GHSA-52cp-r559-cp3m) / high | `>=4.0.0 <4.3.0` | Lilt:4.1.1; Noema:4.1.1 |
| js-yaml | [GHSA-5p4m-2wfm-xmqj](https://github.com/advisories/GHSA-5p4m-2wfm-xmqj) / high | `>=4.0.0 <4.3.1` | Commonplace:3.15.0,4.3.0; Lilt:4.1.1; Noema:4.1.1 |
| js-yaml | [GHSA-2883-xcg3-v3hh](https://github.com/advisories/GHSA-2883-xcg3-v3hh) / high | `>=4.0.0 <4.3.2` | Commonplace:3.15.0,4.3.0; Lilt:4.1.1; Noema:4.1.1 |
| next | [GHSA-g5qg-72qw-gw5v](https://github.com/advisories/GHSA-g5qg-72qw-gw5v) / moderate | `>=15.0.0 <=15.4.4` | Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-xv57-4mr9-wg8v](https://github.com/advisories/GHSA-xv57-4mr9-wg8v) / moderate | `>=15.0.0 <=15.4.4` | Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-4342-x723-ch2f](https://github.com/advisories/GHSA-4342-x723-ch2f) / moderate | `>=15.0.0-canary.0 <15.4.7` | Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-9qr9-h5gf-34mp](https://github.com/advisories/GHSA-9qr9-h5gf-34mp) / critical | `>=15.2.0-canary.0 <15.2.6` | Lilt:15.2.5 |
| next | [GHSA-w37m-7fhw-fmv9](https://github.com/advisories/GHSA-w37m-7fhw-fmv9) / moderate | `>=15.2.0-canary.0 <15.2.7` | Lilt:15.2.5 |
| next | [GHSA-mwv6-3258-q52c](https://github.com/advisories/GHSA-mwv6-3258-q52c) / high | `>=15.2.0-canary.0 <15.2.7` | Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-9g9p-9gw9-jx7f](https://github.com/advisories/GHSA-9g9p-9gw9-jx7f) / moderate | `>=10.0.0 <15.5.10` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-h25m-26qc-wcjf](https://github.com/advisories/GHSA-h25m-26qc-wcjf) / high | `>=15.2.0-canary.0 <15.2.9` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-ggv3-7p47-pfv8](https://github.com/advisories/GHSA-ggv3-7p47-pfv8) / moderate | `>=9.5.0 <15.5.13` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-3x4c-7xq6-9pq8](https://github.com/advisories/GHSA-3x4c-7xq6-9pq8) / moderate | `>=10.0.0 <15.5.14` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-q4gf-8mx6-v5v3](https://github.com/advisories/GHSA-q4gf-8mx6-v5v3) / high | `>=13.0.0 <15.5.15` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-8h8q-6873-q5fj](https://github.com/advisories/GHSA-8h8q-6873-q5fj) / high | `>=13.0.0 <15.5.16` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-26hh-7cqf-hhc6](https://github.com/advisories/GHSA-26hh-7cqf-hhc6) / high | `>=15.2.0 <15.5.18` | Lilt:15.2.5 |
| next | [GHSA-3g8h-86w9-wvmq](https://github.com/advisories/GHSA-3g8h-86w9-wvmq) / low | `>=12.2.0 <15.5.16` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-ffhc-5mcf-pf4q](https://github.com/advisories/GHSA-ffhc-5mcf-pf4q) / moderate | `>=13.4.0 <15.5.16` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-vfv6-92ff-j949](https://github.com/advisories/GHSA-vfv6-92ff-j949) / low | `>=13.4.6 <15.5.16` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-gx5p-jg67-6x7h](https://github.com/advisories/GHSA-gx5p-jg67-6x7h) / moderate | `>=13.0.0 <15.5.16` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-mg66-mrh9-m8jx](https://github.com/advisories/GHSA-mg66-mrh9-m8jx) / high | `>=15.0.0 <15.5.16` | Lilt:15.2.5 |
| next | [GHSA-h64f-5h5j-jqjh](https://github.com/advisories/GHSA-h64f-5h5j-jqjh) / moderate | `>=10.0.0 <15.5.16` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-c4j6-fc7j-m34r](https://github.com/advisories/GHSA-c4j6-fc7j-m34r) / high | `>=13.4.13 <15.5.16` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-wfc6-r584-vfw7](https://github.com/advisories/GHSA-wfc6-r584-vfw7) / moderate | `>=14.2.0 <15.5.16` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-267c-6grr-h53f](https://github.com/advisories/GHSA-267c-6grr-h53f) / high | `>=15.2.0 <15.5.16` | Lilt:15.2.5 |
| next | [GHSA-36qx-fr4f-26g5](https://github.com/advisories/GHSA-36qx-fr4f-26g5) / high | `>=12.2.0 <15.5.16` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-m99w-x7hq-7vfj](https://github.com/advisories/GHSA-m99w-x7hq-7vfj) / high | `>=13.0.0 <15.5.21` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-89xv-2m56-2m9x](https://github.com/advisories/GHSA-89xv-2m56-2m9x) / high | `>=14.1.1 <15.5.21` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-68g3-v927-f742](https://github.com/advisories/GHSA-68g3-v927-f742) / moderate | `>=13.0.0 <15.5.21` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-4633-3j49-mh5q](https://github.com/advisories/GHSA-4633-3j49-mh5q) / moderate | `>=13.0.0 <15.5.21` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-4c39-4ccg-62r3](https://github.com/advisories/GHSA-4c39-4ccg-62r3) / moderate | `>=13.0.0 <15.5.21` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-p9j2-gv94-2wf4](https://github.com/advisories/GHSA-p9j2-gv94-2wf4) / high | `>=12.0.0 <15.5.21` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-955p-x3mx-jcvp](https://github.com/advisories/GHSA-955p-x3mx-jcvp) / moderate | `>=13.0.0 <15.5.21` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-p293-qw3h-jr36](https://github.com/advisories/GHSA-p293-qw3h-jr36) / critical | `>=13.4.0 <15.5.24` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| next | [GHSA-2xp9-vwfh-vxw4](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4) / critical | `>=10.0.0 <15.5.24` | Commonplace:14.2.35; Lilt:15.2.5; Noema:14.2.5 |
| postcss-selector-parser | [GHSA-w9m9-85wc-3x92](https://github.com/advisories/GHSA-w9m9-85wc-3x92) / low | `>=6.1.0 <6.1.3` | Lilt:6.1.2; Noema:6.1.2 |
| postcss-selector-parser | [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf) / moderate | `<7.1.6` | Lilt:6.1.2; Noema:6.1.2 |
| sharp | [GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj) / high | `<0.35.0` | Lilt:0.33.5 |
| sharp | [GHSA-rgj7-g3m4-5g8c](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c) / high | `<0.35.4` | Lilt:0.33.5 |
| sharp | [GHSA-wq5f-xc86-pv6w](https://github.com/advisories/GHSA-wq5f-xc86-pv6w) / high | `<0.35.5` | Lilt:0.33.5; kaigo-rules/ops-site:0.35.4; kaigo-rules:0.35.4; parenting-evidence:0.35.4 |
| http-cache-semantics | [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp) / high | `<=4.2.0` | parenting-evidence:4.2.0 |
| glob | [GHSA-5j98-mcp5-4vw2](https://github.com/advisories/GHSA-5j98-mcp5-4vw2) / high | `>=10.2.0 <10.5.0` | Commonplace:10.3.10; Noema:10.3.10 |
| sprintf-js | [GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c) / moderate | `<=1.1.3` | Commonplace:1.0.3 |
| @vitest/mocker | [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9) / moderate | `>=2.1.0 <4.1.11` | CIRCUIT:3.2.7; Noema:2.1.9; Tenet:4.1.9 |
| brace-expansion | [GHSA-f886-m6hf-6m8v](https://github.com/advisories/GHSA-f886-m6hf-6m8v) / moderate | `<1.1.13` | Noema:1.1.12,2.0.2 |
| esbuild | [GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99) / moderate | `<=0.24.2` | Noema:0.21.5; Recita:0.21.5 |
| form-data | [GHSA-hmw2-7cc7-3qxx](https://github.com/advisories/GHSA-hmw2-7cc7-3qxx) / high | `>=4.0.0 <4.0.6` | Noema:4.0.5 |
| minimatch | [GHSA-3ppc-4f35-3m26](https://github.com/advisories/GHSA-3ppc-4f35-3m26) / high | `>=9.0.0 <9.0.6` | Noema:9.0.3 |
| minimatch | [GHSA-7r86-cg39-jmmj](https://github.com/advisories/GHSA-7r86-cg39-jmmj) / high | `>=9.0.0 <9.0.7` | Noema:9.0.3 |
| minimatch | [GHSA-23c5-xmqv-rm74](https://github.com/advisories/GHSA-23c5-xmqv-rm74) / high | `>=9.0.0 <9.0.7` | Noema:9.0.3 |
| next | [GHSA-gp8f-8m3g-qvj9](https://github.com/advisories/GHSA-gp8f-8m3g-qvj9) / high | `>=14.0.0 <14.2.10` | Noema:14.2.5 |
| next | [GHSA-g77x-44xx-532m](https://github.com/advisories/GHSA-g77x-44xx-532m) / moderate | `>=10.0.0 <14.2.7` | Noema:14.2.5 |
| next | [GHSA-7m27-7ghc-44w9](https://github.com/advisories/GHSA-7m27-7ghc-44w9) / moderate | `>=14.0.0 <14.2.21` | Noema:14.2.5 |
| next | [GHSA-3h52-269p-cp9r](https://github.com/advisories/GHSA-3h52-269p-cp9r) / low | `>=13.0 <14.2.30` | Noema:14.2.5 |
| next | [GHSA-7gfc-8cq8-jh5f](https://github.com/advisories/GHSA-7gfc-8cq8-jh5f) / high | `>=9.5.5 <14.2.15` | Noema:14.2.5 |
| next | [GHSA-qpjv-v59x-3qc4](https://github.com/advisories/GHSA-qpjv-v59x-3qc4) / low | `>=0.9.9 <14.2.24` | Noema:14.2.5 |
| next | [GHSA-5j59-xgg2-r9c4](https://github.com/advisories/GHSA-5j59-xgg2-r9c4) / high | `>=13.3.1-canary.0 <14.2.35` | Noema:14.2.5 |
| next | [GHSA-f82v-jwr5-mffw](https://github.com/advisories/GHSA-f82v-jwr5-mffw) / critical | `>=14.0.0 <14.2.25` | Noema:14.2.5 |
| tinypool | [GHSA-5gmw-xhrv-c9v3](https://github.com/advisories/GHSA-5gmw-xhrv-c9v3) / critical | `<=2.1.0` | CIRCUIT:1.1.1; Noema:1.1.1 |
| tinypool | [GHSA-85c8-ppgw-ccpr](https://github.com/advisories/GHSA-85c8-ppgw-ccpr) / critical | `<2.1.2` | CIRCUIT:1.1.1; Noema:1.1.1 |
| vitest | [GHSA-5xrq-8626-4rwp](https://github.com/advisories/GHSA-5xrq-8626-4rwp) / critical | `<3.2.6` | Noema:2.1.9 |
| vitest | [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9) / moderate | `>=2.1.0 <4.1.11` | CIRCUIT:3.2.7; Noema:2.1.9; Tenet:4.1.9 |
| ws | [GHSA-58qx-3vcg-4xpx](https://github.com/advisories/GHSA-58qx-3vcg-4xpx) / moderate | `>=8.0.0 <8.20.1` | Noema:8.19.0 |
| ws | [GHSA-96hv-2xvq-fx4p](https://github.com/advisories/GHSA-96hv-2xvq-fx4p) / high | `>=8.0.0 <8.21.0` | Noema:8.19.0 |
| yaml | [GHSA-48c2-rrv3-qjmp](https://github.com/advisories/GHSA-48c2-rrv3-qjmp) / moderate | `>=2.0.0 <2.8.3` | Noema:2.8.2 |
| rollup | [GHSA-mw96-cpmx-2vgc](https://github.com/advisories/GHSA-mw96-cpmx-2vgc) / high | `>=4.0.0 <4.59.0` | Baukasten:4.57.1 |
| react-router | [GHSA-wrjc-x8rr-h8h6](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) / moderate | `>=6.0.0 <7.18.0` | Tenet:7.17.0 |
| react-router | [GHSA-h8fp-f39c-q6mh](https://github.com/advisories/GHSA-h8fp-f39c-q6mh) / moderate | `>=7.11.0 <7.18.0` | Tenet:7.17.0 |
| react-router | [GHSA-337j-9hxr-rhxg](https://github.com/advisories/GHSA-337j-9hxr-rhxg) / moderate | `>=6.4.0 <7.18.0` | Tenet:7.17.0 |
| react-router | [GHSA-chx6-hx7r-mcp5](https://github.com/advisories/GHSA-chx6-hx7r-mcp5) / high | `>=7.0.0 <7.18.0` | Tenet:7.17.0 |
| react-router | [GHSA-qwww-vcr4-c8h2](https://github.com/advisories/GHSA-qwww-vcr4-c8h2) / high | `>=7.12.0 <7.18.2` | Tenet:7.17.0 |

全行のcommit evidenceは下のimmutable SHA表、file evidenceは各repoのpackage-lock.json（opsはops-site/package-lock.json）。本表は追加Finding一覧ではない。未実証の本番到達性や未確認patched版をverifiedに格上げしない。

## Confirmed-safe / checked areas

| 確認箇所 | 観察・判断 | 限界 |
|---|---|---|
| Secret patterns / current tree / selected history | GitHub/OpenAI/AWS/Google credential形式、private-key marker、Supabase secret形式を取得テキストで走査。実credentialは検出せず。Plexus READMEのprivate-key markerは「...」を使う説明placeholder | 任意形式の秘密、全履歴/全研究dump/binaryを網羅しない |
| .env | 28 repo×.env/.env.local履歴照会。Lilt .env.localのみ現存/履歴あり、内容はSupabase URLとpublishable key | ファイル名だけでsecret leakにしない。public keyの安全はRLS次第 |
| Vercel client env | Plexus App private keyはserver env、Engrave secret/service-role envはVITE_/NEXT_PUBLIC_ prefixでない。MajorisのGEMINI defineは将来危険になり得るが現env metadataは空 | 全build bundleに秘密がないことは未保証。値を復号しない |
| public identifiers | Search Console verification、Analytics、Supabase anon/public keyをsecretと誤認しない | 意図された公開identifierのみ |
| kaigo API | 4 GET route。serviceId/slug/article/source_familyは固定publication allowlist/lookup/filterで処理。ユーザー入力からfs path、任意fetch URL、shellへ渡す経路なし。DB/認証/外部有料AI APIなし | runtime responseの直接取得はクライアント制約。公開JSONの全件privacy確認ではない |
| kaigo projection | publication-policy / publication-runtime-adaptersの公開field投影とcurrentness判定を確認。version endpointは公開commit/refのみ、no-store | SHA/refの公開自体は情報漏えいFindingにしない |
| Instant Radio DOM | share query /貼付本文はescapeHtmlまたはtextContentで表示。キュー本文/voice nameを直接HTMLにしない。共有URLからサーバーfetchしない | 音声はブラウザ実装に依存。ユーザー端末の保存内容は読んでいない |
| 公共AI調達DOM | 公開CSV/検索入力はcreateElement/textContent主体。innerHTMLは固定ラベル/placeholder | コードから到達するremote attacker-controlled HTML sinkは検出せず |
| Can AI Do This DOM/feedback | URL queryはrecord lookup/filter。表示文字列をescapeHtml。feedbackはGitHub issue URL生成。issue本文をscriptへ展開せずcontext.payloadからデータとして分類 | GitHub issueの手動送信は通常の公開投稿。今回投稿していない |
| Wenku Markdown | marked→DOMPurify.sanitize→preview。SAFE_FOR_TEMPLATES/IN_PLACE等の危険条件は使わず、Mermaid securityLevel:'strict'。fallbackはescapeHtml | sanitizerがあることだけで全XSS不存在は保証しない。後処理Mermaid SVGを含む回帰testは次回 |
| Plexus Markdown | markdownLiteはtext/codeをHTML escape、wiki linkは内部解決しescape。dangerouslySetInnerHTML単独ではXSSとしない | すべての将来のresolver入力を保証しない |
| GrokMath Markdown/new Function | 読取はrepo content/units、new Functionは固定import body/module名。remark sanitize:falseはrepo authorが管理するMarkdown | 外部公開書込口を検出せず。unitSlugのpath containmentは追加hardening候補、encoded traversalの実行はしない |
| Commonplace HTML sinks | layoutのdangerouslySetInnerHTMLは固定script、font sizeを3値allowlistでdatasetへ | 「sink存在=脆弱」の誤検知を避けた |
| STR/世界史のHTML sinks | repo管理の公開JSON/定数をHTMLへ表示。URL inputや外部APIから同sinkへ自由なHTML入力の経路を検出せず。ローカル状態経由の一部表示は追加escapeが望ましい | repo改ざん時のscript実行は既にsource制御権限を要する。localStorage改ざんだけをremote XSSとしない |
| Engrave renderer | raw HTML disabledのReact Markdown構成、text/rubyはReact text。音声client制限は存在 | Storage server制限不足はF-03。client安全をserver安全の根拠にしない |
| Aether SSRF | WeatherAPI outbound host/path固定、qはencodeURIComponent、daysは1..7へclamp。client URLをそのままfetchしない | key有効性/現在のquota/rate制限は未確認 |
| CORS | 静的サイトには独自credentialed APIなし。kaigo JSONは公開読取。Plexus GitHub/Weather proxyは固定outbound。Access-Control-Allow-Credentials付き任意origin設定を取得コードに検出せず | CORSは認証ではない。Supabase API/CORSとruntime headersは未網羅 |
| HTTPS/mixed content | 31入口のHTTPSブラウザ表示確認。active外部scriptはHTTPS。主要公開フォームのHTTP送信/HTTP scriptを検出せず | 全dynamic resource/HTTP→HTTPS redirect/TLS詳細は未確認。localhost/example文字列はmixed contentにしない |
| Actions | 90 workflowにpull_request_targetなし。Pagesはcontents read/pages write/id-token writeを使用。データ更新のcontents writeは用途に必要なものと区別。fork PRのwrite/secretsが渡る実証経路は検出せず | GitHub管理設定によるfork権限例外等は取得不可 |
| Supabase advisor | 接続済みEngrave projectでSecurity advisor取得。RLS enabled/no policyのINFOのみ | 「警告なし=安全」ではない。F-03はpolicyを別途直接確認した |

## Hardening / platform constraints（脆弱性件数に含めない）

### H-01 — Headers

すべての公開サイトについて **runtime response headerは未確認**。取得できたsource設定だけを区別する。

| 対象 | Source evidence | 評価 |
|---|---|---|
| HabHub | next.config.ts: CSP、X-Frame-Options DENY、nosniff、strict-origin-when-cross-origin、Permissions-Policy | 実応答への反映は未確認。CSPのunsafe-inline/unsafe-evalは改善余地、これだけでMediumにしない |
| CIRCUIT | index.htmlのCSP meta、Permissions-Policy meta、X-Content-Type-Options meta | CSP metaは適用可能なdirectiveが限定される。nosniff/Permissions-Policyのmeta記載はHTTP headerの代用にならない |
| world-history-lab | vercel.jsonにSW/manifestのheader設定 | 全体のsecurity headers設定とは区別 |
| その他Vercel | inspected sourceに包括的security header設定を検出せず | platform defaultの欠落は断定不可。必要ならVercel設定で追加 |
| Pages 7サイト | GitHub Pages標準配信 | 任意HTTP headersの自由設定に制約。欠落しているというruntime証拠はなく、CSP未設定だけでHigh/Mediumにしない |

HSTS、CSP、nosniff、Referrer-Policy、Permissions-Policy、frame-ancestors/XFO、COOP/COEP/CORPの値、重複、HTML/APIでの違いは残課題。CSPを追加する場合はscript/style/worker/connect/iframeの実利用を記録してからReport-Only/段階検証する。COOP/COEPを一律追加して既存外部資源やポップアップを壊さない。

### H-02 — External scripts / supply chain

Wenkuのmarked unversioned / Mermaid major11、Baukasten/CIRCUITのTailwind CDN等はページ内script権限を持つ。HTTPSは確認できたが、一部はfloating version/SRIなし。既知のドメインであり、廃止/乗っ取りを示す証拠はない。改善はversion固定、buildへの取込み/自己配信、内容が固定されるCDN資源へのSRI。Google Fonts等のCSSを外部JSと同じ権限のFindingにしない。今のtoken入力へ同ページscriptがアクセスするためWenkuは優先度を上げるが、CDNが侵害済みとは報告しない。

### H-03 — Service Workers / stale cache

- Instant Radio: Pagesのproject pathでは登録の相対scope、Vercelでは専用origin。navigationはnetwork-first。ただしactivateが自分以外の全cacheを削除し、fetchに同origin/status/typeのfilterがない。他Pages cacheへの副作用/外部responseキャッシュを避けるprefix限定・同origin/成功responseのみの改善が望ましい。scopeが広いroot origin全体を支配するというFindingにはしない。
- Plexus: scope / は専用Vercel originで合理的。APIと/_next/をcacheしない。HTMLはcache-first、CACHE_NAME固定plexus-v1なので古いshell/auth画面が残り得る。network-firstとreleaseごとのcache識別が望ましい。Supabaseのexternal responseはorigin filterでcacheしない。ユーザーJSON漏えいを実証していない。
- Parla/Noema: same-origin filterあり、HTML navigation network-first、その他cache-first。Next assetはcontent hashの有無/old cache cleanupをreleaseで検証する。
- Commonplace/GrokMath: HTML/network-first系。world-history-labはdocument/script/jsonをnetwork-first、cache prefixとresponse policyを持ち、他repo cacheを掃除しない。
- Engrave: build生成SWとupdate案内を確認。CIRCUIT/Majoris/Synapse/Retrace/Echoirも専用originにSWあり。install/activateを実際に破壊して検証せず、長期offline挙動は未確認。

### H-04 — Actions trust boundaries / pinning

- kaigo-rulesは67 workflow。多くのfirst-party Actionsは40桁SHA固定だがtag参照も残る。他repoにもactions/checkout@v4等がある。SHA未固定だけでは脆弱性にしない。
- kaigoのprepare-rouki25-next-wave / prepare-shortstay-life-rouki25-historical / verify-standards-interpretation-sourcesはcontents:writeでPR branchのreceiptをcommitし、github.head_refをrunへ文字列展開している。fork PRへのwrite tokenが通常downgradeされる条件と、同repo contributorは既にbranch codeを変更できることを考慮し、外部攻撃者の新たな権限経路とは確認しなかった。改善はPR job read-only、write jobをtrusted eventへ分離、persist-credentials:false、HEAD_REFをenv経由でquote。
- daily-vercel-production-deployはplan contents:read、deploy jobはpull_request以外だけ。PRのsecret-preflightはcheckoutせず変数の存在を確認するだけ。secret-bearing deployとPR code実行を同じjobにしていない。
- 研究/データ更新jobは公的source取得→生成data→commit等。contents:writeに任意外部HTMLやissue本文がそのままshellへ入り、無条件main改ざんへ進む経路は今回検出しなかった。必要なwrite権限と過剰な一律権限は分けて改善する。
- 公共AI調達source-preservationはmain branch確認/merged PR検証、専用branchとmetadata PRを作る。actions:writeは生成PRのvalidatorを明示dispatchする目的がある。actions権限があることだけで過剰とは断定しない。
- Can AI feedback-triageはissue bodyをcontext.payloadから読み、固定labelを設定する。untrusted bodyをscript文字列/runへ展開していない。
- 必要ならsecret-bearing jobにprotected environment approval、main/ruleset、最小App権限を設定。ただし本監査の取得権限では現在のbranch protectionを検証できない。

### H-05 — Lockfile / deployment hygiene

lockfileなしのNext repoで実install versionを追跡できない。manifest・lock・deployment commit・framework versionをrelease evidenceへ記録する。Aether_2/Liltのlatest ERRORは「公開停止」を意味せず、通常アクセスで既存成功版の稼働を確認した。Parlaは2公開Vercel project、Instant RadioはPages/Vercelの2配信。不要なら廃止するが、勝手に停止/削除していない。

ai-business-transformation productionは35fea5ec0013fe6a46076bea03c4b81942111c7a、defaultは333e1d9cac2122d8d1628f1cf430143eccd728fa。手動/HOLD policyによるdocs-only差分の可能性を区別し「stale=脆弱」としない。kaigo opsもsource差分を別扱いした。

### H-06 — Quota / input boundaries

Aether_2の2公開weather proxyはkeyをserverだけで使うが、取得コードに認証/独自rate limitはない。公開天気用途では認証必須としない。query length、短時間cache、利用上限とprovider quotaが意味を持つ。key有効性/課金/Firewall rate limitを確認していないため「有料APIの不正利用が実証済み」とはしていない。

GrokMathのunitSlug→content pathは明示的slug allowlist/resolve containmentが望ましい。現状末尾.md・repo contentの読取で、秘密ファイル到達やencoded separatorのrouter受理は未確認。攻撃入力で本番の任意ファイル読取を検証していないため、confirmed traversalとしてseverityを付けない。

### H-07 — Public data / source maps / forgotten artifacts

著者名、GitHub username、公開profile/LinkedIn、Search Console token等は意図された公開として扱った。確認したREADME/公開UI/code/選択historyに、実credentials、private key本文、不要なuser API response dumpを検出しなかった。一部code/debugでは相対pathを表示するがローカルPCの秘密pathの露出と混同しない。

Pages artifactはBaukasten dist、STR web、Can AI site、公共AI調達の選択された公開site、Studio Jekyll output、Wenku repo root等。Wenkuのroot公開は広めであり、今後public-only staging directoryへ絞るのは改善候補。今回/.gitやsource mapのlive GETと全binary/artifactの個人情報走査は未確認。public source mapはpublic source repoと同内容なら、それだけで漏えいとは判定しない。

## Unverified areas

1. Github security alerts/Dependabot alert一覧/secret scanning状態と履歴。connectorはsensitive/非対応API familyを取得できない。設定ファイルの有無だけでサービスが有効/無効とはしない。
2. Branch protectionは取得要求に403 Resource not accessible by integration。10重点repoのrulesetsは[]を返したが、classic protectionや組織inheritanceまで「無保護」とは判断しない。
3. GitHub Pages管理画面、Actions fork write/secrets例外、environment reviewers、実GitHub App installation権限/許可repo、各endpointのplatform制限。
4. Runtime headers、HTTP redirect、mixed content全request、TLS/HSTS preload、API応答/stack trace等のネットワーク実測。
5. Vercel envの秘密値の有効性、build-time actual version、全preview aliasの匿名アクセス。parenting-evidenceのSSO protection metadataはdisabledで他にpreviewがあり得るが、公開preview自体は情報漏えいの証拠ではない。
6. Plexus/HabHub/Liltのlive Supabase RLS/Storage/Auth設定。接続済みSupabaseで見えたのはEngrave名のprojectのみ。ユーザーデータ/ログ/実upload/DB writeは検証していない。
7. Lilt/Next14のRSC exploit到達性、Vercel WAF有効性。DoS/RCE/認証回避/SSRFの実行は範囲外。
8. 全Git履歴/全branch/tag/LFS/全研究データ/個人ノートの機密レビュー。秘密の完全不存在は保証できない。
9. SW長期offline update、実browser storageに以前のtokenが残るか。実ユーザーのtokenを読み出していない。
10. dependency update後のnpm ci/typecheck/test/buildと本番deployment。Wenku以外の機能修正は未実装。

## Remediation plan

| 区分 | 対応 | Completion criteria |
|---|---|---|
| 今すぐ | F-01: GitHub書込経路を保護/必要なら一時停止、server auth+user/repo/path認可、allowlist fail-closed、App権限縮小 | mock環境で401/403時にtoken発行/GET/PUTなし。許可された既存操作だけ成功 |
| 今すぐ | F-02: Lilt package/lock整合とNext supported patchへ更新、成功deployment切替 | clean npm ci、tests/typecheck/build、機能回帰、production SHA/version evidence |
| 今すぐ | F-03: anonymous Storage要否を決定、bucket制限/ownership、費用監視 | migration review、隔離環境で許可/拒否と音声機能を検証。既存objectを壊さない |
| 今すぐ | F-05: Wenku PR #12をreview/merge後Pages成功を確認 | 公開版でtoken未保存、旧token除去、設定保持。実tokenをテストに使わない |
| 次回更新 | sharp >=0.35.5、source-map-js >=1.2.2、KaTeX/Router/CI test依存も上記条件を踏まえ更新。lock/test/buildとpatched範囲を確認 | 公開機能の回帰とadvisory解消。dev-only警告を本番脆弱性と混同しない |
| 次回更新 | F-04: Commonplace/NoemaのNext14 migration、lockなしrepoのversion evidence/lock追加 | advisory再照合、Server Function到達性とbuild、互換性確認 |
| 次回更新 | sanitizer/CDN固定、SW stale cache/prefix cleanup、weather quota | 小変更ごとの回帰確認 |
| defense-in-depth | SHA pinning、最小job permissions、untrusted値のenv渡し、必要なheaders、監査記録 | protected branch/environmentと実response確認 |
| 対応不要（今回のFindingではない） | public anon key、Search Console/Analytics ID、意図された著者profile、静的サイトへのserver-only CVE、safe HTML sink、public version SHA | 新たな攻撃入力/非公開情報の到達性が見つかった時だけ再評価 |

**修正済みなのはWenkuのPR branchのみ。本番変更、依存更新、secret rotation、GitHub/Vercel/Supabase管理設定変更、merge/deployは実施していない。** その他は互換性/運用判断/実環境検証が必要な具体的修正案として残す。未実証の候補も、必要な再確認と暫定対応の優先度を明確にした。

## Immutable source snapshots

下表の全repoでdefault branchはmain。URL/architecture等はこのsnapshotに基づく。監査後の更新を「監査済み」と自動的に扱わない。

| Repository | Default snapshot SHA | Workflow数 | Source確認 |
|---|---|---:|---|
| CIRCUIT | [e2dd23df236317f0015d4d1c685d6c878f1c3ce4](https://github.com/Josh-Temple/CIRCUIT/commit/e2dd23df236317f0015d4d1c685d6c878f1c3ce4) | 1 | SHA指定fresh read |
| Baukasten | [50a983be02303ac25f7e9efd191ef099608d5791](https://github.com/Josh-Temple/Baukasten/commit/50a983be02303ac25f7e9efd191ef099608d5791) | 1 | SHA指定fresh read |
| HabHub | [ae80b403be75ae7bec26c753d118a2367e55f311](https://github.com/Josh-Temple/HabHub/commit/ae80b403be75ae7bec26c753d118a2367e55f311) | 0 | SHA指定fresh read |
| Aether_2 | [0fc096123c806f7d2b83faa8bac5ae0b563fd76a](https://github.com/Josh-Temple/Aether_2/commit/0fc096123c806f7d2b83faa8bac5ae0b563fd76a) | 0 | SHA指定fresh read |
| Plexus | [add8f035821931dda0970367770c626e5861dddc](https://github.com/Josh-Temple/Plexus/commit/add8f035821931dda0970367770c626e5861dddc) | 0 | SHA指定fresh read |
| world-history-lab | [4b847c5368042a5230161372aa92f2ace909de33](https://github.com/Josh-Temple/world-history-lab/commit/4b847c5368042a5230161372aa92f2ace909de33) | 1 | SHA指定fresh read |
| Majoris | [aa2eb3768bceeae4db66f45d6f21b2f9e0d6346d](https://github.com/Josh-Temple/Majoris/commit/aa2eb3768bceeae4db66f45d6f21b2f9e0d6346d) | 0 | SHA指定fresh read |
| Engrave | [76869e530804cfce5bed4c8b4b479ad434384799](https://github.com/Josh-Temple/Engrave/commit/76869e530804cfce5bed4c8b4b479ad434384799) | 0 | SHA指定fresh read |
| GrokMath | [c5f16705d0e19bc8b001655f232d4c327d941dbc](https://github.com/Josh-Temple/GrokMath/commit/c5f16705d0e19bc8b001655f232d4c327d941dbc) | 0 | SHA指定fresh read |
| Wenku | [fb15258d6a239c63839031469ee3f26b5293c358](https://github.com/Josh-Temple/Wenku/commit/fb15258d6a239c63839031469ee3f26b5293c358) | 1 | SHA指定fresh read |
| Synapse | [fe2a32ba33f1cd279113b8ff5b12704d5aa98055](https://github.com/Josh-Temple/Synapse/commit/fe2a32ba33f1cd279113b8ff5b12704d5aa98055) | 0 | SHA指定fresh read |
| Retrace | [53307871e9f178456e9c3236b4ac63ab4bfc4bed](https://github.com/Josh-Temple/Retrace/commit/53307871e9f178456e9c3236b4ac63ab4bfc4bed) | 0 | SHA指定fresh read |
| Parla | [9423972de0b307717f7976b9a54004ff73068d2b](https://github.com/Josh-Temple/Parla/commit/9423972de0b307717f7976b9a54004ff73068d2b) | 0 | SHA指定fresh read |
| Echoir | [0e93922fe5d4b0cc5888c7f2b61c672d50c1ec86](https://github.com/Josh-Temple/Echoir/commit/0e93922fe5d4b0cc5888c7f2b61c672d50c1ec86) | 0 | SHA指定fresh read |
| Noema | [5f92b579f0d84529da2f10465b87a1ef3b9bd515](https://github.com/Josh-Temple/Noema/commit/5f92b579f0d84529da2f10465b87a1ef3b9bd515) | 0 | SHA指定fresh read |
| Recita | [2d73422b32ed0061673e932bf3a18ecf963ba48b](https://github.com/Josh-Temple/Recita/commit/2d73422b32ed0061673e932bf3a18ecf963ba48b) | 0 | SHA指定fresh read |
| Lilt | [81ab692de04ac59a9622d1ad56fbd6ffaa270947](https://github.com/Josh-Temple/Lilt/commit/81ab692de04ac59a9622d1ad56fbd6ffaa270947) | 0 | SHA指定fresh read |
| Tenet | [dc3b27cfa54fe1c65ab62bc1d08e3f9bbb2d70c7](https://github.com/Josh-Temple/Tenet/commit/dc3b27cfa54fe1c65ab62bc1d08e3f9bbb2d70c7) | 0 | SHA指定fresh read |
| Commonplace | [fa6ef9b59cf12e0dbe630d2ddff4da2725a421ac](https://github.com/Josh-Temple/Commonplace/commit/fa6ef9b59cf12e0dbe630d2ddff4da2725a421ac) | 1 | SHA指定fresh read |
| Loci | [29c90331eb05abf71da29ca877dba3dcb628ee64](https://github.com/Josh-Temple/Loci/commit/29c90331eb05abf71da29ca877dba3dcb628ee64) | 0 | SHA指定fresh read |
| studio-lab-research | [55b78b3b8c791c36d68be1f0c03f5afc2ebb4dda](https://github.com/Josh-Temple/studio-lab-research/commit/55b78b3b8c791c36d68be1f0c03f5afc2ebb4dda) | 1 | SHA指定fresh read |
| kaigo-rules | [a3bb60b3d59fefb783c88e9fc710101b076ffe01](https://github.com/Josh-Temple/kaigo-rules/commit/a3bb60b3d59fefb783c88e9fc710101b076ffe01) | 67 | SHA指定fresh read |
| parenting-evidence | [79b1882bcf796ad998411b045fc02aced975f0a2](https://github.com/Josh-Temple/parenting-evidence/commit/79b1882bcf796ad998411b045fc02aced975f0a2) | 1 | SHA指定fresh read |
| ai-business-transformation | [333e1d9cac2122d8d1628f1cf430143eccd728fa](https://github.com/Josh-Temple/ai-business-transformation/commit/333e1d9cac2122d8d1628f1cf430143eccd728fa) | 0 | SHA指定fresh read |
| systematic-trading-research | [d7532c33a841a0d8c21d1288f39230e47c413894](https://github.com/Josh-Temple/systematic-trading-research/commit/d7532c33a841a0d8c21d1288f39230e47c413894) | 7 | SHA指定fresh read |
| public-sector-ai-procurement-japan | [7631d22f059372e5e7b7a92fc1a2b94f2dbf6140](https://github.com/Josh-Temple/public-sector-ai-procurement-japan/commit/7631d22f059372e5e7b7a92fc1a2b94f2dbf6140) | 4 | SHA指定fresh read |
| can-ai-do-this | [393b2c3ac9d3b90613d8dd4b9568f04b6e601356](https://github.com/Josh-Temple/can-ai-do-this/commit/393b2c3ac9d3b90613d8dd4b9568f04b6e601356) | 5 | SHA指定fresh read |
| instant-radio | [0452560415b239d18cb5c743a4e68b94a4307c20](https://github.com/Josh-Temple/instant-radio/commit/0452560415b239d18cb5c743a4e68b94a4307c20) | 0 | SHA指定fresh read |

