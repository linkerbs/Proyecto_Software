<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Home extends BaseController
{
    public function index()
    {
        //Hay que verificar si tiene el objeto de la sesion
        $session = session();
        $userId = $session->get('Id_Usuario');

        if($userId === null){
            return redirect()->to('login');
        }

        // Conexion DB
        $db = \Config\Database::connect('local');
        // Query
        $builder = $db->table('servicios_municipales sm')
        ->select('sm.Id_Servicios_Municipales, ti.Tipo_Inmueble')
        ->select('ui.Uso_Inmueble, sm.Aseo, sm.Disposicion_Final, sm.Alumbrado, sm.Contribucion_Especial, sm.Saneamiento, sm.Impuestos_Predio_Baldio, sm.Area_Comun, sm.Contribucion_San_Benito')
        ->join('tipo_inmueble ti', 'ti.Id_Tipo = sm.Id_Tipo_Inmueble', 'left')
        ->join('uso_inmueble ui', 'ui.Id_Uso = sm.Id_Uso_Inmueble', 'left');
        // Se obtiene la informacion
        $query = $builder->get();
        $response = $query->getResultArray();
        $global["title"] = "Ordenanzas AMSS";
        $data["site"] = $global;
        $data["services"] = $response;
        return view('home', $data);
    }
}
