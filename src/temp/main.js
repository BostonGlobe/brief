!function(){window.trending=function(e){e?(e.data&&n(e.data),e.updated&&a(e.updated)):console.log("error loading data")};var e=function(){var e="http://russellgoldenberg.com/globe/visual/trending.jsonp?",n=document.createElement("script"),t=new Date,a="_="+t.getTime();n.src=e+a+"?callback=?",document.getElementsByTagName("body")[0].appendChild(n)},n=function(e){var n=e.length;e.length%2===1&&(n-=1);for(var a=0;n>a;a++){var l=e[a],o=i(l.title),g=r(l.description),s='<a href="'+l.url+'">';s+='<h1 class="headline">'+o+"</h1>",s+='<div class="image" id="story-image-'+a+'"></div>',s+='<p class="description">'+g+"</p></div>",s+="</a>";var d=document.getElementById("results"),c=document.createElement("div");c.innerHTML=s,c.classList?c.classList.add("story"):c.className+=" story",d.appendChild(c)}var u=function(a){var i=e[a],r=new Image;r.onload=function(){var e="url('"+i.image+"')",t=document.getElementById("story-image-"+a);t.style.backgroundImage=e,("img/ap.jpg"===i.image||"img/bg.jpg"===i.image)&&(t.style.backgroundPosition="50% 50%"),a++,n>a&&u(a)},r.onerror=function(){console.log("error loading image:",i.image),a++,n>a&&u(a)},i.image=t(i.image)?"img/bg.jpg":i.image.replace("585w","835w"),r.src=i.image};u(0)},t=function(e){return e?e.indexOf("logo-bg-small-square")>-1?!0:e.indexOf("Staff/Caricatures")>-1?!0:e.indexOf("avatars.scribblelive")>-1?!0:!1:!0},a=function(e){var n=document.getElementById("updated");n.innerText="Last updated: "+e.time},i=function(e){var n=e.split("-");return n.length>2?n=n.slice(0,n.length-2):2===n.length&&(n=n.slice(0,1)),n.join("-")},r=function(e){var n=240;if(e.length>n){var t=e.substring(0,n),a=t.lastIndexOf(" ");return t.substring(0,a)+"..."}return e};e()}();