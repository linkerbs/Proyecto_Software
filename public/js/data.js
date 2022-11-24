var $th = $('.tableFixHead').find('thead th')
$('.tableFixHead').on('scroll', function () {
    $th.css('transform', 'translateY(' + this.scrollTop + 'px)');
});

$("#checkbox-contribucion-san-benito").change(function () {
    $(".checkbox-contribucion-san-benito-1").prop('checked', false);
    $(".checkbox-contribucion-san-benito-2").prop('checked', false);
    if ($(this).is(':checked')) {
        $(".container-san-benito").removeClass("d-none");
    } else {
        $(".container-san-benito").addClass("d-none");
    }
});

$("#checkbox-enable-special").on("change", function () {
    let option = $(this).is(':checked');
    if (option) {
        $(".frm-service-check-input").attr("disabled", false);
    } else {
        $(".frm-service-check-input").attr("disabled", true);
        let serviceId = $("#select-services").val();
        if (serviceId !== "" && serviceId !== null) {
            getServiceInfo(serviceId);
        }
    }
});

$("#select-services").on("change", function () {
    let serviceId = $(this).val();
    if (serviceId !== "" && serviceId !== null) {
        getServiceInfo(serviceId);
    }
});

const getServiceInfo = async (serviceId) => {
    const checkAseo = $("#checkbox-aseo");
    const checkDisposicionFinal = $("#checkbox-disposicion-final");
    const checkAlumbrado = $("#checkbox-alumbrado");
    const checkContribucionEspecial = $("#checkbox-contribucion-especial");
    const checkSaneamiento = $("#checkbox-saneamiento");
    const checkPredioBaldio = $("#checkbox-impuestos-predio-baldio");
    const checkAreaComun = $("#checkbox-area-comun");
    const checkContribucionSanBenito = $("#checkbox-contribucion-san-benito");
    let response = await fromServer({
        serviceId
    }, "servicios");
    if (response !== null) {
        let {
            data,
            message,
            error
        } = response;
        if (!error) {
            let {
                Id_Servicios_Municipales,
                Tipo_Inmueble,
                Uso_Inmueble,
                Aseo,
                Disposicion_Final,
                Alumbrado,
                Contribucion_Especial,
                Saneamiento,
                Impuestos_Predio_Baldio,
                Area_Comun,
                Contribucion_San_Benito
            } = data;
            // Ahora se colocan los checkfields
            checkAseo.prop('checked', Aseo === "1" ? true : false);
            checkDisposicionFinal.prop('checked', Disposicion_Final === "1" ? true : false);
            checkAlumbrado.prop('checked', Alumbrado === "1" ? true : false);
            checkContribucionEspecial.prop('checked', Contribucion_Especial === "1" ? true : false);
            checkSaneamiento.prop('checked', Saneamiento === "1" ? true : false);
            checkPredioBaldio.prop('checked', Impuestos_Predio_Baldio === "1" ? true : false);
            checkAreaComun.prop('checked', Area_Comun === "1" ? true : false);
            checkContribucionSanBenito.prop('checked', Contribucion_San_Benito === "1" ? true : false);
            checkContribucionSanBenito.trigger("change");
            if (Id_Servicios_Municipales === '16' || Id_Servicios_Municipales === '17') {
                $('.ct-custom-forest').removeClass('d-none');
                $('.label-custom-forest').text(Id_Servicios_Municipales === '16' ? 'ÁREA HABITACIONAL' : 'ÁREA USOS VARIOS');
            } else {
                $('.ct-custom-forest').addClass('d-none');
            }
            if (Id_Servicios_Municipales === '6') {
                $('.ct-custom-predio').removeClass('d-none');
            } else {
                $('.ct-custom-predio').addClass('d-none');
            }
        }
    }
}

$(".btn-calculate").on("click", () => {
    checkSummary();
});

