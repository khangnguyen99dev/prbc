"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4059],{12:(U,x,s)=>{s.d(x,{w:()=>b});var t=s(1571),Z=s(6895);function y(i,l){if(1&i&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&i){const g=l.$implicit;t.xp6(1),t.Oqu(g)}}function p(i,l){if(1&i&&(t.TgZ(0,"div",2)(1,"div",3),t._uU(2," Error "),t.qZA(),t.TgZ(3,"div",4),t.YNc(4,y,2,1,"p",5),t.qZA(),t._UZ(5,"div",6),t.qZA()),2&i){const g=t.oxw(2);t.xp6(4),t.Q6J("ngForOf",g.errorMessages)}}function _(i,l){if(1&i&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&i){const g=l.$implicit;t.xp6(1),t.Oqu(g)}}function e(i,l){if(1&i&&(t.TgZ(0,"div",4),t.YNc(1,_,2,1,"p",5),t.qZA()),2&i){const g=t.oxw(3);t.xp6(1),t.Q6J("ngForOf",g.errorMessages)}}function v(i,l){if(1&i){const g=t.EpF();t.TgZ(0,"div",2)(1,"div",7),t.NdJ("click",function(){t.CHM(g);const f=t.oxw(2);return t.KtG(f.toggleErrors())}),t._uU(2),t.TgZ(3,"span"),t._uU(4,"(Click here to show)"),t.qZA()(),t.YNc(5,e,2,1,"div",8),t._UZ(6,"div",6),t.qZA()}if(2&i){const g=t.oxw(2);t.xp6(2),t.hij(" Sorry, system find ",g.errorMessages.length," errors. "),t.xp6(3),t.Q6J("ngIf",g.showErrors)}}function M(i,l){if(1&i&&(t.ynx(0),t.YNc(1,p,6,1,"div",1),t.YNc(2,v,7,2,"div",1),t.BQk()),2&i){const g=t.oxw();t.xp6(1),t.Q6J("ngIf",1===g.errorMessages.length),t.xp6(1),t.Q6J("ngIf",g.errorMessages.length>1)}}function C(i,l){if(1&i&&(t.TgZ(0,"div",2)(1,"div",9),t._uU(2," Success "),t.qZA(),t.TgZ(3,"div",10)(4,"p"),t._uU(5),t.qZA()(),t._UZ(6,"div",6),t.qZA()),2&i){const g=t.oxw();t.xp6(5),t.Oqu(g.successMessage)}}let b=(()=>{const l=class{constructor(){this.errorMessages=[],this.successMessage="",this.showErrors=!1}toggleErrors(){this.showErrors=!this.showErrors}};let i=l;return l.\u0275fac=function(f){return new(f||l)},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-alert"]],inputs:{errorMessages:"errorMessages",successMessage:"successMessage"},decls:2,vars:2,consts:[[4,"ngIf"],["role","alert",4,"ngIf"],["role","alert"],[1,"bg-red-500","text-white","font-bold","rounded-t","px-4","py-2"],[1,"border","border-t-0","border-red-400","rounded-b","bg-red-100","px-4","py-3","text-red-700"],[4,"ngFor","ngForOf"],[1,"mb-4"],[1,"bg-red-500","text-white","font-bold","rounded-t","px-4","py-2","cursor-pointer",3,"click"],["class","border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700",4,"ngIf"],[1,"bg-green-500","text-white","font-bold","rounded-t","px-4","py-2"],[1,"border","border-t-0","border-green-400","rounded-b","bg-green-100","px-4","py-3","text-green-700"]],template:function(f,A){1&f&&(t.YNc(0,M,3,2,"ng-container",0),t.YNc(1,C,7,1,"div",1)),2&f&&(t.Q6J("ngIf",A.errorMessages.length>0),t.xp6(1),t.Q6J("ngIf",""!==A.successMessage))},dependencies:[Z.sg,Z.O5]}),i})()},507:(U,x,s)=>{s.d(x,{u:()=>p});var t=s(6895),Z=s(2605),y=s(1571);let p=(()=>{const e=class{};let _=e;return e.\u0275fac=function(C){return new(C||e)},e.\u0275mod=y.oAB({type:e}),e.\u0275inj=y.cJS({imports:[t.ez,Z.Bz]}),_})()},4059:(U,x,s)=>{s.r(x),s.d(x,{CurrencyManagementModule:()=>O});var t=s(6895),Z=s(5861),y=s(1822),p=s(2340),_=s(5439),e=s(1571),v=s(2605),M=s(6690),C=s(6548),b=s(4909),i=s(12),l=s(433),g=s(9602);function T(o,d){1&o&&(e.TgZ(0,"a",41),e._uU(1," New Currency "),e.qZA())}function f(o,d){1&o&&(e.TgZ(0,"b",51),e._uU(1,"Main Currency"),e._UZ(2,"br"),e.qZA())}const A=function(o){return["/settings/master-data/currency-management/",o]};function q(o,d){if(1&o&&(e.TgZ(0,"div",52)(1,"a",53)(2,"span",54),e._UZ(3,"i",55),e.qZA(),e.TgZ(4,"span",56),e._uU(5," Manage "),e.qZA()()()),2&o){const u=e.oxw().$implicit;e.xp6(1),e.Q6J("routerLink",e.VKq(1,A,u.id))}}function I(o,d){if(1&o){const u=e.EpF();e.TgZ(0,"div",52)(1,"a",57),e.NdJ("click",function(){e.CHM(u);const r=e.oxw().$implicit,n=e.oxw();return e.KtG(n.deleteCurrency(r))}),e.TgZ(2,"span",54),e._UZ(3,"i",58),e.qZA(),e.TgZ(4,"span",56),e._uU(5," Remove "),e.qZA()()()}}function N(o,d){if(1&o&&(e.TgZ(0,"tr")(1,"td",42),e.YNc(2,f,3,0,"b",43),e._uU(3),e.qZA(),e.TgZ(4,"td",42),e._uU(5),e.qZA(),e.TgZ(6,"td",42),e._uU(7),e.qZA(),e.TgZ(8,"td",42),e._uU(9),e.qZA(),e.TgZ(10,"td",42),e._uU(11),e.qZA(),e.TgZ(12,"td",44)(13,"div",45)(14,"div",46)(15,"button",47),e._UZ(16,"i",48),e.qZA(),e.TgZ(17,"div",49),e.YNc(18,q,6,3,"div",50),e.YNc(19,I,6,0,"div",50),e.qZA()()()()()),2&o){const u=d.$implicit,a=e.oxw();e.xp6(2),e.Q6J("ngIf",u.default),e.xp6(1),e.hij(" ",u.name," "),e.xp6(2),e.hij(" ",u.currency_code," "),e.xp6(2),e.hij(" ",u.rate," "),e.xp6(2),e.hij(" ",u.created_by_user?u.created_by_user.name:"N/A"," "),e.xp6(2),e.hij(" ",u.created_at_formatted," "),e.xp6(7),e.Q6J("ngIf",a.permissionService.hasPermission("Settings - Master Data - Can Show Currency")),e.xp6(1),e.Q6J("ngIf",!u.default&&a.permissionService.hasPermission("Settings - Master Data - Can Delete Currency"))}}function J(o,d){1&o&&(e.TgZ(0,"tr")(1,"td",59),e._uU(2," No currencies found "),e.qZA()())}function E(o,d){if(1&o){const u=e.EpF();e.TgZ(0,"app-pagination",60),e.NdJ("selectedPage",function(r){e.CHM(u);const n=e.oxw();return e.KtG(n.selectedPage(r))}),e.qZA()}if(2&o){const u=e.oxw();e.Q6J("perPage",u.perPage)("totalItems",u.totalItems)("currentPage",u.page)}}let P=(()=>{const d=class{constructor(a,r,n,c){this.router=a,this.headerService=r,this.activatedRoute=n,this.permissionService=c,this.query="",this.currencies=[],this.currencyCodes=[],this.loading=!0,this.page=1,this.totalItems=0,this.perPage=10,this.from=0,this.to=0,this.filters={name:"",currency_code:"",created_by:"",created_at:""},this.errorMessages=[],this.successMessage="",this.headerService.setupHeader([{title:"Settings"},{title:"Master Data"},{title:"Currency Management"}])}filterUpdated(){}getCurrencies(){var a=this;return(0,Z.Z)(function*(){a.loading=!0;const r={...a.filters};r.last_default_rate&&(r.last_default_rate=_(r.last_default_rate).format("YYYY-MM-DD")),r.created_at&&(r.created_at=_(r.created_at).format("YYYY-MM-DD"));try{const c=yield(yield y.Z.get(`${p.N.api_url}/settings/currencies`,{headers:{Authorization:`Bearer ${window.localStorage.getItem(p.N.api_token_identifier)}`,"Content-Type":"application/json",Accept:"application/json"},params:{page:a.page,per_page:a.perPage,...r}})).data;if(c.error)return a.errorMessages.push(c.error_message),window.scrollTo(0,0),a.loading=!1,void a.clearMessages();a.currencies=c.currencies.data,a.totalItems=c.currencies.total,a.from=c.currencies.from,a.to=c.currencies.to,a.loading=!1}catch(n){console.error(n),422==n.response.status?Object.keys(n.response.data.errors).forEach(c=>{a.errorMessages.push(n.response.data.errors[c])}):a.errorMessages.push("Sorry, something went wrong. Please try again later."),window.scrollTo(0,0),a.loading=!1,a.clearMessages()}})()}deleteCurrency(a){var r=this;return(0,Z.Z)(function*(){if(confirm("Are you sure you want to delete this currency?")){r.loading=!0;try{const c=yield(yield y.Z.delete(`${p.N.api_url}/settings/currencies/${a.id}`,{headers:{Authorization:`Bearer ${window.localStorage.getItem(p.N.api_token_identifier)}`,Accept:"application/json","Content-Type":"application/json"}})).data;if(r.loading=!1,c.error)return r.errorMessages.push(c.error_message),window.scrollTo(0,0),r.loading=!1,void r.clearMessages();r.successMessage=c.success_message,r.page=1,r.getCurrencies(),window.scrollTo(0,0),setTimeout(()=>{r.successMessage="",r.loading=!1},3500)}catch(n){console.log(n),422==n.response.status?Object.keys(n.response.data.errors).forEach(c=>{r.errorMessages.push(n.response.data.errors[c])}):r.errorMessages.push("Sorry, something went wrong. Please try again later."),window.scrollTo(0,0),r.loading=!1,r.clearMessages()}}})()}selectedPage(a){this.page=a,this.getCurrencies()}ngOnInit(){this.getCurrencies(),this.setupSelectize(),this.activatedRoute.queryParams.subscribe(a=>{let r=a.page;null==r||null==r||""==r||(this.page=r,this.getCurrencies())})}resetFilters(){this.filters={name:"",currency_code:"",created_by:"",created_at:""},this.page=1,this.getCurrencies()}searchCurrencies(){this.page=1,this.getCurrencies()}clearMessages(){setTimeout(()=>{this.successMessage=""},3500)}setupSelectize(){const a=this;$(function(){$("#created_by_selectize").selectize({preload:!0,valueField:"name",searchField:"name",labelField:"name",load:(c,h)=>{$.ajax({url:`${p.N.api_url}/settings/users?search_selectize=${c}`,type:"GET",error:function(){h()},success:m=>{h(m?.users?.data)},headers:{Authorization:`Bearer ${window.localStorage.getItem(p.N.api_token_identifier)}`,"Content-Type":"application/json"}})},onChange:c=>{a.filters.created_by=c}})})}};let o=d;return d.\u0275fac=function(r){return new(r||d)(e.Y36(v.F0),e.Y36(M.r),e.Y36(v.gz),e.Y36(C.$))},d.\u0275cmp=e.Xpm({type:d,selectors:[["app-currency-management"]],decls:72,vars:16,consts:[[1,"container-fixed"],[1,"flex","flex-wrap","items-center","lg:items-end","justify-between","gap-5","pb-7.5"],[1,"flex","flex-col","justify-center","gap-2"],[1,"text-xl","font-medium","leading-none","text-gray-900"],[1,"flex","items-center","gap-2.5"],["class","btn btn-sm btn-success","routerLink","/settings/master-data/currency-management/create",4,"ngIf"],[3,"errorMessages","successMessage"],[1,"mb-4"],[1,"text-lg","font-medium","leading-none","text-gray-900"],[1,"grid","grid-cols-1","md:grid-cols-2","lg:grid-cols-4","gap-4"],["for","name",1,"text-sm","font-normal","text-gray-700"],["type","text","id","name","placeholder","Name","name","name",1,"input","input-sm",3,"ngModel","ngModelChange"],["for","code",1,"text-sm","font-normal","text-gray-700"],["type","text","id","code","placeholder","Currency Code","name","code",1,"input","input-sm",3,"ngModel","ngModelChange"],["for","created_by",1,"text-sm","font-normal","text-gray-700"],["name","created_by_selectize","id","created_by_selectize",1,"filter-selectize","w-full"],["value",""],["for","created_at",1,"text-sm","font-normal","text-gray-700"],["name","created_at","placeholder","Select Created At",1,"input","input-sm",3,"matDatepicker","ngModel","click","ngModelChange"],["created_at",""],[1,"w-full","mt-2","flex","justify-end","gap-2"],[1,"btn","btn-sm","btn-light",3,"disabled","click"],[1,"btn","btn-sm","btn-primary",3,"disabled","click"],[1,"w-full","my-4","border-t","border-gray-300","mb-8"],[1,"grid","gap-5","lg:gap-7.5"],[1,"card","card-grid","min-w-full"],[1,"card-header","flex-wrap","gap-2"],[1,"card-title","font-medium","text-sm"],[1,"card-body"],["data-datatable","true","data-datatable-page-size","20"],[1,"scrollable-x-auto"],["data-datatable-table","true",1,"table","table-auto","table-border"],[1,"min-w-[300px]"],[1,"min-w-[180px]"],[1,"w-[60px]"],[4,"ngFor","ngForOf"],[4,"ngIf"],[1,"card-footer","justify-center","md:justify-between","flex-col","md:flex-row","gap-5","text-gray-600","text-2sm","font-medium"],[1,"flex","items-center","gap-2","order-2","md:order-1"],[1,"flex","items-center","gap-4","order-1","md:order-2"],[3,"perPage","totalItems","currentPage","selectedPage",4,"ngIf"],["routerLink","/settings/master-data/currency-management/create",1,"btn","btn-sm","btn-success"],[1,"text-gray-800","font-normal"],["class","text-success","style","font-size: 12px;",4,"ngIf"],[1,"text-center"],["data-menu","true",1,"menu","flex-inline"],["data-menu-item-offset","0, 10px","data-menu-item-placement","bottom-end","data-menu-item-placement-rtl","bottom-start","data-menu-item-toggle","dropdown","data-menu-item-trigger","click|lg:click",1,"menu-item"],[1,"menu-toggle","btn","btn-sm","btn-icon","btn-light","btn-clear"],[1,"ki-filled","ki-dots-vertical"],["data-menu-dismiss","true",1,"menu-dropdown","menu-default","w-full","max-w-[175px]"],["class","menu-item",4,"ngIf"],[1,"text-success",2,"font-size","12px"],[1,"menu-item"],[1,"menu-link",3,"routerLink"],[1,"menu-icon"],[1,"ki-filled","ki-setting-2"],[1,"menu-title"],[1,"menu-link",3,"click"],[1,"ki-filled","ki-trash"],["colspan","5",1,"text-center","text-gray-500","font-normal"],[3,"perPage","totalItems","currentPage","selectedPage"]],template:function(r,n){if(1&r){const c=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),e._uU(4," Currency Management "),e.qZA()(),e.TgZ(5,"div",4),e.YNc(6,T,2,0,"a",5),e.qZA()(),e._UZ(7,"app-alert",6),e.TgZ(8,"div",7)(9,"h2",8),e._uU(10," Search "),e.qZA(),e.TgZ(11,"div",9)(12,"div")(13,"label",10),e._uU(14,"Name:"),e.qZA(),e._UZ(15,"br"),e.TgZ(16,"input",11),e.NdJ("ngModelChange",function(m){return n.filters.name=m}),e.qZA()(),e.TgZ(17,"div")(18,"label",12),e._uU(19,"Currency Code:"),e.qZA(),e._UZ(20,"br"),e.TgZ(21,"input",13),e.NdJ("ngModelChange",function(m){return n.filters.currency_code=m}),e.qZA()(),e.TgZ(22,"div")(23,"label",14),e._uU(24,"Created By:"),e.qZA(),e._UZ(25,"br"),e.TgZ(26,"select",15)(27,"option",16),e._uU(28,"Select Created By"),e.qZA()()(),e.TgZ(29,"div")(30,"label",17),e._uU(31,"Created At:"),e.qZA(),e._UZ(32,"br"),e.TgZ(33,"input",18),e.NdJ("click",function(){e.CHM(c);const m=e.MAs(35);return e.KtG(m.open())})("ngModelChange",function(m){return n.filters.created_at=m}),e.qZA(),e._UZ(34,"mat-datepicker",null,19),e.qZA()(),e.TgZ(36,"div",20)(37,"button",21),e.NdJ("click",function(){return n.resetFilters()}),e._uU(38," Reset Filters "),e.qZA(),e.TgZ(39,"button",22),e.NdJ("click",function(){return n.searchCurrencies()}),e._uU(40),e.qZA()()(),e._UZ(41,"hr",23),e.qZA(),e.TgZ(42,"div",0)(43,"div",24)(44,"div",25)(45,"div",26)(46,"h3",27),e._uU(47),e.qZA()(),e.TgZ(48,"div",28)(49,"div",29)(50,"div",30)(51,"table",31)(52,"thead")(53,"tr")(54,"th",32),e._uU(55," Name "),e.qZA(),e.TgZ(56,"th",33),e._uU(57," Currency Code "),e.qZA(),e.TgZ(58,"th",33),e._uU(59," Default Rate "),e.qZA(),e.TgZ(60,"th",33),e._uU(61," Created By "),e.qZA(),e.TgZ(62,"th",33),e._uU(63," Created At "),e.qZA(),e._UZ(64,"th",34),e.qZA()(),e.TgZ(65,"tbody"),e.YNc(66,N,20,8,"tr",35),e.YNc(67,J,3,0,"tr",36),e.qZA()()(),e.TgZ(68,"div",37),e._UZ(69,"div",38),e.TgZ(70,"div",39),e.YNc(71,E,1,3,"app-pagination",40),e.qZA()()()()()()()}if(2&r){const c=e.MAs(35);e.xp6(6),e.Q6J("ngIf",n.permissionService.hasPermission("Settings - Master Data - Can Create Currency")),e.xp6(1),e.Q6J("errorMessages",n.errorMessages)("successMessage",n.successMessage),e.xp6(9),e.Q6J("ngModel",n.filters.name),e.xp6(5),e.Q6J("ngModel",n.filters.currency_code),e.xp6(12),e.Q6J("matDatepicker",c)("ngModel",n.filters.created_at),e.xp6(4),e.Q6J("disabled",n.loading),e.xp6(2),e.Q6J("disabled",n.loading),e.xp6(1),e.hij(" ",n.loading?"Loading...":"Search"," "),e.xp6(7),e.lnq(" Showing ",n.from," to ",n.to," of ",n.totalItems," currencies "),e.xp6(19),e.Q6J("ngForOf",n.currencies),e.xp6(1),e.Q6J("ngIf",0==n.currencies.length),e.xp6(4),e.Q6J("ngIf",!n.loading)}},dependencies:[t.sg,t.O5,v.rH,b.Q,i.w,l.YN,l.Kr,l.Fj,l.JJ,l.On,g.Mq,g.hl]}),o})();var S=s(507),Y=s(5730),w=s(3238);const F=[{path:"",component:P}];let O=(()=>{const d=class{};let o=d;return d.\u0275fac=function(r){return new(r||d)},d.\u0275mod=e.oAB({type:d}),d.\u0275inj=e.cJS({providers:[{provide:w.Ad,useValue:"en-GB"}],imports:[t.ez,v.Bz.forChild(F),S.u,Y.n,l.u5,g.FA,w.XK]}),o})()}}]);