import re

# Read the file
with open('lib/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# The pattern of duplicate translations that should appear only once
# We'll keep the first occurrence (around line 394-415) and remove the others

# Split by the "ar: {" marker to separate English and Arabic sections
parts = re.split(r'(\n  ar: \{)', content, maxsplit=1)

if len(parts) >= 3:
    en_section = parts[0]
    ar_marker = parts[1]
    ar_section = parts[2]
    
    # In the English section, find and remove duplicates
    # The legitimate tracking keys appear around lines 394-415
    # Additional occurrences should be removed
    
    # Count how many times we see the tracking block
    tracking_pattern = r'"scorm\.projectPanel\.generalTracking":\s*"General Tracking",'
    en_tracking_matches = list(re.finditer(tracking_pattern, en_section))
    
    print(f"Found {len(en_tracking_matches)} occurrences of tracking block in English section")
    
    if len(en_tracking_matches) > 1:
        print("Removing duplicate tracking blocks from English section...")
        
        # Keep track of which section to keep and which to remove
        # We'll identify the duplicate range and remove it
        
        # Find the first occurrence
        first_start = en_tracking_matches[0].start()
        
        # Find where the first tracking block ends
        # It should end around the "scorm.projectPanel.exportPanel" key or similar
        first_block_end = re.search(r'"scorm\.props\.project\.styles\.textColor":\s*"Text Color",', en_section[first_start:])
        
        if first_block_end:
            first_end_pos = first_start + first_block_end.end()
            print(f"First valid block ends around: {en_section[first_end_pos:first_end_pos+100]}")
            
            # Now find any duplicate blocks after this position
            # Look for the next occurrence of the same pattern
            next_match = re.search(tracking_pattern, en_section[first_end_pos:])
            
            if next_match:
                dup_start = first_end_pos + next_match.start()
                print(f"Found duplicate starting at position {dup_start}")
                print(f"Context: ...{en_section[dup_start-50:dup_start+100]}...")
    
    # Print positions of all matches in English for inspection
    print("\nAll occurrences in English section:")
    for i, match in enumerate(en_tracking_matches):
        line_num = en_section[:match.start()].count('\n') + 1
        print(f"  {i+1}. Line {line_num}: {match.group()}")
else:
    print("Could not split English and Arabic sections")
