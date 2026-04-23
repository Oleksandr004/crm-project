import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { LeadStatus } from '../../generated/prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLeadDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the lead' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'Email address of the lead',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: 'Tech Solutions Inc.',
    description: 'Company name',
  })
  @IsString()
  @IsOptional()
  company?: string;

  @ApiPropertyOptional({
    example: 'NEW',
    enum: LeadStatus,
    description: 'Current status of the lead',
  })
  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;

  @ApiPropertyOptional({
    example: 1500,
    description: 'Estimated value of the deal ($)',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  value?: number;

  @ApiPropertyOptional({
    example: 'Interested in a CRM integration.',
    description: 'Additional notes about the lead',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
