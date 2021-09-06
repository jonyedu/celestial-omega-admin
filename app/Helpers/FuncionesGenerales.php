<?php
if (!function_exists('convertImgToBinary')) {
    function convertImgToBinary($data)
    {
        // Extensión de la imagen
        $type = pathinfo($data, PATHINFO_EXTENSION);

        // Cargando la imagen
        $data = file_get_contents($data);

        // Decodificando la imagen en base64
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        return $base64;
    }
}
