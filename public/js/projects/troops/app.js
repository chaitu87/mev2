var songs = ['https://s3.ap-south-1.amazonaws.com/media.theinnerhour.com/scheminup.mp3'];
var play = '<span class="fa fa-pause"></span>';
var pause = '<span class="fa fa-play"></span>';

soundManager.setup({
    url: '/components/SoundManager2/swf/',
    flashVersion: 9,
    preferFlash: false, // prefer 100% HTML5 mode, where both supported
    onready: function() {
        console.log('SM2 ready!');
    },
    ontimeout: function() {
        console.log('SM2 init failed!');
    },
    defaultOptions: {
        // set global default volume for all sound objects
        volume: 33
    }
});

window.loadSong = function(url) {
    soundManager.createSound({
        id: 'mysound',
        url: url,
        autoLoad: true,
        autoPlay: false,
        onload: function() {
            console.log(this);
            soundManager.play(this.id);
        },
        whileplaying: function() {
            $(".progress-bar").css('width', ((this.position / this.duration) * 100) + '%');
        },
        onpause: function() {
            $('.playpause').html(pause);
        },
        onplay: function(){
        	$('.playpause').html(play);	
        },
        onresume: function(){
        	$('.playpause').html(play);
        }
    });
};

$(function() {
    loadSong(songs[0]);
});

// Controls
$(function() {
    $('.playpause').on('click', function() {
        if ($(this).find('span').hasClass('fa-play')) {
            $(this).html(pause);
            soundManager.play('mysound');
        } else {
            $(this).html(play);
            soundManager.pause('mysound');
        }
    });
});

// Listeners
