grammar ClimaScript;

programa
    : AUTOMATE IDENTIFICADOR LLAVE_ABRE accion* LLAVE_CIERRA EOF
    ;

accion
    : monitoreo
    | respuesta
    | imprimir
    ;

monitoreo
    : MONITOREAR sensor_clima CADA NUMERO MIN PUNTO_COMA
    ;

respuesta
    : CUANDO sensor_clima SUBE DE NUMERO HACER ACTIVAR aspecto PUNTO_COMA
    ;

imprimir
    : IMPRIMIR TEXTO CADA NUMERO MIN PUNTO_COMA
    ;

sensor_clima
    : TEMPERATURA
    | HUMEDAD
    ;

aspecto
    : VENTILACION
    | RIEGO
    ;

AUTOMATE: 'automate';
MONITOREAR: 'monitorear';
CUANDO: 'cuando';
SUBE: 'sube';
DE: 'de';
HACER: 'hacer';
ACTIVAR: 'activar';
IMPRIMIR: 'imprimir';
CADA: 'cada';
MIN: 'min';

TEMPERATURA: 'temperatura';
HUMEDAD: 'humedad';

VENTILACION: 'ventilacion';
RIEGO: 'riego';

LLAVE_ABRE: '{';
LLAVE_CIERRA: '}';
PUNTO_COMA: ';';

NUMERO: [0-9]+;
TEXTO: '"' (~["\r\n])* '"';
IDENTIFICADOR: [a-zA-Z_][a-zA-Z0-9_]*;

WS: [ \t\r\n]+ -> skip;
