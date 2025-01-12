"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6453],{507:(_,f,n)=>{n.d(f,{u:()=>o});var h=n(6895),c=n(2605),v=n(1571);let o=(()=>{const l=class{};let Z=l;return l.\u0275fac=function(C){return new(C||l)},l.\u0275mod=v.oAB({type:l}),l.\u0275inj=v.cJS({imports:[h.ez,c.Bz]}),Z})()},6453:(_,f,n)=>{n.r(f),n.d(f,{CreateModule:()=>S});var h=n(6895),c=n(2605),v=n(1822),o=n(2340),e=(n(8259),n(5937),n(1571)),T=n(6690),C=n(6548),d=n(433),z=n(12);function M(r,s){if(1&r){const y=e.EpF();e.TgZ(0,"button",30),e.NdJ("click",function(){e.CHM(y);const t=e.oxw();return e.KtG(t.createCountry())}),e._uU(1),e.qZA()}if(2&r){const y=e.oxw();e.Q6J("disabled",y.loading),e.xp6(1),e.hij(" ",y.loading?"Saving...":"Save Changes"," ")}}let A=(()=>{const s=class{constructor(i,t,a){this.router=i,this.headerService=t,this.permissionService=a,this.errorMessages=[],this.successMessage="",this.form={name:"",code:"",owner_id:"",region_id:"",flag:null,flag_url:null},this.loading=!1,this.headerService.setupHeader([{title:"Settings"},{title:"Master Data"},{title:"Country Management",link:"/settings/master-data/country-management"},{title:"New Country"}])}createCountry(){this.errorMessages=[],this.successMessage="",this.loading=!0;const i=new FormData;i.append("name",this.form.name),i.append("code",this.form.code),i.append("owner_id",this.form.owner_id),i.append("region_id",this.form.region_id),this.form.flag&&this.form.flag instanceof File&&i.append("flag",this.form.flag),v.Z.post(`${o.N.api_url}/settings/countries`,i,{headers:{Accept:"application/json","Content-Type":"multipart/form-data",Authorization:`Bearer ${window.localStorage.getItem(o.N.api_token_identifier)}`}}).then(t=>{if(t.data.error)return this.errorMessages.push(t.data.error_message),window.scrollTo(0,0),this.loading=!1,void this.clearMessages();this.router.navigateByUrl("/settings/master-data/country-management/"+t.data.country.id+"?success_message=true")}).catch(t=>{console.error(t),422==t.response.status?Object.keys(t.response.data.errors).forEach(a=>{this.errorMessages.push(t.response.data.errors[a])}):this.errorMessages.push("Sorry, something went wrong. Please try again later."),window.scrollTo(0,0),this.loading=!1,this.clearMessages()})}clearMessages(){setTimeout(()=>{this.successMessage=""},3500)}ngAfterViewInit(){this.setupSelectize()}setupSelectize(){const i=this;$(function(){$("#owner_selectize").selectize()[0].selectize.destroy(),$("#owner_selectize").selectize({preload:!0,valueField:"id",searchField:"name",labelField:"name",load:(g,p)=>{$("#fetching_owner").show(),$.ajax({url:`${o.N.api_url}/settings/users?search_selectize=${g}`,type:"GET",error:function(){p(),$("#fetching_owner").hide()},success:w=>{p(w?.users?.data),$("#fetching_owner").hide()},headers:{Authorization:`Bearer ${window.localStorage.getItem(o.N.api_token_identifier)}`,"Content-Type":"application/json"}})},onChange:g=>{i.form.owner_id=g}}),$("#region_selectize").selectize()[0].selectize.destroy(),$("#region_selectize").selectize({preload:!0,valueField:"id",searchField:"name",labelField:"name",load:(g,p)=>{$("#fetching_region").show(),$.ajax({url:`${o.N.api_url}/settings/regions?search_selectize=${g}`,type:"GET",error:function(){p(),$("#fetching_region").hide()},success:w=>{p(w?.regions?.data),$("#fetching_region").hide()},headers:{Authorization:`Bearer ${window.localStorage.getItem(o.N.api_token_identifier)}`,"Content-Type":"application/json"}})},onChange:g=>{i.form.region_id=g}})})}onImageChange(i){const t=i.target.files[0],a=new FileReader;a.onload=u=>{this.form.flag_url=u.target.result,this.form.flag=t},a.readAsDataURL(t)}removeImage(){this.form.flag_url=null,this.form.flag=null}};let r=s;return s.\u0275fac=function(t){return new(t||s)(e.Y36(c.F0),e.Y36(T.r),e.Y36(C.$))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-create"]],decls:57,vars:8,consts:[[1,"container-fixed"],[1,"flex","flex-wrap","items-center","lg:items-end","justify-between","gap-5","pb-7.5"],[1,"flex","flex-col","justify-center","gap-2"],[1,"text-xl","font-medium","leading-none","text-gray-900"],[1,"flex","items-center","gap-2.5"],["routerLink","/settings/master-data/country-management",1,"btn","btn-sm","btn-light"],[3,"errorMessages","successMessage"],[1,"grid","gap-5","lg:gap-7.5","xl:w-[38.75rem]","mx-auto"],[1,"card","pb-2.5"],["id","basic_settings",1,"card-header"],[1,"card-title"],[1,"card-body","grid","gap-5"],[1,"flex","items-baseline","flex-wrap","lg:flex-nowrap","gap-2.5"],[1,"form-label","max-w-56"],[1,"text-danger"],["type","text","placeholder","Enter name",1,"input",3,"ngModel","ngModelChange"],["type","text","placeholder","Enter code",1,"input",3,"ngModel","ngModelChange"],["id","fetching_owner",1,"pt-2","text-sm",2,"display","none"],["name","owner_selectize","id","owner_selectize",1,"w-full"],["value",""],["id","fetching_region",1,"pt-2","text-sm",2,"display","none"],["name","region_selectize","id","region_selectize",1,"w-full"],[1,"flex","items-center","flex-wrap","lg:flex-nowrap","gap-2.5"],["data-image-input","true",1,"image-input","w-20","h-20"],["name","avatar","id","image_input","type","file","accept",".jpeg, .png, .jpg, .gif",3,"change"],["data-image-input-remove","",1,"btn","btn-icon","btn-icon-xs","btn-light","shadow-default","absolute","z-1","size-5","-top-0.5","-end-0.5","rounded-full",3,"click"],[1,"ki-filled","ki-cross"],["for","image_input",1,"image-input-placeholder","border-2","border-success","image-input-empty:border-gray-300"],[1,"flex","justify-end"],["class","btn btn-primary",3,"disabled","click",4,"ngIf"],[1,"btn","btn-primary",3,"disabled","click"]],template:function(t,a){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),e._uU(4," New Country "),e.qZA()(),e.TgZ(5,"div",4)(6,"a",5),e._uU(7," Back "),e.qZA()()(),e._UZ(8,"app-alert",6),e.TgZ(9,"div",7)(10,"div",8)(11,"div",9)(12,"h3",10),e._uU(13," Country Information "),e.qZA()(),e.TgZ(14,"div",11)(15,"div",12)(16,"label",13),e._uU(17," Name "),e.TgZ(18,"span",14),e._uU(19,"\xa0*"),e.qZA()(),e.TgZ(20,"input",15),e.NdJ("ngModelChange",function(m){return a.form.name=m}),e.qZA()(),e.TgZ(21,"div",12)(22,"label",13),e._uU(23," Code "),e.TgZ(24,"span",14),e._uU(25,"\xa0*"),e.qZA()(),e.TgZ(26,"input",16),e.NdJ("ngModelChange",function(m){return a.form.code=m}),e.qZA()(),e.TgZ(27,"div",12)(28,"label",13),e._uU(29," Owner "),e.TgZ(30,"span",14),e._uU(31,"\xa0*"),e.qZA()(),e.TgZ(32,"p",17),e._uU(33,"Fetching Owners..."),e.qZA(),e.TgZ(34,"select",18)(35,"option",19),e._uU(36,"Select Owner"),e.qZA()()(),e.TgZ(37,"div",12)(38,"label",13),e._uU(39," Region "),e.TgZ(40,"span",14),e._uU(41,"\xa0*"),e.qZA()(),e.TgZ(42,"p",20),e._uU(43,"Fetching Regions..."),e.qZA(),e.TgZ(44,"select",21)(45,"option",19),e._uU(46,"Select Region"),e.qZA()()(),e.TgZ(47,"div",22)(48,"label",13),e._uU(49," Flag "),e.qZA(),e.TgZ(50,"div",23)(51,"input",24),e.NdJ("change",function(m){return a.onImageChange(m)}),e.qZA(),e.TgZ(52,"div",25),e.NdJ("click",function(){return a.removeImage()}),e._UZ(53,"i",26),e.qZA(),e._UZ(54,"label",27),e.qZA()(),e.TgZ(55,"div",28),e.YNc(56,M,2,2,"button",29),e.qZA()()()()()),2&t&&(e.xp6(8),e.Q6J("errorMessages",a.errorMessages)("successMessage",a.successMessage),e.xp6(12),e.Q6J("ngModel",a.form.name),e.xp6(6),e.Q6J("ngModel",a.form.code),e.xp6(28),e.Jzz("background-image:url(",a.form.flag_url||"/assets/media/avatars/blank.png",")"),e.xp6(2),e.Q6J("ngIf",a.permissionService.hasPermission("Settings - Master Data - Can Create Country Management")))},dependencies:[h.O5,c.rH,d.YN,d.Kr,d.Fj,d.JJ,d.On,z.w]}),r})();var x=n(5730),b=n(507);const U=[{path:"",component:A}];let S=(()=>{const s=class{};let r=s;return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[h.ez,c.Bz.forChild(U),d.u5,x.n,b.u,c.Bz]}),r})()}}]);