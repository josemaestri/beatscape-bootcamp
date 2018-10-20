var searchField = $('#search-field');
$(document).ready(function(){
  $('.fixed-action-btn').floatingActionButton();
});

// Search Bar
$('#search-toggle').click(function(){
  $(this).hide();
  $('#search-toggle-2').show();
  $('.search-container').addClass('active');
  $('.input').addClass('active');
  $('#search-field').focus();
  $('.input').children('label').hide();
});

$('#search-toggle-2').click(function(){
  if(searchField.val()){
    $('.tag-form').submit();
  } else{
    $(this).hide();
    $('#search-toggle').show();
    $('.search-container').removeClass('active');
    $('.input').removeClass('active');
  }
});

function search() {
  if(event.keyCode == 13) {
    $('#search-toggle-2').hide();
    $('#search-toggle').show();
    $('.search-container').removeClass('active');
    $('.input').removeClass('active');
  }
};

$('#search-field').click(function(){
  $('.input').children('label').hide();
});

$('#search-field').blur(function(){
  if($(this).val()){
    $('.input').children('label').hide();
  } else {
    $('.input').children('label').show();
  }
});
