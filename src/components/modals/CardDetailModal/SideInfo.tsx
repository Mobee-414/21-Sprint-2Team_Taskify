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
      order-1 md:order-2
      flex md:flex-col md:gap-[16px]
      h-[fit-content] 
      px-[16px] py-[9px]  md:py-[14.5px]
      mb-[16px] md:mb-0
      border border-gray-base rounded-[8px]
      "
    >
      <li className="flex-1">
        <dl>
          <dt className="text-xs font-semibold text-black-pure md:mb-[6px]">
            담당자
          </dt>
          {assignee && (
            <dd className="flex items-center gap-[8px] text-md font-regular text-black-medium:">
              <Avatar
                nickname={assignee.nickname}
                imageUrl={assignee.profileImageUrl}
                className="w-[26px] h-[26px] md:w-[34px] md:h-[34px]"
              />
              {assignee.nickname}
            </dd>
          )}
        </dl>
      </li>
      <li className="flex-1">
        <dl className="flex flex-col justify-between h-[100%]">
          <dt className="text-xs font-semibold text-black-pure md:mb-[6px]">
            마감일
          </dt>
          <dd className="text-xs-tight md:text-md text=regular text-black-medium">
            {dueDate && formatToDisplayDate(dueDate)}
          </dd>
        </dl>
      </li>
    </ul>
  );
}
