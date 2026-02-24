
import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5, // Only 5 login attempts per 15 min
  message: "Too many login attempts. Try again later."
});
