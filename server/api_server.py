"""API implemented using Google Cloud Endpoints.

Defined here are the ProtoRPC messages needed to define Schemas for methods
as well as those methods defined in an API.
"""

import endpoints
from server.common import common_service

api_root = common_service.api_root
APP = endpoints.api_server([api_root])
