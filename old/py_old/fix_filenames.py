import os
import re

directory = "notas3/"
new_paths = []

for filename in os.listdir(directory):
    # Remove accents, spaces, etc.
    clean_name = re.sub(r"[áÁ]", "a", filename)
    clean_name = re.sub(r"[éÉ]", "e", clean_name)
    clean_name = re.sub(r"[íÍ]", "i", clean_name)
    clean_name = re.sub(r"[óÓ]", "o", clean_name)
    clean_name = re.sub(r"[úÚ]", "u", clean_name)
    clean_name = re.sub(r"[ñÑ]", "n", clean_name)
    clean_name = re.sub(r"\s+", "-", clean_name)
    clean_name = re.sub(r"[^a-zA-Z0-9.\-]", "", clean_name)

    # Split extension
    base, ext = os.path.splitext(clean_name)
    date_part = base[:10]  # "YYYY-MM-DD"
    rest = base[11:] if base[10:11] == '-' else base[10:]
    # Keep up to 20 chars
    rest = rest[:20]
    # Rebuild filename
    final_name = f"{date_part}-{rest}{ext}" if rest else f"{date_part}{ext}"

    old_path = os.path.join(directory, filename)
    new_path = os.path.join(directory, final_name)

    # Rename if changed
    if final_name != filename:
        os.rename(old_path, new_path)
        print(f"Renombrado: {filename} -> {final_name}")

    new_paths.append(f"notas3/{final_name}")

# Print updated array
print(new_paths)