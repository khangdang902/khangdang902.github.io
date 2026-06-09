import { useRef, useState } from "react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMeasure } from "react-use";
import { useTranslation, Trans } from "react-i18next";
import GithubPfp from "@/components/GithubPfp";
import { useFetchQuotes, useGithubUser, useQuoteStore } from "@/hooks";
import { cn } from "@/utils";
import { GITHUB_USERNAME } from "@/constants";

const Quote = () => {
  const [t] = useTranslation("views");
  const { quoteList, isQuoteError } = useFetchQuotes();
  const { quoteIndex, nextQuote } = useQuoteStore();
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [measureRef, { height: quoteElemHeight }] =
    useMeasure<NonNullable<typeof quoteRef.current>>();
  const splitTextRef = useRef<SplitText>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  function animateContainerHeight(newH: number) {
    gsap.to(quoteContainerRef.current, {
      height: newH,
      duration: 0.6,
      ease: "expo.out",
    });
  }

  const { contextSafe } = useGSAP(() => {
    if (quoteList.length === 0) return;
    gsap.set("#quote-author", { opacity: 0 });
    const splitText = new SplitText(quoteRef.current, {
      type: "lines",
      tag: "p",
    });
    splitTextRef.current = splitText;
    animateContainerHeight(quoteElemHeight);
    gsap.fromTo(
      "#quote-author",
      { opacity: 0, x: 10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.15,
      },
    );
    gsap.set(splitText.lines, { opacity: 0 });
    gsap.fromTo(
      splitText.lines,
      { x: 12 },
      {
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        onComplete: () => {
          setIsAnimating(false);
        },
      },
    );
    gsap.set(splitText.lines, { opacity: 1, stagger: 0.1 });
  }, [quoteList.length, quoteIndex, quoteElemHeight]);

  const handleRefresh = contextSafe(() => {
    if (!splitTextRef.current) return;
    setIsAnimating(true);
    gsap.to(splitTextRef.current.lines, {
      x: -12,
      duration: 0.2,
      stagger: 0.1,
      ease: "power3.in",
      onComplete: () => {
        splitTextRef.current?.revert();
        nextQuote();
      },
    });
    gsap.set(splitTextRef.current.lines, {
      opacity: 0,
      stagger: 0.1,
      delay: 0.2,
    });
  });

  return (
    <>
      {isQuoteError ? (
        <p>{t("home.quote.failed_to_fetch")}</p>
      ) : (
        <div
          className="relative w-full"
          style={{
            height: quoteElemHeight,
          }}
          ref={quoteContainerRef}
        >
          <div
            className="paragraph absolute w-full leading-7"
            ref={(ref) => {
              quoteRef.current = ref;
              measureRef(ref!);
            }}
          >
            {quoteList[quoteIndex]?.quote}
          </div>
        </div>
      )}
      <div className="float-right flex items-center space-x-2">
        <span id="quote-author" className="paragraph">
          {quoteList[quoteIndex]?.author === "Unknown"
            ? t("home.quote.unknown_author", {
                defaultValue: "Unknown",
              })
            : quoteList[quoteIndex]?.author}
        </span>
        <div className="h-[0.5px] w-5 bg-current" />
        <span
          role="button"
          className={cn(
            "paragraph leading-10 underline decoration-1 underline-offset-2 transition-colors duration-300 hover:cursor-pointer active:text-stone-400 active:transition-none",
            isAnimating && "pointer-events-none",
          )}
          onClick={handleRefresh}
        >
          {t("home.quote.refresh_quote")}
        </span>
      </div>
    </>
  );
};

export default function Home() {
  const githubUser = useGithubUser(GITHUB_USERNAME);

  return (
    <>
      <h1 className="title col-span-2">{githubUser.data.name}</h1>
      <div className="col-span-2 col-start-5 text-right">
        <Quote />
      </div>
      <div className="relative col-span-2 -row-end-1">
        <GithubPfp className="absolute h-full" />
      </div>
      <h1 className="title col-span-3 -col-end-1 text-right">
        <Trans
          i18nKey="home.creative_expands"
          ns="views"
          components={{
            br: <br />,
          }}
        />
      </h1>
    </>
  );
}
