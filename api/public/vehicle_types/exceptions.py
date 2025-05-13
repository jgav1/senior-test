from fastapi import HTTPException

class VehicleTypeExeption(HTTPException):
    """Base class for all vehicle-related exceptions."""
    pass
class VehicleTypeAlreadyExists(VehicleTypeExeption):
    def __init__(self, detail: str = "Vehicle Type already exists. failed to create."):
        super().__init__(status_code=500, detail="Vehicle Type already exists. failed to create.")

class VehicleTypeNotFound(VehicleTypeExeption):
    def __init__(self, detail: str = "Vehicle Type not found."):
        super().__init__(status_code=404, detail="Vehicle Type not found.")