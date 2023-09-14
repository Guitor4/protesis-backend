import { IsNotEmpty } from "class-validator";

export class UserDeleteDto {
    @IsNotEmpty()
    id: number;
}