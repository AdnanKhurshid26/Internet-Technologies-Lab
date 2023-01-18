strin = "This is a test string ok"

words = strin.split(" ")
commands = []
for i in range(0,len(words),2):
    s = words[i] + " " + words[i+1]
    commands.append(s)
print(commands)