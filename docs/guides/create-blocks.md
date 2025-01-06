---
sidebar_position: 1
---
# Block Development
Procedures for git code submission and launching to staging a live.

# Directory tour and finding files
Template files get edited and output to:
`wordpress/themes/tamuc/**/*`
and `wordpress/plugins/tamuc/**/*`
eventually this project will not have a compiler.

Blocks get edited in:
`development/tamuc-blocks-src/**/*`
and output to:
`wordpress/plugins/tamuc-blocks/build/**/*`

# Design to delegate
1. Mock initial data and scenarios with mock.json
2. Design the render function of the block; only stub out the helper functions using static data or mock.json.
3. Place most logic before the template in the render function.
4. Sub functions should be pure and have no conditions. Do not pass flags to sub-functions.
5. All data passed to them should be clean.
7. Sub-templates should have the same 4 part structure as the render function.
6. Once the render function and mock.json is written, delegate the remaining tasks:
  - css
  - frontend reactivity (via mock rest_api or data attribute)
  - sub-functions
  - sub-templates
  - rest_apis
  - react components


# Step 1
## Folder structure and wiring up a block
Setup for deletability. Deleting this folder should throw all the errors you need to clean up the artifacts. Nothing should fail silently.

## Block.json with no attributes

## mock.json
:::warning
Remember that single quotes cannot be used for strings in json. Also, all object keys must use string syntax.
:::

## PHP Template with mocks (mock.json)
Use the mocking library to mock out your data from mock.json.
### Constructor function
- Usually you won't have a constructor.
- Place hooks in the constructor and pass parameters onto the parent.

### Render function
Native render receives params of $attributes, $content, $block
ACF render receives params of $block, $content, $is_preview, $post_id, $wp_block, $context
- $attributes is an array that holds user defined data.
- $content is a string that holds the inner content
- $block is an object that holds context information

#### Group your render function into 4 sections.
##### 1. Guards
Anything you need to early exit from should be tested here.
##### 2. State
Extract and clean your primary sources of data. Group by data rather than logic. Prepare each piece of data fully even if that mean repeating conditional statements.


##### 3. Derived State / Template Variables
Prepare the tags that will appear in the template including escaping html and attributes. 

Prepare each piece of data fully even if that means repeating conditional statements.

Save complex conditions to variables. `$is_tabs_context`

Prefer helper functions or `isset($val)` over array_key_exists() and empty()

Prefer choice() {} over switch or elseif

```PHP
//development/tamuc-blocks-src/src/blocks/accordion/class-block-accordion.php
$classes = new AttrBuilder('tamuc-accordion');

$classes->add_option($alignment);

$classes->add_if_or($mode === 'open', 'tamuc-accordion-open', 'tamuc-accordion-closed');

$classes->add_if($is_tabs_context, "{$breakpoint}none");
```

##### 4. Template
Output the template with echo shorthands. `<?= $var_with_string =>`
This means you need to escape your tags before getting to the template. Again, all data prep happens in a single place for each data item.
You can easily double check that everything is escaped in one place rather than throughout the template.
`\ETAMU\TemplateHelpers\to_attr_string($attr, $val)` is a big help here because it escapes the $val for you.

Focus on not having conditionals in this area. If you do have a conditional do not output any html. Rather call a template sub-template to do the work.

## Stub Functions

## block.js/backend.js and components

## frontend.js + carouselSections.js

# Special Topics
## Tying blocks into the WP System
How to use blocks in the theme through add_action and add_filter

## Creating a rest API

## Helpful name spaces and abstract classes

## React hooks vs Wordpress hooks (React, Editor, PHP) vs ETAMU
### React Hooks
Use accordion as example

### WP React Hooks
select/dispatch
setAttributes

useBlockProps + get_block_wrapper_attributes()

### React Filters

### PHP add_action and add_filter

### Frontend hooks
