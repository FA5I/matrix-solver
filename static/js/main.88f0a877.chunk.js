(this.webpackJsonpsolver=this.webpackJsonpsolver||[]).push([[0],[,,,,,,function(e,a,t){e.exports=t(13)},,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var s=t(0),r=t.n(s),n=t(5),l=t.n(n),o=(t(11),t(1)),i=(t(12),t(2)),u=t(3),c=function(){function e(a,t){Object(i.a)(this,e),this.rows=parseInt(a),this.cols=parseInt(t),this.size=a*t,this.values=new Array(this.size).fill(0)}return Object(u.a)(e,[{key:"printValues",value:function(){console.log(JSON.stringify(this.values))}},{key:"swapRows",value:function(e,a){if(e!=a){for(var t=new Array(this.cols).fill(0),s=0;s<this.cols;s++)t[s]=this.values[e*this.cols+s];for(var r=0;r<this.cols;r++)this.values[e*this.cols+r]=this.values[a*this.cols+r],this.values[a*this.cols+r]=t[r]}}},{key:"matMatMult",value:function(a){if(this.cols!==a.rows)throw"input dimensions don't match";for(var t=new e(this.rows,a.cols),s=0;s<this.rows;s++)for(var r=0;r<this.cols;r++)for(var n=0;n<a.cols;n++)t.values[s*t.cols+n]+=this.values[s*this.cols+r]*a.values[r*a.cols+n];return t}},{key:"transpose",value:function(){for(var e=new Array(this.size).fill(0),a=0;a<this.rows;a++)for(var t=0;t<this.cols;t++)e[a*this.cols+t]=this.values[t*this.cols+a];var s=this.rows;this.rows=this.cols,this.cols=s,this.values=e}}]),e}(),v=function(){function e(){Object(i.a)(this,e)}return Object(u.a)(e,[{key:"solveLU",value:function(e,a){var t=this.luDecompositionPivot(e),s=t[2],r=t[1],n=t[0];n.transpose();var l=n.matMatMult(a),o=this.forwardSubstitution(r,l);return this.backSubstitution(s,o)}},{key:"luDecompositionPivot",value:function(e){if(e.cols!==e.rows)throw"Input matrix must be square!";for(var a=new c(e.rows,e.cols),t=0;t<e.size;t++)a.values[t]=e.values[t];for(var s,r,n=new c(e.rows,e.cols),l=new c(e.rows,e.cols),o=0;o<l.rows;o++)l.values[o*l.cols+o]=1;for(var i=0;i<a.rows-1;i++){s=-1,r=i;for(var u=i;u<a.rows;u++){var v=Math.abs(a.values[u*a.cols+i]);v>s&&(s=v,r=u)}a.swapRows(i,r),l.swapRows(i,r),n.swapRows(i,r);for(var m=void 0,h=i+1;h<a.rows;h++){m=a.values[h*a.cols+i]/a.values[i*a.cols+i];for(var w=i;w<a.cols;w++)a.values[h*a.cols+w]-=m*a.values[i*a.cols+w];n.values[h*n.rows+i]=m}}for(var f=0;f<a.rows;f++)n.values[f*n.rows+f]+=1;return l.transpose(),[l,n,a]}},{key:"upperTriangular",value:function(e,a){if(e.rows!==e.cols)throw"Input matrix must be square!";if(e.rows!==a.size)throw"The dimensions of A and b don't match!";for(var t,s,r=0;r<e.rows-1;r++){s=r;for(var n=r+1;n<e.rows;n++)Math.abs(e.values[s*e.cols+r])<Math.abs(e.values[n*e.cols+r])&&(s=n);e.swapRows(s,r),a.swapRows(s,r);for(var l=r+1;l<e.rows;l++){t=e.values[l*e.cols+r]/e.values[r*e.cols+r];for(var o=r;o<e.rows;o++)e.values[l*e.cols+o]-=t*e.values[r*e.cols+o];a.values[l]-=t*a.values[r]}}}},{key:"backSubstitution",value:function(e,a){if(e.rows!==e.cols)throw"Input matrix must be square!";if(e.rows!==a.size)throw"The dimensions of A and b don't match!";for(var t,s=new c(a.rows,a.cols),r=a.size-1;r>=0;r--){t=0;for(var n=r+1;n<a.size;n++)t+=e.values[r*e.cols+n]*s.values[n];s.values[r]=(a.values[r]-t)/e.values[r*e.cols+r]}return s}},{key:"forwardSubstitution",value:function(e,a){if(e.rows!==e.cols)throw"Input matrix must be square!";if(e.rows!==a.size)throw"The dimensions of A and b don't match!";for(var t,s=new c(a.rows,a.cols),r=0;r<a.size;r++){t=0;for(var n=0;n<r;n++)t+=e.values[r*e.cols+n]*s.values[n];s.values[r]=(a.values[r]-t)/e.values[r*e.cols+r]}return s}}]),e}();function m(e){var a={};return e.solved&&(a=e.failed?{background:"red"}:{background:"#8FBC8F"}),r.a.createElement("input",{style:a,className:"cell",id:e.id,value:e.value,onChange:function(a){return e.onChange(e.id,a.target.value)}})}var h=function(){var e=Object(s.useState)(2),a=Object(o.a)(e,2),t=a[0],n=a[1],l=Object(s.useState)(!1),i=Object(o.a)(l,2),u=i[0],h=i[1],w=Object(s.useState)(new c(t,t)),f=Object(o.a)(w,2),d=f[0],p=f[1],b=Object(s.useState)(new c(t,1)),E=Object(o.a)(b,2),y=E[0],g=E[1],k=Object(s.useState)(!1),N=Object(o.a)(k,2),O=N[0],j=N[1],x=Object(s.useState)(new c(t,1)),A=Object(o.a)(x,2),S=A[0],I=A[1];function z(e,a){var t=d.values.slice(),s=new c(d.rows,d.cols);t[e]=a,s.values=t,p(s)}function C(e,a){var t=e.replace(/\D/g,""),s=S.values.slice(),r=new c(d.rows,1);s[t]=a,r.values=s,I(r)}return r.a.createElement("div",{className:"App"},r.a.createElement("nav",null,r.a.createElement("a",{href:"https://fazalkhan.net/"}," back to Fazi's Homepage")),r.a.createElement("div",{className:"title"},"Matrix Solver"),r.a.createElement("div",{className:"description"},r.a.createElement("p",null,"This is a matrix solver written in Javascript using React. It directly solves a system of equations of the form",r.a.createElement("span",{className:"bold"}," Ax = b")," using an LU decomposition with partial pivoting. ",r.a.createElement("br",null),r.a.createElement("br",null),"1. Input the values in the matrix on the left. ",r.a.createElement("br",null)," ",r.a.createElement("br",null),"2. Input the right-hand side. ",r.a.createElement("br",null)," ",r.a.createElement("br",null),"3. Hit solve. ",r.a.createElement("br",null)," ",r.a.createElement("br",null),"If a solution exists, the variable column will show the solution values and turn green from grey. ",r.a.createElement("br",null)," ",r.a.createElement("br",null),"If a ",r.a.createElement("b",null,"unique")," solution does not exist, the variable column will turn red from grey.")),r.a.createElement("div",{className:"inputs"},r.a.createElement("span",{className:"dimensions"},"#Rows:"),r.a.createElement("input",{className:"slider",type:"number",min:"2",max:"10",value:t,onChange:function(e){return function(e){var a=isNaN(parseInt(e))?2:parseInt(e);a>10?a=10:a<2&&(a=2),p(new c(a,a)),I(new c(a,1)),n(a)}(e.target.value)}}),r.a.createElement("button",{className:"solve-button",onClick:function(){for(var e=(new v).solveLU(d,S),a=0;a<e.values.length;a++)isNaN(e.values[a])&&(e.values[a]=e.values[a].toString());e.values.includes("NaN")?j(!0):j(!1),h(!0),g(e)}},"Solve"),r.a.createElement("button",{className:"reset-button",onClick:function(){var e=new c(t,t),a=new c(t,1),s=new c(t,1);n(2),h(!1),p(e),g(a),j(!1),I(s)}},"Reset")),r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"grid"},r.a.createElement("div",{className:"matrix"},r.a.createElement("div",null,Array.apply(null,Array(t)).map((function(e,a){var s=Array.apply(null,Array(t)).map((function(e,s){return r.a.createElement(m,{key:a*t+s,id:a*t+s,value:d.values[a*t+s],onChange:z})}));return r.a.createElement("div",{key:a},s)})))),r.a.createElement("div",{className:"variables"},Array.apply(null,Array(t)).map((function(e,a){return r.a.createElement(m,{failed:O,solved:u,key:"x"+a,id:"x"+a,value:u?y.values[a]:"x"+a,onChange:function(e,a){}})}))),r.a.createElement("div",{className:"equalsign"}," = "),r.a.createElement("div",{className:"rhs"},Array.apply(null,Array(t)).map((function(e,a){return r.a.createElement(m,{key:"rhs"+a,id:"rhs"+a,value:S.values[a],onChange:C})}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[6,1,2]]]);
//# sourceMappingURL=main.88f0a877.chunk.js.map