export default interface LocalItem {
  local_id: number;
  local_index: string;
  created_date: string;
  modified_date: string | null;
  local_name: string;
  local_plan_length: number;
  local_curr_length: number;
  local_process: number;
  local_description: '';
  local_used: number;
  local_number: number;
  monitor_number: number;
  local_type: number;
  ts_index: string;
}
