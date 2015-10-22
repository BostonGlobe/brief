(function() {
    var _data;
    var _choice = 'recent';
    var _biggerImage = false;
    var _buttonElements = document.getElementsByClassName('btn-choice');
    var _loaded;

    var init = function() {
        loadData();
        setupSize();
        setupEvents();
    };

    var setupSize = function() {
        var threshold = 640;
        var width = window.innerWidth * window.devicePixelRatio;
        _biggerImage = width > threshold;
    };

    var setupEvents = function() {
        for(var i = 0; i < _buttonElements.length; i++) {
            var el = _buttonElements[i];
            el.addEventListener('click', function(e) {
                if(_loaded) {
                    _choice = this.getAttribute('data-choice');
                    displayStories(_data[_choice]);
                    this.classList.add('selected');
                    if (this.nextElementSibling) {
                        this.nextElementSibling.classList.remove('selected');
                    } else {
                        this.previousElementSibling.classList.remove('selected');
                    }    
                }
            }, false);
        }

        var topEl = document.getElementsByClassName('btn-top')[0];
        topEl.addEventListener('click', function(e) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }, false);
    };

    var loadData = function() {
        var url = 'https://www.boston.com/partners/brief.jsonp?';
        var scriptData = document.createElement('script');
        var date = new Date();
        var v = '_=' + date.getTime();
        scriptData.src = url + v + '?callback=?';
        document.getElementsByTagName('body')[0].appendChild(scriptData);
    };

    var displayStories = function(data) {
        var num = data.length;
        var storiesEl = document.getElementsByClassName('stories--' + _choice)[0];

        if (storiesEl.querySelectorAll('.story').length < 1) {
            for(var i = 0; i < num; i++ ) {
                var datum = data[i];

                if(shouldDisplay(datum)) {
                    var html = createHTML(datum, i);
                    storiesEl.appendChild(html);
                }
            }
        }

        // show this choice, hide other
        var storiesGroup = document.getElementsByClassName('stories-group');
        storiesGroup[0].classList.add('hide');
        storiesGroup[1].classList.add('hide');

        storiesEl.classList.remove('hide');
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    var shouldDisplay = function(datum) {
        if(!datum.description) {
            return false;
        }

        var s = datum.section;
        if (s === 'North' || s === 'South' || s === 'West' || s === 'Real estate') {
            return false;
        }

        if(datum.hed.indexOf('The Big Picture') > -1) {
            return false;
        }

        return true;
    };

    var createHTML = function(datum, i) {
        var description = shortenDescription(datum.description);
        var time = datum.diff ? datum.diff : datum.date;
        
        var html = '';
        html += '<div class="section-and-date"><p class="section">' + datum.section + '</p><p class="date">' + time + '</p></div>';
        html += '<div class="image">';
        html += '</div>';
        html += '<a title="' + datum.hed + '" href="' + datum.url + '">';
        html += '<h1 class="hed">' + datum.hed + '</h1>';
        html += '<p class="description">' + description + '</p></div>';
        html += '</a>';

        var el = document.createElement('div');

        el.innerHTML = html;
        el.classList.add('story');

        setBgImage(el, datum);
        
        return el;
    };

    var setBgImage = function(el, datum) {
        var imgEl = el.querySelectorAll('.image')[0];

        if(replaceWithLogo(datum.image)) {
            datum.image = 'img/bg.jpg';
            imgEl.classList.add('hide');
        } else {
            img = new Image();
            replace = false;

            if(_biggerImage) {
                datum.image = datum.image.replace('585w', '835w');    
            }

            //https!
            datum.image = datum.image.replace('http:', 'https:');

            var bg = 'url(\''+ datum.image +'\')';
            imgEl.style.backgroundImage = bg;
        }
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
        var el = document.getElementsByClassName('updated')[0];
        el.innerText = 'Updated at ' + updated.time;
    };

    var shortenDescription = function(str) {
        var max = 240;
        if(str && str.length > max) {
            var sub = str.substring(0, max);
            var lastSpace = sub.lastIndexOf(' ');
            return sub.substring(0, lastSpace) + '...';
        } else {
            return str;
        }
    };

    var cleanRecent = function(data) {
        data.sort(function(a, b){
          return new Date(b.updated) - new Date(a.updated);
        });

        // est
        var now = convertToTimezone(-4.0);

        for (var i = 0; i < data.length; i++ ) {
            var datum = data[i];
            datum.diff = Math.round((now - new Date(datum.updated)) / 60000) + 'm ago';
            datum.image = getImageSource(datum.lead);
            datum.description = datum.description || '';
        }

        return data;
    };

    var getImageSource = function(html) {
        if(html) {
            var div = document.createElement('div');
            div.innerHTML = html;
            var img = div.querySelectorAll('img')[0];
            var src = 'http:' + img.getAttribute('data-fullsrc');
            return src;
        } else {
            return false;
        }
    };

    var convertToTimezone = function(offset) {

        clientDate = new Date();
        utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);

        newDate = new Date(utc + (3600000 * offset));

        return newDate;
    };

    window.brief = function(result) {
        _data = result;
        var loadingEl = document.getElementsByClassName('loading')[0];
        var pEl = loadingEl.querySelectorAll('p')[0];
        var bottomEl = document.getElementsByClassName('bottom')[0];
        
        if(_data) {

            if(_data.recent) {
                _data.recent = cleanRecent(_data.recent);
            }

            if(_data[_choice]) {
                displayStories(_data[_choice]);
            }

            if(_data.updated) {
                showTime(_data.updated);   
            }

            _loaded = true;
            loadingEl.parentNode.removeChild(loadingEl);
            bottomEl.classList.remove('hide');

        } else {
            pEl.innerText = 'Error loading data.';
        }
    };

    init();
})();