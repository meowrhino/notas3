import os
import re
from datetime import datetime

directory = "notas3"
files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]

file_stats = []
for fn in files:
    path = os.path.join(directory, fn)
    
    # Intentar extraer fecha existente del nombre
    date_match = re.search(r'(\d{4}-\d{2}-\d{2})', fn)
    if date_match:
        # Usar fecha del nombre + hora actual para mantener orden
        date_str = f"{date_match.group(1)}-{datetime.now().strftime('%H%M')}"
    else:
        # Si no hay fecha en el nombre, usar fecha de modificación
        mtime = os.path.getmtime(path)
        date_str = datetime.fromtimestamp(mtime).strftime("%Y-%m-%d-%H%M")
    
    # Limpiar nombre quitando fechas antiguas
    clean_name = re.sub(r'(\d{4}-\d{2}-\d{2}-)+', '', fn)
    clean_name = re.sub(r'(\d{4}-\d{2}-\d{2}-\d{4}-)+', '', clean_name)
    
    new_name = f"{date_str}-{clean_name}"
    old_path = os.path.join(directory, fn)
    new_path = os.path.join(directory, new_name)
    
    if fn != new_name:
        os.rename(old_path, new_path)
        print(f"Renombrado: {fn} -> {new_name}")
    
    file_stats.append((new_name, date_str))

# Ordenar por fecha/hora
sorted_files = [f"notas3/{name}" for name, _ in sorted(file_stats, key=lambda x: x[1], reverse=True)]
print("\nArray ordenado para index.html:")
print("['" + "', '".join(sorted_files) + "']")