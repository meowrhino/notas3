import os
import re
from datetime import datetime

directory = "notas3"
files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]

file_stats = []
for fn in files:
    path = os.path.join(directory, fn)
    ctime = os.stat(path).st_ctime
    
    # Eliminar TODAS las fechas del nombre (incluidas repeticiones)
    clean_name = re.sub(r'(\d{4}-\d{2}-\d{2}-)+', '', fn)
    
    # Eliminar fechas con hora si existen
    clean_name = re.sub(r'(\d{4}-\d{2}-\d{2}-\d{4}-)+', '', clean_name)
    
    # Generar nuevo nombre con solo UNA fecha/hora al principio
    date_str = datetime.fromtimestamp(ctime).strftime("%Y-%m-%d-%H%M")
    new_name = f"{date_str}-{clean_name}"
    
    old_path = os.path.join(directory, fn)
    new_path = os.path.join(directory, new_name)
    
    if fn != new_name:
        os.rename(old_path, new_path)
        print(f"Renombrado: {fn} -> {new_name}")
    
    file_stats.append((new_name, ctime))

# Ordenar por fecha/hora y generar array
sorted_files = [f"notas3/{name}" for name, _ in sorted(file_stats, key=lambda x: x[1], reverse=True)]
print("\nArray ordenado para index.html:")
print("['" + "', '".join(sorted_files) + "']")