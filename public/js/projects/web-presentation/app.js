window.pubkey = "pub-c-f424178f-364d-4033-a51b-0ff82e5814e5";
window.subkey = "sub-c-3c46a32e-970e-11e6-bb35-0619f8945a4f";

window.pubnub = new PubNub({
    subscribeKey: window.subkey,
    publishKey: window.pubkey,
    ssl: true
})

$(function() {
    console.log("this is jquery");
});

$(function() {
    var slides = $('.text-slide');
    var maxslides = slides.length;
    var startslide = 0;
    $.each(slides, function(index, slide) {
        $(slide).attr('data-hash', index);
    });
    var presenter = $('.owl-carousel').owlCarousel({
        items: 1,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    // Subscribe to slide change events
    presenter.on('changed.owl.carousel', $.debounce(500, function(e) {
        window.pubnub.publish({
            channel: 'tro-presentation',
            message: {
                goto: e.item.index
            }
        });
    }));

    // Listening to pubnub channels
    window.pubnub.addListener({
        message: function(m) {
        	console.log('got a change slide event');
            presenter.trigger('to.owl.carousel', m.message.goto);
        }
    });
    window.pubnub.subscribe({
        channels: ['tro-presentation']
    })
});