function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{DKe4:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var r,c,i=n("kt0X"),o=n("lJxs"),a=n("pLZG"),u=n("XqQ8"),s=n("IzEk"),f=n("cYkf"),l=n("/VzD"),p=n("fXoL"),d=((c=function e(){_classCallCheck(this,e),this.redirectUrl=""}).\u0275fac=function(e){return new(e||c)},c.\u0275prov=p["\u0275\u0275defineInjectable"]({token:c,factory:c.\u0275fac,providedIn:"root"}),c),b=((r=function(){function e(t,n){_classCallCheck(this,e),this.authService=t,this.store=n}return _createClass(e,[{key:"canActivate",value:function(e,t){var n=this;return this.authService.redirectUrl=t.url,this.checkStoreAuthentication().pipe(Object(o.a)((function(e){return!!e||(n.store.dispatch(l.c.navigateToSignIn({requestedUrl:t.url})),!1)})))}},{key:"checkStoreAuthentication",value:function(){var e=this;return this.store.pipe(Object(i.select)(f.a),Object(a.a)((function(e){return e})),Object(u.a)((function(){return e.store.pipe(Object(i.select)(f.b),Object(s.a)(1))})))}}]),e}()).\u0275fac=function(e){return new(e||r)(p["\u0275\u0275inject"](d),p["\u0275\u0275inject"](i.Store))},r.\u0275prov=p["\u0275\u0275defineInjectable"]({token:r,factory:r.\u0275fac,providedIn:"root"}),r)},xSum:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return c}));var r={};n.r(r),n.d(r,"selectSignInPageError",(function(){return u})),n.d(r,"selectSignInPagePending",(function(){return s}));var c={};n.r(c),n.d(c,"selectSignUpPageError",(function(){return l})),n.d(c,"selectSignUpPagePending",(function(){return p}));var i=n("kt0X"),o=n("YY+H"),a=Object(i.createSelector)(o.c,(function(e){return e.signInPage})),u=Object(i.createSelector)(a,(function(e){return e.error})),s=Object(i.createSelector)(a,(function(e){return e.pending})),f=Object(i.createSelector)(o.c,(function(e){return e.signUpPage})),l=Object(i.createSelector)(f,(function(e){return e.error})),p=Object(i.createSelector)(f,(function(e){return e.pending}))}}]);