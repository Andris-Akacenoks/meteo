#!/usr/bin/python2.7	
import json	
import socket	
import sys	
import time	
import requests	
	
	
HOST = '193.105.155.166'    # The remote host	
PORT = 8888              # The same port as used by the server	
	
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)	
s.connect((HOST, PORT))	
while 1:	
	data = s.recv(10000)	
	if not data: break	
	if not ((data.startswith('{"acuErr"')) and (data.endswith('}'))):	
		data = data+s.recv(10000)	
	else:	
		print data	
			
		f = open('rt32.json', 'r+')
		f.truncate()	
	
		with open('rt32.json', 'a') as the_file:	
			the_file.write(data+"\n")	
	
s.close()
