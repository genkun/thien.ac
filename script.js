
const TABS = [
  { id:'todo', label:'To-do list' },
  { id:'notes', label:'Ghi chú' },
  { id:'words', label:'Đếm từ' },
  { id:'case', label:'Đổi chữ' },
  { id:'calc', label:'Máy tính' },
  { id:'time', label:'Đồng hồ/Pomodoro' },
  { id:'convert', label:'Chuyển đổi đơn vị' },
  { id:'password', label:'Tạo mật khẩu' },
  { id:'file', label:'Quản lý file' },
  { id:'calendar', label:'Lịch & nhắc việc' },
  { id:'crypto', label:'Ký số/Mã hóa' },
  { id:'search', label:'Tra cứu nhanh' },
  { id:'chart', label:'Biểu đồ' },
  { id:'pdf', label:'PDF → Hình ảnh' }
];

let activeTab = localStorage.getItem('active_tab') || 'todo';
const tabsEl = document.getElementById('tabs');
const contentEl = document.getElementById('content');

function renderTabs(){
  tabsEl.innerHTML = '';
  TABS.forEach(t=>{
    const b=document.createElement('button');
    b.textContent=t.label;
    b.className=activeTab===t.id?'active':'';
    b.onclick=()=>{ activeTab=t.id; localStorage.setItem('active_tab',activeTab); render(); };
    tabsEl.appendChild(b);
  });
}

function viewTodo(){
  const div=document.createElement('div'); div.className='card';
  div.innerHTML=`<h2>To-do list</h2>
    <input id="todoInput" placeholder="Nhập việc..."/>
    <button id="addTodo">Thêm</button>
    <ul id="todoList"></ul>`;
  const list=div.querySelector('#todoList');
  let todos=JSON.parse(localStorage.getItem('todos')||'[]');
  function draw(){ list.innerHTML=''; todos.forEach((t,i)=>{ const li=document.createElement('li'); li.textContent=t.text; if(t.done) li.style.textDecoration='line-through'; li.onclick=()=>{todos[i].done=!todos[i].done; save(); draw();}; list.appendChild(li); }); }
  function save(){ localStorage.setItem('todos',JSON.stringify(todos)); }
  div.querySelector('#addTodo').onclick=()=>{ const v=div.querySelector('#todoInput').value.trim(); if(v){ todos.push({text:v,done:false}); save(); draw(); } };
  draw(); return div;
}

function viewNotes(){
  const div=document.createElement('div'); div.className='card';
  div.innerHTML=`<h2>Ghi chú</h2><textarea id="noteBox"></textarea>`;
  const box=div.querySelector('#noteBox'); box.value=localStorage.getItem('notes')||''; box.oninput=()=>localStorage.setItem('notes',box.value);
  return div;
}

function viewWords(){
  const div=document.createElement('div'); div.className='card';
  div.innerHTML=`<h2>Đếm từ</h2><textarea id="txt"></textarea><p id="count"></p>`;
  const txt=div.querySelector('#txt'), count=div.querySelector('#count');
  txt.oninput=()=>{ const t=txt.value; count.textContent=`Ký tự: ${t.length}, Từ: ${t.trim().split(/\s+/).length}`; };
  return div;
}

function viewCase(){
  const div=document.createElement('div'); div.className='card';
  div.innerHTML=`<h2>Đổi chữ</h2><textarea id="caseIn"></textarea>
    <button data-act="upper">UPPER</button><button data-act="lower">lower</button><button data-act="title">Title Case</button>
    <textarea id="caseOut"></textarea>`;
  const inp=div.querySelector('#caseIn'), out=div.querySelector('#caseOut');
  div.querySelectorAll('button').forEach(b=>{ b.onclick=()=>{ const act=b.dataset.act, t=inp.value; if(act==='upper') out.value=t.toUpperCase(); if(act==='lower') out.value=t.toLowerCase(); if(act==='title') out.value=t.replace(/\w\S*/g,w=>w[0].toUpperCase()+w.slice(1).toLowerCase()); }; });
  return div;
}

function viewCalc(){
  const div=document.createElement('div'); div.className='card';
  div.innerHTML=`<h2>Máy tính</h2><input id="expr"/><button id="evalBtn">Tính</button><p id="res"></p>`;
  div.querySelector('#evalBtn').onclick=()=>{ try{ div.querySelector('#res').textContent=eval(div.querySelector('#expr').value); }catch(e){ div.querySelector('#res').textContent='Lỗi'; } };
  return div;
}

function viewTime(){
  const div=document.createElement('div'); div.className='card';
  div.innerHTML=`<h2>Đồng hồ</h2><p id="clock"></p>`;
  const clock=div.querySelector('#clock'); setInterval(()=>{ clock.textContent=new Date().toLocaleTimeString(); },1000);
  return div;
}

function viewConvert(){
  const div=document.createElement('div'); div.className='card';
  div.innerHTML=`<h2>Chuyển đổi đơn vị</h2><input id="m" placeholder="Met"/><p id="km"></p>`;
  const m=div.querySelector('#m'), km=div.querySelector('#km'); m.oninput=()=>{ km.textContent=(parseFloat(m.value)/1000)+' km'; };
  return div;
}

function viewPassword(){
  const div=document.createElement('div'); div.className='card';
  div.innerHTML=`<h2>Tạo mật khẩu</h2><input id="len" type="number" value="12"/><button id="gen">Tạo</button><p id="pw"></p>`;
  div.querySelector('#gen').onclick=()=>{ const len=+div.querySelector('#len').value; const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"; let out=""; for(let i=0;i<len;i++) out+=chars[Math.floor(Math.random()*chars.length)]; div.querySelector('#pw').textContent=out; };
  return div;
}

function viewFile(){
  const div=document.createElement('div'); div.className='card';
  div.innerHTML=`<h2>Quản lý file</h2><input type="file" id="fileInput"/><pre id="fileOut"></pre>`;
  div.querySelector('#fileInput').onchange=e=>{ const f=e.target.files
/* ===== Toggle menu responsive & set active link ===== */
(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
    });

    // Đóng menu khi bấm link trên mobile
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof Element && target.closest('.nav__link')) {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Mở menu');
      }
    });
  }

  // Set active theo đường dẫn hiện tại
  const links = document.querySelectorAll('.nav__link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const clean = (s) => s.replace(/\/+$/, '');
    if (clean(location.pathname) === clean(href)) {
      links.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();
