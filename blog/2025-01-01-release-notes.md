---
slug: release-notes-january-2025
title: January 2025 Release Notes
authors: harwellstephen
tags: [release, major]
---

# January 2025 Release Notes
This release focuses on workflow improvement and performance optimizations across the website.

<!-- truncate -->

## Key Enhancements by ETAMU web team
### System
- [WordPress 6.7](https://wordpress.org/news/2024/11/rollins/) has been released.
- Teamwork plugin create a separate task when saving a document to update teamwork rather than holding up the save process.

### Theme
- Campus footer to be removed along with page setting.
- Top navigation sticky links are now at least 24px high and wide to enhance mobile touch size.

### Blocks
- On the [news page](http://www.tamuc.edu/news), the generic news pill is replaced by the primary category of each article.
- The formatted container's gray color is updated to have better contrast with text and links.
- The plan of study block's logo was updated to reflect our new name.

### Performance
- Hidden emoji management script removed since our theme doesn't support comments.
- logo_lion.svg only appears on pages using the landing page template.
- MyLeo icon in footer is now lazy loaded.
- The featured stories carousel now uses carouselSections.js to manage its functionality. All carousels and sliders are now managed with a single script.
- A script that manages a type of navigation menu we don't use is no longer loaded.

### Maintenance
- Main.js was moved to the blocks plugin so that a modern compiler can help with refactoring.