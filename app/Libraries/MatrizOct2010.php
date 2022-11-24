<?php

namespace App\Libraries;

class MatrizOct2010
{
    public function calcularMatriz($info)
    {
        $area_final = $info["info"]["areaSuperficial"] + $info["info"]["areaSegundo"];
        $metros_alumbrado = $info["info"]["metrosFrente"] + $info["info"]["metrosFrentedos"];
        $tipo_luminaria = $info["info"]["tipoLuminaria"];
        $area_superficial = $info["info"]["areaSuperficial"];
        $area_comun = $info["info"]["areaComun"];
        $san_benito = $info["options"]["Zona_San_Benito"];
        $tipo_zonificacion = $info["info"]["zonificacion"];
        // NOMBRES DE VARIABLES A RETORNAR YA CALCULADAS
        /* 
            ASEO/saneamiento = aseo
            disposicion final =  dis_final
            alumbrado = alumbrado
            contribucion especial = cont_especial
            a_comun = $area_comun 
            impuesto predio = $predio
        */
        // Se colocan en 0 las variables a retornar en un inicio
        $aseo = 0;
        $dis_final = 0;
        $alumbrado = 0;
        $cont_especial = 0;
        $a_comun = 0;
        $cont_benito = 0;
        $predio = 0;
        switch ($info["serviceId"]) {

                //CASO 1 CONSTRUCCION UNIFAMILIAR/HABITACIONAL
            case 1:
                //Calculo de Aseo
                $aseo = $this->getAseoHabitacional($area_final);
                //Disposicion Final
                $dis_final = $this->getDisposicionFinalHabitacional($area_final);

                //Alumbrado
                $alumbrado = $this->getAlumbrado($metros_alumbrado, $tipo_luminaria, $area_superficial);

                //Contribucion Especial
                $cont_especial = $this->getContribucionEspecialHabitacional($area_superficial);

                //CONT SAN BENITO (No cambia segun el año)
                $cont_benito = $this->getSanBenito($area_superficial, $san_benito);

                //CASO 2 CONSTRUCCION UNIFAMILIAR/USOS VARIOS
                break;
            case 2:
                //Aseo
                $aseo = $this->getAseoVarios($area_final);

                //Disposicion Final
                $dis_final = $this->getDisposicionFinalVarios($area_final);

                //Alumbrado
                $alumbrado = $this->getAlumbrado($metros_alumbrado, $tipo_luminaria, $area_superficial);

                //Contribucion Especial
                $cont_especial = $this->getContribucionEspecialVarios($area_superficial);
                if ($cont_especial < 1) {
                    $cont_especial = 1;
                }

                //AREAS COMUNES   
                $a_comun = $this->getAseoAreaComun("varios", $area_comun);

                //CONT SAN BENITO
                $cont_benito = $this->getSanBenito($area_superficial, $san_benito);

                //CASO 3 CONDOMINIO VERTICAL HABITACIONAL
                break;
            case 3:
                $aseo = $this->getAseoHabitacional($area_final);

                $alumbrado = $this->getAlumbradoCondominios("habitacional");

                $cont_especial = $this->getContribucionEspecialTasaFija("condominio vertical");

                $a_comun = $this->getAseoAreaComun("habitacional", $area_comun);

                $dis_final = $this->getDisposicionFinalHabitacional($area_final);

                //CONT SAN BENITO
                $cont_benito = $this->getSanBenito($area_superficial, $san_benito);
                break;
                // CASO 4 CONDOMINIO VERTICAL USOS VARIOS
            case 4:
                //ASEO
                $aseo = $this->getAseoVarios($area_final);

                //Alumbrado
                $alumbrado = $this->getAlumbradoCondominios("varios");

                //Disposicion Final
                $dis_final = $this->getDisposicionFinalVarios($area_final);

                // Area comun
                $a_comun = $this->getAseoAreaComun("varios", $area_comun);

                //Contribucion Especial
                $cont_especial = $this->getContribucionEspecialVarios($area_superficial);

                if ($cont_especial < 5) {
                    $cont_especial = 5;
                }

                //CONT SAN BENITO
                $cont_benito = $this->getSanBenito($area_final, $san_benito);
                break;
                // CASO 5 PREDIO BALDIO/ PREDIO BALDIO URBANO
            case 5:
                $aseo = $this->getAseoPredio($area_final);
                //Disposicion Final
                $dis_final = $this->getDisposicionFinalVarios($area_final);
                $cont_especial = $this->getContribucionEspecialVarios($area_superficial);
                $alumbrado = $this->getAlumbrado($metros_alumbrado, $tipo_luminaria, $area_superficial);
                $predio = $this->getImpuestoPorPredio($tipo_zonificacion, $metros_alumbrado);
                // CASO 6 PREDIO BALDIO/ PREDIO BALDIO EN RESERVA ECOLOGICA
            case 6:
                // Caracteristica de bosque o comunidad en desarrollo
                if (isset($info["info"]["detalleReservaEcologica"])) {
                    //Disposicion Final
                    $dis_final = $this->getDisposicionFinalReservaEcologica($area_final, $info["info"]["detalleReservaEcologica"]);
                } else{
                    //Disposicion Final
                    $dis_final = $this->getDisposicionFinalReservaEcologica($area_final);
                }
                //Alumbrado
                $alumbrado = $this->getAlumbrado($metros_alumbrado, $tipo_luminaria, $area_superficial);
                $cont_especial = $this->getContribucionEspecialTasaFija("reserva");
                $aseo = $this->getAseoPredio($area_final);
                $predio = $this->getImpuestoPorPredio($tipo_zonificacion, $metros_alumbrado);

                break;
                //CASO 7 CONSTRUCCION UNIFAMILIAR/DESOCUPADO
            case 7:
                //Desocupado
                $aseo = $this->getAseoDesocupado($area_final);

                $dis_final = $this->getDisposicionFinalVarios($area_final);
                //ALUMBRADO
                $alumbrado = $this->getAlumbrado($metros_alumbrado, $tipo_luminaria, $area_superficial);

                $cont_especial = $this->getContribucionEspecialVarios($area_superficial);

                break;
                //CONDOMIONIO VERTICAL / DESOCUPADO
            case 8:
                $aseo = $this->getAseoDesocupado($area_final);
                $dis_final = $this->getDisposicionFinalVarios($area_final);
                $cont_especial = $this->getContribucionEspecialVarios($area_superficial);
                $alumbrado = $this->getAlumbradoCondominios("varios");
                $a_comun = $this->getAseoAreaComun("varios", $area_comun);

                break;
                // CONSTRUCCION UNIFAMILIAR/ DESHABITADO
            case 9:
                $aseo = $this->getAseoDeshabitado($area_final);
                $dis_final = $this->getDisposicionFinalHabitacional($area_final);
                $cont_especial = $this->getContribucionEspecialHabitacional($area_superficial);
                $alumbrado = $this->getAlumbrado($metros_alumbrado, $tipo_luminaria, $area_superficial);

                break;

                //CONDOMINIO VERTICAL DESHABITADO
            case 10:
                $aseo = $this->getAseoDeshabitado($area_final);
                $dis_final = $this->getDisposicionFinalHabitacional($area_final);
                $cont_especial = $this->getContribucionEspecialHabitacional($area_superficial);
                $alumbrado = $this->getAlumbradoCondominios("habitacional");
                $a_comun = $this->getAseoAreaComun("habitacional", $area_comun);

                break;
                //COMUNIDAD / HABITACIONAL
            case 11:
                $aseo = $this->getAseoComunidad();
                $dis_final = $this->getDisposicionFinalComunidad();
                $alumbrado = $this->getAlumbradoComunidad();
                $cont_especial = $this->getContribucionEspecialTasaFija("comunidad");

                break;
                //CASO 12 CONDOMINIO VERTICAL / ESTACIONAMIENTO
            case 12:
                $cont_especial = 40;

                break;

            case 13:
                // CONDOMINIO VERTICAL / BODEGAS
                $aseo = $this->getAseoVarios($area_final);
                $dis_final = $this->getDisposicionFinalVarios($area_final);
                $cont_especial = $this->getContribucionEspecialVarios($area_superficial);

                break;
                // CONDOMINIO HORIZONTAL // HABITACIONAL
            case 14:
                $aseo = $this->getAseoHabitacional($area_final);
                $dis_final = $this->getDisposicionFinalHabitacional($area_final);
                $alumbrado = $this->getAlumbradoCondominios("habitacional");
                $cont_especial = $this->getContribucionEspecialHabitacional($area_superficial);
                $a_comun = $this->getAseoAreaComun("habitacional", $area_comun);
                //CONT SAN BENITO
                $cont_benito = $this->getSanBenito($area_superficial, $san_benito);

                break;
                // CONDOMINIO HORIZONTAL/ USOS VARIOS
            case 15:
                $aseo = $this->getAseoVarios($area_final);
                $dis_final = $this->getDisposicionFinalVarios($area_final);
                $alumbrado = $this->getAlumbradoCondominios("varios");
                $cont_especial = $this->getContribucionEspecialVarios($area_superficial);
                $a_comun = $this->getAseoAreaComun("varios", $area_comun);
                //CONT SAN BENITO
                $cont_benito = $this->getSanBenito($area_final, $san_benito);
                break;
                // CASO 16 CON CARACTERISTICAS DE BOSQUE / HABITACIONAL
            case 16:
                // En este caso se obtiene el area de usos varios
                $area_usos = floatval($info["info"]["areaBosqueUso"]);
                // Se resta al area total el area de usos varios para obtener la zona boscosa
                $area_bosque = $area_final - $area_usos;

                $saneamiento_bosque = $this->getAseoBosque($area_bosque); // Se calcula el aseo como uso habitacional
                $saneamiento_usos = $this->getAseoHabitacional($area_usos); // Se calcula el aseo como uso habitacional

                $aseo = $saneamiento_bosque + $saneamiento_usos;

                $dis_final = $this->getDisposicionFinalHabitacional($area_final);
                $alumbrado = $this->getAlumbrado($metros_alumbrado, $tipo_luminaria, $area_superficial);
                $cont_especial = $this->getContribucionEspecialHabitacional($area_superficial);

                break;
                // CASO 17 CON CARACTERISITCAS DE BOSQUE / USOS VARIOS
            case 17:

                // En este caso se obtiene el area de usos varios
                $area_usos = floatval($info["info"]["areaBosqueUso"]);
                // Se resta al area total el area de usos varios para obtener la zona boscosa
                $area_bosque = $area_final - $area_usos;

                $saneamiento_bosque = $this->getAseoBosque($area_bosque); // Se calcula el aseo como uso habitacional
                $saneamiento_usos = $this->getAseoVarios($area_usos); // Se calcula el aseo como usos varios

                $aseo = $saneamiento_bosque + $saneamiento_usos;

                $dis_final = $this->getDisposicionFinalVarios($area_final);
                $alumbrado = $this->getAlumbrado($metros_alumbrado, $tipo_luminaria, $area_superficial);
                //$alumbrado = 11.13;
                $cont_especial = $this->getContribucionEspecialVarios($area_superficial);
                break;
                // CASO 18 BOSCOSO
            case 18:
                $dis_final = $this->getDisposicionFinalReservaEcologica($area_final, "bosque");
                $alumbrado = $this->getAlumbrado($metros_alumbrado, $tipo_luminaria, $area_superficial);
                $cont_especial = $this->getContribucionEspecialTasaFija("bosque");
                $saneamiento_bosque = $this->getAseoBosque($area_final); // Se calcula el aseo como uso habitacional
                $aseo = $saneamiento_bosque;
                break;
                // CASC 19 CON CARACTERISITCAS DE BOSQUE
            case 19:
                $saneamiento_bosque = $this->getAseoBosque($area_final); // Se calcula el aseo como uso habitacional
                $aseo = $saneamiento_bosque;
                $dis_final = $this->getDisposicionFinalReservaEcologica($area_final, "bosque");
                $cont_especial = $this->getContribucionEspecialTasaFija("bosque");
                $alumbrado = $this->getAlumbrado($metros_alumbrado, $tipo_luminaria, $area_superficial);

                break;

                // ABANDONADO
            case 20:
                // Pendiente preguntar si pagan impuesto por predio
                $aseo = 35;
                $dis_final = $this->getDisposicionFinalVarios($area_final);
                $cont_especial = $this->getContribucionEspecialVarios($area_superficial);
                $alumbrado = $this->getAlumbrado($metros_alumbrado, $tipo_luminaria, $area_superficial);
        }
        return [
            "aseo" => $aseo,
            "disFinal" => $dis_final,
            "alumbrado" => $alumbrado,
            "contribucionEspecial" => $cont_especial,
            "areaComun" => $a_comun,
            "predio" => $predio,
            "contribucionSanBenito" => $cont_benito
        ];
    }

