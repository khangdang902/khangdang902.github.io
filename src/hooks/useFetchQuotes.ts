import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import z from "zod";
import { useQuoteStore } from ".";

const QUOTE_COUNT = 50;
const QUOTES_URL = `https://quoteslate.vercel.app/api/quotes/random?count=${QUOTE_COUNT}`;

const quoteSchema = z.array(
  z.object({
    id: z.number(),
    quote: z.string(),
    author: z.string(),
    length: z.number(),
    tags: z.array(z.string()),
  }),
);

type QuotesArray = z.infer<typeof quoteSchema>;

export default function useFetchQuotes() {
  const { quoteIndex } = useQuoteStore();
  const [quoteList, setQuoteList] = useState<QuotesArray>([]);
  const {
    data,
    isError: isQuoteError,
    refetch,
  } = useSuspenseQuery({
    queryKey: ["quotes"],
    queryFn: async () => {
      const response = await fetch(QUOTES_URL);
      const data = await response.json();
      return quoteSchema.parse(data);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (quoteSchema.safeParse(data).success) {
      setQuoteList((prev) => {
        const existingIds = new Set(prev.map((quote) => quote.id));
        const newQuotes = data.filter((quote) => !existingIds.has(quote.id));
        return [...prev, ...newQuotes];
      });
    }
  }, [data]);

  useEffect(() => {
    if (quoteIndex === quoteList.length - 1) {
      refetch();
      console.log("Quote refetched");
    }
  }, [quoteList.length, quoteIndex, refetch]);

  return { quoteList, isQuoteError };
}
