/* Language switching, rendering lists, menu, portfolio filter, contact form. */
(function(){
  var $=function(s){return document.querySelector(s)};
  var CONTACT_EMAIL='keytozcreatize@gmail.com';   // EDIT: where the contact form sends
  var FORM_ENDPOINT='https://formspree.io/f/myeeaerw';                    // OPTIONAL: e.g. a Formspree URL. Empty = opens the visitor's email app.
  var ICONS=['M4 5h16v11H9l-5 4z','M12 3l9 9-9 9-9-9z','M7 12a5 5 0 1 1 10 0a5 5 0 0 1-10 0zM12 17v4','M3 5h18v14H3zM3 9h18','M5 4h14v16H5zM8 9h8M8 13h8','M3 7h4l2-3h6l2 3h4v13H3zM12 17a4 4 0 1 0 0-8a4 4 0 0 0 0 8z','M4 13v-2l12-6v14zM19 9v6','M4 6h16v14H4zM4 10h16M8 3v4M16 3v4','M12 3l2.5 6 6.5.5-5 4.3 1.6 6.4-5.6-3.5-5.6 3.5L8 13.8 3 9.5 9.5 9z','M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5V15h8v-1.5A6 6 0 0 0 12 3z'];
  /* Add projects here: { cat: 'branding' | 'digital' | 'content' | 'events', title: 'Name', text: 'Short note' }.
     Without a title, the placeholder text is shown. */
  var PROJECTS=[{cat:'branding'},{cat:'digital'},{cat:'content'},{cat:'events'},{cat:'branding'},{cat:'digital'}];
  var KEY='<svg class="mk" viewBox="0 0 60 132" aria-hidden="true"><use href="#keyp" fill="url(#kg)"/></svg>';
  var lang='en',filter='all';
  try{lang=localStorage.getItem('kz-lang')==='ar'?'ar':'en'}catch(e){}

  function render(L){
    $('#vals').innerHTML=L.vals.map(function(v){return '<li class="rv"><h3>'+v[0]+'</h3><p>'+v[1]+'</p></li>'}).join('');
    $('#svcs').innerHTML=L.svc.map(function(s,i){return '<li class="svc rv"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="'+ICONS[i]+'"/></svg><div><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div></li>'}).join('');
    $('#tl').innerHTML=L.proc.map(function(s,i){return '<li class="step rv"><span class="num">'+(i+1)+'</span><h3>'+s[0]+'</h3><p>'+s[1]+'</p></li>'}).join('');
    $('#whys').innerHTML=L.why.map(function(s){return '<li class="rv"><h3>'+s[0]+'</h3><p>'+s[1]+'</p></li>'}).join('');
    $('#teamL').innerHTML=[0,1,2,3].map(function(){return '<li class="rv"><div class="ph">'+KEY+'</div><h3>'+L.tn+'</h3><p>'+L.tr+'</p></li>'}).join('').replace(/class="mk"/g,'');
    $('#filters').innerHTML=Object.keys(L.cats).map(function(k){return '<button class="fb" type="button" data-f="'+k+'" aria-pressed="'+(k===filter)+'">'+L.cats[k]+'</button>'}).join('');
    $('#works').innerHTML=PROJECTS.map(function(p){return '<article class="wk rv" data-c="'+p.cat+'"'+(filter!=='all'&&p.cat!==filter?' hidden':'')+'>'+KEY+'<div><small>'+L.cats[p.cat]+'</small><h3>'+(p.title||L.wt)+'</h3><small>'+(p.text||L.soon)+'</small></div></article>'}).join('');
    KZ.observe();
  }
  function apply(l){
    lang=l;var L=I18N[l],h=document.documentElement;
    h.lang=l;h.dir=l==='ar'?'rtl':'ltr';document.title=L.title;
    $('meta[name=description]').content=L.desc;
    document.querySelectorAll('[data-i18n]').forEach(function(el){var v=L[el.dataset.i18n];if(typeof v==='string')el.textContent=v});
    $('#lang').textContent=L.lang;$('#lang').setAttribute('aria-label',L.langLabel);$('#burger').setAttribute('aria-label',L.menu);
    $('#status').textContent='';$('#status').className='status';
    document.querySelectorAll('.err').forEach(function(e){e.textContent='';e.parentNode.classList.remove('bad')});
    render(L);
    try{localStorage.setItem('kz-lang',l)}catch(e){}
  }
  $('#lang').addEventListener('click',function(){apply(lang==='en'?'ar':'en')});

  /* menu */
  var nav=$('#nav'),bg=$('#burger');
  function menu(open){nav.classList.toggle('open',open);bg.setAttribute('aria-expanded',open);document.body.style.overflow=open?'hidden':''}
  bg.addEventListener('click',function(){menu(!nav.classList.contains('open'))});
  nav.addEventListener('click',function(e){if(e.target.tagName==='A')menu(false)});
  addEventListener('keydown',function(e){if(e.key==='Escape')menu(false)});
  addEventListener('resize',function(){if(innerWidth>=900)menu(false)});

  /* portfolio filter */
  $('#filters').addEventListener('click',function(e){var b=e.target.closest('.fb');if(!b)return;filter=b.dataset.f;
    document.querySelectorAll('.fb').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    document.querySelectorAll('.wk').forEach(function(w){w.hidden=filter!=='all'&&w.dataset.c!==filter})});

  /* contact form */
  var f=$('#form');
  function bad(id,key){var e=$('#e-'+id);e.textContent=I18N[lang][key];e.parentNode.classList.add('bad');return false}
  function clear(id){var e=$('#e-'+id);e.textContent='';e.parentNode.classList.remove('bad')}
  function validate(){
    var ok=true,n=f.name.value.trim(),m=f.email.value.trim(),p=f.phone.value.trim(),t=f.message.value.trim();
    ['name','email','phone','msg'].forEach(clear);
    if(!n)ok=bad('name','e_req');
    if(!m)ok=bad('email','e_req');else if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m))ok=bad('email','e_mail');
    if(p&&!/^[+()\d\s-]{6,20}$/.test(p))ok=bad('phone','e_phone');
    if(!t)ok=bad('msg','e_req');else if(t.length<10)ok=bad('msg','e_msg');
    if(!ok){var first=f.querySelector('.bad input,.bad textarea');if(first)first.focus()}
    return ok;
  }
  function status(k,cls){var s=$('#status');s.textContent=I18N[lang][k];s.className='status '+cls}
  f.addEventListener('submit',function(e){
    e.preventDefault();$('#status').textContent='';if(!validate())return;
    var d={name:f.name.value.trim(),email:f.email.value.trim(),phone:f.phone.value.trim(),message:f.message.value.trim()};
    if(FORM_ENDPOINT){
      fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)})
        .then(function(r){if(!r.ok)throw 0;f.reset();status('ok','ok')}).catch(function(){status('no','no')});
    }else{
      var body='Name: '+d.name+'\nEmail: '+d.email+(d.phone?'\nPhone: '+d.phone:'')+'\n\n'+d.message;
      status('ok','ok');
      location.href='mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent('KEYTOZ project enquiry')+'&body='+encodeURIComponent(body);
    }
  });
  ['name','email','phone','msg'].forEach(function(id){var el=$('#f-'+id);el.addEventListener('input',function(){clear(id)})});

  apply(lang);
})();
