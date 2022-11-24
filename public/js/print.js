const genExcel = (detailExcel, resumeExcel) => {
    // STEP 1: Create a new workbook
    const wb = XLSX.utils.book_new();
    let arrayDetail = printXLSX(detailExcel);
    let wa = XLSX.utils.aoa_to_sheet(arrayDetail);
    var wscols = [{
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 20
    }, {
        wch: 45
    }];
    const merge = [{
        s: {
            r: 0,
            c: 1
        },
        e: {
            r: 0,
            c: 10
        }
    }, {
        s: {
            r: 1,
            c: 1
        },
        e: {
            r: 1,
            c: 10
        }
    }, {
        s: {
            r: 2,
            c: 1
        },
        e: {
            r: 2,
            c: 12
        }
    }, {
        s: {
            r: 3,
            c: 1
        },
        e: {
            r: 3,
            c: 7
        }
    }, {
        s: {
            r: 3,
            c: 0
        },
        e: {
            r: 4,
            c: 0
        }
    }, {
        s: {
            r: 3,
            c: 8
        },
        e: {
            r: 4,
            c: 8
        }
    }, {
        s: {
            r: 3,
            c: 9
        },
        e: {
            r: 4,
            c: 9
        }
    }, {
        s: {
            r: 3,
            c: 10
        },
        e: {
            r: 4,
            c: 10
        }
    }, {
        s: {
            r: 3,
            c: 11
        },
        e: {
            r: 4,
            c: 11
        }
    }, {
        s: {
            r: 3,
            c: 12
        },
        e: {
            r: 4,
            c: 12
        }
    }];
    wa["!merges"] = merge;
    wa['!cols'] = wscols;
    XLSX.utils.book_append_sheet(wb, wa, "Detalle");
    // Ahora se genera el general
    let resumeArray = resumePrintXLSX(...resumeExcel);
    let ws = XLSX.utils.aoa_to_sheet(resumeArray);

    var wscols2 = [{
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 15
    }, {
        wch: 20
    }, {
        wch: 45
    }];
    const merge2 = [{
        s: {
            r: 0,
            c: 1
        },
        e: {
            r: 0,
            c: 3
        }
    }, {
        s: {
            r: 1,
            c: 1
        },
        e: {
            r: 1,
            c: 3
        }
    }, {
        s: {
            r: 0,
            c: 4
        },
        e: {
            r: 0,
            c: 5
        }
    }, {
        s: {
            r: 1,
            c: 4
        },
        e: {
            r: 1,
            c: 5
        }
    }, {
        s: {
            r: 1,
            c: 6
        },
        e: {
            r: 1,
            c: 8
        }
    }, {
        s: {
            r: 0,
            c: 6
        },
        e: {
            r: 0,
            c: 8
        }
    }, {
        s: {
            r: 2,
            c: 4
        },
        e: {
            r: 2,
            c: 5
        }
    }, {
        s: {
            r: 2,
            c: 6
        },
        e: {
            r: 2,
            c: 7
        }
    }, {
        s: {
            r: 4,
            c: 0
        },
        e: {
            r: 5,
            c: 0
        }
    }];
    ws["!merges"] = merge2;
    ws['!cols'] = wscols2;

    XLSX.utils.book_append_sheet(wb, ws, "General");

    // STEP 4: Write Excel file to browser
    XLSX.writeFile(wb, "tasa-municipal.xlsx");
}

