(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"/cxq":function(l,n,e){"use strict";e.r(n);var t=e("8Y7J"),a=e("s7LF");class o{constructor(l){this.formBuilder=l}init(l){this.initialData=Object.assign({},l),this.form=this.formBuilder.group({name:[this.initialData.name,a.q.required],description:[this.initialData.description],isComplete:[this.initialData.isComplete]})}checkout(){const l=Object.assign({},this.initialData,this.form.value);return this.form.reset(),l}}class u{constructor(l){this.presenter=l,this.cancel=new t.m,this.remove=new t.m,this.checkout=new t.m}get checkoutForm(){return this.presenter.form}ngOnInit(){this.presenter.init(this.completedTask)}cancelClick(){this.cancel.emit(this.completedTask)}removeClick(){this.remove.emit(this.completedTask)}onSubmit(){const l=this.presenter.checkout();this.checkout.emit(l)}}class i{constructor(){this.query="",this.toggleCompleteItem=new t.m,this.search=new t.m}ngOnInit(){this.searchText=new a.f(this.query)}viewClearSearch(){this.searchText.setValue(""),this.search.emit("")}viewTrackBy(l,n){return n.id}}var r=e("DQLy"),c=e("E7rW"),b=e("9Odd");class d{constructor(l){this.store=l,this.task$=l.pipe(Object(r.D)(b.b.selectCompletedTaskFromRoute))}ngOnInit(){}viewCancelled(l){this.store.dispatch(c.a.cancelled({completedTask:l}))}viewRemoved(l){this.store.dispatch(c.a.removed({completedTask:l}))}viewSaved(l){this.store.dispatch(c.a.saved({completedTask:l}))}}var s=e("IzEk");class m{constructor(l){this.store=l,this.viewSearchQuery$=l.pipe(Object(r.D)(b.b.selectCompletedTasksQuery),Object(s.a)(1)),this.completedTasks$=l.pipe(Object(r.D)(b.b.selectCompletedTasksQueried))}ngOnDestroy(){}ngOnInit(){}viewSearch(l){this.store.dispatch(c.b.search({query:l}))}toggleCompleteItem(l){this.store.dispatch(c.b.itemToggled({todoCompleted:l}))}}class p{constructor(l){this.store=l}ngOnDestroy(){this.store.dispatch(c.c.destroyed())}ngOnInit(){}}class h{}var f=e("xYTU"),g=e("t68o"),E=e("pMnS"),C=e("iInd"),_=t.qb({encapsulation:0,styles:[["[_nghost-%COMP%]{background-color:red;display:flex;flex-grow:1;flex-direction:column}"]],data:{}});function k(l){return t.Nb(2,[(l()(),t.sb(0,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),t.rb(1,212992,null,0,C.s,[C.b,t.O,t.j,[8,null],t.h],null,null)],(function(l,n){l(n,1,0)}),null)}function v(l){return t.Nb(0,[(l()(),t.sb(0,0,null,null,1,"app-completed-tasks-root",[],null,null,null,k,_)),t.rb(1,245760,null,0,p,[r.o],null,null)],(function(l,n){l(n,1,0)}),null)}var w=t.ob("app-completed-tasks-root",p,v,{},{},[]),x=e("Z5h4"),y=e("r0V8"),O=e("5GAg"),S=e("omvX"),F=e("SVse"),I=e("dJrM"),M=e("HsOI"),T=e("Xd0L"),L=e("IP0z"),P=e("/HVE"),q=e("Mr+X"),j=e("Gi4r"),J=e("ZwOa"),N=e("oapL"),D=e("bujt"),z=e("Fwaw"),A=t.qb({encapsulation:0,styles:[["[_nghost-%COMP%]{background-color:green;display:flex;flex-grow:1;flex-direction:column}.cdk-drag-preview[_ngcontent-%COMP%]{border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drop-dragging[_ngcontent-%COMP%]   .cdk-drag[_ngcontent-%COMP%]{transition:transform 250ms cubic-bezier(0,0,.2,1);background-color:#00f}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .3s cubic-bezier(0,0,.2,1)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.list[_ngcontent-%COMP%]{flex-grow:1;flex-basis:0px;overflow-y:scroll;display:flex;flex-direction:column}.list-item[_ngcontent-%COMP%]{display:flex;flex-wrap:nowrap;padding:10px;border-bottom:1px solid #ccc;box-sizing:border-box;background:#fff}mat-checkbox[_ngcontent-%COMP%]{padding-right:10px}.drag-icon[_ngcontent-%COMP%]{cursor:move}.name[_ngcontent-%COMP%]{color:#000;font-size:medium}.description[_ngcontent-%COMP%]{color:gray;font-size:small;white-space:pre-line}.middle[_ngcontent-%COMP%]{flex-grow:1;padding-right:10px}.line-through[_ngcontent-%COMP%]{-webkit-text-decoration-line:line-through;text-decoration-line:line-through}a[_ngcontent-%COMP%]{text-decoration:none;display:flex;flex-wrap:nowrap;flex-grow:1}.fab-bottom-right[_ngcontent-%COMP%]{position:fixed;right:60px;bottom:16px;z-index:100}.zzzzzzzz[_ngcontent-%COMP%]{position:fixed;right:60px;top:0;z-index:100}"]],data:{}});function R(l){return t.Nb(0,[(l()(),t.sb(0,0,null,null,15,"div",[],null,null,null,null,null)),(l()(),t.sb(1,0,null,null,14,"div",[["class","list-item"]],null,null,null,null,null)),(l()(),t.sb(2,0,null,null,2,"mat-checkbox",[["class","mat-checkbox"]],[[8,"id",0],[1,"tabindex",0],[2,"mat-checkbox-indeterminate",null],[2,"mat-checkbox-checked",null],[2,"mat-checkbox-disabled",null],[2,"mat-checkbox-label-before",null],[2,"_mat-animation-noopable",null]],[[null,"change"]],(function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.toggleCompleteItem.emit(l.context.$implicit)&&t),t}),x.b,x.a)),t.Ib(5120,null,a.k,(function(l){return[l]}),[y.b]),t.rb(4,8568832,null,0,y.b,[t.k,t.h,O.c,t.y,[8,null],[2,y.a],[2,S.a]],{checked:[0,"checked"]},{change:"change"}),(l()(),t.sb(5,0,null,null,10,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,e){var a=!0;return"click"===n&&(a=!1!==t.Eb(l,6).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&a),a}),null,null)),t.rb(6,671744,null,0,C.q,[C.o,C.a,F.i],{routerLink:[0,"routerLink"]},null),t.Fb(7,2),(l()(),t.sb(8,0,null,null,7,"div",[["class","middle"]],null,null,null,null,null)),t.Ib(512,null,F.w,F.x,[t.r,t.s,t.k,t.D]),t.rb(10,278528,null,0,F.j,[F.w],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t.Hb(11,{"line-through":0}),(l()(),t.sb(12,0,null,null,1,"div",[["class","name"]],null,null,null,null,null)),(l()(),t.Lb(13,null,["",""])),(l()(),t.sb(14,0,null,null,1,"div",[["class","description"]],null,null,null,null,null)),(l()(),t.Lb(15,null,["",""]))],(function(l,n){l(n,4,0,n.context.$implicit.isComplete);var e=l(n,7,0,"/tasks/completed/edit",n.context.$implicit.id);l(n,6,0,e);var t=l(n,11,0,n.context.$implicit.isComplete);l(n,10,0,"middle",t)}),(function(l,n){l(n,2,0,t.Eb(n,4).id,null,t.Eb(n,4).indeterminate,t.Eb(n,4).checked,t.Eb(n,4).disabled,"before"==t.Eb(n,4).labelPosition,"NoopAnimations"===t.Eb(n,4)._animationMode),l(n,5,0,t.Eb(n,6).target,t.Eb(n,6).href),l(n,13,0,n.context.$implicit.name),l(n,15,0,n.context.$implicit.description)}))}function $(l){return t.Nb(0,[(l()(),t.sb(0,0,null,null,31,"div",[["class","list"]],null,null,null,null,null)),(l()(),t.sb(1,0,null,null,28,"mat-form-field",[["class","mat-form-field"],["floatLabel","never"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-has-label",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,I.b,I.a)),t.rb(2,7520256,null,9,M.c,[t.k,t.h,[2,T.f],[2,L.b],[2,M.a],P.a,t.y,[2,S.a]],{floatLabel:[0,"floatLabel"]},null),t.Jb(603979776,1,{_controlNonStatic:0}),t.Jb(335544320,2,{_controlStatic:0}),t.Jb(603979776,3,{_labelChildNonStatic:0}),t.Jb(335544320,4,{_labelChildStatic:0}),t.Jb(603979776,5,{_placeholderChild:0}),t.Jb(603979776,6,{_errorChildren:1}),t.Jb(603979776,7,{_hintChildren:1}),t.Jb(603979776,8,{_prefixChildren:1}),t.Jb(603979776,9,{_suffixChildren:1}),(l()(),t.sb(12,0,null,0,3,"mat-icon",[["class","mat-icon notranslate"],["matPrefix",""],["role","img"]],[[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],null,null,q.b,q.a)),t.rb(13,16384,[[8,4]],0,M.f,[],null,null),t.rb(14,9158656,null,0,j.b,[t.k,j.d,[8,null],[2,j.a],[2,t.l]],null,null),(l()(),t.Lb(-1,0,["search"])),(l()(),t.sb(16,0,null,1,7,"input",[["class","mat-input-element mat-form-field-autofill-control"],["matInput",""],["placeholder","Search"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"mat-input-server",null],[1,"id",0],[1,"placeholder",0],[8,"disabled",0],[8,"required",0],[1,"readonly",0],[1,"aria-describedby",0],[1,"aria-invalid",0],[1,"aria-required",0]],[[null,"keyup"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],(function(l,n,e){var a=!0,o=l.component;return"input"===n&&(a=!1!==t.Eb(l,17)._handleInput(e.target.value)&&a),"blur"===n&&(a=!1!==t.Eb(l,17).onTouched()&&a),"compositionstart"===n&&(a=!1!==t.Eb(l,17)._compositionStart()&&a),"compositionend"===n&&(a=!1!==t.Eb(l,17)._compositionEnd(e.target.value)&&a),"blur"===n&&(a=!1!==t.Eb(l,22)._focusChanged(!1)&&a),"focus"===n&&(a=!1!==t.Eb(l,22)._focusChanged(!0)&&a),"input"===n&&(a=!1!==t.Eb(l,22)._onInput()&&a),"keyup"===n&&(a=!1!==o.search.emit(e.target.value)&&a),a}),null,null)),t.rb(17,16384,null,0,a.d,[t.D,t.k,[2,a.a]],null,null),t.Ib(1024,null,a.k,(function(l){return[l]}),[a.d]),t.rb(19,540672,null,0,a.g,[[8,null],[8,null],[6,a.k],[2,a.t]],{form:[0,"form"]},null),t.Ib(2048,null,a.l,null,[a.g]),t.rb(21,16384,null,0,a.m,[[4,a.l]],null,null),t.rb(22,999424,null,0,J.a,[t.k,P.a,[6,a.l],[2,a.o],[2,a.i],T.b,[8,null],N.a,t.y],{placeholder:[0,"placeholder"]},null),t.Ib(2048,[[1,4],[2,4]],M.d,null,[J.a]),(l()(),t.sb(24,0,null,4,5,"button",[["aria-label","Clear"],["mat-button",""],["mat-icon-button",""],["matSuffix",""]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.viewClearSearch()&&t),t}),D.b,D.a)),t.rb(25,16384,[[9,4]],0,M.g,[],null,null),t.rb(26,180224,null,0,z.b,[t.k,O.c,[2,S.a]],null,null),(l()(),t.sb(27,0,null,0,2,"mat-icon",[["class","mat-icon notranslate"],["role","img"]],[[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],null,null,q.b,q.a)),t.rb(28,9158656,null,0,j.b,[t.k,j.d,[8,null],[2,j.a],[2,t.l]],null,null),(l()(),t.Lb(-1,0,["close"])),(l()(),t.hb(16777216,null,null,1,null,R)),t.rb(31,278528,null,0,F.k,[t.O,t.L,t.r],{ngForOf:[0,"ngForOf"],ngForTrackBy:[1,"ngForTrackBy"]},null)],(function(l,n){var e=n.component;l(n,2,0,"never"),l(n,14,0),l(n,19,0,e.searchText),l(n,22,0,"Search"),l(n,28,0),l(n,31,0,e.currentTasks,e.viewTrackBy)}),(function(l,n){l(n,1,1,["standard"==t.Eb(n,2).appearance,"fill"==t.Eb(n,2).appearance,"outline"==t.Eb(n,2).appearance,"legacy"==t.Eb(n,2).appearance,t.Eb(n,2)._control.errorState,t.Eb(n,2)._canLabelFloat,t.Eb(n,2)._shouldLabelFloat(),t.Eb(n,2)._hasFloatingLabel(),t.Eb(n,2)._hideControlPlaceholder(),t.Eb(n,2)._control.disabled,t.Eb(n,2)._control.autofilled,t.Eb(n,2)._control.focused,"accent"==t.Eb(n,2).color,"warn"==t.Eb(n,2).color,t.Eb(n,2)._shouldForward("untouched"),t.Eb(n,2)._shouldForward("touched"),t.Eb(n,2)._shouldForward("pristine"),t.Eb(n,2)._shouldForward("dirty"),t.Eb(n,2)._shouldForward("valid"),t.Eb(n,2)._shouldForward("invalid"),t.Eb(n,2)._shouldForward("pending"),!t.Eb(n,2)._animationsEnabled]),l(n,12,0,t.Eb(n,14).inline,"primary"!==t.Eb(n,14).color&&"accent"!==t.Eb(n,14).color&&"warn"!==t.Eb(n,14).color),l(n,16,1,[t.Eb(n,21).ngClassUntouched,t.Eb(n,21).ngClassTouched,t.Eb(n,21).ngClassPristine,t.Eb(n,21).ngClassDirty,t.Eb(n,21).ngClassValid,t.Eb(n,21).ngClassInvalid,t.Eb(n,21).ngClassPending,t.Eb(n,22)._isServer,t.Eb(n,22).id,t.Eb(n,22).placeholder,t.Eb(n,22).disabled,t.Eb(n,22).required,t.Eb(n,22).readonly&&!t.Eb(n,22)._isNativeSelect||null,t.Eb(n,22)._ariaDescribedby||null,t.Eb(n,22).errorState,t.Eb(n,22).required.toString()]),l(n,24,0,t.Eb(n,26).disabled||null,"NoopAnimations"===t.Eb(n,26)._animationMode),l(n,27,0,t.Eb(n,28).inline,"primary"!==t.Eb(n,28).color&&"accent"!==t.Eb(n,28).color&&"warn"!==t.Eb(n,28).color)}))}var V=t.qb({encapsulation:0,styles:[["[_nghost-%COMP%]{background-color:green;display:flex;flex-grow:1;flex-direction:column}"]],data:{}});function B(l){return t.Nb(2,[(l()(),t.sb(0,0,null,null,3,"app-completed-task-list",[],null,[[null,"toggleCompleteItem"],[null,"search"]],(function(l,n,e){var t=!0,a=l.component;return"toggleCompleteItem"===n&&(t=!1!==a.toggleCompleteItem(e)&&t),"search"===n&&(t=!1!==a.viewSearch(e)&&t),t}),$,A)),t.rb(1,114688,null,0,i,[],{currentTasks:[0,"currentTasks"],query:[1,"query"]},{toggleCompleteItem:"toggleCompleteItem",search:"search"}),t.Gb(131072,F.b,[t.h]),t.Gb(131072,F.b,[t.h])],(function(l,n){var e=n.component;l(n,1,0,t.Mb(n,1,0,t.Eb(n,2).transform(e.completedTasks$)),t.Mb(n,1,1,t.Eb(n,3).transform(e.viewSearchQuery$)))}),null)}function G(l){return t.Nb(0,[(l()(),t.sb(0,0,null,null,1,"app-completed-tasks-page",[],null,null,null,B,V)),t.rb(1,245760,null,0,m,[r.o],null,null)],(function(l,n){l(n,1,0)}),null)}var Q=t.ob("app-completed-tasks-page",m,G,{},{},[]),U=e("lzlj"),H=e("igqZ"),K=t.qb({encapsulation:0,styles:[[".full-width[_ngcontent-%COMP%]{width:100%}.shipping-card[_ngcontent-%COMP%]{margin:20px auto}.row[_ngcontent-%COMP%]{display:flex;flex-direction:row}.col[_ngcontent-%COMP%]{flex:1;margin-right:20px}"]],data:{}});function Z(l){return t.Nb(0,[(l()(),t.sb(0,0,null,null,4,"mat-error",[["class","mat-error"],["role","alert"]],[[1,"id",0]],null,null,null,null)),t.rb(1,16384,[[6,4]],0,M.b,[],null,null),(l()(),t.Lb(-1,null,[" Name is "])),(l()(),t.sb(3,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["required"]))],null,(function(l,n){l(n,0,0,t.Eb(n,1).id)}))}function X(l){return t.Nb(0,[(l()(),t.sb(0,0,null,null,69,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],(function(l,n,e){var a=!0,o=l.component;return"submit"===n&&(a=!1!==t.Eb(l,2).onSubmit(e)&&a),"reset"===n&&(a=!1!==t.Eb(l,2).onReset()&&a),"ngSubmit"===n&&(a=!1!==o.onSubmit()&&a),a}),null,null)),t.rb(1,16384,null,0,a.u,[],null,null),t.rb(2,540672,null,0,a.i,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),t.Ib(2048,null,a.c,null,[a.i]),t.rb(4,16384,null,0,a.n,[[4,a.c]],null,null),(l()(),t.sb(5,0,null,null,64,"mat-card",[["class","shipping-card mat-card"]],[[2,"_mat-animation-noopable",null]],null,null,U.d,U.a)),t.rb(6,49152,null,0,H.a,[[2,S.a]],null,null),(l()(),t.sb(7,0,null,0,10,"mat-card-actions",[["class","mat-card-actions"]],[[2,"mat-card-actions-align-end",null]],null,null,null,null)),t.rb(8,16384,null,0,H.b,[],null,null),(l()(),t.sb(9,0,null,null,2,"button",[["color","primary"],["mat-raised-button",""],["type","submit"]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],null,null,D.b,D.a)),t.rb(10,180224,null,0,z.b,[t.k,O.c,[2,S.a]],{disabled:[0,"disabled"],color:[1,"color"]},null),(l()(),t.Lb(-1,0,[" Submit "])),(l()(),t.sb(12,0,null,null,2,"button",[["color","accent"],["mat-raised-button",""],["type","button"]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.cancelClick()&&t),t}),D.b,D.a)),t.rb(13,180224,null,0,z.b,[t.k,O.c,[2,S.a]],{color:[0,"color"]},null),(l()(),t.Lb(-1,0,[" Cancel "])),(l()(),t.sb(15,0,null,null,2,"button",[["color","accent"],["mat-raised-button",""],["type","button"]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.removeClick()&&t),t}),D.b,D.a)),t.rb(16,180224,null,0,z.b,[t.k,O.c,[2,S.a]],{color:[0,"color"]},null),(l()(),t.Lb(-1,0,[" Remove "])),(l()(),t.sb(18,0,null,0,4,"mat-card-header",[["class","mat-card-header"]],null,null,null,U.c,U.b)),t.rb(19,49152,null,0,H.d,[],null,null),(l()(),t.sb(20,0,null,1,2,"mat-card-title",[["class","mat-card-title"]],null,null,null,null,null)),t.rb(21,16384,null,0,H.f,[],null,null),(l()(),t.Lb(-1,null,["Completed Task"])),(l()(),t.sb(23,0,null,0,46,"mat-card-content",[["class","mat-card-content"]],null,null,null,null,null)),t.rb(24,16384,null,0,H.c,[],null,null),(l()(),t.sb(25,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.sb(26,0,null,null,21,"div",[["class","col"]],null,null,null,null,null)),(l()(),t.sb(27,0,null,null,20,"mat-form-field",[["class","full-width mat-form-field"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-has-label",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,I.b,I.a)),t.rb(28,7520256,null,9,M.c,[t.k,t.h,[2,T.f],[2,L.b],[2,M.a],P.a,t.y,[2,S.a]],null,null),t.Jb(603979776,1,{_controlNonStatic:0}),t.Jb(335544320,2,{_controlStatic:0}),t.Jb(603979776,3,{_labelChildNonStatic:0}),t.Jb(335544320,4,{_labelChildStatic:0}),t.Jb(603979776,5,{_placeholderChild:0}),t.Jb(603979776,6,{_errorChildren:1}),t.Jb(603979776,7,{_hintChildren:1}),t.Jb(603979776,8,{_prefixChildren:1}),t.Jb(603979776,9,{_suffixChildren:1}),(l()(),t.sb(38,0,null,1,7,"input",[["class","mat-input-element mat-form-field-autofill-control"],["formControlName","name"],["id","name"],["matInput",""],["placeholder","Name"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"mat-input-server",null],[1,"id",0],[1,"placeholder",0],[8,"disabled",0],[8,"required",0],[1,"readonly",0],[1,"aria-describedby",0],[1,"aria-invalid",0],[1,"aria-required",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],(function(l,n,e){var a=!0;return"input"===n&&(a=!1!==t.Eb(l,39)._handleInput(e.target.value)&&a),"blur"===n&&(a=!1!==t.Eb(l,39).onTouched()&&a),"compositionstart"===n&&(a=!1!==t.Eb(l,39)._compositionStart()&&a),"compositionend"===n&&(a=!1!==t.Eb(l,39)._compositionEnd(e.target.value)&&a),"blur"===n&&(a=!1!==t.Eb(l,44)._focusChanged(!1)&&a),"focus"===n&&(a=!1!==t.Eb(l,44)._focusChanged(!0)&&a),"input"===n&&(a=!1!==t.Eb(l,44)._onInput()&&a),a}),null,null)),t.rb(39,16384,null,0,a.d,[t.D,t.k,[2,a.a]],null,null),t.Ib(1024,null,a.k,(function(l){return[l]}),[a.d]),t.rb(41,671744,null,0,a.h,[[3,a.c],[8,null],[8,null],[6,a.k],[2,a.t]],{name:[0,"name"]},null),t.Ib(2048,null,a.l,null,[a.h]),t.rb(43,16384,null,0,a.m,[[4,a.l]],null,null),t.rb(44,999424,null,0,J.a,[t.k,P.a,[6,a.l],[2,a.o],[2,a.i],T.b,[8,null],N.a,t.y],{id:[0,"id"],placeholder:[1,"placeholder"]},null),t.Ib(2048,[[1,4],[2,4]],M.d,null,[J.a]),(l()(),t.hb(16777216,null,5,1,null,Z)),t.rb(47,16384,null,0,F.l,[t.O,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.sb(48,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.sb(49,0,null,null,20,"div",[["class","col"]],null,null,null,null,null)),(l()(),t.sb(50,0,null,null,19,"mat-form-field",[["class","full-width mat-form-field"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-has-label",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,I.b,I.a)),t.rb(51,7520256,null,9,M.c,[t.k,t.h,[2,T.f],[2,L.b],[2,M.a],P.a,t.y,[2,S.a]],null,null),t.Jb(603979776,10,{_controlNonStatic:0}),t.Jb(335544320,11,{_controlStatic:0}),t.Jb(603979776,12,{_labelChildNonStatic:0}),t.Jb(335544320,13,{_labelChildStatic:0}),t.Jb(603979776,14,{_placeholderChild:0}),t.Jb(603979776,15,{_errorChildren:1}),t.Jb(603979776,16,{_hintChildren:1}),t.Jb(603979776,17,{_prefixChildren:1}),t.Jb(603979776,18,{_suffixChildren:1}),(l()(),t.sb(61,0,null,1,8,"textarea",[["cdkAutosizeMaxRows","5"],["cdkAutosizeMinRows","1"],["cdkTextareaAutosize",""],["class","cdk-textarea-autosize mat-input-element mat-form-field-autofill-control"],["formControlName","description"],["id","description"],["matInput",""],["placeholder","Description"],["rows","1"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"mat-input-server",null],[1,"id",0],[1,"placeholder",0],[8,"disabled",0],[8,"required",0],[1,"readonly",0],[1,"aria-describedby",0],[1,"aria-invalid",0],[1,"aria-required",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],(function(l,n,e){var a=!0;return"input"===n&&(a=!1!==t.Eb(l,62)._handleInput(e.target.value)&&a),"blur"===n&&(a=!1!==t.Eb(l,62).onTouched()&&a),"compositionstart"===n&&(a=!1!==t.Eb(l,62)._compositionStart()&&a),"compositionend"===n&&(a=!1!==t.Eb(l,62)._compositionEnd(e.target.value)&&a),"input"===n&&(a=!1!==t.Eb(l,67)._noopInputHandler()&&a),"blur"===n&&(a=!1!==t.Eb(l,68)._focusChanged(!1)&&a),"focus"===n&&(a=!1!==t.Eb(l,68)._focusChanged(!0)&&a),"input"===n&&(a=!1!==t.Eb(l,68)._onInput()&&a),a}),null,null)),t.rb(62,16384,null,0,a.d,[t.D,t.k,[2,a.a]],null,null),t.Ib(1024,null,a.k,(function(l){return[l]}),[a.d]),t.rb(64,671744,null,0,a.h,[[3,a.c],[8,null],[8,null],[6,a.k],[2,a.t]],{name:[0,"name"]},null),t.Ib(2048,null,a.l,null,[a.h]),t.rb(66,16384,null,0,a.m,[[4,a.l]],null,null),t.rb(67,4603904,[["autosize",4]],0,N.b,[t.k,P.a,t.y],{minRows:[0,"minRows"],maxRows:[1,"maxRows"],enabled:[2,"enabled"]},null),t.rb(68,999424,null,0,J.a,[t.k,P.a,[6,a.l],[2,a.o],[2,a.i],T.b,[8,null],N.a,t.y],{id:[0,"id"],placeholder:[1,"placeholder"]},null),t.Ib(2048,[[10,4],[11,4]],M.d,null,[J.a])],(function(l,n){var e=n.component;l(n,2,0,e.checkoutForm),l(n,10,0,!(e.checkoutForm.dirty&&e.checkoutForm.valid),"primary"),l(n,13,0,"accent"),l(n,16,0,"accent"),l(n,41,0,"name"),l(n,44,0,"name","Name"),l(n,47,0,e.checkoutForm.controls.name.hasError("required")),l(n,64,0,"description"),l(n,67,0,"1","5",""),l(n,68,0,"description","Description")}),(function(l,n){l(n,0,0,t.Eb(n,4).ngClassUntouched,t.Eb(n,4).ngClassTouched,t.Eb(n,4).ngClassPristine,t.Eb(n,4).ngClassDirty,t.Eb(n,4).ngClassValid,t.Eb(n,4).ngClassInvalid,t.Eb(n,4).ngClassPending),l(n,5,0,"NoopAnimations"===t.Eb(n,6)._animationMode),l(n,7,0,"end"===t.Eb(n,8).align),l(n,9,0,t.Eb(n,10).disabled||null,"NoopAnimations"===t.Eb(n,10)._animationMode),l(n,12,0,t.Eb(n,13).disabled||null,"NoopAnimations"===t.Eb(n,13)._animationMode),l(n,15,0,t.Eb(n,16).disabled||null,"NoopAnimations"===t.Eb(n,16)._animationMode),l(n,27,1,["standard"==t.Eb(n,28).appearance,"fill"==t.Eb(n,28).appearance,"outline"==t.Eb(n,28).appearance,"legacy"==t.Eb(n,28).appearance,t.Eb(n,28)._control.errorState,t.Eb(n,28)._canLabelFloat,t.Eb(n,28)._shouldLabelFloat(),t.Eb(n,28)._hasFloatingLabel(),t.Eb(n,28)._hideControlPlaceholder(),t.Eb(n,28)._control.disabled,t.Eb(n,28)._control.autofilled,t.Eb(n,28)._control.focused,"accent"==t.Eb(n,28).color,"warn"==t.Eb(n,28).color,t.Eb(n,28)._shouldForward("untouched"),t.Eb(n,28)._shouldForward("touched"),t.Eb(n,28)._shouldForward("pristine"),t.Eb(n,28)._shouldForward("dirty"),t.Eb(n,28)._shouldForward("valid"),t.Eb(n,28)._shouldForward("invalid"),t.Eb(n,28)._shouldForward("pending"),!t.Eb(n,28)._animationsEnabled]),l(n,38,1,[t.Eb(n,43).ngClassUntouched,t.Eb(n,43).ngClassTouched,t.Eb(n,43).ngClassPristine,t.Eb(n,43).ngClassDirty,t.Eb(n,43).ngClassValid,t.Eb(n,43).ngClassInvalid,t.Eb(n,43).ngClassPending,t.Eb(n,44)._isServer,t.Eb(n,44).id,t.Eb(n,44).placeholder,t.Eb(n,44).disabled,t.Eb(n,44).required,t.Eb(n,44).readonly&&!t.Eb(n,44)._isNativeSelect||null,t.Eb(n,44)._ariaDescribedby||null,t.Eb(n,44).errorState,t.Eb(n,44).required.toString()]),l(n,50,1,["standard"==t.Eb(n,51).appearance,"fill"==t.Eb(n,51).appearance,"outline"==t.Eb(n,51).appearance,"legacy"==t.Eb(n,51).appearance,t.Eb(n,51)._control.errorState,t.Eb(n,51)._canLabelFloat,t.Eb(n,51)._shouldLabelFloat(),t.Eb(n,51)._hasFloatingLabel(),t.Eb(n,51)._hideControlPlaceholder(),t.Eb(n,51)._control.disabled,t.Eb(n,51)._control.autofilled,t.Eb(n,51)._control.focused,"accent"==t.Eb(n,51).color,"warn"==t.Eb(n,51).color,t.Eb(n,51)._shouldForward("untouched"),t.Eb(n,51)._shouldForward("touched"),t.Eb(n,51)._shouldForward("pristine"),t.Eb(n,51)._shouldForward("dirty"),t.Eb(n,51)._shouldForward("valid"),t.Eb(n,51)._shouldForward("invalid"),t.Eb(n,51)._shouldForward("pending"),!t.Eb(n,51)._animationsEnabled]),l(n,61,1,[t.Eb(n,66).ngClassUntouched,t.Eb(n,66).ngClassTouched,t.Eb(n,66).ngClassPristine,t.Eb(n,66).ngClassDirty,t.Eb(n,66).ngClassValid,t.Eb(n,66).ngClassInvalid,t.Eb(n,66).ngClassPending,t.Eb(n,68)._isServer,t.Eb(n,68).id,t.Eb(n,68).placeholder,t.Eb(n,68).disabled,t.Eb(n,68).required,t.Eb(n,68).readonly&&!t.Eb(n,68)._isNativeSelect||null,t.Eb(n,68)._ariaDescribedby||null,t.Eb(n,68).errorState,t.Eb(n,68).required.toString()])}))}var W=t.qb({encapsulation:0,styles:[[""]],data:{}});function Y(l){return t.Nb(2,[(l()(),t.sb(0,0,null,null,3,"app-completed-task-detail-edit",[],null,[[null,"cancel"],[null,"remove"],[null,"checkout"]],(function(l,n,e){var t=!0,a=l.component;return"cancel"===n&&(t=!1!==a.viewCancelled(e)&&t),"remove"===n&&(t=!1!==a.viewRemoved(e)&&t),"checkout"===n&&(t=!1!==a.viewSaved(e)&&t),t}),X,K)),t.Ib(8704,null,o,o,[a.e]),t.rb(2,114688,null,0,u,[o],{completedTask:[0,"completedTask"]},{cancel:"cancel",remove:"remove",checkout:"checkout"}),t.Gb(131072,F.b,[t.h]),(l()(),t.sb(4,0,null,null,3,"pre",[],null,null,null,null,null)),(l()(),t.Lb(5,null,["Selected Completed Task: ","\n"])),t.Gb(131072,F.b,[t.h]),t.Gb(0,F.f,[])],(function(l,n){var e=n.component;l(n,2,0,t.Mb(n,2,0,t.Eb(n,3).transform(e.task$)))}),(function(l,n){var e=n.component;l(n,5,0,t.Mb(n,5,0,t.Eb(n,7).transform(t.Mb(n,5,0,t.Eb(n,6).transform(e.task$)))))}))}function ll(l){return t.Nb(0,[(l()(),t.sb(0,0,null,null,1,"app-completed-task-detail-edit-page",[],null,null,null,Y,W)),t.rb(1,114688,null,0,d,[r.o],null,null)],(function(l,n){l(n,1,0)}),null)}var nl=t.ob("app-completed-task-detail-edit-page",d,ll,{},{},[]),el=e("Mc5n"),tl=e("hOhj"),al=e("POq0"),ol=e("QQfA"),ul=e("JjoW"),il=e("gavF"),rl=e("s6ns"),cl=e("cUpR"),bl=e("zMNK"),dl=e("BV1i"),sl=e("dFDH"),ml=e("02hT"),pl=e("Q+lL"),hl=e("BzsH"),fl=e("hctd"),gl=e("DKe4"),El=e("LRne"),Cl=e("eIep"),_l=e("pLZG"),kl=e("SxV6"),vl=e("vkgz"),wl=e("fM1L");let xl=(()=>{class l{constructor(l){this.store=l}canActivate(){return this.waitForAuth().pipe(Object(Cl.a)(()=>this.waitForCompletedTasksToLoad().pipe(Object(Cl.a)(()=>Object(El.a)(!0)))))}waitForAuth(){return this.store.pipe(Object(r.D)(wl.b.selectUser),Object(_l.a)(l=>!!l),Object(kl.a)())}waitForCompletedTasksToLoad(){return this.store.pipe(Object(r.D)(b.b.selectCompletedTasksLoaded),Object(vl.a)(l=>{l||this.store.dispatch(c.d.loadData())}),Object(_l.a)(l=>l),Object(s.a)(1))}}return l.ngInjectableDef=t.Rb({factory:function(){return new l(t.Sb(r.o))},token:l,providedIn:"root"}),l})();class yl{}e.d(n,"CompletedTasksModuleNgFactory",(function(){return Ol}));var Ol=t.pb(h,[],(function(l){return t.Bb([t.Cb(512,t.j,t.ab,[[8,[f.a,f.b,g.a,E.a,w,Q,nl]],[3,t.j],t.w]),t.Cb(4608,F.n,F.m,[t.t,[2,F.z]]),t.Cb(4608,a.e,a.e,[]),t.Cb(4608,a.s,a.s,[]),t.Cb(4608,el.g,el.g,[F.d,t.y,tl.e,el.i]),t.Cb(4608,al.c,al.c,[]),t.Cb(4608,T.b,T.b,[]),t.Cb(4608,ol.c,ol.c,[ol.i,ol.e,t.j,ol.h,ol.f,t.q,t.y,F.d,L.b,[2,F.h]]),t.Cb(5120,ol.j,ol.k,[ol.c]),t.Cb(5120,ul.a,ul.b,[ol.c]),t.Cb(5120,il.c,il.j,[ol.c]),t.Cb(5120,rl.b,rl.c,[ol.c]),t.Cb(135680,rl.d,rl.d,[ol.c,t.q,[2,F.h],[2,rl.a],rl.b,[3,rl.d],ol.e]),t.Cb(1073742336,F.c,F.c,[]),t.Cb(1073742336,a.r,a.r,[]),t.Cb(1073742336,a.p,a.p,[]),t.Cb(1073742336,el.h,el.h,[]),t.Cb(1073742336,P.b,P.b,[]),t.Cb(1073742336,N.c,N.c,[]),t.Cb(1073742336,al.d,al.d,[]),t.Cb(1073742336,M.e,M.e,[]),t.Cb(1073742336,J.b,J.b,[]),t.Cb(1073742336,L.a,L.a,[]),t.Cb(1073742336,T.j,T.j,[[2,T.c],[2,cl.f]]),t.Cb(1073742336,H.e,H.e,[]),t.Cb(1073742336,T.s,T.s,[]),t.Cb(1073742336,y.d,y.d,[]),t.Cb(1073742336,y.c,y.c,[]),t.Cb(1073742336,z.c,z.c,[]),t.Cb(1073742336,bl.f,bl.f,[]),t.Cb(1073742336,tl.c,tl.c,[]),t.Cb(1073742336,ol.g,ol.g,[]),t.Cb(1073742336,T.q,T.q,[]),t.Cb(1073742336,T.o,T.o,[]),t.Cb(1073742336,ul.d,ul.d,[]),t.Cb(1073742336,dl.h,dl.h,[]),t.Cb(1073742336,sl.e,sl.e,[]),t.Cb(1073742336,T.k,T.k,[]),t.Cb(1073742336,ml.a,ml.a,[]),t.Cb(1073742336,pl.c,pl.c,[]),t.Cb(1073742336,il.i,il.i,[]),t.Cb(1073742336,il.f,il.f,[]),t.Cb(1073742336,j.c,j.c,[]),t.Cb(1073742336,hl.b,hl.b,[]),t.Cb(1073742336,rl.j,rl.j,[]),t.Cb(1073742336,fl.a,fl.a,[]),t.Cb(1073742336,C.r,C.r,[[2,C.x],[2,C.o]]),t.Cb(1073742336,yl,yl,[]),t.Cb(1073742336,h,h,[]),t.Cb(1024,C.m,(function(){return[[{path:"",component:p,canActivate:[gl.a,xl],children:[{path:"",component:m},{path:"edit/:id",component:d}]}]]}),[])])}))}}]);