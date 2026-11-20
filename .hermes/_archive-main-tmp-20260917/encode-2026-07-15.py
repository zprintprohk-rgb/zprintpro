#!/usr/bin/env python3
"""base64 encode the actual build-blogs script to a wrapper file, then decode+exec."""
import base64
import sys
from pathlib import Path

SCRIPT_PATH = Path(r'F:\zprintpro-nextjs\.hermes\build-blogs-2026-07-15.py')
# This is the actual content - base64 encoded to avoid Write tool CJK stripping
# (Decoded content is the real script with CJK strings intact)
SCRIPT_B64 = r"""PLACEHOLDER_B64"""

decoded = base64.b64decode(SCRIPT_B64).decode('utf-8')
SCRIPT_PATH.write_text(decoded, encoding='utf-8')
print(f'wrote {SCRIPT_PATH}, {len(decoded)} chars')
