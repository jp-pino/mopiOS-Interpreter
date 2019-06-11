$(function () {
  socket = io();

  $('#cmd').on('keyup', function(e) {
    if (e.keyCode === 13) {
      if ($('#cmd').val().length > 0) {
        if ($('#cmd').val() == "clear") {
          $('#memory').children().remove();
        } else {
          $('#memory').append("<p class=\"card-text m-0\"><strong class=\"text-success\">admin$</strong> " + $('#cmd').val()  + "</p>");
          socket.emit('console', $('#cmd').val());
          $('#console').scrollTop(document.getElementById("console").scrollHeight);
        }
        $('#cmd').val("");
      }
    }
  });

  socket.on('response', function(res) {
    res = res.replace(/ /g, "&nbsp");
    res = res.replace(/(\r\n|\n|\r)/gm,"</p><p class=\"card-text m-0\">");
    $('#memory').append("<p class=\"card-text m-0\"> " + res  + "</p>");
    $('#console').scrollTop(document.getElementById("console").scrollHeight);
  });
});
