window.addEventListener('devicelight', function(event) {
  var iluminacao = event.value

  if (iluminacao <= 10) {
    document.body.classList.add('lightbulb--is-on')
  } else {
    document.body.classList.remove('lightbulb--is-on')
  }
})
/*
if (!('ondevicelight' in window)) {
  document
    .querySelector('.modal')
    .classList
    .add('modal--is-visible')
}
*/
function checkState(bulbId) {
  $.getJSON('/bulbs/'+bulbId,function(data) {
    state = data[0].isOn;
    if (state) {
      document.body.classList.add('lightbulb--is-on');
      $( "#flip-1" ).val("on").slider("refresh");
    } else {
      document.body.classList.remove('lightbulb--is-on');
      $( "#flip-1" ).val("off").slider("refresh");
    }
    setTimeout(checkState(bulbId),500);
  });
}

$( document ).ready(function() {
  checkState(bulbId);
  $("#flip-1").bind("change", function(event,ui) {
    state = $( "#flip-1 option:selected" ).text();
    if (state=="On") {
      $.getJSON('/bulbs/'+bulbId+"/on",function(data) {
      });
    } else {
      document.body.classList.remove('lightbulb--is-on')
      $.getJSON('/bulbs/'+bulbId+"/off",function(data) {
      });
    }
  })
});