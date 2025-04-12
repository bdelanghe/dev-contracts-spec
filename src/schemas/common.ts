import { z } from "zod";

/**
 * Represents a reference to a resource, which can be a URL or a local file path.
 * TODO: Add stricter validation for local paths (e.g., relative paths must start with ./ or ../).
 */
export const RefSchema = z.union([
  z.string().url({ message: "Ref must be a valid URL or local path." }),
  z.string().regex(/^(\.?\/|\/|[A-Za-z]:\\)/, {
    message:
      "Ref must be a valid URL or start with '/', './', '../', or be an absolute Windows path",
  }),
]);

export type Ref = z.infer<typeof RefSchema>;
