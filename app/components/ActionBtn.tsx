import { CircularProgress } from "@mui/material";
import React from "react";
import { IconType } from "react-icons";

interface ActionBtnProps {
  icon: IconType;
  onclick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
}
const ActionBtn: React.FC<ActionBtnProps> = ({
  icon: Icon,
  onclick,
  disabled,
  loading,
}) => {
  return (
    <div className="h-12 flex justify-center items-center">
      {loading ? (
        <>
          <CircularProgress size={24} style={{ color: '#1976d2' }}   />
        </>
      ) : (
        <>
          <button
            onClick={onclick}
            disabled={disabled}
            className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400 ${
              disabled && "opacity-50 cursor-not-allowed"
            }`}
          >
            <Icon size={18} />
          </button>
        </>
      )}
    </div>
  );
};

export default ActionBtn;
