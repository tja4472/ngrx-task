(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{bQlE:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=(r=n("wj3C"))&&"object"==typeof r&&"default"in r?r.default:r;n("fSjL");var o,a,s,c,u,p=n("mrSG"),f=n("zVF4"),l=n("q/0M"),m=n("S+S0"),g="@firebase/performance",h="0.2.29",d=h,v="FB-PERF-TRACE-START",_="FB-PERF-TRACE-STOP",b="FB-PERF-TRACE-MEASURE",y="@firebase/performance/config",I="@firebase/performance/configexpire",T=((o={})["trace started"]="Trace {$traceName} was started before.",o["trace stopped"]="Trace {$traceName} is not running.",o["no window"]="Window is not available.",o["no app id"]="App id is not available.",o["no project id"]="Project id is not available.",o["no api key"]="Api key is not available.",o["invalid cc log"]="Attempted to queue invalid cc event",o["FB not default"]="Performance can only start when Firebase app instance is the default one.",o["RC response not ok"]="RC response is not ok",o["invalid attribute name"]="Attribute name {$attributeName} is invalid.",o["invalid attribute value"]="Attribute value {$attributeValue} is invalid.",o["invalide custom metric name"]="Custom metric name {$customMetricName} is invalid",o),w=new f.ErrorFactory("performance","Performance",T),E=function(){function t(t){if(this.window=t,!t)throw w.create("no window");this.performance=t.performance,this.PerformanceObserver=t.PerformanceObserver,this.windowLocation=t.location,this.navigator=t.navigator,this.document=t.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=t.localStorage),t.perfMetrics&&t.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=t.perfMetrics.onFirstInputDelay)}return t.prototype.getUrl=function(){return this.windowLocation.href.split("?")[0]},t.prototype.mark=function(t){this.performance&&this.performance.mark&&this.performance.mark(t)},t.prototype.measure=function(t,e,n){this.performance&&this.performance.measure&&this.performance.measure(t,e,n)},t.prototype.getEntriesByType=function(t){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(t):[]},t.prototype.getEntriesByName=function(t){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(t):[]},t.prototype.getTimeOrigin=function(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)},t.prototype.requiredApisAvailable=function(){return!!(fetch&&Promise&&this.navigator&&this.navigator.cookieEnabled)},t.prototype.setupObserver=function(t,e){this.PerformanceObserver&&new this.PerformanceObserver((function(t){for(var n=0,r=t.getEntries();n<r.length;n++)e(r[n])})).observe({entryTypes:[t]})},t.getInstance=function(){return void 0===a&&(a=new t(s)),a},t}(),A=function(){function t(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}return t.prototype.getAppId=function(){var t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.appId;if(!t)throw w.create("no app id");return t},t.prototype.getProjectId=function(){var t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.projectId;if(!t)throw w.create("no project id");return t},t.prototype.getApiKey=function(){var t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.apiKey;if(!t)throw w.create("no api key");return t},t.getInstance=function(){return void 0===c&&(c=new t),c},t}();function S(){return u}var M=function(t){return t[t.UNKNOWN=0]="UNKNOWN",t[t.VISIBLE=1]="VISIBLE",t[t.HIDDEN=2]="HIDDEN",t}({}),N=["firebase_","google_","ga_"],k=new RegExp("^[a-zA-Z]\\w*$");function O(){switch(E.getInstance().document.visibilityState){case"visible":return M.VISIBLE;case"hidden":return M.HIDDEN;default:return M.UNKNOWN}}function P(){var t=E.getInstance().navigator.connection;switch(t&&t.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}var U=new l.Logger("Performance");U.logLevel=l.LogLevel.INFO;var R="0.0.1",B={loggingEnabled:!0},j="FIREBASE_INSTALLATIONS_AUTH",C="Could not fetch config, will use default configs";function L(t){if(!t)return t;var e=A.getInstance(),n=t.entries||{};return e.loggingEnabled=void 0!==n.fpr_enabled?"true"===String(n.fpr_enabled):B.loggingEnabled,n.fpr_log_source&&(e.logSource=Number(n.fpr_log_source)),n.fpr_log_endpoint_url&&(e.logEndPointUrl=n.fpr_log_endpoint_url),void 0!==n.fpr_vc_network_request_sampling_rate&&(e.networkRequestsSamplingRate=Number(n.fpr_vc_network_request_sampling_rate)),void 0!==n.fpr_vc_trace_sampling_rate&&(e.tracesSamplingRate=Number(n.fpr_vc_trace_sampling_rate)),e.logTraceAfterSampling=F(e.tracesSamplingRate),e.logNetworkAfterSampling=F(e.networkRequestsSamplingRate),t}function F(t){return Math.random()<=t}var D,q=1;function W(){var t;return q=2,D=D||(t=E.getInstance().document,new Promise((function(e){if(t&&"complete"!==t.readyState){t.addEventListener("readystatechange",(function n(){"complete"===t.readyState&&(t.removeEventListener("readystatechange",n),e())}))}else e()}))).then((function(){return(t=A.getInstance().installationsService.getId()).then((function(t){u=t})),t;var t})).then((function(t){return function(t){var e=function(){var t=E.getInstance().localStorage;if(t){var e=t.getItem(I);if(e&&Number(e)>Date.now()){var n=t.getItem(y);if(n)try{return JSON.parse(n)}catch(o){return}}}}();return e?(L(e),Promise.resolve()):function(t){return(e=A.getInstance().installationsService.getToken(),e.then((function(t){})),e).then((function(e){var n="https://firebaseremoteconfig.googleapis.com/v1/projects/"+A.getInstance().getProjectId()+"/namespaces/fireperf:fetch?key="+A.getInstance().getApiKey(),r=new Request(n,{method:"POST",headers:{Authorization:j+" "+e},body:JSON.stringify({app_instance_id:t,app_instance_id_token:e,app_id:A.getInstance().getAppId(),app_version:d,sdk_version:R})});return fetch(r).then((function(t){if(t.ok)return t.json();throw w.create("RC response not ok")}))})).catch((function(){U.info(C)}));var e}(t).then((function(t){return L(t)})).then((function(t){return function(t){var e=E.getInstance().localStorage;t&&e&&(e.setItem(y,JSON.stringify(t)),e.setItem(I,String(Date.now()+60*A.getInstance().configTimeToLive*60*1e3)))}(t)}),(function(){}))}(t)})).then((function(){return J()}),(function(){return J()}))}function J(){q=3}var V,x=3,K=[];function $(t){if(!t.eventTime||!t.message)throw w.create("invalid cc log");K=p.__spreadArrays(K,[t])}function z(t,e){V||(V=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var r=t.apply(void 0,e);$({message:r,eventTime:Date.now()})}}(G)),V(t,e)}function H(t){var e=A.getInstance();!e.instrumentationEnabled&&t.isAuto||(e.dataCollectionEnabled||t.isAuto)&&E.getInstance().requiredApisAvailable()&&(t.isAuto&&O()!==M.VISIBLE||e.loggingEnabled&&e.logTraceAfterSampling&&(3===q?Q(t):W().then((function(){return Q(t)}),(function(){return Q(t)}))))}function Q(t){S()&&setTimeout((function(){return z(t,1)}),0)}function G(t,e){return 0===e?(r={url:(n=t).url,http_method:n.httpMethod||0,http_response_code:200,response_payload_bytes:n.responsePayloadBytes,client_start_time_us:n.startTimeUs,time_to_response_initiated_us:n.timeToResponseInitiatedUs,time_to_response_completed_us:n.timeToResponseCompletedUs},i={application_info:Z(),network_request_metric:r},JSON.stringify(i)):function(t){var e={name:t.name,is_auto:t.isAuto,client_start_time_us:t.startTimeUs,duration_us:t.durationUs};0!==Object.keys(t.counters).length&&(e.counters=X(t.counters));var n=t.getAttributes();0!==Object.keys(n).length&&(e.custom_attributes=X(n));var r={application_info:Z(),trace_metric:e};return JSON.stringify(r)}(t);var n,r,i}function Z(){return{google_app_id:A.getInstance().getAppId(),app_instance_id:S(),web_app_info:{sdk_version:d,page_url:E.getInstance().getUrl(),service_worker_status:(t=E.getInstance().navigator,"serviceWorker"in t?t.serviceWorker.controller?2:3:1),visibility_state:O(),effective_connection_type:P()},application_process_state:0};var t}function X(t){return Object.keys(t).map((function(e){return{key:e,value:t[e]}}))}!function t(e){setTimeout((function(){if(0!==x){if(!K.length)return t(1e4);var e=p.__spreadArrays(K);K=[];var n=e.map((function(t){return{source_extension_json:t.message,event_time_ms:String(t.eventTime)}})),r={request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:A.getInstance().logSource,log_event:n};fetch(A.getInstance().logEndPointUrl,{method:"POST",body:JSON.stringify(r)}).then((function(t){return t.ok||U.info("Call to Firebase backend failed."),t.json()})).then((function(e){var n=Number(e.next_request_wait_millis),r=isNaN(n)?1e4:Math.max(1e4,n);x=3,t(r)})).catch((function(){K=p.__spreadArrays(e,K),U.info("Tries left: "+--x+"."),t(1e4)}))}}),e)}(5500);var Y=["_fp","_fcp","_fid"],tt=function(){function t(t,e,n){void 0===e&&(e=!1),this.name=t,this.isAuto=e,this.state=1,this.customAttributes={},this.counters={},this.api=E.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark=v+"-"+this.randomId+"-"+this.name,this.traceStopMark=_+"-"+this.randomId+"-"+this.name,this.traceMeasure=n||b+"-"+this.randomId+"-"+this.name,n&&this.calculateTraceMetrics())}return t.prototype.start=function(){if(1!==this.state)throw w.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2},t.prototype.stop=function(){if(2!==this.state)throw w.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),H(this)},t.prototype.record=function(t,e,n){if(this.durationUs=Math.floor(1e3*e),this.startTimeUs=Math.floor(1e3*t),n&&n.attributes&&(this.customAttributes=p.__assign({},n.attributes)),n&&n.metrics)for(var r=0,i=Object.keys(n.metrics);r<i.length;r++){var o=i[r];isNaN(Number(n.metrics[o]))||(this.counters[o]=Number(Math.floor(n.metrics[o])))}H(this)},t.prototype.incrementMetric=function(t,e){void 0===e&&(e=1),void 0===this.counters[t]&&this.putMetric(t,0),this.counters[t]+=e},t.prototype.putMetric=function(t,e){if(!function(t,e){return!(0===t.length||t.length>100)&&(e&&e.startsWith("_wt_")&&Y.indexOf(t)>-1||!t.startsWith("_"))}(t,this.name))throw w.create("invalide custom metric name",{customMetricName:t});this.counters[t]=e},t.prototype.getMetric=function(t){return this.counters[t]||0},t.prototype.putAttribute=function(t,e){var n=function(t){return!(0===t.length||t.length>40||N.some((function(e){return t.startsWith(e)}))||!t.match(k))}(t),r=function(t){return 0!==t.length&&t.length<=100}(e);if(n&&r)this.customAttributes[t]=e;else{if(!n)throw w.create("invalid attribute name",{attributeName:t});if(!r)throw w.create("invalid attribute value",{attributeValue:e})}},t.prototype.getAttribute=function(t){return this.customAttributes[t]},t.prototype.removeAttribute=function(t){void 0!==this.customAttributes[t]&&delete this.customAttributes[t]},t.prototype.getAttributes=function(){return p.__assign({},this.customAttributes)},t.prototype.setStartTime=function(t){this.startTimeUs=t},t.prototype.setDuration=function(t){this.durationUs=t},t.prototype.calculateTraceMetrics=function(){var t=this.api.getEntriesByName(this.traceMeasure),e=t&&t[0];e&&(this.durationUs=Math.floor(1e3*e.duration),this.startTimeUs=Math.floor(1e3*(e.startTime+this.api.getTimeOrigin())))},t.createOobTrace=function(e,n,r){var i=E.getInstance().getUrl();if(i){var o=new t("_wt_"+i,!0),a=Math.floor(1e3*E.getInstance().getTimeOrigin());if(o.setStartTime(a),e&&e[0]&&(o.setDuration(Math.floor(1e3*e[0].duration)),o.putMetric("domInteractive",Math.floor(1e3*e[0].domInteractive)),o.putMetric("domContentLoadedEventEnd",Math.floor(1e3*e[0].domContentLoadedEventEnd)),o.putMetric("loadEventEnd",Math.floor(1e3*e[0].loadEventEnd))),n){var s=n.find((function(t){return"first-paint"===t.name}));s&&s.startTime&&o.putMetric("_fp",Math.floor(1e3*s.startTime));var c=n.find((function(t){return"first-contentful-paint"===t.name}));c&&c.startTime&&o.putMetric("_fcp",Math.floor(1e3*c.startTime)),r&&o.putMetric("_fid",Math.floor(1e3*r))}H(o)}},t.createUserTimingTrace=function(e){H(new t(e,!1,e))},t}();function et(t){var e,n,r=t;if(r&&void 0!==r.responseStart){var i=E.getInstance().getTimeOrigin(),o=Math.floor(1e3*(r.startTime+i)),a=r.responseStart?Math.floor(1e3*(r.responseStart-r.startTime)):void 0,s=Math.floor(1e3*(r.responseEnd-r.startTime));e={url:r.name&&r.name.split("?")[0],responsePayloadBytes:r.transferSize,startTimeUs:o,timeToResponseInitiatedUs:a,timeToResponseCompletedUs:s},(n=A.getInstance()).instrumentationEnabled&&e.url!==n.logEndPointUrl.split("?")[0]&&n.loggingEnabled&&n.logNetworkAfterSampling&&setTimeout((function(){return z(e,0)}),0)}}var nt=5e3;function rt(){S()&&(setTimeout((function(){return function(){var t=E.getInstance(),e=t.getEntriesByType("navigation"),n=t.getEntriesByType("paint");if(t.onFirstInputDelay){var r=setTimeout((function(){tt.createOobTrace(e,n),r=void 0}),nt);t.onFirstInputDelay((function(t){r&&(clearTimeout(r),tt.createOobTrace(e,n,t))}))}else tt.createOobTrace(e,n)}()}),0),setTimeout((function(){return function(){for(var t=E.getInstance(),e=0,n=t.getEntriesByType("resource");e<n.length;e++)et(n[e]);t.setupObserver("resource",et)}()}),0),setTimeout((function(){return function(){for(var t=E.getInstance(),e=0,n=t.getEntriesByType("measure");e<n.length;e++)it(n[e]);t.setupObserver("measure",it)}()}),0))}function it(t){var e=t.name;e.substring(0,b.length)!==b&&tt.createUserTimingTrace(e)}var ot=function(){function t(t){this.app=t,E.getInstance().requiredApisAvailable()?W().then(rt,rt):U.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled.")}return t.prototype.trace=function(t){return new tt(t)},Object.defineProperty(t.prototype,"instrumentationEnabled",{get:function(){return A.getInstance().instrumentationEnabled},set:function(t){A.getInstance().instrumentationEnabled=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"dataCollectionEnabled",{get:function(){return A.getInstance().dataCollectionEnabled},set:function(t){A.getInstance().dataCollectionEnabled=t},enumerable:!0,configurable:!0}),t}(),at="[DEFAULT]";function st(t){t.INTERNAL.registerComponent(new m.Component("performance",(function(t){return function(t,e){if(t.name!==at)throw w.create("FB not default");if("undefined"==typeof window)throw w.create("no window");return function(t){s=t}(window),A.getInstance().firebaseAppInstance=t,A.getInstance().installationsService=e,new ot(t)}(t.getProvider("app").getImmediate(),t.getProvider("installations").getImmediate())}),"PUBLIC")),t.registerVersion(g,h)}st(i),e.registerPerformance=st},"yoq/":function(t,e,n){"use strict";n.r(e),n("bQlE")}}]);