    public function getUsos()
    {
        $db = \Config\Database::connect('local');
        $query = $db->query('SELECT Servicios_Municipales.Id_Servicios_Municipales, Tipo_Inmueble.Tipo_Inmueble, Uso_Inmueble.Uso_Inmueble,Servicios_Municipales.Aseo, Servicios_Municipales.Disposicion_Final,Servicios_Municipales.Alumbrado,Servicios_Municipales.Contribucion_Especial, Servicios_Municipales.Saneamiento, Servicios_Municipales.Impuestos_Predio_Baldio, Servicios_Municipales.Area_Comun, Servicios_Municipales.Contribucion_San_Benito FROM Servicios_Municipales, Tipo_Inmueble, Uso_Inmueble WHERE Servicios_Municipales.Id_Tipo_Inmueble = Tipo_Inmueble.Id_Tipo AND Servicios_Municipales.Id_Uso_Inmueble = Uso_Inmueble.Id_Uso');
        $response = $query->getResultArray();
        $this->response->setContentType('text/plain');
        return $this->response->setJSON($response);
    }

    public function getAlumbrado($metros, $tipo_luminaria, $area_superficial)
    {
        if ($area_superficial < 70) {
            if ($tipo_luminaria == "A") {
                $alumbrado = $metros * 0.2857;
            } else if ($tipo_luminaria == "B") {
                $alumbrado = $metros * 0.2286;
            } else if ($tipo_luminaria == "C") {
                $alumbrado = $metros * 0.1570;
            } else {
                $alumbrado = $metros * 0.1429;
            }
        } else if ($area_superficial >= 70 && $area_superficial < 200) {
            if ($tipo_luminaria == "A") {
                $alumbrado = $metros * 0.4000;
            } else if ($tipo_luminaria == "B") {
                $alumbrado = $metros * 0.3200;
            } else if ($tipo_luminaria == "C") {
                $alumbrado = $metros * 0.2199;
            } else {
                $alumbrado = $metros * 0.2001;
            }
        } else if ($area_superficial >= 200 && $area_superficial < 500) {
            if ($tipo_luminaria == "A") {
                $alumbrado = $metros * 0.7021;
            } else if ($tipo_luminaria == "B") {
                $alumbrado = $metros * 0.4920;
            } else if ($tipo_luminaria == "C") {
                $alumbrado = $metros * 0.2920;
            } else {
                $alumbrado = $metros * 0.2381;
            }
        } else if ($area_superficial >= 500 && $area_superficial < 1000) {
            if ($tipo_luminaria == "A") {
                $alumbrado = $metros * 1.0060;
            } else if ($tipo_luminaria == "B") {
                $alumbrado = $metros * 0.6640;
            } else if ($tipo_luminaria == "C") {
                $alumbrado = $metros * 0.3620;
            } else {
                $alumbrado = $metros * 0.2757;
            }
        } else {
            if ($tipo_luminaria == "A") {
                $alumbrado = $metros * 1.6101;
            } else if ($tipo_luminaria == "B") {
                $alumbrado = $metros * 1.0060;
            } else if ($tipo_luminaria == "C") {
                $alumbrado = $metros * 0.5000;
            } else {
                $alumbrado = $metros * 0.3520;
            }
        }
        return $alumbrado;
    }