const checkSummary = () => {
    let serviceId = $("#select-services").val();
    if (serviceId !== "" && serviceId !== null) {
        // Se validan los inputs ingresados
        let contribuyente = $("#input-contribuyente").val();
        let areaSegundo = $("#input-area-segundo-nivel").val();
        let direccion = $("#input-direccion").val();
        let interlocutor = $("#input-interlocutor").val();
        let claveCatastral = $("#input-clave-catastral").val();
        let tipoLuminaria = $("#select-luminaria").val();
        let areaSuperficial = $("#input-area-superficial").val();
        let metrosFrente = $("#input-metros-frente").val();
        let metrosFrentedos = $("#input-metros-frente-2").val();
        let zonificacion = $("#select-zonificacion").val();
        let areaTotal = $("#input-area-total").val();
        let areaComun = $("#input-area-comun").val();
        let fechaInicio = $("#input-fecha-inicial").val();
        let fechaFin = $("#input-fecha-final").val();
        let dateStart = moment(fechaInicio, "YYYY-M-DD");
        let dateEnd = moment(fechaFin, "YYYY-M-DD");
        let NPER = 0;
        while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
            NPER++;
            dateStart.add(1, 'month');
        }
        $("#input-NPER").val(NPER);
        if (contribuyente.trim() === "") {
            Swal.fire(
                'Atención',
                'Debe ingresar un contribuyente',
                'warning'
            )
            return null;
        }
        if (direccion.trim() === "") {
            Swal.fire(
                'Atención',
                'Debe ingresar una dirección válida',
                'warning'
            )
            return null;
        }
        if (interlocutor.trim() === "") {
            Swal.fire(
                'Atención',
                'Debe ingresar el valor de interlocutor',
                'warning'
            )
            return null;
        }
        if (claveCatastral.trim() === "") {
            Swal.fire(
                'Atención',
                'Debe ingresar la clave catastral',
                'warning'
            )
            return null;
        }
        // Ahora se obtiene el valor de los checkboxs
        let checkAseo = $("#checkbox-aseo").is(':checked');
        let checkDisposicionFinal = $("#checkbox-disposicion-final").is(':checked');
        let checkAlumbrado = $("#checkbox-alumbrado").is(':checked');
        let checkContribucionEspecial = $("#checkbox-contribucion-especial").is(':checked');
        let checkSaneamiento = $("#checkbox-saneamiento").is(':checked');
        let checkPredioBaldio = $("#checkbox-impuestos-predio-baldio").is(':checked');
        let checkAreaComun = $("#checkbox-area-comun").is(':checked');
        let checkContribucionSanBenito = $("#checkbox-contribucion-san-benito").is(':checked');
        let checkZonaSanBenito = null;
        if (checkContribucionSanBenito) {
            checkZonaSanBenito = $("#checkbox-contribucion-san-benito-1").is(':checked') ? '1' : '2';
        }
        // Se obtiene si es un caso especial
        let special = $("#checkbox-enable-special").is(':checked');
        // Se construye un arreglo con la informacion
        let options = {
            Aseo: checkAseo,
            Disposicion_Final: checkDisposicionFinal,
            Alumbrado: checkAlumbrado,
            Contribucion_Especial: checkContribucionEspecial,
            Saneamiento: checkSaneamiento,
            Impuestos_Predio_Baldio: checkPredioBaldio,
            Area_Comun: checkAreaComun,
            Contribucion_San_Benito: checkContribucionSanBenito,
            Zona_San_Benito: checkZonaSanBenito
        };
        let infoSend = {
            contribuyente,
            tipoLuminaria,
            areaSuperficial,
            areaSegundo,
            metrosFrente,
            metrosFrentedos,
            zonificacion,
            areaTotal,
            areaComun,
            fechaInicio,
            fechaFin,
            direccion,
            interlocutor,
            claveCatastral,
            NPER
        };
        // En caso tenga propiedades de bosque se envia el area que sea de otro uso
        if (serviceId === '16' || serviceId === '17') {
            infoSend.areaBosqueUso = $("#input-area-bosque-uso").val();
        }
        // En caso sea reserva ecologica
        if (serviceId === '6') {
            infoSend.detalleReservaEcologica = $("#select-reserva-ecologica").val();
        }
        // Ahora se genera el arreglo final
        let data = {
            serviceId,
            info: infoSend,
            options,
            special
        };
        getSummary(data);
    } else {
        Swal.fire(
            'Atención',
            'Debe seleccionar un inmueble y uso de inmueble',
            'warning'
        )
    }
};

