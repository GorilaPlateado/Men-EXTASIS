import os

if os.environ.get('DJANGO_SETTINGS_MODULE'):
    import extasis_project.monkeypatch  # noqa: F401