    public function getAlumbradoComunidad()
    {
        return 0.35;
    }

    public function getAlumbradoCondominios($tipo)
    {
        $alumbrado = 0;
        if ($tipo === "habitacional") {
            $alumbrado = 2.97;
        } else {
            // Usos varios
            $alumbrado = 7.42;
        }
        return $alumbrado;
    }

    public function getDisposicionFinalVarios($area_disfinal)
    {
        $disposicion_final = $area_disfinal * 0.0280;
        if ($disposicion_final < 5) {
            $disposicion_final = 5;
        }

        return $disposicion_final;
    }

    public function getDisposicionFinalHabitacional($area_disfinal)
    {
        if ($area_disfinal < 70) {
            $disposicion_final = $area_disfinal * 0.06400;
        } else if ($area_disfinal >= 70 && $area_disfinal < 200) {
            $disposicion_final = $area_disfinal * 0.0126;
        } else if ($area_disfinal >= 200 && $area_disfinal < 500) {
            $disposicion_final = $area_disfinal * 0.0133;
        } else if ($area_disfinal >= 500 && $area_disfinal <= 1000) {
            $disposicion_final = $area_disfinal * 0.0140;
        } else {
            $disposicion_final = 53.76;
        }
        if ($disposicion_final < 0.64) {
            $disposicion_final = 0.64;
        } else if ($disposicion_final > 53.76) {
            $disposicion_final = 53.76;
        }
        return $disposicion_final;
    }

