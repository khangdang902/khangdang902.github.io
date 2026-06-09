import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "@/data/routes";
import { cn } from "@/utils";

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [routeIndex, setRouteIndex] = useState(0);

  useEffect(() => {
    const pathIndex = routes.findIndex(
      (route) => location.pathname === route.path,
    );
    setRouteIndex(pathIndex);
  }, [location.pathname]);

  return (
    <div className="my-6 flex items-center justify-between">
      <ArrowLeftIcon
        role="button"
        className={cn(
          "size-22 cursor-pointer text-stone-50",
          routeIndex === 0 && "invisible",
        )}
        onClick={() => navigate(routes[routeIndex - 1].path)}
      />
      <ArrowRightIcon
        role="button"
        className={cn(
          "size-22 cursor-pointer text-stone-50",
          routeIndex === routes.length - 1 && "invisible",
        )}
        onClick={() => navigate(routes[routeIndex + 1].path)}
      />
    </div>
  );
}
