<?

// echo json_encode($arr);
 // $other_mass = json_encode($_POST); //��������� ��������
 // $other_mass = json_encode($_POST["checks"]); //��������� ��������
 // $other_mass = json_encode($_POST["lists"]); //��������� ��������
 $lists = $_POST["lists"]; //��������� ��������
     
     $f = fopen('lists.json', 'w');    //��������� ����
     fwrite($f, $lists);       // ���������� � ���� ��������������� ��������
     fclose($f);
	 
	 echo $lists;
?>