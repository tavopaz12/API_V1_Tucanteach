#!/bin/bash -e
# Script para iniciar el servicio automáticamente

for port in $(seq 3000 3005); do sudo systemctl start root@$port; done