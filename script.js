const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const auth = $("#authModal");
const dash = $("#dashboardModal");
const toast = $("#toast");
const menuButton = $("#menuBtn");
const mainNav = $("#mainNav");
const backToTop = $("#backToTop");
const survey = $("#surveyModal");
let toastTimer;
let returnFocus;

function showToast(msg){
  toast.textContent = msg; toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove("show"),2800);
}
function openModal(type){
  if(type === "survey"){
    returnFocus = document.activeElement;
    survey.classList.add("open"); survey.setAttribute("aria-hidden","false");
    document.body.classList.add("modal-open");
    survey.querySelector(".modal-close").focus();
    return;
  }
  if(type === "login" || type === "register"){
    returnFocus = document.activeElement;
    auth.classList.add("open"); auth.setAttribute("aria-hidden","false");
    showAuth(type);
    document.body.classList.add("modal-open");
    auth.querySelector(".modal-close").focus();
  }
}
function showAuth(type){
  $("#loginView").hidden = type !== "login";
  $("#registerView").hidden = type !== "register";
  auth.setAttribute("aria-labelledby", type === "login" ? "loginTitle" : "registerTitle");
}
function closeModal(which){
  if(which==="modal"){auth.classList.remove("open"); auth.setAttribute("aria-hidden","true")}
  if(which==="survey"){survey.classList.remove("open"); survey.setAttribute("aria-hidden","true")}
  if(which==="dashboard"){dash.classList.remove("open"); dash.setAttribute("aria-hidden","true")}
  const hasOpenModal = auth.classList.contains("open") || survey.classList.contains("open") || dash.classList.contains("open");
  document.body.classList.toggle("modal-open",hasOpenModal);
  if(!hasOpenModal && returnFocus instanceof HTMLElement){returnFocus.focus();returnFocus=null}
}
$$("[data-open]").forEach(b=>b.addEventListener("click",()=>openModal(b.dataset.open)));
$$("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));

$("#showRegister").addEventListener("click",()=>showAuth("register"));
$("#showLogin").addEventListener("click",()=>showAuth("login"));

$("#loginForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const email=$("#loginEmail").value.trim(), pass=$("#loginPassword").value;
  let saved=null;
  try{saved=JSON.parse(localStorage.getItem("bitegg_user")||"null")}catch{localStorage.removeItem("bitegg_user")}
  const validDemo=email==="usuario@biteggcoin.gt"&&pass==="123456";
  const validSaved=saved&&saved.email===email&&saved.password===pass;
  if(validDemo || validSaved){
    window.location.assign("https://becsimulator.netlify.app/");
  }else showToast("Credenciales incorrectas. Usa el acceso demo indicado.");
});

$("#registerForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const user={name:$("#regName").value.trim(),email:$("#regEmail").value.trim(),password:$("#regPassword").value};
  localStorage.setItem("bitegg_user",JSON.stringify(user));
  $("#loginEmail").value=user.email; $("#loginPassword").value=user.password;
  showAuth("login"); showToast("Cuenta creada localmente. Ya puedes ingresar.");
});

$("#guestBtn").addEventListener("click",()=>{
  $("#loginEmail").value="usuario@biteggcoin.gt"; $("#loginPassword").value="123456";
  $("#loginForm").requestSubmit();
});

$("#surveyForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  let answers=[];
  try{answers=JSON.parse(localStorage.getItem("bitegg_survey")||"[]")}catch{}
  answers.push({score:Number($("#surveyScore").value),comment:$("#surveyComment").value.trim(),date:new Date().toISOString()});
  try{localStorage.setItem("bitegg_survey",JSON.stringify(answers))}catch{}
  e.target.reset(); closeModal("survey"); showToast("¡Gracias por evaluar el prototipo!");
});

$("#logoutBtn").addEventListener("click",()=>{closeModal("dashboard");showToast("Sesión cerrada.");});

