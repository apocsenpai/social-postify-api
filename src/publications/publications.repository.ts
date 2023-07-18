import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePublicationDto, userId: string) {
    await this.prisma.publication.create({
      data: { ...data, userId, dateToPublish: new Date(data.dateToPublish) },
    });
  }

  async findByTitle(title: string) {
    return this.prisma.publication.findUnique({ where: { title } });
  }

  async findAllByUserId(userId: string) {
    return this.prisma.publication.findMany({ where: { userId } });
  }
}
