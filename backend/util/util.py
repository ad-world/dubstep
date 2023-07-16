from enum import Enum
import json
from flask import jsonify


class StatusResponse(Enum):
    Success = 0
    Failure = 1
    Unknown = 2


class DubstepResponse:
    def __init__(self, status=StatusResponse.Unknown, data=None, message=""):
        self.status = status
        self.data = data
        self.message = message

    def jsonify(self):
        return json.dumps(self, cls=DubstepResponseEncoder)


class DubstepResponseEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, DubstepResponse):
            return {
                "status": obj.status.name,
                "data": obj.data,
                "message": obj.message,
            }
        return super().default(obj)
