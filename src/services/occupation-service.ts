import { env } from "~config/env";
import type { Occupation } from "~types/types";

export async function getOccupations(): Promise<Occupation[]> {
  const response = await fetch(`${env.data.APP_PLATFORM_API_URL}/occupations`);
  if (!response.ok) {
    return [];
  }
  return (await response.json()) as Occupation[];
}
