import socket
import sys
import pickle
from time import sleep

class Client:
    def __init__(self, host, port, username):
        self.host = host
        self.port = port
        self.username = username
        self.ismanager = False

    def recvhelper(msg, client):
        client.send(pickle.dumps(msg))
        sleep(0.2)
        response = client.recv(1024).decode()
        return response

    def startProcess(self):
        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client.connect((self.host, self.port))

        # initially send username to server for authentication and thread creation
        client.send(self.username.encode())
        print("Username sent to server")
        # receive the response from server whether manager or guest
        role = client.recv(1024).decode()
        print("Role received from server: " + role)

        if (role == "manager"):
            self.ismanager = True
        else:
            print("No Manager Access Found.Made guest by default")
            self.ismanager = False

        while True:
            query = input()
            query = query.split(" ")
            uname = query[0]
            for i in range(1,len(query)):
                if query[i] == "put":
                    msg = [uname,query[i], query[i+1], query[i+2]]
                    response = self.recvhelper(msg, client)
                    i += 3
                elif query[i] == "get":
                    msg = [uname,query[i], query[i+1]]
                    response = self.recvhelper(msg, client)
                    print(response)
                    i += 2
                elif query[i] == "delete":
                    msg = [uname,query[i], query[i+1]]
                    response = self.recvhelper(msg, client)
                    print(response)
                    i += 2
                elif query[i] == "upgrade":
                    msg = [uname,query[i]]
                    response = self.recvhelper(msg, client)
                    if response == "ok":
                        self.ismanager = True
                        print("Upgraded to manager")
                    else:
                        print("Already manager")
                elif query[i] == "quit":
                    msg = [query[i]]
                    response = self.recvhelper(msg, client)
                    print(response)
                    client.close()
                    exit(0)


if __name__ == "__main__":
    if (len(sys.argv) < 4):
        print("Usage: python client.py <host> <port> <username>")
        exit(0)

    host = sys.argv[1]
    port = int(sys.argv[2])
    username = sys.argv[3]

    print("host: ", host)
    print("port: ", port)
    print("username: ", username)
    
    client = Client(host, port, username)
    client.startProcess()
