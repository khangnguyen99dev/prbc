"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[70],{1070:(H,v,i)=>{i.r(v),i.d(v,{ManagerModule:()=>G});var p=i(6895),d=i(2605),e=i(1571),U=i(6690),y=i(5861),u=i(1822),c=i(2340),M=i(5439),T=i(6548),Z=i(12),l=i(433),h=i(9602);function S(o,n){if(1&o){const r=e.EpF();e.TgZ(0,"div",6)(1,"label",7),e._uU(2," Date Active "),e.TgZ(3,"span",8),e._uU(4,"\xa0*"),e.qZA()(),e.TgZ(5,"input",22),e.NdJ("click",function(){e.CHM(r);const s=e.MAs(7);return e.KtG(s.open())})("ngModelChange",function(s){e.CHM(r);const a=e.oxw();return e.KtG(a.form.date_active=s)}),e.qZA(),e._UZ(6,"mat-datepicker",null,23),e.TgZ(8,"div",24),e._uU(9," (Start date active) "),e.qZA()()}if(2&o){const r=e.MAs(7),t=e.oxw();e.xp6(5),e.Q6J("matDatepicker",r)("ngModel",t.form.date_active)}}function z(o,n){if(1&o){const r=e.EpF();e.TgZ(0,"button",25),e.NdJ("click",function(){e.CHM(r);const s=e.oxw();return e.KtG(s.editRecurringOperationalCost())}),e._uU(1),e.qZA()}if(2&o){const r=e.oxw();e.Q6J("disabled",r.loading),e.xp6(1),e.hij(" ",r.loading?"Saving...":"Update Changes"," ")}}let J=(()=>{const n=class{constructor(t,s,a){this.router=t,this.route=s,this.permissionService=a,this.modelId=null,this.errorMessages=[],this.successMessage="",this.settingUp=!0,this.successSetup=!1,this.form={name:"",code:"",description:"",entity_id:"",cost_amount_in_local_currency:"",active:0,date_active:M(new Date).format("YYYY-MM-DD"),entityObject:null},this.loading=!1}editRecurringOperationalCost(){this.errorMessages=[],this.successMessage="",this.loading=!0,1==this.form.active&&(this.form.date_active=M(this.form.date_active).format("YYYY-MM-DD"));const t=new FormData;t.append("id",this.modelId),t.append("name",this.form.name),t.append("code",this.form.code),t.append("description",this.form.description),t.append("entity_id",this.form.entity_id),t.append("cost_amount_in_local_currency",this.form.cost_amount_in_local_currency),t.append("active",this.form.active),t.append("date_active",this.form.date_active),t.append("_method","PUT"),u.Z.post(`${c.N.api_url}/settings/recurring-operational-costs/${this.modelId}`,t,{headers:{Accept:"application/json","Content-Type":"multipart/form-data",Authorization:`Bearer ${window.localStorage.getItem(c.N.api_token_identifier)}`}}).then(s=>{if(s.data.error)return this.errorMessages.push(s.data.error_message),window.scrollTo(0,0),this.loading=!1,void this.clearMessages();this.successMessage=s.data.success_message,window.scrollTo(0,0),setTimeout(()=>{this.successMessage="",this.loading=!1},3500)}).catch(s=>{console.error(s),422==s.response.status?Object.keys(s.response.data.errors).forEach(a=>{this.errorMessages.push(s.response.data.errors[a])}):this.errorMessages.push("Sorry, something went wrong. Please try again later."),window.scrollTo(0,0),this.loading=!1,this.clearMessages()})}clearMessages(){setTimeout(()=>{this.successMessage=""},3500)}setupSelectize(){const t=this;$(function(){$("#entity_selectize").selectize()[0].selectize.destroy();const a=$("#entity_selectize").selectize({preload:!0,valueField:"id",searchField:"label",labelField:"label",load:(m,I)=>{$("#fetching_entity").show(),$.ajax({url:`${c.N.api_url}/settings/entities?search_selectize=${m}`,type:"GET",error:function(){I(),$("#fetching_entity").hide()},success:V=>{I(V?.entities?.data),$("#fetching_entity").hide()},headers:{Authorization:`Bearer ${window.localStorage.getItem(c.N.api_token_identifier)}`,"Content-Type":"application/json"}})},onChange:m=>{t.form.entity_id=m}})[0].selectize;t.form.entity_id&&(a.addOption(t.form.entityObject),a.setValue(t.form.entity_id)),$("#active_selectize").selectize({onChange:m=>{t.form.active=m}})[0].selectize.setValue(t.form.active)})}setup(){var t=this;return(0,y.Z)(function*(){try{const a=yield(yield u.Z.get(`${c.N.api_url}/settings/recurring-operational-costs/${t.modelId}`,{headers:{Authorization:`Bearer ${window.localStorage.getItem(c.N.api_token_identifier)}`}})).data;if(t.settingUp=!1,a.error)return t.errorMessages.push(a.error_message),window.scrollTo(0,0),void t.clearMessages();console.log(a),t.form.name=a.recurring_operational_cost.name,t.form.code=a.recurring_operational_cost.code,t.form.description=a.recurring_operational_cost.description,t.form.entity_id=a.recurring_operational_cost.entity_id,t.form.cost_amount_in_local_currency=a.recurring_operational_cost.cost_amount_in_local_currency,t.form.active=a.recurring_operational_cost.active,t.form.date_active=a.recurring_operational_cost.date_active,t.form.entityObject=a.recurring_operational_cost.entity,t.setupSelectize(),t.successSetup=!0}catch(s){console.log(s),t.errorMessages=["Sorry, something went wrong. Please try again later."],window.scrollTo(0,0),t.settingUp=!1}})()}ngOnInit(){this.setup(),this.route.queryParams.subscribe(t=>{t.success_message&&(window.scrollTo(0,0),this.successMessage="Recurring operational cost created successfully",this.clearMessages())})}};let o=n;return n.\u0275fac=function(s){return new(s||n)(e.Y36(d.F0),e.Y36(d.gz),e.Y36(T.$))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-details"]],inputs:{modelId:"modelId"},decls:54,vars:8,consts:[[3,"errorMessages","successMessage"],[1,"grid","gap-5","lg:gap-7.5","w-full","mx-auto"],[1,"card","pb-2.5"],["id","basic_settings",1,"card-header"],[1,"card-title"],[1,"card-body","grid","grid-cols-1","gap-4"],[1,"flex","items-center","flex-wrap","lg:flex-nowrap","gap-2.5"],[1,"form-label","max-w-56"],[1,"text-danger"],["id","fetching_entity",1,"pt-2","text-sm",2,"display","none"],["name","entity_selectize","id","entity_selectize","disabled","",1,"w-full"],["value",""],["type","number","onkeypress","return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46","placeholder","Enter cost amount in local currency",1,"input",3,"ngModel","ngModelChange"],["name","active","id","active_selectize",1,"w-full"],["value","1"],["value","0"],["class","flex items-center flex-wrap lg:flex-nowrap gap-2.5",4,"ngIf"],["type","text","placeholder","Enter name",1,"input",3,"ngModel","ngModelChange"],["type","text","placeholder","Enter code",1,"input",3,"ngModel","ngModelChange"],["rows","3","placeholder","Enter description",1,"textarea","text-2sm","text-gray-600","font-normal",3,"ngModel","ngModelChange"],[1,"flex","justify-end"],["class","btn btn-primary",3,"disabled","click",4,"ngIf"],["name","date_active","placeholder","Select Date Active",1,"input",3,"matDatepicker","ngModel","click","ngModelChange"],["date_active",""],[1,"text-gray-500","text-xs","whitespace-nowrap"],[1,"btn","btn-primary",3,"disabled","click"]],template:function(s,a){1&s&&(e._UZ(0,"app-alert",0),e.TgZ(1,"div",1)(2,"div",2)(3,"div",3)(4,"h3",4),e._uU(5," Recurring Operational Cost Information "),e.qZA()(),e.TgZ(6,"div",5)(7,"div",6)(8,"label",7),e._uU(9," Entity "),e.TgZ(10,"span",8),e._uU(11,"\xa0*"),e.qZA()(),e.TgZ(12,"p",9),e._uU(13,"Fetching Entities..."),e.qZA(),e.TgZ(14,"select",10)(15,"option",11),e._uU(16,"Select Entity"),e.qZA()()(),e.TgZ(17,"div",6)(18,"label",7),e._uU(19," Cost Amount in Local Currency "),e.TgZ(20,"span",8),e._uU(21,"\xa0*"),e.qZA()(),e.TgZ(22,"input",12),e.NdJ("ngModelChange",function(g){return a.form.cost_amount_in_local_currency=g}),e.qZA()(),e.TgZ(23,"div",6)(24,"label",7),e._uU(25," Active "),e.TgZ(26,"span",8),e._uU(27,"\xa0*"),e.qZA()(),e.TgZ(28,"select",13)(29,"option",11),e._uU(30,"Select Active"),e.qZA(),e.TgZ(31,"option",14),e._uU(32,"Active"),e.qZA(),e.TgZ(33,"option",15),e._uU(34,"Inactive"),e.qZA()()(),e.YNc(35,S,10,2,"div",16),e.TgZ(36,"div",6)(37,"label",7),e._uU(38," Name "),e.TgZ(39,"span",8),e._uU(40,"\xa0*"),e.qZA()(),e.TgZ(41,"input",17),e.NdJ("ngModelChange",function(g){return a.form.name=g}),e.qZA()(),e.TgZ(42,"div",6)(43,"label",7),e._uU(44," Code "),e.TgZ(45,"span",8),e._uU(46,"\xa0*"),e.qZA()(),e.TgZ(47,"input",18),e.NdJ("ngModelChange",function(g){return a.form.code=g}),e.qZA()(),e.TgZ(48,"div",6)(49,"label",7),e._uU(50," Description "),e.qZA(),e.TgZ(51,"textarea",19),e.NdJ("ngModelChange",function(g){return a.form.description=g}),e.qZA()(),e.TgZ(52,"div",20),e.YNc(53,z,2,2,"button",21),e.qZA()()()()),2&s&&(e.Q6J("errorMessages",a.errorMessages)("successMessage",a.successMessage),e.xp6(22),e.Q6J("ngModel",a.form.cost_amount_in_local_currency),e.xp6(13),e.Q6J("ngIf",1==a.form.active),e.xp6(6),e.Q6J("ngModel",a.form.name),e.xp6(6),e.Q6J("ngModel",a.form.code),e.xp6(4),e.Q6J("ngModel",a.form.description),e.xp6(2),e.Q6J("ngIf",a.permissionService.hasPermission("Settings - Can Create Recurring Operational Cost")))},dependencies:[p.O5,Z.w,l.YN,l.Kr,l.Fj,l.wV,l.JJ,l.On,h.Mq,h.hl]}),o})();var N=i(4909);function j(o,n){if(1&o&&(e.TgZ(0,"tr")(1,"td",16),e._uU(2),e.qZA(),e.TgZ(3,"td",16),e._uU(4),e.qZA()()),2&o){const r=n.$implicit;e.xp6(2),e.hij(" ",r.date_formatted," "),e.xp6(2),e.hij(" ",r.cost_amount_in_local_currency_formatted," ")}}function P(o,n){1&o&&(e.TgZ(0,"tr")(1,"td",17),e._uU(2," No ROC months found "),e.qZA()())}function D(o,n){if(1&o){const r=e.EpF();e.TgZ(0,"app-pagination",18),e.NdJ("selectedPage",function(s){e.CHM(r);const a=e.oxw();return e.KtG(a.selectedPage(s))}),e.qZA()}if(2&o){const r=e.oxw();e.Q6J("perPage",r.perPage)("totalItems",r.totalItems)("currentPage",r.page)}}let O=(()=>{const n=class{constructor(t){this.permissionService=t,this.modelId=null,this.rocMonths=[],this.loading=!1,this.loadingRocMonth=!1,this.settingUp=!1,this.successSetup=!1,this.page=1,this.totalItems=0,this.perPage=10,this.to="",this.from="",this.roc={},this.errorMessages=[],this.successMessage=""}ngOnInit(){this.setup()}getRocMonths(){this.loading=!0,u.Z.get(`${c.N.api_url}/settings/recurring-operational-costs/${this.modelId}/months`,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${window.localStorage.getItem(c.N.api_token_identifier)}`},params:{page:this.page,per_page:this.perPage}}).then(t=>{if(t.data.error)return this.errorMessages.push(t.data.error_message),window.scrollTo(0,0),this.loading=!1,void this.clearMessages();this.rocMonths=t.data.roc_months.data,this.totalItems=t.data.roc_months.total,this.to=t.data.roc_months.to,this.from=t.data.roc_months.from,this.loading=!1}).catch(t=>{console.error(t),422==t.response.status?Object.keys(t.response.data.errors).forEach(s=>{this.errorMessages.push(t.response.data.errors[s])}):this.errorMessages.push("Sorry, something went wrong. Please try again later."),window.scrollTo(0,0),this.loading=!1,this.clearMessages()})}selectedPage(t){this.page=t,this.getRocMonths()}clearMessages(){setTimeout(()=>{this.successMessage=""},3500)}runManualRocMonth(){this.loadingRocMonth=!0,this.errorMessages=[],this.successMessage="";const t=new FormData;t.append("id",this.modelId),u.Z.post(`${c.N.api_url}/settings/recurring-operational-costs/${this.modelId}/run-manual-roc-month`,t,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${window.localStorage.getItem(c.N.api_token_identifier)}`}}).then(s=>{if(s.data.error)return this.errorMessages.push(s.data.error_message),window.scrollTo(0,0),this.loadingRocMonth=!1,void this.clearMessages();this.loadingRocMonth=!1,this.successMessage=s.data.success_message,this.getRocMonths(),setTimeout(()=>{this.successMessage="",this.loadingRocMonth=!1},3500)}).catch(s=>{console.error(s),422==s.response.status?Object.keys(s.response.data.errors).forEach(a=>{this.errorMessages.push(s.response.data.errors[a])}):this.errorMessages.push("Sorry, something went wrong. Please try again later."),window.scrollTo(0,0),this.loadingRocMonth=!1,this.clearMessages()})}setup(){var t=this;return(0,y.Z)(function*(){try{const a=yield(yield u.Z.get(`${c.N.api_url}/settings/recurring-operational-costs/${t.modelId}`,{headers:{Authorization:`Bearer ${window.localStorage.getItem(c.N.api_token_identifier)}`}})).data;if(t.settingUp=!1,a.error)return t.errorMessages.push(a.error_message),window.scrollTo(0,0),void t.clearMessages();console.log(a),t.roc=a.recurring_operational_cost,t.getRocMonths(),t.successSetup=!0}catch(s){console.log(s),t.errorMessages=["Sorry, something went wrong. Please try again later."],window.scrollTo(0,0),t.settingUp=!1}})()}};let o=n;return n.\u0275fac=function(s){return new(s||n)(e.Y36(T.$))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-roc-month"]],inputs:{modelId:"modelId"},decls:23,vars:8,consts:[[3,"errorMessages","successMessage"],[1,"grid","gap-5","lg:gap-7.5"],[1,"card","card-grid","min-w-full"],[1,"card-header","flex-wrap","gap-2"],[1,"card-title","font-medium","text-sm"],[1,"card-body"],["data-datatable","true","data-datatable-page-size","20"],[1,"scrollable-x-auto"],["data-datatable-table","true",1,"table","table-auto","table-border"],[1,"min-w-[180px]"],[4,"ngFor","ngForOf"],[4,"ngIf"],[1,"card-footer","justify-center","md:justify-between","flex-col","md:flex-row","gap-5","text-gray-600","text-2sm","font-medium"],[1,"flex","items-center","gap-2","order-2","md:order-1"],[1,"flex","items-center","gap-4","order-1","md:order-2"],[3,"perPage","totalItems","currentPage","selectedPage",4,"ngIf"],[1,"text-gray-800","font-normal"],["colspan","2",1,"text-center","text-gray-500","font-normal"],[3,"perPage","totalItems","currentPage","selectedPage"]],template:function(s,a){1&s&&(e._UZ(0,"app-alert",0),e.TgZ(1,"div",1)(2,"div",2)(3,"div",3)(4,"h3",4),e._uU(5),e.qZA()(),e.TgZ(6,"div",5)(7,"div",6)(8,"div",7)(9,"table",8)(10,"thead")(11,"tr")(12,"th",9),e._uU(13," Date "),e.qZA(),e.TgZ(14,"th",9),e._uU(15," Cost Amount "),e.qZA()()(),e.TgZ(16,"tbody"),e.YNc(17,j,5,2,"tr",10),e.YNc(18,P,3,0,"tr",11),e.qZA()()(),e.TgZ(19,"div",12),e._UZ(20,"div",13),e.TgZ(21,"div",14),e.YNc(22,D,1,3,"app-pagination",15),e.qZA()()()()()()),2&s&&(e.Q6J("errorMessages",a.errorMessages)("successMessage",a.successMessage),e.xp6(5),e.lnq(" Showing ",a.from," to ",a.to," of ",a.totalItems," ROC months "),e.xp6(12),e.Q6J("ngForOf",a.rocMonths),e.xp6(1),e.Q6J("ngIf",0==a.rocMonths.length),e.xp6(4),e.Q6J("ngIf",!a.loading))},dependencies:[p.sg,p.O5,Z.w,N.Q]}),o})();function q(o,n){if(1&o&&(e.ynx(0),e._UZ(1,"app-details",11),e.BQk()),2&o){const r=e.oxw();e.xp6(1),e.Q6J("modelId",r.modelId)}}function Q(o,n){if(1&o&&(e.ynx(0),e._UZ(1,"app-roc-month",11),e.BQk()),2&o){const r=e.oxw();e.xp6(1),e.Q6J("modelId",r.modelId)}}const w=function(o){return[o]},R=function(){return{tab:"details"}},F=function(){return{tab:"roc_month"}};let Y=(()=>{const n=class{constructor(t,s){this.headerService=t,this.route=s,this.modelId=0,this.currentTab="details",this.headerService.setupHeader([{title:"Settings"},{title:"Recurring Operational Cost",link:"/settings/recurring-operational-cost"},{title:"Manager ROC"}])}ngOnInit(){this.modelId=this.route.snapshot.params.id,this.route.queryParams.subscribe(t=>{this.currentTab=t.tab??"details"})}};let o=n;return n.\u0275fac=function(s){return new(s||n)(e.Y36(U.r),e.Y36(d.gz))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-manager"]],decls:18,vars:16,consts:[[1,"container-fixed"],[1,"flex","items-center","flex-wrap","md:flex-nowrap","lg:items-end","justify-between","border-b","border-b-gray-200","dark:border-b-coal-100","gap-3","lg:gap-6","mb-2"],[1,"grid"],[1,"scrollable-x-auto"],["data-menu","true",1,"menu","gap-3"],[1,"menu-item","border-b-2","border-b-transparent","menu-item-active:border-b-primary","menu-item-here:border-b-primary"],["tabindex","0",1,"menu-link","gap-1.5","pb-2","lg:pb-4","px-2",3,"routerLink","queryParams"],[1,"menu-title","text-nowrap","font-medium","text-sm","text-gray-700","menu-item-active:text-primary","menu-item-active:font-semibold","menu-item-here:text-primary","menu-item-here:font-semibold","menu-item-show:text-primary","menu-link-hover:text-primary"],[1,"flex","items-center","justify-end","grow","lg:grow-0","lg:pb-4","gap-2.5","mb-3","lg:mb-0"],["routerLink","/settings/recurring-operational-cost",1,"btn","btn-sm","btn-light"],[4,"ngIf"],[3,"modelId"]],template:function(s,a){1&s&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"a",6)(7,"span",7),e._uU(8," Details "),e.qZA()()(),e.TgZ(9,"div",5)(10,"a",6)(11,"span",7),e._uU(12," ROC Month "),e.qZA()()()()()(),e.TgZ(13,"div",8)(14,"button",9),e._uU(15," Back "),e.qZA()()(),e.YNc(16,q,2,1,"ng-container",10),e.YNc(17,Q,2,1,"ng-container",10),e.qZA()),2&s&&(e.xp6(5),e.ekj("active","details"===a.currentTab),e.xp6(1),e.Q6J("routerLink",e.VKq(10,w,"/settings/recurring-operational-cost/"+a.modelId))("queryParams",e.DdM(12,R)),e.xp6(3),e.ekj("active","roc_month"===a.currentTab),e.xp6(1),e.Q6J("routerLink",e.VKq(13,w,"/settings/recurring-operational-cost/"+a.modelId))("queryParams",e.DdM(15,F)),e.xp6(6),e.Q6J("ngIf","details"===a.currentTab),e.xp6(1),e.Q6J("ngIf","roc_month"===a.currentTab))},dependencies:[p.O5,d.rH,J,O]}),o})();var x=i(5730),b=i(9549),A=i(4144),C=i(4859),f=i(3238);let B=(()=>{const n=class{};let o=n;return n.\u0275fac=function(s){return new(s||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[{provide:f.Ad,useValue:"en-GB"}],imports:[p.ez,d.Bz,x.n,l.u5,C.ot,A.c,h.FA,f.XK,b.lN]}),o})();var E=i(507);let k=(()=>{const n=class{};let o=n;return n.\u0275fac=function(s){return new(s||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[{provide:f.Ad,useValue:"en-GB"}],imports:[p.ez,d.Bz,x.n,l.u5,C.ot,A.c,h.FA,f.XK,b.lN,E.u]}),o})();const K=[{path:"",component:Y}];let G=(()=>{const n=class{};let o=n;return n.\u0275fac=function(s){return new(s||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[p.ez,d.Bz.forChild(K),l.u5,B,k,d.Bz]}),o})()}}]);