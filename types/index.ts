export interface Device {
  id: string;
  name: string | null;
  status: string;
  email_pic: string | null;
  mac?: string;
  phone?: string;
  source_name?: string;
  cookies?: string;
  cookies_exp?: string;
  date_created?: string;
  date_updated?: string;
}

export interface Health {
  id: number;
  deviceTimestamp: string;
  data_type: 'heart_rate' | 'blood_oxygen' | 'pressure';
  string_val: number;
  date_created: string;
  device_id: string;
  start_time_utc: string;
  end_time_utc: string;
}

export interface HealthSummary {
  heartRate: {
    max: number;
    min: number;
    average: number;
  };
  bloodOxygen: {
    max: number;
    min: number;
    average: number;
  };
}
