(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{kxqF:function(e,t,n){"use strict";n.r(t);var r=n("ofXK"),o=n("fXoL"),i=n("3Pt+"),c=n("quTh"),a=n("aCXV"),s=n("Xlwt"),l=n("TY1r"),m=n("SSqQ"),d=n("tyNb");const u=["cdkDropList","",1,"list",3,"cdkDropListDropped"],p=["cdkDrag","","cdkDragLockAxis","y",4,"ngFor","ngForOf","ngForTrackBy"],f=["mat-fab","",1,"fab-bottom-right",3,"click"],b=["cdkDrag","","cdkDragLockAxis","y"],h=[1,"list-item"],g=[3,"checked","change"],k=[3,"routerLink"],x=[1,"middle",3,"ngClass"],w=[1,"name"],C=[1,"description"],v=["cdkDragHandle","",1,"right"],S=function(e){return["/tasks/current/edit",e]},E=function(e){return{"line-through":e}};function y(e,t){if(1&e){const e=o["\u0275\u0275getCurrentView"]();o["\u0275\u0275elementStart"](0,"div",b),o["\u0275\u0275elementStart"](1,"div",h),o["\u0275\u0275elementStart"](2,"mat-checkbox",g),o["\u0275\u0275listener"]("change",(function(n){o["\u0275\u0275restoreView"](e);const r=t.$implicit;return o["\u0275\u0275nextContext"]().toggleCompleteItem.emit(r)})),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](3,"a",k),o["\u0275\u0275elementStart"](4,"div",x),o["\u0275\u0275elementStart"](5,"div",w),o["\u0275\u0275text"](6),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](7,"div",C),o["\u0275\u0275text"](8),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](9,"div",v),o["\u0275\u0275elementStart"](10,"mat-icon"),o["\u0275\u0275text"](11,"drag_handle"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit;o["\u0275\u0275select"](2),o["\u0275\u0275property"]("checked",e.isComplete),o["\u0275\u0275select"](3),o["\u0275\u0275property"]("routerLink",o["\u0275\u0275pureFunction1"](5,S,e.id)),o["\u0275\u0275select"](4),o["\u0275\u0275property"]("ngClass",o["\u0275\u0275pureFunction1"](7,E,e.isComplete)),o["\u0275\u0275select"](6),o["\u0275\u0275textInterpolate"](e.name),o["\u0275\u0275select"](8),o["\u0275\u0275textInterpolate"](e.description)}}let I=(()=>{class e{constructor(){this.reorderItems=new o.EventEmitter,this.newCurrentTask=new o.EventEmitter,this.toggleCompleteItem=new o.EventEmitter}ngOnInit(){}viewTrackBy(e,t){return t.id}drop(e){console.log("currentIndex",e.currentIndex),console.log("previousIndex",e.previousIndex);const t=[...this.currentTasks];Object(a.e)(t,e.previousIndex,e.currentIndex);const n=t.map(e=>e.id);console.log("aaa",t),console.log("bbb",n),n.forEach((e,t)=>{console.log("X:",e,t)}),this.reorderItems.emit(n)}}return e.ngComponentDef=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-list"]],factory:function(t){return new(t||e)},inputs:{currentTasks:"currentTasks"},outputs:{reorderItems:"reorderItems",newCurrentTask:"newCurrentTask",toggleCompleteItem:"toggleCompleteItem"},consts:5,vars:2,template:function(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"div",u),o["\u0275\u0275listener"]("cdkDropListDropped",(function(e){return t.drop(e)})),o["\u0275\u0275template"](1,y,12,9,"div",p),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](2,"button",f),o["\u0275\u0275listener"]("click",(function(e){return t.newCurrentTask.emit()})),o["\u0275\u0275elementStart"](3,"mat-icon"),o["\u0275\u0275text"](4,"add"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()),2&e&&(o["\u0275\u0275select"](1),o["\u0275\u0275property"]("ngForOf",t.currentTasks)("ngForTrackBy",t.viewTrackBy))},directives:[a.c,r.k,s.a,l.a,a.a,m.a,d.i,r.j,a.b],styles:["[_nghost-%COMP%]{background-color:green;display:-webkit-box;display:flex;-webkit-box-flex:1;flex-grow:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.cdk-drag-preview[_ngcontent-%COMP%]{border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drop-dragging[_ngcontent-%COMP%]   .cdk-drag[_ngcontent-%COMP%]{-webkit-transition:-webkit-transform 250ms cubic-bezier(0,0,.2,1);transition:-webkit-transform 250ms cubic-bezier(0,0,.2,1);transition:transform 250ms cubic-bezier(0,0,.2,1);transition:transform 250ms cubic-bezier(0,0,.2,1),-webkit-transform 250ms cubic-bezier(0,0,.2,1);background-color:#00f}.cdk-drag-animating[_ngcontent-%COMP%]{-webkit-transition:-webkit-transform .3s cubic-bezier(0,0,.2,1);transition:-webkit-transform .3s cubic-bezier(0,0,.2,1);transition:transform .3s cubic-bezier(0,0,.2,1);transition:transform .3s cubic-bezier(0,0,.2,1),-webkit-transform .3s cubic-bezier(0,0,.2,1)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.list[_ngcontent-%COMP%]{-webkit-box-flex:1;flex-grow:1;flex-basis:0px;overflow-y:scroll;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.list-item[_ngcontent-%COMP%]{display:-webkit-box;display:flex;flex-wrap:nowrap;padding:10px;border-bottom:1px solid #ccc;box-sizing:border-box;background:#fff}mat-checkbox[_ngcontent-%COMP%]{padding-right:10px}.right[_ngcontent-%COMP%]{background:coral;cursor:move;padding-left:10px}.name[_ngcontent-%COMP%]{color:#000;font-size:medium}.description[_ngcontent-%COMP%]{color:gray;font-size:small;white-space:pre-line}.middle[_ngcontent-%COMP%]{-webkit-box-flex:1;flex-grow:1;padding-right:10px}.line-through[_ngcontent-%COMP%]{-webkit-text-decoration-line:line-through;text-decoration-line:line-through}a[_ngcontent-%COMP%]{text-decoration:none;display:-webkit-box;display:flex;flex-wrap:nowrap;-webkit-box-flex:1;flex-grow:1}.fab-bottom-right[_ngcontent-%COMP%]{position:fixed;right:60px;bottom:16px;z-index:100}"]}),e})(),O=(()=>{class e{constructor(e){this.formBuilder=e}init(e){this.initialData=Object.assign({},e),this.form=this.formBuilder.group({name:[this.initialData.name,i.o.required],description:[this.initialData.description],isComplete:[this.initialData.isComplete]})}checkout(){const e=Object.assign({},this.initialData,this.form.value);return this.form.reset(),e}}return e.ngInjectableDef=o["\u0275\u0275defineInjectable"]({token:e,factory:function(t){return new(t||e)(o["\u0275\u0275inject"](i.c))},providedIn:null}),e})();var T=n("MSSf"),j=n("IRfi"),D=n("A2Vd"),M=n("3aqf");const P=["novalidate","",3,"formGroup","ngSubmit"],z=[1,"shipping-card"],_=["mat-raised-button","","color","primary","type","submit",3,"disabled"],F=["mat-raised-button","","color","accent","type","button",3,"click"],N=[1,"row"],A=[1,"col"],L=["formControlName","isComplete"],B=[1,"full-width"],R=["matInput","","id","name","placeholder","Name","formControlName","name"],q=[4,"ngIf"],G=["matInput","","id","description","placeholder","Description","formControlName","description","cdkTextareaAutosize","","cdkAutosizeMinRows","1","cdkAutosizeMaxRows","5"],V=["autosize","cdkTextareaAutosize"];function X(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"mat-error"),o["\u0275\u0275text"](1," Name is "),o["\u0275\u0275elementStart"](2,"strong"),o["\u0275\u0275text"](3,"required"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]())}let $=(()=>{class e{constructor(e){this.presenter=e,this.cancel=new o.EventEmitter,this.checkout=new o.EventEmitter}get checkoutForm(){return this.presenter.form}ngOnInit(){this.presenter.init(this.todo)}cancelClick(){this.cancel.emit(this.todo)}onSubmit(){const e=this.presenter.checkout();this.checkout.emit(e)}}return e.ngComponentDef=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-detail-new"]],factory:function(t){return new(t||e)(o["\u0275\u0275directiveInject"](O))},inputs:{todo:"todo"},outputs:{cancel:"cancel",checkout:"checkout"},features:[o["\u0275\u0275ProvidersFeature"]([],[O])],consts:25,vars:3,template:function(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"form",P),o["\u0275\u0275listener"]("ngSubmit",(function(e){return t.onSubmit()})),o["\u0275\u0275elementStart"](1,"mat-card",z),o["\u0275\u0275elementStart"](2,"mat-card-actions"),o["\u0275\u0275elementStart"](3,"button",_),o["\u0275\u0275text"](4," Submit "),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](5,"button",F),o["\u0275\u0275listener"]("click",(function(e){return t.cancelClick()})),o["\u0275\u0275text"](6," Cancel "),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](7,"mat-card-header"),o["\u0275\u0275elementStart"](8,"mat-card-title"),o["\u0275\u0275text"](9,"New Current Task"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](10,"mat-card-content"),o["\u0275\u0275elementStart"](11,"div",N),o["\u0275\u0275elementStart"](12,"div",A),o["\u0275\u0275elementStart"](13,"mat-checkbox",L),o["\u0275\u0275text"](14,"Is Complete"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](15,"div",N),o["\u0275\u0275elementStart"](16,"div",A),o["\u0275\u0275elementStart"](17,"mat-form-field",B),o["\u0275\u0275element"](18,"input",R),o["\u0275\u0275template"](19,X,4,0,"mat-error",q),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](20,"div",N),o["\u0275\u0275elementStart"](21,"div",A),o["\u0275\u0275elementStart"](22,"mat-form-field",B),o["\u0275\u0275element"](23,"textarea",G,V),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()),2&e&&(o["\u0275\u0275property"]("formGroup",t.checkoutForm),o["\u0275\u0275select"](3),o["\u0275\u0275property"]("disabled",!(t.checkoutForm.dirty&&t.checkoutForm.valid)),o["\u0275\u0275select"](19),o["\u0275\u0275property"]("ngIf",t.checkoutForm.controls.name.hasError("required")))},directives:[i.p,i.l,i.g,T.a,T.b,s.a,T.d,T.f,T.c,m.a,i.k,i.f,j.b,D.a,i.b,r.l,M.b,j.a],styles:[".full-width[_ngcontent-%COMP%]{width:100%}.shipping-card[_ngcontent-%COMP%]{margin:20px auto}.row[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.col[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1;margin-right:20px}"]}),e})();var J=n("XNiG"),K=n("1G5W"),W=n("VEkB");let H=(()=>{class e{constructor(e){this.formBuilder=e,this.unsubscribe=new J.a}get completedTimestampControl(){return this.form.get("completedTimestamp")}get isCompleteControl(){return this.form.get("isComplete")}init(e){this.initialData=Object.assign({},e),this.form=this.formBuilder.group({name:[this.initialData.name,i.o.required],description:[this.initialData.description],isComplete:[this.initialData.isComplete],completedTimestamp:[this.initialData.completedTimestamp]}),this.isCompleteControl.valueChanges.pipe(Object(K.a)(this.unsubscribe)).subscribe(e=>{this.completedTimestampControl.setValue(Object(W.a)(e))})}checkout(){const e=Object.assign({},this.initialData,this.form.value);return this.form.reset(),e}ngOnDestroy(){this.unsubscribe.next(),this.unsubscribe.complete()}}return e.ngInjectableDef=o["\u0275\u0275defineInjectable"]({token:e,factory:function(t){return new(t||e)(o["\u0275\u0275inject"](i.c))},providedIn:null}),e})();const Q=["novalidate","",3,"formGroup","ngSubmit"],U=[1,"shipping-card"],Y=["mat-raised-button","","color","primary","type","submit",3,"disabled"],Z=["mat-raised-button","","color","accent","type","button",3,"click"],ee=[1,"row"],te=[1,"col"],ne=["formControlName","isComplete"],re=[1,"full-width"],oe=["matInput","","id","name","placeholder","Name","formControlName","name"],ie=[4,"ngIf"],ce=["matInput","","id","description","placeholder","Description","formControlName","description","cdkTextareaAutosize","","cdkAutosizeMinRows","1","cdkAutosizeMaxRows","5"],ae=["autosize","cdkTextareaAutosize"];function se(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"mat-error"),o["\u0275\u0275text"](1," Name is "),o["\u0275\u0275elementStart"](2,"strong"),o["\u0275\u0275text"](3,"required"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]())}let le=(()=>{class e{constructor(e){this.presenter=e,this.cancel=new o.EventEmitter,this.remove=new o.EventEmitter,this.checkout=new o.EventEmitter}get checkoutForm(){return this.presenter.form}ngOnInit(){this.presenter.init(this.todo)}cancelClick(){this.cancel.emit(this.todo)}removeClick(){this.remove.emit(this.todo)}onSubmit(){const e=this.presenter.checkout();this.checkout.emit(e)}}return e.ngComponentDef=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-detail-edit"]],factory:function(t){return new(t||e)(o["\u0275\u0275directiveInject"](H))},inputs:{todo:"todo"},outputs:{cancel:"cancel",remove:"remove",checkout:"checkout"},features:[o["\u0275\u0275ProvidersFeature"]([],[H])],consts:27,vars:3,template:function(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"form",Q),o["\u0275\u0275listener"]("ngSubmit",(function(e){return t.onSubmit()})),o["\u0275\u0275elementStart"](1,"mat-card",U),o["\u0275\u0275elementStart"](2,"mat-card-actions"),o["\u0275\u0275elementStart"](3,"button",Y),o["\u0275\u0275text"](4," Submit "),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](5,"button",Z),o["\u0275\u0275listener"]("click",(function(e){return t.cancelClick()})),o["\u0275\u0275text"](6," Cancel "),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](7,"button",Z),o["\u0275\u0275listener"]("click",(function(e){return t.removeClick()})),o["\u0275\u0275text"](8," Remove "),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](9,"mat-card-header"),o["\u0275\u0275elementStart"](10,"mat-card-title"),o["\u0275\u0275text"](11,"Edit Current Task"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](12,"mat-card-content"),o["\u0275\u0275elementStart"](13,"div",ee),o["\u0275\u0275elementStart"](14,"div",te),o["\u0275\u0275elementStart"](15,"mat-checkbox",ne),o["\u0275\u0275text"](16,"Is Complete"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](17,"div",ee),o["\u0275\u0275elementStart"](18,"div",te),o["\u0275\u0275elementStart"](19,"mat-form-field",re),o["\u0275\u0275element"](20,"input",oe),o["\u0275\u0275template"](21,se,4,0,"mat-error",ie),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](22,"div",ee),o["\u0275\u0275elementStart"](23,"div",te),o["\u0275\u0275elementStart"](24,"mat-form-field",re),o["\u0275\u0275element"](25,"textarea",ce,ae),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()),2&e&&(o["\u0275\u0275property"]("formGroup",t.checkoutForm),o["\u0275\u0275select"](3),o["\u0275\u0275property"]("disabled",!(t.checkoutForm.dirty&&t.checkoutForm.valid)),o["\u0275\u0275select"](21),o["\u0275\u0275property"]("ngIf",t.checkoutForm.controls.name.hasError("required")))},directives:[i.p,i.l,i.g,T.a,T.b,s.a,T.d,T.f,T.c,m.a,i.k,i.f,j.b,D.a,i.b,r.l,M.b,j.a],styles:[".full-width[_ngcontent-%COMP%]{width:100%}.shipping-card[_ngcontent-%COMP%]{margin:20px auto}.row[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.col[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1;margin-right:20px}"]}),e})();var me=n("kt0X"),de=n("E7rW"),ue=n("9Odd");const pe=[3,"todo","cancel","remove","checkout"];let fe=(()=>{class e{constructor(e){this.store=e,this.task$=e.pipe(Object(me.select)(ue.b.selectCurrentTaskFromRoute))}ngOnInit(){}viewCancelled(e){this.store.dispatch(de.e.cancelled({currentTask:e}))}viewRemoved(e){this.store.dispatch(de.e.removed({currentTask:e}))}viewSaved(e){this.store.dispatch(de.e.saved({currentTask:e}))}}return e.ngComponentDef=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-detail-edit-page"]],factory:function(t){return new(t||e)(o["\u0275\u0275directiveInject"](me.Store))},consts:6,vars:8,template:function(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"app-current-task-detail-edit",pe),o["\u0275\u0275listener"]("cancel",(function(e){return t.viewCancelled(e)})),o["\u0275\u0275listener"]("remove",(function(e){return t.viewRemoved(e)})),o["\u0275\u0275listener"]("checkout",(function(e){return t.viewSaved(e)})),o["\u0275\u0275pipe"](1,"async"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](2,"pre"),o["\u0275\u0275text"](3),o["\u0275\u0275pipe"](4,"json"),o["\u0275\u0275pipe"](5,"async"),o["\u0275\u0275elementEnd"]()),2&e&&(o["\u0275\u0275property"]("todo",o["\u0275\u0275pipeBind1"](1,2,t.task$)),o["\u0275\u0275select"](3),o["\u0275\u0275textInterpolate1"]("Selected Current Task: ",o["\u0275\u0275pipeBind1"](4,4,o["\u0275\u0275pipeBind1"](5,6,t.task$)),"\n"))},directives:[le],pipes:[r.b,r.f],styles:[""],changeDetection:0}),e})();var be=n("1OTw");const he=[3,"currentTasks","reorderItems","newCurrentTask","toggleCompleteItem"],ge=["mat-icon-button","",1,"more-vert-menu",3,"matMenuTriggerFor"],ke=["appMenu","matMenu"],xe=["mat-menu-item","",3,"click"];let we=(()=>{class e{constructor(e){this.store=e,this.currentTasks$=e.pipe(Object(me.select)(ue.b.selectCurrentTasksAll))}ngOnInit(){this.store.dispatch(de.g.enter())}reorderItems(e){this.store.dispatch(de.m.reorderList({ids:e}))}viewClearCompleted(){this.store.dispatch(de.g.clearCompleted())}viewNewCurrentTask(){this.store.dispatch(de.g.newCurrentTask())}toggleCompleteItem(e){const t=Object(W.e)(e,!e.isComplete);this.store.dispatch(de.g.saveItem({currentTask:t}))}}return e.ngComponentDef=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-tasks-page"]],factory:function(t){return new(t||e)(o["\u0275\u0275directiveInject"](me.Store))},consts:9,vars:4,template:function(e,t){if(1&e&&(o["\u0275\u0275elementStart"](0,"app-current-task-list",he),o["\u0275\u0275listener"]("reorderItems",(function(e){return t.reorderItems(e)})),o["\u0275\u0275listener"]("newCurrentTask",(function(e){return t.viewNewCurrentTask()})),o["\u0275\u0275listener"]("toggleCompleteItem",(function(e){return t.toggleCompleteItem(e)})),o["\u0275\u0275pipe"](1,"async"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](2,"button",ge),o["\u0275\u0275elementStart"](3,"mat-icon"),o["\u0275\u0275text"](4,"more_vert"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](5,"mat-menu",null,ke),o["\u0275\u0275elementStart"](7,"button",xe),o["\u0275\u0275listener"]("click",(function(e){return t.viewClearCompleted()})),o["\u0275\u0275text"](8,"Clear Completed"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()),2&e){const e=o["\u0275\u0275reference"](6);o["\u0275\u0275property"]("currentTasks",o["\u0275\u0275pipeBind1"](1,2,t.currentTasks$)),o["\u0275\u0275select"](2),o["\u0275\u0275property"]("matMenuTriggerFor",e)}},directives:[I,s.a,be.c,l.a,be.d,be.a],pipes:[r.b],styles:["[_nghost-%COMP%]{background-color:green;display:-webkit-box;display:flex;-webkit-box-flex:1;flex-grow:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.more-vert-menu[_ngcontent-%COMP%]{color:#fff;position:fixed;right:10px;top:10px;z-index:100}"],changeDetection:0}),e})();const Ce=[3,"todo","cancel","checkout"];let ve=(()=>{class e{constructor(e){this.store=e,this.task=Object(W.c)()}ngOnInit(){}viewCancelled(e){this.store.dispatch(de.f.cancelled())}viewSaved(e){this.store.dispatch(de.f.saved({currentTask:e}))}}return e.ngComponentDef=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-detail-new-page"]],factory:function(t){return new(t||e)(o["\u0275\u0275directiveInject"](me.Store))},consts:4,vars:4,template:function(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"app-current-task-detail-new",Ce),o["\u0275\u0275listener"]("cancel",(function(e){return t.viewCancelled(e)})),o["\u0275\u0275listener"]("checkout",(function(e){return t.viewSaved(e)})),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](1,"pre"),o["\u0275\u0275text"](2),o["\u0275\u0275pipe"](3,"json"),o["\u0275\u0275elementEnd"]()),2&e&&(o["\u0275\u0275property"]("todo",t.task),o["\u0275\u0275select"](2),o["\u0275\u0275textInterpolate1"]("Selected Current Task: ",o["\u0275\u0275pipeBind1"](3,2,t.task),"\n"))},directives:[$],pipes:[r.f],styles:[""],changeDetection:0}),e})(),Se=(()=>{class e{constructor(e){this.store=e}ngOnDestroy(){this.store.dispatch(de.h.destroyed())}ngOnInit(){}}return e.ngComponentDef=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-tasks-root"]],factory:function(t){return new(t||e)(o["\u0275\u0275directiveInject"](me.Store))},consts:1,vars:0,template:function(e,t){1&e&&o["\u0275\u0275element"](0,"router-outlet")},directives:[d.k],styles:["[_nghost-%COMP%]{background-color:red;display:-webkit-box;display:flex;-webkit-box-flex:1;flex-grow:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}"],changeDetection:0}),e})();var Ee=n("DKe4"),ye=n("LRne"),Ie=n("eIep"),Oe=n("pLZG"),Te=n("SxV6"),je=n("vkgz"),De=n("IzEk"),Me=n("fM1L");const Pe=[{path:"",component:Se,canActivate:[Ee.a,(()=>{class e{constructor(e){this.store=e}canActivate(){return this.waitForAuth().pipe(Object(Ie.a)(()=>this.waitForCurrentTasksToLoad().pipe(Object(Ie.a)(()=>Object(ye.a)(!0)))))}waitForAuth(){return this.store.pipe(Object(me.select)(Me.c.selectUser),Object(Oe.a)(e=>!!e),Object(Te.a)())}waitForCurrentTasksToLoad(){return this.store.pipe(Object(me.select)(ue.b.selectCurrentTasksLoaded),Object(je.a)(e=>{e||this.store.dispatch(de.i.loadData())}),Object(Oe.a)(e=>e),Object(De.a)(1))}}return e.ngInjectableDef=o["\u0275\u0275defineInjectable"]({token:e,factory:function(t){return new(t||e)(o["\u0275\u0275inject"](me.Store))},providedIn:"root"}),e})()],children:[{path:"",component:we},{path:"edit/:id",component:fe},{path:"new",component:ve}]}];let ze=(()=>{class e{}return e.ngModuleDef=o["\u0275\u0275defineNgModule"]({type:e}),e.ngInjectorDef=o["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[d.j.forChild(Pe)],d.j]}),e})();d.j.forChild(Pe);const _e=[le,$,I],Fe=[fe,ve,we,Se];let Ne=(()=>{class e{}return e.ngModuleDef=o["\u0275\u0275defineNgModule"]({type:e}),e.ngInjectorDef=o["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[r.c,i.n,c.a,ze]]}),e})();n.d(t,"COMPONENTS",(function(){return _e})),n.d(t,"CONTAINERS",(function(){return Fe})),n.d(t,"CurrentTasksModule",(function(){return Ne}))}}]);