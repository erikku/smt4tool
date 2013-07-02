#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

out = open("demons.js", "wb")

for root, dirs, files in os.walk("."):
	for f in files:
		if f.endswith(".js") and f != "demons.js" and f != "master.js":
			out.write(open(os.path.join(root, f), "rb").read())
