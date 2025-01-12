"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3149],{12:(U,p,i)=>{i.d(p,{w:()=>T});var e=i(1571),Z=i(6895);function _(r,a){if(1&r&&(e.TgZ(0,"p"),e._uU(1),e.qZA()),2&r){const d=a.$implicit;e.xp6(1),e.Oqu(d)}}function v(r,a){if(1&r&&(e.TgZ(0,"div",2)(1,"div",3),e._uU(2," Error "),e.qZA(),e.TgZ(3,"div",4),e.YNc(4,_,2,1,"p",5),e.qZA(),e._UZ(5,"div",6),e.qZA()),2&r){const d=e.oxw(2);e.xp6(4),e.Q6J("ngForOf",d.errorMessages)}}function t(r,a){if(1&r&&(e.TgZ(0,"p"),e._uU(1),e.qZA()),2&r){const d=a.$implicit;e.xp6(1),e.Oqu(d)}}function l(r,a){if(1&r&&(e.TgZ(0,"div",4),e.YNc(1,t,2,1,"p",5),e.qZA()),2&r){const d=e.oxw(3);e.xp6(1),e.Q6J("ngForOf",d.errorMessages)}}function x(r,a){if(1&r){const d=e.EpF();e.TgZ(0,"div",2)(1,"div",7),e.NdJ("click",function(){e.CHM(d);const g=e.oxw(2);return e.KtG(g.toggleErrors())}),e._uU(2),e.TgZ(3,"span"),e._uU(4,"(Click here to show)"),e.qZA()(),e.YNc(5,l,2,1,"div",8),e._UZ(6,"div",6),e.qZA()}if(2&r){const d=e.oxw(2);e.xp6(2),e.hij(" Sorry, system find ",d.errorMessages.length," errors. "),e.xp6(3),e.Q6J("ngIf",d.showErrors)}}function y(r,a){if(1&r&&(e.ynx(0),e.YNc(1,v,6,1,"div",1),e.YNc(2,x,7,2,"div",1),e.BQk()),2&r){const d=e.oxw();e.xp6(1),e.Q6J("ngIf",1===d.errorMessages.length),e.xp6(1),e.Q6J("ngIf",d.errorMessages.length>1)}}function A(r,a){if(1&r&&(e.TgZ(0,"div",2)(1,"div",9),e._uU(2," Success "),e.qZA(),e.TgZ(3,"div",10)(4,"p"),e._uU(5),e.qZA()(),e._UZ(6,"div",6),e.qZA()),2&r){const d=e.oxw();e.xp6(5),e.Oqu(d.successMessage)}}let T=(()=>{const a=class{constructor(){this.errorMessages=[],this.successMessage="",this.showErrors=!1}toggleErrors(){this.showErrors=!this.showErrors}};let r=a;return a.\u0275fac=function(g){return new(g||a)},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-alert"]],inputs:{errorMessages:"errorMessages",successMessage:"successMessage"},decls:2,vars:2,consts:[[4,"ngIf"],["role","alert",4,"ngIf"],["role","alert"],[1,"bg-red-500","text-white","font-bold","rounded-t","px-4","py-2"],[1,"border","border-t-0","border-red-400","rounded-b","bg-red-100","px-4","py-3","text-red-700"],[4,"ngFor","ngForOf"],[1,"mb-4"],[1,"bg-red-500","text-white","font-bold","rounded-t","px-4","py-2","cursor-pointer",3,"click"],["class","border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700",4,"ngIf"],[1,"bg-green-500","text-white","font-bold","rounded-t","px-4","py-2"],[1,"border","border-t-0","border-green-400","rounded-b","bg-green-100","px-4","py-3","text-green-700"]],template:function(g,h){1&g&&(e.YNc(0,y,3,2,"ng-container",0),e.YNc(1,A,7,1,"div",1)),2&g&&(e.Q6J("ngIf",h.errorMessages.length>0),e.xp6(1),e.Q6J("ngIf",""!==h.successMessage))},dependencies:[Z.sg,Z.O5]}),r})()},3149:(U,p,i)=>{i.r(p),i.d(p,{ViewModule:()=>I});var e=i(6895),Z=i(1822),_=i(2340),v=i(5439),t=i(1571),l=i(2605),x=i(6690),y=i(6548),A=i(12);const T=function(u,s){return["/settings/country-budget/view/",u,s]};function r(u,s){if(1&u&&(t.TgZ(0,"tr")(1,"td",30),t._uU(2),t.qZA(),t.TgZ(3,"td",31),t._uU(4),t.qZA(),t.TgZ(5,"td",31),t._uU(6),t.qZA(),t.TgZ(7,"td",31),t._uU(8),t.qZA(),t.TgZ(9,"td",31),t._uU(10),t.qZA(),t.TgZ(11,"td",31),t._uU(12),t.qZA(),t.TgZ(13,"td",31),t._uU(14),t.qZA(),t.TgZ(15,"td",31)(16,"div",24),t._uU(17),t.qZA()(),t.TgZ(18,"td",32)(19,"div",33)(20,"div",34)(21,"button",35),t._UZ(22,"i",36),t.qZA(),t.TgZ(23,"div",37)(24,"div",38)(25,"a",39)(26,"span",40),t._UZ(27,"i",41),t.qZA(),t.TgZ(28,"span",42),t._uU(29,"View"),t.qZA()()()()()()()()),2&u){const o=s.$implicit,n=t.oxw(2);t.xp6(2),t.hij(" ",n.getMonthName(o.month)," "),t.xp6(2),t.AsE(" ",o.budget_amount_formatted," ",n.countryBudget.currency," "),t.xp6(2),t.AsE(" ",o.planned_entity_budget_amount_formatted," ",n.countryBudget.currency," "),t.xp6(2),t.AsE(" ",o.planned_budget_amount_formatted," ",n.countryBudget.currency," "),t.xp6(2),t.AsE(" ",o.actual_budget_amount_formatted," ",n.countryBudget.currency," "),t.xp6(2),t.AsE(" ",o.allotted_budget_amount_formatted," ",n.countryBudget.currency," "),t.xp6(2),t.AsE(" ",o.available_budget_amount_formatted," ",n.countryBudget.currency," "),t.xp6(3),t.hij(" ",o.status," "),t.xp6(8),t.Q6J("routerLink",t.WLB(15,T,n.countryBudget.id,o.id))}}const a=function(u){return["/settings/country-budget/edit/",u]};function d(u,s){if(1&u&&(t.TgZ(0,"div",9)(1,"div",10)(2,"div",11)(3,"div",12),t._uU(4),t.qZA(),t.TgZ(5,"div",13),t._uU(6," Total Budget "),t.qZA()(),t.TgZ(7,"div",11)(8,"div",12),t._uU(9),t.qZA(),t.TgZ(10,"div",13),t._uU(11," Planned "),t.qZA()(),t.TgZ(12,"div",11)(13,"div",12),t._uU(14),t.qZA(),t.TgZ(15,"div",13),t._uU(16," Actual "),t.qZA()(),t.TgZ(17,"div",11)(18,"div",12),t._uU(19),t.qZA(),t.TgZ(20,"div",13),t._uU(21," Allotted "),t.qZA()(),t.TgZ(22,"div",11)(23,"div",12),t._uU(24),t.qZA(),t.TgZ(25,"div",13),t._uU(26," Available "),t.qZA()()(),t.TgZ(27,"div",14)(28,"div",15)(29,"div",16)(30,"h3",17),t._uU(31," Country Budget Information "),t.qZA(),t.TgZ(32,"button",18),t._UZ(33,"i",19),t._uU(34," Edit Budget "),t.qZA()(),t.TgZ(35,"div",20)(36,"table",21)(37,"tbody")(38,"tr")(39,"td",22),t._uU(40," Country "),t.qZA(),t.TgZ(41,"td",23),t._uU(42),t.qZA()(),t.TgZ(43,"tr")(44,"td",22),t._uU(45," Year "),t.qZA(),t.TgZ(46,"td",23),t._uU(47),t.qZA()(),t.TgZ(48,"tr")(49,"td",22),t._uU(50," Total Budget "),t.qZA(),t.TgZ(51,"td",23),t._uU(52),t.qZA()(),t.TgZ(53,"tr")(54,"td",22),t._uU(55," Total Planned Entity "),t.qZA(),t.TgZ(56,"td",23),t._uU(57),t.qZA()(),t.TgZ(58,"tr")(59,"td",22),t._uU(60," Status "),t.qZA(),t.TgZ(61,"td",23)(62,"div",24),t._uU(63),t.qZA()()()()()()(),t.TgZ(64,"div",15)(65,"div",16)(66,"h3",17),t._uU(67," Monthly Amounts "),t.qZA()(),t.TgZ(68,"div",25)(69,"table",26)(70,"thead")(71,"tr")(72,"th",27),t._uU(73,"Month"),t.qZA(),t.TgZ(74,"th",28),t._uU(75,"Amount"),t.qZA(),t.TgZ(76,"th",28),t._uU(77,"Planned Entity"),t.qZA(),t.TgZ(78,"th",28),t._uU(79,"Planned"),t.qZA(),t.TgZ(80,"th",28),t._uU(81,"Actual"),t.qZA(),t.TgZ(82,"th",28),t._uU(83,"Allotted"),t.qZA(),t.TgZ(84,"th",28),t._uU(85,"Available"),t.qZA(),t.TgZ(86,"th",28),t._uU(87,"Status"),t.qZA(),t.TgZ(88,"th",28),t._uU(89,"Action"),t.qZA()()(),t.TgZ(90,"tbody"),t.YNc(91,r,30,18,"tr",29),t.qZA()()()()()()),2&u){const o=t.oxw();t.xp6(4),t.hij(" ",o.countryBudget.total_budget_formatted||"0.00"," "),t.xp6(5),t.hij(" ",o.countryBudget.total_planned_budget_amount_formatted||"0.00"," "),t.xp6(5),t.hij(" ",o.countryBudget.total_actual_budget_amount_formatted||"0.00"," "),t.xp6(5),t.hij(" ",o.countryBudget.total_allotted_budget_amount_formatted||"0.00"," "),t.xp6(5),t.hij(" ",o.countryBudget.total_available_budget_amount_formatted||"0.00"," "),t.xp6(8),t.Q6J("routerLink",t.VKq(14,a,o.countryBudget.id)),t.xp6(10),t.hij(" ",null==o.countryBudget.country?null:o.countryBudget.country.name," "),t.xp6(5),t.hij(" ",o.countryBudget.year," "),t.xp6(5),t.AsE(" ",o.countryBudget.total_budget_formatted," ",o.countryBudget.currency," "),t.xp6(5),t.AsE(" ",o.countryBudget.total_planned_entity_budget_amount_formatted," ",o.countryBudget.currency," "),t.xp6(6),t.hij(" ",o.countryBudget.status," "),t.xp6(28),t.Q6J("ngForOf",o.monthlyAmounts)}}function f(u,s){1&u&&(t.TgZ(0,"div",43),t.O4$(),t.TgZ(1,"svg",44),t._UZ(2,"path",45)(3,"path",46),t.qZA(),t.kcU(),t.TgZ(4,"p",32),t._uU(5,"Loading..."),t.qZA()())}let g=(()=>{const s=class{constructor(n,c,m,j){this.router=n,this.route=c,this.headerService=m,this.permissionService=j,this.modelId=null,this.errorMessages=[],this.loading=!1,this.successMessage="",this.monthlyAmounts=[],this.countryBudget=null,this.countries=[],this.totalCountryBudget=0,this.form={id:"",year:"",country_id:"",currency:"SGD",monthly_amounts:[]},this.headerService.setupHeader([{title:"Settings"},{title:"Country Budget",link:"/settings/country-budget"},{title:"View Country Budget"}])}ngOnInit(){this.route.params.subscribe(n=>{this.modelId=n.id,this.getBudget()}),this.route.queryParams.subscribe(n=>{n.success_message&&(window.scrollTo(0,0),this.successMessage="Country budget created successfully",this.clearMessages())})}getBudget(){this.loading=!0,Z.Z.get(`${_.N.api_url}/settings/country-budgets/${this.modelId}`,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${window.localStorage.getItem(_.N.api_token_identifier)}`}}).then(n=>{n.data.error?this.errorMessages=n.data.error_message:(this.countryBudget=n.data.country_budget,this.totalCountryBudget=n.data.country_budget.total_budget,this.monthlyAmounts=n.data.country_budget.monthly_amounts)}).catch(n=>{this.errorMessages=n.response.data.error_message}).finally(()=>{this.loading=!1})}getMonthName(n){return v().month(n-1).format("MMMM")}clearMessages(){setTimeout(()=>{this.successMessage=""},3500)}};let u=s;return s.\u0275fac=function(c){return new(c||s)(t.Y36(l.F0),t.Y36(l.gz),t.Y36(x.r),t.Y36(y.$))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-view"]],inputs:{modelId:"modelId"},decls:11,vars:4,consts:[[1,"container-fixed"],[1,"flex","flex-wrap","items-center","lg:items-end","justify-between","gap-5","pb-7.5"],[1,"flex","flex-col","justify-center","gap-2"],[1,"text-xl","font-medium","leading-none","text-gray-900"],[1,"flex","items-center","gap-2.5"],["routerLink","/settings/country-budget",1,"btn","btn-sm","btn-light"],[3,"errorMessages","successMessage"],["class","grid gap-5 lg:gap-7.5 w-full mx-left",4,"ngIf"],["class","p-5",4,"ngIf"],[1,"grid","gap-5","lg:gap-7.5","w-full","mx-left"],[1,"grid","grid-cols-5","gap-4","mb-7.5","w-full"],[1,"card","p-4","text-center","w-full"],[1,"text-2xl","font-semibold","text-primary","mb-2"],[1,"text-gray-600","text-sm"],[1,"flex","flex-col","gap-5"],[1,"card"],[1,"card-header"],[1,"card-title"],[1,"btn","btn-light","btn-sm",3,"routerLink"],[1,"ki-filled","ki-notepad-edit"],[1,"card-body","pt-4","pb-2"],[1,"table-auto"],[1,"text-sm","text-gray-600","min-w-36","pb-5","pe-6"],[1,"text-sm","text-gray-800","pb-5"],[1,"badge","badge-sm","badge-success","badge-outline"],[1,"card-table","scrollable-x-auto"],[1,"table"],[1,"min-w-52"],[1,"min-w-24"],[4,"ngFor","ngForOf"],[1,"text-sm","text-gray-800","font-normal"],[1,"lg:text-start"],[1,"text-center"],["data-menu","true",1,"menu","flex-inline"],["data-menu-item-offset","0, 10px","data-menu-item-placement","bottom-end","data-menu-item-placement-rtl","bottom-start","data-menu-item-toggle","dropdown","data-menu-item-trigger","click|lg:click",1,"menu-item"],[1,"menu-toggle","btn","btn-sm","btn-icon","btn-light","btn-clear"],[1,"ki-filled","ki-dots-vertical"],["data-menu-dismiss","true",1,"menu-dropdown","menu-default","w-full","max-w-[175px]"],[1,"menu-item"],[1,"menu-link",3,"routerLink"],[1,"menu-icon"],[1,"ki-filled","ki-setting-2"],[1,"menu-title"],[1,"p-5"],["aria-hidden","true","viewBox","0 0 100 101","fill","none","xmlns","http://www.w3.org/2000/svg",1,"w-10","h-10","m-auto","text-gray-200","animate-spin","dark:text-gray-600","fill-green-600"],["d","M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z","fill","currentColor"],["d","M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z","fill","currentFill"]],template:function(c,m){1&c&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),t._uU(4," View Country Budget "),t.qZA()(),t.TgZ(5,"div",4)(6,"a",5),t._uU(7," Back "),t.qZA()()(),t._UZ(8,"app-alert",6),t.YNc(9,d,92,16,"div",7),t.YNc(10,f,6,0,"div",8),t.qZA()),2&c&&(t.xp6(8),t.Q6J("errorMessages",m.errorMessages)("successMessage",m.successMessage),t.xp6(1),t.Q6J("ngIf",!m.loading),t.xp6(1),t.Q6J("ngIf",m.loading))},dependencies:[e.sg,e.O5,l.rH,A.w]}),u})();var h=i(433),C=i(5730),q=i(4859),B=i(4144),M=i(9602),b=i(3238),w=i(9549);const E=[{path:"",component:g}];let I=(()=>{const s=class{};let u=s;return s.\u0275fac=function(c){return new(c||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({providers:[{provide:b.Ad,useValue:"en-GB"}],imports:[e.ez,l.Bz.forChild(E),h.u5,C.n,q.ot,B.c,M.FA,b.XK,w.lN]}),u})()}}]);