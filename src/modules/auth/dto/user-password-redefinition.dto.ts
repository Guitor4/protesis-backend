import { IsNotEmpty, IsNumber, Min, MinLength } from "class-validator";
/**
 * Pede um id numérico, uma senha de no mínimo 6 dígitos e um token para validação
 */
export class UserPasswordRedefinitionDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    token: string;
}