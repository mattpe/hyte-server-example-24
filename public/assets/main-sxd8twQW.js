import{f as l}from"./fetch-BU9L-ehW.js";const c=(n,t)=>{document.getElementById(n).innerText=t},i=()=>{localStorage.removeItem("token"),c("clearResponse","localStorage cleared!")},u=document.querySelector(".createuser");u.addEventListener("click",async n=>{n.preventDefault(),console.log("Yritetään luoda käyttäjä");const t="http://localhost:3000/api/users",e=document.querySelector(".create_user_form");if(!e.checkValidity()){e.reportValidity();return}console.log("Tiedot valideja, jatketaan");const r={username:e.querySelector("input[name=username]").value,password:e.querySelector("input[name=password]").value,email:e.querySelector("input[name=email]").value},o={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)};try{const a=await l(t,o);console.log(a),alert(a.message)}catch(a){console.error(a.response)}});const m=document.querySelector(".loginuser");m.addEventListener("click",async n=>{n.preventDefault(),console.log("Nyt logataan sisään");const t="http://localhost:3000/api/auth/login",e=document.querySelector(".login_form"),s={username:e.querySelector("input[name=username]").value,password:e.querySelector("input[name=password]").value},r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)};l(t,r).then(o=>{console.log(o),console.log(o.token),localStorage.setItem("token",o.token),o.token==null?alert("Unauth user: käyttäjänimi tai salasana ei oikein"):(alert(o.message),localStorage.setItem("name",o.user.username)),c("loginResponse",`localStorage set with token value: ${o.token}`)})});const p=document.querySelector("#meRequest");p.addEventListener("click",async()=>{console.log("Testataan TOKENIA ja haetaan käyttäjän tiedot");const n="http://localhost:3000/api/auth/me",t=localStorage.getItem("token");console.log("Tämä on haettu LocalStoragesta",t);const e={method:"GET",headers:{Authorization:"Bearer: "+t}};console.log(e),l(n,e).then(s=>{console.log(s),c("meResponse",`Authorized user info: ${JSON.stringify(s)}`)})});const d=document.querySelector("#clearButton");d.addEventListener("click",i);
