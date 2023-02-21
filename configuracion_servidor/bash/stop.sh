#!/bin/bash -e
#Script para detener el servicio

for port in $(seq 3000 3005); do sudo systemctl stop octavio@$port; done


exit 0