import { useSuspenseQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { GITHUB_USERNAME } from "@/constants";

const repositories = [
  "breezeos/breezeos-native",
  `${GITHUB_USERNAME}/my-vuejs-website`,
  `${GITHUB_USERNAME}/Improved-Halloween-Website`,
  `${GITHUB_USERNAME}/gnome-ui`,
];

const RepositoryItem: React.FC<{ repo: string }> = ({ repo }) => {
  const [t] = useTranslation("views");
  const { data } = useSuspenseQuery({
    queryKey: ["github-repo", repo],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/repos/${repo}`);
      const data = await response.json();
      return data;
    },
    refetchOnWindowFocus: false,
  });
  const anchorElemRef = useRef<HTMLAnchorElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);
  const { contextSafe } = useGSAP(
    () => {
      const timeline = gsap
        .timeline({
          paused: true,
        })
        .set(".tooltip", {
          scale: "1",
          delay: 1.2,
        })
        .to(".tooltip", {
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        });
      timelineRef.current = timeline;
    },
    { scope: anchorElemRef },
  );

  const handleMouseEnter = contextSafe(() => {
    if (!timelineRef.current) return;
    timelineRef.current.play();
  });

  const handleMouseLeave = contextSafe(() => {
    if (!timelineRef.current) return;
    timelineRef.current.reverse();
  });

  return (
    <a
      ref={anchorElemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={`https://github.com/${repo}`}
      className="relative mb-4 self-end last:mb-0 hover:no-underline hover:[&>p]:scale-105 hover:[&>p]:text-stone-50"
    >
      <p className="paragraph text-right text-4xl text-stone-50/50 transition-all duration-300">
        {repo}
      </p>
      <div className="tooltip absolute right-0 z-10 field-sizing-content h-fit translate-y-[6px] scale-0 space-y-3 rounded-2xl bg-stone-900 px-[22px] py-5 opacity-0 shadow-lg shadow-stone-900/40 hover:[&>.name]:underline">
        <div className="absolute -top-2 right-5 size-7 rotate-45 rounded-sm bg-inherit" />
        <p className="name paragraph text-4xl/tight text-stone-50 decoration-1 underline-offset-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
            className="my-auto mr-3 inline size-6 fill-current"
          >
            <g id="XMLID_184_">
              <path d="M12,0.296c-6.627,0-12,5.372-12,12c0,5.302,3.438,9.8,8.206,11.387   c0.6,0.111,0.82-0.26,0.82-0.577c0-0.286-0.011-1.231-0.016-2.234c-3.338,0.726-4.043-1.416-4.043-1.416   C4.421,18.069,3.635,17.7,3.635,17.7c-1.089-0.745,0.082-0.729,0.082-0.729c1.205,0.085,1.839,1.237,1.839,1.237   c1.07,1.834,2.807,1.304,3.492,0.997C9.156,18.429,9.467,17.9,9.81,17.6c-2.665-0.303-5.467-1.332-5.467-5.93   c0-1.31,0.469-2.381,1.237-3.221C5.455,8.146,5.044,6.926,5.696,5.273c0,0,1.008-0.322,3.301,1.23   C9.954,6.237,10.98,6.104,12,6.099c1.02,0.005,2.047,0.138,3.006,0.404c2.29-1.553,3.297-1.23,3.297-1.23   c0.653,1.653,0.242,2.873,0.118,3.176c0.769,0.84,1.235,1.911,1.235,3.221c0,4.609-2.807,5.624-5.479,5.921   c0.43,0.372,0.814,1.103,0.814,2.222c0,1.606-0.014,2.898-0.014,3.293c0,0.319,0.216,0.694,0.824,0.576   c4.766-1.589,8.2-6.085,8.2-11.385C24,5.669,18.627,0.296,12,0.296z" />
            </g>
          </svg>
          {repo}
        </p>
        <p className="font-monospace w-[30rem] text-sm tracking-[-0.002em] text-neutral-400">
          {data.description ?? t("projects.repository.null_description")}
        </p>
      </div>
    </a>
  );
};

export default function PersonalProjects() {
  const [t] = useTranslation("views");

  return (
    <>
      <h1 className="title col-span-2">{t("projects.personal_projects")}</h1>
      <div className="col-span-3 col-start-4 row-span-2 flex flex-col">
        {repositories.map((repoName) => (
          <RepositoryItem repo={repoName} />
        ))}
      </div>
      <p className="paragraph col-span-2 -row-end-1 text-left align-top text-3xl/[30px]">
        {t("projects.have_a_look")}
      </p>
      <div />
    </>
  );
}
