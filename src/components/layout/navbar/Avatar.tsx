import { UserRound } from "lucide-react";
import type { AuthUser } from "../../../features/auth/auth.type";

function Avatar({
  user,
  size = "size-10",
}: {
  user: AuthUser | null;
  size?: string;
}) {
  return (
    <>
      <span
        className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full border border-red-700/50 bg-red-700/10 text-base font-bold text-red-500`}
      >
        {user?.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="size-full object-cover" />
        ) : (
          user?.name?.trim().charAt(0).toUpperCase() || <UserRound size={19} />
        )}
      </span>
    </>
  );
}

export default Avatar;