const getSummary = async (dataServer) => {
    let response = await fromServer(dataServer, "calcular");
    if (response !== null) {
        let {
            data,
            message,
            error
        } = response;
        if (!error) {
            renderTable(data); // Tabla resumen
        }
    }
}

const renderTable = async (data) => {
    let fechaInicio = $("#input-fecha-inicial").val();
    let fechaFin = $("#input-fecha-final").val();
    /* let fechaInicio = '2013-07';
    let fechaFin = '2022-11'; */
    let detailExcel = await renderDetailTable(data, fechaInicio, fechaFin);
    let resumeExcel = await renderGeneralTable(data, fechaInicio, fechaFin);
    genExcel(detailExcel, resumeExcel);
}

const renderDetailTable = async (data, fechaInicio, fechaFin) => {
    let dataExcel = [];
    let currencyType = {
        t: "n",
        z: "$#,##0.00"
    };
    let dateStart = moment(fechaInicio, "YYYY-M-DD");
    let dateEnd = moment(fechaFin, "YYYY-M-DD");
    let NPER = 0;
    const $tableBody = $(".table-detail-body");
    $tableBody.html(''); // Se limpia el contenido
    let saldoTotal = 0; // Saldo total acumulado
    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
        NPER++;
        // En caso sea de la matriz 2014 (Jul 2014 en adelante)
        if (dateStart >= moment('2014-07', "YYYY-M-DD")) {
            if (typeof data.Jul2014 !== 'undefined') {
                let {
                    Jul2014
                } = data;
                let tasaTotal = parseFloat(Jul2014.aseo) + parseFloat(Jul2014.alumbrado) + parseFloat(Jul2014.contribucionEspecial) + parseFloat(Jul2014.disFinal) + parseFloat(Jul2014.areaComun) + parseFloat(Jul2014.contribucionSanBenito);
                saldoTotal += tasaTotal;
                $tableBody.append(`
                    <tr>
                        <th>${dateStart.locale('es').format('MMM YYYY')}</th>
                        <th>$${getLocaleFormat(Jul2014.aseo)}</th>
                        <th>$${getLocaleFormat(Jul2014.alumbrado)}</th>
                        <th>$${getLocaleFormat(Jul2014.contribucionEspecial)}</th>
                        <th>$${getLocaleFormat(Jul2014.disFinal)}</th>
                        <th>$${getLocaleFormat(Jul2014.areaComun)}</th>
                        <th>$${getLocaleFormat(Jul2014.predio)}</th>
                        <th>$${getLocaleFormat(Jul2014.contribucionSanBenito)}</th>
                        <th>$${getLocaleFormat(tasaTotal)}</th>
                        <th>$${getLocaleFormat(saldoTotal)}</th>
                    </tr>
                `);
                dataExcel.push([{
                    v: `${dateStart.locale('es').format('MMM YYYY')}`
                }, {
                    v: `${parseFloat(Jul2014.aseo)}`,
                    ...currencyType
                }, {
                    v: `${parseFloat(Jul2014.alumbrado)}`,
                    ...currencyType
                }, {
                    v: `${parseFloat(Jul2014.contribucionEspecial)}`,
                    ...currencyType
                }, {
                    v: `${parseFloat(Jul2014.disFinal)}`,
                    ...currencyType
                }, {
                    v: `${parseFloat(Jul2014.areaComun)}`,
                    ...currencyType
                }, {
                    v: `${parseFloat(Jul2014.predio)}`,
                    ...currencyType
                }, {
                    v: `${parseFloat(Jul2014.contribucionSanBenito)}`,
                    ...currencyType
                }, {
                    v: `${parseFloat(tasaTotal)}`,
                    ...currencyType
                }, {
                    v: `${parseFloat(saldoTotal)}`,
                    ...currencyType
                }])
            }
        }
        // En caso sea de la matriz 2010 (Oct 2010 a Junio 2014)
        if (dateStart >= moment('2010-10', "YYYY-M-DD") && dateStart <= moment('2014-06', "YYYY-M-DD")) {
            if (typeof data.Oct2010 !== 'undefined') {
                let {
                    Oct2010
                } = data;
                let tasaTotal = parseFloat(Oct2010.aseo) + parseFloat(Oct2010.alumbrado) + parseFloat(Oct2010.contribucionEspecial) + parseFloat(Oct2010.disFinal) + parseFloat(Oct2010.areaComun) + parseFloat(Oct2010.contribucionSanBenito);
                saldoTotal += tasaTotal;
                $tableBody.append(`
                    <tr>
                        <th>${dateStart.locale('es').format('MMM YYYY')}</th>
                        <th>$${getLocaleFormat(Oct2010.aseo)}</th>
                        <th>$${getLocaleFormat(Oct2010.alumbrado)}</th>
                        <th>$${getLocaleFormat(Oct2010.contribucionEspecial)}</th>
                        <th>$${getLocaleFormat(Oct2010.disFinal)}</th>
                        <th>$${getLocaleFormat(Oct2010.areaComun)}</th>
                        <th>$${getLocaleFormat(Oct2010.predio)}</th>
                        <th>$${getLocaleFormat(Oct2010.contribucionSanBenito)}</th>
                        <th>$${getLocaleFormat(tasaTotal)}</th>
                        <th>$${getLocaleFormat(saldoTotal)}</th>
                    </tr>
                `);
            }
        }
        // En caso sea de la matriz 2008 (En 2008 a Septiembre 2010)
        if (dateStart >= moment('2008-01', "YYYY-M-DD") && dateStart <= moment('2010-09', "YYYY-M-DD")) {
            console.log("a");
            if (typeof data.En2008 !== 'undefined') {
                let {
                    En2008
                } = data;
                let tasaTotal = parseFloat(En2008.aseo) + parseFloat(En2008.alumbrado) + parseFloat(En2008.contribucionEspecial) + parseFloat(En2008.disFinal) + parseFloat(En2008.areaComun) + parseFloat(En2008.contribucionSanBenito);
                saldoTotal += tasaTotal;
                $tableBody.append(`
                <tr>
                    <th>${dateStart.locale('es').format('MMM YYYY')}</th>
                    <th>$${getLocaleFormat(En2008.aseo)}</th>
                    <th>$${getLocaleFormat(En2008.alumbrado)}</th>
                    <th>$${getLocaleFormat(En2008.contribucionEspecial)}</th>
                    <th>$${getLocaleFormat(En2008.disFinal)}</th>
                    <th>$${getLocaleFormat(En2008.areaComun)}</th>
                    <th>$${getLocaleFormat(En2008.predio)}</th>
                    <th>$${getLocaleFormat(En2008.contribucionSanBenito)}</th>
                    <th>$${getLocaleFormat(tasaTotal)}</th>
                    <th>$${getLocaleFormat(saldoTotal)}</th>
                </tr>
            `);
            }
        }
        // En caso sea de la matriz 2008 (Junio 2004 a Diciembre 2007)
        if (dateStart >= moment('2004-06', "YYYY-M-DD") && dateStart <= moment('2007-12', "YYYY-M-DD")) {
            console.log("a");
            if (typeof data.En2008 !== 'undefined') {
                let {
                    Jun2004
                } = data;
                let tasaTotal = 0;
                let disFinal = 0;
                let contEspecial = 0;
                // En caso aplique la contribucion especial
                if (dateStart >= moment('2005-06', "YYYY-M-DD")) {
                    tasaTotal = parseFloat(Jun2004.aseo) + parseFloat(Jun2004.alumbrado) + parseFloat(Jun2004.contribucionEspecial) + parseFloat(Jun2004.disFinal) + parseFloat(Jun2004.areaComun) + parseFloat(Jun2004.contribucionSanBenito);
                    disFinal = getLocaleFormat(Jun2004.disFinal);
                    contEspecial = getLocaleFormat(Jun2004.contribucionEspecial);
                } else if (dateStart >= moment('2005-01', "YYYY-M-DD") && dateStart < moment('2005-06', "YYYY-M-DD")) {
                    // En caso ya no aplique la contribucion especial
                    tasaTotal = parseFloat(Jun2004.aseo) + parseFloat(Jun2004.alumbrado) + parseFloat(Jun2004.disFinal) + parseFloat(Jun2004.areaComun) + parseFloat(Jun2004.contribucionSanBenito);
                    disFinal = getLocaleFormat(Jun2004.disFinal);
                } else {
                    // En caso ya no aplique la contribucion especial ni la disposicion final
                    tasaTotal = parseFloat(Jun2004.aseo) + parseFloat(Jun2004.alumbrado) + parseFloat(Jun2004.areaComun) + parseFloat(Jun2004.contribucionSanBenito);
                }
                saldoTotal += tasaTotal;
                $tableBody.append(`
                    <tr>
                        <th>${dateStart.locale('es').format('MMM YYYY')}</th>
                        <th>$${getLocaleFormat(Jun2004.aseo)}</th>
                        <th>$${getLocaleFormat(Jun2004.alumbrado)}</th>
                        <th>$${contEspecial}</th>
                        <th>$${disFinal}</th>
                        <th>$${getLocaleFormat(Jun2004.areaComun)}</th>
                        <th>$${getLocaleFormat(Jun2004.predio)}</th>
                        <th>$${getLocaleFormat(Jun2004.contribucionSanBenito)}</th>
                        <th>$${getLocaleFormat(tasaTotal)}</th>
                        <th>$${getLocaleFormat(saldoTotal)}</th>
                    </tr>
                `);
            }
        }
        dateStart.add(1, 'month');
    }
    let tableBodyParts = {
        aseo: '',
        alumbradoFrente: '',
        contribucionEspecial: '',
        disposicionFinal: '',
        areaComun: '',
        impuestoPredio: '',
        contribucionSanBenito: '',
        totalTasaOrdenanza: '',
    };
    let headerYears = ``;
    return dataExcel;
}

