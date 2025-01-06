"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[54],{9054:(j,d,n)=>{n.r(d),n.d(d,{CreateModule:()=>S});var p=n(6895),m=n(1822),u=n(2340),e=n(1571),v=n(6690),c=n(2605),Z=n(6548),M=n(2013),g=n(433),y=n(12);function C(a,o){if(1&a&&(e.TgZ(0,"option",27),e._uU(1),e.qZA()),2&a){const f=o.$implicit;e.Q6J("value",f.id),e.xp6(1),e.Oqu(f.name)}}let T=(()=>{const o=class{constructor(i,l,t,r){this.headerService=i,this.router=l,this.permissionService=t,this.notificationService=r,this.errorMessages=[],this.successMessage="",this.entities=[],this.loading=!1,this.form={name:"",code:"",currency:"",total_bonus:"",minimum_management_bonus:"",description:""},this.headerService.setupHeader([{title:"Settings"},{title:"Bonus Pool",link:"/settings/bonus-pool"},{title:"New Bonus Pool"}])}createBonusPool(){this.errorMessages=[],this.successMessage="",this.loading=!0,this.form.currency=$("#currency_selectize").val(),m.Z.post(`${u.N.api_url}/settings/bonus-pools`,this.form,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${window.localStorage.getItem(u.N.api_token_identifier)}`}}).then(i=>{i.data.error?(this.errorMessages=[i.data.error_message],window.scrollTo(0,0),this.loading=!1):this.router.navigateByUrl("/settings/bonus-pool/"+i.data.bonus_pool.id+"?success_message=true")}).catch(i=>{this.errorMessages=i.response.data.errors,this.loading=!1})}getEntities(){m.Z.get(`${u.N.api_url}/settings/entities`,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${window.localStorage.getItem(u.N.api_token_identifier)}`}}).then(i=>{this.entities=i.data.entities.data}).catch(i=>{this.errorMessages=i.response.data.errors,this.loading=!1})}setupSelectize(){$(function(){$("#currency_selectize").selectize()[0].selectize.destroy(),$("#currency_selectize").selectize({preload:!0,valueField:"currency_code",searchField:"label",labelField:"label",load:(r,s)=>{$("#fetching_currency").show(),$.ajax({url:`${u.N.api_url}/settings/currencies?search_selectize=${r}`,type:"GET",error:function(){s(),$("#fetching_currency").hide()},success:B=>{s(B?.currencies?.data),$("#fetching_currency").hide()},headers:{Authorization:`Bearer ${window.localStorage.getItem(u.N.api_token_identifier)}`,"Content-Type":"application/json"}})}})})}ngOnInit(){this.getEntities(),this.setupSelectize()}};let a=o;return o.\u0275fac=function(l){return new(l||o)(e.Y36(v.r),e.Y36(c.F0),e.Y36(Z.$),e.Y36(M.g))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-create"]],decls:64,vars:11,consts:[[1,"container-fixed"],[1,"flex","flex-wrap","items-center","lg:items-end","justify-between","gap-5","pb-7.5"],[1,"flex","flex-col","justify-center","gap-2"],[1,"text-xl","font-medium","leading-none","text-gray-900"],[1,"flex","items-center","gap-2.5"],["routerLink","/settings/budget-management",1,"btn","btn-sm","btn-light"],[3,"errorMessages","successMessage"],[1,"grid","gap-5","lg:gap-7.5","w-full","mx-left"],["id","basic_settings",1,"pl-0"],[1,"card-title","pl-0"],[1,"my-4"],[1,"grid","gap-5"],[1,"flex","items-center","flex-wrap","lg:flex-nowrap","gap-2.5"],[1,"form-label","max-w-56"],[1,"text-danger"],["placeholder","Select entity name",1,"input",3,"ngModel","ngModelChange"],["value","","disabled",""],[3,"value",4,"ngFor","ngForOf"],["type","text","placeholder","Enter name",1,"input",3,"ngModel","ngModelChange"],["type","text","placeholder","Enter code",1,"input",3,"ngModel","ngModelChange"],["name","currency_selectize","id","currency_selectize",1,"w-full"],["value",""],["type","number","placeholder","Enter total bonus",1,"input",3,"ngModel","ngModelChange"],["type","number","placeholder","Enter minimum management bonus",1,"input",3,"ngModel","ngModelChange"],["rows","3",1,"textarea","text-2sm","text-gray-600","font-normal",2,"height","80px",3,"ngModel","ngModelChange"],[1,"flex","justify-end"],[1,"btn","btn-primary",3,"disabled","click"],[3,"value"]],template:function(l,t){1&l&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),e._uU(4," New Bonus Pool "),e.qZA()(),e.TgZ(5,"div",4)(6,"a",5),e._uU(7," Back "),e.qZA()()(),e._UZ(8,"app-alert",6),e.TgZ(9,"div",7)(10,"div")(11,"div",8)(12,"h3",9),e._uU(13," Bonus Pool Information "),e.qZA(),e._UZ(14,"hr",10),e.qZA(),e.TgZ(15,"div",11)(16,"div",12)(17,"label",13),e._uU(18," Entity Name "),e.TgZ(19,"span",14),e._uU(20,"\xa0*"),e.qZA()(),e.TgZ(21,"select",15),e.NdJ("ngModelChange",function(s){return t.form.entity_id=s}),e.TgZ(22,"option",16),e._uU(23,"Select entity name"),e.qZA(),e.YNc(24,C,2,2,"option",17),e.qZA()(),e.TgZ(25,"div",12)(26,"label",13),e._uU(27," Name "),e.TgZ(28,"span",14),e._uU(29,"\xa0*"),e.qZA()(),e.TgZ(30,"input",18),e.NdJ("ngModelChange",function(s){return t.form.name=s}),e.qZA()(),e.TgZ(31,"div",12)(32,"label",13),e._uU(33," Code "),e.TgZ(34,"span",14),e._uU(35,"\xa0*"),e.qZA()(),e.TgZ(36,"input",19),e.NdJ("ngModelChange",function(s){return t.form.code=s}),e.qZA()(),e.TgZ(37,"div",12)(38,"label",13),e._uU(39," Currency "),e.TgZ(40,"span",14),e._uU(41,"\xa0*"),e.qZA()(),e.TgZ(42,"select",20)(43,"option",21),e._uU(44,"Select Currency"),e.qZA()()(),e.TgZ(45,"div",12)(46,"label",13),e._uU(47," Total Bonus "),e.TgZ(48,"span",14),e._uU(49,"\xa0*"),e.qZA()(),e.TgZ(50,"input",22),e.NdJ("ngModelChange",function(s){return t.form.total_bonus=s}),e.qZA()(),e.TgZ(51,"div",12)(52,"label",13),e._uU(53," Minimum Management Bonus "),e.TgZ(54,"span",14),e._uU(55,"\xa0*"),e.qZA()(),e.TgZ(56,"input",23),e.NdJ("ngModelChange",function(s){return t.form.minimum_management_bonus=s}),e.qZA()(),e.TgZ(57,"div",12)(58,"label",13),e._uU(59," Description "),e.qZA(),e.TgZ(60,"textarea",24),e.NdJ("ngModelChange",function(s){return t.form.description=s}),e.qZA()(),e.TgZ(61,"div",25)(62,"button",26),e.NdJ("click",function(){return t.createBonusPool()}),e._uU(63),e.qZA()()()()()()),2&l&&(e.xp6(8),e.Q6J("errorMessages",t.errorMessages)("successMessage",t.successMessage),e.xp6(13),e.Q6J("ngModel",t.form.entity_id),e.xp6(3),e.Q6J("ngForOf",t.entities),e.xp6(6),e.Q6J("ngModel",t.form.name),e.xp6(6),e.Q6J("ngModel",t.form.code),e.xp6(14),e.Q6J("ngModel",t.form.total_bonus),e.xp6(6),e.Q6J("ngModel",t.form.minimum_management_bonus),e.xp6(4),e.Q6J("ngModel",t.form.description),e.xp6(2),e.Q6J("disabled",t.loading),e.xp6(1),e.hij(" ",t.loading?"Saving...":"Save"," "))},dependencies:[p.sg,c.rH,g.YN,g.Kr,g.Fj,g.wV,g.EJ,g.JJ,g.On,y.w]}),a})();var A=n(5730),b=n(507),U=n(4859),J=n(4144),N=n(9602),h=n(3238),x=n(9549);const z=[{path:"",component:T}];let S=(()=>{const o=class{};let a=o;return o.\u0275fac=function(l){return new(l||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({providers:[{provide:h.Ad,useValue:"en-GB"}],imports:[p.ez,c.Bz.forChild(z),g.u5,A.n,b.u,U.ot,J.c,N.FA,h.XK,x.lN]}),a})()}}]);