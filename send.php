<?php
    $name = addcslashes($_POST['name']);
    $email = addcslashes($_POST['email']);
    $phone = addcslashes($_POST['phone']);

    $to = "dudufreelancer3202@gmail.com";
    $subject = "Coleta de dados - Dudu Tech";

    $body = "Nome: ".$name."\n"."Email: ".$email."\n"."Telefone: "$phone;

    $header = "From: test@dudutech.com"."\n"."Reply-to: ".$email."\n"."X=Mailer:PHP/".phpversion();

    if(mail($to, $subject, $body, $header)){
        echo("Email enviado com sucesso!");
    } else{
        echo("Houve um erro ao enviar o Email!!!");
    }

?>