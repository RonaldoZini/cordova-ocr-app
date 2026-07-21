import { Injectable } from '@angular/core';
import { IOcrObject } from '../interfaces/ocr-object.interface';

/**
 * A linha digitável normalmente tem 47 ou 48 dígitos (boleto bancário "código de barras"). Ela é dividida assim:
 * 
 * XXXXX.YYYYY ZZZZZ.ZZZZZ DDDDD.DDDDD V XXXXXXXXXXXXXX
 * 
 * XXXXX.YYYYY → primeiro campo + DV
 * ZZZZZ.ZZZZZ → segundo campo + DV
 * DDDDD.DDDDD → terceiro campo + DV
 * V → DV geral
 * XXXXXXXXXXXXXX → valor e fator de vencimento
 * 
 * O digito verificador de cada campo é calculado via mod 10.
 * O dígito verificador geral é calculado via mod 11
 * 
 */
@Injectable({ providedIn: 'root' })
export class BankTicketService {
    constructor() { }

    /**
     * Calcula dígito verificador mod10
     * @param number 
     * @returns DV
     */
    private mod10(number: string) {
        const nums = number.split('').reverse().map(n => parseInt(n));
        let sum = 0;
        for (let i = 0; i < nums.length; i++) {
            let mult = (i % 2 === 0) ? 2 : 1;
            let prod = nums[i] * mult;
            if (prod > 9) prod -= 9;
            sum += prod;
        }
        return (10 - (sum % 10)) % 10;
    }

    /**
     * Valida um campo da linha digitável (ex: 5+5 digito + DV)
     * @param field 
     * @returns boolean
     */
    private isValidField(field: string) {
        const numero = field.slice(0, -1);
        const dv = parseInt(field.slice(-1));
        return this.mod10(numero) === dv;
    }

    /**
     * Valida linha digitavel completa
     * @param digitalLine 
     * @returns boolean
     */
    isValidDigitalLine(digitalLine: string) {
        if (![47, 48].includes(digitalLine.length)) return false;

        // Extrai campos
        const field1 = digitalLine.slice(0, 10); // 9+DV
        const field2 = digitalLine.slice(10, 21); // 10+DV
        const field3 = digitalLine.slice(21, 32); // 10+DV

        return this.isValidField(field1) && this.isValidField(field2) && this.isValidField(field3);
    }

    /**
     * Busca a linha digitavel de um boleto bancário dentro de um arquivo via OCR
     * @param ocrText 
     * @returns linha digitavel
     */
    findOcrAndReturnDigitalLine(ocrText: IOcrObject): string {
        let digitalLine: string = '';

        if (!ocrText?.lines?.linetext) return digitalLine;

        const linesProspecting = ocrText.lines.linetext.filter((line) => line.length >= 47 && line.length <= 70) // Reduz a busca

        linesProspecting.forEach(line => {
            const lineNormalized = this.normalizeOCR(line);
            if (this.isValidDigitalLine(lineNormalized)) {
                digitalLine = this.formatDigitalLne(lineNormalized);
            }
        });

        return digitalLine;
    }

    /**
     * OCR tende a confundir alguns números por letras, como por exemplo "0" por "O", "1" por "I"
     * @param text 
     * @returns texto normalizado
     */
    private normalizeOCR(text: string) {
        return text
            .toUpperCase()
            .replace(/O/g, '0')
            .replace(/[I|l]/g, '1')
            .replace(/B/g, '8')
            .replace(/S/g, '5')
            .replace(/Z/g, '2')
            .replace(/G/g, '6')
            .replace(/Q/g, '0')
            .replace(/[^0-9]/g, '');
    }

    /**
     * Aplica máscara para a linha digitavel
     * @param text 
     * @returns linha digitavel mascarada
     */
    private formatDigitalLne(text: string) {
        try {
            const campo1 = text.substring(0, 5) + '.' + text.substring(5, 10);
            const campo2 = text.substring(10, 15) + '.' + text.substring(15, 21);
            const campo3 = text.substring(21, 26) + '.' + text.substring(26, 32);
            const campo4 = text.substring(32, 33);
            const campo5 = text.substring(33);

            return `${campo1} ${campo2} ${campo3} ${campo4} ${campo5}`;
        } catch (error) {
            return text;
        }
    }
}