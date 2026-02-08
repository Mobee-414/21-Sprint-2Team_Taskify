import Avatar from "@/components/common/Avatar";
import { AssigneeUser } from "@/types/user.type";
import { formatToDisplayDate } from "@/utils/formatDate";
import Image from "next/image";

interface SideInfoProps {
  assignee: AssigneeUser;
  dueDate: string;
}

export default function SideInfo({ assignee, dueDate }: SideInfoProps) {
  return (
    <ul>
      <li>
        <dl>
          <dt>담당자</dt>
          <dd>
            {assignee && (
              <div>
                <Avatar
                  nickname={assignee.nickname}
                  imageUrl={assignee.profileImageUrl}
                  size={26}
                />
                {assignee.profileImageUrl && (
                  <div>
                    <Image
                      width={34}
                      height={34}
                      src={assignee.profileImageUrl}
                      alt={`${assignee.nickname} 프로필 이미지`}
                    />
                  </div>
                )}
                {assignee.nickname}
              </div>
            )}
          </dd>
        </dl>
      </li>
      <li>
        <dl>
          <dt>마감일</dt>
          <dd>{dueDate && formatToDisplayDate(dueDate)}</dd>
        </dl>
      </li>
    </ul>
  );
}
