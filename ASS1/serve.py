import socket
import pickle
from threading import Thread

HOST = '127.0.0.1'
PORT = 12345

MAXIMUM_CLIENTS = 10

database = {}
manager = set()

# #load the database from file from json
# with open('database.json') as f:
#     database = json.load(f)

class ClientThread(Thread):
    def __init__(self, clientAddress, clientSocket):
        Thread.__init__(self)
        self.conn = clientSocket
        self.addr = clientAddress
        print('Got new connection from', clientAddress)

        self.username = self.conn.recv(1024).decode()
        print("username received from client: " + self.username)
        if self.username not in database:
            database[self.username] = {}
            self.conn.send("guest".encode())
        else:
            if self.username in manager:
                self.conn.send("manager".encode())
            else:
                self.conn.send("guest".encode())

    def run(self):
        while True:
            query = self.conn.recv(1024)
            query = pickle.loads(query)
            print(query)
            uname = query[0]
            if (uname != self.username):
                if (self.username not in manager):
                    self.conn.send(
                        "No Manager role. Cannot access other client's storage".encode())
                    continue
            if query[1] == "put":
                database[uname][query[2]] = query[3]
                self.conn.send(" ".encode())
            elif query[1] == "get":
                if query[2] in database[uname]:
                    self.conn.send(database[uname][query[2]].encode())
                else:
                    self.conn.send("key error".encode())
            elif query[1] == "delete":
                if query[2] in database[uname]:
                    del database[uname][query[2]]
                    self.conn.send("ok".encode())
                else:
                    self.conn.send("key error".encode())
            elif query[1] == "upgrade":
                if self.username in manager:
                    self.conn.send("already".encode())
                else:
                    manager.add(self.username)
                    self.conn.send("ok".encode())
            elif query[1] == "quit":
                self.conn.send("ok".encode())
                self.conn.close()
                break
        return


if __name__ == '__main__':
   # create a tcp socket
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((HOST, PORT))
    server.listen(MAXIMUM_CLIENTS)
    print("Server started at {}:{}".format(HOST, PORT))
    while True:
        conn, addr = server.accept()
        clientThead = ClientThread(addr, conn)
        clientThead.start()
        print("Client thread started")
