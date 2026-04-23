import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { GetLeadsQueryDto } from './dto/get-leads-query.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lead' })
  @ApiResponse({
    status: 201,
    description: 'The lead has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation failed.' })
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a list of leads with pagination, search, and filtering',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a paginated list of leads.',
  })
  findAll(@Query() query: GetLeadsQueryDto) {
    return this.leadsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific lead by ID (includes comments)' })
  @ApiResponse({ status: 200, description: 'Returns the lead details.' })
  @ApiResponse({ status: 404, description: 'Lead not found.' })
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing lead' })
  update(
    @Param('id') id: string,
    @Body() updateLeadDto: Partial<CreateLeadDto>,
  ) {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lead and all associated comments' })
  remove(@Param('id') id: string) {
    return this.leadsService.remove(id);
  }
}
