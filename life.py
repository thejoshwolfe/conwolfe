#!/usr/bin/env python

import random
width, height = 79, 23
grid = [[random.randint(0, 1) for _ in range(width)] for _ in range(height)]

def display():
    lines = ["".join(" #"[c] for c in row) for row in grid]
    print("\x1b[%iA" % height + "\n".join(lines))

def next(x, y):
    offsets = (-1, 0, 1)
    neighbors = sum(grid[(y+u)%height][(x+v)%width] for u in offsets for v in offsets) - grid[y][x]
    if grid[y][x] == 0:
        return int(neighbors == 3)
    else:
        return int(2 <= neighbors <= 3)

def step():
    global grid
    grid = [[next(x, y) for x in range(width)] for y in range(height)]

import time
print("\n" * (height - 1))
while True:
    display()
    time.sleep(1/30.0)
    step()
