export const platformLimits = {
  LinkedIn: 3000,
  Instagram: 2200,
  X: 280,
  Facebook: 63206,
};

export function validatePost(platform, text, image) {
  const limit = platformLimits[platform];

  // Prevent completely empty posts
  if (!text.trim() && !image) {
    return {
      valid: false,
      message: "Post cannot be empty.",
    };
  }

  // Character limit validation
  if (text.length > limit) {
    return {
      valid: false,
      message: `Exceeded ${platform} limit of ${limit} characters.`,
    };
  }

  return {
    valid: true,
    message: "",
  };
}