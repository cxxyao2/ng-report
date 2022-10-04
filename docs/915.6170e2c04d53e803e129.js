"use strict";(self.webpackChunkng_center=self.webpackChunkng_center||[]).push([[915],{4915:(P,l,a)=>{a.r(l),a.d(l,{AdminModule:()=>O});var c=a(8583),u=a(5566),g=a(3423),A=a(8002),Z=a(6782),v=a(9765),m=a(5072),t=a(7716),f=a(827),T=a(3071),p=a(4929),r=a(3738),s=a(5618),x=a(1095),h=a(8030);let q=(()=>{class e{constructor(i,n){this.templateRef=i,this.viewContainerRef=n}set delayRendering(i){setTimeout(()=>{this.viewContainerRef.createEmbeddedView(this.templateRef)},i)}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(t.Rgc),t.Y36(t.s_b))},e.\u0275dir=t.lG2({type:e,selectors:[["","delayRendering",""]],inputs:{delayRendering:"delayRendering"},exportAs:["delay"]}),e})();function C(e,o){1&e&&(t.TgZ(0,"div",28),t.TgZ(1,"div"),t._uU(2,"Visited Customer:"),t.qZA(),t.TgZ(3,"div",29),t._uU(4,"120"),t.qZA(),t.qZA())}function M(e,o){1&e&&(t.TgZ(0,"div",28),t.TgZ(1,"div"),t._uU(2,"Digged out New Customer:"),t.qZA(),t.TgZ(3,"div",29),t._uU(4,"111"),t.qZA(),t.qZA())}function U(e,o){1&e&&(t.TgZ(0,"div",28),t.TgZ(1,"div"),t._uU(2,"Travelled Distance:"),t.qZA(),t.TgZ(3,"div",29),t._uU(4,"12,000 km"),t.qZA(),t.qZA())}const w=[{path:"",component:(()=>{class e{constructor(i,n,d){this.breakpointObserver=i,this.authSrv=n,this.userSrv=d,this.destroy$=new v.xQ,this.cards=[],this.currentMonth=new Date,this.user={name:"",email:""}}ngOnInit(){var i;this.breakpointObserver.observe(m.u3.Handset).pipe((0,A.U)(({matches:d})=>{this.cards=d?[{title:"About me",cols:2,rows:1},{title:"Pipeline",cols:2,rows:1},{title:"Login Records",cols:2,rows:1},{title:"Sales",cols:2,rows:1}]:[{title:"About me",cols:2,rows:1},{title:"Pipeline",cols:1,rows:1},{title:"Login Records",cols:1,rows:2},{title:"Sales",cols:1,rows:1}]})).pipe((0,Z.R)(this.destroy$)).subscribe();let n="";n=(null===(i=this.authSrv.currentUser)||void 0===i?void 0:i._id)||"",this.userSrv.getUser(n).pipe((0,Z.R)(this.destroy$)).subscribe(d=>{this.user=d})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(m.Yg),t.Y36(f.e),t.Y36(T.K))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-admin"]],decls:119,vars:21,consts:[[1,"grid-container"],[1,"mat-h1"],[2,"font-style","italic"],["cols","2","rowHeight","350px"],[3,"colspan","rowspan"],[1,"dashboard-card"],[1,"dashboard-card-content"],["fxLayout","row wrap","fxLayoutAlign","space-around center"],["fxFlex","50%","fxFlex.lt-md","100%",1,"fxflex","box-shadow"],[2,"vertical-align","top"],["alt","avatar","src","./assets/avatar.jpg",1,"card-avatar"],[2,"text-align","left"],[1,"card-subtitle"],[1,"divider-in-text"],["mat-raised-button","",1,"profie-button"],["fxFlex","45%","fxHide.lt-md","",1,"fxflex"],[1,"social-media","twitter"],["src","./assets/twitter.png",1,"media-icon"],[1,"media-text-area"],[1,"media-name"],["href","https://www.twitter.com","target","_blank","rel","noopener",1,"media-link"],[1,"social-media","facebook"],["src","./assets/facebook.png",1,"media-icon"],["href","https://www.facebook.com","target","_blank","rel","noopener",1,"media-link"],[1,"social-media","linkedin"],["src","./assets/linkedin.png",1,"media-icon"],["href","https://www.linkedin.com","target","_blank","rel","noopener",1,"media-link"],["class","card-item",4,"delayRendering"],[1,"card-item"],[1,"important-data"]],template:function(i,n){1&i&&(t.TgZ(0,"div",0),t.TgZ(1,"h1",1),t._uU(2," Dashboard "),t.TgZ(3,"span",2),t._uU(4),t.ALo(5,"date"),t.qZA(),t.qZA(),t.TgZ(6,"mat-grid-list",3),t.TgZ(7,"mat-grid-tile",4),t.TgZ(8,"mat-card",5),t.TgZ(9,"mat-card-header"),t.TgZ(10,"mat-card-title"),t._uU(11),t.qZA(),t.qZA(),t.TgZ(12,"mat-card-content",6),t.TgZ(13,"div",7),t.TgZ(14,"div",8),t.TgZ(15,"table"),t.TgZ(16,"tr",9),t.TgZ(17,"td"),t._UZ(18,"img",10),t.qZA(),t.TgZ(19,"td",11),t.TgZ(20,"p",12),t._uU(21),t.qZA(),t.TgZ(22,"p"),t._uU(23," Sales Manager "),t.TgZ(24,"span",13),t._uU(25,"|"),t.qZA(),t._uU(26,"3th Department "),t.qZA(),t.TgZ(27,"p"),t._uU(28,"Senior Technicien"),t.qZA(),t.TgZ(29,"p"),t.TgZ(30,"strong"),t._uU(31,"Email:"),t.qZA(),t._uU(32),t.qZA(),t.TgZ(33,"button",14),t._uU(34," Change Avatar "),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(35,"div",15),t.TgZ(36,"div",16),t.TgZ(37,"div"),t._UZ(38,"img",17),t.qZA(),t.TgZ(39,"div",18),t.TgZ(40,"span",19),t._uU(41,"Twitter"),t.qZA(),t._UZ(42,"br"),t.TgZ(43,"a",20),t._uU(44,"Follow Me"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(45,"div",21),t.TgZ(46,"div"),t._UZ(47,"img",22),t.qZA(),t.TgZ(48,"div",18),t.TgZ(49,"span",19),t._uU(50,"Facebook"),t.qZA(),t._UZ(51,"br"),t.TgZ(52,"a",23),t._uU(53,"Follow Me"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(54,"div",24),t.TgZ(55,"div"),t._UZ(56,"img",25),t.qZA(),t.TgZ(57,"div",18),t.TgZ(58,"span",19),t._uU(59,"Linkedin"),t.qZA(),t._UZ(60,"br"),t.TgZ(61,"a",26),t._uU(62,"Follow Me"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(63,"mat-grid-tile",4),t.TgZ(64,"mat-card",5),t.TgZ(65,"mat-card-header"),t.TgZ(66,"mat-card-title"),t._uU(67),t.qZA(),t.qZA(),t.TgZ(68,"mat-card-content",6),t.YNc(69,C,5,0,"div",27),t.YNc(70,M,5,0,"div",27),t.YNc(71,U,5,0,"div",27),t.qZA(),t.qZA(),t.qZA(),t.TgZ(72,"mat-grid-tile",4),t.TgZ(73,"mat-card",5),t.TgZ(74,"mat-card-header"),t.TgZ(75,"mat-card-title"),t._uU(76),t.qZA(),t.qZA(),t.TgZ(77,"mat-card-content",6),t.TgZ(78,"div",28),t.TgZ(79,"div"),t._uU(80,"Sep 1, 2021 11:11"),t.qZA(),t.TgZ(81,"div",29),t._uU(82,"111.111.111.111"),t.qZA(),t.qZA(),t.TgZ(83,"div",28),t.TgZ(84,"div"),t._uU(85,"Sep 1, 2021 11:11"),t.qZA(),t.TgZ(86,"div",29),t._uU(87,"111.111.111.111"),t.qZA(),t.qZA(),t.TgZ(88,"div",28),t.TgZ(89,"div"),t._uU(90,"Sep 1, 2021 11:11"),t.qZA(),t.TgZ(91,"div",29),t._uU(92,"111.111.111.111"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(93,"mat-grid-tile",4),t.TgZ(94,"mat-card",5),t.TgZ(95,"mat-card-header"),t.TgZ(96,"mat-card-title"),t._uU(97),t.qZA(),t.qZA(),t.TgZ(98,"mat-card-content",6),t.TgZ(99,"div",28),t.TgZ(100,"div"),t._uU(101,"Place Orders:"),t.qZA(),t.TgZ(102,"div",29),t._uU(103,"120"),t.qZA(),t.qZA(),t.TgZ(104,"div",28),t.TgZ(105,"div"),t._uU(106,"Total Amount($k):"),t.qZA(),t.TgZ(107,"div",29),t._uU(108,"1,200"),t.qZA(),t.qZA(),t.TgZ(109,"div",28),t.TgZ(110,"div"),t._uU(111,"Net Profits($1k):"),t.qZA(),t.TgZ(112,"div",29),t._uU(113,"100"),t.qZA(),t.qZA(),t.TgZ(114,"div",28),t.TgZ(115,"div"),t._uU(116,"Receivable($1k):"),t.qZA(),t.TgZ(117,"div",29),t._uU(118,"2"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&i&&(t.xp6(4),t.Oqu(t.xi3(5,18,n.currentMonth,"MMM y")),t.xp6(3),t.Q6J("colspan",n.cards[0].cols)("rowspan",n.cards[0].rows),t.xp6(4),t.hij(" ",n.cards[0].title," "),t.xp6(10),t.Oqu(n.user.name),t.xp6(11),t.hij(" ",n.user.email,""),t.xp6(31),t.Q6J("colspan",n.cards[1].cols)("rowspan",n.cards[1].rows),t.xp6(4),t.hij(" ",n.cards[1].title," "),t.xp6(2),t.Q6J("delayRendering",1e3),t.xp6(1),t.Q6J("delayRendering",2e3),t.xp6(1),t.Q6J("delayRendering",3e3),t.xp6(1),t.Q6J("colspan",n.cards[2].cols)("rowspan",n.cards[2].rows),t.xp6(4),t.hij(" ",n.cards[2].title," "),t.xp6(17),t.Q6J("colspan",n.cards[3].cols)("rowspan",n.cards[3].rows),t.xp6(4),t.hij(" ",n.cards[3].title," "))},directives:[p.Il,p.DX,r.a8,r.dk,r.n5,r.dn,s.xw,s.Wh,s.yH,x.lW,h.b8,q],pipes:[c.uU],styles:[".grid-container[_ngcontent-%COMP%]{margin:16px}.dashboard-card[_ngcontent-%COMP%]{position:absolute;top:15px;left:15px;right:15px;bottom:15px}.card-item[_ngcontent-%COMP%]{width:80%;display:flex;justify-content:space-between;margin:16px}.card-avatar[_ngcontent-%COMP%]{width:100px;height:100px;border-radius:50%;overflow:hidden;object-fit:cover;display:block;border:2px solid lightgray}.box-shadow[_ngcontent-%COMP%]{box-shadow:0 3px 2px -1px #0003,0 2px 5px #00000024,0 1px 4px #0000001f}.important-data[_ngcontent-%COMP%]{font-weight:bold;font-size:1.1rem}.fxflex[_ngcontent-%COMP%]{border-radius:8px}.fxflex[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:8px}.fxflex[_ngcontent-%COMP%]   .card-subtitle[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:bolder}.fxflex[_ngcontent-%COMP%]   .divider-in-text[_ngcontent-%COMP%]{padding:0 4px;font-weight:bold}.fxflex[_ngcontent-%COMP%]   .social-media[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;width:100%;color:#fff;border-radius:16px;margin:8px 0;padding:4px}.fxflex[_ngcontent-%COMP%]   .social-media[_ngcontent-%COMP%]   .media-text-area[_ngcontent-%COMP%]{width:120px}.fxflex[_ngcontent-%COMP%]   .social-media.twitter[_ngcontent-%COMP%]{background-color:#00aced}.fxflex[_ngcontent-%COMP%]   .social-media.facebook[_ngcontent-%COMP%]{background-color:#39539d}.fxflex[_ngcontent-%COMP%]   .social-media.linkedin[_ngcontent-%COMP%]{background-color:#00679b}.fxflex[_ngcontent-%COMP%]   .social-media[_ngcontent-%COMP%]   .media-icon[_ngcontent-%COMP%]{width:30px;height:30px}.fxflex[_ngcontent-%COMP%]   .social-media[_ngcontent-%COMP%]   .media-name[_ngcontent-%COMP%]{font-size:18px;letter-spacing:.1rem}.fxflex[_ngcontent-%COMP%]   .social-media[_ngcontent-%COMP%]   .media-link[_ngcontent-%COMP%]{font-size:12px;text-decoration:none;color:#fff;opacity:1;transition:all .3s}.fxflex[_ngcontent-%COMP%]   .social-media[_ngcontent-%COMP%]   .media-link[_ngcontent-%COMP%]:hover{opacity:.5}"]}),e})()}];let y=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[g.Bz.forChild(w)],g.Bz]}),e})();var b=a(3336);let O=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[c.ez,u.o9,y,b.q]]}),e})()}}]);