all: compile clean

compile: main.o hashtable.o
	gcc -g -Wall -o com ./pch.h main.o hashtable.o 

main.o:
	gcc -g -Wall -c ./main.c ./main.h

hashtable.o:
	gcc -g -Wall -c ./hashtable.c ./hashtable.h
	
clean:
	rm -f ./*h.gch ./*.o 