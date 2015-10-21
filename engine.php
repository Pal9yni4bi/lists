<?

// echo json_encode($arr);
 // $other_mass = json_encode($_POST); //генерация значения
 // $other_mass = json_encode($_POST["checks"]); //генерация значения
 // $other_mass = json_encode($_POST["lists"]); //генерация значения
 $lists = $_POST["lists"]; //генерация значения
     
     $f = fopen('lists.json', 'w');    //открываем файл
     fwrite($f, $lists);       // записываем в него сгенерированное значение
     fclose($f);
	 
	 echo $lists;
?>