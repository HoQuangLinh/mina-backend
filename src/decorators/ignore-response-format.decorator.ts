import { SetMetadata } from '@nestjs/common';

export const Ignore_Response_Format = 'IgnoreResponseFormat';
export const IgnoreResponseFormat = () =>
  SetMetadata(Ignore_Response_Format, true);
