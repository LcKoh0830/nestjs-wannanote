import { SetMetadata } from '@nestjs/common';

export const IS_SKIP_JWT = 'isSkipJWT';
export const SkipJWT = () => SetMetadata(IS_SKIP_JWT, true);
