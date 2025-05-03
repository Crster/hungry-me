from .SearchParameter import SearchParameter
from .SearchAction import SearchAction

class SearchCommand:
    def __init__(self, action: SearchAction = SearchAction.UNKNOWN, parameters: SearchParameter = SearchParameter()) -> None:
        self.action = action
        self.parameters = parameters
