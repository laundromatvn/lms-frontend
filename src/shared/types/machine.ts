import { MachineTypeEnum } from "@shared/enums/MachineTypeEnum";
import { MachineStatusEnum } from "@shared/enums/MachineStatusEnum";

export type Machine = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  controller_id: string;
  relay_no: number;
  name: string;
  machine_type: MachineTypeEnum;
  details: Record<string, any>;
  base_price: string;
  status: MachineStatusEnum;
}
