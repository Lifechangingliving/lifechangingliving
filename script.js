// scroll progress
var prog = document.getElementById('prog');
window.addEventListener('scroll', function(){
  var s = document.documentElement.scrollTop || document.body.scrollTop;
  var h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  prog.style.width = (s/h*100) + '%';
});

// reveal on scroll
var revEls = document.querySelectorAll('.rev');
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -30px 0px'});
  revEls.forEach(function(el){ io.observe(el); });
} else {
  revEls.forEach(function(el){ el.classList.add('in'); });
}

// FAQ accordion
document.querySelectorAll('.faqq').forEach(function(btn){
  btn.addEventListener('click', function(){
    var item = btn.closest('.faqitem');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faqitem.open').forEach(function(o){
      o.classList.remove('open');
      o.querySelector('.faqq').setAttribute('aria-expanded','false');
    });
    if(!isOpen){
      item.classList.add('open');
      btn.setAttribute('aria-expanded','true');
    }
  });
});

// animated counters
function animateCounter(el) {
  var target = parseInt(el.getAttribute('data-target'));
  var suffix = el.getAttribute('data-suffix') || '';
  var duration = 1800;
  var start = null;
  function step(ts) {
    if (!start) start = ts;
    var progress = Math.min((ts - start) / duration, 1);
    var ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(step);
}
var counterEls = document.querySelectorAll('[data-target]');
if ('IntersectionObserver' in window) {
  var cio = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { animateCounter(e.target); cio.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(function(el) { cio.observe(el); });
}
