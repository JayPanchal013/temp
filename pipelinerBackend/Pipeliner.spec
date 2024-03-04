# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/pipeliner.py'],
    pathex=[],
    binaries=[],
    datas=[('D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/api', 'api/'), ('D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/baseModels', 'baseModels/'), ('D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/pipeliner', 'pipeliner/'), ('D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/projects', 'projects/'), ('D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/static', 'static/'), ('D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/templates', 'templates/'), ('D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/data.zip', '.'), ('D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/db.sqlite3', '.'), ('D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/manage.py', '.'), ('D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/pipeliner.py', '.'), ('D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/Pipeliner.spec', '.'), ('D:/pythonProjects/Pipeliner/pipelinerBackend/pipeliner/requirements2.txt', '.')],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='pipeliner',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['D:\\pythonProjects\\Pipeliner\\pipelinerBackend\\pipeliner\\static\\logo.ico'],
)
coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='pipeliner',
)
