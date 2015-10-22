<?
 $lists = $_POST["data"]; //генерация значения
     
     $f = fopen('data.json', 'w');    //открываем файл
     fwrite($f, $lists);       // записываем в него сгенерированное значение
     fclose($f);
?>