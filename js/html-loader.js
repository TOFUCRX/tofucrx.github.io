/**
 * ===================================================================
 * HTML Component Loader (共通パーツ読み込み用)
 * Project: TOFUCRX Website
 * -------------------------------------------------------------------
 * このファイルは、サイトの共通パーツ（ヘッダー、フッターなど）を
 * 各HTMLファイルに自動的に読み込んで挿入します。
 * これにより、修正箇所を一元管理でき、メンテナンス性が向上します。
 * ===================================================================
 */

// HTMLのDOM（構造）が完全に読み込まれてからスクリプトを実行
document.addEventListener('DOMContentLoaded', () => {

    /**
     * ---------------------------------------------------------------
     * 機能1: 共通HTMLパーツを読み込む関数
     * ---------------------------------------------------------------
     * @param {string} url - 読み込むHTML部品ファイルのパス (例: '_header.html')
     * @param {string} placeholderId - 挿入先の要素のID (例: 'header-placeholder')
     */
    const loadComponent = (url, placeholderId) => {
        // fetch API を使って指定されたURLのファイル内容を非同期で取得
        fetch(url)
            .then(response => {
                // HTTPステータスが200番台でない場合（例: 404 Not Found）はエラーとする
                if (!response.ok) {
                    throw new Error(`Failed to load ${url}: ${response.statusText}`);
                }
                // ファイル内容をテキストとして返す
                return response.text();
            })
            .then(data => {
                // 指定されたIDを持つプレースホルダー要素を取得
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    // プレースホルダーに取得したHTMLデータを挿入
                    placeholder.innerHTML = data;
                } else {
                    // プレースホルダーが見つからない場合は警告を表示
                    console.warn(`Placeholder element with ID "${placeholderId}" not found.`);
                }
            })
            .catch(error => {
                // 読み込み中にエラーが発生した場合、コンソールに詳細なエラーメッセージを表示
                console.error(`Error loading component from ${url}:`, error);
            });
    };

    /**
     * ---------------------------------------------------------------
     * 機能2: ヘッダーとフッターの読み込みを実行
     * ---------------------------------------------------------------
     */
    loadComponent('_header.html', 'header-placeholder');
    loadComponent('_footer.html', 'footer-placeholder');
    

    /**
     * ---------------------------------------------------------------
     * 機能3: 現在表示しているページのナビゲーションをハイライト
     * ---------------------------------------------------------------
     * ヘッダーの非同期読み込みが完了するのを少し待ってから実行します。
     */
    const highlightActiveNav = () => {
        // 現在のページのファイル名を取得 (例: "features.html")
        // パスを'/'で分割し、最後の要素を取り出す
        const currentPage = window.location.pathname.split('/').pop();

        // ヘッダー内のナビゲーションリンクをすべて取得
        const navLinks = document.querySelectorAll('.nav-links a');

        navLinks.forEach(link => {
            // リンクのhref属性と現在のページ名が一致するかチェック
            // currentPageが空（トップページ）の場合はindex.htmlとみなす
            if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
                // 一致すれば'active'クラスを追加してハイライト
                link.classList.add('active');
            }
        });
    };

    // ヘッダーのDOMが描画されるのを100ミリ秒待ってからハイライト処理を実行
    // これにより、headerの読み込みが終わる前にスクリプトが実行されるのを防ぐ
    setTimeout(highlightActiveNav, 100);

});