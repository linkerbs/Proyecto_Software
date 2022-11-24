<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\IncomingRequest;
use App\Libraries\Encryptor;

class LoginController extends BaseController
{
    public function index()
    {       
        // Se obtiene la informacion
        $global["title"] = "Login - Ordenanzas AMSS";
        $data["site"] = $global;
        return view('login', $data);
    }

    public function logout(){
        $session = session();

        if($session !== null){
            $userData = ['Id_Usuario', 'Nombres', 'Apellidos', 'Usuario', 'Prefijo', 'Tipo_Usuario'];
            $session->remove($userData);
        }
        

        return redirect()->to('login');
    }

    public function getUser(){
        // Conexion DB
        $db = \Config\Database::connect('local');

        // Arreglo de respuesta
        $response = ['data' => null, 'error' => false, 'message' => ''];

        $request = \Config\Services::request();

        $username = $request->getPost('username');
        $password = $request->getPost('password');

        $encryptor = new Encryptor();

        $encryptedPassword = $encryptor->encrypt($password);

        // Query
        $builder = 
        $db->table('usuarios u')
        ->select('u.Id_Usuario, u.Nombres, u.Apellidos, u.Usuario')
        ->select('tu.Prefijo, tu.Tipo_Usuario')
        ->join('tipo_usuarios tu', 'tu.Id_Tipo_Usuario = u.Id_Tipo_Usuario')
        ->where('u.Usuario', $username)
        ->where('u.Clave', $encryptedPassword);
        //Se obtiene el usuario
        $query = $builder->get();
        $result = $query->getRowArray();

        if($result === null){
            return redirect()->to('login');
        }
        else{            
            $session = session();
            $session->set($result);

            return redirect()->to('');
        }
    }
}
