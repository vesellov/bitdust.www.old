
$(document).ready(function() {

    $("#message_overlay button.close").click(function(){
        $('#message_overlay').css('display', 'none');
        $("#bg").show();
    });

    $('#message_overlay').click(function(event) {
        e = event || window.event;
        if (e.target == this) {
            $('#message_overlay').css('display', 'none');
            $("#bg").show();
        }
    });

    $('#top_search_button').click(function() {
        if ($('#top_search_input').val()) {
            $('#feedback_message').val($('#top_search_input').val());
        }
        $('#message_overlay').css('display', 'block');
        $("#bg").hide();
    });

    $('#top_search_input').bind("enterKey", function(e) {
        if ($('#top_search_input').val()) {
            $('#feedback_message').val($('#top_search_input').val());
        }
        $('#message_overlay').css('display', 'block');
        $("#bg").hide();
    });

    $('#top_search_input').keyup(function(e){
        if(e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });    

    var form = $('#feedback_form'); // contact form
    var submit = $('#feedback_submit_button');  // submit button
    var alert = $('.alert'); // alert div for show alert message

    // form submit event
    form.on('submit', function(e) {
        e.preventDefault(); // prevent default form submit

        $.ajax({
          url: 'feedback.php', // form action url
          type: 'POST', // form submit method get/post
          dataType: 'html', // request type html/json/xml
          data: form.serialize(), // serialize form data 
          beforeSend: function() {
            alert.fadeOut();
            submit.html('sending....'); // change submit button text
          },
          success: function(data) {
            alert.html("<h1>Great thanks for your feedback.!</h1><br>BitDust Team will create a ticket or answer your question directly ASAP.<br>Let's be in touch!");
            $('#feedback_panel').hide();
            alert.html(data).fadeIn(); // fade in response data
            form.trigger('reset'); // reset form
            submit.html('get fast response from developers'); // reset submit button text
          },
          error: function(e) {
            alert.html("<h1>Error happened while sending ...</h1>");
            $('#feedback_panel').hide();
            alert.html(data).fadeIn(); // fade in response data
            form.trigger('reset'); // reset form
            submit.html('get fast response from developers'); // reset submit button text
          }
        });
    });
});
