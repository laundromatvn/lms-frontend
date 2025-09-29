import { MachineTypeEnum } from "@shared/enums/MachineTypeEnum";
import type { SelectedMachineOption } from "./CustomerSelectMachinePage/type";

const MIN_DRYING_TIME = 15;

export const calculateSelectedMachinePrice = (selectedMachines: SelectedMachineOption) => {
  return selectedMachines.machine.machine_type === MachineTypeEnum.WASHER
    ? calculateWashingMachinePrice(selectedMachines)
    : calculateDryerMachinePrice(selectedMachines);
};

const calculateWashingMachinePrice = (selectedMachines: SelectedMachineOption) => {
  let price = Number(selectedMachines.machine.base_price || 0);

  selectedMachines.addOns.forEach((addOn) => {
    if (addOn.addOn.is_default) return;

    price += Number(addOn.addOn.price || 0);
  });

  return price;
};

const calculateDryerMachinePrice = (selectedMachines: SelectedMachineOption) => {
  /* 
    Dryer's add ons is only drying time minute
  */
  let duration = MIN_DRYING_TIME;

  try {
    duration = selectedMachines.addOns[0].quantity;
  } catch (error) {}

  return Math.max(duration, MIN_DRYING_TIME) * Number(selectedMachines.machine.base_price || 0);
};
