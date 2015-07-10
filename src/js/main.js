(function() {
    var _liteSvg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="33.15px" height="70.039px" viewBox="116.024 245.139 33.15 70.039" enable-background="new 116.024 245.139 33.15 70.039" xml:space="preserve"><g><g><path d="M123.52,315.178c0,0,24.303-52.74,24.305-52.748l1.35-3c-5.229,1.502-16.91,4.363-16.947,4.475c1.222-3.417,6.484-18.767,6.708-18.767c-4.996,0-9.993,0-14.99,0l-1.524,7.242l-6.397,26.249l16.899-4.601L123.52,315.178z"/></g></g></svg>';

    window.brief = function(result) {
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

    var init = function() {
        var url = 'https://www.boston.com/partners/brief.jsonp?';
        var scriptData = document.createElement('script');
        var date = new Date();
        var v = '_=' + date.getTime();
        scriptData.src = url + v + '?callback=?';
        document.getElementsByTagName('body')[0].appendChild(scriptData);
    };

    var displayStories = function(data) {
        data = validateStories(data);
        var num = data.length;
        var threshold = 640;
        var width = window.innerWidth * window.devicePixelRatio;
        var biggerImage = width > threshold;
        var results = document.getElementById('results');

        for(var x = 0; x < num; x++ ) {
            var story = data[x];
            var description = shortenDescription(story.description);
            var html = '';
            html += '<div class="section-and-date"><p class="section">' + story.section + '</p><p class="date">' + story.date + '</p></div>';
            html += '<div class="image" id="story-image-' + x + '">';
            html += '<a class="lite" href="' + getLiteUrl(story.url) + '">' + _liteSvg + '</a>';
            html += '</div>';
            html += '<a title="' + story.hed + '" href="' + story.url + '">';
            html += '<h1 class="hed">' + story.hed + '</h1>';
            html += '<p class="description">' + description + '</p></div>';
            html += '</a>';

            var el = document.createElement('div');

            el.innerHTML = html;
            if (el.classList) { 
                el.classList.add('story');
            } else {
                el.className += ' story';
            }
            results.appendChild(el);
        }

        var loadImage = function(i) {
            var story = data[i];
            var img = new Image();
            var replace = false;
            
            img.onload = function() {
                var bg = 'url(\''+ story.image +'\')';
                var el = document.getElementById('story-image-' + i);
                el.style.backgroundImage = bg;

                //center if ap or bg
                if(story.image === 'img/ap.jpg' || story.image === 'img/bg.jpg') {
                    el.style.backgroundPosition = '50% 50%';
                }

                i++;
                if(i < num) {
                    loadImage(i);
                }
            };

            img.onerror = function() {
                console.log('error loading image:', story.image);
                i++;
                if(i < num) {
                    loadImage(i);
                }
            };

            //https!
            story.image = story.image.replace('http', 'https');
            //handling strange cases and replace with logo and optimal image size
            if(replaceWithLogo(story.image)) {
                story.image = 'img/bg.jpg';
            } else {
                if(biggerImage) {
                    story.image = story.image.replace('585w', '835w');    
                }
            }

            img.src = story.image;     
        };

        loadImage(0);
    };

    var getLiteUrl = function(url) {
        var base = 'http://www.boston.com/newsprojects/globe-lite/article.php?url=';
        if(url.indexOf('www.') === -1) {
            var split = url.split('bostonglobe.com');
            split.splice(1,0,'www.bostonglobe.com');
            url = split.join('');
        }
        return base + encodeURIComponent(url);
    };

    var validateStories = function(data) {
        var num = data.length;
        for(var i = 0; i < num; i++) {
            if(data[i].hed.indexOf('The Big Picture') > -1) {
                data.splice(i, 1);
                num = data.length;
            }
        }

        return data;
    };

    var replaceWithLogo = function(img) {
        if(!img) {
            return true;
        }
        if(img.indexOf('logo-bg-small-square') > -1) {
            return true;
        }
        //staff drawing
        if(img.indexOf('Staff/Caricatures') > -1) {
            return true;   
        }
        //scribblelive
        if(img.indexOf('avatars.scribblelive') > -1) {
            return true;
        }
        return false;
    };

    var showTime = function(updated) {
        var el = document.getElementById('updated');
        el.innerText = 'Updated at ' + updated.time;
    };

    var shortenDescription = function(str) {
        var max = 240;
        if(str.length > max) {
            var sub = str.substring(0, max);
            var lastSpace = sub.lastIndexOf(' ');
            return sub.substring(0, lastSpace) + '...';
        } else {
            return str;
        }
    };

    // var parseTitle = function(str) {
    //     var split = str.split('-');
    //     if(split.length > 2) {
    //         //if last is blank, it ran out of room, connect everything before that
    //         split = split.slice(0, split.length - 2);
    //     } else if(split.length === 2) {
    //         split = split.slice(0, 1);
    //     }
    //     return split.join('-');
    // };

    init();
})();