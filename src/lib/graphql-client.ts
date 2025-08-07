import type { GraphQLRequest, GraphQLResponse, QueryResult, MutationResult } from "./types"

export async function graphqlClient<T extends QueryResult | MutationResult>(
  request: GraphQLRequest,
): Promise<GraphQLResponse<T>> {

  const isServer = typeof window === "undefined"

  const url = isServer
    ? `${"https://nexus-jobportal.vercel.app"}/api/graphql`
    : "/api/graphql"


  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })

  if (!res.ok) {
    let errorMessage = `HTTP error ${res.status}`

    try {
      const errorData = await res.json()
      if (errorData && typeof errorData.message === "string") {
        errorMessage = errorData.message
      }
    } catch {
      
    }

    console.error("GraphQL API error:", errorMessage)
    return { errors: [{ message: errorMessage }] }
  }

  const data: GraphQLResponse<T> = await res.json()
  return data
}
