import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Scheduled a follow-up call for next Tuesday.',
    description: 'The content of the comment (1-500 characters)',
  })
  @IsString()
  @Length(1, 500, { message: 'Коментар має містити від 1 до 500 символів' })
  text!: string;
}
