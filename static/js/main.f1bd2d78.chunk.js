(this["webpackJsonpuq-bus-web"]=this["webpackJsonpuq-bus-web"]||[]).push([[0],{18:function(e,t,n){},24:function(e,t,n){e.exports=n(33)},33:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(19),o=n.n(r),c=n(65),l=(n(18),n(10)),u=n(7),s=n(62),m=n(64),p=n(58),h=n(60),f=n(63),g=n(57),d=n(61),b=n(55),E=n(59);function j(e){for(var t=[],n=0;n<e.length;n++){var a=e[n],i={no:a.routeShortName,route:a.routeLongName,stop:a.stopName,time:a.time};t.push(i)}return t}var v=function(e){var t=Object(a.useState)(j(e.buses)),n=Object(u.a)(t,2),r=n[0],o=n[1],c=Object(a.useState)(j(e.buses)),l=Object(u.a)(c,2),v=(l[0],l[1]),S=Object(a.useState)(e.loading),O=Object(u.a)(S,2),k=O[0],_=O[1],y=Object(b.a)((function(e){return{table:{minWidth:500},loading:{display:"flex","& > * + *":{marginTop:e.spacing(2)},colorPrimary:"#fff"}}}));Object(a.useEffect)((function(){o(j(e.buses)),v(r),_(e.loading)}),[e.buses,e.loading]);var L=function(e,t){var n=parseInt(e.time.split(":")[0])-parseInt(t.time.split(":")[0]),a=parseInt(e.time.split(":")[1])-parseInt(t.time.split(":")[1]);return n>0?1:n<0?-1:a>0?1:a<0?-1:0},w=Object(a.useCallback)((function(){var e=r.sort(L).map((function(e){return i.a.createElement(g.a,null,i.a.createElement(p.a,{align:"right"},e.no),i.a.createElement(p.a,null,e.route),i.a.createElement(p.a,{align:"center"},e.stop),i.a.createElement(p.a,null,e.time))}));return console.log(e),e}),[r]),N=Object(a.useCallback)((function(){return i.a.createElement("div",{align:"center"},"loading"===k?i.a.createElement("div",null,i.a.createElement("br",null),i.a.createElement(E.a,{color:"primary",style:{color:"#fff"}})):i.a.createElement("div",null))})),U=Object(a.useCallback)((function(){return i.a.createElement(h.a,{component:d.a},i.a.createElement(s.a,{className:y.table,"aria-label":"simple table"},i.a.createElement("colgroup",null,i.a.createElement("col",{style:{width:"2%"}}),i.a.createElement("col",{style:{width:"83%"}}),i.a.createElement("col",{style:{width:"5%"}}),i.a.createElement("col",{style:{width:"10%"}})),i.a.createElement(f.a,null,i.a.createElement(g.a,null,i.a.createElement(p.a,null),i.a.createElement(p.a,{align:"left"},"Route"),i.a.createElement(p.a,{align:"left"},"Stop"),i.a.createElement(p.a,{align:"left"},"Time"))),i.a.createElement(m.a,null,w())))}),[y]);return i.a.createElement("div",null,U(),N())},S=n(21),O=n(11),k="https://uq-bus-backend-api.herokuapp.com/",_=function(){function e(t,n,a,i){Object(S.a)(this,e),this.tripId=t,this.stopId=n,this.time="Loading... ",this.trip="Loading... ",this.route="Loading...  ",this.routeLongName="Loading...  ",this.routeShortName="...",this.stop="Loading...  ",this.stopName="...",this.isLoading=!0;var r={"UQ Lakes, platform A":"A","UQ Lakes, platform B":"B","UQ Lakes, platform C":"C","UQ Lakes, platform D":"D","UQ Lakes, platform E":"E","UQ Lakes station":"Any"};this.getTripPromise(this.tripId).then(function(e){return this.trip=e[0],this.getRoutePromise(e[0].route_id)}.bind(this)).then(function(e){this.route=e,this.routeLongName=e[0].route_long_name,this.routeShortName=e[0].route_short_name}.bind(this)).then(function(){return this.time=a,this.time=this.time.substring(0,5),this.getStopPromise(n)}.bind(this)).then(function(e){this.stop=e,this.stopName=r[e[0].stop_name]}.bind(this)).then(function(){this.isLoading=!1,i(this)}.bind(this))}return Object(O.a)(e,[{key:"getTripPromise",value:function(e){return fetch(k+"/trip/trip_id/"+e+"/").then((function(e){return e.json()}))}},{key:"getRoutePromise",value:function(e){return fetch(k+"/route/route_id/"+e+"/").then((function(e){return e.json()}))}},{key:"getStopPromise",value:function(e){return fetch(k+"/stop/stop_id/"+e+"/").then((function(e){return e.json()}))}},{key:"getTripUpdatePromise",value:function(e){return fetch(k+"/trip_update/trip_id/"+e+"/").then((function(e){return e.json()}))}},{key:"getStopTimeUpdate",value:function(e){return fetch(k+"/stop_time_update/trip_update_id/"+e+"/").then((function(e){return e.json()}))}}]),e}(),y=["1853","1877","1878","1880","1883","1882"];var L=function(e){var t=Object(a.useState)([]),n=Object(u.a)(t,2),r=n[0],o=n[1],c=Object(a.useState)([]),s=Object(u.a)(c,2),m=s[0],p=s[1],h=Object(a.useState)("loading"),f=Object(u.a)(h,2),g=f[0],d=f[1];Object(a.useEffect)((function(){E()}),[]);var b=Object(a.useCallback)((function(e){console.log("Finished Loading: ",e),p((function(t){return t.splice(t.indexOf(e))})),0==m.length?d("done"):d("loading"),o((function(t){return[].concat(Object(l.a)(t),[e])}))})),E=Object(a.useCallback)((function(){var t=function(){for(var e="",t=0;t<y.length;t++)e=t===y.length-1?e.toString()+y[t].toString():e.toString()+y[t].toString()+",";return e}(),n=function(){var e=(new Date).toLocaleString("en-US",{timezone:"Australia/Brisbane"});return new Date(e)}(),a=function(e){return e.getFullYear()+"-"+(e.getMonth()+1).toString().padStart(2,"0")+"-"+e.getDate().toString().padStart(2,"0")}(n),i=function(e){return e.getHours().toString().padStart(2,"0")+":"+e.getMinutes().toString().padStart(2,"0")+":"+e.getSeconds().toString().padStart(2,"0")}(n);fetch("https://uq-bus-backend-api.herokuapp.com//stop_time?time="+a+" "+i+"&stop_id="+t).then((function(e){return e.json()})).then((function(t){t.forEach((function(t){if("Departing"===e.name&&"1882"!==t.stop_id||"Arriving"===e.name&&"1882"===t.stop_id){var n=new _(t.trip_id,t.stop_id,t.departure_time,b);p((function(e){return[].concat(Object(l.a)(e),[n])}))}}))}))}));return i.a.createElement("div",{className:"BusTable"},i.a.createElement("h3",null,e.name),i.a.createElement(v,{loading:g,buses:r}))};o.a.render(i.a.createElement((function(){return i.a.createElement("div",null,i.a.createElement("div",{class:"title"},i.a.createElement(c.a,{container:!0,spacing:0,direction:"row",alignItems:"center",justify:"center"},i.a.createElement(c.a,{item:!0},i.a.createElement("img",{align:"right",src:"/uq-bus-web/busWhite96.png",alt:""})),i.a.createElement(c.a,{item:!0},i.a.createElement("h1",{align:"left"},"UQBus")))),i.a.createElement("div",{class:"uq-lakes-tables"},i.a.createElement("h2",{align:"center"},"UQ Lakes"),i.a.createElement(c.a,{container:!0,spacing:0,direction:"column",alignItems:"center",justify:"center"},i.a.createElement(c.a,{item:!0,style:{minWidth:345,width:"60%"}},i.a.createElement(L,{name:"Departing"})),i.a.createElement(c.a,{item:!0,style:{minWidth:345,width:"60%"}},i.a.createElement(L,{name:"Arriving"})))))}),null),document.getElementById("root"))}},[[24,1,2]]]);
//# sourceMappingURL=main.f1bd2d78.chunk.js.map