<?php

namespace App\Controllers;

class ApiController extends BaseController
{
    // Api con la carga academica de los estudiantes
    public function api()
    {
        $response = ['data' => null, 'error' => false, 'message' => ''];
        $something = $_POST;
        $this->response->setContentType('text/plain');
        return $this->response->setJSON($response);
    }
}
