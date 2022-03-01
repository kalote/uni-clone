import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "0w3p66g8",
  dataset: "production",
  apiVersion: "v1",
  token:
    "skKBgul38sJ1t4ZSft3oF99WjQBm7znGUEceva9dVhnhkQFKFYTI4XHjH7PzoC4SUPPNOWmzM8OIH4qhywGcvk1FLXlwXVK9hJycYriV8LiwDpvwgA4ul8rHJ2uDQPT74OeMHCNtnnuOc1qSYJIYw897aGvPy0ACUDyrr4lPKOiK7lGoH9Hj",
  useCdn: false,
});
