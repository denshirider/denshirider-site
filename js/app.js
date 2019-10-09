//youtube player
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'qyTBc1SIDmI', //youtubeのID（http://www.youtube.com/watch?v=この部分）
        playerVars: {
            rel: 0, //再生終了後の関連動画の読み込み　0は無効　1で有効
            autoplay: 0, //自動再生設定　0は再生しない　1で自動再生
            wmode: 'transparent' //z-index対策(IE)
        }
    });
}

//flickr api（flickerは写真の共有サイト）
var page = 1;
$(window).load(function(){
	flickr();
});

function flickr() {
    $.getJSON('https://api.flickr.com/services/rest/?format=json&jsoncallback=?', {
        "api_key": "2a05b6c699c389659c467768e7e03439", //この部分は必ずご自身のapi_keyと入れ替えてください。
        "method": "flickr.photos.search", //写真検索
        "text": "music", //検索語
        "sort": "relevance", //並べ替え relevanceは関連度の高い順
        "extras": "url_m", //写真サイズ
        "per_page": 20, //取得件数
        "page": page, //ページ番号
    }).done(function(data) {
        for (var i = 0; i < data.photos.photo.length; i++) {
            var f = data.photos.photo[i];
            $('<a data-lightbox="example-set">').attr("href", f['url_m']).appendTo("#photo").append($('<div class="grid view view-tenth">').append($('<img>').attr('src', f['url_m'])).append(
            $('<div class="mask">').append('<h2>' + f['title'] + '').append('<p>Click to enlarge')));
        };
		//ここからvgrid（サイズの違うボックスを敷き詰める）設定
        $(function() {
            var vg = $("#photo").vgrid({
                easing: "easeOutQuint",
                useLoadImageEvent: true,
                time: 400,
                delay: 20,
            });
            vg.vgrefresh();
        });
    });
}

$(function() {
    $('#next').click(function() {
        page += 1;
        flickr();
    });
});

//flickrを使用せずに画像を使う場合のvgrid（サイズの違うボックスを敷き詰める）設定
$('#photo_2').hide();
$(function() {
    var vg = $("#photo_2").vgrid({
        easing: "easeOutQuint",
        useLoadImageEvent: true,
        time: 400,
        delay: 20,
    });
    setTimeout(function() {
        $('#photo_2').show();
        vg.vgrefresh();
    }, 1000);
});