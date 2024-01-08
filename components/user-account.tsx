"use client";

import { User } from "next-auth";
import { UserAvatar } from "./user-avatar";

interface UserAccountProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">;
  isCollapsed?: boolean;
}

const UserAccount = ({ user, isCollapsed }: UserAccountProps) => {
  return (
    <div className={`flex items-center gap-2 ${!isCollapsed ? "w-full" : ""}`}>
      <UserAvatar
        user={{ name: user.name || null, image: user.image || null }}
        className="w-8 h-8"
      />
      {!isCollapsed && (
        <div className="w-full flex flex-col">
          <p className="font-semibold text-sm">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserAccount;
