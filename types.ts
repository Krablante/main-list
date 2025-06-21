
import { SVGProps } from 'react';

export enum IconType {
  Book,
  Calendar,
  Clock,
  Pencil,
  Notebook,
  Tools,
  GenericLink
}

export interface LinkItemData {
  id: string;
  url: string;
  label: string;
  description: string;
  iconType: IconType;
}

export type IconComponent = (props: SVGProps<SVGSVGElement>) => React.ReactNode;
