import React from 'react';

import { useTheme } from '@shared/theme/useTheme';
import { WorkingTypeEnum } from '@shared/enums/WorkingTypeEnum';

import { type Machine } from '@shared/types/machine';

import { MachineOption } from './MachineOption';

interface Props {
  workingType: WorkingTypeEnum;
  machines: Machine[];
  selectedWashingMachineIds: string[];
  onSelectWashingMachine: (machineId: string) => void;
  onRemoveWashingMachine: (machineId: string) => void;
  selectedDryerMachineIds: string[];
  onSelectDryerMachine: (machineId: string) => void;
  onRemoveDryerMachine: (machineId: string) => void;
}

export const MachineList: React.FC<Props> = ({
  workingType,
  machines,
  selectedWashingMachineIds,
  onSelectWashingMachine,
  onRemoveWashingMachine,
  selectedDryerMachineIds,
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
          selectedMachineIds={workingType === WorkingTypeEnum.WASH
            ? selectedWashingMachineIds
            : selectedDryerMachineIds}
          onSelect={() => workingType === WorkingTypeEnum.WASH
            ? onSelectWashingMachine(machine.id)
            : onSelectDryerMachine(machine.id)}
          onRemove={() => workingType === WorkingTypeEnum.WASH
            ? onRemoveWashingMachine(machine.id)
            : onRemoveDryerMachine(machine.id)}
        />
      ))}
    </div>
  );
};