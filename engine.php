<?
 $lists = $_POST["data"]; //��������� ��������
     
     $f = fopen('data.json', 'w');    //��������� ����
     fwrite($f, $lists);       // ���������� � ���� ��������������� ��������
     fclose($f);
?>