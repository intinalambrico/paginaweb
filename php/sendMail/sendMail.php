<?php
class SendMail{

    private $plantilla;

    public $errors = [];
    public function send($to , $subject , $message)
    {
        $headers = "From: info@internetinalambrico.com.co\r\n"; // Cambia esto por el correo del remitente
        $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

        if (!mail($to, $subject, $message, $headers)) {
            $this->errors["error"] = "Error enviando el msm";
        } 
    }

    public function validate()
    {
        if(!empty($this->errors))
        {
            return true;
        }else{

            return false;
        }
    }
}


$errors = [];
// Verificar si se recibieron datos por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los parámetros del POST
    $to = isset($_POST['to']) ? $_POST['to'] : '';
    $subject = isset($_POST['subject']) ? $_POST['subject'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    // Validar los parámetros
    if (filter_var($to, FILTER_VALIDATE_EMAIL) && !empty($subject) && !empty($message)) {
        // Enviar el correo
        $obj = new SendMail();
        $obj->send($to, $subject , $message);
        if($obj->validate())
        {
            echo  json_encode($this->obj->errors);
            http_response_code(400);
        }else{
            $msms = array("message" => "enviado con éxito");
            echo json_encode($msms);
            http_response_code(200);
        }
    } else {
        $errors["error"] = "Por favor, completa todos los campos correctamente.";
        echo json_encode($errors);
        http_response_code(400);
    }
} else {
    
    $errors["error"] = "Metodo no permitido.";
    echo json_encode($errors);
    http_response_code(400);
}


 

?>