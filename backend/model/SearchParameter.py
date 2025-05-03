class SearchParameter:
    def __init__(
        self, query: str = None, near: str = None, price: int = None, open_now: bool = None
    ) -> None:
        self.query = query
        self.near = near
        self.price = price
        self.open_now = open_now
