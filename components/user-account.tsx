"use client";

import { User } from "next-auth";
import { UserAvatar } from "./user-avatar";

interface UserAccountProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">;
  isCollapsed: boolean;
}

const UserAccount = ({ user }: UserAccountProps) => {
  return (
    <div>
      <UserAvatar
        user={{ name: user.name || null, image: user.image || null }}
        className="w-8 h-8"
      />
    </div>
  );
};

export default UserAccount;
