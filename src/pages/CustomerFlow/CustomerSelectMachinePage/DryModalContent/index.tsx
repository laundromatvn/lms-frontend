import React, { useEffect } from 'react';

import type { AddOnOption } from '../type';

interface Props {
  selectedAddOns: AddOnOption[];
  setSelectedAddOns: React.Dispatch<React.SetStateAction<AddOnOption[]>>;
  onSelect: (addOnOption: AddOnOption) => void;
  onRemove: (addOnOption: AddOnOption) => void;
}

export const DryModalContent: React.FC<Props> = ({ selectedAddOns, setSelectedAddOns, onSelect, onRemove }) => {
  return (
    <div>DryModalContent</div>
  );
};
