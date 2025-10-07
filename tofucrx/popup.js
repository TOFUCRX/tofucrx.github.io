// HTMLの要素を取得
const qrcodeDiv = document.getElementById("qrcode");
const copyBtn = document.getElementById("copy-url-btn");
const statusMsg = document.getElementById("status-message");

// Chrome拡張機能のAPIを使い、現在アクティブなタブの情報を取得する
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  // 取得したタブ情報の中から、最初のタブ（＝現在開いているタブ）のURLを取得
  const currentTabUrl = tabs[0].url;

  // ---- 機能1: QRコードの生成 ----
  // 取得したURLを使って、QRコードを生成する
  new QRCode(qrcodeDiv, {
    text: currentTabUrl,
    width: 240, // 少しサイズ調整
    height: 240, // 少しサイズ調整
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });

  // ---- 機能2: URLコピー機能 ----
  // コピーボタンにクリックイベントを追加
  copyBtn.addEventListener("click", () => {
    // navigator.clipboard APIを使って、現在のタブのURLをクリップボードに書き込む
    navigator.clipboard.writeText(currentTabUrl).then(() => {
      // 成功した場合の処理
      statusMsg.textContent = "URLをコピーしました！";
      // 2秒後にメッセージを消す
      setTimeout(() => {
        statusMsg.textContent = "";
      }, 2000);
    }).catch(err => {
      // 失敗した場合の処理
      console.error("URLのコピーに失敗しました:", err);
      statusMsg.textContent = "コピーに失敗しました";
    });
  });

});