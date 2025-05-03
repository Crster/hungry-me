class ServiceError(Exception):
    """Base class for all service-related exceptions."""

    def __init__(self, message: str):
        super().__init__(message)
        self.message = message

class LanguageServiceError(ServiceError):
    """Base class for all language service-related exceptions."""

    def __init__(self, message: str):
        super().__init__(message)
        self.message = message

class RestaurantServiceError(ServiceError):
    """Base class for all restaurant service-related exceptions."""

    def __init__(self, message: str):
        super().__init__(message)
        self.message = message