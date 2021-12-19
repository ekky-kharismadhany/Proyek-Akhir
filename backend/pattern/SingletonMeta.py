class SingletonMeta(type):
    _instances = {}

    def __call__(self, *args, **kwds):
        if self not in self._instances:
            instance = super().__call__(*args, **kwds)
            self._instances[self] = instance
        return self._instances[self]