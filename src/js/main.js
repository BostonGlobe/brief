(function() {
    window.trending = function(result) {
        if(result) {
            if(result.data) {
                displayStories(result.data);
                resize();
                $(window).on('resize', resize);
            }
            if(result.updated) {
                showTime(result.updated);   
            }
        } else {
            console.log('error loading data');
        }
    };

    function init() {
        var url = 'http://russellgoldenberg.com/globe/visual/trending.jsonp?';
        // var url = 'http://cache.boston.com/partners/chartbeat/visual.jsonp?';
        var scriptData = document.createElement('script');
        var date = new Date();
        var v = '_=' + date.getTime();
        scriptData.src = url + v + '?callback=?';
        document.getElementsByTagName('body')[0].appendChild(scriptData);
    }

    function resize() {
        var w = $('.results a').width();

        $('.results a').css({
            height: w
        });
    }

    function displayStories(data) {
        var results0 = $('#results0');
        var results1 = $('#results1');

        var num = data.length;
        if(data.length % 2 === 1) {
            num -=1;
        }

        for(var x = 0; x < num; x++ ) {
            var story = data[x];
            var el = $('<a class="story" id="story' + x + '" href="'+ story.url + '"></a>');
            if(x % 2 === 0) {
                results0.append(el);
            } else {
                results1.append(el);
            }
        }
        
        var loadImage = function(i) {
            var story = data[i];
            
            var img = new Image();
            
            img.onload = function() {
                var bg = 'url('+ story.image +') no-repeat center';
                $('#story' + i).css({
                    'background': bg,
                    'background-size': 'cover'
                });
                i++;
                if(i < num) {
                    loadImage(i);
                }
            };

            img.src = story.image;
        };

        loadImage(0);
    }

    function showTime(updated) {
        $('#updated').text('Last updated: ' + updated.time);
    } 

    init();
})();