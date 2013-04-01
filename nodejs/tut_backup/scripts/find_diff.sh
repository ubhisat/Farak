#!/usr/bin/env bash

composite -compose difference $1 $2 out.png
convert -threshold 10% -colorize 0/100/0 out.png out2.png
rm out.png
composite -compose plus $1 out2.png $3
rm out2.png
