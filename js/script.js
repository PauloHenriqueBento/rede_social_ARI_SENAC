function validarCPF() {
    var CPF = document.getElementById('CPF').value;
    //Caracter invalidos
    if (!/[0-9]{11}/.test(CPF) || CPF === "00000000000"){
        alert("CPF INVALIDO");
    }

    var total = 0;

    for (var i = 1; i <= 9; i++) {
        total += parseInt(CPF.substring(i - 1, i)) * (11 - i);
    }

    var resto = total % 11;
    if (resto === 10 || resto === 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto !== parseInt(CPF.substring(9, 10))) {
        return false;
    }

    total = 0;

    for (var i = 1; i <= 10; i++) {
        total += parseInt(CPF.substring(i - 1, i)) * (12 - i);
    }
    resto = total % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }
 
    if (resto !== parseInt(CPF.substring(10, 11))) {
        return false;
    }

    return true;
}

function armazena(){

    var username = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var CPF = document.getElementById('CPF').value;
    var telefone = document.getElementById('telefone').value;
    var password = document.getElementById('password').value;
    
    var getLocalKey = localStorage.getItem(email)
    var checkLocalKey = JSON.parse(getLocalKey)

    if(!checkLocalKey){    
        var user = {
            username : username,
            email : email,
            CPF : CPF,
            telefone : telefone,
            password : password
        }
    
        localStorage.setItem(email, JSON.stringify(user));

        window.location.replace("/")
    } else {
        alert('Email já cadastrado')
    }

    
}

function login(){
    var getEmailLogin = document.getElementById('email').value;
    var getPasswordLogin = document.getElementById('password').value;

    var localEmail = localStorage.getItem(getEmailLogin);
    var checkLocalEmail = JSON.parse(localEmail);
    var checkLocalpassword = checkLocalEmail?checkLocalEmail.password : ''

    if(checkLocalEmail){
        if(getPasswordLogin == checkLocalpassword){
            localStorage.setItem('auth', localEmail);
            window.location.replace("/dashboard.html");
        } else {
            alert("Senha incorreta")
        }
    } else {
        alert("Dados de usuário não existe ou não estão correto")
    }
}

function authvalidate(){
    var getAuth = localStorage.getItem('auth');
    if(!getAuth){
        window.location.replace('/')
    } else {
        var contentLocal = localStorage.getItem('post'); 

        document.getElementById('post').innerHTML = contentLocal;
    }
}

function logout(){
    localStorage.removeItem('auth');
    window.location.replace('/');
}


function newPost(){
    var post = document.getElementById('textarea').value;
    var localStorageUser = localStorage.getItem('auth')
    var stringLocalStorageUser = JSON.parse(localStorageUser)
    var userName = stringLocalStorageUser.username
    var agora = new Date()
    var ano = agora.getFullYear()
    var mes = agora.getMonth() + 1;
    var dia =agora.getDate()

    if (dia < 10){
        dia = '0' + dia;
    }
    if (mes < 10){
        mes = '0' + mes;
    }
    var data = dia + '/' + mes + '/' + ano

    var html = document.getElementById('post').innerHTML

    var newPost = '<div class="border"><h3>' + userName +'</h3><p>' + post + '</p><span>' + data +'</span></div>'

    var newHtml = newPost + html 

    document.getElementById('post').innerHTML = newHtml;
    
    localStorage.setItem('post', newHtml);
}