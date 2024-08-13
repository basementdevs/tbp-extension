import { ZodError, z } from "zod";

const raw_env = {
  TWITCH_CLIENT_ID: process.env.PLASMO_PUBLIC_TWITCH_CLIENT_ID,
  CONSUMER_API_URL: process.env.PLASMO_PUBLIC_API_URL,
  CONSUMER_API_VERSION: process.env.PLASMO_PUBLIC_API_VERSION,
  APP_ENVIRONMENT: process.env.PLASMO_PUBLIC_ENVIRONMENT,
  APP_STAGE: process.env.PLASMO_PUBLIC_STAGE,
  APP_PLATFORM_API_URL: process.env.PLASMO_PUBLIC_PLATFORM_API_URL,
};

const envSchema = z.object({
  TWITCH_CLIENT_ID: z
    .string()
    .trim()
    .min(1, "PLASMO_PUBLIC_TWITCH_CLIENT_ID is missing or empty"),
  CONSUMER_API_URL: z
    .string()
    .trim()
    .min(1, "PLASMO_PUBLIC_API_URL is missing or empty"),
  CONSUMER_API_VERSION: z
    .string()
    .trim()
    .min(1, "PLASMO_PUBLIC_API_VERSION is missing or empty"),
  APP_ENVIRONMENT: z
    .string()
    .trim()
    .min(1, "PLASMO_PUBLIC_ENVIRONMENT is missing or empty"),
  APP_STAGE: z
    .string()
    .trim()
    .min(1, "PLASMO_PUBLIC_STAGE is missing or empty"),
  APP_PLATFORM_API_URL: z
    .string()
    .trim()
    .min(1, "PLASMO_PUBLIC_PLATFORM_API_URL is missing or empty"),
});

const mapZodErrorMessages = (zodError: ZodError): string[] => {
  return zodError.errors.map((error) => {
    const path = error.path.length ? error.path.join(".") : "root";
    return `Invalid value at ${path}: ${error.message}`;
  });
};

const env = envSchema.safeParse(raw_env);

if (!env.success) {
  if (env.error instanceof ZodError) {
    const issues = mapZodErrorMessages(env.error);
    console.error(
      "Invalid environment variables:",
      JSON.stringify(issues, null, 2),
    );
  }
  throw new Error("Invalid environment variables");
}

export { env };
