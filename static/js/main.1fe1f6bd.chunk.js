(this["webpackJsonpuq-bus-web"]=this["webpackJsonpuq-bus-web"]||[]).push([[0],{34:function(e,t,n){e.exports=n(45)},39:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(20),c=n.n(i),l=n(68),o=(n(39),n(8)),u=n(5),s=n(65),m=n(67),f=n(61),p=n(63),d=n(66),h=n(60),g=n(64),b=n(62),E=n(58);function v(){return Object(E.a)((function(e){return{table:{minWidth:500},loading:{display:"flex","& > * + *":{marginTop:e.spacing(2)},colorPrimary:"#fff"}}}))}function j(e){for(var t=[],n=0;n<e.length;n++){var a=e[n],r={no:a.routeShortName,route:a.routeLongName,stop:a.stopName,time:a.time};t.push(r)}return t}var y=function(e){var t=Object(a.useState)(j(e.buses)),n=Object(u.a)(t,2),i=n[0],c=n[1],l=Object(a.useState)(j(e.buses)),o=Object(u.a)(l,2),E=(o[0],o[1]),y=Object(a.useState)(e.loading),O=Object(u.a)(y,2),S=O[0],k=O[1],w=v();Object(a.useEffect)((function(){c(j(e.buses)),E(i),k(e.loading)}),[e.buses,e.loading]);var _=function(e,t){var n=parseInt(e.time.split(":")[0])-parseInt(t.time.split(":")[0]),a=parseInt(e.time.split(":")[1])-parseInt(t.time.split(":")[1]);return n>0?1:n<0?-1:a>0?1:a<0?-1:0},L=Object(a.useCallback)((function(){var e=i.sort(_).map((function(e){return r.a.createElement(h.a,null,r.a.createElement(f.a,{align:"right"},e.no),r.a.createElement(f.a,null,e.route),r.a.createElement(f.a,{align:"center"},e.stop),r.a.createElement(f.a,null,e.time))}));return console.log(e),e}),[i]),I=Object(a.useCallback)((function(){return r.a.createElement("div",{align:"center"},"loading"===S?r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement(b.a,{color:"primary",style:{color:"#fff"}})):r.a.createElement("div",null))})),N=Object(a.useCallback)((function(){return r.a.createElement(p.a,{component:g.a},r.a.createElement(s.a,{className:w.table,"aria-label":"simple table"},r.a.createElement("colgroup",null,r.a.createElement("col",{style:{width:"2%"}}),r.a.createElement("col",{style:{width:"83%"}}),r.a.createElement("col",{style:{width:"5%"}}),r.a.createElement("col",{style:{width:"10%"}})),r.a.createElement(d.a,null,r.a.createElement(h.a,null,r.a.createElement(f.a,null),r.a.createElement(f.a,{align:"left"},"Route"),r.a.createElement(f.a,{align:"left"},"Stop"),r.a.createElement(f.a,{align:"left"},"Time"))),r.a.createElement(m.a,null,L())))}),[w]);return r.a.createElement("div",null,N(),I())},O=n(22),S=n(11),k="https://uq-bus-backend-api.herokuapp.com/",w=function(){function e(t,n,a,r){Object(O.a)(this,e),this.tripId=t,this.stopId=n,this.time="Loading... ",this.trip="Loading... ",this.route="Loading...  ",this.routeLongName="Loading...  ",this.routeShortName="...",this.stop="Loading...  ",this.stopName="...",this.isLoading=!0;var i={"UQ Lakes, platform A":"A","UQ Lakes, platform B":"B","UQ Lakes, platform C":"C","UQ Lakes, platform D":"D","UQ Lakes, platform E":"E","UQ Lakes station":"Any"};this.getTripPromise(this.tripId).then(function(e){return this.trip=e[0],this.getRoutePromise(e[0].route_id)}.bind(this)).then(function(e){this.route=e,this.routeLongName=e[0].route_long_name,this.routeShortName=e[0].route_short_name}.bind(this)).then(function(){return this.time=a,this.time=this.time.substring(0,5),this.getStopPromise(n)}.bind(this)).then(function(e){this.stop=e,this.stopName=i[e[0].stop_name]}.bind(this)).then(function(){this.isLoading=!1,r(this)}.bind(this))}return Object(S.a)(e,[{key:"getTripPromise",value:function(e){return fetch(k+"/trip/trip_id/"+e+"/").then((function(e){return e.json()}))}},{key:"getRoutePromise",value:function(e){return fetch(k+"/route/route_id/"+e+"/").then((function(e){return e.json()}))}},{key:"getStopPromise",value:function(e){return fetch(k+"/stop/stop_id/"+e+"/").then((function(e){return e.json()}))}},{key:"getTripUpdatePromise",value:function(e){return fetch(k+"/trip_update/trip_id/"+e+"/").then((function(e){return e.json()}))}},{key:"getStopTimeUpdate",value:function(e){return fetch(k+"/stop_time_update/trip_update_id/"+e+"/").then((function(e){return e.json()}))}}]),e}(),_=["1853","1877","1878","1880","1883","1882"];var L=function(e){var t=Object(a.useState)([]),n=Object(u.a)(t,2),i=n[0],c=n[1],l=Object(a.useState)([]),s=Object(u.a)(l,2),m=s[0],f=s[1],p=Object(a.useState)("loading"),d=Object(u.a)(p,2),h=d[0],g=d[1];Object(a.useEffect)((function(){E()}),[]);var b=Object(a.useCallback)((function(e){console.log("Finished Loading: ",e),f((function(t){return t.splice(t.indexOf(e))})),0==m.length?g("done"):g("loading"),c((function(t){return[].concat(Object(o.a)(t),[e])}))})),E=Object(a.useCallback)((function(){var t=function(){for(var e="",t=0;t<_.length;t++)e=t===_.length-1?e.toString()+_[t].toString():e.toString()+_[t].toString()+",";return e}(),n=function(){var e=(new Date).toLocaleString("en-US",{timezone:"Australia/Brisbane"});return new Date(e)}(),a=function(e){return e.getFullYear()+"-"+(e.getMonth()+1).toString().padStart(2,"0")+"-"+e.getDate().toString().padStart(2,"0")}(n),r=function(e){return e.getHours().toString().padStart(2,"0")+":"+e.getMinutes().toString().padStart(2,"0")+":"+e.getSeconds().toString().padStart(2,"0")}(n);fetch("https://uq-bus-backend-api.herokuapp.com//stop_time?time="+a+" "+r+"&stop_id="+t).then((function(e){return e.json()})).then((function(t){t.forEach((function(t){if("Departing"===e.name&&"1882"!==t.stop_id||"Arriving"===e.name&&"1882"===t.stop_id){var n=new w(t.trip_id,t.stop_id,t.departure_time,b);f((function(e){return[].concat(Object(o.a)(e),[n])}))}}))}))}));return r.a.createElement("div",{className:"BusTable"},r.a.createElement("h3",null,e.name),r.a.createElement(y,{loading:h,buses:i}))},I=n(14),N=n.n(I),U=n(18);function M(){return r.a.createElement("div",{align:"center"},r.a.createElement("br",null),r.a.createElement(b.a,{color:"primary",style:{color:"#fff"}}))}function D(){return r.a.createElement("div",{align:"center"})}function C(e){var t=Object(a.useState)(!0),n=Object(u.a)(t,2),i=n[0],c=n[1];return Object(a.useEffect)((function(){c(e.isLoading)}),[e.isLoading]),i?r.a.createElement(M,null):r.a.createElement(D,null)}var P=["28","29","66","129","139","169","192","209"];function Q(e){return q.apply(this,arguments)}function q(){return(q=Object(U.a)(N.a.mark((function e(t){var n;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://uq-bus-backend-api.herokuapp.com//service_updates/affected_service/"+t);case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(e,t){return"Informative"===e.severity&&("Minor"===t.severity||"Major"===t.severity)||"Minor"===e.severity&&"Major"===t.severity?1:"Informative"===e.severity&&"Informative"===t.severity||"Minor"===e.severity&&"Minor"===t.severity||"Major"===e.severity&&"Major"===t.severity?0:-1}function T(e){var t=Object(a.useState)([]),n=Object(u.a)(t,2),i=n[0],c=n[1],l=v();Object(a.useEffect)((function(){c(e.updates)}),[e.updates]);var o=Object(a.useCallback)((function(){return i.sort(x).map((function(e){return function(e){return r.a.createElement(h.a,null,r.a.createElement(f.a,{align:"left"},e.severity),r.a.createElement(f.a,null,e.title),r.a.createElement(f.a,{align:"center"},e.dates))}(e)}))}),[i]);return r.a.createElement(p.a,{component:g.a},r.a.createElement(s.a,{className:l.table,"aria-label":"simple table"},r.a.createElement("colgroup",null,r.a.createElement("col",{style:{width:"15%"}}),r.a.createElement("col",{style:{width:"60%"}}),r.a.createElement("col",{style:{width:"25%"}})),r.a.createElement(d.a,null,r.a.createElement(h.a,null,r.a.createElement(f.a,{align:"left"},"Severity"),r.a.createElement(f.a,{align:"left"},"Description"),r.a.createElement(f.a,{align:"center"},"Date"))),r.a.createElement(m.a,null,o())))}var A=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],i=t[1],c=Object(a.useState)(!0),l=Object(u.a)(c,2),s=l[0],m=l[1],f=function(){var e=Object(U.a)(N.a.mark((function e(){var t,n;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=new Set,n=0,P.forEach((function(e){Q(e).then((function(e){e.forEach((function(e){t.has(e.id)||(t.add(e.id),i((function(t){return[].concat(Object(o.a)(t),[e])})),console.log(e))})),++n==P.length&&m(!1)}))}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){f()}),[]),r.a.createElement("div",null,r.a.createElement(T,{updates:n}),r.a.createElement(C,{isLoading:s}))};c.a.render(r.a.createElement((function(){return r.a.createElement("div",null,r.a.createElement("div",{class:"title"},r.a.createElement(l.a,{container:!0,spacing:0,direction:"row",alignItems:"center",justify:"center"},r.a.createElement(l.a,{item:!0},r.a.createElement("img",{align:"right",src:"/uq-bus-web/busWhite96.png",alt:""})),r.a.createElement(l.a,{item:!0},r.a.createElement("h1",{align:"left"},"UQBus")))),r.a.createElement("div",{class:"service-updates"},r.a.createElement("h2",{align:"center"},"Service Updates"),r.a.createElement(l.a,{container:!0,spacing:0,direction:"column",alignItems:"center",justify:"center"},r.a.createElement(l.a,{item:!0,style:{minWidth:345,width:"60%"}},r.a.createElement(A,null)))),r.a.createElement("div",{class:"uq-lakes-tables"},r.a.createElement("h2",{align:"center"},"UQ Lakes"),r.a.createElement(l.a,{container:!0,spacing:0,direction:"column",alignItems:"center",justify:"center"},r.a.createElement(l.a,{item:!0,style:{minWidth:345,width:"60%"}},r.a.createElement(L,{name:"Departing"})),r.a.createElement(l.a,{item:!0,style:{minWidth:345,width:"60%"}},r.a.createElement(L,{name:"Arriving"})))))}),null),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.1fe1f6bd.chunk.js.map