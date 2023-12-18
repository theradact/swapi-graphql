
export interface PaginatedResults<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
}

export type Resource = "films" | "people" | "planets" | "species" | "starships" | "vehicles";
