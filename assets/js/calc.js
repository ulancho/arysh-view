var summCredit = document.getElementById("summCredit");
var output = document.getElementById("summ1");
output.innerHTML = summCredit.value;

var srokCredit = document.getElementById("srokCredit");
var output2 = document.getElementById("summ2");
output2.innerHTML = srokCredit.value;

platezh(summCredit.value,3,srokCredit.value);

//при изменении сумму получаемого кредита
summCredit.oninput = function() {
    output.innerHTML = this.value;
    platezh(this.value,3,srokCredit.value);
}

//при изменении срока получаемого кредита
srokCredit.oninput = function() {
    output2.innerHTML = this.value;
    platezh(summCredit.value,3,this.value);
}

//вычисление сумму возврата
function platezh(summa, stavka, srok) {
    stavka = stavka/100;
    let a = Math.pow(1+stavka,srok);
    let res = summa*stavka*a/(a-1);
    let result =  parseFloat(res.toFixed(0)) * srok;
    document.getElementById('summaVozvrata').innerHTML = result;
    document.getElementById('summaVozvrataInp').value = result;
}

//заказать звонок
function callme(){
    document.getElementById('cssLoader3').style.display = 'block';
    document.getElementById('loaderAn').style.display = 'block';

    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;

    if(name == '' || phone == ''){
       document.getElementById('error').innerHTML = 'Заполните все необходимые данные, пожалуйста';
       return;
    }

    let form = $('#callmeForm').serialize();
    $.ajax({
        method: "POST",
        dataType: 'JSON',
        url: "?index@feedback",
        data:form
    }).done(function (data) {
        if(data.data.res == 11){
            document.getElementById('modal-forms').remove();
            $('#success_feedback').text('Спасибо, Ваше сообщение принято! В ближайшее время мы свяжемся с Вами.');
        }
        else if(data.data.res == 44){
            $('#success_feedback').text('Вы ввели пустые данные');
        }
        else{
            $('#success_feedback').text('Попробуйте чуть позже, мы не можем доставить ваше сообщение');
        }
        $('.preloder-wrap').fadeOut(); // will first fade out the loading animation
        $('.loader').delay(150).fadeOut('slow'); // will fade out the white DIV that covers the website.
    });
}

//отправить заявку
function getCredit(){
    let form = $('#creditApplForm').serialize();
    document.getElementById('cssLoader3').style.display = 'block';
    document.getElementById('loaderAn').style.display = 'block';
    $.ajax({
        method: "POST",
        dataType: 'JSON',
        url: "?index@getCreditWithInf",
        data:form
    }).done(function (data) {
        if(data.data.res == 11){
            document.getElementById('error').remove();
            document.getElementById('succes').classList.add('alert');
            $('#succes').text('Спасибо, Ваше заявка принята! В ближайшее время мы свяжемся с Вами.');
        }
        else if(data.data.res == 44){
            document.getElementById('error').classList.add('alert');
            $('#error').text('Вы ввели пустые данные');
        }
        else if(data.data.res == 55){
            document.getElementById('error').classList.add('alert');
            $('#error').text('Нужно ваше согласия на обработку данных');
        }
        else{
            $('#succes').text('Попробуйте чуть позже, мы не можем доставить ваше сообщение');
        }
        $('.preloder-wrap').fadeOut(); // will first fade out the loading animation
        $('.loader').delay(150).fadeOut('slow'); // will fade out the white DIV that covers the website.
    });
}

//выбор кредитного продукта
function getCreditProduct(){
    let x = document.getElementById("creditProduct").selectedIndex;
    let credit_value = document.getElementsByTagName("option")[x].value;

    //инд кредит
    if(credit_value == 2){
       document.getElementById("summ1").innerHTML = '70000';
       document.getElementById('summCredit').setAttribute("min","70000"); //минимальная сумма
       document.getElementById('summCredit').setAttribute("max","250000"); //минимальная сумма

       document.getElementById('summCredit').value = "70000";
       document.getElementById('minSumm').innerHTML = "70000";
       document.getElementById('maxSumm').innerHTML = "250000";


        document.getElementById('srokCredit').setAttribute("min","1");
        document.getElementById('srokCredit').setAttribute("max","24");

        document.getElementById('srokCredit').value = '1';
        document.getElementById("summ2").innerHTML = '1';

        document.getElementById('minMonth').innerHTML = "1";
        document.getElementById('maxMonth').innerHTML = "24";
        document.getElementById('summaVozvrata').innerHTML = "72100"; //сумма возврата
        document.getElementById('summaVozvrataInp').value = "72100"; //сумма возврата инпут
    }
    //экспресс кредит
    if(credit_value == 1){
       document.getElementById("summ1").innerHTML = '10000';
       document.getElementById('summCredit').setAttribute("min","10000"); //минимальная сумма
       document.getElementById('summCredit').setAttribute("max","70000"); //минимальная сумма

       document.getElementById('summCredit').value = "10000";
       document.getElementById('minSumm').innerHTML = "10000";
       document.getElementById('maxSumm').innerHTML = "70000";


        document.getElementById('srokCredit').setAttribute("min","1");
        document.getElementById('srokCredit').setAttribute("max","12");

        document.getElementById('srokCredit').value = '1';
        document.getElementById("summ2").innerHTML = '1';

        document.getElementById('minMonth').innerHTML = "1";
        document.getElementById('maxMonth').innerHTML = "12";

        document.getElementById('summaVozvrata').innerHTML = "10300"; //сумма возврата
        document.getElementById('summaVozvrataInp').value = "10300"; //сумма возврата инпут
    }
}

//печать
function сallPrint(strid) {
    var prtContent = document.getElementById(strid);
    var WinPrint = window.open('','','left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');
    WinPrint.document.write('');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.write('');
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
}

