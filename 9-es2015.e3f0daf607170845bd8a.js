(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{kxqF:function(e,t,n){"use strict";n.r(t);var r=n("ofXK"),o=n("3Pt+"),i=n("quTh"),c=n("5+WD"),a=n("fXoL"),s=n("bTqV"),l=n("NFeN"),d=n("bSwM"),m=n("tyNb");const p=function(e){return["/tasks/current/edit",e]},u=function(e){return{"line-through":e}};function h(e,t){if(1&e){const e=a["\u0275\u0275getCurrentView"]();a["\u0275\u0275elementStart"](0,"div",3),a["\u0275\u0275elementStart"](1,"div",4),a["\u0275\u0275elementStart"](2,"mat-checkbox",5),a["\u0275\u0275listener"]("change",(function(){a["\u0275\u0275restoreView"](e);const n=t.$implicit;return a["\u0275\u0275nextContext"]().toggleCompleteItem.emit(n)})),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](3,"a",6),a["\u0275\u0275elementStart"](4,"div",7),a["\u0275\u0275elementStart"](5,"div",8),a["\u0275\u0275text"](6),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](7,"div",9),a["\u0275\u0275text"](8),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](9,"div",10),a["\u0275\u0275elementStart"](10,"mat-icon"),a["\u0275\u0275text"](11,"drag_handle"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit;a["\u0275\u0275advance"](2),a["\u0275\u0275property"]("checked",e.isComplete),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("routerLink",a["\u0275\u0275pureFunction1"](5,p,e.id)),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngClass",a["\u0275\u0275pureFunction1"](7,u,e.isComplete)),a["\u0275\u0275advance"](2),a["\u0275\u0275textInterpolate"](e.name),a["\u0275\u0275advance"](2),a["\u0275\u0275textInterpolate"](e.description)}}let f=(()=>{class e{constructor(){this.reorderItems=new a.EventEmitter,this.newCurrentTask=new a.EventEmitter,this.toggleCompleteItem=new a.EventEmitter}ngOnInit(){}viewTrackBy(e,t){return t.id}drop(e){console.log("currentIndex",e.currentIndex),console.log("previousIndex",e.previousIndex);const t=[...this.currentTasks];Object(c.e)(t,e.previousIndex,e.currentIndex);const n=t.map(e=>e.id);console.log("aaa",t),console.log("bbb",n),n.forEach((e,t)=>{console.log("X:",e,t)}),this.reorderItems.emit(n)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-list"]],inputs:{currentTasks:"currentTasks"},outputs:{reorderItems:"reorderItems",newCurrentTask:"newCurrentTask",toggleCompleteItem:"toggleCompleteItem"},decls:5,vars:2,consts:[["cdkDropList","",1,"list",3,"cdkDropListDropped"],["cdkDrag","","cdkDragLockAxis","y",4,"ngFor","ngForOf","ngForTrackBy"],["mat-fab","",1,"fab-bottom-right",3,"click"],["cdkDrag","","cdkDragLockAxis","y"],[1,"list-item"],[3,"checked","change"],[3,"routerLink"],[1,"middle",3,"ngClass"],[1,"name"],[1,"description"],["cdkDragHandle","",1,"right"]],template:function(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"div",0),a["\u0275\u0275listener"]("cdkDropListDropped",(function(e){return t.drop(e)})),a["\u0275\u0275template"](1,h,12,9,"div",1),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](2,"button",2),a["\u0275\u0275listener"]("click",(function(){return t.newCurrentTask.emit()})),a["\u0275\u0275elementStart"](3,"mat-icon"),a["\u0275\u0275text"](4,"add"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()),2&e&&(a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngForOf",t.currentTasks)("ngForTrackBy",t.viewTrackBy))},directives:[c.c,r.k,s.a,l.a,c.a,d.a,m.i,r.j,c.b],styles:["[_nghost-%COMP%]{background-color:green;display:flex;flex-grow:1;flex-direction:column}.cdk-drag-preview[_ngcontent-%COMP%]{border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drop-dragging[_ngcontent-%COMP%]   .cdk-drag[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1);background-color:#00f}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .3s cubic-bezier(0,0,.2,1)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.list[_ngcontent-%COMP%]{flex-grow:1;flex-basis:0px;overflow-y:scroll;display:flex;flex-direction:column}.list-item[_ngcontent-%COMP%]{display:flex;flex-wrap:nowrap;padding:10px;border-bottom:1px solid #ccc;box-sizing:border-box;background:#fff}mat-checkbox[_ngcontent-%COMP%]{padding-right:10px}.right[_ngcontent-%COMP%]{background:coral;cursor:move;padding-left:10px}.name[_ngcontent-%COMP%]{color:#000;font-size:medium}.description[_ngcontent-%COMP%]{color:grey;font-size:small;white-space:pre-line}.middle[_ngcontent-%COMP%]{flex-grow:1;padding-right:10px}.line-through[_ngcontent-%COMP%]{-webkit-text-decoration-line:line-through;text-decoration-line:line-through}a[_ngcontent-%COMP%]{text-decoration:none;display:flex;flex-wrap:nowrap;flex-grow:1}.fab-bottom-right[_ngcontent-%COMP%]{position:fixed;right:60px;bottom:16px;z-index:100}"]}),e})(),g=(()=>{class e{constructor(e){this.formBuilder=e}init(e){this.initialData=Object.assign({},e),this.form=this.formBuilder.group({name:[this.initialData.name,o.o.required],description:[this.initialData.description],isComplete:[this.initialData.isComplete]})}checkout(){const e=Object.assign(Object.assign({},this.initialData),this.form.value);return this.form.reset(),e}}return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275inject"](o.c))},e.\u0275prov=a["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac}),e})();var k=n("Wp6s"),v=n("kmnG"),b=n("qFsG"),C=n("ihCf");function x(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"mat-error"),a["\u0275\u0275text"](1," Name is "),a["\u0275\u0275elementStart"](2,"strong"),a["\u0275\u0275text"](3,"required"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]())}let w=(()=>{class e{constructor(e){this.presenter=e,this.cancel=new a.EventEmitter,this.checkout=new a.EventEmitter}get checkoutForm(){return this.presenter.form}ngOnInit(){this.presenter.init(this.todo)}cancelClick(){this.cancel.emit(this.todo)}onSubmit(){const e=this.presenter.checkout();this.checkout.emit(e)}}return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275directiveInject"](g))},e.\u0275cmp=a["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-detail-new"]],inputs:{todo:"todo"},outputs:{cancel:"cancel",checkout:"checkout"},features:[a["\u0275\u0275ProvidersFeature"]([],[g])],decls:25,vars:3,consts:[["novalidate","",3,"formGroup","ngSubmit"],[1,"shipping-card"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],["mat-raised-button","","color","accent","type","button",3,"click"],[1,"row"],[1,"col"],["formControlName","isComplete"],[1,"full-width"],["matInput","","id","name","placeholder","Name","formControlName","name"],[4,"ngIf"],["matInput","","id","description","placeholder","Description","formControlName","description","cdkTextareaAutosize","","cdkAutosizeMinRows","1","cdkAutosizeMaxRows","5"],["autosize","cdkTextareaAutosize"]],template:function(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"form",0),a["\u0275\u0275listener"]("ngSubmit",(function(){return t.onSubmit()})),a["\u0275\u0275elementStart"](1,"mat-card",1),a["\u0275\u0275elementStart"](2,"mat-card-actions"),a["\u0275\u0275elementStart"](3,"button",2),a["\u0275\u0275text"](4," Submit "),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](5,"button",3),a["\u0275\u0275listener"]("click",(function(){return t.cancelClick()})),a["\u0275\u0275text"](6," Cancel "),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](7,"mat-card-header"),a["\u0275\u0275elementStart"](8,"mat-card-title"),a["\u0275\u0275text"](9,"New Current Task"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](10,"mat-card-content"),a["\u0275\u0275elementStart"](11,"div",4),a["\u0275\u0275elementStart"](12,"div",5),a["\u0275\u0275elementStart"](13,"mat-checkbox",6),a["\u0275\u0275text"](14,"Is Complete"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](15,"div",4),a["\u0275\u0275elementStart"](16,"div",5),a["\u0275\u0275elementStart"](17,"mat-form-field",7),a["\u0275\u0275element"](18,"input",8),a["\u0275\u0275template"](19,x,4,0,"mat-error",9),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](20,"div",4),a["\u0275\u0275elementStart"](21,"div",5),a["\u0275\u0275elementStart"](22,"mat-form-field",7),a["\u0275\u0275element"](23,"textarea",10,11),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()),2&e&&(a["\u0275\u0275property"]("formGroup",t.checkoutForm),a["\u0275\u0275advance"](3),a["\u0275\u0275property"]("disabled",!(t.checkoutForm.dirty&&t.checkoutForm.valid)),a["\u0275\u0275advance"](16),a["\u0275\u0275property"]("ngIf",t.checkoutForm.controls.name.hasError("required")))},directives:[o.p,o.l,o.g,k.a,k.b,s.a,k.d,k.f,k.c,d.a,o.k,o.f,v.b,b.a,o.b,r.l,C.b,v.a],styles:[".full-width[_ngcontent-%COMP%]{width:100%}.shipping-card[_ngcontent-%COMP%]{margin:20px auto}.row[_ngcontent-%COMP%]{display:flex;flex-direction:row}.col[_ngcontent-%COMP%]{flex:1;margin-right:20px}"]}),e})();var S=n("XNiG"),E=n("1G5W"),y=n("VEkB");let O=(()=>{class e{constructor(e){this.formBuilder=e,this.unsubscribe=new S.a}get completedTimestampControl(){return this.form.get("completedTimestamp")}get isCompleteControl(){return this.form.get("isComplete")}init(e){this.initialData=Object.assign({},e),this.form=this.formBuilder.group({name:[this.initialData.name,o.o.required],description:[this.initialData.description],isComplete:[this.initialData.isComplete],completedTimestamp:[this.initialData.completedTimestamp]}),this.isCompleteControl.valueChanges.pipe(Object(E.a)(this.unsubscribe)).subscribe(e=>{this.completedTimestampControl.setValue(Object(y.a)(e))})}checkout(){const e=Object.assign(Object.assign({},this.initialData),this.form.value);return this.form.reset(),e}ngOnDestroy(){this.unsubscribe.next(),this.unsubscribe.complete()}}return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275inject"](o.c))},e.\u0275prov=a["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac}),e})();function I(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"mat-error"),a["\u0275\u0275text"](1," Name is "),a["\u0275\u0275elementStart"](2,"strong"),a["\u0275\u0275text"](3,"required"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]())}let T=(()=>{class e{constructor(e){this.presenter=e,this.cancel=new a.EventEmitter,this.remove=new a.EventEmitter,this.checkout=new a.EventEmitter}get checkoutForm(){return this.presenter.form}ngOnInit(){this.presenter.init(this.todo)}cancelClick(){this.cancel.emit(this.todo)}removeClick(){this.remove.emit(this.todo)}onSubmit(){const e=this.presenter.checkout();this.checkout.emit(e)}}return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275directiveInject"](O))},e.\u0275cmp=a["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-detail-edit"]],inputs:{todo:"todo"},outputs:{cancel:"cancel",remove:"remove",checkout:"checkout"},features:[a["\u0275\u0275ProvidersFeature"]([],[O])],decls:27,vars:3,consts:[["novalidate","",3,"formGroup","ngSubmit"],[1,"shipping-card"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],["mat-raised-button","","color","accent","type","button",3,"click"],[1,"row"],[1,"col"],["formControlName","isComplete"],[1,"full-width"],["matInput","","id","name","placeholder","Name","formControlName","name"],[4,"ngIf"],["matInput","","id","description","placeholder","Description","formControlName","description","cdkTextareaAutosize","","cdkAutosizeMinRows","1","cdkAutosizeMaxRows","5"],["autosize","cdkTextareaAutosize"]],template:function(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"form",0),a["\u0275\u0275listener"]("ngSubmit",(function(){return t.onSubmit()})),a["\u0275\u0275elementStart"](1,"mat-card",1),a["\u0275\u0275elementStart"](2,"mat-card-actions"),a["\u0275\u0275elementStart"](3,"button",2),a["\u0275\u0275text"](4," Submit "),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](5,"button",3),a["\u0275\u0275listener"]("click",(function(){return t.cancelClick()})),a["\u0275\u0275text"](6," Cancel "),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](7,"button",3),a["\u0275\u0275listener"]("click",(function(){return t.removeClick()})),a["\u0275\u0275text"](8," Remove "),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](9,"mat-card-header"),a["\u0275\u0275elementStart"](10,"mat-card-title"),a["\u0275\u0275text"](11,"Edit Current Task"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](12,"mat-card-content"),a["\u0275\u0275elementStart"](13,"div",4),a["\u0275\u0275elementStart"](14,"div",5),a["\u0275\u0275elementStart"](15,"mat-checkbox",6),a["\u0275\u0275text"](16,"Is Complete"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](17,"div",4),a["\u0275\u0275elementStart"](18,"div",5),a["\u0275\u0275elementStart"](19,"mat-form-field",7),a["\u0275\u0275element"](20,"input",8),a["\u0275\u0275template"](21,I,4,0,"mat-error",9),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](22,"div",4),a["\u0275\u0275elementStart"](23,"div",5),a["\u0275\u0275elementStart"](24,"mat-form-field",7),a["\u0275\u0275element"](25,"textarea",10,11),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()),2&e&&(a["\u0275\u0275property"]("formGroup",t.checkoutForm),a["\u0275\u0275advance"](3),a["\u0275\u0275property"]("disabled",!(t.checkoutForm.dirty&&t.checkoutForm.valid)),a["\u0275\u0275advance"](18),a["\u0275\u0275property"]("ngIf",t.checkoutForm.controls.name.hasError("required")))},directives:[o.p,o.l,o.g,k.a,k.b,s.a,k.d,k.f,k.c,d.a,o.k,o.f,v.b,b.a,o.b,r.l,C.b,v.a],styles:[".full-width[_ngcontent-%COMP%]{width:100%}.shipping-card[_ngcontent-%COMP%]{margin:20px auto}.row[_ngcontent-%COMP%]{display:flex;flex-direction:row}.col[_ngcontent-%COMP%]{flex:1;margin-right:20px}"]}),e})();var j=n("kt0X"),M=n("E7rW"),D=n("9Odd");let F=(()=>{class e{constructor(e){this.store=e,this.task$=e.pipe(Object(j.select)(D.b.selectCurrentTaskFromRoute))}ngOnInit(){}viewCancelled(e){this.store.dispatch(M.e.cancelled({currentTask:e}))}viewRemoved(e){this.store.dispatch(M.e.removed({currentTask:e}))}viewSaved(e){this.store.dispatch(M.e.saved({currentTask:e}))}}return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275directiveInject"](j.Store))},e.\u0275cmp=a["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-detail-edit-page"]],decls:6,vars:8,consts:[[3,"todo","cancel","remove","checkout"]],template:function(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"app-current-task-detail-edit",0),a["\u0275\u0275listener"]("cancel",(function(e){return t.viewCancelled(e)}))("remove",(function(e){return t.viewRemoved(e)}))("checkout",(function(e){return t.viewSaved(e)})),a["\u0275\u0275pipe"](1,"async"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](2,"pre"),a["\u0275\u0275text"](3),a["\u0275\u0275pipe"](4,"json"),a["\u0275\u0275pipe"](5,"async"),a["\u0275\u0275elementEnd"]()),2&e&&(a["\u0275\u0275property"]("todo",a["\u0275\u0275pipeBind1"](1,2,t.task$)),a["\u0275\u0275advance"](3),a["\u0275\u0275textInterpolate1"]("Selected Current Task: ",a["\u0275\u0275pipeBind1"](4,4,a["\u0275\u0275pipeBind1"](5,6,t.task$)),"\n"))},directives:[T],pipes:[r.b,r.f],styles:[""],changeDetection:0}),e})();var P=n("STbY");let _=(()=>{class e{constructor(e){this.store=e,this.currentTasks$=e.pipe(Object(j.select)(D.b.selectCurrentTasksAll))}ngOnInit(){this.store.dispatch(M.g.enter())}reorderItems(e){this.store.dispatch(M.m.reorderList({ids:e}))}viewClearCompleted(){this.store.dispatch(M.g.clearCompleted())}viewNewCurrentTask(){this.store.dispatch(M.g.newCurrentTask())}toggleCompleteItem(e){const t=Object(y.e)(e,!e.isComplete);this.store.dispatch(M.g.saveItem({currentTask:t}))}}return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275directiveInject"](j.Store))},e.\u0275cmp=a["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-tasks-page"]],decls:9,vars:4,consts:[[3,"currentTasks","reorderItems","newCurrentTask","toggleCompleteItem"],["mat-icon-button","",1,"more-vert-menu",3,"matMenuTriggerFor"],["appMenu","matMenu"],["mat-menu-item","",3,"click"]],template:function(e,t){if(1&e&&(a["\u0275\u0275elementStart"](0,"app-current-task-list",0),a["\u0275\u0275listener"]("reorderItems",(function(e){return t.reorderItems(e)}))("newCurrentTask",(function(){return t.viewNewCurrentTask()}))("toggleCompleteItem",(function(e){return t.toggleCompleteItem(e)})),a["\u0275\u0275pipe"](1,"async"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](2,"button",1),a["\u0275\u0275elementStart"](3,"mat-icon"),a["\u0275\u0275text"](4,"more_vert"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](5,"mat-menu",null,2),a["\u0275\u0275elementStart"](7,"button",3),a["\u0275\u0275listener"]("click",(function(){return t.viewClearCompleted()})),a["\u0275\u0275text"](8,"Clear Completed"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()),2&e){const e=a["\u0275\u0275reference"](6);a["\u0275\u0275property"]("currentTasks",a["\u0275\u0275pipeBind1"](1,2,t.currentTasks$)),a["\u0275\u0275advance"](2),a["\u0275\u0275property"]("matMenuTriggerFor",e)}},directives:[f,s.a,P.c,l.a,P.d,P.a],pipes:[r.b],styles:["[_nghost-%COMP%]{background-color:green;display:flex;flex-grow:1;flex-direction:column}.more-vert-menu[_ngcontent-%COMP%]{color:#fff;position:fixed;right:10px;top:10px;z-index:100}"],changeDetection:0}),e})(),N=(()=>{class e{constructor(e){this.store=e,this.task=Object(y.c)()}ngOnInit(){}viewCancelled(e){this.store.dispatch(M.f.cancelled())}viewSaved(e){this.store.dispatch(M.f.saved({currentTask:e}))}}return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275directiveInject"](j.Store))},e.\u0275cmp=a["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-detail-new-page"]],decls:4,vars:4,consts:[[3,"todo","cancel","checkout"]],template:function(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"app-current-task-detail-new",0),a["\u0275\u0275listener"]("cancel",(function(e){return t.viewCancelled(e)}))("checkout",(function(e){return t.viewSaved(e)})),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](1,"pre"),a["\u0275\u0275text"](2),a["\u0275\u0275pipe"](3,"json"),a["\u0275\u0275elementEnd"]()),2&e&&(a["\u0275\u0275property"]("todo",t.task),a["\u0275\u0275advance"](2),a["\u0275\u0275textInterpolate1"]("Selected Current Task: ",a["\u0275\u0275pipeBind1"](3,2,t.task),"\n"))},directives:[w],pipes:[r.f],styles:[""],changeDetection:0}),e})(),z=(()=>{class e{constructor(e){this.store=e}ngOnDestroy(){this.store.dispatch(M.h.destroyed())}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275directiveInject"](j.Store))},e.\u0275cmp=a["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-tasks-root"]],decls:1,vars:0,template:function(e,t){1&e&&a["\u0275\u0275element"](0,"router-outlet")},directives:[m.k],styles:["[_nghost-%COMP%]{background-color:red;display:flex;flex-grow:1;flex-direction:column}"],changeDetection:0}),e})();var A=n("DKe4"),L=n("LRne"),B=n("vkgz"),q=n("eIep"),R=n("pLZG"),G=n("SxV6"),$=n("IzEk"),V=n("fM1L");const X=[{path:"",component:z,canActivate:[A.a,(()=>{class e{constructor(e){this.store=e}canActivate(){return this.waitForAuth().pipe(Object(B.a)(e=>console.log("waitForAuth - complete>",e)),Object(q.a)(()=>this.waitForCurrentTasksToLoad().pipe(Object(q.a)(()=>Object(L.a)(!0)))))}waitForAuth(){return this.store.pipe(Object(j.select)(V.c.selectUser),Object(R.a)(e=>!!e),Object(G.a)())}waitForCurrentTasksToLoad(){return this.store.pipe(Object(j.select)(D.b.selectCurrentTasksLoaded),Object(B.a)(e=>{e||(console.log("waitForCurrentTasksToLoad:user and taskid?"),this.store.dispatch(M.i.loadData()))}),Object(R.a)(e=>e),Object($.a)(1))}}return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275inject"](j.Store))},e.\u0275prov=a["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()],children:[{path:"",component:_},{path:"edit/:id",component:F},{path:"new",component:N}]}];let W=(()=>{class e{}return e.\u0275mod=a["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=a["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[m.j.forChild(X)],m.j]}),e})();const J=[T,w,f],K=[F,N,_,z];let H=(()=>{class e{}return e.\u0275mod=a["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=a["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[r.c,o.n,i.a,W]]}),e})();n.d(t,"COMPONENTS",(function(){return J})),n.d(t,"CONTAINERS",(function(){return K})),n.d(t,"CurrentTasksModule",(function(){return H}))}}]);