#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import re
import shutil

try:
	os.mkdir("flat")
except:
	pass

for root, dirs, files in os.walk("."):
	root = root[2:]

	if re.match(r"^flat", root):
		continue
	if re.match(r"^\.git", root):
		continue
	if re.match(r"^database/demons/.+", root):
		continue

	for f in files:
		fn, ext = os.path.splitext(f)
		if ext == ".py":
			continue

		src = os.path.join(root, f)

		dest = src
		dest = dest.replace("-", "_")
		dest = dest.replace("/", "_")
		dest = dest.replace(".", "_")
		dest = "flat/" + dest

		shutil.copyfile(src, dest)
