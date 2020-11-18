from plantower import Plantower
from argparse import ArgumentParser
import json

parser = ArgumentParser(description="Test plantower code in active mode")
parser.add_argument("port", action="store", help="The serial port to use")
args = parser.parse_args()

pt = Plantower(port=args.port)
result = pt.read()

result_dict = vars(result)
result_json = json.dumps(result_dict)

print(result_json)