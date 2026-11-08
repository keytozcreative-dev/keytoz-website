/* Lightweight motion: reveals, scroll progress, timeline fill, magnetic buttons, key tilt. */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io=('IntersectionObserver' in window)&&!reduce?new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
  },{threshold:.15,rootMargin:'0px 0px -6% 0px'}):null;
  function observe(){document.querySelectorAll('.rv:not(.in)').forEach(function(el){io?io.observe(el):el.classList.add('in')})}
  window.KZ={observe:observe};

  var prog=document.getElementById('prog'),hdr=document.getElementById('hdr'),tl=document.getElementById('tl'),tick=false;
  function onScroll(){
    var h=document.documentElement,max=h.scrollHeight-innerHeight;
    prog.style.transform='scaleX('+(max>0?scrollY/max:0)+')';
    hdr.classList.toggle('scrolled',scrollY>20);
    if(tl){var r=tl.getBoundingClientRect(),p=(innerHeight*.65-r.top)/r.height;tl.style.setProperty('--p',Math.max(0,Math.min(1,p)).toFixed(3))}
    tick=false;
  }
  addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});
  addEventListener('resize',onScroll);onScroll();

  if(!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.querySelectorAll('.btn').forEach(function(b){
      b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();
        b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.25)+'px)'});
      b.addEventListener('pointerleave',function(){b.style.transform=''});
    });
    var art=document.getElementById('art');
    addEventListener('pointermove',function(e){if(scrollY>innerHeight)return;
      var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
      art.style.transform='rotateY('+(x*18)+'deg) rotateX('+(-y*10)+'deg)'},{passive:true});
  }
})();
