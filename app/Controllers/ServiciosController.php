<?php

namespace App\Controllers;

use App\Libraries\MatrizJul2014; // Se carga la matriz del año 2014
use App\Libraries\MatrizOct2010;// Se carga la matriz del año 2010
use App\Libraries\MatrizEn2008;// Se carga la matriz del año 2008
use App\Libraries\MatrizJun2004;// Se carga la matriz del año 2008

class ServiciosController extends BaseController
{

   public function getServicios()
   {
      // Arreglo de respuesta
      $response = ['data' => null, 'error' => false, 'message' => ''];
      $serviceId = $_POST["serviceId"];
      // Conexion DB
      $db = \Config\Database::connect('local');
      // Query
      $builder = $db->table('servicios_municipales sm')
         ->select('sm.Id_Servicios_Municipales, ti.Tipo_Inmueble')
         ->select('ui.Uso_Inmueble, sm.Aseo, sm.Disposicion_Final, sm.Alumbrado, sm.Contribucion_Especial, sm.Saneamiento, sm.Impuestos_Predio_Baldio, sm.Area_Comun, sm.Contribucion_San_Benito')
         ->join('tipo_inmueble ti', 'ti.Id_Tipo = sm.Id_Tipo_Inmueble', 'left')
         ->join('uso_inmueble ui', 'ui.Id_Uso = sm.Id_Uso_Inmueble', 'left')
         ->where('sm.Id_Servicios_Municipales', $serviceId);
      // Se obtiene la informacion
      $query = $builder->get();
      $result = $query->getRowArray();
      // Se prepara la respuesta
      $this->response->setContentType('text/plain');
      $response["data"] = $result;
      if ($result === null) {
         $response["error"] = true;
         $response["message"] = 'No hay información para este servicio';
      }
      // Se retorna el JSON
      return $this->response->setJSON($response);
   }

   public function getCalcularTasas()
   {
      $responseData = [];
      $matrizJul2014 = new MatrizJul2014(); // Se carga la libreria del año 2014
      $matrizOct2010 = new MatrizOct2010(); // Se carga la libreria del año 2010 (Oct 2010 a Jun 2014)
      $matrizEn2008 = new MatrizEn2008(); // Se carga la libreria del año 2010 (Oct 2010 a Jun 2014)
      $matrizJun2004 = new MatrizJun2004(); // Se carga la libreria del año 2010 (Oct 2010 a Jun 2014)
      // Arreglo de respuesta
      $response = ['data' => null, 'error' => false, 'message' => ''];
      $info = $_POST;
      // Se prepara la respuesta
      $this->response->setContentType('text/plain');
      $response["data"] = $info;
      if ($info === null) {
         $response["error"] = true;
         $response["message"] = 'La información no se encuentra completa';
      }
      // Ahora se genera el arreglo de las matrices que se utilizaran
      $fechaInicio = strtotime($info["info"]["fechaInicio"]);
      $fechaFin = strtotime($info["info"]["fechaFin"]);
      // Primero se realiza la matriz 2014
      $matriz2014 = $matrizJul2014->calcularMatriz($info);
      $responseData["Jul2014"] = $matriz2014;
      // Ahora se revisa si aplica la matriz Octubre 2010 a Junio 2014
      if($fechaInicio < strtotime('2014-07')){
         $matriz2010 = $matrizOct2010->calcularMatriz($info);
         // Hay que tener cuidado debido a que esta matriz se subdivide
         $responseData["Oct2010"] = $matriz2010;
      }
      // Ahora se revisa si aplica la matriz En 2008 a Septiembre 2010
      if($fechaInicio < strtotime('2010-10')){
         $matriz2008 = $matrizEn2008->calcularMatriz($info);
         // Hay que tener cuidado debido a que esta matriz se subdivide
         $responseData["En2008"] = $matriz2008;
      }
      // Ahora se revisa si aplica la matriz Jun 2004 a Diciembre 2007
      if($fechaInicio < strtotime('2008-01')){
         $matriz2004 = $matrizJun2004->calcularMatriz($info);
         // Hay que tener cuidado debido a que esta matriz se subdivide
         $responseData["Jun2004"] = $matriz2004;
      }
      $response["data"] = $responseData;
      // Se retorna el JSON
      return $this->response->setJSON($response);
   }
}
