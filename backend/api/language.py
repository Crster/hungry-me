from os import environ
from fastapi import APIRouter
from litellm import completion
from dto import language
import json
import re

json_pattern = re.compile("```json(.*?)```", re.DOTALL)
router = APIRouter(prefix="/api", tags=["language"])


@router.post("/execute")
async def execute_restaurant_query(body: language.ExecuteRestaurantQueryRequest):
    prompt = """
You are a grammarian. Your task is to convert the user input into a JSON object that can be used to call the FourSquare API. The JSON object should contain the following fields:
```json
{
    "action": "action of the sentence (e.g., restaurant_search, restaurant_suggestion, food_search, unknown)",
    "paramters": {
      "query": "A string to be matched against all content for this place, including but not limited to venue name, category, telephone number, taste, and tips.",
      "near": "A string naming a locality in the world (e.g., "Chicago, IL").",
      "price": "Restricts results to only those places within the specified price range. Valid values range between 1 (most affordable) to 4 (most expensive), inclusive.",
      "open_now": "Whether the user wants to see only open places or not. Valid values are true or false.",
    }
}
```
Try to extract the parameter query field from the user input. The near, price, and open_now fields are optional.
Do not return any formatting or additional text. Just return the JSON object with "unknown" action if you cannot understand the sentence.
"""

    # response = completion(
    #     model=environ.get("LLM_MODEL"),
    #     messages=[
    #         {
    #             "role": "system",
    #             "content": prompt,
    #         },
    #         {
    #             "role": "grammarian",
    #             "content": "What type of restaurant are you looking for?",
    #         },
    #         {
    #             "role": "user",
    #             "content": body.message,
    #         },
    #     ],
    # )

    res = """'\n\n```json\n{\n    "action": "restaurant_search",\n    "paramters": {\n        "query": "luxury date",\n        "price": 4\n    }\n}\n```'"""

    content = json_pattern.search(res)
    if content is None:
        raise ValueError("Invalid response format")
    
    if content.group(1) is None:
        raise ValueError("Invalid response format")
    
    return json.loads(content.group(1))
