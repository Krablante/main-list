
import React from 'react';
import { SVGProps } from 'react';
import { LinkItemData, IconType, IconComponent } from './types';

export const BookIcon: IconComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const CalendarIcon: IconComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5M3 13.5h18M3 10.5h18" />
  </svg>
);

export const ClockIcon: IconComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const PencilIcon: IconComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
  </svg>
);

export const NotebookIcon: IconComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.625a2.25 2.25 0 01-2.25-2.25V7.5c0-.621.504-1.125 1.125-1.125H9M7.5 12h9M7.5 15h3M7.5 18h9" />
  </svg>
);

export const ToolsIcon: IconComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.375 3.375 0 000-4.773L6.75 2.25 2.25 6.75l7.725 7.725a3.375 3.375 0 004.773 0z" />
  </svg>
);

export const GenericLinkIcon: IconComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);


export const MY_PROJECTS_DATA: LinkItemData[] = [
  {
    id: 'rftracker',
    url: 'https://rftracker.vercel.app/',
    label: 'RFTracker',
    description: 'A simple, PWA for tracking books/articles, films/series, goals/tasks and custom web resources.',
    iconType: IconType.Book,
  },
  {
    id: 'infinit-calendar',
    url: 'https://infinit-calendar.vercel.app/',
    label: 'InfinitCalendar',
    description: 'Бесконечный календарь-поток для личного пользования.',
    iconType: IconType.Calendar,
  },
  {
    id: 'lefttime',
    url: 'https://lefttime.vercel.app/',
    label: 'LeftTime',
    description: 'A minimalist countdown timer displaying the time remaining until the end of the current day, serving as a poignant reminder of the finite nature of time.',
    iconType: IconType.Clock,
  },
  {
    id: 'platos-many',
    url: 'https://platos-many.vercel.app/',
    label: 'Заметки-Метаморфозы',
    description: 'Заметки-Метаморфозы — это одностраничное веб-приложение (SPA), созданное для тех, кто ищет вдохновение в непредвиденном. Здесь ваши заметки не просто хранятся, они живут, постоянно подвергаясь случайным, порой красивым, порой пугающим, а порой и просто абсурдным трансформациям.',
    iconType: IconType.Pencil,
  },
];

export const USEFUL_LINKS_DATA: LinkItemData[] = [
  {
    id: 'notebooklm',
    url: 'https://notebooklm.google.com/?pli=1',
    label: 'NotebookLM',
    description: 'Google\'s research and writing assistant.',
    iconType: IconType.Notebook,
  },
  {
    id: 'cobalt-tools',
    url: 'https://cobalt.tools/',
    label: 'Cobalt Tools',
    description: 'A multi-tool for downloading media from various websites.',
    iconType: IconType.Tools,
  },
];
