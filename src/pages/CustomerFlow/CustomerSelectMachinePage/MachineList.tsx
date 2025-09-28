import React from 'react';

import { useTheme } from '@shared/theme/useTheme';
import { WorkingTypeEnum } from '@shared/enums/WorkingTypeEnum';

import { type Machine } from '@shared/types/machine';

import { MachineOption } from './MachineOption';
import type { SelectedMachineOption } from './type';

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

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: theme.custom.spacing.medium,
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingRight: theme.custom.spacing.medium,
        paddingLeft: theme.custom.spacing.medium,
      }}
    >
      {machines.map((machine) => (
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