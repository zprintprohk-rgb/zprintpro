-- 報價請求表
CREATE TABLE IF NOT EXISTS quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 客戶信息
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  company_name VARCHAR(255),
  
  -- 產品信息
  product_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  material VARCHAR(100),
  size VARCHAR(100),
  finishing VARCHAR(100),
  turnaround VARCHAR(50),
  
  -- 設計文件
  design_file_url TEXT,
  design_notes TEXT,
  
  -- 報價狀態
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'quoted', 'accepted', 'rejected', 'cancelled')),
  
  -- 報價信息
  quoted_price DECIMAL(10, 2),
  quoted_by UUID REFERENCES auth.users(id),
  quoted_at TIMESTAMP WITH TIME ZONE,
  quote_notes TEXT,
  
  -- 元數據
  ip_address INET,
  user_agent TEXT,
  referrer TEXT
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);
CREATE INDEX IF NOT EXISTS idx_quotes_customer_email ON quotes(customer_email);

-- 設置 RLS (Row Level Security)
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- 創建策略：允許匿名用戶插入
CREATE POLICY "Allow anonymous insert" ON quotes
  FOR INSERT TO anon
  WITH CHECK (true);

-- 創建策略：只允許管理員查看所有記錄
CREATE POLICY "Allow admin select all" ON quotes
  FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- 創建策略：允許用戶查看自己的報價
CREATE POLICY "Allow user select own" ON quotes
  FOR SELECT TO anon
  USING (false); -- 匿名用戶無法查看，需要通過 email 驗證

-- 創建更新時間觸發器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 創建訂單表
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 訂單信息
  order_number VARCHAR(50) UNIQUE NOT NULL,
  quote_id UUID REFERENCES quotes(id),
  
  -- 客戶信息
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  company_name VARCHAR(255),
  
  -- 送貨信息
  shipping_address TEXT,
  shipping_city VARCHAR(100),
  shipping_region VARCHAR(100),
  shipping_postal_code VARCHAR(20),
  shipping_country VARCHAR(100) DEFAULT 'Hong Kong',
  
  -- 訂單詳情
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  
  -- 訂單狀態
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method VARCHAR(50),
  payment_intent_id VARCHAR(255),
  
  -- 物流信息
  tracking_number VARCHAR(100),
  shipping_carrier VARCHAR(50),
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  
  -- 備註
  customer_notes TEXT,
  admin_notes TEXT
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- 設置 RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 創建策略
CREATE POLICY "Allow admin all" ON orders
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- 創建訂單號生成函數
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number = 'ZP' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION generate_order_number();

-- 創建訂單更新時間觸發器
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 創建購物車表
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 用戶標識（匿名用戶使用 session_id）
  session_id VARCHAR(255),
  user_id UUID REFERENCES auth.users(id),
  
  -- 產品信息
  product_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_image TEXT,
  
  -- 選項
  quantity INTEGER NOT NULL DEFAULT 1,
  material VARCHAR(100),
  size VARCHAR(100),
  finishing VARCHAR(100),
  turnaround VARCHAR(50),
  
  -- 價格
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  
  -- 設計文件
  design_file_url TEXT,
  design_notes TEXT
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_cart_items_session_id ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);

-- 設置 RLS
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- 創建策略
CREATE POLICY "Allow anonymous cart" ON cart_items
  FOR ALL TO anon
  USING (session_id IS NOT NULL);

CREATE POLICY "Allow user cart" ON cart_items
  FOR ALL TO authenticated
  USING (user_id = auth.uid());

-- 創建購物車更新時間觸發器
CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON cart_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 創建用戶資料表擴展
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 基本信息
  full_name VARCHAR(255),
  phone VARCHAR(50),
  company_name VARCHAR(255),
  
  -- 地址信息
  address TEXT,
  city VARCHAR(100),
  region VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Hong Kong',
  
  -- 角色
  role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
  
  -- 偏好設置
  preferred_language VARCHAR(10) DEFAULT 'zh-hk',
  email_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT false
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- 設置 RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 創建策略
CREATE POLICY "Allow user own profile" ON user_profiles
  FOR ALL TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Allow admin all profiles" ON user_profiles
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- 創建用戶資料更新時間觸發器
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 創建自動創建用戶資料的觸發器
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- 添加表註釋
COMMENT ON TABLE quotes IS '客戶報價請求表';
COMMENT ON TABLE orders IS '訂單表';
COMMENT ON TABLE cart_items IS '購物車表';
COMMENT ON TABLE user_profiles IS '用戶資料擴展表';
