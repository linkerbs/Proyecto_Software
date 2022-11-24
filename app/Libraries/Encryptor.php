<?php

namespace App\Libraries;

class Encryptor{

    public function encrypt($string){
        $ciphering = "AES-128-CTR";
        $ivLength = openssl_cipher_iv_length($ciphering);
        $options = 0;
        $encryptionIv = '1234567891011121';
        $encryptionKey = "ordenanzas_municipales_ss_2023";

        $encryptedPassword = openssl_encrypt($string, $ciphering, $encryptionKey, $options, $encryptionIv);

        return $encryptedPassword;
    }
}