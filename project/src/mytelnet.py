#!/usr/bin/python2.7
import json
import socket
import sys
import requests

try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
except Exception as e:
    print ('Failed to create socket. , Error message : ' + e )
    sys.exit()
print ('Socket Created')
host = '193.105.155.171'
port = 8887
first_line = ""
try:
	remote_ip = socket.gethostbyname( host )
except Exception as e:
	#could not resolve
	print ('Hostname could not be resolved. Exiting')
	sys.exit()

s.connect((remote_ip , port))
print ('Socket Connected to ' + host + ' on ip ' + remote_ip)

while 1:
    #Now receive data
    reply = s.recv(4096)
    if len(reply.decode()) > 1:
        resp = reply.decode()
        first_line += resp
        print (first_line)
        if len(first_line) > 90:
            MERIJUMU_SKAITS = 27
            first_line.split(',')

            data_json = {
                "measurementTime"   : first_line.split(',')[0],
                "windSpeed"         : first_line.split(',')[1],
                "windGust"          : first_line.split(',')[2],
                "windSpeedCount"    : first_line.split(',')[3],
                "rain"              : first_line.split(',')[12],
                "windDirection"     : first_line.split(',')[13],
                "inputVoltage"      : first_line.split(',')[14],
                "solarRadiation"    : first_line.split(',')[16],
                "temperature"       : first_line.split(',')[18],
                "humidity"          : first_line.split(',')[19],
                "barPressure"       : first_line.split(',')[20]
            }

            url = 'http://35.195.69.44/project/src/server.php'
            headers = {
                'content-type': 'application/json'
            }

            r = requests.post(url, data=json.dumps(data_json),  headers=headers)
            first_line = ""

            # Response, status etc
            print(r.text)
            print("POST response code:")
            print(r.status_code)
            print("\n")
        else:
            continue
