#!/usr/bin/env python3
"""
GAIF Dashboard Patcher — run this once on your index.html
Usage: python3 patch.py
Reads index.html from current directory, writes index-patched.html
"""
import os, sys

src = 'index.html'
if not os.path.exists(src):
    print(f"ERROR: {src} not found in current directory")
    sys.exit(1)

with open(src, 'r', encoding='utf-8') as f:
    c = f.read()

patches = [
    (
        '  <div class="nav-right">\n    <a href="#contact" class="nav-cta">Contact \u2192</a>\n  </div>',
        '  <div class="nav-right">\n    <a href="/gaif-ecosystem-dashboard.html" class="nav-cta" style="color:var(--gold);border-color:var(--gold);margin-right:0.5rem;" onmouseover="this.style.background=\'var(--gold)\';this.style.color=\'var(--obsidian)\'" onmouseout="this.style.background=\'transparent\';this.style.color=\'var(--gold)\'">Framework Live \u2192</a>\n    <a href="#contact" class="nav-cta">Contact \u2192</a>\n  </div>',
        'NAV'
    ),
    (
        '  <div class="hero-actions">\n    <a href="#architecture" class="btn-primary">Explore the Framework</a>\n    <a href="#contact" class="btn-ghost">Get in Touch</a>\n  </div>',
        '  <div class="hero-actions">\n    <a href="#architecture" class="btn-primary">Explore the Framework</a>\n    <a href="#contact" class="btn-ghost">Get in Touch</a>\n    <a href="/gaif-ecosystem-dashboard.html" class="btn-ghost" style="border-color:var(--electric);color:var(--electric);" onmouseover="this.style.background=\'rgba(0,200,255,0.1)\'" onmouseout="this.style.background=\'transparent\'">See It Operating \u2192</a>\n  </div>',
        'HERO'
    ),
]

applied = 0
for old, new, name in patches:
    if old in c:
        c = c.replace(old, new)
        print(f"[OK] {name} patch applied")
        applied += 1
    else:
        print(f"[!!] {name} patch — string not found")

if applied > 0:
    with open('index-patched.html', 'w', encoding='utf-8') as f:
        f.write(c)
    print(f"\nDone. {applied}/2 patches applied.")
    print("File saved as: index-patched.html")
    print("Rename to index.html and push to Vercel.")
else:
    print("\nNo patches applied. Your index.html may differ from expected.")
