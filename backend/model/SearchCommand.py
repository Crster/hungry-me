from .SearchParameter import SearchParameter


class SearchCommand:
    def __init__(self, action: str = "unknown", parameters: SearchParameter = SearchParameter()) -> None:
        self.action = action
        self.parameters = parameters
