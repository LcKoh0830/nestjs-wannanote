import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryService, CloudinaryService],
  exports: [CloudinaryService, CloudinaryService],
})
export class CloudinaryModule {}
