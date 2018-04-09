var Mailmm = {
  actions: {
    init: function () {
      $(document).on('click','#create_form button',function() {
        $.post('/create',$('#create_form').serialize(),function(e) {
          console.log(e);
        });
      });
      $('#action_drop_menu .dropdown-item').on("click",function () {
        var index = $(this).parents().eq(1).attr('data-active').split('_')[0].replace(/(^|\s)\S/g, l => l.toUpperCase());
        var html = '<li class="breadcrumb-item">Home</li>'
          + '<li class="breadcrumb-item">'+index+'</li>'
          + '<li class="breadcrumb-item active" aria-current="page">'+$(this).text()+'</li>';
        $("#mailmm_breadcrumb").html(html);
        $.get('/'+$(this).text(),function(e) {
          $('#mailmm_content').html(e);
        });
      });
    }
  },
  init : function () {
    $('#action_drop_menu').on('show.bs.dropdown',function () {
      var id = '#'+$(this).data('active');
      var p = $(id).offset();
      $(this).offset({ top:p.top, left: p.left });
    });
    $("#mailmm_content .btn").on("click",function (e) {
      e.preventDefault();
      $('#action_drop_menu').attr('data-active',this.id);
      isOpen = $("#action_drop_menu").hasClass('show');
       if(isOpen) {
          $(this).dropdown('toggle');
       }
    });
    Mailmm.actions.init();
  }
};

$(document).ready(function () {
  Mailmm.init();
});
