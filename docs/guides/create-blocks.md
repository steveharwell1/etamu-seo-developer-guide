---
sidebar_position: 1
---
# Block Development
Procedures for git code submission and launching to staging a live.

# Directory tour and finding files

## Finding Files
Template files get edited and output to:
`wordpress/themes/tamuc/**/*`
and `wordpress/plugins/tamuc/**/*`
eventually this project will not have a compiler.

Blocks get edited in:
`development/tamuc-blocks-src/**/*`
and output to:
`wordpress/plugins/tamuc-blocks/build/**/*`

In VSCode search
- set included files to `wordpress/plugins/tamuc*,wordpress/themes/tamuc,development/tamuc-blocks-src`
- set excluded files to `wordpress/plugins/tamuc-blocks/build/**/*`

Too many files so use `CMD + p`. Every block is called block.json so search for the folder name instead.

## The tour
- wordpress
  - composer.json (Add plugins) (Editable)
  - plugins
    - tamuc (retiring) (Editable)
    - tamuc-editui (Non-gutenberg editor modifications) (Editable)
    - tamuc-teamwork (All teamwork integrations) (Editable)
    - tamuc-blocks (Future site of all code that compiles)
      - assets (Editable)
      - build (Do not edit)
      - inc (Editable)
      - tamuc-blocks.php (Editable)
  - themes
    - tamuc (removing all build scripts) (Editable)
- development
  - db-upload (temporarily place .sql files for adding to db)
  - tamuc-blocks-src (folder to execute "npm run build")
    - src (Editable)
      - blocks (Broken out in different section)
      - settings
        - blockStyles.js (json of block styles)
      - shared
        - js
          - main (holds all theme scripts)
          - filters.js (All block related filters)
          - FrontendUtils.js (Retiring in favor of lit-html)
          - main.js (frontend theme script using main folder)
          - ProgramCard (Retiring in favor of lit-html)
          - UrchinFactory.js (Manages ad history in localstorage for RFIs)
        - components
          - BulkConvertContentParts.js (Used in plugins.js)
          - FormattedContainerIcon.js (Move with formatted container)
          - LetterIcon.js (Truly Shared)
          - MetaRichText.js (Rich Text Component that saves data to meta fields)
          - SectionToggleList.js
        - img (Prefer placing in block folder)
        - css
          - blocks (To be replaced with _blocks.scss, _blocks-desktop.scss, _blocks-print.scss, _blocks-editor.scss, _blocks-logged-in.scss)
          block-library.scss + variants
        
      carouselSections.js (Another frontend file)
      frontend.js (Frontend block scripts)
      index.js (Gutenberg block scripts)
      plugin.js (Non-block related gutenberg scripts)

# Design to delegate
1. Mock initial data and scenarios with mock.json
2. Design the render function of the block; only stub out the helper functions using static data or mock.json.
3. Place most logic before the template in the render function.
4. Sub functions should be pure and have no conditions. Do not pass flags to sub-functions.
5. All data passed to them should be clean.
7. Sub-templates / Components should have the same 4 part structure as the render function. However, do try to be pure if possible.
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

Blocks folder (Showing complete setup)
- block-name (must match block name in tamuc-blocks.php)
  - block.json
  - mock.json
  - block.js (maybe editor.js or backend.js in the future.)
  - frontend.js
  - class-block-name.php
  - _block-name.scss
  - _block-name-desktop.scss
  - _block-name-print.scss
  - _block-name-editor.scss
  - _block-name-logged-in.scss
  - img
  - inc
  - frontend-js
  - backend-js

## Block.json with no attributes
[Wordpress Documentation](https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-json/)

