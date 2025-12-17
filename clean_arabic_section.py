import re

# Read the file
with open('lib/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Split by ar: { to identify the sections properly
parts = content.split('\n  ar: {')

if len(parts) == 2:
    en_part = parts[0]
    ar_part = parts[1]
    
    # Find all lines that have duplicate scorm.projectPanel or scorm.props keys in the Arabic section
    # These lines have English values starting around line 1125 (after the ar section start)
    
    ar_lines = ar_part.split('\n')
    
    # Identify which lines are duplicates (have English scorm.projectPanel keys with English values)
    # Pattern: "scorm.projectPanel.*": "English...",
    
    duplicates_to_remove = []
    for i, line in enumerate(ar_lines):
        # Check if this is a scorm.projectPanel line with English value (like "Minimal" instead of Arabic)
        if '"scorm.projectPanel' in line or '"scorm.props.project' in line:
            # Check if the value is English
            if any(eng_val in line for eng_val in ['"General Tracking"', '"Minimal"', '"Standard"', '"Advanced"', '"Advanced Options"', '"Track page views"', '"Track quiz interactions"', '"Track media', '"Track hints', '"Track external links"', '"Track time per page"', '"Track attempts"', '"xAPI Only Options"', '"LRS Endpoint"', '"Auth token"', '"Activity ID format"', '"Statement extensions"', '"Export Options"', '"SCORM 1.2"', '"SCORM 2004"', '"xAPI/cmi5"', '"HTML5 Package"', '"Public Link"', '"Embed Code"', '"Teacher PDF"', '"Student PDF"', '"JSON source"', '"QTI/Moodle Question Bank"', '"Text Color"']):
                duplicates_to_remove.append(i)
                print(f"Line {625 + i} (ar line {i}): {line[:80]}")
    
    print(f"\nFound {len(duplicates_to_remove)} duplicate lines in Arabic section")
    print(f"Will remove these lines to restore Arabic section integrity")
    
    # Remove the duplicates
    new_ar_lines = [line for i, line in enumerate(ar_lines) if i not in duplicates_to_remove]
    new_ar_part = '\n'.join(new_ar_lines)
    
    # Reconstruct the file
    new_content = en_part + '\n  ar: {' + new_ar_part
    
    # Write back
    with open('lib/translations.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"\nFile updated!")
    print(f"Original ar section: {len(ar_lines)} lines")
    print(f"New ar section: {len(new_ar_lines)} lines")
else:
    print("Could not properly split the file!")
