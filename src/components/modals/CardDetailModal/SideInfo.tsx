import Avatar from "@/components/common/Avatar";
import { AssigneeUser } from "@/types/user.type";
import { formatToDisplayDate } from "@/utils/formatDate";

interface SideInfoProps {
  assignee: AssigneeUser;
  dueDate: string;
}

export default function SideInfo({ assignee, dueDate }: SideInfoProps) {
  return (
    <ul
      className="
      order-1 tablet:order-2
      flex tablet:flex-col tablet:gap-[16px]
      h-[fit-content] tablet:min-w-[181px]
      px-[16px] py-[9px]  tablet:py-[14.5px]
      mb-[16px] tablet:mb-0
      border border-gray-base rounded-[8px]
      "
    >
      <li className="flex-1">
        <dl>
          <dt className="text-xs font-semibold text-black-pure tablet:mb-[6px]">
            담당자
          </dt>
          {assignee && (
            <dd className="flex items-center gap-[8px] text-md font-regular text-black-medium:">
              <Avatar
                nickname={assignee.nickname}
                imageUrl={assignee.profileImageUrl}
                className="w-[26px] h-[26px] tablet:w-[34px] tablet:h-[34px]"
              />
              {assignee.nickname}
            </dd>
          )}
        </dl>
      </li>
      <li className="flex-1">
        <dl className="flex flex-col justify-between h-[100%]">
          <dt className="text-xs font-semibold text-black-pure tablet:mb-[6px]">
            마감일
          </dt>
          <dd className="text-xs-tight tablet:text-md text=regular text-black-medium">
            {dueDate && formatToDisplayDate(dueDate)}
          </dd>
        </dl>
      </li>
    </ul>
  );
}
