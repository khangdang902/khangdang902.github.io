import { Link } from "react-router-dom";
import LanguageButton from "../LanguageButton";
import { useTranslation } from "react-i18next";

export default function NavigationBar() {
  const [t] = useTranslation();

  return (
    <nav className="flex w-full items-center justify-between py-6">
      <div className="flex gap-18">
        <Link className="paragraph" to="/">
          {t("navbar.home")}
        </Link>
        <Link className="paragraph" to="/about">
          {t("navbar.about")}
        </Link>
        <Link className="paragraph" to="/projects">
          {t("navbar.projects")}
        </Link>
        <Link className="paragraph" to="/contact">
          {t("navbar.contact")}
        </Link>
      </div>
      <LanguageButton />
    </nav>
  );
}
