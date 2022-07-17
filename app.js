  //mascaras
  $("#inputCPF").mask("000.000.000-00");
  $("#inputNascimento").mask("00/00/0000");   
  

  //ações botão Cadastrar
  function main(){
      validacoes();   
  }

  //Limpa os campos
  $("#btnCancelar").click(function(){
    $("#formCadastro input").val("");
    $('input[name="radioGenero"]').prop('checked',false);
  })

  function validacoes(){

      //validação do nome
      let nome = $("#inputNome").val();

      if(nome.length < 2){
          $("#inputNome").attr('data-content','nome invalido! Seu nome deve contem pelo menos duas letras');
          $("#inputNome").attr('data-placement','top');
          $("#inputNome").popover('show');
          return false;
      }


    inputEmail = $("#inputEmail").val();
    padraoEmail = /^[\w._-]+@[\w_.-]+[\w]{2,}/gi;

    if(!padraoEmail.test(inputEmail)){
        $("#inputEmail").attr('data-content','Email invalido!');
        $("#inputEmail").attr('data-placement','top');
        $("#inputEmail").popover('show');
        return false;
    }
  
  
  //valida se as senhas comferem
      //recebe os valores
      let comfirmaSenha = $("#inputComfirmaSenha").val();
      let senha = $("#inputSenha").val();

      //compara se são diferentes
      if(senha =="" && comfirmaSenha==""){
          $("#inputSenha").attr('data-content','Preenchimento obrigatorio!');
          $("#inputSenha").attr('data-placement','top');
          $("#inputSenha").popover('show');

          $("#inputComfirmaSenha").attr('data-content','Preenchimento obrigatorio!');
          $("#inputComfirmaSenha").attr('data-placement','top');
          $("#inputComfirmaSenha").popover('show');
          return false;
      }

      if (comfirmaSenha != senha || senha =="" || comfirmaSenha==""){

          $("#inputComfirmaSenha").attr('data-content','As senhas diferem!');
          $("#inputComfirmaSenha").attr('data-placement','top');
          $("#inputComfirmaSenha").popover("show");
          return false;
      }    
      

      
      // verificacao CPF 
      //primeiro digito
      let soma1 = 0;
      let cpf1 = $("#inputCPF").val().replace(/\.|-/g,""); //recebe o cpf digitado somente com numeros

      for (var i = 0; i < cpf1.length-2; i++){ //laço para validar o primeiro digito validador
          soma1 += cpf1[i] * ((cpf1.length-1)-i);
      }
      soma1 = (soma1 * 10) % 11;
      
      if(soma1==10 || soma1 == 11){
          soma1=0;
      }
      if(soma1 != cpf1[9]){
          $("#inputCPF").attr('data-content','CPF invalido');
          $("#inputCPF").attr('data-placement','top');
          $("#inputCPF").popover("show");
          return false;
      }
     


      //segundo digito
      let soma2 = 0;
      let cpf2 = $("#inputCPF").val().replace(/\.|-/g,""); //recebe o cpf digitado somente com numeros
      
      for (var i = 0; i < cpf2.length-1; i++){ //laço para validar o Segundo digito validador
          soma2 += cpf2[i] * (cpf2.length-i);
      }
      soma2 = (soma2 * 10) % 11;
      
      if(soma2==10 || soma2 == 11){ 
          soma2=0; 
      }
      if(soma2 != cpf2[10]){
          $("#inputCPF").attr('data-content','CPF invalido');
          $("#inputCPF").attr('data-placement','top');
          $("#inputCPF").popover("show");
          return false;
      }
     
  

      //recebe a data e sapara dia, mes e ano em matriz
      let inputNascimento = $("#inputNascimento").val();
      let dataNascimentoAux = inputNascimento.split("/");

      //pega a data atual e formata em dd/mm/yyyy
      let newDate = new Date();
      let ano = String(newDate.getFullYear());
      let mes = String(newDate.getMonth()+1).padStart(2, "0");
      let dia = String(newDate.getDate());
      let dataAtualAux = dia+"/"+mes+"/"+ano;

      //recebe a data e sapara dia, mes e ano em matriz
      let dataAtual = dataAtualAux.split("/");

      //se a data nao for preenchida ou for maior que a data atual retorna erro
      if(dataNascimentoAux == ""){
          $("#inputNascimento").attr('data-content','Campo obrigatorio!');
          $("#inputNascimento").attr('data-placement','top');
          $("#inputNascimento").popover("show");
      }
     
      if(
      parseInt(dataNascimentoAux[2]) > parseInt(dataAtual[2]) || 
      parseInt(dataNascimentoAux[0]) > 31 || parseInt(dataNascimentoAux[0]) == 0 ||
      parseInt(dataNascimentoAux[1]) > 12 || parseInt(dataNascimentoAux[1]) == 0
       ){
          $("#inputNascimento").attr('data-content','Data invalida');
          $("#inputNascimento").attr('data-placement','top');
          $("#inputNascimento").popover("show");
          return false;
      }
     ;

      
      //verificacao do genero
      let radioGenero = $('input[name="radioGenero"]:checked').val();
      if(radioGenero==undefined){
          $("#Genero").attr('data-content','Campo obrigatorio');
          $("#Genero").attr('data-placement','top');
          $("#Genero").popover("show");
          return false;
      } 

  
      alert("Cadastro Enviado");
      $("#formCadastro").submit();
  }
