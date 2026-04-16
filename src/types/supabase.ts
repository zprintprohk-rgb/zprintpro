export type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

export interface Order {
  id: string;
  user_id: string | null;
  quote_data: Record<string, unknown>;
  file_url: string | null;
  amount: number;
  currency: string;
  status: OrderStatus;
  airwallex_payment_intent_id: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: Order;
        Insert: Omit<Order, 'created_at'>;
        Update: Partial<Omit<Order, 'id' | 'created_at'>>;
      };
    };
  };
}
