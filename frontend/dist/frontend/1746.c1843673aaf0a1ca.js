"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1746],{12:(A,m,n)=>{n.d(m,{w:()=>y});var e=n(1571),f=n(6895);function h(o,a){if(1&o&&(e.TgZ(0,"p"),e._uU(1),e.qZA()),2&o){const r=a.$implicit;e.xp6(1),e.Oqu(r)}}function M(o,a){if(1&o&&(e.TgZ(0,"div",2)(1,"div",3),e._uU(2," Error "),e.qZA(),e.TgZ(3,"div",4),e.YNc(4,h,2,1,"p",5),e.qZA(),e._UZ(5,"div",6),e.qZA()),2&o){const r=e.oxw(2);e.xp6(4),e.Q6J("ngForOf",r.errorMessages)}}function t(o,a){if(1&o&&(e.TgZ(0,"p"),e._uU(1),e.qZA()),2&o){const r=a.$implicit;e.xp6(1),e.Oqu(r)}}function c(o,a){if(1&o&&(e.TgZ(0,"div",4),e.YNc(1,t,2,1,"p",5),e.qZA()),2&o){const r=e.oxw(3);e.xp6(1),e.Q6J("ngForOf",r.errorMessages)}}function v(o,a){if(1&o){const r=e.EpF();e.TgZ(0,"div",2)(1,"div",7),e.NdJ("click",function(){e.CHM(r);const p=e.oxw(2);return e.KtG(p.toggleErrors())}),e._uU(2),e.TgZ(3,"span"),e._uU(4,"(Click here to show)"),e.qZA()(),e.YNc(5,c,2,1,"div",8),e._UZ(6,"div",6),e.qZA()}if(2&o){const r=e.oxw(2);e.xp6(2),e.hij(" Sorry, system find ",r.errorMessages.length," errors. "),e.xp6(3),e.Q6J("ngIf",r.showErrors)}}function x(o,a){if(1&o&&(e.ynx(0),e.YNc(1,M,6,1,"div",1),e.YNc(2,v,7,2,"div",1),e.BQk()),2&o){const r=e.oxw();e.xp6(1),e.Q6J("ngIf",1===r.errorMessages.length),e.xp6(1),e.Q6J("ngIf",r.errorMessages.length>1)}}function _(o,a){if(1&o&&(e.TgZ(0,"div",2)(1,"div",9),e._uU(2," Success "),e.qZA(),e.TgZ(3,"div",10)(4,"p"),e._uU(5),e.qZA()(),e._UZ(6,"div",6),e.qZA()),2&o){const r=e.oxw();e.xp6(5),e.Oqu(r.successMessage)}}let y=(()=>{const a=class{constructor(){this.errorMessages=[],this.successMessage="",this.showErrors=!1}toggleErrors(){this.showErrors=!this.showErrors}};let o=a;return a.\u0275fac=function(p){return new(p||a)},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-alert"]],inputs:{errorMessages:"errorMessages",successMessage:"successMessage"},decls:2,vars:2,consts:[[4,"ngIf"],["role","alert",4,"ngIf"],["role","alert"],[1,"bg-red-500","text-white","font-bold","rounded-t","px-4","py-2"],[1,"border","border-t-0","border-red-400","rounded-b","bg-red-100","px-4","py-3","text-red-700"],[4,"ngFor","ngForOf"],[1,"mb-4"],[1,"bg-red-500","text-white","font-bold","rounded-t","px-4","py-2","cursor-pointer",3,"click"],["class","border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700",4,"ngIf"],[1,"bg-green-500","text-white","font-bold","rounded-t","px-4","py-2"],[1,"border","border-t-0","border-green-400","rounded-b","bg-green-100","px-4","py-3","text-green-700"]],template:function(p,T){1&p&&(e.YNc(0,x,3,2,"ng-container",0),e.YNc(1,_,7,1,"div",1)),2&p&&(e.Q6J("ngIf",T.errorMessages.length>0),e.xp6(1),e.Q6J("ngIf",""!==T.successMessage))},dependencies:[f.sg,f.O5]}),o})()},507:(A,m,n)=>{n.d(m,{u:()=>M});var e=n(6895),f=n(2605),h=n(1571);let M=(()=>{const c=class{};let t=c;return c.\u0275fac=function(_){return new(_||c)},c.\u0275mod=h.oAB({type:c}),c.\u0275inj=h.cJS({imports:[e.ez,f.Bz]}),t})()},1746:(A,m,n)=>{n.r(m),n.d(m,{SignUpCollaboratorModule:()=>w});var e=n(6895),f=n(5861),h=n(1822),M=n(2340),t=n(1571),c=n(2605),v=n(433),x=n(12);function _(d,i){1&d&&(t.ynx(0),t._uU(1,"Sign Up"),t.BQk())}function y(d,i){1&d&&(t.TgZ(0,"div",19),t.O4$(),t.TgZ(1,"svg",20),t._UZ(2,"circle",21)(3,"path",22),t.qZA()())}let o=(()=>{const i=class{constructor(s){this.router=s,this.errorMessages=[],this.successMessage="",this.loading=!1,this.formData={name:"",email:"",phone:"",message:""}}ngOnInit(){}onSubmit(){var s=this;return(0,f.Z)(function*(){s.errorMessages=[],s.loading=!0;try{const g=yield h.Z.post(`${M.N.api_url}/sign-up-collaborator`,s.formData);if(g.data.error)return s.errorMessages=[g.data.error_message],window.scrollTo(0,0),s.loading=!1,void s.clearMessages();s.successMessage="Thank you for your interest in becoming a collaborator. We will get back to you soon.",s.loading=!1,s.clearMessages(),s.formData={name:"",email:"",phone:"",message:""}}catch(g){console.error(g),422===g.response?.status?Object.keys(g.response.data.errors).forEach(l=>{s.errorMessages.push(g.response.data.errors[l])}):s.errorMessages.push("Sorry, something went wrong. Please try again later."),window.scrollTo(0,0),s.loading=!1,s.clearMessages()}})()}clearMessages(){setTimeout(()=>{this.successMessage=""},3500)}};let d=i;return i.\u0275fac=function(g){return new(g||i)(t.Y36(c.F0))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-sign-up-collaborator"]],decls:31,vars:8,consts:[[1,"grid","grow"],[1,"flex","justify-center","items-center"],[1,"sm:w-1/2","w-full",3,"errorMessages","successMessage"],[1,"flex","justify-center","items-center","p-8","lg:p-10","order-2","lg:order-1"],[1,"card","max-w-[370px]","w-full"],[1,"card-body","flex","flex-col","gap-5","p-10"],[1,"text-center","mb-2.5"],[1,"text-lg","font-medium","text-gray-900","leading-none"],[1,"flex","flex-col","gap-1"],[1,"form-label","font-normal","text-gray-900"],["placeholder","Enter name","type","text","value","",1,"input",3,"ngModel","ngModelChange"],["placeholder","Enter email","type","email","value","",1,"input",3,"ngModel","ngModelChange"],["placeholder","Enter phone","type","tel","value","",1,"input",3,"ngModel","ngModelChange"],["placeholder","Enter message","rows","4",1,"input",2,"height","100px",3,"ngModel","ngModelChange"],["type","button",1,"btn","btn-primary","flex","justify-center","grow",3,"click"],[4,"ngIf"],["class","animate-spin w-5 h-5",4,"ngIf"],[1,"text-center","mt-4"],["routerLink","/sign-in",1,"text-primary","hover:underline"],[1,"animate-spin","w-5","h-5"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24"],["cx","12","cy","12","r","10","stroke","currentColor","stroke-width","4",1,"opacity-25"],["fill","currentColor","d","M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",1,"opacity-75"]],template:function(g,l){1&g&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"app-alert",2),t.qZA(),t.TgZ(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"h3",7),t._uU(8," Sign Up Collaborator "),t.qZA()(),t.TgZ(9,"div",8)(10,"label",9),t._uU(11," Name "),t.qZA(),t.TgZ(12,"input",10),t.NdJ("ngModelChange",function(u){return l.formData.name=u}),t.qZA()(),t.TgZ(13,"div",8)(14,"label",9),t._uU(15," Email "),t.qZA(),t.TgZ(16,"input",11),t.NdJ("ngModelChange",function(u){return l.formData.email=u}),t.qZA()(),t.TgZ(17,"div",8)(18,"label",9),t._uU(19," Phone "),t.qZA(),t.TgZ(20,"input",12),t.NdJ("ngModelChange",function(u){return l.formData.phone=u}),t.qZA()(),t.TgZ(21,"div",8)(22,"label",9),t._uU(23," Message "),t.qZA(),t.TgZ(24,"textarea",13),t.NdJ("ngModelChange",function(u){return l.formData.message=u}),t.qZA()(),t.TgZ(25,"button",14),t.NdJ("click",function(){return l.onSubmit()}),t.YNc(26,_,2,0,"ng-container",15),t.YNc(27,y,4,0,"div",16),t.qZA(),t.TgZ(28,"div",17)(29,"a",18),t._uU(30,"Back to Sign In"),t.qZA()()()()()()),2&g&&(t.xp6(2),t.Q6J("errorMessages",l.errorMessages)("successMessage",l.successMessage),t.xp6(10),t.Q6J("ngModel",l.formData.name),t.xp6(4),t.Q6J("ngModel",l.formData.email),t.xp6(4),t.Q6J("ngModel",l.formData.phone),t.xp6(4),t.Q6J("ngModel",l.formData.message),t.xp6(2),t.Q6J("ngIf",!l.loading),t.xp6(1),t.Q6J("ngIf",l.loading))},dependencies:[e.O5,c.rH,v.Fj,v.JJ,v.On,x.w]}),d})();var a=n(5730),r=n(507),Z=n(4859),p=n(4144),T=n(9602),b=n(3238),U=n(9549);const E=[{path:"",component:o}];let w=(()=>{const i=class{};let d=i;return i.\u0275fac=function(g){return new(g||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({providers:[{provide:b.Ad,useValue:"en-GB"}],imports:[e.ez,c.Bz.forChild(E),v.u5,a.n,r.u,Z.ot,p.c,T.FA,b.XK,U.lN]}),d})()}}]);