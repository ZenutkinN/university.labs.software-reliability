# Lab 1 - N-version programming

## Problem to be solved

Using different graph traversal algorithms, it is necessary to determine the
shortest distance from the indicated vertex of the graph to all its other vertices.

Determine the execution time of all algorithms and choose the fastest

## Algoritms

#### Dijkstra's Algorithm

Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks.

The algorithm exists in many variants; Dijkstra's original variant found the shortest path between two nodes, but a more common variant fixes a single node as the "source" node and finds shortest paths from the source to all other nodes in the graph, producing a shortest-path tree.

#### Floyd–Warshall Algorithm

In computer science, the Floyd–Warshall algorithm is an algorithm for finding shortest paths in a weighted graph with positive or negative edge weights (but with no negative cycles). A single execution of the algorithm will find the lengths (summed weights) of shortest paths between all pairs of vertices. Although it does not return details of the paths themselves, it is possible to reconstruct the paths with simple modifications to the algorithm.

#### Bellman–Ford Algorithm

The Bellman–Ford algorithm is an algorithm that computes shortest paths from a single source vertex to all of the other vertices in a weighted digraph. It is slower than Dijkstra's algorithm for the same problem, but more versatile, as it is capable of handling graphs in which some of the edge weights are negative numbers.

#### Voting algorithm

As the voting algorithm, the following was chosen: Absolute majority voting algorithm (NVP-MV)

When voting by an absolute majority, all the outputs are divided into classes. To make a decision, it is necessary that at least

![equation](https://latex.codecogs.com/gif.latex?m&space;\geq&space;\left&space;\lceil&space;\frac{N&space;+&space;1}{2}&space;\right&space;\rceil)

versions have identical results (where ![equation](https://latex.codecogs.com/gif.latex?\left&space;\lceil&space;\right&space;\rceil) is the operator of rounding to the nearest larger integer). It is believed that the outputs of the majority (i.e. the class with the number of elements equal to or greater than m) of the multiversions are correct, and the rest are erroneous. If equal outputs are less than m, then this situation is interpreted as uncertainty and it is impossible to make a decision.

## Project Description

The entry point is at `./index.js`

Algorithms are in `./src/algoritms`

The graph is presented in `./src/data-structures/myGraph.js`

At the beginning of program execution, algorithms for finding the shortest paths are started asynchronously. Then, the resulting results go into the voting algorithm. This algorithm returns the shortest path search time.

## Results

The result of the work is presented in the following image (time is measured in milliseconds):

![image](./img/img1.png 'Result 1')

With different starts of the program, we get different program outputs. But you can see that the Dijkstra's algorithm is the slowest. In turn, the voting algorithm always returns the fastest time.

But, with the following output values:

![image](./img/img2.png 'Result 2')

the program throws an exception. This exception is characterized by the fact that not one of the lines satisfies following condition:

![equation](https://latex.codecogs.com/gif.latex?m&space;\geq&space;\left&space;\lceil&space;\frac{N&space;+&space;1}{2}&space;\right&space;\rceil)

Therefore, the NVP-MV algorithm is not suitable for solving this problem.
