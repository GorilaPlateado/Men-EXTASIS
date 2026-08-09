import sys


if sys.version_info >= (3, 14):
    from django.template import context as django_context

    if not hasattr(django_context.BaseContext, '_extasis_monkeypatched'):
        def fixed_copy(self):
            duplicate = object.__new__(self.__class__)
            duplicate.dicts = self.dicts[:]
            duplicate._reset_cache()
            return duplicate

        django_context.BaseContext.__copy__ = fixed_copy
        django_context.BaseContext._extasis_monkeypatched = True
