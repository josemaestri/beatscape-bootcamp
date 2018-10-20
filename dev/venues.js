var elem = document.querySelector('.collapsible.popout');
var instance = M.Collapsible.init(elem, {
  accordion: false
});

$(document).ready(function(){
    $('.collapsible.popout').collapsible();
  });