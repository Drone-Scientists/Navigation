#ifndef HASHTABLE_H
#define HASHTABLE_H

#include "pch.h"

typedef struct _bucket{
    char *key;
    void *edges;
    struct _bucket *next;
} bucket;

typedef struct _ht{
    bucket **buckets;
    size_t ht_size;
} ht;

ht *ht_create(size_t ht_size);
bucket *bucket_create(char *key, char* edges);
int ht_insert(ht *ht, char *key);
void ht_destroy(ht *ht);
void ht_copy(ht *old_ht, ht *new_ht);
ht *ht_expand(ht *old_ht);

#endif