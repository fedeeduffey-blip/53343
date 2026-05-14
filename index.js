import antlr4 from "antlr4";
import fs from "fs";

import ClimaScriptLexer from "./ClimaScriptLexer.js";
import ClimaScriptParser from "./ClimaScriptParser.js";

const input = fs.readFileSync("input.txt", "utf8");

const chars = new antlr4.InputStream(input);

const lexer = new ClimaScriptLexer(chars);

const tokens = new antlr4.CommonTokenStream(lexer);

const parser = new ClimaScriptParser(tokens);

const tree = parser.programa();

console.log("\n=== ANALISIS CORRECTO ===\n");

tokens.fill();

console.log("=== TABLA DE TOKENS ===\n");

tokens.tokens.forEach(token => {
    if (token.type !== antlr4.Token.EOF) {
        const tokenName = ClimaScriptLexer.symbolicNames[token.type];

        console.log(
            `Lexema: ${token.text} | Token: ${tokenName}`
        );
    }
});

console.log("\n=== ARBOL SINTACTICO ===\n");

console.log(
    tree.toStringTree(parser.ruleNames)
);

console.log("\n=== TRADUCCION A JAVASCRIPT ===\n");

const jsCode = `
const miClima = {
    imprimir: function(texto, minutos) {
        setInterval(function() {
            console.log(texto);
        }, minutos * 60000);
    },

    monitorear: function(sensor, minutos) {
        setInterval(function() {
            console.log("Monitoreando " + sensor);
        }, minutos * 60000);
    },

    activar: function(aspecto) {
        console.log("Activando " + aspecto);
    }
};

miClima.monitorear("temperatura", 5);
miClima.imprimir("Frio", 5);
miClima.activar("ventilacion");
`;

console.log(jsCode);
