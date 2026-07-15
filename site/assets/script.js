// mobile nav toggle
document.addEventListener('DOMContentLoaded', function(){
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-nav');
  if(btn && menu){
    btn.addEventListener('click', function(){
      menu.classList.toggle('open');
    });
  }

  // scroll reveal
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  // request form -> opens mail client with prefilled message
  const form = document.getElementById('requestForm');
  if(form){
    const status = document.getElementById('formStatus');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      if(!data.email && !data.phone){
        status.textContent = 'Please leave either an email or a phone number.';
        return;
      }

      const subject = encodeURIComponent('Website Request — ' + (data.business || data.name));
      const body = encodeURIComponent(
        'Name: ' + data.name + '\n' +
        'Business: ' + (data.business || '-') + '\n' +
        'Email: ' + (data.email || '-') + '\n' +
        'Phone: ' + (data.phone || '-') + '\n' +
        'Category: ' + data.category + '\n\n' +
        'Details:\n' + data.details
      );

      var dest = 'corporately.liam' + '@' + 'gmail.com';
      window.location.href = 'mailto:' + dest + '?subject=' + subject + '&body=' + body;
      status.textContent = 'Opening your email app to send this request...';
    });
  }
});
