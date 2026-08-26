# -*- coding: utf-8 -*-
"""Remove git index lock (stale)."""
import os
lock = r"F:\zprintpro-nextjs\.git\index.lock"
try:
    os.unlink(lock)
    print("Lock removed:", lock)
except FileNotFoundError:
    print("Lock not found (already removed)")
except PermissionError as e:
    print("Permission denied:", e)
