<?
 $lists = $_POST["lists"]; //��������� ��������
     
     $f = fopen('lists.json', 'w');    //��������� ����
     fwrite($f, $lists_clear);       // ���������� � ���� ��������������� ��������
     fclose($f);
?>