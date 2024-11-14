import { IsEmail, IsEnum, IsString } from 'class-validator';
import { LanguageCode } from 'src/commons/enums/language.enum';
import { NationCode } from 'src/commons/enums/nation.enum';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(NationCode)
  nationCode: string;

  @IsEnum(LanguageCode)
  languageCode: string;
}
