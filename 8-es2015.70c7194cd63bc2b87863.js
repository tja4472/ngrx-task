(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"3TSf":function(t,e,n){"use strict";n.r(e),n.d(e,"__extends",(function(){return o})),n.d(e,"__assign",(function(){return i})),n.d(e,"__rest",(function(){return a})),n.d(e,"__decorate",(function(){return s})),n.d(e,"__param",(function(){return c})),n.d(e,"__metadata",(function(){return u})),n.d(e,"__awaiter",(function(){return f})),n.d(e,"__generator",(function(){return l})),n.d(e,"__exportStar",(function(){return p})),n.d(e,"__values",(function(){return h})),n.d(e,"__read",(function(){return d})),n.d(e,"__spread",(function(){return m})),n.d(e,"__spreadArrays",(function(){return g})),n.d(e,"__await",(function(){return v})),n.d(e,"__asyncGenerator",(function(){return _})),n.d(e,"__asyncDelegator",(function(){return y})),n.d(e,"__asyncValues",(function(){return b})),n.d(e,"__makeTemplateObject",(function(){return w})),n.d(e,"__importStar",(function(){return T})),n.d(e,"__importDefault",(function(){return I})),n.d(e,"__classPrivateFieldGet",(function(){return S})),n.d(e,"__classPrivateFieldSet",(function(){return E}));var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function o(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var i=function(){return(i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function a(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n}function s(t,e,n,r){var o,i=arguments.length,a=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,r);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(i<3?o(a):i>3?o(e,n,a):o(e,n))||a);return i>3&&a&&Object.defineProperty(e,n,a),a}function c(t,e){return function(n,r){e(n,r,t)}}function u(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}function f(t,e,n,r){return new(n||(n=Promise))((function(o,i){function a(t){try{c(r.next(t))}catch(e){i(e)}}function s(t){try{c(r.throw(t))}catch(e){i(e)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}c((r=r.apply(t,e||[])).next())}))}function l(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(s){i=[6,s],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}function p(t,e){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}function h(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function d(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(s){o={error:s}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a}function m(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(d(arguments[e]));return t}function g(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),o=0;for(e=0;e<n;e++)for(var i=arguments[e],a=0,s=i.length;a<s;a++,o++)r[o]=i[a];return r}function v(t){return this instanceof v?(this.v=t,this):new v(t)}function _(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,o=n.apply(t,e||[]),i=[];return r={},a("next"),a("throw"),a("return"),r[Symbol.asyncIterator]=function(){return this},r;function a(t){o[t]&&(r[t]=function(e){return new Promise((function(n,r){i.push([t,e,n,r])>1||s(t,e)}))})}function s(t,e){try{(n=o[t](e)).value instanceof v?Promise.resolve(n.value.v).then(c,u):f(i[0][2],n)}catch(r){f(i[0][3],r)}var n}function c(t){s("next",t)}function u(t){s("throw",t)}function f(t,e){t(e),i.shift(),i.length&&s(i[0][0],i[0][1])}}function y(t){var e,n;return e={},r("next"),r("throw",(function(t){throw t})),r("return"),e[Symbol.iterator]=function(){return this},e;function r(r,o){e[r]=t[r]?function(e){return(n=!n)?{value:v(t[r](e)),done:"return"===r}:o?o(e):e}:o}}function b(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,n=t[Symbol.asyncIterator];return n?n.call(t):(t=h(t),e={},r("next"),r("throw"),r("return"),e[Symbol.asyncIterator]=function(){return this},e);function r(n){e[n]=t[n]&&function(e){return new Promise((function(r,o){!function(t,e,n,r){Promise.resolve(r).then((function(e){t({value:e,done:n})}),e)}(r,o,(e=t[n](e)).done,e.value)}))}}}function w(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t}function T(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function I(t){return t&&t.__esModule?t:{default:t}}function S(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)}function E(t,e,n){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,n),n}},bQlE:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=(r=n("wj3C"))&&"object"==typeof r&&"default"in r?r.default:r;n("fSjL");var i,a,s,c,u=n("3TSf"),f=n("zVF4"),l=n("q/0M"),p=n("S+S0"),h=((i={})["trace started"]="Trace {$traceName} was started before.",i["trace stopped"]="Trace {$traceName} is not running.",i["no window"]="Window is not available.",i["no app id"]="App id is not available.",i["no project id"]="Project id is not available.",i["no api key"]="Api key is not available.",i["invalid cc log"]="Attempted to queue invalid cc event",i["FB not default"]="Performance can only start when Firebase app instance is the default one.",i["RC response not ok"]="RC response is not ok",i["invalid attribute name"]="Attribute name {$attributeName} is invalid.",i["invalid attribute value"]="Attribute value {$attributeValue} is invalid.",i["invalid custom metric name"]="Custom metric name {$customMetricName} is invalid",i["invalid String merger input"]="Input for String merger is invalid, contact support team to resolve.",i),d=new f.ErrorFactory("performance","Performance",h),m=function(){function t(t){if(this.window=t,!t)throw d.create("no window");this.performance=t.performance,this.PerformanceObserver=t.PerformanceObserver,this.windowLocation=t.location,this.navigator=t.navigator,this.document=t.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=t.localStorage),t.perfMetrics&&t.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=t.perfMetrics.onFirstInputDelay)}return t.prototype.getUrl=function(){return this.windowLocation.href.split("?")[0]},t.prototype.mark=function(t){this.performance&&this.performance.mark&&this.performance.mark(t)},t.prototype.measure=function(t,e,n){this.performance&&this.performance.measure&&this.performance.measure(t,e,n)},t.prototype.getEntriesByType=function(t){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(t):[]},t.prototype.getEntriesByName=function(t){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(t):[]},t.prototype.getTimeOrigin=function(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)},t.prototype.requiredApisAvailable=function(){return!!(fetch&&Promise&&this.navigator&&this.navigator.cookieEnabled)},t.prototype.setupObserver=function(t,e){this.PerformanceObserver&&new this.PerformanceObserver((function(t){for(var n=0,r=t.getEntries();n<r.length;n++)e(r[n])})).observe({entryTypes:[t]})},t.getInstance=function(){return void 0===a&&(a=new t(s)),a},t}();function g(t,e){var n=t.length-e.length;if(n<0||n>1)throw d.create("invalid String merger input");for(var r=[],o=0;o<t.length;o++)r.push(t.charAt(o)),e.length>o&&r.push(e.charAt(o));return r.join("")}var v,_=function(){function t(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=g("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=g("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.shouldSendToFl=!1,this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}return t.prototype.getAppId=function(){var t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.appId;if(!t)throw d.create("no app id");return t},t.prototype.getProjectId=function(){var t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.projectId;if(!t)throw d.create("no project id");return t},t.prototype.getApiKey=function(){var t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.apiKey;if(!t)throw d.create("no api key");return t},t.prototype.getFlTransportFullUrl=function(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)},t.getInstance=function(){return void 0===c&&(c=new t),c},t}();function y(){return v}var b=function(t){return t[t.UNKNOWN=0]="UNKNOWN",t[t.VISIBLE=1]="VISIBLE",t[t.HIDDEN=2]="HIDDEN",t}({}),w=["firebase_","google_","ga_"],T=new RegExp("^[a-zA-Z]\\w*$");function I(){switch(m.getInstance().document.visibilityState){case"visible":return b.VISIBLE;case"hidden":return b.HIDDEN;default:return b.UNKNOWN}}function S(){var t=m.getInstance().navigator.connection;switch(t&&t.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}var E=new l.Logger("Performance");function A(t,e){if(!e)return e;var n=_.getInstance(),r=e.entries||{},o=e.state;return n.loggingEnabled=void 0===r.fpr_enabled||"true"===String(r.fpr_enabled),r.fpr_log_source&&(n.logSource=Number(r.fpr_log_source)),r.fpr_log_endpoint_url&&(n.logEndPointUrl=r.fpr_log_endpoint_url),r.fpr_log_transport_key&&(n.transportKey=r.fpr_log_transport_key),n.shouldSendToFl=void 0!==o&&"INSTANCE_STATE_UNSPECIFIED"!==o&&"NO_TEMPLATE"!==o&&(!r.fpr_log_transport_web_percent||function(t,e){return 0!==t.length&&function(t){for(var e=0,n=0;n<t.length;n++)e=(e<<3)+e-t.charCodeAt(n);return Math.abs(e%100)}(t)<e}(t,Number(r.fpr_log_transport_web_percent))),void 0!==r.fpr_vc_network_request_sampling_rate&&(n.networkRequestsSamplingRate=Number(r.fpr_vc_network_request_sampling_rate)),void 0!==r.fpr_vc_trace_sampling_rate&&(n.tracesSamplingRate=Number(r.fpr_vc_trace_sampling_rate)),n.logTraceAfterSampling=O(n.tracesSamplingRate),n.logNetworkAfterSampling=O(n.networkRequestsSamplingRate),e}function O(t){return Math.random()<=t}E.logLevel=l.LogLevel.INFO;var M,N=1;function P(){var t;return N=2,M=M||(t=m.getInstance().document,new Promise((function(e){if(t&&"complete"!==t.readyState){var n=function(){"complete"===t.readyState&&(t.removeEventListener("readystatechange",n),e())};t.addEventListener("readystatechange",n)}else e()}))).then((function(){return(t=_.getInstance().installationsService.getId()).then((function(t){v=t})),t;var t})).then((function(t){return function(t){var e=function(){var t=m.getInstance().localStorage;if(t){var e=t.getItem("@firebase/performance/configexpire");if(e&&Number(e)>Date.now()){var n=t.getItem("@firebase/performance/config");if(n)try{return JSON.parse(n)}catch(i){return}}}}();return e?(A(t,e),Promise.resolve()):function(t){return(e=_.getInstance().installationsService.getToken(),e.then((function(t){})),e).then((function(e){var n="https://firebaseremoteconfig.googleapis.com/v1/projects/"+_.getInstance().getProjectId()+"/namespaces/fireperf:fetch?key="+_.getInstance().getApiKey(),r=new Request(n,{method:"POST",headers:{Authorization:"FIREBASE_INSTALLATIONS_AUTH "+e},body:JSON.stringify({app_instance_id:t,app_instance_id_token:e,app_id:_.getInstance().getAppId(),app_version:"0.3.3",sdk_version:"0.0.1"})});return fetch(r).then((function(t){if(t.ok)return t.json();throw d.create("RC response not ok")}))})).catch((function(){E.info("Could not fetch config, will use default configs")}));var e}(t).then((function(e){return A(t,e)})).then((function(t){return function(t){var e=m.getInstance().localStorage;t&&e&&(e.setItem("@firebase/performance/config",JSON.stringify(t)),e.setItem("@firebase/performance/configexpire",String(Date.now()+60*_.getInstance().configTimeToLive*60*1e3)))}(t)}),(function(){}))}(t)})).then((function(){return k()}),(function(){return k()}))}function k(){N=3}var R,j=3,U=[],F=!1;function C(t){if(!t.eventTime||!t.message)throw d.create("invalid cc log");U=u.__spreadArrays(U,[t])}function B(t,e){R||(R=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var r=t.apply(void 0,e);C({message:r,eventTime:Date.now()})}}(D)),R(t,e)}function x(t){var e=_.getInstance();!e.instrumentationEnabled&&t.isAuto||(e.dataCollectionEnabled||t.isAuto)&&m.getInstance().requiredApisAvailable()&&(t.isAuto&&I()!==b.VISIBLE||e.loggingEnabled&&e.logTraceAfterSampling&&(3===N?L(t):P().then((function(){return L(t)}),(function(){return L(t)}))))}function L(t){y()&&setTimeout((function(){return B(t,1)}),0)}function D(t,e){return 0===e?(r={url:(n=t).url,http_method:n.httpMethod||0,http_response_code:200,response_payload_bytes:n.responsePayloadBytes,client_start_time_us:n.startTimeUs,time_to_response_initiated_us:n.timeToResponseInitiatedUs,time_to_response_completed_us:n.timeToResponseCompletedUs},o={application_info:q(),network_request_metric:r},JSON.stringify(o)):function(t){var e={name:t.name,is_auto:t.isAuto,client_start_time_us:t.startTimeUs,duration_us:t.durationUs};0!==Object.keys(t.counters).length&&(e.counters=t.counters);var n=t.getAttributes();0!==Object.keys(n).length&&(e.custom_attributes=n);var r={application_info:q(),trace_metric:e};return JSON.stringify(r)}(t);var n,r,o}function q(){return{google_app_id:_.getInstance().getAppId(),app_instance_id:y(),web_app_info:{sdk_version:"0.3.3",page_url:m.getInstance().getUrl(),service_worker_status:(t=m.getInstance().navigator,"serviceWorker"in t?t.serviceWorker.controller?2:3:1),visibility_state:I(),effective_connection_type:S()},application_process_state:0};var t}var V=["_fp","_fcp","_fid"],W=function(){function t(t,e,n){void 0===e&&(e=!1),this.name=t,this.isAuto=e,this.state=1,this.customAttributes={},this.counters={},this.api=m.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark="FB-PERF-TRACE-START-"+this.randomId+"-"+this.name,this.traceStopMark="FB-PERF-TRACE-STOP-"+this.randomId+"-"+this.name,this.traceMeasure=n||"FB-PERF-TRACE-MEASURE-"+this.randomId+"-"+this.name,n&&this.calculateTraceMetrics())}return t.prototype.start=function(){if(1!==this.state)throw d.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2},t.prototype.stop=function(){if(2!==this.state)throw d.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),x(this)},t.prototype.record=function(t,e,n){if(this.durationUs=Math.floor(1e3*e),this.startTimeUs=Math.floor(1e3*t),n&&n.attributes&&(this.customAttributes=u.__assign({},n.attributes)),n&&n.metrics)for(var r=0,o=Object.keys(n.metrics);r<o.length;r++){var i=o[r];isNaN(Number(n.metrics[i]))||(this.counters[i]=Number(Math.floor(n.metrics[i])))}x(this)},t.prototype.incrementMetric=function(t,e){void 0===e&&(e=1),void 0===this.counters[t]&&this.putMetric(t,0),this.counters[t]+=e},t.prototype.putMetric=function(t,e){if(r=this.name,0===(n=t).length||n.length>100||!(r&&r.startsWith("_wt_")&&V.indexOf(n)>-1)&&n.startsWith("_"))throw d.create("invalid custom metric name",{customMetricName:t});var n,r;this.counters[t]=e},t.prototype.getMetric=function(t){return this.counters[t]||0},t.prototype.putAttribute=function(t,e){var n,r=!(0===(n=t).length||n.length>40||w.some((function(t){return n.startsWith(t)}))||!n.match(T)),o=function(t){return 0!==t.length&&t.length<=100}(e);if(r&&o)this.customAttributes[t]=e;else{if(!r)throw d.create("invalid attribute name",{attributeName:t});if(!o)throw d.create("invalid attribute value",{attributeValue:e})}},t.prototype.getAttribute=function(t){return this.customAttributes[t]},t.prototype.removeAttribute=function(t){void 0!==this.customAttributes[t]&&delete this.customAttributes[t]},t.prototype.getAttributes=function(){return u.__assign({},this.customAttributes)},t.prototype.setStartTime=function(t){this.startTimeUs=t},t.prototype.setDuration=function(t){this.durationUs=t},t.prototype.calculateTraceMetrics=function(){var t=this.api.getEntriesByName(this.traceMeasure),e=t&&t[0];e&&(this.durationUs=Math.floor(1e3*e.duration),this.startTimeUs=Math.floor(1e3*(e.startTime+this.api.getTimeOrigin())))},t.createOobTrace=function(e,n,r){var o=m.getInstance().getUrl();if(o){var i=new t("_wt_"+o,!0),a=Math.floor(1e3*m.getInstance().getTimeOrigin());if(i.setStartTime(a),e&&e[0]&&(i.setDuration(Math.floor(1e3*e[0].duration)),i.putMetric("domInteractive",Math.floor(1e3*e[0].domInteractive)),i.putMetric("domContentLoadedEventEnd",Math.floor(1e3*e[0].domContentLoadedEventEnd)),i.putMetric("loadEventEnd",Math.floor(1e3*e[0].loadEventEnd))),n){var s=n.find((function(t){return"first-paint"===t.name}));s&&s.startTime&&i.putMetric("_fp",Math.floor(1e3*s.startTime));var c=n.find((function(t){return"first-contentful-paint"===t.name}));c&&c.startTime&&i.putMetric("_fcp",Math.floor(1e3*c.startTime)),r&&i.putMetric("_fid",Math.floor(1e3*r))}x(i)}},t.createUserTimingTrace=function(e){x(new t(e,!1,e))},t}();function J(t){var e=t;if(e&&void 0!==e.responseStart){var n=m.getInstance().getTimeOrigin(),r=Math.floor(1e3*(e.startTime+n)),o=e.responseStart?Math.floor(1e3*(e.responseStart-e.startTime)):void 0,i=Math.floor(1e3*(e.responseEnd-e.startTime));!function(t){var e=_.getInstance();if(e.instrumentationEnabled){var n=t.url,r=e.logEndPointUrl.split("?")[0],o=e.flTransportEndpointUrl.split("?")[0];n!==r&&n!==o&&e.loggingEnabled&&e.logNetworkAfterSampling&&setTimeout((function(){return B(t,0)}),0)}}({url:e.name&&e.name.split("?")[0],responsePayloadBytes:e.transferSize,startTimeUs:r,timeToResponseInitiatedUs:o,timeToResponseCompletedUs:i})}}function K(){y()&&(setTimeout((function(){return function(){var t=m.getInstance(),e=t.getEntriesByType("navigation"),n=t.getEntriesByType("paint");if(t.onFirstInputDelay){var r=setTimeout((function(){W.createOobTrace(e,n),r=void 0}),5e3);t.onFirstInputDelay((function(t){r&&(clearTimeout(r),W.createOobTrace(e,n,t))}))}else W.createOobTrace(e,n)}()}),0),setTimeout((function(){return function(){for(var t=m.getInstance(),e=0,n=t.getEntriesByType("resource");e<n.length;e++)J(n[e]);t.setupObserver("resource",J)}()}),0),setTimeout((function(){return function(){for(var t=m.getInstance(),e=0,n=t.getEntriesByType("measure");e<n.length;e++)$(n[e]);t.setupObserver("measure",$)}()}),0))}function $(t){var e=t.name;"FB-PERF-TRACE-MEASURE"!==e.substring(0,"FB-PERF-TRACE-MEASURE".length)&&W.createUserTimingTrace(e)}var z=function(){function t(t){this.app=t,m.getInstance().requiredApisAvailable()?(F||(function t(e){setTimeout((function(){if(0!==j)return U.length?void function(){var e=u.__spreadArrays(U);U=[];var n=e.map((function(t){return{source_extension_json_proto3:t.message,event_time_ms:String(t.eventTime)}}));(function(e,n){return _.getInstance().shouldSendToFl?function(e,n){return function(t){var e=_.getInstance().getFlTransportFullUrl();return fetch(e,{method:"POST",body:JSON.stringify(t)})}(e).then((function(t){return t.ok||E.info("Call to Firebase backend failed."),t.json()})).then((function(e){var r=Number(e.nextRequestWaitMillis),o=1e4;isNaN(r)||(o=Math.max(r,o));var i=e.logResponseDetails;Array.isArray(i)&&i.length>0&&"RETRY_REQUEST_LATER"===i[0].responseAction&&(U=u.__spreadArrays(n,U),E.info("Retry transport request later.")),j=3,t(o)}))}(e,n):function(e){return fetch(_.getInstance().logEndPointUrl,{method:"POST",body:JSON.stringify(e)}).then((function(t){return t.ok||E.info("Call to Firebase backend failed."),t.json()})).then((function(e){var n=Number(e.next_request_wait_millis),r=isNaN(n)?1e4:Math.max(1e4,n);j=3,t(r)}))}(e)})({request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:_.getInstance().logSource,log_event:n},e).catch((function(){U=u.__spreadArrays(e,U),j--,E.info("Tries left: "+j+"."),t(1e4)}))}():t(1e4)}),e)}(5500),F=!0),P().then(K,K)):E.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled.")}return t.prototype.trace=function(t){return new W(t)},Object.defineProperty(t.prototype,"instrumentationEnabled",{get:function(){return _.getInstance().instrumentationEnabled},set:function(t){_.getInstance().instrumentationEnabled=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"dataCollectionEnabled",{get:function(){return _.getInstance().dataCollectionEnabled},set:function(t){_.getInstance().dataCollectionEnabled=t},enumerable:!0,configurable:!0}),t}();function G(t){t.INTERNAL.registerComponent(new p.Component("performance",(function(t){return function(t,e){if("[DEFAULT]"!==t.name)throw d.create("FB not default");if("undefined"==typeof window)throw d.create("no window");return function(t){s=t}(window),_.getInstance().firebaseAppInstance=t,_.getInstance().installationsService=e,new z(t)}(t.getProvider("app").getImmediate(),t.getProvider("installations").getImmediate())}),"PUBLIC")),t.registerVersion("@firebase/performance","0.3.3")}G(o),e.registerPerformance=G},"yoq/":function(t,e,n){"use strict";n.r(e),n("bQlE")}}]);