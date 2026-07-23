import React from 'react';

export interface BusinessInfoCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export const BusinessInfoCard: React.FC<BusinessInfoCardProps> = ({ label, value, icon }) => {
  return (
    <div className="flex flex-col">
      <label className="block text-[11.5px] font-semibold text-neutral-500 mb-1">
        {label}
      </label>
      <div className="relative flex items-center w-full h-[40px] rounded-lg border border-neutral-200 bg-[#FBFAF6] text-sm overflow-hidden">
        {icon && (
          <div className="absolute left-3 flex items-center text-neutral-400">
            {icon}
          </div>
        )}
        <div className={`flex items-center text-neutral-700 w-full h-full ${icon ? 'pl-10' : 'pl-3'} pr-3`}>
          {value}
        </div>
      </div>
    </div>
  );
};
