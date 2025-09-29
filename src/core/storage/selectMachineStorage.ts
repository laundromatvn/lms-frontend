import type { SelectedMachineOption } from '@pages/CustomerFlow/CustomerSelectMachinePage/type'

type SelectMachineState = {
  selectedWashingMachineOptions: SelectedMachineOption[];
  selectedDryerMachineOptions: SelectedMachineOption[];
}

const STORAGE_KEY = 'lms.customerFlow.selectedMachines.v1';

export const selectMachineStorage = {
  save(state: SelectMachineState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  },
  load(): SelectMachineState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { selectedWashingMachineOptions: [], selectedDryerMachineOptions: [] };
      const parsed = JSON.parse(raw) as Partial<SelectMachineState>;
      const washing = Array.isArray(parsed?.selectedWashingMachineOptions) ? parsed!.selectedWashingMachineOptions as SelectedMachineOption[] : [];
      const drying = Array.isArray(parsed?.selectedDryerMachineOptions) ? parsed!.selectedDryerMachineOptions as SelectedMachineOption[] : [];
      return {
        selectedWashingMachineOptions: washing,
        selectedDryerMachineOptions: drying,
      };
    } catch {
      return { selectedWashingMachineOptions: [], selectedDryerMachineOptions: [] };
    }
  },
  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};

export type { SelectMachineState };
