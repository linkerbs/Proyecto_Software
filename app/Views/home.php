<?php
echo view('global/header');
echo view('global/navbar');
?>

<div class="container-fluid">
    <h1>Cálculo de tasas municipales</h1>
    <div class="row">
        <div class="col-12">
            <div class="col-12 row m-0">
                <div class="col-12 mb-2">
                    <label for="" class="form-label">CONTRIBUYENTE</label>
                    <input type="text" class="form-control" id="input-contribuyente" aria-describedby="input-contribuyente">
                </div>
                <div class="col-12 mb-2">
                    <label for="" class="form-label">DIRECCIÓN </label>
                    <input type="text" class="form-control" id="input-direccion" aria-describedby="input-direccion">
                </div>
                <div class="col-6 mb-2">
                    <label for="" class="form-label">INTERLOCUTOR</label>
                    <input type="text" class="form-control" id="input-interlocutor" aria-describedby="input-interlocutor">
                </div>
                <div class="col-6 mb-2">
                    <label for="" class="form-label">CLAVE CATASTRAL</label>
                    <input type="text" class="form-control" id="input-clave-catastral" aria-describedby="input-clave-catastral">
                </div>
                <div class="col-12 mb-2">
                    <label for="" class="form-label all-mayus">TIPO DE LUMINARIA</label>
                    <select class="form-select" id="select-luminaria" aria-label="">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                </div>
                <div class="col-12 mb-2">
                    <label for="" class="form-label all-mayus">Inmueble / Uso de inmueble</label>
                    <select class="form-select" id="select-services" aria-label="">
                        <option value="">SELECCIONE UN INMUEBLE Y USO DE INMUEBLE</option>
                        <?php foreach ($services as $service) { ?>
                            <option value="<?php echo $service["Id_Servicios_Municipales"] ?>"><?php echo $service["Tipo_Inmueble"]; ?> <?php echo $service["Tipo_Inmueble"] !== null && $service["Uso_Inmueble"] !== null ? '/' : ''; ?> <?php echo $service["Uso_Inmueble"]; ?> </option>
                        <?php } ?>
                    </select>
                    <div id="" class="form-text all-mayus">El inmueble y uso de inmueble están divididos por una pleca</div>
                </div>
                <div class="col-12 mt-2">
                    <div class="form-check">
                        <input class="form-check-input frm-check-input" type="checkbox" value="" id="checkbox-enable-special">
                        <label class="form-check-label all-mayus" for="checkbox-enable-special">
                            Habilitar caso especial
                        </label>
                    </div>
                </div>
            </div>
            <div class="col-12 container-checkboxs-service p-3">
                <div class="container-bubble all-mayus row m-0">
                    <!-- Aseo -->
                    <div class="col-4 form-check">
                        <input class="form-check-input frm-service-check-input" type="checkbox" value="" id="checkbox-aseo" disabled>
                        <label class="form-check-label" for="checkbox-aseo">
                            Aseo
                        </label>
                    </div>
                    <!-- Disposición final -->
                    <div class="col-4 form-check">
                        <input class="form-check-input frm-service-check-input" type="checkbox" value="" id="checkbox-disposicion-final" disabled>
                        <label class="form-check-label" for="checkbox-disposicion-final">
                            Disposición final
                        </label>
                    </div>
                    <!-- Alumbrado -->
                    <div class="col-4 form-check">
                        <input class="form-check-input frm-service-check-input" type="checkbox" value="" id="checkbox-alumbrado" disabled>
                        <label class="form-check-label" for="checkbox-alumbrado">
                            Alumbrado
                        </label>
                    </div>
                    <!-- Contribucion Especial -->
                    <div class="col-4 form-check">
                        <input class="form-check-input frm-service-check-input" type="checkbox" value="" id="checkbox-contribucion-especial" disabled>
                        <label class="form-check-label" for="checkbox-contribucion-especial">
                            Contribución Especial
                        </label>
                    </div>
                    <!-- Saneamiento -->
                    <div class="col-4 form-check">
                        <input class="form-check-input frm-service-check-input" type="checkbox" value="" id="checkbox-saneamiento" disabled>
                        <label class="form-check-label" for="checkbox-saneamiento">
                            Saneamiento
                        </label>
                    </div>
                    <!-- Impuestos Predio Baldio -->
                    <div class="col-4 form-check">
                        <input class="form-check-input frm-service-check-input" type="checkbox" value="" id="checkbox-impuestos-predio-baldio" disabled>
                        <label class="form-check-label" for="checkbox-impuestos-predio-baldio">
                            Impuesto Predio Baldío
                        </label>
                    </div>
                    <!-- Area Comun -->
                    <div class="col-4 form-check">
                        <input class="form-check-input frm-service-check-input" type="checkbox" value="" id="checkbox-area-comun" disabled>
                        <label class="form-check-label" for="checkbox-area-comun">
                            Área Común
                        </label>
                    </div>
                    <!-- Contribucion San Benito -->
                    <div class="col-4 form-check">
                        <input class="form-check-input frm-service-check-input" type="checkbox" value="" id="checkbox-contribucion-san-benito" disabled>
                        <label class="form-check-label" for="checkbox-contribucion-san-benito">
                            Contribución San Benito
                        </label>
                    </div>
                </div>
                <hr>
                <div class="col-12 row m-0 container-san-benito d-none">
                    <div class="col-4">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="checkbox-zona-san-benito" id="checkbox-contribucion-san-benito-1" checked>
                            <label class="form-check-label all-mayus" for="checkbox-contribucion-san-benito-1">
                                Contribución San Benito (Zona 1)
                            </label>
                        </div>
                    </div>
                    <!-- Contribucion San Benito II -->
                    <div class="col-4">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="checkbox-zona-san-benito" id="checkbox-contribucion-san-benito-2">
                            <label class="form-check-label all-mayus" for="checkbox-contribucion-san-benito-2">
                                Contribución San Benito (Zona 2)
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 row m-0">
                <div class="col-4 mb-2">
                    <label for="" class="form-label">ÁREA SUPERFICIAL</label>
                    <input type="number" class="form-control" id="input-area-superficial" aria-describedby="input-area-superficial">
                </div>
                <div class="col-4 mb-2">
                    <label for="" class="form-label">ÁREA 2.º NIVEL</label>
                    <input type="number" class="form-control" id="input-area-segundo-nivel" aria-describedby="input-area-segundo-nivel">
                </div>
                <div class="col-4 mb-2">
                    <label for="" class="form-label">METROS DE FRENTE</label>
                    <div class="row m-0">
                        <div class="col-6 mb-2 ps-0">
                            <input type="number" class="form-control" id="input-metros-frente" aria-describedby="input-metros-frente">
                        </div>
                        <div class="col-6 mb-2 pe-0">
                            <input type="number" class="form-control" id="input-metros-frente-2" aria-describedby="input-metros-frente-2">
                        </div>
                    </div>
                </div>
                <div class="col-4 mb-2">
                    <label for="" class="form-label">ZONIFICACIÓN</label>
                    <select class="form-select" id="select-zonificacion" aria-label="">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                    </select>
                </div>
                <div class="col-4 mb-2">
                    <label for="" class="form-label">ÁREAS TOTALES</label>
                    <input type="number" class="form-control" id="input-area-total" aria-describedby="input-area-total">
                </div>
                <div class="col-4 mb-2">
                    <label for="" class="form-label">ÁREA COMÚN</label>
                    <input type="number" class="form-control" id="input-area-comun" aria-describedby="input-area-comun">
                </div>
                <div class="col-4 mb-2 ct-custom-forest d-none">
                    <label for="" class="form-label label-custom-forest">ÁREA HABITACIONAL</label>
                    <input type="number" class="form-control" id="input-area-bosque-uso" aria-describedby="input-area-bosque-uso">
                </div>
                <div class="col-4 mb-2 ct-custom-predio d-none">
                    <label for="" class="form-label">RESERVA ECOLOGICA</label>
                    <select class="form-select" id="select-reserva-ecologica" aria-label="">
                        <option value="default">Calcular por m²</option>
                        <option value="bosque">Caracteristicas de bosque</option>
                        <option value="desarrollo">Comunidad en vias de desarrollo</option>
                    </select>
                </div>
                <div class="col-4 mb-2">
                    <label for="" class="form-label">FECHA INICIAL A TASAR</label>
                    <input class="form-control" type="month" id="input-fecha-inicial" aria-describedby="input-fecha-inicial" min="1985-01">
                </div>
                <div class="col-4 mb-2">
                    <label for="" class="form-label">FECHA FINAL A TASAR</label>
                    <input class="form-control" type="month" id="input-fecha-final" aria-describedby="input-fecha-final" min="1985-01">
                </div>
                <div class="col-4 mb-2">
                    <label for="" class="form-label">NPER</label>
                    <input type="number" disabled class="form-control" id="input-NPER" aria-describedby="input-NPER">
                </div>
            </div>
            <div class="col-12 p-3">
                <button type="button" class="btn btn-calculate">Calcular</button>
            </div>
        </div>
    </div>
    <div class="row white-container">
        <div class="col-12">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link" id="nav-table-resume-tab" data-bs-toggle="tab" data-bs-target="#nav-table-resume" type="button" role="tab" aria-controls="nav-table-resume" aria-selected="false">Tabla resumen</button>
                    <button class="nav-link active" id="nav-table-detail-tab" data-bs-toggle="tab" data-bs-target="#nav-table-detail" type="button" role="tab" aria-controls="nav-table-detail" aria-selected="true">Tabla detalle</button>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade" id="nav-table-resume" role="tabpanel" aria-labelledby="nav-table-resume-tab">
                    <div class="table-result-container mt-3">
                    </div>
                </div>
                <div class="tab-pane fade show active" id="nav-table-detail" role="tabpanel" aria-labelledby="nav-table-detail-tab">
                    <div class="table-result-detail-container tableFixHead mt-3">
                        <table class="table table-bordered custom-table">
                            <thead class="background: #000">
                                <tr class="tr-dark-header">
                                    <th style="width: 150px;vertical-align: middle;" rowspan="2">NPER</th>
                                    <th colspan="7">TASAS</th>
                                    <th style="width: 150px;vertical-align: middle;" rowspan="2">TOTAL TASA</th>
                                    <th style="width: 150px;vertical-align: middle;" rowspan="2">SALDO TOTAL</th>
                                    <th style="width: 150px;vertical-align: middle;" rowspan="2">FECHA DE ORIGEN SAP</th>
                                    <th style="width: 150px;vertical-align: middle;" rowspan="2">DIFERENCIA ENTRE SALDOS</th>
                                </tr>
                                <tr class="tr-dark-header">
                                    <th>Aseo</th>
                                    <th>Alumbrado</th>
                                    <th>Cont. Especial</th>
                                    <th>Disp. Final</th>
                                    <th>Área Común</th>
                                    <th>Impuesto por Predio</th>
                                    <th>Cont. San Benito</th>
                                </tr>
                            </thead>
                            <tbody class="table-detail-body">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php echo view('global/footer'); ?>