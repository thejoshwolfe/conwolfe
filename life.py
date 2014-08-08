#!/usr/bin/env python

import random
import sys
import time

def main(width, height, delay):
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
    grid[:] = [[next(x, y) for x in range(width)] for y in range(height)]

  sys.stdout.write("\n" * height)
  while True:
    display()
    time.sleep(delay)
    step()

def cli():
  import argparse
  parser = argparse.ArgumentParser()
  parser.add_argument("-r", "--rows", type=int, default=23)
  parser.add_argument("-c", "--cols", type=int, default=79)
  parser.add_argument("--hertz", type=float, default=30.0)
  args = parser.parse_args()
  main(args.cols, args.rows, 1/args.hertz)

if __name__ == "__main__":
  cli()
