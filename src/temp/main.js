!function(){var e,t,n="chartbeat",i=!1,a=document.getElementsByClassName("btn-choice"),r=function(){o(),s(),c()},s=function(){var e=640,t=window.innerWidth*window.devicePixelRatio;i=t>e},c=function(){for(var i=0;i<a.length;i++){var r=a[i];r.addEventListener("click",function(i){t&&(n=this.getAttribute("data-choice"),l(e[n]),this.classList.add("selected"),this.nextElementSibling?this.nextElementSibling.classList.remove("selected"):this.previousElementSibling.classList.remove("selected"))},!1)}var s=document.getElementsByClassName("btn-top")[0];s.addEventListener("click",function(e){ga("send",{hitType:"event",eventCategory:"Navigation",eventAction:"click",eventLabel:"Back to top"}),document.body.scrollTop=document.documentElement.scrollTop=0},!1)},o=function(){var e="https://www.boston.com/partners/brief.jsonp?",t=document.createElement("script"),n=new Date,i="_="+n.getTime();t.src=e+i+"?callback=?",document.getElementsByTagName("body")[0].appendChild(t)},l=function(e){var t=e.length,i=document.getElementsByClassName("stories--"+n)[0];if(i.querySelectorAll(".story").length<1)for(var a=0;t>a;a++){var r=e[a];if(d(r)){var s=m(r,a);i.appendChild(s)}}var c=document.getElementsByClassName("stories-group");c[0].classList.add("hide"),c[1].classList.add("hide"),i.classList.remove("hide"),document.body.scrollTop=document.documentElement.scrollTop=0},d=function(e){if(!e.description)return!1;var t=e.section;return"North"===t||"South"===t||"West"===t||"Real estate"===t?!1:e.hed.indexOf("The Big Picture")>-1?!1:!0},m=function(e,t){var n=f(e.description),i=e.diff?e.diff:e.date,a=e.section;i=i||"",a=a||"Special";var r="";r+='<div class="section-and-date"><p class="section">'+a+'</p><p class="date">'+i+"</p></div>",r+='<div class="image">',r+="</div>",r+='<a title="'+e.hed+'" href="'+e.url+'">',r+='<h1 class="hed">'+e.hed+"</h1>",r+='<p class="description">'+n+"</p></div>",r+="</a>";var s=document.createElement("div");return s.innerHTML=r,s.classList.add("story"),u(s,e),s},u=function(e,t){var n=e.querySelectorAll(".image")[0];if(g(t.image))t.image="img/bg.jpg",n.classList.add("hide");else{img=new Image,replace=!1,i&&(t.image=t.image.replace("585w","835w")),t.image=t.image.replace("http:","https:");var a="url('"+t.image+"')";n.style.backgroundImage=a}},g=function(e){return e?e.indexOf("logo-bg-small-square")>-1?!0:e.indexOf("Staff/Caricatures")>-1?!0:e.indexOf("avatars.scribblelive")>-1?!0:!1:!0},f=function(e){var t=240;if(e&&e.length>t){var n=e.substring(0,t),i=n.lastIndexOf(" ");return n.substring(0,i)+"..."}return e},v=function(e){e.sort(function(e,t){return new Date(t.updated)-new Date(e.updated)});for(var t=h(-5),n=0;n<e.length;n++){var i=e[n];i.diff=Math.round((t-new Date(i.updated))/6e4)+"m ago",i.image=p(i.lead),i.description=i.description||""}return e},p=function(e){if(e){var t=document.createElement("div");t.innerHTML=e;var n=t.querySelectorAll("img")[0],i="http:"+n.getAttribute("data-fullsrc");return i}return!1},h=function(e){return clientDate=new Date,utc=clientDate.getTime()+6e4*clientDate.getTimezoneOffset(),newDate=new Date(utc+36e5*e),newDate},b=function(){window.performance&&ga("send",{hitType:"timing",timingCategory:"Performance",timingVar:"load",timingValue:performance.now()})};window.brief=function(i){e=i;var a=document.getElementsByClassName("loading")[0],r=a.querySelectorAll("p")[0],s=document.getElementsByClassName("bottom")[0];e?(e.recent&&(e.recent=v(e.recent)),e[n]&&l(e[n]),e.updated,t=!0,a.parentNode.removeChild(a),s.classList.remove("hide")):r.innerText="Error loading data.",b()},r()}();