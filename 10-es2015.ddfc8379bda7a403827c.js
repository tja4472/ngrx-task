(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{GEH5:function(e,t,n){"use strict";n.r(t);var i=n("ofXK"),r=n("3Pt+"),o=n("quTh"),c=n("fXoL");let a=(()=>{class e{constructor(e){this.formBuilder=e}init(e){this.isNew=""===e.id,this.initialData=Object.assign({},e),this.form=this.formBuilder.group({name:[this.initialData.name,r.o.required]})}checkout(){const e=Object.assign(Object.assign({},this.initialData),this.form.value);return this.form.reset(),e}}return e.\u0275fac=function(t){return new(t||e)(c["\u0275\u0275inject"](r.c))},e.\u0275prov=c["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac}),e})();var s=n("Wp6s"),l=n("kmnG"),d=n("qFsG"),m=n("bTqV");function p(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"mat-error"),c["\u0275\u0275text"](1," Name is "),c["\u0275\u0275elementStart"](2,"strong"),c["\u0275\u0275text"](3,"required"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"]())}let u=(()=>{class e{constructor(e){this.presenter=e,this.cancel=new c.EventEmitter,this.remove=new c.EventEmitter,this.checkout=new c.EventEmitter}get checkoutForm(){return this.presenter.form}get isNew(){return this.presenter.isNew}ngOnInit(){console.log("ngOnInit>",this.completedTask),this.presenter.init(this.completedTask)}cancelClick(){this.cancel.emit(this.completedTask)}removeClick(){console.log("removeClick>",this.completedTask),this.remove.emit(this.completedTask)}onSubmit(){console.log("onSubmit>",this.completedTask);const e=this.presenter.checkout();this.checkout.emit(e)}}return e.\u0275fac=function(t){return new(t||e)(c["\u0275\u0275directiveInject"](a))},e.\u0275cmp=c["\u0275\u0275defineComponent"]({type:e,selectors:[["app-task-list-detail-edit"]],inputs:{completedTask:"completedTask"},outputs:{cancel:"cancel",remove:"remove",checkout:"checkout"},features:[c["\u0275\u0275ProvidersFeature"]([],[a])],decls:18,vars:4,consts:[["novalidate","",3,"formGroup","ngSubmit"],[1,"shipping-card"],[1,"row"],[1,"col"],[1,"full-width"],["matInput","","id","name","placeholder","Name","formControlName","name"],[4,"ngIf"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],["mat-raised-button","","color","accent","type","button",3,"click"],["mat-raised-button","","color","accent","type","button",3,"disabled","click"]],template:function(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"form",0),c["\u0275\u0275listener"]("ngSubmit",(function(){return t.onSubmit()})),c["\u0275\u0275elementStart"](1,"mat-card",1),c["\u0275\u0275elementStart"](2,"mat-card-header"),c["\u0275\u0275elementStart"](3,"mat-card-title"),c["\u0275\u0275text"](4,"Edit Task List"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](5,"mat-card-content"),c["\u0275\u0275elementStart"](6,"div",2),c["\u0275\u0275elementStart"](7,"div",3),c["\u0275\u0275elementStart"](8,"mat-form-field",4),c["\u0275\u0275element"](9,"input",5),c["\u0275\u0275template"](10,p,4,0,"mat-error",6),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](11,"mat-card-actions"),c["\u0275\u0275elementStart"](12,"button",7),c["\u0275\u0275text"](13," Submit "),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](14,"button",8),c["\u0275\u0275listener"]("click",(function(){return t.cancelClick()})),c["\u0275\u0275text"](15," Cancel "),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](16,"button",9),c["\u0275\u0275listener"]("click",(function(){return t.removeClick()})),c["\u0275\u0275text"](17," Remove "),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"]()),2&e&&(c["\u0275\u0275property"]("formGroup",t.checkoutForm),c["\u0275\u0275advance"](10),c["\u0275\u0275property"]("ngIf",t.checkoutForm.controls.name.hasError("required")),c["\u0275\u0275advance"](2),c["\u0275\u0275property"]("disabled",!(t.checkoutForm.dirty&&t.checkoutForm.valid)),c["\u0275\u0275advance"](4),c["\u0275\u0275property"]("disabled",t.isNew))},directives:[r.p,r.l,r.g,s.a,s.d,s.f,s.c,l.b,d.a,r.b,r.k,r.f,i.l,s.b,m.a,l.a],styles:[".full-width[_ngcontent-%COMP%]{width:100%}.shipping-card[_ngcontent-%COMP%]{margin:20px auto}.row[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.col[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1;margin-right:20px}"]}),e})(),f=(()=>{class e{constructor(e){this.formBuilder=e}init(e){this.initialData=Object.assign({},e),this.form=this.formBuilder.group({name:[this.initialData.name,r.o.required]})}checkout(){const e=Object.assign(Object.assign({},this.initialData),this.form.value);return this.form.reset(),e}}return e.\u0275fac=function(t){return new(t||e)(c["\u0275\u0275inject"](r.c))},e.\u0275prov=c["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac}),e})();function b(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"mat-error"),c["\u0275\u0275text"](1," Name is "),c["\u0275\u0275elementStart"](2,"strong"),c["\u0275\u0275text"](3,"required"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"]())}let k=(()=>{class e{constructor(e){this.presenter=e,this.cancel=new c.EventEmitter,this.checkout=new c.EventEmitter}get checkoutForm(){return this.presenter.form}ngOnInit(){this.presenter.init(this.completedTask)}cancelClick(){this.cancel.emit(this.completedTask)}onSubmit(){const e=this.presenter.checkout();this.checkout.emit(e)}}return e.\u0275fac=function(t){return new(t||e)(c["\u0275\u0275directiveInject"](f))},e.\u0275cmp=c["\u0275\u0275defineComponent"]({type:e,selectors:[["app-task-list-detail-new"]],inputs:{completedTask:"completedTask"},outputs:{cancel:"cancel",checkout:"checkout"},features:[c["\u0275\u0275ProvidersFeature"]([],[f])],decls:16,vars:3,consts:[["novalidate","",3,"formGroup","ngSubmit"],[1,"shipping-card"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],["mat-raised-button","","color","accent","type","button",3,"click"],[1,"row"],[1,"col"],[1,"full-width"],["matInput","","id","name","placeholder","Name","formControlName","name"],[4,"ngIf"]],template:function(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"form",0),c["\u0275\u0275listener"]("ngSubmit",(function(){return t.onSubmit()})),c["\u0275\u0275elementStart"](1,"mat-card",1),c["\u0275\u0275elementStart"](2,"mat-card-actions"),c["\u0275\u0275elementStart"](3,"button",2),c["\u0275\u0275text"](4," Submit "),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](5,"button",3),c["\u0275\u0275listener"]("click",(function(){return t.cancelClick()})),c["\u0275\u0275text"](6," Cancel "),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](7,"mat-card-header"),c["\u0275\u0275elementStart"](8,"mat-card-title"),c["\u0275\u0275text"](9,"New Task List"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](10,"mat-card-content"),c["\u0275\u0275elementStart"](11,"div",4),c["\u0275\u0275elementStart"](12,"div",5),c["\u0275\u0275elementStart"](13,"mat-form-field",6),c["\u0275\u0275element"](14,"input",7),c["\u0275\u0275template"](15,b,4,0,"mat-error",8),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"]()),2&e&&(c["\u0275\u0275property"]("formGroup",t.checkoutForm),c["\u0275\u0275advance"](3),c["\u0275\u0275property"]("disabled",!(t.checkoutForm.dirty&&t.checkoutForm.valid)),c["\u0275\u0275advance"](12),c["\u0275\u0275property"]("ngIf",t.checkoutForm.controls.name.hasError("required")))},directives:[r.p,r.l,r.g,s.a,s.b,m.a,s.d,s.f,s.c,l.b,d.a,r.b,r.k,r.f,i.l,l.a],styles:[".full-width[_ngcontent-%COMP%]{width:100%}.shipping-card[_ngcontent-%COMP%]{margin:20px auto}.row[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.col[_ngcontent-%COMP%]{-webkit-box-flex:1;flex:1;margin-right:20px}"]}),e})();var h=n("NFeN"),g=n("tyNb");const w=function(e){return["/tasks/lists/edit",e]};function x(e,t){if(1&e&&(c["\u0275\u0275elementStart"](0,"div"),c["\u0275\u0275elementStart"](1,"div",3),c["\u0275\u0275elementStart"](2,"a",4),c["\u0275\u0275elementStart"](3,"div",5),c["\u0275\u0275elementStart"](4,"div",6),c["\u0275\u0275text"](5),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit;c["\u0275\u0275advance"](2),c["\u0275\u0275property"]("routerLink",c["\u0275\u0275pureFunction1"](2,w,e.id)),c["\u0275\u0275advance"](3),c["\u0275\u0275textInterpolate"](e.name)}}let v=(()=>{class e{constructor(){this.newCurrentTask=new c.EventEmitter}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c["\u0275\u0275defineComponent"]({type:e,selectors:[["app-task-list-list"]],inputs:{currentTasks:"currentTasks"},outputs:{newCurrentTask:"newCurrentTask"},decls:5,vars:1,consts:[[1,"list"],[4,"ngFor","ngForOf"],["mat-fab","",1,"fab-bottom-right",3,"click"],[1,"list-item"],[3,"routerLink"],[1,"middle"],[1,"name"]],template:function(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"div",0),c["\u0275\u0275template"](1,x,6,4,"div",1),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](2,"button",2),c["\u0275\u0275listener"]("click",(function(){return t.newCurrentTask.emit()})),c["\u0275\u0275elementStart"](3,"mat-icon"),c["\u0275\u0275text"](4,"add"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"]()),2&e&&(c["\u0275\u0275advance"](1),c["\u0275\u0275property"]("ngForOf",t.currentTasks))},directives:[i.k,m.a,h.a,g.i],styles:["[_nghost-%COMP%]{background-color:green;display:-webkit-box;display:flex;-webkit-box-flex:1;flex-grow:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.cdk-drag-preview[_ngcontent-%COMP%]{border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drop-dragging[_ngcontent-%COMP%]   .cdk-drag[_ngcontent-%COMP%]{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.2,1);transition:-webkit-transform .25s cubic-bezier(0,0,.2,1);transition:transform .25s cubic-bezier(0,0,.2,1);transition:transform .25s cubic-bezier(0,0,.2,1),-webkit-transform .25s cubic-bezier(0,0,.2,1);background-color:#00f}.cdk-drag-animating[_ngcontent-%COMP%]{-webkit-transition:-webkit-transform .3s cubic-bezier(0,0,.2,1);transition:-webkit-transform .3s cubic-bezier(0,0,.2,1);transition:transform .3s cubic-bezier(0,0,.2,1);transition:transform .3s cubic-bezier(0,0,.2,1),-webkit-transform .3s cubic-bezier(0,0,.2,1)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.list[_ngcontent-%COMP%]{-webkit-box-flex:1;flex-grow:1;flex-basis:0px;overflow-y:scroll;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.list[_ngcontent-%COMP%], .list-item[_ngcontent-%COMP%]{display:-webkit-box;display:flex}.list-item[_ngcontent-%COMP%]{flex-wrap:nowrap;padding:10px;border-bottom:1px solid #ccc;box-sizing:border-box;background:#fff}mat-checkbox[_ngcontent-%COMP%]{padding-right:10px}.drag-icon[_ngcontent-%COMP%]{cursor:move}.name[_ngcontent-%COMP%]{color:#000;font-size:medium}.description[_ngcontent-%COMP%]{color:grey;font-size:small;white-space:pre-line}.middle[_ngcontent-%COMP%]{-webkit-box-flex:1;flex-grow:1;padding-right:10px}.line-through[_ngcontent-%COMP%]{-webkit-text-decoration-line:line-through;text-decoration-line:line-through}a[_ngcontent-%COMP%]{text-decoration:none;display:-webkit-box;display:flex;flex-wrap:nowrap;-webkit-box-flex:1;flex-grow:1}.fab-bottom-right[_ngcontent-%COMP%]{bottom:16px}.fab-bottom-right[_ngcontent-%COMP%], .zzzzzzzz[_ngcontent-%COMP%]{position:fixed;right:60px;z-index:100}.zzzzzzzz[_ngcontent-%COMP%]{top:0}"]}),e})();var C=n("kt0X"),y=n("E7rW"),S=n("9Odd");let E=(()=>{class e{constructor(e){this.store=e,this.task$=e.pipe(Object(C.select)(S.b.selectTaskListFromRoute))}ngOnInit(){}viewCancelled(e){this.store.dispatch(y.j.cancelled({taskList:e}))}viewRemoved(e){this.store.dispatch(y.j.removed({taskList:e}))}viewSaved(e){this.store.dispatch(y.j.saved({taskList:e}))}}return e.\u0275fac=function(t){return new(t||e)(c["\u0275\u0275directiveInject"](C.Store))},e.\u0275cmp=c["\u0275\u0275defineComponent"]({type:e,selectors:[["app-task-list-detail-edit-page"]],decls:6,vars:8,consts:[[3,"completedTask","cancel","remove","checkout"]],template:function(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"app-task-list-detail-edit",0),c["\u0275\u0275listener"]("cancel",(function(e){return t.viewCancelled(e)}))("remove",(function(e){return t.viewRemoved(e)}))("checkout",(function(e){return t.viewSaved(e)})),c["\u0275\u0275pipe"](1,"async"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](2,"pre"),c["\u0275\u0275text"](3),c["\u0275\u0275pipe"](4,"json"),c["\u0275\u0275pipe"](5,"async"),c["\u0275\u0275elementEnd"]()),2&e&&(c["\u0275\u0275property"]("completedTask",c["\u0275\u0275pipeBind1"](1,2,t.task$)),c["\u0275\u0275advance"](3),c["\u0275\u0275textInterpolate1"]("Selected Task List: ",c["\u0275\u0275pipeBind1"](4,4,c["\u0275\u0275pipeBind1"](5,6,t.task$)),"\n"))},directives:[u],pipes:[i.b,i.f],styles:[""],changeDetection:0}),e})();var O=n("VEkB");let T=(()=>{class e{constructor(e){this.store=e,this.task$=Object(O.d)()}ngOnInit(){}viewCancelled(e){this.store.dispatch(y.k.cancelled())}viewSaved(e){this.store.dispatch(y.k.saved({taskList:e}))}}return e.\u0275fac=function(t){return new(t||e)(c["\u0275\u0275directiveInject"](C.Store))},e.\u0275cmp=c["\u0275\u0275defineComponent"]({type:e,selectors:[["app-task-list-detail-new-page"]],decls:4,vars:4,consts:[[3,"completedTask","cancel","checkout"]],template:function(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"app-task-list-detail-new",0),c["\u0275\u0275listener"]("cancel",(function(e){return t.viewCancelled(e)}))("checkout",(function(e){return t.viewSaved(e)})),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](1,"pre"),c["\u0275\u0275text"](2),c["\u0275\u0275pipe"](3,"json"),c["\u0275\u0275elementEnd"]()),2&e&&(c["\u0275\u0275property"]("completedTask",t.task$),c["\u0275\u0275advance"](2),c["\u0275\u0275textInterpolate1"]("Selected Task List: ",c["\u0275\u0275pipeBind1"](3,2,t.task$),"\n"))},directives:[k],pipes:[i.f],styles:[""],changeDetection:0}),e})(),M=(()=>{class e{constructor(e){this.store=e,this.taskLists$=e.pipe(Object(C.select)(S.a.selectAll))}ngOnInit(){this.store.dispatch(y.l.enter())}viewNewCurrentTask(){this.store.dispatch(y.l.newTaskList())}}return e.\u0275fac=function(t){return new(t||e)(c["\u0275\u0275directiveInject"](C.Store))},e.\u0275cmp=c["\u0275\u0275defineComponent"]({type:e,selectors:[["app-task-lists-page"]],decls:2,vars:3,consts:[[3,"currentTasks","newCurrentTask"]],template:function(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"app-task-list-list",0),c["\u0275\u0275listener"]("newCurrentTask",(function(){return t.viewNewCurrentTask()})),c["\u0275\u0275pipe"](1,"async"),c["\u0275\u0275elementEnd"]()),2&e&&c["\u0275\u0275property"]("currentTasks",c["\u0275\u0275pipeBind1"](1,1,t.taskLists$))},directives:[v],pipes:[i.b],styles:["[_nghost-%COMP%]{background-color:green;display:-webkit-box;display:flex;-webkit-box-flex:1;flex-grow:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}"],changeDetection:0}),e})(),P=(()=>{class e{constructor(e){this.store=e}ngOnDestroy(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(c["\u0275\u0275directiveInject"](C.Store))},e.\u0275cmp=c["\u0275\u0275defineComponent"]({type:e,selectors:[["app-task-lists-root"]],decls:1,vars:0,template:function(e,t){1&e&&c["\u0275\u0275element"](0,"router-outlet")},directives:[g.k],styles:["[_nghost-%COMP%]{background-color:red;display:-webkit-box;display:flex;-webkit-box-flex:1;flex-grow:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}"],changeDetection:0}),e})();const z=[{path:"",component:P,canActivate:[n("DKe4").a],children:[{path:"",component:M},{path:"edit/:id",component:E},{path:"new",component:T}]}];let _=(()=>{class e{}return e.\u0275mod=c["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=c["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[g.j.forChild(z)],g.j]}),e})();const j=[u,k,v],I=[E,T,M,P];let N=(()=>{class e{}return e.\u0275mod=c["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=c["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[i.c,r.n,o.a,_]]}),e})();n.d(t,"COMPONENTS",(function(){return j})),n.d(t,"CONTAINERS",(function(){return I})),n.d(t,"TaskListsModule",(function(){return N}))}}]);