<?
 $lists = $_POST["data"]; //генерация значения
     
     $f = fopen('lists.json', 'w');    //открываем файл
     fwrite($f, $lists);       // записываем в него сгенерированное значение
     fclose($f);
?>