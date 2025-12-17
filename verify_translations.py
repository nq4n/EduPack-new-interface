import re

# Read the file
with open('lib/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Check if the file is still valid JSON structure
try:
    # Just check if the file ends properly
    if content.strip().endswith('} as const'):
        print("✓ File structure looks valid (ends with '} as const')")
    else:
        print("✗ File structure may be broken")
        print(f"Last 100 chars: ...{content[-100:]}")
except Exception as e:
    print(f"Error checking file: {e}")

# Check Arabic translations
ar_section_start = content.find('\n  ar: {')
if ar_section_start > 0:
    ar_section = content[ar_section_start:]
    
    # Count tracking translations in Arabic
    ar_tracking_count = len(re.findall(r'"scorm\.projectPanel\.tracking\."', ar_section))
    ar_xapi_count = len(re.findall(r'"scorm\.projectPanel\.xapi\."', ar_section))
    
    print(f"\nArabic section translations:")
    print(f"  Tracking keys: {ar_tracking_count}")
    print(f"  xAPI keys: {ar_xapi_count}")
    
    # Show some sample Arabic translations
    matches = list(re.finditer(r'"scorm\.projectPanel\.tracking\.\w+":\s*"([^"]*)"', ar_section))
    if matches:
        print(f"\nSample Arabic tracking translations:")
        for match in matches[:3]:
            key = match.group(0).split('":')[0]
            value = match.group(1)
            print(f"  {key}: {value}")
else:
    print("Could not find Arabic section")

# Check for any remaining duplicates in overall file
print("\nChecking for duplicate keys in entire file...")
all_keys = re.findall(r'"([^"]+)":\s*"', content)
seen = set()
duplicates = []
for key in all_keys:
    if key in seen:
        duplicates.append(key)
    seen.add(key)

if duplicates:
    print(f"Found {len(set(duplicates))} duplicate keys:")
    for dup in set(duplicates)[:10]:
        count = sum(1 for k in all_keys if k == dup)
        print(f"  {dup}: {count} occurrences")
else:
    print("✓ No duplicate keys found")
