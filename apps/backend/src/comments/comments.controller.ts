import { Controller, Post, Get, Body, Param } from '@nestjs/common'; // Добавили Get
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comments')
@Controller('leads/:leadId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new comment to a specific lead' })
  @ApiParam({ name: 'leadId', type: String })
  @ApiResponse({ status: 201, description: 'Comment created' })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  create(
    @Param('leadId') leadId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(leadId, createCommentDto);
  }

  // --- НОВЫЙ МЕТОД ---
  @Get()
  @ApiOperation({ summary: 'Get all comments for a specific lead' })
  @ApiParam({
    name: 'leadId',
    description: 'The unique identifier of the lead',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of comments.',
  })
  @ApiResponse({
    status: 404,
    description: 'Lead not found.',
  })
  findAll(@Param('leadId') leadId: string) {
    return this.commentsService.findAll(leadId);
  }
}
