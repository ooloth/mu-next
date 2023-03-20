# Finding Text in Vim

## Workflows

### Find in current file

- `/` command
- Options to set to make this work better

### Find in project

- Telescope

*Move the rest to editing note? Is the finding or replacing aspect the primary theme?*

### Find and replace in file

- `:%s/before/after/gc`
- Reference vim help command for before/after syntax and flags

#### Replace symbol 

- When renaming a symbol, don’t rely on test pattern matching
- Leverage LSP to intelligently rename all occurrences that symbol instead
- TODO: define symbol

#### Telescope -> Quickfix list

1. Find occurrences you’re looking for using telescope
2. Send results to quickfix list
3. `:cdo s/before/after/gc | update`

#### Spectre

- Omit this option?
- Any benefits?

## Research

- My blog post about this?