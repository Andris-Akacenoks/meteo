#!/usr/bin/python2.7	
import json	
import socket	
import sys	
import time	
import requests	
import mysql.connector as mariadb
	
	
HOST = '193.105.155.166'    # The remote host	
PORT = 8889              # The same port as used by the server	
	
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)	
s.connect((HOST, PORT))	

mariadb_connection = mariadb.connect(user='oper', password='parole', host='127.0.0.1', database='irbene')
cursor = mariadb_connection.cursor()

while 1:
        data = ""
	data = s.recv(10000)	
	if not data: 
                print("...")
                break	
	if not ((data.startswith('{"acuErr"')) and (data.endswith('}'))):	
		data = data+s.recv(10000)
                print("...")
	else:	
                #insert information
                try:
                        cursor.execute("INSERT INTO rt16 (Data) VALUES ('"+data+"')")
                        print("Data  recorded")
                except mariadb.Error as error:
                        print("Error: {}".format(error))

                mariadb_connection.commit()

mariadb_connection.close()
s.close()

