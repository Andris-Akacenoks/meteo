#!/usr/bin/python2.7	
import json	
import socket	
import sys	
import time	
import requests	
import mysql.connector
	
	
HOST = '193.105.155.166'    # The remote host	
PORT = 8888              # The same port as used by the server	
	
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)	
s.connect((HOST, PORT))	

cnx = mysql.connector.connect(user='oper', password='parole',
                              host='127.0.0.1',
                              database='irbene')

cursor = cnx.cursor()

while 1:	
	data = s.recv(10000)	
	if not data: break	
	if not ((data.startswith('{"acuErr"')) and (data.endswith('}'))):	
		data = data+s.recv(10000)	
	else:	
		add_rt32 = ("INSERT INTO rt32 (data) VALUES (%s)")
		cursor.execute(add_rt32, data)

		cnx.commit()

		cursor.close()
		cnx.close()
s.close()
