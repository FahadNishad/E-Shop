import React from "react";
import { IconType } from "react-icons";
interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}
const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    <div className="flex justify-center  items-center h-12">
      <div className={`${bg} ${color} px-1 rounded flex items-center gap-1 h-5 `}>
        {text} <Icon />
      </div>
    </div>
  );
};

export default Status;