    public function getDisposicionFinalReservaEcologica($area_final, $detalle = null)
    {
        $dis_final = 0;
        if ($area_final <= 500) {
            $dis_final = 1.4;
        } else if ($area_final > 500 and $area_final <= 1000) {
            $dis_final =  2.8;
        } else if ($area_final > 1000 and $area_final <= 10000) {
            $dis_final = 10.50;
        } else {
            $dis_final = 14;
        }
        // Caracteristica de bosque o comunidad en desarrollo
        if ($detalle !== null) {
            if ($detalle === "bosque") {
                $dis_final = 2.80;
            }
            if ($detalle === "desarrollo") {
                $dis_final = 0.57;
            }
        }
        return $dis_final;
    }

    public function getDisposicionFinalComunidad()
    {
        return 0.57;
    }

    public function getContribucionEspecialVarios($area_cont)
    {
        if ($area_cont <= 200) {
            $contribucion_especial = $area_cont * 0.01;
        } else if ($area_cont > 200 && $area_cont <= 500) {
            $contribucion_especial = $area_cont * 0.01083;
        } else if ($area_cont > 500 && $area_cont <= 1000) {
            $contribucion_especial = $area_cont * 0.01167;
        } else if ($area_cont > 1000 && $area_cont <= 10000) {
            $contribucion_especial = $area_cont * 0.0125;
        } else {
            $contribucion_especial = 200;
        }
        if ($contribucion_especial < 1) {
            $contribucion_especial = 1;
        }
        if ($contribucion_especial > 200) {
            $contribucion_especial = 200;
        }
        return $contribucion_especial;
    }

