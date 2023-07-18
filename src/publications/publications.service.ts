import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';

@Injectable()
export class PublicationsService {
  constructor(private readonly publicationRepository: PublicationsRepository) {}

  async create(createPublicationDto: CreatePublicationDto, userId: string) {
    const publication = await this.findByTitle(createPublicationDto.title);

    if (publication)
      throw new ConflictException('Publication title unavailable');

    await this.publicationRepository.create(createPublicationDto, userId);
  }

  findAll() {
    return `This action returns all publications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publication`;
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  remove(id: number) {
    return `This action removes a #${id} publication`;
  }

  async findByTitle(title: string) {
    return this.publicationRepository.findByTitle(title);
  }
}
