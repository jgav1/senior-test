from fastapi import HTTPException

class VehicleExeption(HTTPException):
    """Base class for all vehicle-related exceptions."""
    pass
class VehicleAlreadyExists(VehicleExeption):
    def __init__(self, detail: str = "Vehicle already exists. failed to create."):
        super().__init__(status_code=500, detail="Vehicle already exists. failed to create.")

class VehicleNotFound(VehicleExeption):
    def __init__(self, detail: str = "Vehicle not found."):
        super().__init__(status_code=404, detail="Vehicle not found.")