    public function getContribucionEspecialHabitacional($area_cont)
    {
        if ($area_cont <= 70) {
            $contribucion_especial = 0.4;
        } else if ($area_cont > 70 && $area_cont < 200) {
            $contribucion_especial = $area_cont * 0.0067;
        } else if ($area_cont >= 200 && $area_cont < 300) {
            $contribucion_especial = $area_cont * 0.0075;
        } else if ($area_cont >= 300 && $area_cont < 500) {
            $contribucion_especial = $area_cont * 0.0078;
        } else if ($area_cont >= 500 && $area_cont < 1000) {
            $contribucion_especial = $area_cont * 0.0117;
        } else if ($area_cont >= 1000 && $area_cont <= 3000) {
            $contribucion_especial = $area_cont * 0.0133;
        } else {
            $contribucion_especial = 40.00;
        }
        if ($contribucion_especial < 0.40) {
            $contribucion_especial = 0.40;
        }
        if ($contribucion_especial > 40) {
            $contribucion_especial = 40;
        }
        return $contribucion_especial;
    }

    public function getContribucionEspecialTasaFija($tipo)
    {
        $contribucion_especial = 0;
        if ($tipo === "reserva") {
            // Reserva ecologica
            $contribucion_especial = 2;
        } else if ($tipo === "bosque") {
            // Con caracteristicas de bosque
            $contribucion_especial = 1;
        } else if ($tipo === "comunidad") {
            // Comunidad
            $contribucion_especial = 0.40;
        } else if ($tipo === "condominio vertical") {
            // Condominio vertical
            $contribucion_especial = 0.70;
        } else {
            // Condominio vertical int social
            $contribucion_especial = 0.40;
        }
        return $contribucion_especial;
    }

