(this["webpackJsonpuq-bus-web"]=this["webpackJsonpuq-bus-web"]||[]).push([[0],{13:function(t,e,n){},14:function(t,e,n){"use strict";n.r(e);var r=n(6),u=n(4),a=n(7),i=n(1),o=n(2),s=n(0),c=n.n(s),l=n(5),h=n.n(l),p=(n(13),function(t){var e=t.buses;return c.a.createElement("table",null,c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"route_name"),c.a.createElement("th",null,"trip_id"),c.a.createElement("th",null,"stop_id"),c.a.createElement("th",null,"departure_time"))),c.a.createElement("tbody",null,e.length>0?e.map((function(t,e){return c.a.createElement("tr",{key:e},c.a.createElement("td",null,t.route_long_name),c.a.createElement("td",null,t.tripId),c.a.createElement("td",null,t.stopId),c.a.createElement("td",null,t.departureTime))})):c.a.createElement("tr",null,c.a.createElement("td",null,"Loading..."))))}),d=["1853","1878","1880","1882","1883"],m=function(){function t(e,n,r,u){Object(i.a)(this,t),this.tripId=e,this.stopId=n,this.departureTime=r,this.trip="Loading...",this.route="Loading...",this.route_long_name="Loading...",this.route_short_name="Loading...",this.getTripPromise(this.tripId).then(function(t){return this.trip=t[0],console.log(t[0]),this.getRoutePromise(t[0].route_id)}.bind(this)).then(function(t){this.route=t,this.route_long_name=t[0].route_long_name,this.route_short_name=t[0].route_short_name,console.log(t)}.bind(this)).then((function(){u.stateUpdateCallback()}))}return Object(o.a)(t,[{key:"getTripPromise",value:function(t){return fetch("http://uqbus.richal.tech/trip/trip_id/"+t+"/").then((function(t){return t.json()}))}},{key:"getRoutePromise",value:function(t){return fetch("http://uqbus.richal.tech/route/route_id/"+t+"/").then((function(t){return t.json()}))}},{key:"getTripUpdatePromise",value:function(t){return fetch("http://uqbus.richal.tech/trip_update/trip_id/"+t+"/").then((function(t){return t.json()}))}},{key:"getStopTimeUpdate",value:function(t){return fetch("http://uqbus.richal.tech/stop_time_update/trip_update_id/"+t+"/").then((function(t){return t.json()}))}}]),t}(),f=function(t){function e(){var t,n;Object(i.a)(this,e);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(n=Object(r.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(o)))).state={buses:[]},n}return Object(a.a)(e,t),Object(o.a)(e,[{key:"componentDidMount",value:function(){this.getBuses()}},{key:"stateUpdateCallback",value:function(){this.forceUpdate()}},{key:"getBusesForStop",value:function(t){var e=new Date,n=new Date(e.toLocaleString("en-US",{timezone:"Australia/Brisbane"})),r=n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate(),u=n.getHours()+":"+n.getMinutes()+":"+n.getSeconds();return fetch("http://uqbus.richal.tech/stop_time/stop_id/"+t+"/current_time/"+r+" "+u+"/").then((function(t){return t.json()}))}},{key:"getBuses",value:function(){for(var t=this,e=[],n=[],r=[],u=0;u<d.length;u++)e=e.concat(this.getBusesForStop(d[u]));Promise.all(e).then((function(e){e.forEach((function(t){return n=n.concat(t)})),n.forEach((function(e){var n=new m(e.trip_id,e.stop_id,e.departure_time,t);r.push(n)})),t.setState({buses:r})}))}},{key:"render",value:function(){return c.a.createElement("div",{className:"BusTable"},c.a.createElement(p,{buses:this.state.buses}))}}]),e}(c.a.Component);h.a.render(c.a.createElement(f,null),document.getElementById("root"))},8:function(t,e,n){t.exports=n(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.1a15bb05.chunk.js.map