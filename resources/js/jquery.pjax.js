// jquery.pjax.js
// copyright chris wanstrath
// https://github.com/defunkt/jquery-pjax

;(function(g){function k(D,E,F){var G=this;return this.on("click.pjax",D,function(I){var H=g.extend({},s(E,F));if(!H.container){H.container=g(this).attr("data-pjax")||G}l(I,H)})}function l(I,E,F){F=s(E,F);var H=I.currentTarget;if(H.tagName.toUpperCase()!=="A"){throw"$.fn.pjax or $.pjax.click requires an anchor element"}if(I.which>1||I.metaKey||I.ctrlKey||I.shiftKey||I.altKey){return}if(location.protocol!==H.protocol||location.hostname!==H.hostname){return}if(H.hash&&H.href.replace(H.hash,"")===location.href.replace(location.hash,"")){return}if(H.href===location.href+"#"){return}var J={url:H.href,container:g(H).attr("data-pjax"),target:H};var G=g.extend({},J,F);var D=g.Event("pjax:click");g(H).trigger(D,[G]);if(!D.isDefaultPrevented()){z(G);I.preventDefault()}}function q(G,D,E){E=s(D,E);var F=G.currentTarget;if(F.tagName.toUpperCase()!=="FORM"){throw"$.pjax.submit requires a form element"}var H={type:F.method.toUpperCase(),url:F.action,data:g(F).serializeArray(),container:g(F).attr("data-pjax"),target:F};z(g.extend({},H,E));G.preventDefault()}function z(D){D=g.extend(true,{},g.ajaxSettings,z.defaults,D);if(g.isFunction(D.url)){D.url=D.url()}var I=D.target;var H=p(D.url).hash;var E=D.context=r(D.container);if(!D.data){D.data={}}D.data._pjax=E.selector;function G(L,K){var M=g.Event(L,{relatedTarget:I});E.trigger(M,K);return !M.isDefaultPrevented()}var F;D.beforeSend=function(L,K){if(K.type!=="GET"){K.timeout=0}L.setRequestHeader("X-PJAX","true");L.setRequestHeader("X-PJAX-Container",E.selector);if(!G("pjax:beforeSend",[L,K])){return false}if(K.timeout>0){F=setTimeout(function(){if(G("pjax:timeout",[L,D])){L.abort("timeout")}},K.timeout);K.timeout=0}D.requestUrl=p(K.url).href};D.complete=function(K,L){if(F){clearTimeout(F)}G("pjax:complete",[K,L,D]);G("pjax:end",[K,D])};D.error=function(N,O,L){var K=w("",N,D);var M=G("pjax:error",[N,O,L,D]);if(D.type=="GET"&&O!=="abort"&&M){x(K.url)}};D.success=function(N,M,R){var Q=(typeof g.pjax.defaults.version==="function")?g.pjax.defaults.version():g.pjax.defaults.version;var S=R.getResponseHeader("X-PJAX-Version");var L=w(N,R,D);if(Q&&S&&Q!==S){x(L.url);return}if(!L.contents){x(L.url);return}z.state={id:D.id||m(),url:L.url,title:L.title,container:E.selector,fragment:D.fragment,timeout:D.timeout};if(D.push||D.replace){window.history.replaceState(z.state,L.title,L.url)}document.activeElement.blur();if(L.title){document.title=L.title}E.html(L.contents);var O=E.find("input[autofocus], textarea[autofocus]").last()[0];if(O&&document.activeElement!==O){O.focus()}a(L.scripts);if(typeof D.scrollTo==="number"){g(window).scrollTop(D.scrollTo)}if(H!==""){var K=p(L.url);K.hash=H;z.state.url=K.href;window.history.replaceState(z.state,L.title,K.href);var P=g(K.hash);if(P.length){g(window).scrollTop(P.offset().top)}}G("pjax:success",[N,M,R,D])};if(!z.state){z.state={id:m(),url:window.location.href,title:document.title,container:E.selector,fragment:D.fragment,timeout:D.timeout};window.history.replaceState(z.state,document.title)}var J=z.xhr;if(J&&J.readyState<4){J.onreadystatechange=g.noop;J.abort()}z.options=D;var J=z.xhr=g.ajax(D);if(J.readyState>0){if(D.push&&!D.replace){j(z.state.id,E.clone().contents());window.history.pushState(null,"",B(D.requestUrl))}G("pjax:start",[J,D]);G("pjax:send",[J,D])}return z.xhr}function v(D,E){var F={url:window.location.href,push:false,replace:true,scrollTo:false};return z(g.extend(F,s(D,E)))}function x(D){window.history.replaceState(null,"","#");window.location.replace(D)}var i=true;var C=window.location.href;var A=window.history.state;if(A&&A.container){z.state=A}if("state" in window.history){i=false}function b(G){var H=G.state;if(H&&H.container){if(i&&C==H.url){return}if(z.state.id===H.id){return}var D=g(H.container);if(D.length){var I,F=e[H.id];if(z.state){I=z.state.id<H.id?"forward":"back";t(I,z.state.id,D.clone().contents())}var J=g.Event("pjax:popstate",{state:H,direction:I});D.trigger(J);var E={id:H.id,url:H.url,container:D,push:false,fragment:H.fragment,timeout:H.timeout,scrollTo:false};if(F){D.trigger("pjax:start",[null,E]);if(H.title){document.title=H.title}D.html(F);z.state=H;D.trigger("pjax:end",[null,E])}else{z(E)}D[0].offsetHeight}else{x(location.href)}}i=false}function d(E){var D=g.isFunction(E.url)?E.url():E.url,H=E.type?E.type.toUpperCase():"GET";var F=g("<form>",{method:H==="GET"?"GET":"POST",action:D,style:"display:none"});if(H!=="GET"&&H!=="POST"){F.append(g("<input>",{type:"hidden",name:"_method",value:H.toLowerCase()}))}var G=E.data;if(typeof G==="string"){g.each(G.split("&"),function(I,J){var K=J.split("=");F.append(g("<input>",{type:"hidden",name:K[0],value:K[1]}))})}else{if(typeof G==="object"){for(key in G){F.append(g("<input>",{type:"hidden",name:key,value:G[key]}))}}}g(document.body).append(F);F.submit()}function m(){return(new Date).getTime()}function B(D){return D.replace(/\?_pjax=[^&]+&?/,"?").replace(/_pjax=[^&]+&?/,"").replace(/[\?&]$/,"")}function p(E){var D=document.createElement("a");D.href=E;return D}function s(D,E){if(D&&E){E.container=D}else{if(g.isPlainObject(D)){E=D}else{E={container:D}}}if(E.container){E.container=r(E.container)}return E}function r(D){D=g(D);if(!D.length){throw"no pjax container for "+D.selector}else{if(D.selector!==""&&D.context===document){return D}else{if(D.attr("id")){return g("#"+D.attr("id"))}else{throw"cant get selector for pjax container!"}}}}function n(E,D){return E.filter(D).add(E.find(D))}function u(D){return g.parseHTML(D,document,true)}function w(G,I,E){var H={};H.url=B(I.getResponseHeader("X-PJAX-URL")||E.requestUrl);if(/<html/i.test(G)){var D=g(u(G.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]));var F=g(u(G.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]))}else{var D=F=g(u(G))}if(F.length===0){return H}H.title=n(D,"title").last().text();if(E.fragment){if(E.fragment==="body"){var J=F}else{var J=n(F,E.fragment).first()}if(J.length){H.contents=J.contents();if(!H.title){H.title=J.attr("title")||J.data("title")}}}else{if(!/<html/i.test(G)){H.contents=F}}if(H.contents){H.contents=H.contents.not(function(){return g(this).is("title")});H.contents.find("title").remove();H.scripts=n(H.contents,"script[src]").remove();H.contents=H.contents.not(H.scripts)}if(H.title){H.title=g.trim(H.title)}return H}function a(D){if(!D){return}var E=g("script[src]");D.each(function(){var G=this.src;var H=E.filter(function(){return this.src===G});if(H.length){return}var F=document.createElement("script");F.type=g(this).attr("type");F.src=g(this).attr("src");document.head.appendChild(F)})}var e={};var f=[];var h=[];function j(E,D){e[E]=D;h.push(E);while(f.length){delete e[f.shift()]}while(h.length>z.defaults.maxCacheLength){delete e[h.shift()]}}function t(F,H,E){var G,D;e[H]=E;if(F==="forward"){G=h;D=f}else{G=f;D=h}G.push(H);if(H=D.pop()){delete e[H]}}function y(){return g("meta").filter(function(){var D=g(this).attr("http-equiv");return D&&D.toUpperCase()==="X-PJAX-VERSION"}).attr("content")}function o(){g.fn.pjax=k;g.pjax=z;g.pjax.enable=g.noop;g.pjax.disable=c;g.pjax.click=l;g.pjax.submit=q;g.pjax.reload=v;g.pjax.defaults={timeout:650,push:true,replace:false,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:y};g(window).on("popstate.pjax",b)}function c(){g.fn.pjax=function(){return this};g.pjax=d;g.pjax.enable=o;g.pjax.disable=g.noop;g.pjax.click=g.noop;g.pjax.submit=g.noop;g.pjax.reload=function(){window.location.reload()};g(window).off("popstate.pjax",b)}if(g.inArray("state",g.event.props)<0){g.event.props.push("state")}g.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/);g.support.pjax?o():c()})(jQuery);