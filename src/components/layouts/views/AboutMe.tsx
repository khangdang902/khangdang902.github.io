import { useTranslation } from "react-i18next";
import GithubPfp from "@/components/GithubPfp";

export default function Home() {
  const [t] = useTranslation("views");

  return (
    <>
      <h1 className="title col-span-2">{t("about.what_am_i")}</h1>
      <div />
      <div className="relative col-span-2 -row-end-1">
        <GithubPfp className="absolute h-full" />
      </div>
      <div className="col-span-3 -col-end-1 -row-end-1 flex flex-row-reverse items-end">
        <p className="paragraph text-right text-3xl/[30px]">
          {t("about.description", { age: new Date().getFullYear() - 2009 })}
        </p>
      </div>
    </>
  );
}
