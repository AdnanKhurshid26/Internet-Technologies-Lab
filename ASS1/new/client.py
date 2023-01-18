import socket
import sys

def handleRequest(client, req):
    if req[0] == "exit":
        client.close()
        sys.exit()
    
    i = 0
    while i < len(req):
        if req[i] == "put":
            msg = f"put${req[i + 1]}${req[i + 2]}$"
            client.send(msg.encode())
            i += 3
        elif req[i] == "get":
            msg = f"get${req[i + 1]}$"
            client.send(msg.encode())
            res = client.recv(1024).decode()
            print(res)
            i += 2
        elif req[i] == "upgrade":
            msg = f"upgrade${req[i + 1]}$"
            client.send(msg.encode())
            res = client.recv(1024).decode()
            print(res)
            i += 2
        else:
            print("Invalid Input\n")
            pass

if __name__ == "__main__":
    n = len(sys.argv)

    if n < 3:
        sys.exit("Insufficient number of arguments")

    IP = sys.argv[1]
    PORT = int(sys.argv[2])
    ADDR = (IP, PORT)

    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect(ADDR)

    handleRequest(client, sys.argv[3:])
    while True : 
        req = input("Enter Commands :- ").split(" ")
        handleRequest(client, req)