import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(leadId: string, data: CreateCommentDto) {
    const lead = await this.prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) throw new NotFoundException('Лід не знайдено');

    return this.prisma.comment.create({
      data: {
        text: data.text,
        leadId,
      },
    });
  }

  async findAll(leadId: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      throw new NotFoundException(`Лід з ID ${leadId} не знайдено`);
    }

    return this.prisma.comment.findMany({
      where: { leadId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
