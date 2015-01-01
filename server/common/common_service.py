"""Common API messages."""

import endpoints
import functools
import logging

from server.common import constants
from protorpc import remote

api_root = endpoints.api(
    name=constants.API_NAMESPACE, version=constants.API_VERSION,
    description=constants.API_DESCRIPTION)


def RequestLogger(level=logging.INFO):
  """Decorator for logging endpoints method requests.

  Args:
    level: int, one of the standard logging levels, or None if logging should be
        disabled. Default is INFO.

  Returns:
    A decorator function for altering the endpoints method.
  """
  def Decorator(endpoints_func):
    @functools.wraps(endpoints_func)
    def Inner(self, request):
      if level:
        logging.log(
          level, '%s.%s request: %r', self.__class__.__name__,
          endpoints_func.__name__, request)
      return endpoints_func(self, request)
    return Inner
  return Decorator


class BaseService(remote.Service):
  """Common methods for all API calls.

  Attributes:
    filters: dict, filter keys and their values.
    response: GeneralResponse, response message.
  """

  # The subclass should override this with the service model name.
  model = 'UNDEFINED'

  #TODO(vergun): Add common service methods here.