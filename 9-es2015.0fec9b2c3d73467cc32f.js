(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{kxqF:function(e,t,n){"use strict";n.r(t),n.d(t,"COMPONENTS",(function(){return Z})),n.d(t,"CONTAINERS",(function(){return Q})),n.d(t,"CurrentTasksModule",(function(){return ee}));var r={};n.r(r),n.d(r,"currentTaskNotFound",(function(){return H}));var o=n("ofXK"),i=n("3Pt+"),a=n("quTh"),c=n("5+WD"),s=n("fXoL"),l=n("bTqV"),d=n("NFeN"),m=n("bSwM"),u=n("tyNb");const p=function(e){return["/tasks/current/edit",e]},h=function(e){return{"line-through":e}};function f(e,t){if(1&e){const e=s["\u0275\u0275getCurrentView"]();s["\u0275\u0275elementStart"](0,"div",3),s["\u0275\u0275elementStart"](1,"div",4),s["\u0275\u0275elementStart"](2,"mat-checkbox",5),s["\u0275\u0275listener"]("change",(function(){s["\u0275\u0275restoreView"](e);const n=t.$implicit;return s["\u0275\u0275nextContext"]().toggleCompleteItem.emit(n)})),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](3,"a",6),s["\u0275\u0275elementStart"](4,"div",7),s["\u0275\u0275elementStart"](5,"div",8),s["\u0275\u0275text"](6),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](7,"div",9),s["\u0275\u0275text"](8),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](9,"div",10),s["\u0275\u0275elementStart"](10,"mat-icon"),s["\u0275\u0275text"](11,"drag_handle"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit;s["\u0275\u0275advance"](2),s["\u0275\u0275property"]("checked",e.isComplete),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("routerLink",s["\u0275\u0275pureFunction1"](5,p,e.id)),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngClass",s["\u0275\u0275pureFunction1"](7,h,e.isComplete)),s["\u0275\u0275advance"](2),s["\u0275\u0275textInterpolate"](e.name),s["\u0275\u0275advance"](2),s["\u0275\u0275textInterpolate"](e.description)}}let g=(()=>{class e{constructor(){this.reorderItems=new s.EventEmitter,this.newCurrentTask=new s.EventEmitter,this.toggleCompleteItem=new s.EventEmitter}ngOnInit(){}viewTrackBy(e,t){return t.id}drop(e){console.log("currentIndex",e.currentIndex),console.log("previousIndex",e.previousIndex);const t=[...this.currentTasks];Object(c.e)(t,e.previousIndex,e.currentIndex);const n=t.map(e=>e.id);console.log("aaa",t),console.log("bbb",n),n.forEach((e,t)=>{console.log("X:",e,t)}),this.reorderItems.emit(n)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-list"]],inputs:{currentTasks:"currentTasks"},outputs:{reorderItems:"reorderItems",newCurrentTask:"newCurrentTask",toggleCompleteItem:"toggleCompleteItem"},decls:5,vars:2,consts:[["cdkDropList","",1,"list",3,"cdkDropListDropped"],["cdkDrag","","cdkDragLockAxis","y",4,"ngFor","ngForOf","ngForTrackBy"],["mat-fab","",1,"fab-bottom-right",3,"click"],["cdkDrag","","cdkDragLockAxis","y"],[1,"list-item"],[3,"checked","change"],[3,"routerLink"],[1,"middle",3,"ngClass"],[1,"name"],[1,"description"],["cdkDragHandle","",1,"right"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"div",0),s["\u0275\u0275listener"]("cdkDropListDropped",(function(e){return t.drop(e)})),s["\u0275\u0275template"](1,f,12,9,"div",1),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](2,"button",2),s["\u0275\u0275listener"]("click",(function(){return t.newCurrentTask.emit()})),s["\u0275\u0275elementStart"](3,"mat-icon"),s["\u0275\u0275text"](4,"add"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngForOf",t.currentTasks)("ngForTrackBy",t.viewTrackBy))},directives:[c.c,o.k,l.a,d.a,c.a,m.a,u.g,o.j,c.b],styles:["[_nghost-%COMP%]{background-color:green;display:flex;flex-grow:1;flex-direction:column}.cdk-drag-preview[_ngcontent-%COMP%]{border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drop-dragging[_ngcontent-%COMP%]   .cdk-drag[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1);background-color:#00f}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .3s cubic-bezier(0,0,.2,1)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.list[_ngcontent-%COMP%]{flex-grow:1;flex-basis:0px;overflow-y:scroll;display:flex;flex-direction:column}.list-item[_ngcontent-%COMP%]{display:flex;flex-wrap:nowrap;padding:10px;border-bottom:1px solid #ccc;box-sizing:border-box;background:#fff}mat-checkbox[_ngcontent-%COMP%]{padding-right:10px}.right[_ngcontent-%COMP%]{background:coral;cursor:move;padding-left:10px}.name[_ngcontent-%COMP%]{color:#000;font-size:medium}.description[_ngcontent-%COMP%]{color:grey;font-size:small;white-space:pre-line}.middle[_ngcontent-%COMP%]{flex-grow:1;padding-right:10px}.line-through[_ngcontent-%COMP%]{-webkit-text-decoration-line:line-through;text-decoration-line:line-through}a[_ngcontent-%COMP%]{text-decoration:none;display:flex;flex-wrap:nowrap;flex-grow:1}.fab-bottom-right[_ngcontent-%COMP%]{position:fixed;right:60px;bottom:16px;z-index:100}"]}),e})(),k=(()=>{class e{constructor(e){this.formBuilder=e}init(e){this.initialData=Object.assign({},e),this.form=this.formBuilder.group({name:[this.initialData.name,i.q.required],description:[this.initialData.description],isComplete:[this.initialData.isComplete]})}checkout(){const e=Object.assign(Object.assign({},this.initialData),this.form.value);return this.form.reset(),e}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275inject"](i.d))},e.\u0275prov=s["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac}),e})();var b=n("Wp6s"),v=n("kmnG"),C=n("qFsG"),x=n("ihCf");function w(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"mat-error"),s["\u0275\u0275text"](1," Name is "),s["\u0275\u0275elementStart"](2,"strong"),s["\u0275\u0275text"](3,"required"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]())}let E=(()=>{class e{constructor(e){this.presenter=e,this.cancel=new s.EventEmitter,this.checkout=new s.EventEmitter}get checkoutForm(){return this.presenter.form}ngOnInit(){this.presenter.init(this.todo)}cancelClick(){this.cancel.emit(this.todo)}onSubmit(){const e=this.presenter.checkout();this.checkout.emit(e)}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](k))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-detail-new"]],inputs:{todo:"todo"},outputs:{cancel:"cancel",checkout:"checkout"},features:[s["\u0275\u0275ProvidersFeature"]([],[k])],decls:25,vars:3,consts:[["novalidate","",3,"formGroup","ngSubmit"],[1,"shipping-card"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],["mat-raised-button","","color","accent","type","button",3,"click"],[1,"row"],[1,"col"],["formControlName","isComplete"],[1,"full-width"],["matInput","","id","name","placeholder","Name","formControlName","name"],[4,"ngIf"],["matInput","","id","description","placeholder","Description","formControlName","description","cdkTextareaAutosize","","cdkAutosizeMinRows","1","cdkAutosizeMaxRows","5"],["autosize","cdkTextareaAutosize"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"form",0),s["\u0275\u0275listener"]("ngSubmit",(function(){return t.onSubmit()})),s["\u0275\u0275elementStart"](1,"mat-card",1),s["\u0275\u0275elementStart"](2,"mat-card-actions"),s["\u0275\u0275elementStart"](3,"button",2),s["\u0275\u0275text"](4," Submit "),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](5,"button",3),s["\u0275\u0275listener"]("click",(function(){return t.cancelClick()})),s["\u0275\u0275text"](6," Cancel "),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](7,"mat-card-header"),s["\u0275\u0275elementStart"](8,"mat-card-title"),s["\u0275\u0275text"](9,"New Current Task"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](10,"mat-card-content"),s["\u0275\u0275elementStart"](11,"div",4),s["\u0275\u0275elementStart"](12,"div",5),s["\u0275\u0275elementStart"](13,"mat-checkbox",6),s["\u0275\u0275text"](14,"Is Complete"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](15,"div",4),s["\u0275\u0275elementStart"](16,"div",5),s["\u0275\u0275elementStart"](17,"mat-form-field",7),s["\u0275\u0275element"](18,"input",8),s["\u0275\u0275template"](19,w,4,0,"mat-error",9),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](20,"div",4),s["\u0275\u0275elementStart"](21,"div",5),s["\u0275\u0275elementStart"](22,"mat-form-field",7),s["\u0275\u0275element"](23,"textarea",10,11),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275property"]("formGroup",t.checkoutForm),s["\u0275\u0275advance"](3),s["\u0275\u0275property"]("disabled",!(t.checkoutForm.dirty&&t.checkoutForm.valid)),s["\u0275\u0275advance"](16),s["\u0275\u0275property"]("ngIf",t.checkoutForm.controls.name.hasError("required")))},directives:[i.r,i.n,i.i,b.a,b.b,l.a,b.d,b.f,b.c,m.a,i.m,i.g,v.c,C.a,i.b,o.l,x.b,v.b],styles:[".full-width[_ngcontent-%COMP%]{width:100%}.shipping-card[_ngcontent-%COMP%]{margin:20px auto}.row[_ngcontent-%COMP%]{display:flex;flex-direction:row}.col[_ngcontent-%COMP%]{flex:1;margin-right:20px}"]}),e})();var S=n("XNiG"),O=n("1G5W"),y=n("VEkB");let T=(()=>{class e{constructor(e){this.formBuilder=e,this.unsubscribe=new S.a}get completedTimestampControl(){const e=this.form.get("completedTimestamp");if(null===e)throw new Error("completedTimestamp AbstractControl is null");return e}get isCompleteControl(){const e=this.form.get("isComplete");if(null===e)throw new Error("isComplete AbstractControl is null");return e}init(e){this.initialData=Object.assign({},e),this.form=this.formBuilder.group({name:[this.initialData.name,i.q.required],description:[this.initialData.description],isComplete:[this.initialData.isComplete],completedTimestamp:[this.initialData.completedTimestamp]}),this.isCompleteControl.valueChanges.pipe(Object(O.a)(this.unsubscribe)).subscribe(e=>{this.completedTimestampControl.setValue(Object(y.a)(e))})}checkout(){const e=Object.assign(Object.assign({},this.initialData),this.form.value);return this.form.reset(),e}ngOnDestroy(){this.unsubscribe.next(),this.unsubscribe.complete()}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275inject"](i.d))},e.\u0275prov=s["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac}),e})();function I(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"mat-error"),s["\u0275\u0275text"](1," Name is "),s["\u0275\u0275elementStart"](2,"strong"),s["\u0275\u0275text"](3,"required"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]())}let j=(()=>{class e{constructor(e){this.presenter=e,this.cancel=new s.EventEmitter,this.remove=new s.EventEmitter,this.checkout=new s.EventEmitter}get checkoutForm(){return this.presenter.form}ngOnInit(){this.presenter.init(this.todo)}cancelClick(){this.cancel.emit(this.todo)}removeClick(){this.remove.emit(this.todo)}onSubmit(){const e=this.presenter.checkout();this.checkout.emit(e)}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](T))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-detail-edit"]],inputs:{todo:"todo"},outputs:{cancel:"cancel",remove:"remove",checkout:"checkout"},features:[s["\u0275\u0275ProvidersFeature"]([],[T])],decls:27,vars:3,consts:[["novalidate","",3,"formGroup","ngSubmit"],[1,"shipping-card"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],["mat-raised-button","","color","accent","type","button",3,"click"],[1,"row"],[1,"col"],["formControlName","isComplete"],[1,"full-width"],["matInput","","id","name","placeholder","Name","formControlName","name"],[4,"ngIf"],["matInput","","id","description","placeholder","Description","formControlName","description","cdkTextareaAutosize","","cdkAutosizeMinRows","1","cdkAutosizeMaxRows","5"],["autosize","cdkTextareaAutosize"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"form",0),s["\u0275\u0275listener"]("ngSubmit",(function(){return t.onSubmit()})),s["\u0275\u0275elementStart"](1,"mat-card",1),s["\u0275\u0275elementStart"](2,"mat-card-actions"),s["\u0275\u0275elementStart"](3,"button",2),s["\u0275\u0275text"](4," Submit "),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](5,"button",3),s["\u0275\u0275listener"]("click",(function(){return t.cancelClick()})),s["\u0275\u0275text"](6," Cancel "),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](7,"button",3),s["\u0275\u0275listener"]("click",(function(){return t.removeClick()})),s["\u0275\u0275text"](8," Remove "),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](9,"mat-card-header"),s["\u0275\u0275elementStart"](10,"mat-card-title"),s["\u0275\u0275text"](11,"Edit Current Task"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](12,"mat-card-content"),s["\u0275\u0275elementStart"](13,"div",4),s["\u0275\u0275elementStart"](14,"div",5),s["\u0275\u0275elementStart"](15,"mat-checkbox",6),s["\u0275\u0275text"](16,"Is Complete"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](17,"div",4),s["\u0275\u0275elementStart"](18,"div",5),s["\u0275\u0275elementStart"](19,"mat-form-field",7),s["\u0275\u0275element"](20,"input",8),s["\u0275\u0275template"](21,I,4,0,"mat-error",9),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](22,"div",4),s["\u0275\u0275elementStart"](23,"div",5),s["\u0275\u0275elementStart"](24,"mat-form-field",7),s["\u0275\u0275element"](25,"textarea",10,11),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275property"]("formGroup",t.checkoutForm),s["\u0275\u0275advance"](3),s["\u0275\u0275property"]("disabled",!(t.checkoutForm.dirty&&t.checkoutForm.valid)),s["\u0275\u0275advance"](18),s["\u0275\u0275property"]("ngIf",t.checkoutForm.controls.name.hasError("required")))},directives:[i.r,i.n,i.i,b.a,b.b,l.a,b.d,b.f,b.c,m.a,i.m,i.g,v.c,C.a,i.b,o.l,x.b,v.b],styles:[".full-width[_ngcontent-%COMP%]{width:100%}.shipping-card[_ngcontent-%COMP%]{margin:20px auto}.row[_ngcontent-%COMP%]{display:flex;flex-direction:row}.col[_ngcontent-%COMP%]{flex:1;margin-right:20px}"]}),e})();var M=n("kt0X"),F=n("pLZG"),D=n("E7rW"),P=n("9Odd"),_=n("VOS0");let N=(()=>{class e{constructor(e){this.store=e,this.task$=e.pipe(Object(M.select)(P.b.selectCurrentTaskFromRoute),Object(F.a)(_.isPresent))}ngOnInit(){}viewCancelled(e){this.store.dispatch(D.e.cancelled({currentTask:e}))}viewRemoved(e){this.store.dispatch(D.e.removed({currentTask:e}))}viewSaved(e){this.store.dispatch(D.e.saved({currentTask:e}))}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](M.Store))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-detail-edit-page"]],decls:6,vars:8,consts:[[3,"todo","cancel","remove","checkout"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"app-current-task-detail-edit",0),s["\u0275\u0275listener"]("cancel",(function(e){return t.viewCancelled(e)}))("remove",(function(e){return t.viewRemoved(e)}))("checkout",(function(e){return t.viewSaved(e)})),s["\u0275\u0275pipe"](1,"async"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](2,"pre"),s["\u0275\u0275text"](3),s["\u0275\u0275pipe"](4,"json"),s["\u0275\u0275pipe"](5,"async"),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275property"]("todo",s["\u0275\u0275pipeBind1"](1,2,t.task$)),s["\u0275\u0275advance"](3),s["\u0275\u0275textInterpolate1"]("Selected Current Task: ",s["\u0275\u0275pipeBind1"](4,4,s["\u0275\u0275pipeBind1"](5,6,t.task$)),"\n"))},directives:[j],pipes:[o.b,o.f],styles:[""],changeDetection:0}),e})();var A=n("STbY");let z=(()=>{class e{constructor(e){this.store=e,this.currentTasks$=e.pipe(Object(M.select)(P.b.selectCurrentTasksAll))}ngOnInit(){this.store.dispatch(D.g.enter())}reorderItems(e){this.store.dispatch(D.m.reorderList({ids:e}))}viewClearCompleted(){this.store.dispatch(D.g.clearCompleted())}viewNewCurrentTask(){this.store.dispatch(D.g.newCurrentTask())}toggleCompleteItem(e){const t=Object(y.e)(e,!e.isComplete);this.store.dispatch(D.g.saveItem({currentTask:t}))}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](M.Store))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-tasks-page"]],decls:9,vars:4,consts:[[3,"currentTasks","reorderItems","newCurrentTask","toggleCompleteItem"],["mat-icon-button","",1,"more-vert-menu",3,"matMenuTriggerFor"],["appMenu","matMenu"],["mat-menu-item","",3,"click"]],template:function(e,t){if(1&e&&(s["\u0275\u0275elementStart"](0,"app-current-task-list",0),s["\u0275\u0275listener"]("reorderItems",(function(e){return t.reorderItems(e)}))("newCurrentTask",(function(){return t.viewNewCurrentTask()}))("toggleCompleteItem",(function(e){return t.toggleCompleteItem(e)})),s["\u0275\u0275pipe"](1,"async"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](2,"button",1),s["\u0275\u0275elementStart"](3,"mat-icon"),s["\u0275\u0275text"](4,"more_vert"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](5,"mat-menu",null,2),s["\u0275\u0275elementStart"](7,"button",3),s["\u0275\u0275listener"]("click",(function(){return t.viewClearCompleted()})),s["\u0275\u0275text"](8,"Clear Completed"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e){const e=s["\u0275\u0275reference"](6);s["\u0275\u0275property"]("currentTasks",s["\u0275\u0275pipeBind1"](1,2,t.currentTasks$)),s["\u0275\u0275advance"](2),s["\u0275\u0275property"]("matMenuTriggerFor",e)}},directives:[g,l.a,A.c,d.a,A.d,A.a],pipes:[o.b],styles:["[_nghost-%COMP%]{background-color:green;display:flex;flex-grow:1;flex-direction:column}.more-vert-menu[_ngcontent-%COMP%]{color:#fff;position:fixed;right:10px;top:10px;z-index:100}"],changeDetection:0}),e})(),L=(()=>{class e{constructor(e){this.store=e,this.task=Object(y.c)()}ngOnInit(){}viewCancelled(e){this.store.dispatch(D.f.cancelled())}viewSaved(e){this.store.dispatch(D.f.saved({currentTask:e}))}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](M.Store))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-task-detail-new-page"]],decls:4,vars:4,consts:[[3,"todo","cancel","checkout"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"app-current-task-detail-new",0),s["\u0275\u0275listener"]("cancel",(function(e){return t.viewCancelled(e)}))("checkout",(function(e){return t.viewSaved(e)})),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](1,"pre"),s["\u0275\u0275text"](2),s["\u0275\u0275pipe"](3,"json"),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275property"]("todo",t.task),s["\u0275\u0275advance"](2),s["\u0275\u0275textInterpolate1"]("Selected Current Task: ",s["\u0275\u0275pipeBind1"](3,2,t.task),"\n"))},directives:[E],pipes:[o.f],styles:[""],changeDetection:0}),e})(),B=(()=>{class e{constructor(e){this.store=e}ngOnDestroy(){this.store.dispatch(D.h.destroyed())}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](M.Store))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-current-tasks-root"]],decls:1,vars:0,template:function(e,t){1&e&&s["\u0275\u0275element"](0,"router-outlet")},directives:[u.i],styles:["[_nghost-%COMP%]{background-color:red;display:flex;flex-grow:1;flex-direction:column}"],changeDetection:0}),e})();var q=n("DKe4"),R=n("LRne"),G=n("vkgz"),V=n("eIep"),$=n("SxV6"),X=n("IzEk"),W=n("fM1L");let J=(()=>{class e{constructor(e){this.store=e}canActivate(){return this.waitForAuth().pipe(Object(G.a)(e=>console.log("waitForAuth - complete>",e)),Object(V.a)(()=>this.waitForCurrentTasksToLoad().pipe(Object(V.a)(()=>Object(R.a)(!0)))))}waitForAuth(){return this.store.pipe(Object(M.select)(W.b.selectUser),Object(F.a)(e=>!!e),Object($.a)())}waitForCurrentTasksToLoad(){return this.store.pipe(Object(M.select)(P.b.selectCurrentTasksLoaded),Object(G.a)(e=>{e||(console.log("waitForCurrentTasksToLoad:user and taskid?"),this.store.dispatch(D.i.loadData()))}),Object(F.a)(e=>e),Object(X.a)(1))}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275inject"](M.Store))},e.\u0275prov=s["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var K=n("lJxs");const H=Object(M.createAction)("[Current Task Detail Edit Page Component Guard] Current Task Not Found"),U=[{path:"",component:B,canActivate:[q.a,J],children:[{path:"",component:z},{path:"edit/:id",component:N,canActivate:[(()=>{class e{constructor(e,t){this.store=e,this.router=t}canActivate(e){return this.hasCurrentTask()}hasCurrentTask(){return this.store.pipe(Object(M.select)(P.b.selectCurrentTaskFromRoute),Object(K.a)(e=>void 0!==e),Object(G.a)(e=>{!1===e&&(console.log("hasCurrentTask>",e),this.store.dispatch(r.currentTaskNotFound()),this.router.navigate(["/404"],{skipLocationChange:!0}))}),Object(X.a)(1))}waitForCurrentTasksToLoad(){return this.store.pipe(Object(M.select)(P.b.selectCurrentTasksLoaded),Object(F.a)(e=>e),Object(X.a)(1))}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275inject"](M.Store),s["\u0275\u0275inject"](u.e))},e.\u0275prov=s["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()]},{path:"new",component:L}]}];let Y=(()=>{class e{}return e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[u.h.forChild(U)],u.h]}),e})();const Z=[j,E,g],Q=[N,L,z,B];let ee=(()=>{class e{}return e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[o.c,i.p,a.a,Y]]}),e})()}}]);