Example from formatted container
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 2,
  "name": "tamuc-blocks/formatted-container",
  "title": "Content Area",
  "category": "tamuc",
  "icon": "star-filled",
  "description": "Container that is meant to be used as the main block that holds all other blocks on a page.",
  "keywords": [
    "header", "container", "section", "content"
  ],
  "version": "1.0.0",
  "textdomain": "tamuc-plugin",
  "attributes": {
    "anchor": {
      "type": "string",
      "default": ""
    },
    "usePaddingTop": {
      "type": "boolean",
      "default": true
    },
    "usePaddingBottom": {
      "type": "boolean",
      "default": true
    },
    "useLinkButton": {
      "type": "boolean",
      "default": true
    },
    "suggestedLinkText": {
      "type": "string"
    },
    "hideInNavigation":{
      "type": "boolean",
      "default": false
    },
    "isRootElement": {
      "type": "boolean",
      "default": true
    },
    "isOnlyLoggedIn": {
      "type": "boolean",
      "default": false
    },
    "isOnlyLandingPage": {
      "type": "boolean",
      "default": false
    },
    "tamucWidth": {
      "type": "string",
      "default": "standard",
      "enum": ["full", "standard", "slim"]
    },
    "tamucInnerWidth": {
      "type": "string",
      "default": "standard",
      "enum": ["full", "standard", "slim"]
    },
		"id": {
			"type": "number"
		},
    "backgroundType": {
			"type": "string"
		},
		"focalPoint": {
			"type": "object"
		},
    "gradient": {
			"type": "string"
		},
    "color": {
			"type": "string"
		},
    "isDark": {
			"type": "boolean",
			"default": false
		}
  },
  "supports": {
    "anchor": true
  }
}
```

Add this acf attribute to tell acf that this is an acf block
```json
    "acf": {
        "mode": "preview",
        "validate": false
    }
```
## mock.json
:::warning
Remember that single quotes cannot be used for strings in json. Also, all object keys must use string syntax.
:::

Example from formatted container.
```json
{
  "scenarioLoggedInOnly": {
    "attributes": {
      "anchor": "contact-us",
      "usePaddingTop": true,
      "usePaddingBottom": true,
      "useLinkButton": false,
      "suggestedLinkText": "Contact Us",
      "hideInNavigation": false,
      "isRootElement": true,
      "isOnlyLoggedIn": true,
      "isOnlyLandingPage": false,
      "tamucWidth": "full",
      "tamucInnerWidth": "full",
      "id": 8675309,
      "backgroundType": "gradient",
      "focalPoint": {"x": 50, "y": 50},
      "gradient": "to left, white 0% 50%, black 50% 100%",
      "color": "#00386C",
      "isDark": false
    },
    "content": "<p>Hello</p>",
    "block": {"context": {}}
  }
}
```

## PHP Template with mocks (mock.json)
Use the mocking library to mock out your data from mock.json.

```php
<?php

use ETAMU\TemplateHelpers\AttrBuilder;
use function ETAMU\TemplateHelpers\{prop_as_option, to_attr_string, is_empty};
require_once(TAMUC_BLOCKS_PLUGIN_PATH . '/inc/class-tamuc-block-base.php');

class Block_Best extends Tamuc_Block_Base
{
  function render($attributes, $content, $block)
  {
    [$attributes, $content, $block] = json_decode(file_get_contents('./mock.json'));
    // Early exit
    if(isset($attributes["isLoggedInOnly"]) && !$attributes["isLoggedInOnly"] && !is_user_logged_in()) {
      return
    }

    // State
    $is_logged_in_only = prop_as_option("isLoggedInOnly", $attributes)->unwrap_or(false);


    // Template Variables
    $classes = new AttrBuilder('tamuc-best-block');
    $classes->add_if($is_logged_in_only, 'logged-in-only');

    $block_id = prop_as_option('anchor', $attributes)
      ->reject(is_empty(...))
      ->map(to_attr_string('id'))->unwrap_or('');

    $wrapper = get_block_wrapper_attributes(['class' => $classes->build_inner_class_string()]);
    ?>
      <section <?= $block_id ?> <?= $wrapper ?>>
        <p>This is the best block</p>
        <div>
          <?= $content ?>
        </div>
      </section>
    <?php
  }
}

```
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
```PHP
abstract class Tamuc_Block_Base {

  // $block_name must match name of block folder.
  public function __construct( $block_manager, $block_name);

  public function render_wrap($attributes, $content, $block);

  protected abstract function render( $attributes, $content, $block );
}

abstract class Tamuc_ACF_Block_Base extends Tamuc_Block_Base {
  
  // $block_name must match name of block folder.
  public function __construct($block_manager, $block_name);

  public abstract function render($block, $content='', $is_preview = false, $post_id=0, $wp_block = false, $context = false);
  
  // For blocks with no preview echo a basic placeholder.
  protected function Preview($block_title='');

  // Merge all block acf field with defaults. Should be moved to namespace ETAMU\TemplateHelpers
  protected function get_fields_or_defaults($wpObj, $defaults);
  
}

abstract class Tamuc_ACF_Block_Base extends Tamuc_ACF_Block_Base {
  
	protected function get_module_fields($module_fields);

