<?
 $lists = $_POST["data"]; //��������� ��������
     
     $f = fopen('lists.json', 'w');    //��������� ����
     fwrite($f, $lists);       // ���������� � ���� ��������������� ��������
     fclose($f);
?>