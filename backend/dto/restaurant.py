from pydantic import BaseModel

class FindByLlmRequest(BaseModel):
    message: str