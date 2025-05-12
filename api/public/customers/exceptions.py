from fastapi import HTTPException

class CustomerExeption(HTTPException):
    """Base class for all customer-related exceptions."""
    pass
class CustomerAlreadyExists(CustomerExeption):
    def __init__(self, detail: str = "Customer already exists. failed to create."):
        super().__init__(status_code=500, detail="Customer already exists. failed to create.")