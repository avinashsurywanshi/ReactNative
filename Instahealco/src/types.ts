export type UserLoginParams = {
  mobile_no?: number;
};

export type AuthParams = {
  mobile_no?: number;
  otp?: number;
};

export type AuthObject = {
  mobile_no?: number;
  user_id?: number;
};

export type Schedule = {
  id?: number;
  appoint_interval?: number;
  disable_date?: string;
  disable_time?: string;
  end_time?: string;
  max_slot_count?: number;
  start_time?: string;
  user_id?: number;
  weekly_off?: string;
};

export type appPickerItem = {
  label: string;
  value: string;
};
