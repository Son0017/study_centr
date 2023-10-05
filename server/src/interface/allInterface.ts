export interface ICourse {
  id: number;
  name?: string | null;
  subject: string;
  price: number;
  time: string;
  duration?: string | null;
  started_data?: Date | null;
  week_days?: string | null;
  status: boolean;
  room_id: number;
  teacher_id: number;
}
export interface IStudent {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  visited_date: Date | null;
  status?: boolean;
}
