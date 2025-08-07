"use client"

import * as React from "react"
import { useInView } from "react-intersection-observer"

interface InfiniteScrollListProps<T> {
  fetchMore: (offset: number, limit: number) => Promise<T[]>
  renderItem: (item: T) => React.ReactNode
  initialItems: T[]
  limit?: number
  noMoreItemsMessage?: string
}

export function InfiniteScrollList<T>({
  fetchMore,
  renderItem,
  initialItems,
  limit = 10,
  noMoreItemsMessage = "You have seen all opportunities.",
}: InfiniteScrollListProps<T>) {
  const [items, setItems] = React.useState<T[]>(initialItems)
  const [offset, setOffset] = React.useState(initialItems.length)
  const [hasMore, setHasMore] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const { ref, inView } = useInView({
    threshold: 0,
  })

  React.useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreItems()
    }
  }, [inView, hasMore, isLoading])

  const loadMoreItems = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const newItems = await fetchMore(offset, limit)
      setItems((prevItems) => [...prevItems, ...newItems])
      setOffset((prevOffset) => prevOffset + newItems.length)
      if (newItems.length < limit) {
        setHasMore(false)
      }
    } catch (error) {
      console.error("Failed to fetch more items:", error)
      setHasMore(false) // Stop trying to load on error
    } finally {
      setIsLoading(false)
    }
  }, [fetchMore, offset, limit, hasMore, isLoading])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{items.map(renderItem)}</div>
      {hasMore && (
        <div ref={ref} className="flex justify-center py-4">
          {isLoading ? <Spinner /> : null}
        </div>
      )}
      {!hasMore && !isLoading && items.length > 0 && (
        <p className="text-center text-muted-foreground">{noMoreItemsMessage}</p>
      )}
      {!isLoading && items.length === 0 && <p className="text-center text-muted-foreground">No opportunities found.</p>}
    </div>
  )
}


function Spinner() {
  return (
    <svg
      className="animate-spin h-8 w-8 text-primary"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}
