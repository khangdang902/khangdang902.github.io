import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utils";
import { useGithubUser } from "@/hooks";
import { GITHUB_USERNAME } from "@/constants";

export default function GithubPfp({
  className,
  ...props
}: React.HTMLAttributes<HTMLImageElement>) {
  const githubUser = useGithubUser(GITHUB_USERNAME);
  const imageRef = useRef<HTMLImageElement>(null);
  const { contextSafe } = useGSAP({ scope: imageRef });
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = contextSafe(() => {
    setIsAnimating(true);
    gsap.fromTo(
      imageRef.current,
      { rotate: 0 },
      {
        rotate: 360,
        ease: "power3.out",
        duration: 1.2,
        onComplete: () => setIsAnimating(false),
      },
    );
  });

  return (
    <img
      ref={imageRef}
      src={githubUser.data.avatar_url}
      className={cn(
        "aspect-square rounded-full grayscale",
        isAnimating && "pointer-events-none",
        className,
      )}
      onClick={handleClick}
      {...props}
    />
  );
}
