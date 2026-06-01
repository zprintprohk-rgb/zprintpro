# test_gsc.py
import os
from dotenv import load_dotenv

# 加载 .env 文件
load_dotenv()

# 读取环境变量
email = os.getenv("GSC_ACCOUNT_EMAIL")
key_file = os.getenv("GSC_KEY_FILE")
site_url = os.getenv("GSC_SITE_URL")

print("=" * 50)
print("GSC 配置检查")
print("=" * 50)
print(f"账号邮箱: {email}")
print(f"密钥文件: {key_file}")
print(f"网站URL: {site_url}")
print()

# 检查密钥文件是否存在
if os.path.exists(key_file):
    print("✅ 密钥文件存在")
else:
    print(f"❌ 密钥文件不存在: {key_file}")
    print()
    print("下一步：")
    print("1. 去 https://console.cloud.google.com/ 创建服务账号")
    print("2. 下载 JSON 密钥文件")
    print("3. 将文件保存到: C:\\Users\\Administrator\\gsc-key.json")
    print("4. 在 GSC 中添加服务账号邮箱为授权用户")