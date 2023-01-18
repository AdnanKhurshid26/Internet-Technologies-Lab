import socket
import threading

IP = socket.gethostbyname(socket.gethostname())
PORT = 8000
ADDR = (IP, PORT)
MANAGER_PASSWORD = "Q29!?"
clientDict = {}
managerRights = set()

def client_handler(client, address, lock):
    clientDict[client] = {}

    while True:
        msg = client.recv(1024).decode()

        if not msg:
            clientDict.pop(client)
            managerRights.discard(client)
            client.close()
            print(f"\nClient {address} Disconnected")
            break

        msg = msg.split("$")
        i = 0
        while i < len(msg):
            if msg[i] == "put":
                clientDict[client][msg[i + 1]] = msg[i + 2]
                i += 3
                print(f"Updated Dictionary for Client {address}")
            elif msg[i] == "get":
                res = ""

                if client in managerRights:
                    for clients in clientDict:
                        try:
                            val = clientDict[clients][msg[i + 1]]
                            res += f"Client {address}: {val}\n"
                        except:
                            pass
                else:
                    val = clientDict[client][msg[i + 1]]
                    res += f"{val}\n"
                
                i += 2
                client.send(res.encode())
            elif msg[i] == "upgrade":
                res = ""

                if client in managerRights:
                    res = "Already a Manager"
                else:
                    if msg[i + 1] == MANAGER_PASSWORD:
                        managerRights.add(client)
                        res = "Upgraded to Manager"
                    else:
                        res = "Access denied"
                
                i += 2
                client.send(res.encode())
            else:
                i += 1
                pass

def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(ADDR)
    server.listen()

    lock = threading.Lock()
    while True:
        client, address = server.accept()
        print(f"Client {address} connected")
        thread = threading.Thread(target = client_handler, args = (client, address, lock))
        thread.start()

if __name__ == "__main__":
    print(f"\nStarted Server...\nIP = {IP}, PORT = {PORT}\n")
    main()