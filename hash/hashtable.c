#include "hashtable.h"
#define SIZE_OF_GRAPH 8

// Allocate a hashtable
ht *ht_create(size_t ht_size) {

    ht *hashtable = (ht*)malloc(sizeof(ht));
    hashtable->buckets = (bucket**)malloc(sizeof(bucket*) * ht_size);

    hashtable->ht_size = ht_size;

    for (int i = 0; i < ht_size; ++i) {
        hashtable->buckets[i] = NULL;
    }
    return hashtable;
}

// Allocate a single bucket
bucket *bucket_create(char *key, char *edges){

    bucket *new_bucket = malloc(sizeof(bucket));
    assert(new_bucket != NULL);

    char *a = malloc(sizeof(char)*SIZE_OF_GRAPH); // allocate space for int in this case
    a = *edges;
    new_bucket->edges = a;

    new_bucket->key = key;
    new_bucket->next = NULL;

    return new_bucket;
}

// Main insertion into the ht
int ht_insert(ht *ht, char *key){

    // get input from drone

}

// Loops through and deallocate the ht
void ht_destroy(ht *ht){

    bucket *head;
    bucket *cur;
    size_t ht_size = ht->ht_size;

    for (int i = 0; i < ht_size; ++i) { // loop though each index
        head = ht->buckets[i];

        while (head != NULL){ // go though chain and free
            cur = head;
            head = head->next;
            free(cur->key);
            free(cur->edges);
            free(cur);
        }
    }
    free(ht->buckets);
    free(ht);
}

// Copy of an old ht of any size to a new ht of some given size
void ht_copy(ht *old_ht, ht *new_ht){

    bucket *cur_bucket;
    size_t ht_size = old_ht->ht_size; 

    for (int i = 0; i < ht_size; ++i) { // loop though each index in ht

        cur_bucket = old_ht->buckets[i];

        if (cur_bucket == NULL) { // empty chain
            continue;
        }
        while(1){

            char *temp_key = cur_bucket->key;
            int temp_count = *(int *)cur_bucket->edges;

            char* ts_mem = malloc(sizeof(char)*(strlen(temp_key)+1));
            assert(ts_mem != NULL);
            strcpy(ts_mem, temp_key);
            ht_insert_count(new_ht, ts_mem, temp_count);

            if (cur_bucket->next == NULL) break; // go to next in chain
            cur_bucket = cur_bucket->next;
        } 
    }  
}

// Expandes ht size
ht *ht_expand(ht *old_ht){

    ht *new_ht = ht_create(old_ht->ht_size * 3); // create a ht with 3 times the size of the old
    ht_copy(old_ht, new_ht); // rehash all of the old ht elements into the new ht
    ht_destroy(old_ht); // free old_ht
    return new_ht;
}