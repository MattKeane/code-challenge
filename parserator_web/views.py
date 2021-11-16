import usaddress
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.exceptions import ParseError
from rest_framework import status
import json

class Home(TemplateView):
    template_name = 'parserator_web/index.html'


class AddressParse(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        # TODO: Flesh out this method to parse an address string using the
        # parse() method and return the parsed components to the frontend.
        try:
            input_string = request.query_params['address']
            address_components, address_type = self.parse(input_string)
            parse_address_data = {
                'input_string': input_string, 
                'address_components': address_components, 
                'address_type': address_type
            }
            return Response(parse_address_data, status=status.HTTP_200_OK)
        except:
            exception_response = {
                'message': 'Error parsing address'
            }
            return Response(exception_response, status=status.HTTP_400_BAD_REQUEST)

    def parse(self, address):
        # TODO: Implement this method to return the parsed components of a
        # given address using usaddress: https://github.com/datamade/usaddress
        address_components, address_type = usaddress.tag(address)
        return address_components, address_type
