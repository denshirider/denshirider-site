//youtube player
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'zqHdfE2fiqA', //youtubeのID（http://www.youtube.com/watch?v=この部分）
        playerVars: {
            rel: 0, //再生終了後の関連動画の読み込み　0は無効　1で有効
            autoplay: 0, //自動再生設定　0は再生しない　1で自動再生
            wmode: 'transparent' //z-index対策(IE)
        }
    });
}
