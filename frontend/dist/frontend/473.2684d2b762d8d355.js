"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[473],{12:(be,w,u)=>{u.d(w,{w:()=>K});var o=u(1571),V=u(6895);function E(a,h){if(1&a&&(o.TgZ(0,"p"),o._uU(1),o.qZA()),2&a){const d=h.$implicit;o.xp6(1),o.Oqu(d)}}function N(a,h){if(1&a&&(o.TgZ(0,"div",2)(1,"div",3),o._uU(2," Error "),o.qZA(),o.TgZ(3,"div",4),o.YNc(4,E,2,1,"p",5),o.qZA(),o._UZ(5,"div",6),o.qZA()),2&a){const d=o.oxw(2);o.xp6(4),o.Q6J("ngForOf",d.errorMessages)}}function A(a,h){if(1&a&&(o.TgZ(0,"p"),o._uU(1),o.qZA()),2&a){const d=h.$implicit;o.xp6(1),o.Oqu(d)}}function m(a,h){if(1&a&&(o.TgZ(0,"div",4),o.YNc(1,A,2,1,"p",5),o.qZA()),2&a){const d=o.oxw(3);o.xp6(1),o.Q6J("ngForOf",d.errorMessages)}}function Q(a,h){if(1&a){const d=o.EpF();o.TgZ(0,"div",2)(1,"div",7),o.NdJ("click",function(){o.CHM(d);const c=o.oxw(2);return o.KtG(c.toggleErrors())}),o._uU(2),o.TgZ(3,"span"),o._uU(4,"(Click here to show)"),o.qZA()(),o.YNc(5,m,2,1,"div",8),o._UZ(6,"div",6),o.qZA()}if(2&a){const d=o.oxw(2);o.xp6(2),o.hij(" Sorry, system find ",d.errorMessages.length," errors. "),o.xp6(3),o.Q6J("ngIf",d.showErrors)}}function P(a,h){if(1&a&&(o.ynx(0),o.YNc(1,N,6,1,"div",1),o.YNc(2,Q,7,2,"div",1),o.BQk()),2&a){const d=o.oxw();o.xp6(1),o.Q6J("ngIf",1===d.errorMessages.length),o.xp6(1),o.Q6J("ngIf",d.errorMessages.length>1)}}function S(a,h){if(1&a&&(o.TgZ(0,"div",2)(1,"div",9),o._uU(2," Success "),o.qZA(),o.TgZ(3,"div",10)(4,"p"),o._uU(5),o.qZA()(),o._UZ(6,"div",6),o.qZA()),2&a){const d=o.oxw();o.xp6(5),o.Oqu(d.successMessage)}}let K=(()=>{const h=class{constructor(){this.errorMessages=[],this.successMessage="",this.showErrors=!1}toggleErrors(){this.showErrors=!this.showErrors}};let a=h;return h.\u0275fac=function(c){return new(c||h)},h.\u0275cmp=o.Xpm({type:h,selectors:[["app-alert"]],inputs:{errorMessages:"errorMessages",successMessage:"successMessage"},decls:2,vars:2,consts:[[4,"ngIf"],["role","alert",4,"ngIf"],["role","alert"],[1,"bg-red-500","text-white","font-bold","rounded-t","px-4","py-2"],[1,"border","border-t-0","border-red-400","rounded-b","bg-red-100","px-4","py-3","text-red-700"],[4,"ngFor","ngForOf"],[1,"mb-4"],[1,"bg-red-500","text-white","font-bold","rounded-t","px-4","py-2","cursor-pointer",3,"click"],["class","border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700",4,"ngIf"],[1,"bg-green-500","text-white","font-bold","rounded-t","px-4","py-2"],[1,"border","border-t-0","border-green-400","rounded-b","bg-green-100","px-4","py-3","text-green-700"]],template:function(c,k){1&c&&(o.YNc(0,P,3,2,"ng-container",0),o.YNc(1,S,7,1,"div",1)),2&c&&(o.Q6J("ngIf",k.errorMessages.length>0),o.xp6(1),o.Q6J("ngIf",""!==k.successMessage))},dependencies:[V.sg,V.O5]}),a})()},5730:(be,w,u)=>{u.d(w,{n:()=>N});var o=u(6895),V=u(2605),E=u(1571);let N=(()=>{const m=class{};let A=m;return m.\u0275fac=function(S){return new(S||m)},m.\u0275mod=E.oAB({type:m}),m.\u0275inj=E.cJS({imports:[o.ez,V.Bz]}),A})()},433:(be,w,u)=>{u.d(w,{Fj:()=>U,NI:()=>fe,u5:()=>En,qQ:()=>Ve,Cf:()=>f,JU:()=>c,JJ:()=>Ze,On:()=>pe,YN:()=>gt,wV:()=>ge,UX:()=>Fn,EJ:()=>Z,kI:()=>xt,Kr:()=>_t});var o=u(1571),V=u(6895),E=u(2076),N=u(9751),A=u(4742),m=u(8421),Q=u(3269),P=u(5403),S=u(3268),K=u(1810),h=u(4004);let d=(()=>{class n{constructor(e,r){this._renderer=e,this._elementRef=r,this.onChange=i=>{},this.onTouched=()=>{}}setProperty(e,r){this._renderer.setProperty(this._elementRef.nativeElement,e,r)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.Qsj),o.Y36(o.SBq))},n.\u0275dir=o.lG2({type:n}),n})(),_=(()=>{class n extends d{}return n.\u0275fac=function(){let t;return function(r){return(t||(t=o.n5z(n)))(r||n)}}(),n.\u0275dir=o.lG2({type:n,features:[o.qOj]}),n})();const c=new o.OlP("NgValueAccessor"),Ft={provide:c,useExisting:(0,o.Gpc)(()=>U),multi:!0},wt=new o.OlP("CompositionEventMode");let U=(()=>{class n extends d{constructor(e,r,i){super(e,r),this._compositionMode=i,this._composing=!1,null==this._compositionMode&&(this._compositionMode=!function Ot(){const n=(0,V.q)()?(0,V.q)().getUserAgent():"";return/android (\d+)/.test(n.toLowerCase())}())}writeValue(e){this.setProperty("value",e??"")}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.Qsj),o.Y36(o.SBq),o.Y36(wt,8))},n.\u0275dir=o.lG2({type:n,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(e,r){1&e&&o.NdJ("input",function(s){return r._handleInput(s.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(s){return r._compositionEnd(s.target.value)})},features:[o._Bn([Ft]),o.qOj]}),n})();const Nt=!1;function y(n){return null==n||("string"==typeof n||Array.isArray(n))&&0===n.length}function Ee(n){return null!=n&&"number"==typeof n.length}const f=new o.OlP("NgValidators"),v=new o.OlP("NgAsyncValidators"),St=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;class xt{static min(t){return Fe(t)}static max(t){return function Oe(n){return t=>{if(y(t.value)||y(n))return null;const e=parseFloat(t.value);return!isNaN(e)&&e>n?{max:{max:n,actual:t.value}}:null}}(t)}static required(t){return function we(n){return y(n.value)?{required:!0}:null}(t)}static requiredTrue(t){return function Ne(n){return!0===n.value?null:{required:!0}}(t)}static email(t){return function Se(n){return y(n.value)||St.test(n.value)?null:{email:!0}}(t)}static minLength(t){return function xe(n){return t=>y(t.value)||!Ee(t.value)?null:t.value.length<n?{minlength:{requiredLength:n,actualLength:t.value.length}}:null}(t)}static maxLength(t){return function Ge(n){return t=>Ee(t.value)&&t.value.length>n?{maxlength:{requiredLength:n,actualLength:t.value.length}}:null}(t)}static pattern(t){return function Be(n){if(!n)return H;let t,e;return"string"==typeof n?(e="","^"!==n.charAt(0)&&(e+="^"),e+=n,"$"!==n.charAt(n.length-1)&&(e+="$"),t=new RegExp(e)):(e=n.toString(),t=n),r=>{if(y(r.value))return null;const i=r.value;return t.test(i)?null:{pattern:{requiredPattern:e,actualValue:i}}}}(t)}static nullValidator(t){return null}static compose(t){return He(t)}static composeAsync(t){return Re(t)}}function Fe(n){return t=>{if(y(t.value)||y(n))return null;const e=parseFloat(t.value);return!isNaN(e)&&e<n?{min:{min:n,actual:t.value}}:null}}function H(n){return null}function Ie(n){return null!=n}function Te(n){const t=(0,o.QGY)(n)?(0,E.D)(n):n;if(Nt&&!(0,o.CqO)(t)){let e="Expected async validator to return Promise or Observable.";throw"object"==typeof n&&(e+=" Are you using a synchronous validator where an async validator is expected?"),new o.vHH(-1101,e)}return t}function Pe(n){let t={};return n.forEach(e=>{t=null!=e?{...t,...e}:t}),0===Object.keys(t).length?null:t}function ke(n,t){return t.map(e=>e(n))}function Ue(n){return n.map(t=>function Gt(n){return!n.validate}(t)?t:e=>t.validate(e))}function He(n){if(!n)return null;const t=n.filter(Ie);return 0==t.length?null:function(e){return Pe(ke(e,t))}}function X(n){return null!=n?He(Ue(n)):null}function Re(n){if(!n)return null;const t=n.filter(Ie);return 0==t.length?null:function(e){return function a(...n){const t=(0,Q.jO)(n),{args:e,keys:r}=(0,A.D)(n),i=new N.y(s=>{const{length:l}=e;if(!l)return void s.complete();const g=new Array(l);let D=l,O=l;for(let J=0;J<l;J++){let Me=!1;(0,m.Xf)(e[J]).subscribe((0,P.x)(s,On=>{Me||(Me=!0,O--),g[J]=On},()=>D--,void 0,()=>{(!D||!Me)&&(O||s.next(r?(0,K.n)(r,g):g),s.complete())}))}});return t?i.pipe((0,S.Z)(t)):i}(ke(e,t).map(Te)).pipe((0,h.U)(Pe))}}function ee(n){return null!=n?Re(Ue(n)):null}function je(n,t){return null===n?[t]:Array.isArray(n)?[...n,t]:[n,t]}function te(n){return n?Array.isArray(n)?n:[n]:[]}function R(n,t){return Array.isArray(n)?n.includes(t):n===t}function Ye(n,t){const e=te(t);return te(n).forEach(i=>{R(e,i)||e.push(i)}),e}function We(n,t){return te(t).filter(e=>!R(n,e))}class $e{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=X(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=ee(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t){this.control&&this.control.reset(t)}hasError(t,e){return!!this.control&&this.control.hasError(t,e)}getError(t,e){return this.control?this.control.getError(t,e):null}}class p extends $e{get formDirective(){return null}get path(){return null}}class C extends $e{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}}class ze{constructor(t){this._cd=t}get isTouched(){return!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return!!this._cd?.submitted}}let Ze=(()=>{class n extends ze{constructor(e){super(e)}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(C,2))},n.\u0275dir=o.lG2({type:n,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(e,r){2&e&&o.ekj("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},features:[o.qOj]}),n})();const x="VALID",q="INVALID",F="PENDING",G="DISABLED";function L(n){return null!=n&&!Array.isArray(n)&&"object"==typeof n}class Xe{constructor(t,e){this._pendingDirty=!1,this._hasOwnPendingAsyncValidator=!1,this._pendingTouched=!1,this._onCollectionChange=()=>{},this._parent=null,this.pristine=!0,this.touched=!1,this._onDisabledChange=[],this._assignValidators(t),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get valid(){return this.status===x}get invalid(){return this.status===q}get pending(){return this.status==F}get disabled(){return this.status===G}get enabled(){return this.status!==G}get dirty(){return!this.pristine}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._assignValidators(t)}setAsyncValidators(t){this._assignAsyncValidators(t)}addValidators(t){this.setValidators(Ye(t,this._rawValidators))}addAsyncValidators(t){this.setAsyncValidators(Ye(t,this._rawAsyncValidators))}removeValidators(t){this.setValidators(We(t,this._rawValidators))}removeAsyncValidators(t){this.setAsyncValidators(We(t,this._rawAsyncValidators))}hasValidator(t){return R(this._rawValidators,t)}hasAsyncValidator(t){return R(this._rawAsyncValidators,t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){this.touched=!0,this._parent&&!t.onlySelf&&this._parent.markAsTouched(t)}markAllAsTouched(){this.markAsTouched({onlySelf:!0}),this._forEachChild(t=>t.markAllAsTouched())}markAsUntouched(t={}){this.touched=!1,this._pendingTouched=!1,this._forEachChild(e=>{e.markAsUntouched({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}markAsDirty(t={}){this.pristine=!1,this._parent&&!t.onlySelf&&this._parent.markAsDirty(t)}markAsPristine(t={}){this.pristine=!0,this._pendingDirty=!1,this._forEachChild(e=>{e.markAsPristine({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}markAsPending(t={}){this.status=F,!1!==t.emitEvent&&this.statusChanges.emit(this.status),this._parent&&!t.onlySelf&&this._parent.markAsPending(t)}disable(t={}){const e=this._parentMarkedDirty(t.onlySelf);this.status=G,this.errors=null,this._forEachChild(r=>{r.disable({...t,onlySelf:!0})}),this._updateValue(),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors({...t,skipPristineCheck:e}),this._onDisabledChange.forEach(r=>r(!0))}enable(t={}){const e=this._parentMarkedDirty(t.onlySelf);this.status=x,this._forEachChild(r=>{r.enable({...t,onlySelf:!0})}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors({...t,skipPristineCheck:e}),this._onDisabledChange.forEach(r=>r(!1))}_updateAncestors(t){this._parent&&!t.onlySelf&&(this._parent.updateValueAndValidity(t),t.skipPristineCheck||this._parent._updatePristine(),this._parent._updateTouched())}setParent(t){this._parent=t}getRawValue(){return this.value}updateValueAndValidity(t={}){this._setInitialStatus(),this._updateValue(),this.enabled&&(this._cancelExistingSubscription(),this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===x||this.status===F)&&this._runAsyncValidator(t.emitEvent)),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!t.onlySelf&&this._parent.updateValueAndValidity(t)}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?G:x}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t){if(this.asyncValidator){this.status=F,this._hasOwnPendingAsyncValidator=!0;const e=Te(this.asyncValidator(this));this._asyncValidationSubscription=e.subscribe(r=>{this._hasOwnPendingAsyncValidator=!1,this.setErrors(r,{emitEvent:t})})}}_cancelExistingSubscription(){this._asyncValidationSubscription&&(this._asyncValidationSubscription.unsubscribe(),this._hasOwnPendingAsyncValidator=!1)}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(!1!==e.emitEvent)}get(t){let e=t;return null==e||(Array.isArray(e)||(e=e.split(".")),0===e.length)?null:e.reduce((r,i)=>r&&r._find(i),this)}getError(t,e){const r=e?this.get(e):this;return r&&r.errors?r.errors[t]:null}hasError(t,e){return!!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),this._parent&&this._parent._updateControlsErrors(t)}_initObservables(){this.valueChanges=new o.vpe,this.statusChanges=new o.vpe}_calculateStatus(){return this._allControlsDisabled()?G:this.errors?q:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(F)?F:this._anyControlsHaveStatus(q)?q:x}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t={}){this.pristine=!this._anyControlsDirty(),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}_updateTouched(t={}){this.touched=this._anyControlsTouched(),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){L(t)&&null!=t.updateOn&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){return!t&&!(!this._parent||!this._parent.dirty)&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=function Rt(n){return Array.isArray(n)?X(n):n||null}(this._rawValidators)}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=function jt(n){return Array.isArray(n)?ee(n):n||null}(this._rawAsyncValidators)}}const M=new o.OlP("CallSetDisabledState",{providedIn:"root",factory:()=>B}),B="always";function I(n,t,e=B){(function le(n,t){const e=function qe(n){return n._rawValidators}(n);null!==t.validator?n.setValidators(je(e,t.validator)):"function"==typeof e&&n.setValidators([e]);const r=function Le(n){return n._rawAsyncValidators}(n);null!==t.asyncValidator?n.setAsyncValidators(je(r,t.asyncValidator)):"function"==typeof r&&n.setAsyncValidators([r]);const i=()=>n.updateValueAndValidity();$(t._rawValidators,i),$(t._rawAsyncValidators,i)})(n,t),t.valueAccessor.writeValue(n.value),(n.disabled||"always"===e)&&t.valueAccessor.setDisabledState?.(n.disabled),function Yt(n,t){t.valueAccessor.registerOnChange(e=>{n._pendingValue=e,n._pendingChange=!0,n._pendingDirty=!0,"change"===n.updateOn&&et(n,t)})}(n,t),function $t(n,t){const e=(r,i)=>{t.valueAccessor.writeValue(r),i&&t.viewToModelUpdate(r)};n.registerOnChange(e),t._registerOnDestroy(()=>{n._unregisterOnChange(e)})}(n,t),function Wt(n,t){t.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,"blur"===n.updateOn&&n._pendingChange&&et(n,t),"submit"!==n.updateOn&&n.markAsTouched()})}(n,t),function Lt(n,t){if(t.valueAccessor.setDisabledState){const e=r=>{t.valueAccessor.setDisabledState(r)};n.registerOnDisabledChange(e),t._registerOnDestroy(()=>{n._unregisterOnDisabledChange(e)})}}(n,t)}function $(n,t){n.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t)})}function et(n,t){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),t.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function rt(n,t){const e=n.indexOf(t);e>-1&&n.splice(e,1)}function ot(n){return"object"==typeof n&&null!==n&&2===Object.keys(n).length&&"value"in n&&"disabled"in n}const fe=class extends Xe{constructor(t=null,e,r){super(function ie(n){return(L(n)?n.validators:n)||null}(e),function se(n,t){return(L(t)?t.asyncValidators:n)||null}(r,e)),this.defaultValue=null,this._onChange=[],this._pendingChange=!1,this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),L(e)&&(e.nonNullable||e.initialValueIsDefault)&&(this.defaultValue=ot(t)?t.value:t)}setValue(t,e={}){this.value=this._pendingValue=t,this._onChange.length&&!1!==e.emitModelToViewChange&&this._onChange.forEach(r=>r(this.value,!1!==e.emitViewToModelChange)),this.updateValueAndValidity(e)}patchValue(t,e={}){this.setValue(t,e)}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),this._pendingChange=!1}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){rt(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){rt(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return!("submit"!==this.updateOn||(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),!this._pendingChange)||(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),0))}_applyFormState(t){ot(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}},tn={provide:C,useExisting:(0,o.Gpc)(()=>pe)},at=(()=>Promise.resolve())();let pe=(()=>{class n extends C{constructor(e,r,i,s,l,g){super(),this._changeDetectorRef=l,this.callSetDisabledState=g,this.control=new fe,this._registered=!1,this.update=new o.vpe,this._parent=e,this._setValidators(r),this._setAsyncValidators(i),this.valueAccessor=function ce(n,t){if(!t)return null;let e,r,i;return Array.isArray(t),t.forEach(s=>{s.constructor===U?e=s:function Jt(n){return Object.getPrototypeOf(n.constructor)===_}(s)?r=s:i=s}),i||r||e||null}(0,s)}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){const r=e.name.previousValue;this.formDirective.removeControl({name:r,path:this._getPath(r)})}this._setUpControl()}"isDisabled"in e&&this._updateDisabled(e),function de(n,t){if(!n.hasOwnProperty("model"))return!1;const e=n.model;return!!e.isFirstChange()||!Object.is(t,e.currentValue)}(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&null!=this.options.updateOn&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!(!this.options||!this.options.standalone)}_setUpStandalone(){I(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._isStandalone()||this._checkParentType(),this._checkName()}_checkParentType(){}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),this._isStandalone()}_updateValue(e){at.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){const r=e.isDisabled.currentValue,i=0!==r&&(0,o.D6c)(r);at.then(()=>{i&&!this.control.disabled?this.control.disable():!i&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?function Y(n,t){return[...t.path,n]}(e,this._parent):[e]}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(p,9),o.Y36(f,10),o.Y36(v,10),o.Y36(c,10),o.Y36(o.sBO,8),o.Y36(M,8))},n.\u0275dir=o.lG2({type:n,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:["disabled","isDisabled"],model:["ngModel","model"],options:["ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],features:[o._Bn([tn]),o.qOj,o.TTD]}),n})();const rn={provide:c,useExisting:(0,o.Gpc)(()=>ge),multi:!0};let ge=(()=>{class n extends _{writeValue(e){this.setProperty("value",e??"")}registerOnChange(e){this.onChange=r=>{e(""==r?null:parseFloat(r))}}}return n.\u0275fac=function(){let t;return function(r){return(t||(t=o.n5z(n)))(r||n)}}(),n.\u0275dir=o.lG2({type:n,selectors:[["input","type","number","formControlName",""],["input","type","number","formControl",""],["input","type","number","ngModel",""]],hostBindings:function(e,r){1&e&&o.NdJ("input",function(s){return r.onChange(s.target.value)})("blur",function(){return r.onTouched()})},features:[o._Bn([rn]),o.qOj]}),n})(),lt=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({}),n})();const me=new o.OlP("NgModelWithFormControlWarning"),fn={provide:c,useExisting:(0,o.Gpc)(()=>Z),multi:!0};function pt(n,t){return null==n?`${t}`:(t&&"object"==typeof t&&(t="Object"),`${n}: ${t}`.slice(0,50))}let Z=(()=>{class n extends _{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(e){this._compareWith=e}writeValue(e){this.value=e;const i=pt(this._getOptionId(e),e);this.setProperty("value",i)}registerOnChange(e){this.onChange=r=>{this.value=this._getOptionValue(r),e(this.value)}}_registerOption(){return(this._idCounter++).toString()}_getOptionId(e){for(const r of Array.from(this._optionMap.keys()))if(this._compareWith(this._optionMap.get(r),e))return r;return null}_getOptionValue(e){const r=function pn(n){return n.split(":")[0]}(e);return this._optionMap.has(r)?this._optionMap.get(r):e}}return n.\u0275fac=function(){let t;return function(r){return(t||(t=o.n5z(n)))(r||n)}}(),n.\u0275dir=o.lG2({type:n,selectors:[["select","formControlName","",3,"multiple",""],["select","formControl","",3,"multiple",""],["select","ngModel","",3,"multiple",""]],hostBindings:function(e,r){1&e&&o.NdJ("change",function(s){return r.onChange(s.target.value)})("blur",function(){return r.onTouched()})},inputs:{compareWith:"compareWith"},features:[o._Bn([fn]),o.qOj]}),n})(),gt=(()=>{class n{constructor(e,r,i){this._element=e,this._renderer=r,this._select=i,this._select&&(this.id=this._select._registerOption())}set ngValue(e){null!=this._select&&(this._select._optionMap.set(this.id,e),this._setElementValue(pt(this.id,e)),this._select.writeValue(this._select.value))}set value(e){this._setElementValue(e),this._select&&this._select.writeValue(this._select.value)}_setElementValue(e){this._renderer.setProperty(this._element.nativeElement,"value",e)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.SBq),o.Y36(o.Qsj),o.Y36(Z,9))},n.\u0275dir=o.lG2({type:n,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}}),n})();const gn={provide:c,useExisting:(0,o.Gpc)(()=>Ce),multi:!0};function mt(n,t){return null==n?`${t}`:("string"==typeof t&&(t=`'${t}'`),t&&"object"==typeof t&&(t="Object"),`${n}: ${t}`.slice(0,50))}let Ce=(()=>{class n extends _{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(e){this._compareWith=e}writeValue(e){let r;if(this.value=e,Array.isArray(e)){const i=e.map(s=>this._getOptionId(s));r=(s,l)=>{s._setSelected(i.indexOf(l.toString())>-1)}}else r=(i,s)=>{i._setSelected(!1)};this._optionMap.forEach(r)}registerOnChange(e){this.onChange=r=>{const i=[],s=r.selectedOptions;if(void 0!==s){const l=s;for(let g=0;g<l.length;g++){const O=this._getOptionValue(l[g].value);i.push(O)}}else{const l=r.options;for(let g=0;g<l.length;g++){const D=l[g];if(D.selected){const O=this._getOptionValue(D.value);i.push(O)}}}this.value=i,e(i)}}_registerOption(e){const r=(this._idCounter++).toString();return this._optionMap.set(r,e),r}_getOptionId(e){for(const r of Array.from(this._optionMap.keys()))if(this._compareWith(this._optionMap.get(r)._value,e))return r;return null}_getOptionValue(e){const r=function mn(n){return n.split(":")[0]}(e);return this._optionMap.has(r)?this._optionMap.get(r)._value:e}}return n.\u0275fac=function(){let t;return function(r){return(t||(t=o.n5z(n)))(r||n)}}(),n.\u0275dir=o.lG2({type:n,selectors:[["select","multiple","","formControlName",""],["select","multiple","","formControl",""],["select","multiple","","ngModel",""]],hostBindings:function(e,r){1&e&&o.NdJ("change",function(s){return r.onChange(s.target)})("blur",function(){return r.onTouched()})},inputs:{compareWith:"compareWith"},features:[o._Bn([gn]),o.qOj]}),n})(),_t=(()=>{class n{constructor(e,r,i){this._element=e,this._renderer=r,this._select=i,this._select&&(this.id=this._select._registerOption(this))}set ngValue(e){null!=this._select&&(this._value=e,this._setElementValue(mt(this.id,e)),this._select.writeValue(this._select.value))}set value(e){this._select?(this._value=e,this._setElementValue(mt(this.id,e)),this._select.writeValue(this._select.value)):this._setElementValue(e)}_setElementValue(e){this._renderer.setProperty(this._element.nativeElement,"value",e)}_setSelected(e){this._renderer.setProperty(this._element.nativeElement,"selected",e)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.SBq),o.Y36(o.Qsj),o.Y36(Ce,9))},n.\u0275dir=o.lG2({type:n,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}}),n})();let b=(()=>{class n{constructor(){this._validator=H}ngOnChanges(e){if(this.inputName in e){const r=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(r),this._validator=this._enabled?this.createValidator(r):H,this._onChange&&this._onChange()}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e}enabled(e){return null!=e}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275dir=o.lG2({type:n,features:[o.TTD]}),n})();const yn={provide:f,useExisting:(0,o.Gpc)(()=>Ve),multi:!0};let Ve=(()=>{class n extends b{constructor(){super(...arguments),this.inputName="min",this.normalizeInput=e=>function vt(n){return"number"==typeof n?n:parseFloat(n)}(e),this.createValidator=e=>Fe(e)}}return n.\u0275fac=function(){let t;return function(r){return(t||(t=o.n5z(n)))(r||n)}}(),n.\u0275dir=o.lG2({type:n,selectors:[["input","type","number","min","","formControlName",""],["input","type","number","min","","formControl",""],["input","type","number","min","","ngModel",""]],hostVars:1,hostBindings:function(e,r){2&e&&o.uIk("min",r._enabled?r.min:null)},inputs:{min:"min"},features:[o._Bn([yn]),o.qOj]}),n})(),Et=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[lt]}),n})(),En=(()=>{class n{static withConfig(e){return{ngModule:n,providers:[{provide:M,useValue:e.callSetDisabledState??B}]}}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[Et]}),n})(),Fn=(()=>{class n{static withConfig(e){return{ngModule:n,providers:[{provide:me,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:M,useValue:e.callSetDisabledState??B}]}}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[Et]}),n})()}}]);