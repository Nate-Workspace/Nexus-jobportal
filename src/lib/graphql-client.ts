import type { GraphQLRequest, GraphQLResponse, QueryResult, MutationResult } from "./types"

export async function graphqlClient<T extends QueryResult | MutationResult>(
  request: GraphQLRequest,
): Promise<GraphQLResponse<T>> {

  const isServer = typeof window === "undefined"

  const url = isServer
    ? `${"http://localhost:3000"}/api/graphql`
    : "/api/graphql"


  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!res.ok) {
    const errorData = await res.json()
    console.error("GraphQL API error:", errorData)
    return { errors: [{ message: errorData.message || "An unknown error occurred" }] }
  }

  const data: GraphQLResponse<T> = await res.json()
  return data
}
