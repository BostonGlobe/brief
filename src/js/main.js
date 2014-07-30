(function() {
    window.trending = function(result) {
        if(result) {
            if(result.data) {
                displayStories(result.data);
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

    function displayStories(data) {
        var num = data.length;
        if(data.length % 2 === 1) {
            num -=1;
        }

        for(var x = 0; x < num; x++ ) {
            var story = data[x];
            var el = $('<a class="story" id="story' + x + '" href="'+ story.url + '"></a>');
            if(story.image) {
                $('.results').append(el);    
            }
            
        }
        
        var loadImage = function(i) {
            var story = data[i];
            
            if(story.image) {
                 var img = new Image();
            
                img.onload = function() {
                    var bg = 'url(\''+ story.image +'\') no-repeat 50% 25%';
                    $('#story' + i).css({
                        'background': bg,
                        'background-size': 'cover'
                    });
                    i++;
                    if(i < num) {
                        loadImage(i);
                    }
                };

                img.onerror = function() {
                    console.log('error loading image:', story.image);
                };

                //handling strange cases
                //bg logo
                if(story.image.indexOf('logo-bg-small-square') > -1) {
                    story.image = 'img/bg.jpg';
                }
                //staff drawing
                if(story.image.indexOf('Staff/Caricatures') > -1) {
                    story.image = 'img/bg.jpg';   
                }
                img.src = story.image;     
            } else {
                 i++;
                if(i < num) {
                    loadImage(i);
                }
            }
        };

        loadImage(0);
    }

    function showTime(updated) {
        $('#updated').text('Last updated: ' + updated.time);
    } 

    init();
})();