$(document).ready(function(){
  //Função para listar os arquivos existentes
  $('#album_fotos option:selected').each(function(){
    var file = $(this).text();
    var p = '<p id="'+file+'">';
    p += '<a class="btn btn-success btn-download" href="http://'+window.location.host+'/multiupload/default/download/'+file+'">Arquivo</a>';
    p += '<button type="button" class="btn btn-danger excluir"><span class="icon-white icon-trash"></span></button></p>';
    $('#album_fotos').parent().append(p);
  });
  //Função para excluir os arquivos
  $('button.excluir').click(function(){
      var arq = $(this).parent().attr('id');
      $(this).parent().hide();
      $.ajax({
          url: 'http://'+window.location.host+'/multiupload/album/delete_file/'+arq,
          type: 'post',
          data: arq,
          success: function(data){
            if (data != 'erro'){
              $('#album_fotos option:selected').each(function(){
                  var file = $(this).text();
                  if(file == data){
                  $(this).remove();
                  }
              });
            }else{                            
              alert('Erro ao excluir arquivo!');
            }
        },
        error: function(){
          alert('Erro ao excluir arquivo, verifique sua conexão!');
        }
      });
  });
  //Função para tratar os uploads via ajax
  arquivos = $('#album_fotos');
  arquivos.parent().append('<input class="upload" id="file_upload" name="file_upload" type="file">');
  arquivos.hide();
  $('#file_upload').pekeUpload({
    btnText: 'Adicionar',
    url: 'http://' + window.location.host + '/multiupload/album/upload_file',
    theme: 'bootstrap',
    showErrorAlerts: false,
    onFileError: function(file,error){
      $('#album_fotos').append($('<option>', {value: error, text: error, selected: true}));
      var div = '<div class="alert alert-success">';
      div += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>';
      div += '<p>'+file['name']+' adicionado com sucesso!</p></div>'
      $('div.pekecontainer').append(div);
    }
  });
});