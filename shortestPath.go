package main

import "fmt"

type Vertex struct {
	value int
	edges []*Vertex
}

type Graph struct {
	vertices []*Vertex
}

func (g *Graph) addVertex(v *Vertex) {
	g.vertices = append(g.vertices, v)
}

func (g *Graph) addEdge(v1, v2 *Vertex) {
	v1.edges = append(v1.edges, v2)
	v2.edges = append(v2.edges, v1)
}

func (g *Graph) getVertex(value int) *Vertex {
	for _, v := range g.vertices {
		if v.value == value {
			return v
		}
	}
	return nil
}

func (g *Graph) print() {
	for _, v := range g.vertices {
		fmt.Printf("%d: ", v.value)
		for _, e := range v.edges {
			fmt.Printf("%d ", e.value)
		}
		fmt.Println()
	}
}

func (g *Graph) dfs(start, end *Vertex, visited map[*Vertex]bool, path []int) []int {
	visited[start] = true
	path = append(path, start.value)
	if start == end {
		return path
	}
	for _, v := range start.edges {
		if !visited[v] {
			path = g.dfs(v, end, visited, path)
		}
	}
	return path
}

// make a function that implements dijkstra's algorithm
func (g *Graph) dijkstra(start, end int) []int {
	startVertex := g.getVertex(start)
	endVertex := g.getVertex(end)
	if startVertex == nil || endVertex == nil {
		return nil
	}
	visited := make(map[*Vertex]bool)
	path := make([]int, 0)
	return g.dfs(startVertex, endVertex, visited, path)
}

func main() {
	g := &Graph{}
	g.addVertex(&Vertex{1, nil})
	g.addVertex(&Vertex{2, nil})
	g.addVertex(&Vertex{3, nil})
	g.addVertex(&Vertex{4, nil})
	g.addVertex(&Vertex{5, nil})
	g.addVertex(&Vertex{6, nil})
	g.addVertex(&Vertex{7, nil})
	g.addVertex(&Vertex{8, nil})
	g.addEdge(g.getVertex(1), g.getVertex(2))
	g.addEdge(g.getVertex(1), g.getVertex(3))
	g.addEdge(g.getVertex(2), g.getVertex(4))
	g.addEdge(g.getVertex(2), g.getVertex(5))
	g.addEdge(g.getVertex(3), g.getVertex(6))
	g.addEdge(g.getVertex(3), g.getVertex(7))
	g.addEdge(g.getVertex(4), g.getVertex(8))
	g.addEdge(g.getVertex(5), g.getVertex(8))
	g.addEdge(g.getVertex(6), g.getVertex(8))
	g.addEdge(g.getVertex(7), g.getVertex(8))
	g.print()
	fmt.Println(g.dijkstra(1, 8))
}
