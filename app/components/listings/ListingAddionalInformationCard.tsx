"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBone } from '@fortawesome/free-solid-svg-icons';

interface ListingAddionalInformationCardProps {
    enabled: boolean,
    icon: any,
    label: string
}

const ListingAddionalInformationCard: React.FC<ListingAddionalInformationCardProps> = ({
    enabled,
    icon,
    label,
}) => {
  return (
    <div className={`border-2 rounded-lg shadow-sm p-4 flex items-center gap-2 
        ${enabled? `border-green-400` : 'border-gray-300'}
        ${enabled? `bg-green-50` : 'bg-white'}
      `}
    >
        <FontAwesomeIcon icon={icon} size="lg"/>
        <span className={`${enabled? `text-green-500` : 'text-black'}`}>{label}</span>
  </div>
  );
};

export default ListingAddionalInformationCard;
