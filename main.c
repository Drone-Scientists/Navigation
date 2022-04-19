#include "pch.h"

#define HT_START_SIZE 15

int main(int argc, char** argv){

    ht* ht1 = ht_create(HT_START_SIZE);
    FILE *f;
    int bufsize = 10;
    char buf[bufsize];

   	int fd = open("droneInput", O_RDONLY);
    int r = read(fd, buf, bufsize - 1);
    ht_insert(buf[0], buf[1]);
    char *key = malloc(sizeof(char)*1);
    char *edges = malloc(sizeof(char)*9);
    ht_insert(ht1, key);

    while(r != 0){
        char *key = malloc(sizeof(char)*1);
        char *edges = malloc(sizeof(char)*9);
        ht_insert(ht1, key);
    }


 
    ht_destroy(ht1);

}