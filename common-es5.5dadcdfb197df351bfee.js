function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{DKe4:function(e,t,n){"use strict";var r=n("kt0X"),c=n("lJxs"),i=n("pLZG"),a=n("XqQ8"),o=n("IzEk"),u=n("YY+H"),s=Object(r.createSelector)(u.b,(function(e){return e.auth})),l=Object(r.createSelector)(s,(function(e){return e.hasChecked})),f=Object(r.createSelector)(s,(function(e){return null!==e.userId})),h=n("fXoL"),p=n("N/25"),b=n("aECQ"),j=n("tyNb");n.d(t,"a",(function(){return d}));var v,d=((v=function(){function e(t,n,r,c){_classCallCheck(this,e),this.authService=t,this.auth$=n,this.store=r,this.router=c}return _createClass(e,[{key:"canActivate",value:function(e,t){var n=this;return this.authService.redirectUrl=t.url,this.checkStoreAuthentication().pipe(Object(c.a)((function(e){return!!e||n.router.parseUrl("/sign-in")})))}},{key:"checkStoreAuthentication",value:function(){var e=this;return this.store.pipe(Object(r.select)(l),Object(i.a)((function(e){return e})),Object(a.a)((function(){return e.store.pipe(Object(r.select)(f),Object(o.a)(1))})))}}]),e}()).\u0275fac=function(e){return new(e||v)(h["\u0275\u0275inject"](p.a),h["\u0275\u0275inject"](b.a),h["\u0275\u0275inject"](r.Store),h["\u0275\u0275inject"](j.g))},v.\u0275prov=h["\u0275\u0275defineInjectable"]({token:v,factory:v.\u0275fac,providedIn:"root"}),v)}}]);