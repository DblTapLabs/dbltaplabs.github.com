// JavaScript Document

$(document).ready(function() {

//Tweets setting

    function urlToLink(text) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(exp, "<a href='$1'>$1</a>");
    }
    function relTime(time_value) {
        time_value = time_value.replace(/(\+[0-9]{4}\s)/ig, "");
        var parsed_date = Date.parse(time_value);
        var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
        var timeago = parseInt((relative_to.getTime() - parsed_date) / 1000);
        if (timeago < 60) return 'less than a minute ago';
        else if (timeago < 120) return 'about a minute ago';
        else if (timeago < (45 * 60)) return (parseInt(timeago / 60)).toString() + ' minutes ago';
        else if (timeago < (90 * 60)) return 'about an hour ago';
        else if (timeago < (24 * 60 * 60)) return 'about ' + (parseInt(timeago / 3600)).toString() + ' hours ago';
        else if (timeago < (48 * 60 * 60)) return '1 day ago';
        else return (parseInt(timeago / 86400)).toString() + ' days ago';
    }

    $('#tweet-list').hide();
    var user = 'dbltaplabs'; // Set your twitter id
    var count = '10'; // How many feeds do you want. Recommended Max 10 Twitter Api

    $.getJSON('http://twitter.com/statuses/user_timeline.json?screen_name=' + user + '&count=' + count + '&callback=?',
    function(tweetdata) {
        var tl = $("#tweet-list");
        $.each(tweetdata,
        function(i, tweet) {
            tl.append("<li>&ldquo;" + urlToLink(tweet.text) + "&rdquo;</li>");
        });
    });

    setTimeout(function() {
        $('.tweets p').hide();
        $('#tweet-list').show();
        $('#tweet-list').cycle({
            fx: 'scrollDown',
            speed: 500,
            timeout: 2500,
            pause: 1
        });
    },
    5000);	
	
	$('#tweet-list2').hide();
    //var user = 'envato'; // Set your twitter id
    //var count = '10'; // How many feeds do you want. Recommended Max 10 Twitter Api

    $.getJSON('http://twitter.com/statuses/user_timeline.json?screen_name=' + user + '&count=' + count + '&callback=?',
    function(tweetdata) {
        var tl = $("#tweet-list2");
        $.each(tweetdata,
        function(i, tweet) {
            tl.append("<li>&ldquo;" + urlToLink(tweet.text) + "&rdquo;</li>");
        });
    });

    setTimeout(function() {
        $('.tweets p').hide();
        $('#tweet-list2').show();
        $('#tweet-list2').cycle({
            fx: 'scrollDown',
            speed: 500,
            timeout: 2500,
            pause: 1
        });
    },
    5000);
						   
//Google map setting

        $('#google_map').gmap3({
            action: 'addMarker',
            address: "Phenix City, AL. 36869",
            map: {
                center: true,
                zoom: 10
            },
            marker: {
                options: {
                    draggable: false
                }
            },
            infowindow: {
                options: {
                    content: 'We\'re headquartered in a small Alabama town with<br />developers spread across the US.'
                },
                events: {
                    closeclick: function() {

}
                }
            }
        });


// smoothScroll	/ page

    $('.main-navigation a').smoothScroll({
        speed: 1500,
        offset: -80,
        easing: 'easeOutExpo',
        exclude: ['#portfolio-filter li a,#gallery-filter li a,#about']

    });

$('article > section').waypoint({
        offset: '35%'
    });

    $('body').delegate('article > section', 'waypoint.reached',
    function(event, direction) {
        var $active = $(this);
        if (direction === 'up') {
            $active = $active.prev();
        }
        if (!$active.length) {
            $active.end();
        }

        $('.section-active').removeClass('section-active');

        $active.addClass('section-active').find('.header > h1').delay(500).animate({
            marginLeft: "0px"
        },
        {
            duration: 500,
            easing: 'easeOutExpo',
            complete: function() {
                /////////////////////////////////
                $active.find('.header > p').animate({
                    marginTop: "0px"
                },
                {
                    duration: 500,
                    easing: 'easeOutExpo',
                    complete: function() {}
                    /////////////
                });
            }

        });

        $('.current').removeClass('current');
        $(".main-navigation a[href=#" + $active.attr("id") + "]").addClass('current');
    });
	
	
	// prettyPhoto plugin

    $("a[rel^='prettyPhoto']").prettyPhoto();
	
	$('ul#portfolio-filter a').click(function() {

        $('ul#portfolio-filter a.currents').removeClass('currents');
        $(this).addClass('currents');

        var filterVal = $(this).text().toLowerCase().replace(' ', '-');

        if (filterVal == 'all') {
            $('#containment-portfolio li.hidden').fadeTo("slow",1).removeClass('hidden');
        } else {

            $('#containment-portfolio li').each(function() {
                if (!$(this).hasClass(filterVal)) {
                    $(this).fadeTo("slow",0.5).addClass('hidden');

                } else {
                    $(this).fadeTo("slow",1).removeClass('hidden');

                }
            });
        }

        return false;
    });
	


   // Skills setting

            $(".pr1").progression({
                Current: 40,
                // Change Your percent skill
                Easing: 'easeOutExpo',
                aBackgroundImg: 'images/progress.png'
            });

            $(".pr2").progression({
                Current: 30,
                // Change Your percent skill
                Easing: 'easeOutExpo',
                aBackgroundImg: 'images/progress.png'
            });

            $(".pr3").progression({
                Current: 22,
                // Change Your percent skill
                Easing: 'easeOutExpo',
                aBackgroundImg: 'images/progress.png'
            });

            $(".pr4").progression({
                Current: 13,
                // Change Your percent skill
                Easing: 'easeOutExpo',
                aBackgroundImg: 'images/progress.png'
            });

	
//Portfolio section

    var itemTime = $('.portfolio-item').length;

    $('#containment-portfolio li.portfolio-item').click(function() {
																 
        $('#containment-portfolio li').fadeTo("slow",0.5);
		$(this).fadeTo("slow",1);
        $(this).find('.loading-item').fadeIn();
		
		 $('.item_block').slideUp(1000);

        id = $(this).attr('id');

        setTimeout(function() {

            $('div#post-' + id).delay(1000).slideToggle(1000,
            function() {

                $.smoothScroll({
                    speed: 500,
                    offset: 0,
                    easing: 'swing',
                    scrollTarget: '#portfolio'

                });
            });
            $('.loading-item').fadeOut();

        },
        itemTime * 300);

    });


    $('.item_block a.close').click(function() {

        $('.item_block').slideUp(1000);
		$('#containment-portfolio li').fadeTo("slow",1);
		
		$.smoothScroll({
            speed: 1000,
            offset: 0,
            easing: 'swing',
            scrollTarget: '#portfolio'

        });

    });	
	
	// Nivo slider

    $('#sliders').nivoSlider({
        effect: 'random',
        slices: 15,
        animSpeed: 1000,
        //Slide transition speed
        pauseTime: 7000,
        //startSlide:0, //Set starting Slide (0 index)
        directionNav: true,
        //Next & Prev
        directionNavHide: false,
        //Only show on hover
        controlNav: true,
        //1,2,3...
        //controlNavThumbs:false, //Use thumbnails for Control Nav
        // controlNavThumbsFromRel:false, //Use image rel for thumbs
        // controlNavThumbsSearch: '.jpg', //Replace this with...
        //controlNavThumbsReplace: '_thumb.jpg', //...this in thumb Image src
        // keyboardNav:true, //Use left & right arrows
        pauseOnHover: true,
        //Stop animation while hovering
        // manualAdvance:false, //Force manual transitions
         captionOpacity:1, //Universal caption opacity
        beforeChange: function() {},
        // slideshowEnd: function(){}, //Triggers after all slides have been shown
        lastSlide: function() {},
        //Triggers when last slide is shown
        afterLoad: function() {},
        //Triggers when slider has loaded
        afterChange: function() {}

    });

    $('#sliders-port').nivoSlider({
        effect: 'random',
        slices: 15,
        animSpeed: 1000,
        //Slide transition speed
        pauseTime: 4000,
        directionNav: true,
        //Next & Prev
        directionNavHide: false,
        //Only show on hover
        controlNav: true,
        pauseOnHover: true

    });
	
	
//Toggle

    $(".toggle-box").hide();
    $(".open-block").toggle(function() {
        $(this).addClass("active");
    },
    function() {
        $(this).removeClass("active");
    });
    $(".open-block").click(function() {
        $(this).next(".toggle-box").slideToggle();
    });
	
//Accordion

    $('.accordion-box').hide();
    $('.open-block-acc').click(function() {
        $(".open-block-acc").removeClass("active"); 
		$('.accordion-box').slideUp('normal');
        if ($(this).next().is(':hidden') == true) {
            $(this).next().slideDown('normal');
            $(this).addClass("active");
        }
    });

    $('.message-box').find('.closemsg').click(function() {
        $(this).parent('.message-box').slideUp(500);
    });
	


// Validator plugin

    $('#submit').formValidator({
        scope: '#form'
    });

    $('#submit').click(function() {
        $('input.error-input, textarea.error-input').delay(300).animate({
            marginLeft: 0
        },
        100).animate({
            marginLeft: 10
        },
        100).animate({
            marginLeft: 0
        },
        100).animate({
            marginLeft: 10
        },
        100);
    });

// Form plugin

    var options = {

        beforeSubmit: function() {
            $('.sending').show();

        },
        success: function() {
            $('.sending').hide();
            $('#form').hide();
            $(".mess").show().html('<h3>Thanks !</h3><h3>Your message has been sent.</h3>'); // Change Your message post send
            $('.mess').delay(3000).fadeOut(function() {

                $('#form').clearForm();
                $('#form').delay(3500).show();

            });
        }
    };

    $('#form').submit(function() {
        $(this).ajaxSubmit(options);
        return false;
    });
	
	
	
$('.item_block').hide();
  
});

jQuery.fn.progression.defaults.Current = 0;
jQuery.fn.progression.defaults.Background = '';
jQuery.fn.progression.defaults.aBackground = '';
jQuery.fn.progression.defaults.TextColor = '';
jQuery.fn.progression.defaults.aTextColor = '';