const renderGeneralTable = async (data, fechaInicio, fechaFin) => {
    let currencyType = {
        t: "n",
        z: "$#,##0.00"
    };
    let tableBodyParts = {
        aseo: '',
        alumbradoFrente: '',
        contribucionEspecial: '',
        disposicionFinal: '',
        areaComun: '',
        impuestoPredio: '',
        contribucionSanBenito: '',
        totalTasaOrdenanza: '',
    };
    let headerYears = ``;
    let reportHeaders = [{
        v: "ORDENANZAS"
    }];
    let rowAseo = [{
        v: "ASEO"
    }];
    let rowAlumbrado = [{
        v: "ALUMBRADO FRENTE 1"
    }];
    let rowContribucionEspecial = [{
        v: "CONTRIBUCIÓN ESPECIAL"
    }];
    let rowDisposicionFinal = [{
        v: "DISPOSICIÓN FINAL"
    }];
    let rowAreaComun = [{
        v: "AREA COMUN"
    }];
    let rowImpuestoPredio = [{
        v: "IMPUESTO POR PREDIO"
    }];
    let rowContribucionSanBenito = [{
        v: "CONTRIBUCIÓN SAN BENITO"
    }];
    let rowTasaOrdernanza = [{
        v: "TOTAL TASA POR ORDENANZA"
    }];
    // Se busca la matriz 2004
    if (typeof data.Jun2004 !== 'undefined') {
        let {
            Jun2004
        } = data;
        let tasaTotal = parseFloat(Jun2004.aseo) + parseFloat(Jun2004.alumbrado) + parseFloat(Jun2004.contribucionEspecial) + parseFloat(Jun2004.disFinal) + parseFloat(Jun2004.areaComun) + parseFloat(Jun2004.contribucionSanBenito);
        headerYears += '<th style="width: 150px;">JUNIO 2004 A DIC 2007</th>';
        tableBodyParts.aseo += `<th>$${getLocaleFormat(Jun2004.aseo)}</th>`;
        tableBodyParts.alumbradoFrente += `<th>$${getLocaleFormat(Jun2004.alumbrado)}</th>`;
        tableBodyParts.contribucionEspecial += `<th>$${getLocaleFormat(Jun2004.contribucionEspecial)}</th>`;
        tableBodyParts.disposicionFinal += `<th>$${getLocaleFormat(Jun2004.disFinal)}</th>`;
        tableBodyParts.areaComun += `<th>$${getLocaleFormat(Jun2004.areaComun)}</th>`;
        tableBodyParts.impuestoPredio += `<th>$${getLocaleFormat(Jun2004.predio)}</th>`;
        tableBodyParts.contribucionSanBenito += `<th>$${getLocaleFormat(Jun2004.contribucionSanBenito)}</th>`;
        tableBodyParts.totalTasaOrdenanza += `<th>$${getLocaleFormat(tasaTotal)}</th>`;
        reportHeaders.push({
            v: "JUNIO 2004 A DIC 2007"
        });
        rowAseo.push({
            v: `${parseFloat(Jun2004.aseo)}`,
            ...currencyType
        });
        rowAlumbrado.push({
            v: `${parseFloat(Jun2004.alumbrado)}`,
            ...currencyType
        });
        rowContribucionEspecial.push({
            v: `${parseFloat(Jun2004.contribucionEspecial)}`,
            ...currencyType
        });
        rowDisposicionFinal.push({
            v: `${parseFloat(Jun2004.disFinal)}`,
            ...currencyType
        });
        rowAreaComun.push({
            v: `${parseFloat(Jun2004.areaComun)}`,
            ...currencyType
        });
        rowImpuestoPredio.push({
            v: `${parseFloat(Jun2004.predio)}`,
            ...currencyType
        });
        rowContribucionSanBenito.push({
            v: `${parseFloat(Jun2004.contribucionSanBenito)}`,
            ...currencyType
        });
        rowTasaOrdernanza.push({
            v: `${parseFloat(tasaTotal)}`,
            ...currencyType
        });
    }
    // Se busca la matriz 2008
    if (typeof data.En2008 !== 'undefined') {
        let {
            En2008
        } = data;
        let tasaTotal = parseFloat(En2008.aseo) + parseFloat(En2008.alumbrado) + parseFloat(En2008.contribucionEspecial) + parseFloat(En2008.disFinal) + parseFloat(En2008.areaComun) + parseFloat(En2008.contribucionSanBenito);
        headerYears += '<th style="width: 150px;">ENE 2008 A SEPT 2010</th>';
        tableBodyParts.aseo += `<th>$${getLocaleFormat(En2008.aseo)}</th>`;
        tableBodyParts.alumbradoFrente += `<th>$${getLocaleFormat(En2008.alumbrado)}</th>`;
        tableBodyParts.contribucionEspecial += `<th>$${getLocaleFormat(En2008.contribucionEspecial)}</th>`;
        tableBodyParts.disposicionFinal += `<th>$${getLocaleFormat(En2008.disFinal)}</th>`;
        tableBodyParts.areaComun += `<th>$${getLocaleFormat(En2008.areaComun)}</th>`;
        tableBodyParts.impuestoPredio += `<th>$${getLocaleFormat(En2008.predio)}</th>`;
        tableBodyParts.contribucionSanBenito += `<th>$${getLocaleFormat(En2008.contribucionSanBenito)}</th>`;
        tableBodyParts.totalTasaOrdenanza += `<th>$${getLocaleFormat(tasaTotal)}</th>`;
        reportHeaders.push({
            v: "ENE 2008 A SEPT 2010"
        })
        rowAseo.push({
            v: `${parseFloat(En2008.aseo)}`,
            ...currencyType
        });
        rowAlumbrado.push({
            v: `${parseFloat(En2008.alumbrado)}`,
            ...currencyType
        });
        rowContribucionEspecial.push({
            v: `${parseFloat(En2008.contribucionEspecial)}`,
            ...currencyType
        });
        rowDisposicionFinal.push({
            v: `${parseFloat(En2008.disFinal)}`,
            ...currencyType
        });
        rowAreaComun.push({
            v: `${parseFloat(En2008.areaComun)}`,
            ...currencyType
        });
        rowImpuestoPredio.push({
            v: `${parseFloat(En2008.predio)}`,
            ...currencyType
        });
        rowContribucionSanBenito.push({
            v: `${parseFloat(En2008.contribucionSanBenito)}`,
            ...currencyType
        });
        rowTasaOrdernanza.push({
            v: `${parseFloat(tasaTotal)}`,
            ...currencyType
        });
    }
    // Se busca la matriz 2010
    if (typeof data.Oct2010 !== 'undefined') {
        let {
            Oct2010
        } = data;
        let tasaTotal = parseFloat(Oct2010.aseo) + parseFloat(Oct2010.alumbrado) + parseFloat(Oct2010.contribucionEspecial) + parseFloat(Oct2010.disFinal) + parseFloat(Oct2010.areaComun) + parseFloat(Oct2010.contribucionSanBenito);
        headerYears += '<th style="width: 150px;">OCT 2010 A JUN 2014</th>';
        tableBodyParts.aseo += `<th>$${getLocaleFormat(Oct2010.aseo)}</th>`;
        tableBodyParts.alumbradoFrente += `<th>$${getLocaleFormat(Oct2010.alumbrado)}</th>`;
        tableBodyParts.contribucionEspecial += `<th>$${getLocaleFormat(Oct2010.contribucionEspecial)}</th>`;
        tableBodyParts.disposicionFinal += `<th>$${getLocaleFormat(Oct2010.disFinal)}</th>`;
        tableBodyParts.areaComun += `<th>$${getLocaleFormat(Oct2010.areaComun)}</th>`;
        tableBodyParts.impuestoPredio += `<th>$${getLocaleFormat(Oct2010.predio)}</th>`;
        tableBodyParts.contribucionSanBenito += `<th>$${getLocaleFormat(Oct2010.contribucionSanBenito)}</th>`;
        tableBodyParts.totalTasaOrdenanza += `<th>$${getLocaleFormat(tasaTotal)}</th>`;
        reportHeaders.push({
            v: "OCT 2010 A JUN 2014"
        })
        rowAseo.push({
            v: `${parseFloat(Oct2010.aseo)}`,
            ...currencyType
        });
        rowAlumbrado.push({
            v: `${parseFloat(Oct2010.alumbrado)}`,
            ...currencyType
        });
        rowContribucionEspecial.push({
            v: `${parseFloat(Oct2010.contribucionEspecial)}`,
            ...currencyType
        });
        rowDisposicionFinal.push({
            v: `${parseFloat(Oct2010.disFinal)}`,
            ...currencyType
        });
        rowAreaComun.push({
            v: `${parseFloat(Oct2010.areaComun)}`,
            ...currencyType
        });
        rowImpuestoPredio.push({
            v: `${parseFloat(Oct2010.predio)}`,
            ...currencyType
        });
        rowContribucionSanBenito.push({
            v: `${parseFloat(Oct2010.contribucionSanBenito)}`,
            ...currencyType
        });
        rowTasaOrdernanza.push({
            v: `${parseFloat(tasaTotal)}`,
            ...currencyType
        });
    }
    // Ahora se revisa si existe la matriz 2014
    if (typeof data.Jul2014 !== 'undefined') {
        let {
            Jul2014
        } = data;
        let tasaTotal = parseFloat(Jul2014.aseo) + parseFloat(Jul2014.alumbrado) + parseFloat(Jul2014.contribucionEspecial) + parseFloat(Jul2014.disFinal) + parseFloat(Jul2014.areaComun) + parseFloat(Jul2014.contribucionSanBenito);
        headerYears += '<th style="width: 150px;">JUL 2014</th>';
        tableBodyParts.aseo += `<th>$${getLocaleFormat(Jul2014.aseo)}</th>`;
        tableBodyParts.alumbradoFrente += `<th>$${getLocaleFormat(Jul2014.alumbrado)}</th>`;
        tableBodyParts.contribucionEspecial += `<th>$${getLocaleFormat(Jul2014.contribucionEspecial)}</th>`;
        tableBodyParts.disposicionFinal += `<th>$${getLocaleFormat(Jul2014.disFinal)}</th>`;
        tableBodyParts.areaComun += `<th>$${getLocaleFormat(Jul2014.areaComun)}</th>`;
        tableBodyParts.impuestoPredio += `<th>$${getLocaleFormat(Jul2014.predio)}</th>`;
        tableBodyParts.contribucionSanBenito += `<th>$${getLocaleFormat(Jul2014.contribucionSanBenito)}</th>`;
        tableBodyParts.totalTasaOrdenanza += `<th>$${getLocaleFormat(tasaTotal)}</th>`;
        reportHeaders.push({
            v: "JUL 2014"
        })
        rowAseo.push({
            v: `${parseFloat(Jul2014.aseo)}`,
            ...currencyType
        });
        rowAlumbrado.push({
            v: `${parseFloat(Jul2014.alumbrado)}`,
            ...currencyType
        });
        rowContribucionEspecial.push({
            v: `${parseFloat(Jul2014.contribucionEspecial)}`,
            ...currencyType
        });
        rowDisposicionFinal.push({
            v: `${parseFloat(Jul2014.disFinal)}`,
            ...currencyType
        });
        rowAreaComun.push({
            v: `${parseFloat(Jul2014.areaComun)}`,
            ...currencyType
        });
        rowImpuestoPredio.push({
            v: `${parseFloat(Jul2014.predio)}`,
            ...currencyType
        });
        rowContribucionSanBenito.push({
            v: `${parseFloat(Jul2014.contribucionSanBenito)}`,
            ...currencyType
        });
        rowTasaOrdernanza.push({
            v: `${parseFloat(tasaTotal)}`,
            ...currencyType
        });
    }
    let tableBody = `
        <tr>
            <th>ASEO</th>
            ${tableBodyParts.aseo}
        </tr>
        <tr>
            <th>ALUMBRADO FRENTE</th>
            ${tableBodyParts.alumbradoFrente}
        </tr>
        <tr>
            <th>CONTRIBUCIÓN ESPECIAL</th>
            ${tableBodyParts.contribucionEspecial}
        </tr>
        <tr>
            <th>DISPOSICIÓN FINAL</th>
            ${tableBodyParts.disposicionFinal}
        </tr>
        <tr>
            <th>AREA COMÚN</th>
            ${tableBodyParts.areaComun}
        </tr>
        <tr>
            <th>IMPUESTO POR PREDIO</th>
            ${tableBodyParts.impuestoPredio}
        </tr>
        <tr>
            <th>CONTRIBUCIÓN SAN BENITO</th>
            ${tableBodyParts.contribucionSanBenito}
        </tr>
    `;
    let tableFooter = `
        <tr>
            <th>TOTAL TASA POR ORDENANZA</th>
            ${tableBodyParts.totalTasaOrdenanza}
        </tr>
    `;
    $(".table-result-container").html(`
        <table class="table table-bordered custom-table">
            <thead>
                <tr class="tr-header">
                    <th style="width: 150px;background: #000;color: #FFF;">ORDERNANZAS</th>
                    ${headerYears}
                    <th></th>
                </tr>
                <tr>
                    <th style="background: #003a74;color: #FFF;">SERVICIOS</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${tableBody}
            </tbody>
            <tfoot>
                ${tableFooter}
            </tfoot>
        </table>
    `);
    return [reportHeaders, rowAseo, rowAlumbrado, rowContribucionEspecial, rowDisposicionFinal, rowAreaComun, rowImpuestoPredio, rowContribucionSanBenito, rowTasaOrdernanza];
}

const getLocaleFormat = (number) => {
    return parseFloat(number).toLocaleString('es-SV', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};
