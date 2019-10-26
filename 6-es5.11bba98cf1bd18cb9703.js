(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"/cxq":function(l,n,t){"use strict";t.r(n);var e=t("8Y7J"),o=t("s7LF"),a=function(){function l(l){this.formBuilder=l}return l.prototype.init=function(l){this.initialData=Object.assign({},l),this.form=this.formBuilder.group({name:[this.initialData.name,o.o.required],description:[this.initialData.description],isComplete:[this.initialData.isComplete]})},l.prototype.checkout=function(){var l=Object.assign({},this.initialData,this.form.value);return this.form.reset(),l},l}(),u=function(){function l(l){this.presenter=l,this.cancel=new e.m,this.remove=new e.m,this.checkout=new e.m}return Object.defineProperty(l.prototype,"checkoutForm",{get:function(){return this.presenter.form},enumerable:!0,configurable:!0}),l.prototype.ngOnInit=function(){this.presenter.init(this.completedTask)},l.prototype.cancelClick=function(){this.cancel.emit(this.completedTask)},l.prototype.removeClick=function(){this.remove.emit(this.completedTask)},l.prototype.onSubmit=function(){var l=this.presenter.checkout();this.checkout.emit(l)},l}(),i=function(){function l(){this.toggleCompleteItem=new e.m}return l.prototype.ngOnInit=function(){},l}(),r=t("DQLy"),c=t("E7rW"),b=t("9Odd"),d=function(){function l(l){this.store=l,this.task$=l.pipe(Object(r.D)(b.b.selectCompletedTaskFromRoute))}return l.prototype.ngOnInit=function(){},l.prototype.viewCancelled=function(l){this.store.dispatch(c.a.cancelled({completedTask:l}))},l.prototype.viewRemoved=function(l){this.store.dispatch(c.a.removed({completedTask:l}))},l.prototype.viewSaved=function(l){this.store.dispatch(c.a.saved({completedTask:l}))},l}(),s=function(){function l(l){this.store=l,this.completedTasks$=l.pipe(Object(r.D)(b.b.selectCompletedTasksAll))}return l.prototype.ngOnDestroy=function(){},l.prototype.ngOnInit=function(){},l.prototype.toggleCompleteItem=function(l){this.store.dispatch(c.b.itemToggled({todoCompleted:l}))},l}(),p=function(){function l(l){this.store=l}return l.prototype.ngOnDestroy=function(){this.store.dispatch(c.c.destroyed())},l.prototype.ngOnInit=function(){},l}(),m=function(){},f=t("xYTU"),h=t("t68o"),g=t("pMnS"),C=t("iInd"),E=e.qb({encapsulation:0,styles:[["[_nghost-%COMP%]{background-color:red;display:flex;flex-grow:1;flex-direction:column}"]],data:{}});function k(l){return e.Nb(2,[(l()(),e.sb(0,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),e.rb(1,212992,null,0,C.s,[C.b,e.O,e.j,[8,null],e.h],null,null)],(function(l,n){l(n,1,0)}),null)}var _=e.ob("app-completed-tasks-root",p,(function(l){return e.Nb(0,[(l()(),e.sb(0,0,null,null,1,"app-completed-tasks-root",[],null,null,null,k,E)),e.rb(1,245760,null,0,p,[r.o],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),v=t("Z5h4"),x=t("r0V8"),y=t("5GAg"),w=t("omvX"),O=t("SVse"),I=e.qb({encapsulation:0,styles:[["[_nghost-%COMP%]{background-color:green;display:flex;flex-grow:1;flex-direction:column}.cdk-drag-preview[_ngcontent-%COMP%]{border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drop-dragging[_ngcontent-%COMP%]   .cdk-drag[_ngcontent-%COMP%]{transition:transform 250ms cubic-bezier(0,0,.2,1);background-color:#00f}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .3s cubic-bezier(0,0,.2,1)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.list[_ngcontent-%COMP%]{flex-grow:1;flex-basis:0px;overflow-y:scroll;display:flex;flex-direction:column}.list-item[_ngcontent-%COMP%]{display:flex;flex-wrap:nowrap;padding:10px;border-bottom:1px solid #ccc;box-sizing:border-box;background:#fff}mat-checkbox[_ngcontent-%COMP%]{padding-right:10px}.drag-icon[_ngcontent-%COMP%]{cursor:move}.name[_ngcontent-%COMP%]{color:#000;font-size:medium}.description[_ngcontent-%COMP%]{color:gray;font-size:small;white-space:pre-line}.middle[_ngcontent-%COMP%]{flex-grow:1;padding-right:10px}.line-through[_ngcontent-%COMP%]{-webkit-text-decoration-line:line-through;text-decoration-line:line-through}a[_ngcontent-%COMP%]{text-decoration:none;display:flex;flex-wrap:nowrap;flex-grow:1}.fab-bottom-right[_ngcontent-%COMP%]{position:fixed;right:60px;bottom:16px;z-index:100}.zzzzzzzz[_ngcontent-%COMP%]{position:fixed;right:60px;top:0;z-index:100}"]],data:{}});function M(l){return e.Nb(0,[(l()(),e.sb(0,0,null,null,15,"div",[],null,null,null,null,null)),(l()(),e.sb(1,0,null,null,14,"div",[["class","list-item"]],null,null,null,null,null)),(l()(),e.sb(2,0,null,null,2,"mat-checkbox",[["class","mat-checkbox"]],[[8,"id",0],[1,"tabindex",0],[2,"mat-checkbox-indeterminate",null],[2,"mat-checkbox-checked",null],[2,"mat-checkbox-disabled",null],[2,"mat-checkbox-label-before",null],[2,"_mat-animation-noopable",null]],[[null,"change"]],(function(l,n,t){var e=!0;return"change"===n&&(e=!1!==l.component.toggleCompleteItem.emit(l.context.$implicit)&&e),e}),v.b,v.a)),e.Ib(5120,null,o.i,(function(l){return[l]}),[x.b]),e.rb(4,8568832,null,0,x.b,[e.k,e.h,y.c,e.y,[8,null],[2,x.a],[2,w.a]],{checked:[0,"checked"]},{change:"change"}),(l()(),e.sb(5,0,null,null,10,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,t){var o=!0;return"click"===n&&(o=!1!==e.Eb(l,6).onClick(t.button,t.ctrlKey,t.metaKey,t.shiftKey)&&o),o}),null,null)),e.rb(6,671744,null,0,C.q,[C.o,C.a,O.i],{routerLink:[0,"routerLink"]},null),e.Fb(7,2),(l()(),e.sb(8,0,null,null,7,"div",[["class","middle"]],null,null,null,null,null)),e.Ib(512,null,O.w,O.x,[e.r,e.s,e.k,e.D]),e.rb(10,278528,null,0,O.j,[O.w],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),e.Hb(11,{"line-through":0}),(l()(),e.sb(12,0,null,null,1,"div",[["class","name"]],null,null,null,null,null)),(l()(),e.Lb(13,null,["",""])),(l()(),e.sb(14,0,null,null,1,"div",[["class","description"]],null,null,null,null,null)),(l()(),e.Lb(15,null,["",""]))],(function(l,n){l(n,4,0,n.context.$implicit.isComplete);var t=l(n,7,0,"/tasks/completed/edit",n.context.$implicit.id);l(n,6,0,t);var e=l(n,11,0,n.context.$implicit.isComplete);l(n,10,0,"middle",e)}),(function(l,n){l(n,2,0,e.Eb(n,4).id,null,e.Eb(n,4).indeterminate,e.Eb(n,4).checked,e.Eb(n,4).disabled,"before"==e.Eb(n,4).labelPosition,"NoopAnimations"===e.Eb(n,4)._animationMode),l(n,5,0,e.Eb(n,6).target,e.Eb(n,6).href),l(n,13,0,n.context.$implicit.name),l(n,15,0,n.context.$implicit.description)}))}function F(l){return e.Nb(0,[(l()(),e.sb(0,0,null,null,2,"div",[["class","list"]],null,null,null,null,null)),(l()(),e.hb(16777216,null,null,1,null,M)),e.rb(2,278528,null,0,O.k,[e.O,e.L,e.r],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){l(n,2,0,n.component.currentTasks)}),null)}var j=e.qb({encapsulation:0,styles:[["[_nghost-%COMP%]{background-color:green;display:flex;flex-grow:1;flex-direction:column}"]],data:{}});function P(l){return e.Nb(2,[(l()(),e.sb(0,0,null,null,2,"app-completed-task-list",[],null,[[null,"toggleCompleteItem"]],(function(l,n,t){var e=!0;return"toggleCompleteItem"===n&&(e=!1!==l.component.toggleCompleteItem(t)&&e),e}),F,I)),e.rb(1,114688,null,0,i,[],{currentTasks:[0,"currentTasks"]},{toggleCompleteItem:"toggleCompleteItem"}),e.Gb(131072,O.b,[e.h])],(function(l,n){var t=n.component;l(n,1,0,e.Mb(n,1,0,e.Eb(n,2).transform(t.completedTasks$)))}),null)}var S=e.ob("app-completed-tasks-page",s,(function(l){return e.Nb(0,[(l()(),e.sb(0,0,null,null,1,"app-completed-tasks-page",[],null,null,null,P,j)),e.rb(1,245760,null,0,s,[r.o],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),T=t("HsOI"),L=t("lzlj"),N=t("igqZ"),z=t("bujt"),q=t("Fwaw"),D=t("dJrM"),J=t("Xd0L"),A=t("IP0z"),R=t("/HVE"),$=t("ZwOa"),V=t("oapL"),G=e.qb({encapsulation:0,styles:[[".full-width[_ngcontent-%COMP%]{width:100%}.shipping-card[_ngcontent-%COMP%]{margin:20px auto}.row[_ngcontent-%COMP%]{display:flex;flex-direction:row}.col[_ngcontent-%COMP%]{flex:1;margin-right:20px}"]],data:{}});function H(l){return e.Nb(0,[(l()(),e.sb(0,0,null,null,4,"mat-error",[["class","mat-error"],["role","alert"]],[[1,"id",0]],null,null,null,null)),e.rb(1,16384,[[6,4]],0,T.b,[],null,null),(l()(),e.Lb(-1,null,[" Name is "])),(l()(),e.sb(3,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["required"]))],null,(function(l,n){l(n,0,0,e.Eb(n,1).id)}))}function U(l){return e.Nb(0,[(l()(),e.sb(0,0,null,null,69,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],(function(l,n,t){var o=!0,a=l.component;return"submit"===n&&(o=!1!==e.Eb(l,2).onSubmit(t)&&o),"reset"===n&&(o=!1!==e.Eb(l,2).onReset()&&o),"ngSubmit"===n&&(o=!1!==a.onSubmit()&&o),o}),null,null)),e.rb(1,16384,null,0,o.s,[],null,null),e.rb(2,540672,null,0,o.g,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),e.Ib(2048,null,o.c,null,[o.g]),e.rb(4,16384,null,0,o.l,[[4,o.c]],null,null),(l()(),e.sb(5,0,null,null,64,"mat-card",[["class","shipping-card mat-card"]],[[2,"_mat-animation-noopable",null]],null,null,L.d,L.a)),e.rb(6,49152,null,0,N.a,[[2,w.a]],null,null),(l()(),e.sb(7,0,null,0,10,"mat-card-actions",[["class","mat-card-actions"]],[[2,"mat-card-actions-align-end",null]],null,null,null,null)),e.rb(8,16384,null,0,N.b,[],null,null),(l()(),e.sb(9,0,null,null,2,"button",[["color","primary"],["mat-raised-button",""],["type","submit"]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],null,null,z.b,z.a)),e.rb(10,180224,null,0,q.b,[e.k,y.c,[2,w.a]],{disabled:[0,"disabled"],color:[1,"color"]},null),(l()(),e.Lb(-1,0,[" Submit "])),(l()(),e.sb(12,0,null,null,2,"button",[["color","accent"],["mat-raised-button",""],["type","button"]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.cancelClick()&&e),e}),z.b,z.a)),e.rb(13,180224,null,0,q.b,[e.k,y.c,[2,w.a]],{color:[0,"color"]},null),(l()(),e.Lb(-1,0,[" Cancel "])),(l()(),e.sb(15,0,null,null,2,"button",[["color","accent"],["mat-raised-button",""],["type","button"]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.removeClick()&&e),e}),z.b,z.a)),e.rb(16,180224,null,0,q.b,[e.k,y.c,[2,w.a]],{color:[0,"color"]},null),(l()(),e.Lb(-1,0,[" Remove "])),(l()(),e.sb(18,0,null,0,4,"mat-card-header",[["class","mat-card-header"]],null,null,null,L.c,L.b)),e.rb(19,49152,null,0,N.d,[],null,null),(l()(),e.sb(20,0,null,1,2,"mat-card-title",[["class","mat-card-title"]],null,null,null,null,null)),e.rb(21,16384,null,0,N.f,[],null,null),(l()(),e.Lb(-1,null,["Completed Task"])),(l()(),e.sb(23,0,null,0,46,"mat-card-content",[["class","mat-card-content"]],null,null,null,null,null)),e.rb(24,16384,null,0,N.c,[],null,null),(l()(),e.sb(25,0,null,null,22,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.sb(26,0,null,null,21,"div",[["class","col"]],null,null,null,null,null)),(l()(),e.sb(27,0,null,null,20,"mat-form-field",[["class","full-width mat-form-field"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-has-label",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,D.b,D.a)),e.rb(28,7520256,null,9,T.c,[e.k,e.h,[2,J.f],[2,A.b],[2,T.a],R.a,e.y,[2,w.a]],null,null),e.Jb(603979776,1,{_controlNonStatic:0}),e.Jb(335544320,2,{_controlStatic:0}),e.Jb(603979776,3,{_labelChildNonStatic:0}),e.Jb(335544320,4,{_labelChildStatic:0}),e.Jb(603979776,5,{_placeholderChild:0}),e.Jb(603979776,6,{_errorChildren:1}),e.Jb(603979776,7,{_hintChildren:1}),e.Jb(603979776,8,{_prefixChildren:1}),e.Jb(603979776,9,{_suffixChildren:1}),(l()(),e.sb(38,0,null,1,7,"input",[["class","mat-input-element mat-form-field-autofill-control"],["formControlName","name"],["id","name"],["matInput",""],["placeholder","Name"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"mat-input-server",null],[1,"id",0],[1,"placeholder",0],[8,"disabled",0],[8,"required",0],[1,"readonly",0],[1,"aria-describedby",0],[1,"aria-invalid",0],[1,"aria-required",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],(function(l,n,t){var o=!0;return"input"===n&&(o=!1!==e.Eb(l,39)._handleInput(t.target.value)&&o),"blur"===n&&(o=!1!==e.Eb(l,39).onTouched()&&o),"compositionstart"===n&&(o=!1!==e.Eb(l,39)._compositionStart()&&o),"compositionend"===n&&(o=!1!==e.Eb(l,39)._compositionEnd(t.target.value)&&o),"blur"===n&&(o=!1!==e.Eb(l,44)._focusChanged(!1)&&o),"focus"===n&&(o=!1!==e.Eb(l,44)._focusChanged(!0)&&o),"input"===n&&(o=!1!==e.Eb(l,44)._onInput()&&o),o}),null,null)),e.rb(39,16384,null,0,o.d,[e.D,e.k,[2,o.a]],null,null),e.Ib(1024,null,o.i,(function(l){return[l]}),[o.d]),e.rb(41,671744,null,0,o.f,[[3,o.c],[8,null],[8,null],[6,o.i],[2,o.r]],{name:[0,"name"]},null),e.Ib(2048,null,o.j,null,[o.f]),e.rb(43,16384,null,0,o.k,[[4,o.j]],null,null),e.rb(44,999424,null,0,$.a,[e.k,R.a,[6,o.j],[2,o.m],[2,o.g],J.b,[8,null],V.a,e.y],{id:[0,"id"],placeholder:[1,"placeholder"]},null),e.Ib(2048,[[1,4],[2,4]],T.d,null,[$.a]),(l()(),e.hb(16777216,null,5,1,null,H)),e.rb(47,16384,null,0,O.l,[e.O,e.L],{ngIf:[0,"ngIf"]},null),(l()(),e.sb(48,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.sb(49,0,null,null,20,"div",[["class","col"]],null,null,null,null,null)),(l()(),e.sb(50,0,null,null,19,"mat-form-field",[["class","full-width mat-form-field"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-has-label",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,D.b,D.a)),e.rb(51,7520256,null,9,T.c,[e.k,e.h,[2,J.f],[2,A.b],[2,T.a],R.a,e.y,[2,w.a]],null,null),e.Jb(603979776,10,{_controlNonStatic:0}),e.Jb(335544320,11,{_controlStatic:0}),e.Jb(603979776,12,{_labelChildNonStatic:0}),e.Jb(335544320,13,{_labelChildStatic:0}),e.Jb(603979776,14,{_placeholderChild:0}),e.Jb(603979776,15,{_errorChildren:1}),e.Jb(603979776,16,{_hintChildren:1}),e.Jb(603979776,17,{_prefixChildren:1}),e.Jb(603979776,18,{_suffixChildren:1}),(l()(),e.sb(61,0,null,1,8,"textarea",[["cdkAutosizeMaxRows","5"],["cdkAutosizeMinRows","1"],["cdkTextareaAutosize",""],["class","cdk-textarea-autosize mat-input-element mat-form-field-autofill-control"],["formControlName","description"],["id","description"],["matInput",""],["placeholder","Description"],["rows","1"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"mat-input-server",null],[1,"id",0],[1,"placeholder",0],[8,"disabled",0],[8,"required",0],[1,"readonly",0],[1,"aria-describedby",0],[1,"aria-invalid",0],[1,"aria-required",0]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"]],(function(l,n,t){var o=!0;return"input"===n&&(o=!1!==e.Eb(l,62)._handleInput(t.target.value)&&o),"blur"===n&&(o=!1!==e.Eb(l,62).onTouched()&&o),"compositionstart"===n&&(o=!1!==e.Eb(l,62)._compositionStart()&&o),"compositionend"===n&&(o=!1!==e.Eb(l,62)._compositionEnd(t.target.value)&&o),"input"===n&&(o=!1!==e.Eb(l,67)._noopInputHandler()&&o),"blur"===n&&(o=!1!==e.Eb(l,68)._focusChanged(!1)&&o),"focus"===n&&(o=!1!==e.Eb(l,68)._focusChanged(!0)&&o),"input"===n&&(o=!1!==e.Eb(l,68)._onInput()&&o),o}),null,null)),e.rb(62,16384,null,0,o.d,[e.D,e.k,[2,o.a]],null,null),e.Ib(1024,null,o.i,(function(l){return[l]}),[o.d]),e.rb(64,671744,null,0,o.f,[[3,o.c],[8,null],[8,null],[6,o.i],[2,o.r]],{name:[0,"name"]},null),e.Ib(2048,null,o.j,null,[o.f]),e.rb(66,16384,null,0,o.k,[[4,o.j]],null,null),e.rb(67,4603904,[["autosize",4]],0,V.b,[e.k,R.a,e.y],{minRows:[0,"minRows"],maxRows:[1,"maxRows"],enabled:[2,"enabled"]},null),e.rb(68,999424,null,0,$.a,[e.k,R.a,[6,o.j],[2,o.m],[2,o.g],J.b,[8,null],V.a,e.y],{id:[0,"id"],placeholder:[1,"placeholder"]},null),e.Ib(2048,[[10,4],[11,4]],T.d,null,[$.a])],(function(l,n){var t=n.component;l(n,2,0,t.checkoutForm),l(n,10,0,!(t.checkoutForm.dirty&&t.checkoutForm.valid),"primary"),l(n,13,0,"accent"),l(n,16,0,"accent"),l(n,41,0,"name"),l(n,44,0,"name","Name"),l(n,47,0,t.checkoutForm.controls.name.hasError("required")),l(n,64,0,"description"),l(n,67,0,"1","5",""),l(n,68,0,"description","Description")}),(function(l,n){l(n,0,0,e.Eb(n,4).ngClassUntouched,e.Eb(n,4).ngClassTouched,e.Eb(n,4).ngClassPristine,e.Eb(n,4).ngClassDirty,e.Eb(n,4).ngClassValid,e.Eb(n,4).ngClassInvalid,e.Eb(n,4).ngClassPending),l(n,5,0,"NoopAnimations"===e.Eb(n,6)._animationMode),l(n,7,0,"end"===e.Eb(n,8).align),l(n,9,0,e.Eb(n,10).disabled||null,"NoopAnimations"===e.Eb(n,10)._animationMode),l(n,12,0,e.Eb(n,13).disabled||null,"NoopAnimations"===e.Eb(n,13)._animationMode),l(n,15,0,e.Eb(n,16).disabled||null,"NoopAnimations"===e.Eb(n,16)._animationMode),l(n,27,1,["standard"==e.Eb(n,28).appearance,"fill"==e.Eb(n,28).appearance,"outline"==e.Eb(n,28).appearance,"legacy"==e.Eb(n,28).appearance,e.Eb(n,28)._control.errorState,e.Eb(n,28)._canLabelFloat,e.Eb(n,28)._shouldLabelFloat(),e.Eb(n,28)._hasFloatingLabel(),e.Eb(n,28)._hideControlPlaceholder(),e.Eb(n,28)._control.disabled,e.Eb(n,28)._control.autofilled,e.Eb(n,28)._control.focused,"accent"==e.Eb(n,28).color,"warn"==e.Eb(n,28).color,e.Eb(n,28)._shouldForward("untouched"),e.Eb(n,28)._shouldForward("touched"),e.Eb(n,28)._shouldForward("pristine"),e.Eb(n,28)._shouldForward("dirty"),e.Eb(n,28)._shouldForward("valid"),e.Eb(n,28)._shouldForward("invalid"),e.Eb(n,28)._shouldForward("pending"),!e.Eb(n,28)._animationsEnabled]),l(n,38,1,[e.Eb(n,43).ngClassUntouched,e.Eb(n,43).ngClassTouched,e.Eb(n,43).ngClassPristine,e.Eb(n,43).ngClassDirty,e.Eb(n,43).ngClassValid,e.Eb(n,43).ngClassInvalid,e.Eb(n,43).ngClassPending,e.Eb(n,44)._isServer,e.Eb(n,44).id,e.Eb(n,44).placeholder,e.Eb(n,44).disabled,e.Eb(n,44).required,e.Eb(n,44).readonly&&!e.Eb(n,44)._isNativeSelect||null,e.Eb(n,44)._ariaDescribedby||null,e.Eb(n,44).errorState,e.Eb(n,44).required.toString()]),l(n,50,1,["standard"==e.Eb(n,51).appearance,"fill"==e.Eb(n,51).appearance,"outline"==e.Eb(n,51).appearance,"legacy"==e.Eb(n,51).appearance,e.Eb(n,51)._control.errorState,e.Eb(n,51)._canLabelFloat,e.Eb(n,51)._shouldLabelFloat(),e.Eb(n,51)._hasFloatingLabel(),e.Eb(n,51)._hideControlPlaceholder(),e.Eb(n,51)._control.disabled,e.Eb(n,51)._control.autofilled,e.Eb(n,51)._control.focused,"accent"==e.Eb(n,51).color,"warn"==e.Eb(n,51).color,e.Eb(n,51)._shouldForward("untouched"),e.Eb(n,51)._shouldForward("touched"),e.Eb(n,51)._shouldForward("pristine"),e.Eb(n,51)._shouldForward("dirty"),e.Eb(n,51)._shouldForward("valid"),e.Eb(n,51)._shouldForward("invalid"),e.Eb(n,51)._shouldForward("pending"),!e.Eb(n,51)._animationsEnabled]),l(n,61,1,[e.Eb(n,66).ngClassUntouched,e.Eb(n,66).ngClassTouched,e.Eb(n,66).ngClassPristine,e.Eb(n,66).ngClassDirty,e.Eb(n,66).ngClassValid,e.Eb(n,66).ngClassInvalid,e.Eb(n,66).ngClassPending,e.Eb(n,68)._isServer,e.Eb(n,68).id,e.Eb(n,68).placeholder,e.Eb(n,68).disabled,e.Eb(n,68).required,e.Eb(n,68).readonly&&!e.Eb(n,68)._isNativeSelect||null,e.Eb(n,68)._ariaDescribedby||null,e.Eb(n,68).errorState,e.Eb(n,68).required.toString()])}))}var B=e.qb({encapsulation:0,styles:[[""]],data:{}});function K(l){return e.Nb(2,[(l()(),e.sb(0,0,null,null,3,"app-completed-task-detail-edit",[],null,[[null,"cancel"],[null,"remove"],[null,"checkout"]],(function(l,n,t){var e=!0,o=l.component;return"cancel"===n&&(e=!1!==o.viewCancelled(t)&&e),"remove"===n&&(e=!1!==o.viewRemoved(t)&&e),"checkout"===n&&(e=!1!==o.viewSaved(t)&&e),e}),U,G)),e.Ib(8704,null,a,a,[o.e]),e.rb(2,114688,null,0,u,[a],{completedTask:[0,"completedTask"]},{cancel:"cancel",remove:"remove",checkout:"checkout"}),e.Gb(131072,O.b,[e.h]),(l()(),e.sb(4,0,null,null,3,"pre",[],null,null,null,null,null)),(l()(),e.Lb(5,null,["Selected Completed Task: ","\n"])),e.Gb(131072,O.b,[e.h]),e.Gb(0,O.f,[])],(function(l,n){var t=n.component;l(n,2,0,e.Mb(n,2,0,e.Eb(n,3).transform(t.task$)))}),(function(l,n){var t=n.component;l(n,5,0,e.Mb(n,5,0,e.Eb(n,7).transform(e.Mb(n,5,0,e.Eb(n,6).transform(t.task$)))))}))}var Q,Z=e.ob("app-completed-task-detail-edit-page",d,(function(l){return e.Nb(0,[(l()(),e.sb(0,0,null,null,1,"app-completed-task-detail-edit-page",[],null,null,null,K,B)),e.rb(1,114688,null,0,d,[r.o],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),W=t("Mc5n"),X=t("hOhj"),Y=t("POq0"),ll=t("QQfA"),nl=t("JjoW"),tl=t("gavF"),el=t("s6ns"),ol=t("cUpR"),al=t("zMNK"),ul=t("BV1i"),il=t("dFDH"),rl=t("02hT"),cl=t("Q+lL"),bl=t("Gi4r"),dl=t("BzsH"),sl=t("hctd"),pl=t("DKe4"),ml=t("LRne"),fl=t("eIep"),hl=t("pLZG"),gl=t("SxV6"),Cl=t("vkgz"),El=t("IzEk"),kl=t("fM1L"),_l=((Q=function(){function l(l){this.store=l}return l.prototype.canActivate=function(){var l=this;return this.waitForAuth().pipe(Object(fl.a)((function(){return l.waitForCompletedTasksToLoad().pipe(Object(fl.a)((function(){return Object(ml.a)(!0)})))})))},l.prototype.waitForAuth=function(){return this.store.pipe(Object(r.D)(kl.b.selectUser),Object(hl.a)((function(l){return!!l})),Object(gl.a)())},l.prototype.waitForCompletedTasksToLoad=function(){var l=this;return this.store.pipe(Object(r.D)(b.b.selectCompletedTasksLoaded),Object(Cl.a)((function(n){n||l.store.dispatch(c.d.loadData())})),Object(hl.a)((function(l){return l})),Object(El.a)(1))},l}()).ngInjectableDef=e.Rb({factory:function(){return new Q(e.Sb(r.o))},token:Q,providedIn:"root"}),Q),vl=function(){};t.d(n,"CompletedTasksModuleNgFactory",(function(){return xl}));var xl=e.pb(m,[],(function(l){return e.Bb([e.Cb(512,e.j,e.ab,[[8,[f.a,f.b,h.a,g.a,_,S,Z]],[3,e.j],e.w]),e.Cb(4608,O.n,O.m,[e.t,[2,O.z]]),e.Cb(4608,o.e,o.e,[]),e.Cb(4608,o.q,o.q,[]),e.Cb(4608,W.g,W.g,[O.d,e.y,X.e,W.i]),e.Cb(4608,Y.c,Y.c,[]),e.Cb(4608,J.b,J.b,[]),e.Cb(4608,ll.c,ll.c,[ll.i,ll.e,e.j,ll.h,ll.f,e.q,e.y,O.d,A.b,[2,O.h]]),e.Cb(5120,ll.j,ll.k,[ll.c]),e.Cb(5120,nl.a,nl.b,[ll.c]),e.Cb(5120,tl.c,tl.j,[ll.c]),e.Cb(5120,el.b,el.c,[ll.c]),e.Cb(135680,el.d,el.d,[ll.c,e.q,[2,O.h],[2,el.a],el.b,[3,el.d],ll.e]),e.Cb(1073742336,O.c,O.c,[]),e.Cb(1073742336,o.p,o.p,[]),e.Cb(1073742336,o.n,o.n,[]),e.Cb(1073742336,W.h,W.h,[]),e.Cb(1073742336,R.b,R.b,[]),e.Cb(1073742336,V.c,V.c,[]),e.Cb(1073742336,Y.d,Y.d,[]),e.Cb(1073742336,T.e,T.e,[]),e.Cb(1073742336,$.b,$.b,[]),e.Cb(1073742336,A.a,A.a,[]),e.Cb(1073742336,J.j,J.j,[[2,J.c],[2,ol.f]]),e.Cb(1073742336,N.e,N.e,[]),e.Cb(1073742336,J.s,J.s,[]),e.Cb(1073742336,x.d,x.d,[]),e.Cb(1073742336,x.c,x.c,[]),e.Cb(1073742336,q.c,q.c,[]),e.Cb(1073742336,al.f,al.f,[]),e.Cb(1073742336,X.c,X.c,[]),e.Cb(1073742336,ll.g,ll.g,[]),e.Cb(1073742336,J.q,J.q,[]),e.Cb(1073742336,J.o,J.o,[]),e.Cb(1073742336,nl.d,nl.d,[]),e.Cb(1073742336,ul.h,ul.h,[]),e.Cb(1073742336,il.e,il.e,[]),e.Cb(1073742336,J.k,J.k,[]),e.Cb(1073742336,rl.a,rl.a,[]),e.Cb(1073742336,cl.c,cl.c,[]),e.Cb(1073742336,tl.i,tl.i,[]),e.Cb(1073742336,tl.f,tl.f,[]),e.Cb(1073742336,bl.c,bl.c,[]),e.Cb(1073742336,dl.b,dl.b,[]),e.Cb(1073742336,el.j,el.j,[]),e.Cb(1073742336,sl.a,sl.a,[]),e.Cb(1073742336,C.r,C.r,[[2,C.x],[2,C.o]]),e.Cb(1073742336,vl,vl,[]),e.Cb(1073742336,m,m,[]),e.Cb(1024,C.m,(function(){return[[{path:"",component:p,canActivate:[pl.a,_l],children:[{path:"",component:s},{path:"edit/:id",component:d}]}]]}),[])])}))}}]);