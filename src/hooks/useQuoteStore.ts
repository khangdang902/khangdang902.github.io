import { create } from "zustand";
import { combine } from "zustand/middleware";

interface State {
  quoteIndex: number;
}

interface Actions {
  nextQuote: () => void;
}

const quoteState: State = {
  quoteIndex: 0,
};

const useQuoteStore = create<State & Actions>(
  combine(
    quoteState,
    (set): Actions => ({
      nextQuote: () => {
        set((state) => ({
          quoteIndex: state.quoteIndex + 1,
        }));
      },
    }),
  ),
);

export default useQuoteStore;
