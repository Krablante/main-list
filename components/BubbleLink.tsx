import React from 'react';
import { LinkItemData } from '../types';
import Icon from './Icon';

interface BubbleLinkProps {
  item: LinkItemData;
}

const BubbleLink = ({ item }: BubbleLinkProps): React.JSX.Element => {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group flex flex-col items-center"
      aria-label={`Link to ${item.label}`}
    >
      <div 
        className="w-28 h-28 sm:w-32 sm:h-32 
                   bg-slate-800/40 hover:bg-slate-700/50 
                   backdrop-blur-sm 
                   border border-slate-700/50 group-hover:border-slate-500/70 
                   rounded-full flex flex-col items-center justify-center 
                   p-3 text-center 
                   shadow-xl hover:shadow-[0_0_25px_5px_rgba(100,116,139,0.2)] 
                   transition-all duration-300 ease-in-out 
                   transform hover:scale-105 cursor-pointer"
      >
        <Icon 
          type={item.iconType} 
          className="w-10 h-10 sm:w-12 sm:h-12 mb-1.5 
                     text-slate-300 group-hover:text-slate-100 
                     transition-colors duration-300" 
        />
        <span 
          className="text-xs sm:text-sm font-medium 
                     text-slate-400 group-hover:text-slate-200 
                     transition-colors duration-300 line-clamp-2 break-words"
        >
          {item.label}
        </span>
      </div>
    </a>
  );
};

export default BubbleLink;