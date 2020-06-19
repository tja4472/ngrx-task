(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{bQlE:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=(r=n("wj3C"))&&"object"==typeof r&&"default"in r?r.default:r;n("fSjL");var o,a,s,c,u=n("mrSG"),p=n("zVF4"),f=n("q/0M"),l=n("S+S0"),g=((o={})["trace started"]="Trace {$traceName} was started before.",o["trace stopped"]="Trace {$traceName} is not running.",o["no window"]="Window is not available.",o["no app id"]="App id is not available.",o["no project id"]="Project id is not available.",o["no api key"]="Api key is not available.",o["invalid cc log"]="Attempted to queue invalid cc event",o["FB not default"]="Performance can only start when Firebase app instance is the default one.",o["RC response not ok"]="RC response is not ok",o["invalid attribute name"]="Attribute name {$attributeName} is invalid.",o["invalid attribute value"]="Attribute value {$attributeValue} is invalid.",o["invalid custom metric name"]="Custom metric name {$customMetricName} is invalid",o["invalid String merger input"]="Input for String merger is invalid, contact support team to resolve.",o),m=new p.ErrorFactory("performance","Performance",g),h=function(){function t(t){if(this.window=t,!t)throw m.create("no window");this.performance=t.performance,this.PerformanceObserver=t.PerformanceObserver,this.windowLocation=t.location,this.navigator=t.navigator,this.document=t.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=t.localStorage),t.perfMetrics&&t.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=t.perfMetrics.onFirstInputDelay)}return t.prototype.getUrl=function(){return this.windowLocation.href.split("?")[0]},t.prototype.mark=function(t){this.performance&&this.performance.mark&&this.performance.mark(t)},t.prototype.measure=function(t,e,n){this.performance&&this.performance.measure&&this.performance.measure(t,e,n)},t.prototype.getEntriesByType=function(t){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(t):[]},t.prototype.getEntriesByName=function(t){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(t):[]},t.prototype.getTimeOrigin=function(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)},t.prototype.requiredApisAvailable=function(){return!!(fetch&&Promise&&this.navigator&&this.navigator.cookieEnabled)},t.prototype.setupObserver=function(t,e){this.PerformanceObserver&&new this.PerformanceObserver((function(t){for(var n=0,r=t.getEntries();n<r.length;n++)e(r[n])})).observe({entryTypes:[t]})},t.getInstance=function(){return void 0===a&&(a=new t(s)),a},t}();function d(t,e){var n=t.length-e.length;if(n<0||n>1)throw m.create("invalid String merger input");for(var r=[],i=0;i<t.length;i++)r.push(t.charAt(i)),e.length>i&&r.push(e.charAt(i));return r.join("")}var v,_=function(){function t(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=d("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=d("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}return t.prototype.getAppId=function(){var t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.appId;if(!t)throw m.create("no app id");return t},t.prototype.getProjectId=function(){var t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.projectId;if(!t)throw m.create("no project id");return t},t.prototype.getApiKey=function(){var t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.apiKey;if(!t)throw m.create("no api key");return t},t.prototype.getFlTransportFullUrl=function(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)},t.getInstance=function(){return void 0===c&&(c=new t),c},t}();function b(){return v}var y=function(t){return t[t.UNKNOWN=0]="UNKNOWN",t[t.VISIBLE=1]="VISIBLE",t[t.HIDDEN=2]="HIDDEN",t}({}),I=["firebase_","google_","ga_"],T=new RegExp("^[a-zA-Z]\\w*$");function E(){switch(h.getInstance().document.visibilityState){case"visible":return y.VISIBLE;case"hidden":return y.HIDDEN;default:return y.UNKNOWN}}function A(){var t=h.getInstance().navigator.connection;switch(t&&t.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}var w=new f.Logger("Performance");function S(t){if(!t)return t;var e=_.getInstance(),n=t.entries||{};return e.loggingEnabled=void 0===n.fpr_enabled||"true"===String(n.fpr_enabled),n.fpr_log_source&&(e.logSource=Number(n.fpr_log_source)),n.fpr_log_endpoint_url&&(e.logEndPointUrl=n.fpr_log_endpoint_url),n.fpr_log_transport_key&&(e.transportKey=n.fpr_log_transport_key),void 0!==n.fpr_vc_network_request_sampling_rate&&(e.networkRequestsSamplingRate=Number(n.fpr_vc_network_request_sampling_rate)),void 0!==n.fpr_vc_trace_sampling_rate&&(e.tracesSamplingRate=Number(n.fpr_vc_trace_sampling_rate)),e.logTraceAfterSampling=M(e.tracesSamplingRate),e.logNetworkAfterSampling=M(e.networkRequestsSamplingRate),t}function M(t){return Math.random()<=t}w.logLevel=f.LogLevel.INFO;var k,N=1;function R(){var t;return N=2,k=k||(t=h.getInstance().document,new Promise((function(e){if(t&&"complete"!==t.readyState){var n=function(){"complete"===t.readyState&&(t.removeEventListener("readystatechange",n),e())};t.addEventListener("readystatechange",n)}else e()}))).then((function(){return(t=_.getInstance().installationsService.getId()).then((function(t){v=t})),t;var t})).then((function(t){return function(t){var e=function(){var t=h.getInstance().localStorage;if(t){var e=t.getItem("@firebase/performance/configexpire");if(e&&Number(e)>Date.now()){var n=t.getItem("@firebase/performance/config");if(n)try{return JSON.parse(n)}catch(o){return}}}}();return e?(S(e),Promise.resolve()):function(t){return(e=_.getInstance().installationsService.getToken(),e.then((function(t){})),e).then((function(e){var n="https://firebaseremoteconfig.googleapis.com/v1/projects/"+_.getInstance().getProjectId()+"/namespaces/fireperf:fetch?key="+_.getInstance().getApiKey(),r=new Request(n,{method:"POST",headers:{Authorization:"FIREBASE_INSTALLATIONS_AUTH "+e},body:JSON.stringify({app_instance_id:t,app_instance_id_token:e,app_id:_.getInstance().getAppId(),app_version:"0.3.7",sdk_version:"0.0.1"})});return fetch(r).then((function(t){if(t.ok)return t.json();throw m.create("RC response not ok")}))})).catch((function(){w.info("Could not fetch config, will use default configs")}));var e}(t).then(S).then((function(t){return function(t){var e=h.getInstance().localStorage;t&&e&&(e.setItem("@firebase/performance/config",JSON.stringify(t)),e.setItem("@firebase/performance/configexpire",String(Date.now()+60*_.getInstance().configTimeToLive*60*1e3)))}(t)}),(function(){}))}(t)})).then((function(){return O()}),(function(){return O()}))}function O(){N=3}var U,P=3,F=[],B=!1;function C(t){if(!t.eventTime||!t.message)throw m.create("invalid cc log");F=u.__spreadArrays(F,[t])}function L(t,e){U||(U=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var r=t.apply(void 0,e);C({message:r,eventTime:Date.now()})}}(q)),U(t,e)}function j(t){var e=_.getInstance();!e.instrumentationEnabled&&t.isAuto||(e.dataCollectionEnabled||t.isAuto)&&h.getInstance().requiredApisAvailable()&&(t.isAuto&&E()!==y.VISIBLE||e.loggingEnabled&&e.logTraceAfterSampling&&(3===N?D(t):R().then((function(){return D(t)}),(function(){return D(t)}))))}function D(t){b()&&setTimeout((function(){return L(t,1)}),0)}function q(t,e){return 0===e?(r={url:(n=t).url,http_method:n.httpMethod||0,http_response_code:200,response_payload_bytes:n.responsePayloadBytes,client_start_time_us:n.startTimeUs,time_to_response_initiated_us:n.timeToResponseInitiatedUs,time_to_response_completed_us:n.timeToResponseCompletedUs},i={application_info:V(),network_request_metric:r},JSON.stringify(i)):function(t){var e={name:t.name,is_auto:t.isAuto,client_start_time_us:t.startTimeUs,duration_us:t.durationUs};0!==Object.keys(t.counters).length&&(e.counters=t.counters);var n=t.getAttributes();0!==Object.keys(n).length&&(e.custom_attributes=n);var r={application_info:V(),trace_metric:e};return JSON.stringify(r)}(t);var n,r,i}function V(){return{google_app_id:_.getInstance().getAppId(),app_instance_id:b(),web_app_info:{sdk_version:"0.3.7",page_url:h.getInstance().getUrl(),service_worker_status:(t=h.getInstance().navigator,"serviceWorker"in t?t.serviceWorker.controller?2:3:1),visibility_state:E(),effective_connection_type:A()},application_process_state:0};var t}var W=["_fp","_fcp","_fid"],K=function(){function t(t,e,n){void 0===e&&(e=!1),this.name=t,this.isAuto=e,this.state=1,this.customAttributes={},this.counters={},this.api=h.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark="FB-PERF-TRACE-START-"+this.randomId+"-"+this.name,this.traceStopMark="FB-PERF-TRACE-STOP-"+this.randomId+"-"+this.name,this.traceMeasure=n||"FB-PERF-TRACE-MEASURE-"+this.randomId+"-"+this.name,n&&this.calculateTraceMetrics())}return t.prototype.start=function(){if(1!==this.state)throw m.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2},t.prototype.stop=function(){if(2!==this.state)throw m.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),j(this)},t.prototype.record=function(t,e,n){if(this.durationUs=Math.floor(1e3*e),this.startTimeUs=Math.floor(1e3*t),n&&n.attributes&&(this.customAttributes=u.__assign({},n.attributes)),n&&n.metrics)for(var r=0,i=Object.keys(n.metrics);r<i.length;r++){var o=i[r];isNaN(Number(n.metrics[o]))||(this.counters[o]=Number(Math.floor(n.metrics[o])))}j(this)},t.prototype.incrementMetric=function(t,e){void 0===e&&(e=1),void 0===this.counters[t]&&this.putMetric(t,0),this.counters[t]+=e},t.prototype.putMetric=function(t,e){if(r=this.name,0===(n=t).length||n.length>100||!(r&&r.startsWith("_wt_")&&W.indexOf(n)>-1)&&n.startsWith("_"))throw m.create("invalid custom metric name",{customMetricName:t});var n,r;this.counters[t]=e},t.prototype.getMetric=function(t){return this.counters[t]||0},t.prototype.putAttribute=function(t,e){var n,r=!(0===(n=t).length||n.length>40||I.some((function(t){return n.startsWith(t)}))||!n.match(T)),i=function(t){return 0!==t.length&&t.length<=100}(e);if(r&&i)this.customAttributes[t]=e;else{if(!r)throw m.create("invalid attribute name",{attributeName:t});if(!i)throw m.create("invalid attribute value",{attributeValue:e})}},t.prototype.getAttribute=function(t){return this.customAttributes[t]},t.prototype.removeAttribute=function(t){void 0!==this.customAttributes[t]&&delete this.customAttributes[t]},t.prototype.getAttributes=function(){return u.__assign({},this.customAttributes)},t.prototype.setStartTime=function(t){this.startTimeUs=t},t.prototype.setDuration=function(t){this.durationUs=t},t.prototype.calculateTraceMetrics=function(){var t=this.api.getEntriesByName(this.traceMeasure),e=t&&t[0];e&&(this.durationUs=Math.floor(1e3*e.duration),this.startTimeUs=Math.floor(1e3*(e.startTime+this.api.getTimeOrigin())))},t.createOobTrace=function(e,n,r){var i=h.getInstance().getUrl();if(i){var o=new t("_wt_"+i,!0),a=Math.floor(1e3*h.getInstance().getTimeOrigin());if(o.setStartTime(a),e&&e[0]&&(o.setDuration(Math.floor(1e3*e[0].duration)),o.putMetric("domInteractive",Math.floor(1e3*e[0].domInteractive)),o.putMetric("domContentLoadedEventEnd",Math.floor(1e3*e[0].domContentLoadedEventEnd)),o.putMetric("loadEventEnd",Math.floor(1e3*e[0].loadEventEnd))),n){var s=n.find((function(t){return"first-paint"===t.name}));s&&s.startTime&&o.putMetric("_fp",Math.floor(1e3*s.startTime));var c=n.find((function(t){return"first-contentful-paint"===t.name}));c&&c.startTime&&o.putMetric("_fcp",Math.floor(1e3*c.startTime)),r&&o.putMetric("_fid",Math.floor(1e3*r))}j(o)}},t.createUserTimingTrace=function(e){j(new t(e,!1,e))},t}();function x(t){var e=t;if(e&&void 0!==e.responseStart){var n=h.getInstance().getTimeOrigin(),r=Math.floor(1e3*(e.startTime+n)),i=e.responseStart?Math.floor(1e3*(e.responseStart-e.startTime)):void 0,o=Math.floor(1e3*(e.responseEnd-e.startTime));!function(t){var e=_.getInstance();if(e.instrumentationEnabled){var n=t.url,r=e.logEndPointUrl.split("?")[0],i=e.flTransportEndpointUrl.split("?")[0];n!==r&&n!==i&&e.loggingEnabled&&e.logNetworkAfterSampling&&setTimeout((function(){return L(t,0)}),0)}}({url:e.name&&e.name.split("?")[0],responsePayloadBytes:e.transferSize,startTimeUs:r,timeToResponseInitiatedUs:i,timeToResponseCompletedUs:o})}}function J(){b()&&(setTimeout((function(){return function(){var t=h.getInstance(),e=t.getEntriesByType("navigation"),n=t.getEntriesByType("paint");if(t.onFirstInputDelay){var r=setTimeout((function(){K.createOobTrace(e,n),r=void 0}),5e3);t.onFirstInputDelay((function(t){r&&(clearTimeout(r),K.createOobTrace(e,n,t))}))}else K.createOobTrace(e,n)}()}),0),setTimeout((function(){return function(){for(var t=h.getInstance(),e=0,n=t.getEntriesByType("resource");e<n.length;e++)x(n[e]);t.setupObserver("resource",x)}()}),0),setTimeout((function(){return function(){for(var t=h.getInstance(),e=0,n=t.getEntriesByType("measure");e<n.length;e++)$(n[e]);t.setupObserver("measure",$)}()}),0))}function $(t){var e=t.name;"FB-PERF-TRACE-MEASURE"!==e.substring(0,"FB-PERF-TRACE-MEASURE".length)&&K.createUserTimingTrace(e)}var z=function(){function t(t){this.app=t,h.getInstance().requiredApisAvailable()?(B||(function t(e){setTimeout((function(){if(0!==P)return F.length?void function(){var e=u.__spreadArrays(F);F=[];var n=e.map((function(t){return{source_extension_json_proto3:t.message,event_time_ms:String(t.eventTime)}}));(function(e,n){return function(t){var e=_.getInstance().getFlTransportFullUrl();return fetch(e,{method:"POST",body:JSON.stringify(t)})}(e).then((function(t){return t.ok||w.info("Call to Firebase backend failed."),t.json()})).then((function(e){var r=Number(e.nextRequestWaitMillis),i=1e4;isNaN(r)||(i=Math.max(r,i));var o=e.logResponseDetails;Array.isArray(o)&&o.length>0&&"RETRY_REQUEST_LATER"===o[0].responseAction&&(F=u.__spreadArrays(n,F),w.info("Retry transport request later.")),P=3,t(i)}))})({request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:_.getInstance().logSource,log_event:n},e).catch((function(){F=u.__spreadArrays(e,F),P--,w.info("Tries left: "+P+"."),t(1e4)}))}():t(1e4)}),e)}(5500),B=!0),R().then(J,J)):w.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled.")}return t.prototype.trace=function(t){return new K(t)},Object.defineProperty(t.prototype,"instrumentationEnabled",{get:function(){return _.getInstance().instrumentationEnabled},set:function(t){_.getInstance().instrumentationEnabled=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"dataCollectionEnabled",{get:function(){return _.getInstance().dataCollectionEnabled},set:function(t){_.getInstance().dataCollectionEnabled=t},enumerable:!0,configurable:!0}),t}();function H(t){t.INTERNAL.registerComponent(new l.Component("performance",(function(t){return function(t,e){if("[DEFAULT]"!==t.name)throw m.create("FB not default");if("undefined"==typeof window)throw m.create("no window");return function(t){s=t}(window),_.getInstance().firebaseAppInstance=t,_.getInstance().installationsService=e,new z(t)}(t.getProvider("app").getImmediate(),t.getProvider("installations").getImmediate())}),"PUBLIC")),t.registerVersion("@firebase/performance","0.3.7")}H(i),e.registerPerformance=H},"yoq/":function(t,e,n){"use strict";n.r(e),n("bQlE")}}]);