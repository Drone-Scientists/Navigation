#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

int main() {
    int n = 5;
    int m = 5;
    int start = 0;
    int end = 4;
    int** graph = malloc(n * sizeof(int*));
    for (int i = 0; i < n; i++) {
        graph[i] = malloc(m * sizeof(int));
    }
    graph[0][1] = 1;
    graph[0][2] = 1;
    graph[1][3] = 1;
    graph[2][3] = 1;
    graph[3][4] = 1;
    graph[4][0] = 1;
    int* path = shortestPath(graph, n, m, start, end);
    if (path == NULL) {
        printf("No path");
    } else {
        for (int i = 0; i < n; i++) {
            printf("%d ", path[i]);
        }
    }
    return 0;
}

int *shortestPath(int **graph, int n, int m, int start, int end) {
    int *path = malloc(n * sizeof(int));
    int *visited = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        visited[i] = 0;
    }
    visited[start] = 1;
    path[0] = start;
    int count = 1;
    int current = start;
    while (current != end) {
        for (int i = 0; i < n; i++) {
            if (graph[current][i] == 1 && visited[i] == 0) {
                path[count] = i;
                count++;
                visited[i] = 1;
                current = i;
                break;
            }
        }
    }
    return path;
}

void printPath(int *path, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", path[i]);
    }
}
