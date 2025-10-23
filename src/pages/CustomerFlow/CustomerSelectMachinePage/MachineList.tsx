import React, { useEffect, useState } from 'react';

import { useTheme } from '@shared/theme/useTheme';
import { WorkingTypeEnum } from '@shared/enums/WorkingTypeEnum';

import { type Machine } from '@shared/types/machine';

import type { SelectedMachineOption } from './type';

import { MachineOption } from './MachineOption';


interface Props {
  workingType: WorkingTypeEnum;
  machines: Machine[];
  selectedWashingMachineOptions: SelectedMachineOption[];
  onSelectWashingMachine: (machineOption: SelectedMachineOption) => void;
  onRemoveWashingMachine: (machineOption: SelectedMachineOption) => void;
  selectedDryerMachineOptions: SelectedMachineOption[];
  onSelectDryerMachine: (machineOption: SelectedMachineOption) => void;
  onRemoveDryerMachine: (machineOption: SelectedMachineOption) => void;
}

export const MachineList: React.FC<Props> = ({
  workingType,
  machines,
  selectedWashingMachineOptions,
  onSelectWashingMachine,
  onRemoveWashingMachine,
  selectedDryerMachineOptions,
  onSelectDryerMachine,
  onRemoveDryerMachine,
}) => {
  const theme = useTheme();

  // Detect screen orientation to adjust grid columns
  const [isPortrait, setIsPortrait] = useState<boolean>(() => {
    try {
      return window.matchMedia('(orientation: portrait)').matches;
    } catch {
      return window.innerHeight > window.innerWidth;
    }
  });

  useEffect(() => {
    let mediaQuery: MediaQueryList | null = null;
    const updateFromResize = () => setIsPortrait(window.innerHeight > window.innerWidth);

    try {
      mediaQuery = window.matchMedia('(orientation: portrait)');
      const handleChange = () => setIsPortrait(mediaQuery!.matches);
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
      }
    } catch {
      // Fallback to resize listener only
    }

    window.addEventListener('resize', updateFromResize);

    return () => {
      if (mediaQuery) {
        const handleChange = () => setIsPortrait(mediaQuery!.matches);
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else if (mediaQuery.removeListener) {
          mediaQuery.removeListener(handleChange);
        }
      }
      window.removeEventListener('resize', updateFromResize);
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(${isPortrait ? 2 : 4}, minmax(0, 1fr))`,
        gap: theme.custom.spacing.medium,
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingRight: theme.custom.spacing.medium,
        paddingLeft: theme.custom.spacing.medium,
      }}
    >
      {machines.filter((machine) => Number(machine.base_price || 0) > 0).map((machine) => (
        <MachineOption
          key={machine.id}
          machine={machine}
          selectedMachineOptions={workingType === WorkingTypeEnum.WASH
            ? selectedWashingMachineOptions
            : selectedDryerMachineOptions}
          onSelect={(machineOption) => workingType === WorkingTypeEnum.WASH
            ? onSelectWashingMachine(machineOption)
            : onSelectDryerMachine( machineOption)}
          onRemove={(machineOption) => workingType === WorkingTypeEnum.WASH
            ? onRemoveWashingMachine( machineOption)
            : onRemoveDryerMachine( machineOption)}
        />
      ))}
    </div>
  );
};