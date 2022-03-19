import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('api/v1')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('notes')
  create(@Body() createNoteDto: CreateNoteDto, @Request() req) {
    console.log('req user: ', req.user);
    return this.notesService.create(createNoteDto, req.user.user_id);
  }

  @Get('notes')
  findAll() {
    return this.notesService.findAll();
  }

  @Get('note/:id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch('note/:id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete('note/:id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
