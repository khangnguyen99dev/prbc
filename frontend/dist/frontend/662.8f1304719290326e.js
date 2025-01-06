"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[662],{9662:(J,h,n)=>{n.r(h),n.d(h,{CreateModule:()=>x});var f=n(6895),p=n(2605),Z=n(1822),c=n(2340),C=n(5439),e=n(1571),v=n(6690),y=n(6548),g=n(433),T=n(12),u=n(9602);function _(o,a){if(1&o){const m=e.EpF();e.TgZ(0,"button",30),e.NdJ("click",function(){e.CHM(m);const r=e.oxw();return e.KtG(r.createUser())}),e._uU(1),e.qZA()}if(2&o){const m=e.oxw();e.Q6J("disabled",m.loading),e.xp6(1),e.hij(" ",m.loading?"Saving...":"Save Changes"," ")}}let A=(()=>{const a=class{constructor(s,r,t){this.router=s,this.headerService=r,this.permissionService=t,this.errorMessages=[],this.successMessage="",this.entities=[],this.form={entity_id:"",name:"",employee_number:"",email:"",date_of_birth:"",password:"",confirm_password:""},this.loading=!1,this.headerService.setupHeader([{title:"Settings"},{title:"Master Data"},{title:"User Management",link:"/settings/master-data/user-management"},{title:"New User"}])}createUser(){this.errorMessages=[],this.successMessage="",this.loading=!0,this.form.date_of_birth&&(this.form.date_of_birth=C(this.form.date_of_birth).format("YYYY-MM-DD")),Z.Z.post(`${c.N.api_url}/settings/users`,this.form,{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${window.localStorage.getItem(c.N.api_token_identifier)}`}}).then(s=>{if(s.data.error)return this.errorMessages.push(s.data.error_message),window.scrollTo(0,0),this.loading=!1,void this.clearMessages();this.router.navigateByUrl("/settings/master-data/user-management/"+s.data.user.id+"?success_message=true")}).catch(s=>{console.error(s),422==s.response.status?Object.keys(s.response.data.errors).forEach(r=>{this.errorMessages.push(s.response.data.errors[r])}):this.errorMessages.push("Sorry, something went wrong. Please try again later."),window.scrollTo(0,0),this.loading=!1,this.clearMessages()})}clearMessages(){setTimeout(()=>{this.successMessage=""},3500)}setupSelectize(){const s=this;$(function(){$("#entity_selectize").selectize({preload:!0,valueField:"id",searchField:"label",labelField:"label",load:(d,l)=>{$("#fetching_entity").show(),$.ajax({url:`${c.N.api_url}/settings/entities?search_selectize=${d}`,type:"GET",error:function(){l(),$("#fetching_entity").hide()},success:i=>{l(i?.entities?.data),$("#fetching_entity").hide()},headers:{Authorization:`Bearer ${window.localStorage.getItem(c.N.api_token_identifier)}`,"Content-Type":"application/json"}})},onChange:d=>{s.form.entity_id=d}})})}ngOnInit(){this.setupSelectize()}};let o=a;return a.\u0275fac=function(r){return new(r||a)(e.Y36(p.F0),e.Y36(v.r),e.Y36(y.$))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-create"]],decls:63,vars:10,consts:[[1,"container-fixed"],[1,"flex","flex-wrap","items-center","lg:items-end","justify-between","gap-5","pb-7.5"],[1,"flex","flex-col","justify-center","gap-2"],[1,"text-xl","font-medium","leading-none","text-gray-900"],[1,"flex","items-center","gap-2.5"],["routerLink","/settings/master-data/user-management",1,"btn","btn-sm","btn-light"],[3,"errorMessages","successMessage"],[1,"grid","gap-5","lg:gap-7.5","w-full","mx-auto"],[1,"card","pb-2.5"],["id","basic_settings",1,"card-header"],[1,"card-title"],[1,"card-body","grid","grid-cols-1","md:grid-cols-2","gap-4"],[1,"flex","items-center","flex-wrap","lg:flex-nowrap","gap-2.5"],[1,"form-label","max-w-56"],[1,"text-danger"],["id","fetching_entity",1,"pt-2","text-sm",2,"display","none"],["name","entity_selectize","id","entity_selectize",1,"w-full"],["value",""],[1,"flex","items-baseline","flex-wrap","lg:flex-nowrap","gap-2.5"],["type","text","placeholder","Enter name",1,"input",3,"ngModel","ngModelChange"],["type","text","placeholder","Enter employee number",1,"input",3,"ngModel","ngModelChange"],["type","text","placeholder","Enter email",1,"input",3,"ngModel","ngModelChange"],["name","date_of_birth","placeholder","Select Date of Birth",1,"input",3,"matDatepicker","ngModel","click","ngModelChange"],["hidden",""],["date_of_birth",""],["placeholder","Enter password","type","password",1,"input",3,"ngModel","ngModelChange"],[1,"flex","items-center","flex-wrap","lg:flex-nowrap","gap-2.5","mb-2.5"],["placeholder","Enter confirm password","type","password",1,"input",3,"ngModel","ngModelChange"],[1,"card-body","flex","justify-end"],["class","btn btn-primary",3,"disabled","click",4,"ngIf"],[1,"btn","btn-primary",3,"disabled","click"]],template:function(r,t){if(1&r){const d=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),e._uU(4," New User "),e.qZA()(),e.TgZ(5,"div",4)(6,"a",5),e._uU(7," Back "),e.qZA()()(),e._UZ(8,"app-alert",6),e.TgZ(9,"div",7)(10,"div",8)(11,"div",9)(12,"h3",10),e._uU(13," User Information "),e.qZA()(),e.TgZ(14,"div",11)(15,"div",12)(16,"label",13),e._uU(17," Entity "),e.TgZ(18,"span",14),e._uU(19,"\xa0*"),e.qZA()(),e.TgZ(20,"p",15),e._uU(21,"Fetching Entities..."),e.qZA(),e.TgZ(22,"select",16)(23,"option",17),e._uU(24,"Select Entity"),e.qZA()()(),e.TgZ(25,"div",18)(26,"label",13),e._uU(27," Name "),e.TgZ(28,"span",14),e._uU(29,"\xa0*"),e.qZA()(),e.TgZ(30,"input",19),e.NdJ("ngModelChange",function(i){return t.form.name=i}),e.qZA()(),e.TgZ(31,"div",12)(32,"label",13),e._uU(33," Employee Number "),e.TgZ(34,"span",14),e._uU(35,"\xa0*"),e.qZA()(),e.TgZ(36,"input",20),e.NdJ("ngModelChange",function(i){return t.form.employee_number=i}),e.qZA()(),e.TgZ(37,"div",12)(38,"label",13),e._uU(39," Email "),e.TgZ(40,"span",14),e._uU(41,"\xa0*"),e.qZA()(),e.TgZ(42,"input",21),e.NdJ("ngModelChange",function(i){return t.form.email=i}),e.qZA()(),e.TgZ(43,"div",12)(44,"label",13),e._uU(45," Date of Birth "),e.qZA(),e.TgZ(46,"input",22),e.NdJ("click",function(){e.CHM(d);const i=e.MAs(48);return e.KtG(i.open())})("ngModelChange",function(i){return t.form.date_of_birth=i}),e.qZA(),e._UZ(47,"mat-datepicker",23,24),e.qZA(),e.TgZ(49,"div",12)(50,"label",13),e._uU(51," Password "),e.TgZ(52,"span",14),e._uU(53,"\xa0*"),e.qZA()(),e.TgZ(54,"input",25),e.NdJ("ngModelChange",function(i){return t.form.password=i}),e.qZA()(),e.TgZ(55,"div",26)(56,"label",13),e._uU(57," Confirm Password "),e.TgZ(58,"span",14),e._uU(59,"\xa0*"),e.qZA()(),e.TgZ(60,"input",27),e.NdJ("ngModelChange",function(i){return t.form.confirm_password=i}),e.qZA()()(),e.TgZ(61,"div",28),e.YNc(62,_,2,2,"button",29),e.qZA()()()()}if(2&r){const d=e.MAs(48);e.xp6(8),e.Q6J("errorMessages",t.errorMessages)("successMessage",t.successMessage),e.xp6(22),e.Q6J("ngModel",t.form.name),e.xp6(6),e.Q6J("ngModel",t.form.employee_number),e.xp6(6),e.Q6J("ngModel",t.form.email),e.xp6(4),e.Q6J("matDatepicker",d)("ngModel",t.form.date_of_birth),e.xp6(8),e.Q6J("ngModel",t.form.password),e.xp6(6),e.Q6J("ngModel",t.form.confirm_password),e.xp6(2),e.Q6J("ngIf",t.permissionService.hasPermission("Settings - Master Data - Can Create User Management"))}},dependencies:[f.O5,p.rH,g.YN,g.Kr,g.Fj,g.JJ,g.On,T.w,u.Mq,u.hl]}),o})();var b=n(5730),U=n(507),M=n(3238);const w=[{path:"",component:A}];let x=(()=>{const a=class{};let o=a;return a.\u0275fac=function(r){return new(r||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({providers:[{provide:M.Ad,useValue:"en-GB"}],imports:[f.ez,p.Bz.forChild(w),g.u5,b.n,U.u,u.FA,M.XK,p.Bz]}),o})()}}]);