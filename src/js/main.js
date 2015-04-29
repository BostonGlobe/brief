(function() {
    window.trending = function(result) {
        console.log(result);
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
        var url = 'http://russellgoldenberg.com/globe/visual/trending.jsonp?';
        var scriptData = document.createElement('script');
        var date = new Date();
        var v = '_=' + date.getTime();
        scriptData.src = url + v + '?callback=?';
        document.getElementsByTagName('body')[0].appendChild(scriptData);
    };

    var displayStories = function(data) {
        var num = data.length;
        if(data.length % 2 === 1) {
            num -=1;
        }

        for(var x = 0; x < num; x++ ) {
            var story = data[x];
            var title = parseTitle(story.title); 
            var description = shortenDescription(story.description);

            var html = '<a href="' + story.url + '">';
            html += '<h1 class="headline">' + title + '</h1>';
            html += '<div class="image" id="story-image-' + x + '"></div>';
            html += '<p class="description">' + description + '</p></div>';
            html += '</a>';

            var results = document.getElementById('results');
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
            
            img.onload = function() {
                var bg = 'url(\''+ story.image +'\')';
                var el = document.getElementById('story-image-' + i);
                el.style.backgroundImage = bg;
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

            //handling strange cases and replace with logo
            if(replaceWithLogo(story.image)) {
                story.image = 'img/bg.jpg';
            } else {
                story.image = story.image.replace('585w', '835w');
            }
            img.src = story.image;     
        };

        loadImage(0);
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
        el.innerText = 'Last updated: ' + updated.time;
    };

    var parseTitle = function(str) {
        var split = str.split('-');
        if(split.length > 2) {
            //if last is blank, it ran out of room, connect everything before that
            split = split.slice(0, split.length - 2);
        } else if(split.length === 2) {
            split = split.slice(0, 1);
        }
        return split.join('-');
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

    init();
})();