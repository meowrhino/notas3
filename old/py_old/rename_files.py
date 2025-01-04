import os
import re
from datetime import datetime

directory = "notas3"
file_stats = []

for filename in os.listdir(directory):
    if not filename.endswith('.html'):
        continue
        
    # 1. Extraer fecha del nombre actual
    date_match = re.search(r'(\d{4}-\d{2}-\d{2})', filename)
    if not date_match:
        continue
    
    date = date_match.group(1)
    
    # 2. Obtener hora de modificación en lugar de creación
    file_path = os.path.join(directory, filename)
    mod_time = os.path.getmtime(file_path)
    time_str = datetime.fromtimestamp(mod_time).strftime("%H%M")
    
    # 3. Crear nuevo nombre
    new_name = f"{date}-{time_str}.html"
    new_path = os.path.join(directory, new_name)
    
    # 4. Renombrar y guardar info
    if filename != new_name:
        os.rename(file_path, new_path)
        print(f"Renombrado: {filename} -> {new_name}")
        file_stats.append((new_name, f"{date} {time_str}"))

# 5. Ordenar y generar array para index.html
sorted_files = sorted(file_stats, key=lambda x: x[1], reverse=True)
array_str = "['" + "', '".join(f"notas3/{name}" for name, _ in sorted_files) + "']"
print("\nArray para index.html:")
print(array_str)