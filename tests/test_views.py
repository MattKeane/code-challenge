import pytest

def test_api_parse_succeeds(client):
    # TODO: Finish this test. Send a request to the API and confirm that the
    # data comes back in the appropriate format.
    address_string = '123 main st chicago il'
    print(address_string)
    url = '/api/parse'
    response = client.get(url, {'address': address_string})
    assert response.status_code == 200
    # this keeps failing I'm not quite sure why
    # clearly there's something wrong with the request I'm making
    pytest.fail()


def test_api_parse_raises_error(client):
    # TODO: Finish this test. The address_string below will raise a
    # RepeatedLabelError, so ParseAddress.parse() will not be able to parse it.
    address_string = '123 main st chicago il 123 main st'
    pytest.fail()
