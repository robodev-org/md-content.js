export type MdFactoryErrorCode =
  | 'MD_FACTORY_MAX_DOC_BYTES'
  | 'MD_FACTORY_INVALID_OPTIONS'
  | 'MD_FACTORY_RENDER_FAILED'
  | 'MD_FACTORY_METADATA_FAILED';

export class MdFactoryError extends Error {
  readonly code: MdFactoryErrorCode;
  readonly cause?: string;

  constructor(code: MdFactoryErrorCode, message: string, cause?: string) {
    super(message);
    this.name = 'MdFactoryError';
    this.code = code;
    this.cause = cause;
  }
}
