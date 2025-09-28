import type { AddOn } from "@shared/types/AddOn";
import type { Machine } from "@shared/types/machine";


export type AddOnOption = {
  addOn: AddOn;
  quantity: number;
}

export type SelectedMachineOption = {
  machine: Machine;
  addOns: AddOnOption[];
}