    public function getAseoHabitacional($area_fin)
    {
        if ($area_fin < 70) {
            $aseo = $area_fin * 0.0215;
        } else if ($area_fin >= 70 && $area_fin < 200) {
            $aseo = $area_fin * 0.0301;
        } else if ($area_fin >= 200 && $area_fin < 500) {
            $aseo = $area_fin * 0.0314;
        } else if ($area_fin >= 500 && $area_fin <= 1000) {
            $aseo = $area_fin * 0.0328;
        } else {
            $aseo = $area_fin * 0.0357;
        }
        return $aseo;
    }

    public function getAseoVarios($area_sup)
    {
        if ($area_sup < 70) {
            $aseo = $area_sup * 0.0611;
        } else if ($area_sup >= 70 && $area_sup < 200) {
            $aseo = $area_sup * 0.0855;
        } else if ($area_sup >= 200 && $area_sup < 500) {
            $aseo = $area_sup * 0.0855;
        } else if ($area_sup >= 500 && $area_sup <= 1000) {
            $aseo = $area_sup * 0.0855;
        } else {
            $aseo = $area_sup * 0.0893;
        }

        return $aseo;
    }

    public function getAseoAreaComun($tipo, $area_comun)
    {
        $aseo = 0;
        if ($tipo === "habitacional") {
            $aseo = $area_comun * 0.0357;
        } else {
            // Usos varios
            $aseo = $area_comun * 0.0889;
        }
        return $aseo;
    }

    public function getAseoPredio($area_final)
    {
        return $area_final * 0.0505;
    }

    public function getAseoDesocupado($area_final)
    {
        return $area_final * 0.0134;
    }

    public function getAseoDeshabitado($area_final)
    {
        return $area_final * 0.0056;
    }

    public function getAseoComunidad()
    {
        return 1.14;
    }

    public function getAseoBosque($area_bosque)
    {
        return $area_bosque * 0.0001;
    }


    public function getSanBenito($area_superficial, $tipo_area)
    {
        if ($tipo_area == 1) {
            $cont_sanbenito = $area_superficial * 0.05;
        } else if ($tipo_area == 2) {
            $cont_sanbenito = $area_superficial * 0.01;
        } else {
            $cont_sanbenito = 0;
        }
        return $cont_sanbenito;
    }

    public function getImpuestoPorPredio($zonificacion, $metros_frente)
    {
        $impuestoPredio = 0;
        $tasaZona1 = 0.5714;
        $tasaZona2 = 0.5714;
        $tasaZona3 = 0.3429;
        $tasaZona4 = 0.3429;
        $tasaZona5 = 0.1143;
        $tasaZona6 = 0.1143;
        $tasaZona7 = 0.1143;
        $tasaZona8 = 0.2286;
        $tasaZona9 = 0.2286;
        $tasaZona10 = 0.3429;
        $tasaZona11 = 0.1143;
        $tasaZona12 = 0.1143;
        $tasaZona13 = 0.1143;
        $tasaZona14 = 0.3429;

        switch ($zonificacion) {
            case '1':
                $impuestoPredio = $metros_frente * $tasaZona1;
                break;
            case '2':
                $impuestoPredio = $metros_frente * $tasaZona2;
                break;
            case '3':
                $impuestoPredio = $metros_frente * $tasaZona3;
                break;
            case '4':
                $impuestoPredio = $metros_frente * $tasaZona4;
                break;
            case '5':
                $impuestoPredio = $metros_frente * $tasaZona5;
                break;
            case '6':
                $impuestoPredio = $metros_frente * $tasaZona6;
                break;
            case '7':
                $impuestoPredio = $metros_frente * $tasaZona7;
                break;
            case '8':
                $impuestoPredio = $metros_frente * $tasaZona8;
                break;
            case '9':
                $impuestoPredio = $metros_frente * $tasaZona9;
                break;
            case '10':
                $impuestoPredio = $metros_frente * $tasaZona10;
                break;
            case '11':
                $impuestoPredio = $metros_frente * $tasaZona11;
                break;
            case '12':
                $impuestoPredio = $metros_frente * $tasaZona12;
                break;
            case '13':
                $impuestoPredio = $metros_frente * $tasaZona13;
                break;
            case '14':
                $impuestoPredio = $metros_frente * $tasaZona14;
                break;
            default:
                $impuestoPredio = 0;
                break;
        }
        return $impuestoPredio;
    }
}
