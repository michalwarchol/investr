type Response = {
  isValid: boolean;
  message?: string;
};

export const validateFile = (
  file: Express.Multer.File,
  size: number,
  mimetypes: string[],
): Response => {
  if (!file) {
    return {
      isValid: false,
      message: 'Field is required',
    };
  }

  if (file.size > size) {
    return {
      isValid: false,
      message: `File size too large`,
    };
  }

  if (!mimetypes.includes(file.mimetype)) {
    return {
      isValid: false,
      message: 'Wrong type of file',
    };
  }

  return {
    isValid: true,
  };
};
