// src/leads/dto/get-leads-query.dto.ts
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { LeadStatus } from '../../generated/prisma/client';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetLeadsQueryDto {
  @IsString()
  @IsOptional()
  q?: string;

  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder = SortOrder.DESC;
}
