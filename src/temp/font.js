!function(e,t){function n(t,n,o){function r(){for(var e,n=0;n<i.length;n++)i[n].href&&i[n].href.indexOf(t)>-1&&(e=!0);e?f.media=o||"all":setTimeout(r)}var f=e.document.createElement("link"),a=n||e.document.getElementsByTagName("script")[0],i=e.document.styleSheets;return f.rel="stylesheet",f.href=t,f.media="only x",a.parentNode.insertBefore(f,a),r(),f}var o="https://apps.bostonglobe.com/common/font/",r=e.document;if("querySelector"in r){var f=function(e){if(!("FontFace"in e))return!1;var t=new e.FontFace("t",'url( "data:application/font-woff2," ) format( "woff2" )');return t.load()["catch"](function(){}),"loading"===t.status}(e),a=navigator.userAgent,i=o+"woff.css";f?i=o+"woff2.css":a.indexOf("Android")>-1&&a.indexOf("like Gecko")>-1&&-1===a.indexOf("Chrome")&&(i=o+"ttf.css"),n(i)}}(this);