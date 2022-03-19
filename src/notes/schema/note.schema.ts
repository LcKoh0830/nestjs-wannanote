import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema({ versionKey: false })
export class Note {
  @Prop()
  userId: string;

  @Prop()
  id: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
