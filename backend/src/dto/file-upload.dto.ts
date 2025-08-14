import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '要上传的文件',
  })
  file: any;
}

export class FileUploadResponseDto {
  @ApiProperty({ description: '上传后的图片URL' })
  imageUrl: string;
}
