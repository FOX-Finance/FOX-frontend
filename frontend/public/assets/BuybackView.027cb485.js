import{_ as v,B as f,p as m,g as p,c as x,a as h,b as y,d as C,o as s,e as l,f as t,w as c,v as S,h as u,i as O,j as k,k as b,l as r,m as g,n as d,q as _}from"./index.926509b2.js";import"https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js";const F={data(){return{connected:!1,approval_foxs:!1,approval_fox:!1,cdp:"",foxs:f.from("0"),weth:f.from("0"),ltv:0,fox_format:"",weth_format:"",foxs_format:""}},computed:{formattedWETH:{get(){return this.weth_format===""?"":this.weth_format},set(e){let o=e.toString();this.weth_format=o,o===""&&(o="0"),this.weth=m(o,"ether")}},formattedLTV:{get(){return this.ltv===""?"":+(this.ltv/100).toFixed(2)},set(e){this.ltv=+(+e.toFixed(2)*100).toFixed(2)}},formattedFOXS:{get(){return this.foxs_format===""?"":this.foxs_format},set(e){let o=e.toString();this.foxs_format=o,o===""&&(o="0"),this.foxs=m(o,"ether")}}},mounted(){this.emitter.on("metamask-connect-event",e=>{this.connected=e,this.connected&&this.checkAllowance()}),k()!==""&&(this.connected=!0),this.checkAllowance()},methods:{checkAllowance:function(){p("FOXS").then(e=>{e!=0&&(this.approval_foxs=!0,p("FOX").then(o=>{o!=0&&(this.approval_fox=!0)}))})},connectOnClick:function(){console.log("connected : ",this.connected),!(k()!==""||this.connected)&&x().then(e=>{e?(console.log("metamask successfully connected!"),this.emitter.emit("metamask-connect-event",!0)):(console.log("metamask connection failed!"),this.emitter.emit("metamask-connect-event",!1))})},approveOnClick:function(){console.log("approveOnClick (approval_foxs) : ",this.approval_foxs),this.approval_foxs?this.approval_fox||(this.emitter.emit("loading-event",!0),h("FOX").then(e=>{this.emitter.emit("loading-event",!1),e?this.approval_fox=!0:this.approval_fox=!1})):(this.emitter.emit("loading-event",!0),h("FOXS").then(e=>{this.emitter.emit("loading-event",!1),e?this.approval_foxs=!0:this.approval_foxs=!1}))},buybackOnClick:function(){this.emitter.emit("loading-event",!0),y(this.cdp,this.foxs).then(e=>{this.emitter.emit("loading-event",!1),console.log(e?"buyback success!":"buyback failed!")})},changeCDP:function(){},inputFOXS:function(){C(this.cdp,this.foxs,this.ltv).then(e=>{this.weth=e})},inputLTV:function(){this.inputFOXS()}}},X={class:"uk-width-1-1"},A=t("hr",null,null,-1),E={class:"uk-inline form-icon"},V={"uk-form-custom":"target: > button > span:first-child",style:{"padding-left":"0px","padding-right":"0px"}},T=t("a",{class:"uk-form-icon uk-form-icon-flip input-form-icon"},[t("span",null,"CDP#")],-1),D=d('<option value="">Please select...</option><option value="0">CDP #0</option><option value="1">CDP #1</option><option value="2">CDP #2</option><option value="3">CDP #3</option>',5),B=[D],N=t("button",{class:"uk-button uk-button-grey form-button uk-form-width-medium uk-form-large uk-text-left",type:"button",tabindex:"-1",style:{"max-width":"100%"}},[t("span"),t("span",{"uk-icon":"icon: chevron-down",style:{float:"right",position:"relative",right:"95px",top:"17px"}})],-1),P=t("div",{class:"wrap"},[t("span",{class:"icon-circle","uk-icon":"icon: arrow-down; ratio: 1.5;"})],-1),U={class:"uk-inline form-icon"},L=t("a",{class:"uk-form-icon uk-form-icon-flip input-form-icon"},[t("img",{src:b,style:{width:"20px"}}),t("span",null,"FOXS")],-1),R=t("hr",{class:"custom-divider-vertical"},null,-1),H=t("div",{class:"description"},[t("span",{style:{"font-weight":"bold"}},"EXCHANGE RATES"),t("br"),r(" USDC: $1.000"),t("br"),r(" FXS: $6.015"),t("br"),r(" FRAX 0.3000% "),t("br"),r(" SWAP FEE (0.00000 USDC) ")],-1),W=t("div",{class:"wrap"},[t("span",{class:"icon-circle","uk-icon":"icon: arrow-down; ratio: 1.5;"})],-1),G={class:"uk-inline form-icon"},M=t("a",{class:"uk-form-icon uk-form-icon-flip input-form-icon"},[t("img",{src:g,style:{width:"20px"}}),t("span",null,"BNB")],-1),z={class:"wrap"},I={class:"uk-inline"},j=t("a",{class:"uk-form-icon uk-form-icon-flip input-form-icon"},[t("span",null,"LTV(%)")],-1),q=t("div",{class:"description"},[t("span",{style:{"font-weight":"bold"}},"EXCHANGE RATES"),r("USDC: $1.000 ")],-1),J=t("hr",null,null,-1),K={key:0},Q={key:1},Y={key:0},Z={key:1},$={key:2};function tt(e,o,w,_t,a,i){return s(),l("div",X,[A,t("div",E,[t("div",V,[T,c(t("select",{"onUpdate:modelValue":o[0]||(o[0]=n=>a.cdp=n),"aria-label":"Custom controls",class:"form-button uk-form-width-medium uk-form-large",onChange:o[1]||(o[1]=(...n)=>i.changeCDP&&i.changeCDP(...n))},B,544),[[S,a.cdp]]),N])]),P,t("div",U,[L,c(t("input",{class:"uk-input input-form uk-form-width-medium uk-form-large",type:"number","onUpdate:modelValue":o[2]||(o[2]=n=>i.formattedFOXS=n),onInput:o[3]||(o[3]=(...n)=>i.inputFOXS&&i.inputFOXS(...n))},null,544),[[u,i.formattedFOXS]])]),R,H,W,t("div",G,[M,c(t("input",{readonly:"",class:"uk-input result-form uk-form-width-medium uk-form-large",type:"number","onUpdate:modelValue":o[4]||(o[4]=n=>i.formattedWETH=n)},null,512),[[u,i.formattedWETH]])]),t("div",z,[t("div",I,[j,c(t("input",{class:"uk-input input-form uk-form-width-medium uk-form-large",type:"number","onUpdate:modelValue":o[5]||(o[5]=n=>i.formattedLTV=n),onInput:o[6]||(o[6]=(...n)=>i.inputLTV&&i.inputLTV(...n))},null,544),[[u,i.formattedLTV]])])]),q,J,a.approval_foxs&&a.approval_fox?(s(),l("div",K,[t("button",{class:"uk-button uk-button-default uk-button-large form-button",onClick:o[7]||(o[7]=(...n)=>i.buybackOnClick&&i.buybackOnClick(...n))}," Buyback ")])):a.connected?(s(),l("div",Q,[t("button",{class:"uk-button uk-button-default uk-button-large form-button",onClick:o[8]||(o[8]=(...n)=>i.approveOnClick&&i.approveOnClick(...n))},[a.approval_foxs?a.approval_fox?O("",!0):(s(),l("span",Z,"Approve(FOX)")):(s(),l("span",Y,"Approve(FOXS)"))])])):(s(),l("div",$,[t("button",{class:"uk-button uk-button-default uk-button-large form-button",onClick:o[9]||(o[9]=(...n)=>i.connectOnClick&&i.connectOnClick(...n))}," Connect Wallet ")]))])}const ot=v(F,[["render",tt]]),et={},nt={class:"uk-width-1-1"},it=t("hr",null,null,-1),st=t("div",{class:"uk-inline"},[t("a",{class:"uk-form-icon uk-form-icon-flip input-form-icon"},[t("span",null,"CDP#")]),t("input",{class:"uk-input input-form uk-form-width-medium uk-form-large",type:"number"})],-1),lt=t("div",{class:"wrap"},[t("span",{class:"icon-circle","uk-icon":"icon: arrow-down; ratio: 2;",style:{"margin-left":"-1px"}})],-1),at=d('<div class="uk-inline form-icon"><a class="uk-form-icon uk-form-icon-flip input-form-icon"><img src="'+g+'" style="width:20px;"><span>BNB</span></a><input class="uk-input input-form uk-form-width-medium uk-form-large" type="number"></div><div class="wrap"><div class="uk-inline"><a class="uk-form-icon uk-form-icon-flip input-form-icon"><span>LTV(%)</span></a><input class="uk-input input-form uk-form-width-medium uk-form-large" type="number"></div></div><div class="description"><span style="font-weight:bold;">EXCHANGE RATES</span>USDC: $1.000 </div><hr class="custom-divider-vertical"><div class="description"><span style="font-weight:bold;">EXCHANGE RATES</span><br> USDC: $1.000<br> FXS: $6.015<br> FRAX 0.3000% <br> SWAP FEE (0.00000 USDC) </div>',5),rt=t("div",{class:"wrap"},[t("span",{class:"icon-circle","uk-icon":"icon: arrow-down; ratio: 2;",style:{"margin-left":"-1px"}})],-1),ct=d('<div class="uk-inline form-icon"><a class="uk-form-icon uk-form-icon-flip input-form-icon"><img src="'+b+'" style="width:20px;"><span>FOXS</span></a><input readonly class="uk-input result-form uk-form-width-medium uk-form-large" type="number"></div><hr><button class="uk-button uk-button-default uk-button-large form-button"> Connect Wallet </button>',3),ut=[it,st,lt,at,rt,ct];function dt(e,o){return s(),l("div",nt,ut)}const ft=v(et,[["render",dt]]),mt={class:"width-1-1-medium"},pt={class:"uk-card uk-card-default"},ht=t("ul",{class:"uk-flex-center","uk-tab":"","data-uk-tab":"{connect:'#buyback-tab-contents'}"},[t("li",{class:"uk-active"},[t("a",null,"Buyback")]),t("li",null,[t("a",null,"Recollateralize")])],-1),kt={id:"buyback-tab-contents",class:"uk-switcher"},gt={__name:"BuybackView",setup(e){return(o,w)=>(s(),l("div",mt,[t("div",pt,[t("div",null,[ht,t("ul",kt,[t("li",null,[_(ot)]),t("li",null,[_(ft)])])])])]))}};export{gt as default};