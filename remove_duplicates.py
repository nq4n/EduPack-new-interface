import re

# Read the file
with open('lib/translations.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# The duplicate block starts at line 564 and ends around line 599 (approximately)
# We need to identify the exact end of the duplicate block

# Find the end of the duplicate tracking block
# It should end before "pricing.title"

duplicate_start = 563  # Line 564 is index 563 (0-based)

# Find where this duplicate ends
end_line = duplicate_start
for i in range(duplicate_start + 1, len(lines)):
    if '"pricing.title"' in lines[i]:
        end_line = i
        break

print(f"Duplicate block appears to be from line {duplicate_start + 1} to line {end_line}")
print(f"Lines to remove:")

# Collect all lines to remove
remove_range = []
for i in range(duplicate_start, end_line):
    line = lines[i]
    # Only remove scorm.projectPanel and scorm.props keys
    if any(key in line for key in ['scorm.projectPanel', 'scorm.props.project.styles.textColor']):
        remove_range.append(i)
        print(f"  {i+1}: {line.rstrip()}")

print(f"\nTotal lines to remove: {len(remove_range)}")

# Remove the duplicate lines
new_lines = [line for i, line in enumerate(lines) if i not in remove_range]

# Write back
with open('lib/translations.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("File updated successfully!")
print(f"Original lines: {len(lines)}, New lines: {len(new_lines)}")