  protected function get_field_value($arr, $index, $default);

	protected function var_exists($arr, $index, $comp = 'or');

  protected function get_section_margins($margins);
}

namespace \ETAMU\TemplateHelpers {

  /**
   * Uses isset($a) to check if a key exists in an array or object.
   * In other words it not only checks if the key is set, but also if the value is not null.
   * @param string $key
   * @param array|object $array
   * @return \ETAMU\Option\Option|callable(array|object): \ETAMU\Option\Option
   */
  function prop_as_option($key, $array = null); // $arr = ["val" => [4]]; prop_as_option("val", $arr) will return some([4])

  /**
   * Uses isset($a) to check if a key exists in an array or object.
   * In other words it not only checks if the key is set, but also if the value is not null.
   * @param array $path
   * @param array|object $array
   * @return \ETAMU\Option\Option
   */
  function path_as_option(array $path, $array); // $arr = ["val" => [4]]; path_as_option(["val", 0], $arr) will return some(4)

  /**
   * Wrapper around the empty function which cannot be used as a callback.
   * @param mixed $val
   * @return bool
   */
  function is_empty($val); // some('')->reject(is_empty(...)) will give a none.

  /**
   * Outputs an html attribute string with the contents escaped.
   * If $val is a bool then the attr will or won't be present. Like checked or hidden or disabled.
   * @param string $attr
   * @param string|bool $val
   * @return string|callable(string|bool):string
   */
  function to_attr_string($attr, $val=null); // <?= to_attr_string('id', $some_id) ?> or <?= to_attr_string('checked', true) ?>

  // Filters image tags less stringently than traditional wp. Should be moved to namespace ETAMU\TemplateHelpers
  function kses_image( $img ); // html string -> string of img tag with approved attributes

  class AttrBuilder {
    public function __construct(string $str = null); // $classes = new AttrBuilder();
    public function add(string $str); // $classes->add("color:var(--some-color)")
    public function add_if(bool $condition, string $str); // $classes->add_if($has_border, "block-name--border");
    public function add_if_or(bool $condition, string $str, string $default); // $classes->add_if_or($is_open, "open", "closed");
    public function add_option($option); // if option is some then add it's value. Otherwise, do nothing. $classes->add_option(some('block-name--border'));
    public function build_class_attr_string(); // class="some-class another-class" classes are run through esc_attr()
    public function build_style_attr_string(); // style="color:var(--some-color);padding: 0;" styles are run through esc_attr()
    public function build_inner_class_string(); // some-class another-class
    public function build_inner_style_string(); // color:var(--some-color);padding: 0;
  }
}

namespace \ETAMU\Option {
  function some() // Creates a some option container
  function none() // Creates a none option container
  
  abstract class Option {
    abstract public function is_some(); // bool
    abstract public function is_none(); // bool
    abstract public function unwrap(); // Returns inner value or throws an error
    abstract public function unwrap_or($default); // Returns inner value or $default
    abstract public function unwrap_or_else(callable $f); // Returns inner value or runs f and returns its result
    abstract public function and($option_b); // If option a is true then return option b else return none
    abstract public function and_then(callable $f); // If some<a> return some<f(a)>; f must return an option; Bypassed if none
    abstract public function map(callable $f); // transform option<a> to option<b>; f(a) does not need to return an option; Bypassed if none
    abstract public function expect($msg); // If none then throw an error containing the message; Use as an assert
    abstract public function filter(callable $predicate); // Test the value with the given function. If true return some<t> else return none; Bypassed if none
    abstract public function reject(callable $predicate); // Test the value with the given function. If true return none else return the original option, Bypass if none
    abstract public function flatten(); // Turn option<option<a>> into option<a>
    abstract public function inspect(callable $f); // If some run f(a) and return original option. Similar to forEach for arrays
    abstract public function iter(); // Returns and iterator over the value
    abstract public function or($option_b); // Recovers a none; Return some<a> if some or some<b> if none
    abstract public function or_else(callable $f); // Recovers a none; Return f() if none. F must return an option
  }
}

namespace ETAMU\Result {
  function ok($val); // returns Ok<val>
  function err($val); // returns Err<val>

  abstract class Result {
    abstract public function is_ok(); // bool
    abstract public function is_err(); // bool
    abstract public function unwrap_ok(); // Returns Val or throws error
    abstract public function unwrap_err(); // Returns error object or throws error
    abstract public function unwrap_or($default); // Returns val or the default
  }
}
```

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
