/**
 * ===================================================================
 * Main JavaScript File (UI制御用)
 * Project: TOFUCRX Website
 * -------------------------------------------------------------------
 * このファイルはサイトの動的なUI（ユーザーインターフェース）を制御します。
 * 主にアニメーションや、スクロールに応じたインタラクションを扱います。
 * ===================================================================
 */

// HTMLのDOM（構造）が完全に読み込まれてからスクリプトを実行
document.addEventListener('DOMContentLoaded', () => {

    /**
     * ---------------------------------------------------------------
     * 機能1: スクロールに応じたフェードインアニメーション
     * ---------------------------------------------------------------
     * class="fade-in" を持つ要素が画面内に入ったら、
     * class="visible" を追加してCSSアニメーションを発火させます。
     */
    const fadeInElements = document.querySelectorAll('.fade-in');

    // Intersection Observer API を使って要素の表示を監視
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                // 要素が画面内に入った（交差した）場合
                if (entry.isIntersecting) {
                    // visibleクラスを追加して表示させる
                    entry.target.classList.add('visible');
                    // 一度表示されたら、その要素の監視を停止してパフォーマンスを向上
                    observer.unobserve(entry.target);
                }
            });
        }, 
        {
            // オプション: 要素が10%見えた時点でコールバックを実行
            threshold: 0.1 
        }
    );

    // すべての .fade-in 要素を監視対象に設定
    fadeInElements.forEach(el => {
        observer.observe(el);
    });


    /**
     * ---------------------------------------------------------------
     * 機能2: スクロールに応じたヘッダーのデザイン変更
     * ---------------------------------------------------------------
     * ページが少しでもスクロールされたら、ヘッダーに影をつけて
     * コンテンツの上にあることを視覚的に示します。
     */
    const header = document.querySelector('.main-header');

    // 共通パーツは非同期で読み込まれるため、
    // ヘッダー要素が存在するか少し遅れてチェックする必要がある。
    // requestAnimationFrame を使って、ブラウザの描画タイミングでチェックを実行。
    const checkHeader = () => {
        const headerElement = document.getElementById('main-header');
        if (headerElement) {
            // ヘッダーが見つかったらスクロールイベントを設定
            window.addEventListener('scroll', () => {
                // 50ピクセルより多くスクロールされた場合
                if (window.scrollY > 50) {
                    headerElement.classList.add('scrolled');
                } else {
                    headerElement.classList.remove('scrolled');
                }
            });
        } else {
            // まだヘッダーが読み込まれていない場合は、次の描画タイミングで再試行
            requestAnimationFrame(checkHeader);
        }
    };
    
    // ヘッダーの存在チェックを開始
    checkHeader();

});