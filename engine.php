<?
 $lists = $_POST["lists"]; //генерация значения
     
     $f = fopen('lists.json', 'w');    //открываем файл
     fwrite($f, $lists_clear);       // записываем в него сгенерированное значение
     fclose($f);
?>