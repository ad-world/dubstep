from enum import Enum


class StatusResponse(Enum):
    Success = 0
    Failure = 1
    Unknown = 2


class DubstepResponse:
    def __init__(self, status=StatusResponse.Unknown, data=None, message=""):
        self.status = status
        self.data = data
        self.message = message
