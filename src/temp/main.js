!function(){var e='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="33.15px" height="70.039px" viewBox="116.024 245.139 33.15 70.039" enable-background="new 116.024 245.139 33.15 70.039" xml:space="preserve"><g><g><path d="M123.52,315.178c0,0,24.303-52.74,24.305-52.748l1.35-3c-5.229,1.502-16.91,4.363-16.947,4.475c1.222-3.417,6.484-18.767,6.708-18.767c-4.996,0-9.993,0-14.99,0l-1.524,7.242l-6.397,26.249l16.899-4.601L123.52,315.178z"/></g></g></svg>';window.brief=function(e){e?(e.data&&n(e.data),e.updated&&o(e.updated)):console.log("error loading data")};var t=function(){var e="https://www.boston.com/partners/brief.jsonp?",t=document.createElement("script"),n=new Date,a="_="+n.getTime();t.src=e+a+"?callback=?",document.getElementsByTagName("body")[0].appendChild(t)},n=function(t){t=i(t);for(var n=t.length,o=640,l=window.innerWidth*window.devicePixelRatio,c=l>o,d=document.getElementById("results"),g=0;n>g;g++){var m=t[g],p=s(m.description),u="";u+='<div class="section-and-date"><p class="section">'+m.section+'</p><p class="date">'+m.date+"</p></div>",u+='<div class="image" id="story-image-'+g+'">',u+='<a class="lite" href="'+a(m.url)+'">'+e+"</a>",u+="</div>",u+='<a title="'+m.hed+'" href="'+m.url+'">',u+='<h1 class="hed">'+m.hed+"</h1>",u+='<p class="description">'+p+"</p></div>",u+="</a>";var w=document.createElement("div");w.innerHTML=u,w.classList?w.classList.add("story"):w.className+=" story",d.appendChild(w)}var v=function(e){var a=t[e],i=new Image;i.onload=function(){var t="url('"+a.image+"')",i=document.getElementById("story-image-"+e);i.style.backgroundImage=t,("img/ap.jpg"===a.image||"img/bg.jpg"===a.image)&&(i.style.backgroundPosition="50% 50%"),e++,n>e&&v(e)},i.onerror=function(){console.log("error loading image:",a.image),e++,n>e&&v(e)},a.image=a.image.replace("http","https"),r(a.image)?a.image="img/bg.jpg":c&&(a.image=a.image.replace("585w","835w")),i.src=a.image};v(0)},a=function(e){var t="http://www.boston.com/newsprojects/globe-lite/article.php?url=";if(-1===e.indexOf("www.")){var n=e.split("bostonglobe.com");n.splice(1,0,"www.bostonglobe.com"),e=n.join("")}return t+encodeURIComponent(e)},i=function(e){for(var t=e.length,n=0;t>n;n++)e[n].hed.indexOf("The Big Picture")>-1&&(e.splice(n,1),t=e.length);return e},r=function(e){return e?e.indexOf("logo-bg-small-square")>-1?!0:e.indexOf("Staff/Caricatures")>-1?!0:e.indexOf("avatars.scribblelive")>-1?!0:!1:!0},o=function(e){var t=document.getElementById("updated");t.innerText="Updated at "+e.time},s=function(e){var t=240;if(e.length>t){var n=e.substring(0,t),a=n.lastIndexOf(" ");return n.substring(0,a)+"..."}return e};t()}();