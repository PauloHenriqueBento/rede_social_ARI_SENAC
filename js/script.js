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

    var user = {
        username : username,
        email : email,
        CPF : CPF,
        telefone : telefone,
        password : password
    }


    localStorage.setItem(CPF, JSON.stringify(user));
}