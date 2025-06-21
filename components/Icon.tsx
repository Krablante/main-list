
import React from 'react';
import { SVGProps } from 'react';
import { IconType, IconComponent } from '../types';
import { BookIcon, CalendarIcon, ClockIcon, PencilIcon, NotebookIcon, ToolsIcon, GenericLinkIcon } from '../constants';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'type'> {
  type: IconType;
}

const Icon = ({ type, ...svgProps }: IconProps): React.JSX.Element => {
  const iconMap: Record<IconType, IconComponent> = {
    [IconType.Book]: BookIcon,
    [IconType.Calendar]: CalendarIcon,
    [IconType.Clock]: ClockIcon,
    [IconType.Pencil]: PencilIcon,
    [IconType.Notebook]: NotebookIcon,
    [IconType.Tools]: ToolsIcon,
    [IconType.GenericLink]: GenericLinkIcon,
  };

  const SelectedIcon = iconMap[type] || GenericLinkIcon;

  return <SelectedIcon {...svgProps} />;
};

export default Icon;