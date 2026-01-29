# www.etamu.edu Release Notes

## 2026-01-29
### For Editors
1. Added a new acf field for QA Schedule for subpages

## 2026-01-20
### For Readers
1. News pages have a new header that makes the news site feel more like a subsite. ![News Header](/img/news-header.png)
2. Departments should now have main headings reflecting their names with the word "news" added for search engine purposes. ![Department Header](/img/department-header.png)

### For Editors
1. Pages that are not yet published or are permanent redirects will show a proofing notice in the header and in the menu. These notices will only appear when logged in or using the `redirect=none` query parameter. ![Proofing Notice](/img/proofing-notice.png)
2. The revision button listed in the black editing bar should be visible once again.
3. News articles should be marked with the public category to be visible on the news page archive.
4. To mark pages as permanent redirects, use the proofing redirect field and select the type of page as Redirect/Stub.
5. To mark pages as proofing pages, fill in the redirect field. Type of page does not matter.

### For Developers
- fix: Update `is_tamuc_news_page` to catch searches
- Refactor news header layout and styling (#357)
- feat: Introduce `get_page_type()` to the `Page` interface and `DB_Page` class, and refactor `is_stub()` to utilize it with an updated page type string.
- Switch stub language to permanent redirect
- feat: Introduce and integrate a `page_type_header` partial to display notices for redirect or proof pages on singular posts.
- Updated draft and stub to proof and redirect
- fix: Update WordPress admin bar item ID in logged-in styles from 147592 to 472415. (#352)
- Remove the `ETAMU_All_News_Archive` class and its inclusion from `functions.php`. (#351)
- feat: Add custom title formatting for department taxonomy archives. (#349)
- Update issue templates
- Make pages with redirects using the proofing redirect field not visible in menus (#284, #345)
- Stubs selectively replace href in nav
- Added stub logic
- Updated type of page options (#336)
- Hotfix: CTA back button

## 2025-11-21
### Frontend
- Name change core. Updated directory search url.
- News article byline departments now also use homepage url in addition to site menu items
- First draft of improving program headlines to look better with the _on this page_ links
- Removed environmental photos from appearing as headshots on profile pages.
- Added bottom margin to navigation buttons on archive pages
- Calls to action on mobile now stick more closely to the bottom of the page. Updated to work better with iOs Tahoe. Still a first draft
- New header images now use a 16:9 ratio like other image placements
- Striped tables use standard colors fixing a contrast issue
- Emergency announcements are now landmarked for screenreaders
- Department tiles on news articles now use a blue background
- News block now shows only one full width card when only one article is available

### Editor
- Reusable sections don't show the other pages they're used on unless you check a block setting
- Added color #cbd5dd as _Misty Sky_ to the built in list of background options
- Accordions can now be ungrouped while preserving their headings and subheadings



## 2025-11-04
### Updates
- Removed redundant logged in controls for profile pages
- Added an alert to accordion containers to notify editors when accordions have duplicate anchors
- Switched the menu to load menu data from a network resource

### Maintenance
- Updated docker configuration and instructions for installing the site locally
## 2025-10-28
### Updates
- Added an archive for news posts at /news/public/
## 2025-10-24
### Updates
- Reduced logo size
- Improved mobile spacing for people block

### Fixes
- Improved interaction speed for the menu and search panels


## 2025-10-17
### Updates
- Moved arrow at the bottom of the headers block over
- Updated the **Submit News** button to match the new url
- Updated the Quality Assurance controls to support the new Laserfiche form
## 2025-10-01
### Updates
- Add standard footer to 404 pages
- Search: upgrade catalog to use search parameters
- Search: update urls to use etamu.edu over tamuc.edu
- Update caption styles to use accessible size
- Contact Block: Social icon urls update to etamu.edu over tamuc.edu
- Add logic to disable the fullscreen mode when loading the content editor
- Profiles: Remove large photo at top of all profiles.
- Add support for the Breadcrumb, menu/`<title>`, and content names for guides and programs to be individual customized

### Fixes
- Program title block updated to allow use on non-program pages
- Update IFrame messaging logic to detect browser support better
- Guide pages: when content has no headings the table of contents should not throw errors

## 2025-09-17
### Updates
- Removed default h2 from guides
- Updated robots.txt to have a sitemap
## 2025-09-04
### Fixes
- On news pages, related department sidebar link is no longer broken
## 2025-09-03
### Updates
- Teamwork plugin edit links update to use www.etamu.edu
- Career possibilities cards centered on mobile
- Career possibilities template to use standard css tokens
- Content area anchor setting moved to top of setting like on other top level blocks
- Renamed landing page title to breadcrumb title for page settings
- Call to action flags no longer contain an h2.
- News page category tiles only list 1 category and 1 department
- New page related department list is limited to 1 department


### Fixes
- Remove __delivery__ category from the program finder
- People masonry template pill, alum specifically, now has proper contrast.