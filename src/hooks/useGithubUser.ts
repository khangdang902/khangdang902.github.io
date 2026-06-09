import { useSuspenseQuery } from "@tanstack/react-query";
import z from "zod";

const githubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  node_id: z.string(),
  avatar_url: z.string(),
  gravatar_id: z.string(),
  url: z.string(),
  html_url: z.string(),
  followers_url: z.string(),
  following_url: z.string(),
  gists_url: z.string(),
  starred_url: z.string(),
  subscriptions_url: z.string(),
  organizations_url: z.string(),
  repos_url: z.string(),
  events_url: z.string(),
  received_events_url: z.string(),
  type: z.string(),
  user_view_type: z.string(),
  site_admin: z.boolean(),
  name: z.string(),
  company: z.string(),
  blog: z.string(),
  location: z.string(),
  email: z.string().nullable(),
  hireable: z.boolean().nullable(),
  bio: z.string().nullable(),
  twitter_username: z.string().nullable(),
  public_repos: z.number(),
  public_gists: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export default function useGithubUser(username: string) {
  return useSuspenseQuery({
    queryKey: ["github-user"],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      return githubUserSchema.parse(data);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