const printXLSX = (dataExcel) => {
    let rowStyle = {
        font: {
            //bold: true,
            name: "Century Gothic",
            sz: 8,
            color: {
                rgb: "FFFFFF"
            }
        },
        alignment: {
            wrapText: true,
            horizontal: 'center',
            vertical: 'center'
        },
        fill: {
            fgColor: {
                rgb: "262626"
            }
        },
        border: {
            top: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            right: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            bottom: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            left: {
                style: "thin",
                color: {
                    auto: 1
                }
            }
        }
    }
    let rowBlueStyle = {
        font: {
            //bold: true,
            name: "Century Gothic",
            bold: true,
            sz: 8,
            color: {
                rgb: "FFFFFF"
            }
        },
        alignment: {
            wrapText: true,
            horizontal: 'center',
            vertical: 'center'
        },
        fill: {
            fgColor: {
                rgb: "0F243E"
            }
        },
        border: {
            top: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            right: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            bottom: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            left: {
                style: "thin",
                color: {
                    auto: 1
                }
            }
        }
    }
    let basicInfoRow = {
        t: "s",
        s: {
            ...rowStyle
        }
    }
    let basicBlueInfoRow = {
        t: "s",
        s: {
            ...rowBlueStyle
        }
    }
    let rowHeader = [{
        v: "\nCONTRIBUYENTE\n"
    }, {
        v: `\n${$("#input-contribuyente").val()}\n`
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: "\nINTERLOCUTOR\n"
    }, {
        v: `\n${$("#input-interlocutor").val()}\n`
    }];
    let rowHeader2 = [{
        v: "\nDIRECCIÓN\n"
    }, {
        v: `\n${$("#input-direccion").val()}\n`
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: "\nCLAVE CATASTRAL\n"
    }, {
        v: `\n${$("#input-clave-catastral").val()}\n`
    }];
    let rowHeader3 = [{
        v: ""
    }, {
        v: "REESTRUCTURACIÓN DE SALDOS/ DISOLUCIÓN DE BOLSONES"
    }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    // STEP 2: Create data rows and styles
    let rowHeader4 = [{
        v: "NPER"
    }, {
        v: "TASAS"
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: "TOTAL TASA"
    }, {
        v: "SALDO TOTAL"
    }, {
        v: "FECHA DE ORIGEN SAP"
    }, {
        v: "DIFERENCIA ENTRE SALDOS"
    }, {
        v: "COMENTARIO"
    }];
    let rowHeader5 = [{}, {
        v: "Aseo"
    }, {
        v: "Alumbrado"
    }, {
        v: "Cont. Especial"
    }, {
        v: "Disp. Final"
    }, {
        v: "Área Común"
    }, {
        v: "Impuesto por Predio"
    }, {
        v: "Cont. San Benito"
    }, {
        v: ''
    }, {
        v: ''
    }, {
        v: ''
    }, {
        v: ''
    }];
    for (let i = 0; i < rowHeader.length; i++) {
        rowHeader[i] = {
            ...rowHeader[i],
            ...basicBlueInfoRow
        }
    }
    for (let i = 0; i < rowHeader2.length; i++) {
        rowHeader2[i] = {
            ...rowHeader2[i],
            ...basicBlueInfoRow
        }
    }
    for (let i = 0; i < rowHeader3.length; i++) {
        rowHeader3[i] = {
            ...rowHeader3[i],
            ...basicInfoRow
        }
    }
    for (let i = 0; i < rowHeader4.length; i++) {
        rowHeader4[i] = {
            ...rowHeader4[i],
            ...basicInfoRow
        }
    }
    for (let i = 0; i < rowHeader5.length; i++) {
        rowHeader5[i] = {
            ...rowHeader5[i],
            ...basicInfoRow
        }
    }
    return [rowHeader, rowHeader2, rowHeader3, rowHeader4, rowHeader5, ...dataExcel];
}

const resumePrintXLSX = (rowHeaderTable, rowAseo, rowAlumbrado, rowContribucionEspecial, rowDisposicionFinal, rowAreaComun, rowImpuestoPredio, rowContribucionSanBenito, rowTasaOrdernanza) => {
    let fechaInicio = $("#input-fecha-inicial").val();
    let fechaFin = $("#input-fecha-final").val();
    let dateStart = moment(fechaInicio, "YYYY-M-DD");
    let dateEnd = moment(fechaFin, "YYYY-M-DD");
    let numberType = {
        t: "n"
    };
    // STEP 1: Create a new workbook
    const wb = XLSX.utils.book_new();
    let rowStyle = {
        font: {
            //bold: true,
            name: "Century Gothic",
            sz: 8,
            color: {
                rgb: "FFFFFF"
            }
        },
        alignment: {
            wrapText: true,
            horizontal: 'center',
            vertical: 'center'
        },
        fill: {
            fgColor: {
                rgb: "262626"
            }
        },
        border: {
            top: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            right: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            bottom: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            left: {
                style: "thin",
                color: {
                    auto: 1
                }
            }
        }
    }
    let rowBlueStyle = {
        font: {
            //bold: true,
            name: "Century Gothic",
            bold: true,
            sz: 8,
            color: {
                rgb: "FFFFFF"
            }
        },
        alignment: {
            wrapText: true,
            horizontal: 'center',
            vertical: 'center'
        },
        fill: {
            fgColor: {
                rgb: "0F243E"
            }
        },
        border: {
            top: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            right: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            bottom: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            left: {
                style: "thin",
                color: {
                    auto: 1
                }
            }
        }
    }
    let rowWhiteBoldStyle = {
        font: {
            name: "Century Gothic",
            bold: true,
            sz: 8,
            color: {
                rgb: "000000"
            }
        },
        alignment: {
            wrapText: true,
            horizontal: 'center',
            vertical: 'center'
        },
        fill: {
            fgColor: {
                rgb: "FFFFFF"
            }
        },
        border: {
            top: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            right: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            bottom: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            left: {
                style: "thin",
                color: {
                    auto: 1
                }
            }
        }
    }
    let rowWhiteStyle = {
        font: {
            name: "Century Gothic",
            sz: 8,
            color: {
                rgb: "000000"
            }
        },
        alignment: {
            wrapText: true,
            horizontal: 'center',
            vertical: 'center'
        },
        fill: {
            fgColor: {
                rgb: "FFFFFF"
            }
        },
        border: {
            top: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            right: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            bottom: {
                style: "thin",
                color: {
                    auto: 1
                }
            },
            left: {
                style: "thin",
                color: {
                    auto: 1
                }
            }
        }
    }
    let headerWhiteBoldInfoRow = {
        t: "s",
        s: {
            ...rowWhiteBoldStyle
        }
    }
    let headerWhiteInfoRow = {
        t: "s",
        s: {
            ...rowWhiteStyle
        }
    }
    let basicInfoRow = {
        s: {
            ...rowWhiteStyle
        }
    }
    let basicBlueInfoRow = {
        t: "s",
        s: {
            ...rowBlueStyle
        }
    }
    let rowHeader = [{
        v: "\nCONTRIBUYENTE\n"
    }, {
        v: `\n${$("#input-contribuyente").val()}\n`
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: "\nINTERLOCUTOR\n"
    }, {
        v: ""
    }, {
        v: `\n${$("#input-interlocutor").val()}\n`
    }];
    let rowHeader2 = [{
        v: "\nDIRECCIÓN\n"
    }, {
        v: `\n${$("#input-direccion").val()}\n`
    }, {
        v: ""
    }, {
        v: ""
    }, {
        v: "\nCLAVE CATASTRAL\n"
    }, {
        v: ""
    }, {
        v: `\n${$("#input-clave-catastral").val()}\n`
    }];
    let rowHeader3 = [{
        v: "AREA SUPERFICIAL"
    }, {
        v: "AREA 2DO NIVEL"
    }, {
        v: "TIPO DE INMUEBLE"
    }, {
        v: "USO DE INMUEBLE"
    }, {
        v: "TIPO DE LUMINARIA"
    }, { v: "" }, {
        v: "METROS DE FRENTE"
    }, { v: "" }, {
        v: "ZONIFICACIÓN"
    }];
    let rowHeader4 = [{
        v: "500.985",
        ...numberType
    }, {
        v: "0",
        ...numberType
    }, {
        v: "CARACTERISTICAS DE BOSQUE"
    }, {
        v: "HABITACIONAL"
    }, {
        v: "D"
    }, { v: "A" }, {
        v: "METROS DE FRENTE"
    }, {
        v: "100",
        ...numberType
    }, {
        v: "14",
        ...numberType
    }];
    let rowHeader5 = [{
        v: "PERIODO A TASAR"
    }, {
        v: "FECHA INICIAL"
    }, {
        v: "FECHA FINAL"
    }, {
        v: "USO DE INMUEBLE"
    }, {
        v: "NPER"
    }, {
        v: "AREAS TOTALES"
    }, {
        v: "ÁREA COMÚN"
    }];
    let rowHeader6 = [{ v: "" }, {
        v: `${dateStart.locale('es').format('MMM YYYY')}`
    }, {
        v: `${dateEnd.locale('es').format('MMM YYYY')}`
    }, {
        v: "319"
    }, {
        v: "100",
        ...numberType
    }, {
        v: "0",
        ...numberType
    }, {
        v: "0",
        ...numberType
    }];
    let rowHeaderTableService = [{
        v: "SERVICIOS",
        t: "s",
        s: {
            ...rowBlueStyle
        }
    }];
    // STEP 2: Create data rows and styles
    for (let i = 0; i < rowHeader.length; i++) {
        rowHeader[i] = {
            ...rowHeader[i],
            ...basicBlueInfoRow
        }
    }
    for (let i = 0; i < rowHeader2.length; i++) {
        rowHeader2[i] = {
            ...rowHeader2[i],
            ...basicBlueInfoRow
        }
    }
    for (let i = 0; i < rowHeader2.length; i++) {
        rowHeader2[i] = {
            ...rowHeader2[i],
            ...basicBlueInfoRow
        }
    }
    for (let i = 0; i < rowHeader3.length; i++) {
        rowHeader3[i] = {
            ...rowHeader3[i],
            ...headerWhiteBoldInfoRow
        }
    }
    for (let i = 0; i < rowHeader4.length; i++) {
        rowHeader4[i] = {
            ...rowHeader4[i],
            ...headerWhiteInfoRow
        }
    }
    for (let i = 0; i < rowHeader5.length; i++) {
        rowHeader5[i] = {
            ...rowHeader5[i],
            ...headerWhiteBoldInfoRow
        }
    }
    for (let i = 0; i < rowHeader6.length; i++) {
        rowHeader6[i] = {
            ...rowHeader6[i],
            ...headerWhiteInfoRow
        }
    }
    for (let i = 0; i < rowHeaderTable.length; i++) {
        rowHeaderTable[i] = {
            ...rowHeaderTable[i],
            ...basicBlueInfoRow
        }
    }
    for (let i = 0; i < rowAseo.length; i++) {
        rowAseo[i] = {
            ...rowAseo[i],
            ...basicInfoRow
        }
    }
    for (let i = 0; i < rowAlumbrado.length; i++) {
        rowAlumbrado[i] = {
            ...rowAlumbrado[i],
            ...basicInfoRow
        }
    }
    for (let i = 0; i < rowContribucionEspecial.length; i++) {
        rowContribucionEspecial[i] = {
            ...rowContribucionEspecial[i],
            ...basicInfoRow
        }
    }
    for (let i = 0; i < rowDisposicionFinal.length; i++) {
        rowDisposicionFinal[i] = {
            ...rowDisposicionFinal[i],
            ...basicInfoRow
        }
    }
    for (let i = 0; i < rowAreaComun.length; i++) {
        rowAreaComun[i] = {
            ...rowAreaComun[i],
            ...basicInfoRow
        }
    }
    for (let i = 0; i < rowImpuestoPredio.length; i++) {
        rowImpuestoPredio[i] = {
            ...rowImpuestoPredio[i],
            ...basicInfoRow
        }
    }
    for (let i = 0; i < rowContribucionSanBenito.length; i++) {
        rowContribucionSanBenito[i] = {
            ...rowContribucionSanBenito[i],
            ...basicInfoRow
        }
    }
    for (let i = 0; i < rowTasaOrdernanza.length; i++) {
        rowTasaOrdernanza[i] = {
            ...rowTasaOrdernanza[i],
            ...basicInfoRow
        }
    }
    return [rowHeader, rowHeader2, rowHeader3, rowHeader4, rowHeader5, rowHeader6, [], rowHeaderTable, rowHeaderTableService, rowAseo, rowAlumbrado, rowContribucionEspecial, rowDisposicionFinal, rowAreaComun, rowImpuestoPredio, rowContribucionSanBenito, rowTasaOrdernanza];
}