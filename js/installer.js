/**
 * ===================================================================
 * OS-Dependent Installer Script (OS判定インストーラー)
 * Project: TOFUCRX Website
 * -------------------------------------------------------------------
 * このスクリプトはユーザーのOSを判定し、
 * 最適なダウンロードファイルとインストール手順を動的に表示します。
 * これにより、Windows/MacユーザーとChromeOS/Linuxユーザーで
 * 表示を切り替えることができます。
 * ===================================================================
 */

// HTMLのDOM（構造）が完全に読み込まれてからスクリプトを実行
document.addEventListener('DOMContentLoaded', () => {

    // スクリプトが操作するHTML要素を取得
    const heroButtonContainer = document.getElementById('hero-button-container');
    const instructionsZip = document.getElementById('instructions-zip');
    const instructionsCrx = document.getElementById('instructions-crx');
    
    // index.html以外のページではこれらの要素は存在しないため、
    // 要素が見つからない場合は、ここで処理を中断する
    if (!heroButtonContainer || !instructionsZip || !instructionsCrx) {
        return;
    }

    // ブラウザのUser Agent文字列を取得して、OSを判定する
    const userAgent = navigator.userAgent;

    // User Agentに "Win" (Windows) または "Mac" (Macintosh) が含まれているかチェック
    if (userAgent.indexOf("Win") !== -1 || userAgent.indexOf("Mac") !== -1) {
        
        // --- Windows / Mac 向けの処理 ---

        // 1. ヒーローセクションのボタンを .zip ファイルへのリンクに変更する
        heroButtonContainer.innerHTML = `
            <a href="tofucrx.zip" class="hero-button fade-in visible">無料でChromeに追加</a>
        `;

        // 2. ZIP版のインストール手順を表示する (hiddenクラスを削除)
        instructionsZip.classList.remove('hidden');

    } else {
        
        // --- ChromeOS, Linux, その他のOS向けの処理 ---

        // 1. ヒーローセクションのボタンを .crx ファイルへのリンクに変更する
        heroButtonContainer.innerHTML = `
            <a href="tofucrx.crx" class="hero-button fade-in visible">無料でChromeに追加</a>
        `;

        // 2. CRX版のインストール手順を表示する (hiddenクラスを削除)
        instructionsCrx.classList.remove('hidden');
    }
});