menuButton.addEventListener("click",()=>{
  const isOpen=mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",String(isOpen));
  menuButton.setAttribute("aria-label",isOpen?"Cerrar menú":"Abrir menú");
});
function closeMenus(){$$(".nav-group").forEach(g=>{g.classList.remove("open");g.querySelector(".nav-toggle").setAttribute("aria-expanded","false")})}
$$(".nav-toggle").forEach(t=>t.addEventListener("click",()=>{
  const group=t.parentElement, wasOpen=group.classList.contains("open");
  closeMenus();
  group.classList.toggle("open",!wasOpen);
  t.setAttribute("aria-expanded",String(!wasOpen));
}));
document.addEventListener("click",(e)=>{if(!e.target.closest(".nav-group"))closeMenus()});
mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  closeMenus();
  mainNav.classList.remove("open");
  menuButton.setAttribute("aria-expanded","false");
  menuButton.setAttribute("aria-label","Abrir menú");
}));

document.addEventListener("keydown",(e)=>{
  if(e.key==="Escape"){closeModal("modal");closeModal("dashboard");closeModal("survey");closeMenus();}
  const openDialog=document.querySelector(".modal.open");
  if(e.key==="Tab" && openDialog){
    const focusable=Array.from(openDialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled])'))
      .filter(element=>!element.closest("[hidden]") && element.getClientRects().length);
    const first=focusable[0], last=focusable[focusable.length-1];
    if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus()}
    else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus()}
  }
});

const revealItems=document.querySelectorAll("main > section, main > .cards-section");
if("IntersectionObserver" in window){
  const revealObserver=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}
    });
  },{threshold:.12});
  revealItems.forEach((item,index)=>{
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay",`${(index%3)*70}ms`);
    revealObserver.observe(item);
  });
}else revealItems.forEach(item=>item.classList.add("is-visible"));

const navLinks=Array.from(mainNav.querySelectorAll('a[href^="#"]'));
if("IntersectionObserver" in window){
  const sections=navLinks.map(link=>document.getElementById(link.hash.slice(1))).filter(Boolean);
  const sectionObserver=new IntersectionObserver(entries=>{
    const current=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(current){
      navLinks.forEach(link=>link.removeAttribute("aria-current"));
      $$(".nav-group").forEach(g=>g.classList.remove("active"));
      const active=mainNav.querySelector(`a[href="#${current.target.id}"]`);
      active?.setAttribute("aria-current","location");
      active?.closest(".nav-group")?.classList.add("active");
    }
  },{rootMargin:"-20% 0px -65% 0px",threshold:0});
  sections.forEach(section=>sectionObserver.observe(section));
}

let backToTopVisible=false;
window.addEventListener("scroll",()=>{
  const shouldShow=window.scrollY>500;
  if(shouldShow && !backToTopVisible){
    backToTop.hidden=false;
    requestAnimationFrame(()=>backToTop.classList.add("visible"));
  }else if(!shouldShow && backToTopVisible){
    backToTop.classList.remove("visible");
    setTimeout(()=>{if(window.scrollY<=500)backToTop.hidden=true},220);
  }
  backToTopVisible=shouldShow;
},{passive:true});
backToTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));

const download=document.querySelector('a[href="BitEggCoin_Version_Final.docx"]');
download?.addEventListener("click",()=>showToast("Descargando el documento original..."));

const wallpaper=$(".hero-wallpaper");
if(wallpaper){
  const cols=Math.max(4,Math.min(9,Math.round(innerWidth/150)));
  for(let c=0;c<cols;c++){
    const col=document.createElement("div");
    col.className="wall-col"+(c%2?" down":"");
    col.style.setProperty("--wall-speed",`${34+(c*7)%18}s`);
    col.style.setProperty("--wall-delay",`-${(c*9)%30}s`);
    const set=Array.from({length:12},(_,i)=>(i+c)%2?"🪙":"🥚");
    col.innerHTML=[...set,...set].map(e=>`<span>${e}</span>`).join("");
    wallpaper.appendChild(col);
  }
}